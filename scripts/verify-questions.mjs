#!/usr/bin/env node
// Vérification factuelle des questions à choix multiples par Claude Sonnet 4.5.
// Pour chaque question, on demande à Claude :
//   1. Quelle est la bonne réponse (parmi A/B/C/D) ?
//   2. Est-elle d'accord avec l'index `ans` du fichier ?
//   3. Si non, pourquoi (en 1 phrase) ?
// Sortie : verify-report.md avec les questions problématiques.
//
// Variables d'env :
//   ANTHROPIC_API_KEY (obligatoire, secret GitHub)
//   LIMIT             (optionnel : nombre max de questions à vérifier)
//   ONLY_CHANGED      (optionnel : 'true' = ne vérifie que les questions modifiées par la PR)

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const MODEL = 'claude-sonnet-4-5'; // bon rapport qualité/coût pour vérif factuelle
const MAX_CONCURRENT = 6; // parallélisation modérée pour respecter le rate limit
const SYSTEM = `Tu es un correcteur expert. On te donne une question à choix multiples destinée à des enfants (CP à CM2) et l'index (0-3) de la réponse marquée correcte par l'auteur. Vérifie si la réponse marquée est bien factuellement correcte. Si plusieurs choix sont défendables ou si la question est ambiguë, signale-le. Réponds STRICTEMENT en JSON :
{"ok": true|false, "correct_index": 0-3, "reason": "<1 phrase si ok=false, sinon vide>"}
`;

function parseExercisesFile(path) {
  // Le fichier utilise EX.push({...}, {...}) — on extrait via eval contrôlé.
  const src = readFileSync(path, 'utf8');
  const exercises = [];
  const EX = { push: (...items) => exercises.push(...items) };
  // eslint-disable-next-line no-new-func
  new Function('EX', src)(EX);
  return exercises;
}

function loadAllExercises() {
  const all = [];
  try { all.push(...parseExercisesFile('exercises.js')); } catch (e) { console.warn('exercises.js:', e.message); }
  try { all.push(...parseExercisesFile('exercises_extra.js')); } catch (e) { console.warn('exercises_extra.js:', e.message); }
  return all;
}

function changedIds() {
  // En mode PR, ne vérifie que les IDs qui apparaissent dans le diff.
  try {
    const base = process.env.GITHUB_BASE_REF || 'main';
    execSync(`git fetch origin ${base} --depth=50`, { stdio: 'ignore' });
    const diff = execSync(`git diff origin/${base}...HEAD -- exercises.js exercises_extra.js`, { encoding: 'utf8' });
    const ids = new Set();
    for (const m of diff.matchAll(/id:"([^"]+)"/g)) ids.add(m[1]);
    return ids;
  } catch (e) {
    console.warn('git diff failed, fallback to all:', e.message);
    return null;
  }
}

async function verifyOne(client, ex) {
  if (!Array.isArray(ex.ch) || ex.ch.length !== 4 || typeof ex.ans !== 'number') {
    return { ex, skipped: true, reason: 'pas QCM 4 choix' };
  }
  const userMsg = `Question: ${ex.q}\nChoix:\nA) ${ex.ch[0]}\nB) ${ex.ch[1]}\nC) ${ex.ch[2]}\nD) ${ex.ch[3]}\nIndex marqué correct (0=A, 1=B, 2=C, 3=D): ${ex.ans}\nExplication fournie : ${ex.se || '(aucune)'}\n\nRéponds en JSON strict.`;
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 200,
    system: SYSTEM,
    messages: [{ role: 'user', content: userMsg }],
  });
  const text = res.content.find((c) => c.type === 'text')?.text || '';
  // Extrait le JSON même si le modèle a ajouté du texte autour.
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return { ex, error: 'pas de JSON dans la réponse: ' + text.slice(0, 200) };
  let parsed;
  try { parsed = JSON.parse(jsonMatch[0]); }
  catch (e) { return { ex, error: 'JSON invalide: ' + e.message }; }
  return { ex, ok: parsed.ok === true, correct_index: parsed.correct_index, reason: parsed.reason };
}

async function pMap(items, mapper, concurrency) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (true) {
      const j = i++;
      if (j >= items.length) return;
      try { results[j] = await mapper(items[j], j); }
      catch (e) { results[j] = { ex: items[j], error: e.message }; }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { console.error('ANTHROPIC_API_KEY manquant'); process.exit(1); }
  const client = new Anthropic({ apiKey });

  let all = loadAllExercises();
  console.log(`Total exercices détectés: ${all.length}`);

  if (process.env.ONLY_CHANGED === 'true') {
    const ids = changedIds();
    if (ids && ids.size > 0) {
      all = all.filter((e) => ids.has(e.id));
      console.log(`Mode PR : filtré à ${all.length} questions modifiées`);
    }
  }

  const limit = parseInt(process.env.LIMIT || '0', 10);
  if (limit > 0) all = all.slice(0, limit);

  if (all.length === 0) {
    writeFileSync('verify-report.md', '## ✅ Vérification questions\n\nAucune question à vérifier.\n');
    console.log('Rien à vérifier');
    return;
  }

  console.log(`Vérification de ${all.length} questions (concurrence ${MAX_CONCURRENT})…`);
  const t0 = Date.now();
  const results = await pMap(all, (ex) => verifyOne(client, ex), MAX_CONCURRENT);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);

  const issues = results.filter((r) => r && r.ok === false && !r.skipped && !r.error);
  const errors = results.filter((r) => r && r.error);
  const ok = results.filter((r) => r && r.ok === true).length;
  const skipped = results.filter((r) => r && r.skipped).length;

  const lines = [];
  lines.push(`## ${issues.length === 0 ? '✅' : '⚠️'} Vérification factuelle des questions`);
  lines.push('');
  lines.push(`- **Vérifiées** : ${results.length}`);
  lines.push(`- **OK** : ${ok}`);
  lines.push(`- **À corriger** : **${issues.length}**`);
  lines.push(`- **Ignorées** (pas QCM 4 choix) : ${skipped}`);
  lines.push(`- **Erreurs techniques** : ${errors.length}`);
  lines.push(`- **Durée** : ${dt}s`);
  lines.push('');

  if (issues.length > 0) {
    lines.push('### Questions probablement fausses');
    lines.push('');
    for (const r of issues) {
      const { ex, correct_index, reason } = r;
      const marked = ex.ch[ex.ans];
      const suggested = typeof correct_index === 'number' ? ex.ch[correct_index] : '?';
      lines.push(`#### \`${ex.id}\` — ${ex.cat || ''} (${ex.lv || ''})`);
      lines.push(`> ${ex.q}`);
      lines.push('');
      lines.push(`- Marqué correct : **${marked}**`);
      lines.push(`- Claude pense correct : **${suggested}**`);
      lines.push(`- Raison : *${reason}*`);
      lines.push('');
    }
  } else {
    lines.push('Aucune erreur factuelle détectée. 🎉');
  }

  if (errors.length > 0) {
    lines.push('### Erreurs techniques (à investiguer)');
    for (const r of errors.slice(0, 20)) lines.push(`- \`${r.ex.id}\` : ${r.error}`);
    if (errors.length > 20) lines.push(`- … (${errors.length - 20} autres)`);
  }

  writeFileSync('verify-report.md', lines.join('\n') + '\n');
  console.log(`Rapport écrit : ${issues.length} à corriger, ${ok} OK, ${errors.length} erreurs`);

  // Échec du job si des questions sont marquées fausses (la PR ne peut pas être mergée).
  if (issues.length > 0) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
