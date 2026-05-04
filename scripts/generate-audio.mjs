#!/usr/bin/env node
/**
 * Génère un MP3 par poème via l'API OpenAI TTS.
 *
 * Usage local :
 *   OPENAI_API_KEY=sk-... node scripts/generate-audio.mjs
 *
 * Variables d'environnement :
 *   OPENAI_API_KEY  (obligatoire)
 *   TTS_MODEL       (optionnel, défaut "tts-1-hd")
 *   TTS_VOICE       (optionnel, défaut "nova" ; alternatives: alloy, echo, fable, onyx, shimmer)
 *   FORCE           (optionnel, "1" pour réécraser les MP3 existants)
 *
 * Le script :
 *   - Extrait FABLES depuis game.js
 *   - Pour chaque entrée, génère audio/<id>.mp3 (si absent ou FORCE=1)
 *   - Met à jour FABLES.audioUrl dans game.js avec un chemin relatif
 *   - Coût indicatif : ~0,30 € pour 17 poèmes (tts-1-hd à $0.030/1K chars)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GAME_JS = join(ROOT, 'game.js');
const AUDIO_DIR = join(ROOT, 'audio');

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error('❌ OPENAI_API_KEY manquante. export OPENAI_API_KEY=sk-...');
  process.exit(1);
}

const MODEL = process.env.TTS_MODEL || 'tts-1-hd';
const VOICE = process.env.TTS_VOICE || 'nova';
const FORCE = process.env.FORCE === '1';

if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

// --- Extraction de FABLES depuis game.js (sans charger tout le module) ---
const src = readFileSync(GAME_JS, 'utf8');
const m = src.match(/const FABLES=\[[\s\S]*?\n\];/);
if (!m) { console.error('FABLES non trouvé dans game.js'); process.exit(1); }
// On évalue dans un scope isolé pour récupérer le tableau
const fables = (new Function('return ' + m[0].replace(/^const FABLES=/, '') + ';'))();
console.log(`📖 ${fables.length} poèmes trouvés dans FABLES.`);

// --- Génération ---
let updatedSrc = src;
let generated = 0;
let updates = 0;

for (const f of fables) {
  const out = join(AUDIO_DIR, `${f.id}.mp3`);
  if (existsSync(out) && !FORCE) {
    console.log(`⏭  ${f.id}: déjà présent (skip).`);
  } else {
    console.log(`🎙  ${f.id}: génération...`);
    const r = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, voice: VOICE, input: f.text, response_format: 'mp3' })
    });
    if (!r.ok) {
      const err = await r.text();
      console.error(`❌ ${f.id}: HTTP ${r.status} — ${err.slice(0, 200)}`);
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(out, buf);
    const sizeKb = (statSync(out).size / 1024).toFixed(1);
    console.log(`✅ ${f.id}: ${sizeKb} Ko sauvegardé.`);
    generated++;
  }
  // S'assurer que game.js référence audioUrl
  const relUrl = `audio/${f.id}.mp3`;
  if (!f.audioUrl || f.audioUrl !== relUrl) {
    // Insère/Met à jour audioUrl dans game.js — précautionneux : on cherche le bloc exact de cette fable
    const fableRegex = new RegExp(`(\\{id:"${f.id.replace(/[-\\/\\^$*+?.()|[\\]{}]/g, '\\\\$&')}"[\\s\\S]*?)(\\})\\s*(?=,\\n|$)`);
    if (fableRegex.test(updatedSrc) && !updatedSrc.match(fableRegex)[0].includes('audioUrl:')) {
      updatedSrc = updatedSrc.replace(fableRegex, (full, body, close) => {
        return body + `,audioUrl:"${relUrl}"` + close;
      });
      updates++;
    }
  }
}

if (updates > 0) {
  writeFileSync(GAME_JS, updatedSrc);
  console.log(`🔧 game.js : ${updates} entrées audioUrl ajoutées.`);
}

console.log(`\n✨ Terminé. ${generated} nouveau(x) MP3 générés.`);
console.log('   Ajoute-les au commit : git add audio/ game.js && git commit -m "audio: génération TTS"');
