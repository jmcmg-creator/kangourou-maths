#!/usr/bin/env node
/**
 * Génère les icônes iOS aux tailles requises par Xcode à partir d'un SVG.
 * Utilise `sharp` si installé, sinon écrit un SVG placeholder et laisse
 * l'utilisateur convertir avec un outil de son choix.
 *
 * Emplacement source : assets/icons/master.svg (à fournir par le parent).
 * Sortie : assets/icons/ios/{size}.png
 * L'étape finale (import dans Xcode → Assets.xcassets → AppIcon) est
 * documentée dans docs/IOS_BUILD_AND_RELEASE.md.
 */
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const MASTER = join(ROOT, 'assets/icons/master.svg');
const OUT = join(ROOT, 'assets/icons/ios');

// Tailles requises par iOS (marketing + toutes déclinaisons in-app).
const SIZES = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024];

function placeholderSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0f0a2e"/>
      <stop offset="1" stop-color="#1a1145"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="180" fill="url(#bg)"/>
  <text x="512" y="640" text-anchor="middle" font-family="-apple-system, sans-serif"
        font-size="520" fill="#fbbf24">&#127984;</text>
</svg>`;
}

async function main() {
  mkdirSync(dirname(MASTER), { recursive: true });
  mkdirSync(OUT, { recursive: true });

  if (!existsSync(MASTER)) {
    writeFileSync(MASTER, placeholderSvg());
    console.log('ℹ  master.svg absent → placeholder écrit :', MASTER);
  }

  let sharp;
  try { sharp = (await import('sharp')).default; }
  catch {
    console.log('⚠  Le module `sharp` n\'est pas installé. Les icônes PNG ne seront pas générées.');
    console.log('   Pour les générer : npm i -D sharp puis relance ce script.');
    console.log('   Alternative : @capacitor/assets (npx @capacitor/assets generate --iconBackgroundColor "#0f0a2e")');
    return;
  }

  const svg = readFileSync(MASTER);
  for (const size of SIZES) {
    const out = join(OUT, `${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(out);
    console.log(`✔ ${size}×${size}px → ${out}`);
  }
  console.log(`\n✅ ${SIZES.length} icônes générées. Importe le dossier ios/ dans`);
  console.log('   Xcode via Assets.xcassets → AppIcon.');
}

main().catch(err => { console.error(err); process.exit(1); });
