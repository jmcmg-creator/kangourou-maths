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

// gpt-4o-mini-tts comprend des instructions de style et donne une lecture
// nettement plus expressive que tts-1-hd. Voix « fable » = conteur.
const MODEL = process.env.TTS_MODEL || 'gpt-4o-mini-tts';
const VOICE = process.env.TTS_VOICE || 'fable';
const FORCE = process.env.FORCE === '1';
const INSTRUCTIONS = process.env.TTS_INSTRUCTIONS || "Lis ce texte en français comme un conteur professionnel pour enfants de 7 à 11 ans : avec émotion et intonation marquée, en variant le ton et le rythme, en faisant des pauses entre les vers et après les virgules, et en donnant vie aux personnages quand ils parlent. Articule clairement. Garde un ton chaleureux et bienveillant.";

// Retire les balises HTML (ex. <br>) avant d'envoyer le texte à TTS.
function stripHtml(t){return String(t).replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'').replace(/\s+\n/g,'\n').trim();}

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
    const cleanText = stripHtml(f.text);
    // Tente d'abord le modèle haut de gamme avec instructions, puis bascule
    // sur tts-1-hd si le compte OpenAI n'a pas accès à gpt-4o-mini-tts.
    async function callTTS(model, voice, withInstr) {
      const body = { model, voice, input: cleanText, response_format: 'mp3' };
      if (withInstr && model.startsWith('gpt-4o')) body.instructions = INSTRUCTIONS;
      return fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    }
    let r = await callTTS(MODEL, VOICE, true);
    if (!r.ok && MODEL.startsWith('gpt-4o')) {
      const err = await r.text();
      console.warn(`⚠  ${f.id}: ${MODEL} a échoué (HTTP ${r.status}: ${err.slice(0,120)}). Bascule sur tts-1-hd.`);
      // La voix "fable" existe aussi sur tts-1-hd.
      r = await callTTS('tts-1-hd', VOICE, false);
    }
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
