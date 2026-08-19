#!/usr/bin/env node
// Construit www/ : copie l'app web (racine du repo) dans le webDir Capacitor.
// L'app iOS embarque TOUT le contenu → fonctionne 100% offline des le
// premier lancement (exercices, lecons, inventions, memory, poesies).
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');   // racine du repo
const www  = join(here, '..', 'www');

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

const files = [
  'index.html', 'game.js', 'exercises.js', 'exercises_extra.js',
  'exercises_logic.js',
  'qr.js', 'config.js', 'supa.js', 'manifest.json', 'sw.js',
  'confidentialite.html'
];
const dirs = ['lecons', 'audio'];

for (const f of files) {
  const src = join(root, f);
  if (!existsSync(src)) { console.warn('[build] absent, ignore:', f); continue; }
  cpSync(src, join(www, f));
  console.log('[build] copie', f);
}
for (const d of dirs) {
  const src = join(root, d);
  if (!existsSync(src)) { console.warn('[build] absent, ignore:', d); continue; }
  cpSync(src, join(www, d), { recursive: true });
  console.log('[build] copie', d + '/');
}
console.log('[build] www/ pret');
