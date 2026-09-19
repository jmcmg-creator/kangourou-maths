#!/usr/bin/env node
// Vérification factuelle des questions à choix multiples par Kimi K2 (Moonshot AI),
// gratuit via OpenRouter — Julien ne voulait pas payer un abonnement IA juste pour
// relire des questions de primaire. Pour chaque question, on demande au modèle :
//   1. Quelle est la bonne réponse (parmi A/B/C/D) ?
//   2. Est-elle d'accord avec l'index `ans` du fichier ?
//   3. Si non, pourquoi (en 1 phrase) ?
// Sortie : verify-report.md avec les questions problématiques.
//
// Variables d'env :
//   OPENROUTER_API_KEY (obligatoire, secret GitHub — gratuit à créer sur openrouter.ai)
//   MODEL               (optionnel, défaut moonshotai/kimi-k2:free)
//   LIMIT               (optionnel : nombre max de questions à vérifier)
//   OFFSET              (optionnel : à quel index commencer — pour un contrôle manuel ciblé)
//   ONLY_CHANGED        (optionnel : 'true' = ne vérifie que les questions modifiées par la PR)
//
// POURQUOI PAR LOTS LE LUNDI
// Le compte gratuit OpenRouter est plafonné à 20 requêtes/minute ET 50/jour tant que
// personne n'a jamais acheté 10 € de crédit (ce plafond monte alors à 1000/jour, à
// vie — un achat unique, pas un abonnement). Avec 1200 questions dans la banque, un
// balayage complet ne tient pas dans une seule journée gratuite : chaque lundi ne
// vérifie donc qu'un LOT tournant (BATCH_SIZE questions, avec de la marge sous 50
// pour laisser de la place aux vérifications de pull request le même jour), et le
// balayage complet revient à son point de départ après ROTATION_WEEKS semaines.
// Une question tout juste modifiée par une PR est, elle, TOUJOURS vérifiée
// immédiatement (mode ONLY_CHANGED, en dehors de cette rotation) : c'est le vrai
// filet de sécurité. Le balayage hebdomadaire n'est qu'un fond de teint qui repasse
// lentement sur les questions plus anciennes.

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const MODEL = process.env.MODEL || 'moonshotai/kimi-k2:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '40', 10); // sous les 50/jour gratuits
const MIN_INTERVAL_MS = 3200; // un peu plus de 3s : reste sous les 20 requêtes/minute gratuites
const MAX_RETRIES_429 = 3;
const SYSTEM = `Tu es un correcteur expert. On te donne une question à choix multiples destinée à des enfants (CP à CM2) et l'index (0-3) de la réponse marquée correcte par l'auteur. Vérifie si la réponse marquée est bien factuellement correcte. Si plusieurs choix sont défendables ou si la question est ambiguë, signale-le. Réponds STRICTEMENT en JSON, sans texte autour :
{"ok": true|false, "correct_index": 0-3, "reason": "<1 phrase si ok=false, sinon vide>"}
`;

// ── Lecture des exercices ─────────────────────────────────────────────
// exercises.js déclare et remplit SON PROPRE `const EX=[...]` (script classique,
// pas un module) ; exercises_extra.js réutilise ensuite ce même tableau via
// `EX.push(...)`, exactement comme le fait le navigateur quand les deux
// <script> se suivent dans index.html. On reproduit ce même enchaînement :
// passer un objet `EX` en paramètre à exercises.js casserait sa propre
// déclaration `const EX` (double déclaration du même nom → SyntaxError).
export function loadAllExercises() {
  let all = [];
  try {
    const src1 = readFileSync('exercises.js', 'utf8');
    // eslint-disable-next-line no-new-func
    all = new Function(src1 + '\n;return typeof EX!=="undefined"?EX:[];')();
  } catch (e) { console.warn('exercises.js:', e.message); }
  try {
    const src2 = readFileSync('exercises_extra.js', 'utf8');
    const before = all.length;
    // eslint-disable-next-line no-new-func
    new Function('EX', src2)(all);
    console.log(`exercises_extra.js a ajouté ${all.length - before} exercices`);
  } catch (e) { console.warn('exercises_extra.js:', e.message); }
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

// ── Un seul créneau de requête toutes les MIN_INTERVAL_MS, partagé entre
// tous les appels concurrents : c'est ce qui garantit le respect des
// 20 requêtes/minute gratuites, quel que soit le nombre de tâches en vol.
// Tout l'état (créneau, quota épuisé) vit dans l'objet retourné, pas dans
// des variables de module : un test peut ainsi créer une instance isolée,
// avec un fetch simulé et des délais raccourcis, sans dépendre de l'ordre
// d'exécution des autres tests ni de vraie temporisation.
export function creerAppelModele({
  apiKey,
  fetchImpl = fetch,
  model = MODEL,
  minIntervalMs = MIN_INTERVAL_MS,
  maxRetries429 = MAX_RETRIES_429,
  attendre = (ms) => new Promise((r) => setTimeout(r, ms)),
} = {}) {
  let nextSlot = 0;
  let quotaEpuise = false;

  async function attendreSonCreneau() {
    const maintenant = Date.now();
    const debut = Math.max(maintenant, nextSlot);
    nextSlot = debut + minIntervalMs;
    const attente = debut - maintenant;
    if (attente > 0) await attendre(attente);
  }

  async function appelerModele(userMsg) {
    for (let essai = 0; essai <= maxRetries429; essai++) {
      await attendreSonCreneau();
      const res = await fetchImpl(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          // OpenRouter s'en sert pour le classement des apps sur son site ;
          // sans incidence sur le quota gratuit, mais recommandé par leur doc.
          'HTTP-Referer': 'https://github.com/jmcmg-creator/kangourou-maths',
          'X-Title': 'Le Royaume des Savoirs — vérif questions',
        },
        body: JSON.stringify({
          model,
          max_tokens: 200,
          messages: [
            { role: 'system', content: SYSTEM },
            { role: 'user', content: userMsg },
          ],
        }),
      });
      if (res.status === 429) {
        if (essai === maxRetries429) { quotaEpuise = true; return { rateLimited: true }; }
        const retryAfter = parseFloat(res.headers.get('retry-after') || '');
        const patience = Number.isFinite(retryAfter) ? retryAfter * 1000 : 4000 * 2 ** essai;
        await attendre(patience);
        continue;
      }
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} : ${body.slice(0, 300)}`);
      }
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '';
      return { text };
    }
    return { rateLimited: true };
  }

  async function verifyOne(ex) {
    if (!Array.isArray(ex.ch) || ex.ch.length !== 4 || typeof ex.ans !== 'number') {
      return { ex, skipped: true, reason: 'pas QCM 4 choix' };
    }
    if (quotaEpuise) return { ex, rateLimited: true };
    const userMsg = `Question: ${ex.q}\nChoix:\nA) ${ex.ch[0]}\nB) ${ex.ch[1]}\nC) ${ex.ch[2]}\nD) ${ex.ch[3]}\nIndex marqué correct (0=A, 1=B, 2=C, 3=D): ${ex.ans}\nExplication fournie : ${ex.se || '(aucune)'}\n\nRéponds en JSON strict.`;
    const { text, rateLimited } = await appelerModele(userMsg);
    if (rateLimited) return { ex, rateLimited: true };
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { ex, error: 'pas de JSON dans la réponse: ' + text.slice(0, 200) };
    let parsed;
    try { parsed = JSON.parse(jsonMatch[0]); }
    catch (e) { return { ex, error: 'JSON invalide: ' + e.message }; }
    return { ex, ok: parsed.ok === true, correct_index: parsed.correct_index, reason: parsed.reason };
  }

  return { appelerModele, verifyOne, estQuotaEpuise: () => quotaEpuise };
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

export function choisirLot(all, { batchSize = BATCH_SIZE, maintenant = Date.now() } = {}) {
  // Nombre de semaines depuis une date fixe, pour une rotation stable d'un
  // run à l'autre sans avoir besoin de mémoriser où on en était.
  const nbLots = Math.max(1, Math.ceil(all.length / batchSize));
  const semaines = Math.floor(maintenant / (7 * 24 * 3600 * 1000));
  const lot = semaines % nbLots;
  const debut = lot * batchSize;
  console.log(`Balayage hebdomadaire : lot ${lot + 1}/${nbLots} (questions ${debut + 1} à ${Math.min(debut + batchSize, all.length)} sur ${all.length})`);
  return all.slice(debut, debut + batchSize);
}

async function main() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { console.error('OPENROUTER_API_KEY manquant'); process.exit(1); }

  let all = loadAllExercises();
  console.log(`Total exercices détectés: ${all.length}`);

  const onlyChanged = process.env.ONLY_CHANGED === 'true';
  if (onlyChanged) {
    const ids = changedIds();
    if (ids && ids.size > 0) {
      all = all.filter((e) => ids.has(e.id));
      console.log(`Mode PR : filtré à ${all.length} questions modifiées`);
    }
  } else if (!process.env.LIMIT && !process.env.OFFSET) {
    // Ni PR (questions ciblées), ni contrôle manuel explicite : c'est le
    // balayage périodique, par lot tournant (voir l'explication en tête de
    // fichier — le compte gratuit ne tient pas 1200 questions en un jour).
    all = choisirLot(all);
  }

  const offset = parseInt(process.env.OFFSET || '0', 10);
  if (offset > 0) all = all.slice(offset);
  const limit = parseInt(process.env.LIMIT || '0', 10);
  if (limit > 0) all = all.slice(0, limit);

  if (all.length === 0) {
    writeFileSync('verify-report.md', '## ✅ Vérification questions\n\nAucune question à vérifier.\n');
    console.log('Rien à vérifier');
    return;
  }

  console.log(`Vérification de ${all.length} questions avec ${MODEL} (≈1 requête/${(MIN_INTERVAL_MS / 1000).toFixed(1)}s)…`);
  const t0 = Date.now();
  // Une seule requête à la fois « en vol » : le vrai débit est fixé par
  // attendreSonCreneau(), la concurrence ne ferait qu'entasser des requêtes
  // qui attendraient toutes le même verrou.
  const { verifyOne } = creerAppelModele({ apiKey });
  const results = await pMap(all, (ex) => verifyOne(ex), 3);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);

  const issues = results.filter((r) => r && r.ok === false && !r.skipped && !r.error && !r.rateLimited);
  const errors = results.filter((r) => r && r.error);
  const rateLimited = results.filter((r) => r && r.rateLimited);
  const ok = results.filter((r) => r && r.ok === true).length;
  const skipped = results.filter((r) => r && r.skipped).length;

  const lines = [];
  lines.push(`## ${issues.length === 0 ? '✅' : '⚠️'} Vérification factuelle des questions (${MODEL})`);
  lines.push('');
  lines.push(`- **Vérifiées** : ${results.length}`);
  lines.push(`- **OK** : ${ok}`);
  lines.push(`- **À corriger** : **${issues.length}**`);
  lines.push(`- **Ignorées** (pas QCM 4 choix) : ${skipped}`);
  lines.push(`- **Erreurs techniques** : ${errors.length}`);
  if (rateLimited.length > 0) {
    lines.push(`- **Non vérifiées, quota gratuit journalier atteint** : ${rateLimited.length} — ce n'est pas une erreur de contenu, juste remis à demain`);
  }
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
      lines.push(`- ${MODEL} pense correct : **${suggested}**`);
      lines.push(`- Raison : *${reason}*`);
      lines.push('');
    }
  } else {
    lines.push('Aucune erreur factuelle détectée parmi les questions vérifiées. 🎉');
  }

  if (errors.length > 0) {
    lines.push('### Erreurs techniques (à investiguer)');
    for (const r of errors.slice(0, 20)) lines.push(`- \`${r.ex.id}\` : ${r.error}`);
    if (errors.length > 20) lines.push(`- … (${errors.length - 20} autres)`);
  }

  writeFileSync('verify-report.md', lines.join('\n') + '\n');
  console.log(`Rapport écrit : ${issues.length} à corriger, ${ok} OK, ${errors.length} erreurs, ${rateLimited.length} remises à plus tard`);
  // Le rapport détaillé part dans un artefact séparé (pas toujours accessible,
  // p. ex. depuis une session sans accès au stockage qui l'héberge) : on met
  // aussi les premières erreurs dans le journal du job, qui lui reste toujours lisible.
  for (const r of errors.slice(0, 5)) console.log(`  ❌ ${r.ex.id} : ${r.error}`);

  // Échec du job seulement si une VRAIE erreur de contenu est trouvée (la PR
  // ne peut pas être mergée). Un quota épuisé n'est pas un problème de
  // contenu : il aurait exactement la même couleur rouge qu'un vrai
  // problème, et c'est justement ce qu'on veut éviter (voir le commentaire
  // du workflow sur la clé absente).
  if (issues.length > 0) process.exit(1);
}

// Lancé directement (le workflow fait `node scripts/verify-questions.mjs`) : on
// exécute. Importé par un test pour les fonctions pures ci-dessus : on n'exécute
// pas main() tout seul, sinon un `import` déclencherait de vrais appels réseau.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
