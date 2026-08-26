// Le numéro de version d'un fichier doit être le MÊME dans index.html et dans
// la liste de pré-cache du Service Worker.
//
// Pourquoi c'est un vrai piège : si index.html demande « game.js?v=57 » alors
// que le Service Worker a mis « game.js?v=56 » en cache, ce sont pour lui deux
// adresses différentes. Il a rempli son cache avec un fichier que personne ne
// demandera jamais, et la vraie requête part sur le réseau. Hors connexion,
// l'app ne démarre plus — et rien, au moment de la livraison, ne le signale :
// tout marche parfaitement tant qu'on a du réseau.
//
// C'est déjà arrivé : un oubli de bump dans sw.js pendant qu'index.html était
// à jour. Ce contrôle ne demande aucun réseau et prend un centième de seconde.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(join(racine, 'index.html'), 'utf8');
const sw = readFileSync(join(racine, 'sw.js'), 'utf8');

let ok = 0, ko = 0;
const dire = (l, c, d) => { c ? (ok++, console.log('  ✅ ' + l)) : (ko++, console.log('  ❌ ' + l + (d ? ' → ' + d : ''))); };

console.log('\n── Versions des fichiers (index.html ↔ sw.js) ──');

// « <script src="game.js?v=57"> » → { 'game.js': '57' }
const versIndex = {};
for (const m of index.matchAll(/<script src="([^"?]+)\?v=(\d+)"/g)) versIndex[m[1]] = m[2];
// « './game.js?v=57', » dans SHELL_URLS
const versSw = {};
for (const m of sw.matchAll(/'\.\/([^'?]+\.js)\?v=(\d+)'/g)) versSw[m[1]] = m[2];

dire('index.html référence des scripts versionnés', Object.keys(versIndex).length > 0);
dire('sw.js pré-cache des scripts versionnés', Object.keys(versSw).length > 0);

for (const [f, v] of Object.entries(versSw)) {
  if (!(f in versIndex)) {
    dire(`${f} : pré-caché par sw.js mais absent d'index.html`, false, 'URL mise en cache pour rien');
    continue;
  }
  dire(`${f} : v${v} des deux côtés`, versIndex[f] === v, `index.html=v${versIndex[f]} · sw.js=v${v}`);
}
for (const f of Object.keys(versIndex)) {
  if (!(f in versSw)) dire(`${f} : chargé par index.html mais jamais pré-caché`, false, 'indisponible hors connexion');
}

// APP_VERSION (affiché dans l'Espace Parent) et CACHE_VERSION doivent avancer
// ensemble : c'est la seule façon, en regardant un téléphone, de savoir quelle
// version il fait tourner.
const game = readFileSync(join(racine, 'game.js'), 'utf8');
const app = (game.match(/const APP_VERSION\s*=\s*'v(\d+)'/) || [])[1];
const cache = (sw.match(/const CACHE_VERSION\s*=\s*'royaume-v(\d+)'/) || [])[1];
dire('APP_VERSION est défini dans game.js', !!app);
dire('CACHE_VERSION est défini dans sw.js', !!cache);
dire('APP_VERSION et CACHE_VERSION sont au même numéro', app === cache, `APP_VERSION=v${app} · CACHE_VERSION=v${cache}`);

console.log('\n══════════════════════════════');
console.log(`  ${ok} réussis · ${ko} échoués`);
console.log('══════════════════════════════');
process.exit(ko ? 1 : 0);
