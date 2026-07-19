#!/usr/bin/env node
/**
 * Copie les fichiers de la web app (à la racine du dépôt) vers
 * iphone-app/www/static/ pour qu'ils soient bundlés dans l'app iOS.
 *
 * Copie unidirectionnelle : on ne modifie JAMAIS les fichiers source.
 * Cette copie est régénérée à chaque build (les cibles sont dans .gitignore).
 */
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_APP_ROOT = resolve(HERE, '..', '..');       // racine du dépôt
const WWW_STATIC = resolve(HERE, '..', 'www', 'static');

// Fichiers plats à copier
const FILES = [
  'index.html',
  'game.js',
  'exercises.js',
  'exercises_extra.js',
  'manifest.json',
  'sw.js'
];

// Dossiers à copier récursivement
const DIRS = ['lecons', 'audio'];

function copyRecursive(srcDir, destDir) {
  if (!existsSync(srcDir)) return { copied: 0, skipped: 1 };
  mkdirSync(destDir, { recursive: true });
  let copied = 0;
  for (const entry of readdirSync(srcDir)) {
    const srcPath = join(srcDir, entry);
    const destPath = join(destDir, entry);
    const st = statSync(srcPath);
    if (st.isDirectory()) {
      const r = copyRecursive(srcPath, destPath);
      copied += r.copied;
    } else {
      copyFileSync(srcPath, destPath);
      copied++;
    }
  }
  return { copied, skipped: 0 };
}

function main() {
  console.log('📦 Synchronisation web app → iphone-app/www/static/');
  console.log('   source :', WEB_APP_ROOT);
  console.log('   cible  :', WWW_STATIC);

  // Nettoyage préalable pour éviter les fichiers orphelins d'une version antérieure
  if (existsSync(WWW_STATIC)) rmSync(WWW_STATIC, { recursive: true, force: true });
  mkdirSync(WWW_STATIC, { recursive: true });

  let totalFiles = 0;

  for (const f of FILES) {
    const src = join(WEB_APP_ROOT, f);
    const dest = join(WWW_STATIC, f);
    if (!existsSync(src)) {
      console.warn(`   ⚠  ${f} absent de la web app, ignoré`);
      continue;
    }
    copyFileSync(src, dest);
    totalFiles++;
    console.log(`   ✔ ${f}`);
  }

  for (const d of DIRS) {
    const src = join(WEB_APP_ROOT, d);
    const dest = join(WWW_STATIC, d);
    const { copied, skipped } = copyRecursive(src, dest);
    if (skipped) {
      console.warn(`   ⚠  ${d}/ absent, ignoré`);
    } else {
      totalFiles += copied;
      console.log(`   ✔ ${d}/ (${copied} fichiers)`);
    }
  }

  console.log(`✅ ${totalFiles} fichiers copiés.`);
}

main();
