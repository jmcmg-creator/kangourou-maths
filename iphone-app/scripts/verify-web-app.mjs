#!/usr/bin/env node
/**
 * Vérifie que les fichiers critiques de la web app à la racine du dépôt
 * n'ont pas été modifiés par le projet iPhone.
 *
 * Modes :
 *   --record  : calcule les hashes et les écrit dans web-app-hashes.json (à faire une seule fois, ou après une modif volontaire de la web app faite depuis un commit hors du projet iPhone).
 *   (défaut)  : compare aux hashes de référence, code de sortie 1 en cas de différence.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_APP_ROOT = resolve(HERE, '..', '..');
const HASHES_FILE = resolve(HERE, 'web-app-hashes.json');

const FILES = [
  'index.html',
  'game.js',
  'exercises.js',
  'exercises_extra.js',
  'manifest.json',
  'sw.js'
];

function sha256(path) {
  if (!existsSync(path)) return null;
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function currentHashes() {
  const out = {};
  for (const f of FILES) {
    const h = sha256(join(WEB_APP_ROOT, f));
    if (h) out[f] = h;
  }
  return out;
}

const args = process.argv.slice(2);

if (args.includes('--record')) {
  const hashes = currentHashes();
  writeFileSync(HASHES_FILE, JSON.stringify(hashes, null, 2) + '\n');
  console.log('✅ Références enregistrées dans', HASHES_FILE);
  console.log(Object.keys(hashes).length, 'fichiers indexés.');
  process.exit(0);
}

if (!existsSync(HASHES_FILE)) {
  console.log('ℹ  Pas encore de références. Lance : node scripts/verify-web-app.mjs --record');
  process.exit(0);
}

const expected = JSON.parse(readFileSync(HASHES_FILE, 'utf8'));
const actual = currentHashes();

let diffs = 0;
for (const f of FILES) {
  if (expected[f] && actual[f] && expected[f] !== actual[f]) {
    console.error(`❌ MODIFIÉ : ${f}`);
    diffs++;
  } else if (expected[f] && !actual[f]) {
    console.error(`❌ SUPPRIMÉ : ${f}`);
    diffs++;
  }
}

if (diffs > 0) {
  console.error(`\n${diffs} fichier(s) de la web app ont changé depuis la dernière référence.`);
  console.error('Si ces modifications sont légitimes (faites depuis un commit hors du projet iPhone),');
  console.error('lance : node scripts/verify-web-app.mjs --record');
  process.exit(1);
}

console.log('✅ Web app intacte,', Object.keys(expected).length, 'fichiers vérifiés.');
