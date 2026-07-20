#!/usr/bin/env node
/**
 * 1. Copie les fichiers de la web app vers iphone-app/www/static/ (unidirectionnel)
 * 2. Génère iphone-app/www/index.html à partir de l'index.html de la web app,
 *    en injectant le bootstrap TS et un loader qui attend window.Bridge avant
 *    de charger exercises.js + game.js.
 *
 * On ne modifie JAMAIS les fichiers source de la web app.
 * www/static/ ET www/index.html sont tous les deux régénérés à chaque build.
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_APP_ROOT = resolve(HERE, '..', '..');
const WWW_STATIC = resolve(HERE, '..', 'www', 'static');
const WWW_INDEX = resolve(HERE, '..', 'www', 'index.html');

const FILES = ['index.html','game.js','exercises.js','exercises_extra.js','manifest.json','sw.js'];
const DIRS = ['lecons','audio'];

function copyRecursive(srcDir, destDir) {
  if (!existsSync(srcDir)) return { copied: 0, skipped: 1 };
  mkdirSync(destDir, { recursive: true });
  let copied = 0;
  for (const entry of readdirSync(srcDir)) {
    const srcPath = join(srcDir, entry);
    const destPath = join(destDir, entry);
    const st = statSync(srcPath);
    if (st.isDirectory()) copied += copyRecursive(srcPath, destPath).copied;
    else { copyFileSync(srcPath, destPath); copied++; }
  }
  return { copied, skipped: 0 };
}

/**
 * Prend l'index.html de la web app et :
 *  - retire les <script src="exercises*.js"> et <script src="game.js"> (ils seront
 *    chargés dynamiquement APRÈS que window.Bridge soit prêt).
 *  - injecte AVANT </head> le bootstrap module (crée Bridge, installe le shim
 *    localStorage→SQLite).
 *  - injecte AVANT </body> le loader séquentiel.
 *  - ajoute les meta iOS (viewport + status bar) si absentes.
 */
function buildIndexHtml(webAppHtml) {
  let html = webAppHtml;

  html = html.replace(/<script[^>]*src=["']exercises\.js[^"']*["'][^>]*><\/script>\s*/gi, '');
  html = html.replace(/<script[^>]*src=["']exercises_extra\.js[^"']*["'][^>]*><\/script>\s*/gi, '');
  html = html.replace(/<script[^>]*src=["']game\.js[^"']*["'][^>]*><\/script>\s*/gi, '');
  // Service worker : on ne l'enregistre pas dans l'app native (Capacitor gère
  // le cache/offline différemment). Les tags qui l'appellent sont retirés.
  html = html.replace(/<script[^>]*sw\.js[^<]*<\/script>\s*/gi, '');

  const iosMeta = [
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
    '<meta name="mobile-web-app-capable" content="yes">'
  ];
  if (!/viewport-fit=cover/.test(html)) {
    html = html.replace(/<meta name="viewport"[^>]*>/i, iosMeta[0]);
  }
  for (const meta of iosMeta.slice(1)) {
    const nameMatch = meta.match(/name="([^"]+)"/);
    if (nameMatch && !new RegExp(`name="${nameMatch[1]}"`, 'i').test(html)) {
      html = html.replace('</head>', `${meta}\n</head>`);
    }
  }

  const safeAreaCss = `<style id="ios-safe-areas">
    body {
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }
    html, body { overscroll-behavior-y: contain; -webkit-touch-callout: none; }
  </style>`;
  html = html.replace('</head>', `${safeAreaCss}\n</head>`);

  const bootstrap = '<script type="module" src="../src/bootstrap.ts"></script>';
  html = html.replace('</head>', `${bootstrap}\n</head>`);

  const loader = `<script>
(async function iosBoot() {
  var start = Date.now(), maxWait = 8000;
  while (!window.Bridge && (Date.now() - start) < maxWait) {
    await new Promise(function(r){ setTimeout(r, 40); });
  }
  if (window.Bridge && window.Bridge.ready) {
    try { await window.Bridge.ready; } catch (e) { /* on continue quand même */ }
  }
  function load(src) {
    return new Promise(function(res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.body.appendChild(s);
    });
  }
  try {
    await load('/exercises.js?v=native');
    await load('/exercises_extra.js?v=native');
    await load('/game.js?v=native');
  } catch (e) {
    document.body.insertAdjacentHTML('afterbegin',
      '<div style="position:fixed;inset:0;background:#0f0a2e;color:#f87171;display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;padding:24px;text-align:center">Erreur au chargement.<br>Réouvre l\\'application.</div>');
  }
})();
</script>`;
  html = html.replace('</body>', `${loader}\n</body>`);

  return html;
}

function main() {
  console.log('📦 Synchronisation web app → iphone-app/www/');
  console.log('   source :', WEB_APP_ROOT);

  if (existsSync(WWW_STATIC)) rmSync(WWW_STATIC, { recursive: true, force: true });
  mkdirSync(WWW_STATIC, { recursive: true });

  let totalFiles = 0;

  for (const f of FILES) {
    const src = join(WEB_APP_ROOT, f);
    const dest = join(WWW_STATIC, f);
    if (!existsSync(src)) { console.warn(`   ⚠  ${f} absent, ignoré`); continue; }
    copyFileSync(src, dest);
    totalFiles++;
    console.log(`   ✔ ${f}`);
  }

  for (const d of DIRS) {
    const src = join(WEB_APP_ROOT, d);
    const dest = join(WWW_STATIC, d);
    const { copied, skipped } = copyRecursive(src, dest);
    if (skipped) console.warn(`   ⚠  ${d}/ absent, ignoré`);
    else { totalFiles += copied; console.log(`   ✔ ${d}/ (${copied} fichiers)`); }
  }

  const webAppIndex = readFileSync(join(WEB_APP_ROOT, 'index.html'), 'utf8');
  const generated = buildIndexHtml(webAppIndex);
  writeFileSync(WWW_INDEX, generated);
  console.log(`   ✔ www/index.html généré (${generated.length} octets)`);

  console.log(`✅ ${totalFiles} fichiers copiés + www/index.html régénéré.`);
}

main();
