// Tout drapeau qui apparaît dans une question doit avoir son dessin — dans
// l'énoncé COMME dans les réponses.
//
// Pourquoi ce contrôle existe : le mécanisme d'affichage retombe volontairement
// sur l'emoji quand le dessin manque, pour qu'aucune question ne devienne
// injouable. Mais cette prudence est silencieuse : 17 pays n'apparaissaient
// que dans les RÉPONSES (« Quel est le drapeau du Japon ? » → 4 choix), aucun
// n'avait de dessin, et l'app affichait des emoji minuscules sans que rien ne
// le signale. Un repli sans alerte finit toujours par devenir un défaut
// permanent.
//
// On vérifie aussi l'inverse : un pays déclaré dans FLAG_FILES sans fichier
// donnerait, lui, une image cassée à l'écran.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const lire = (f) => readFileSync(join(racine, f), 'utf8');

let ok = 0, ko = 0;
const dire = (l, c, d) => { c ? (ok++, console.log('  ✅ ' + l)) : (ko++, console.log('  ❌ ' + l + (d ? ' → ' + d : ''))); };

console.log('\n── Drapeaux dessinés ──');

// Un emoji drapeau est fait de deux « lettres régionales » : 🇫🇷 = F + R.
const iso = (s) => {
  const c = [...String(s || '').trim()];
  if (c.length < 2) return null;
  const a = c[0].codePointAt(0), b = c[1].codePointAt(0);
  if (a < 0x1F1E6 || a > 0x1F1FF || b < 0x1F1E6 || b > 0x1F1FF) return null;
  return String.fromCharCode(a - 0x1F1E6 + 65, b - 0x1F1E6 + 65).toLowerCase();
};

const fichiers = new Set(readdirSync(join(racine, 'images/flags'))
  .filter(f => f.endsWith('.svg')).map(f => f.slice(0, -4)));

const game = lire('game.js');
const bloc = (game.match(/const FLAG_FILES=new Set\(\[([\s\S]*?)\]\)/) || [])[1] || '';
const declares = new Set([...bloc.matchAll(/'([a-z]{2})'/g)].map(m => m[1]));

dire('des drapeaux sont livrés dans images/flags', fichiers.size > 0);
dire('FLAG_FILES est lisible dans game.js', declares.size > 0);

const declaresSansFichier = [...declares].filter(i => !fichiers.has(i));
dire('aucun pays déclaré sans son fichier', declaresSansFichier.length === 0,
  declaresSansFichier.join(' ') + ' → image cassée à l\'écran');

const fichiersNonDeclares = [...fichiers].filter(i => !declares.has(i));
dire('aucun dessin livré mais non déclaré', fichiersNonDeclares.length === 0,
  fichiersNonDeclares.join(' ') + ' → l\'app affichera l\'emoji alors que le dessin existe');

// Tous les drapeaux réellement cités par une question : énoncés (champ `flag`)
// et réponses (un choix qui n'est QUE des lettres régionales).
const sources = ['exercises.js', 'exercises_extra.js', 'exercises_logic.js', 'game.js'].map(lire).join('\n');
const cites = new Set();
for (const m of sources.matchAll(/[\u{1F1E6}-\u{1F1FF}]{2}/gu)) {
  const i = iso(m[0]);
  if (i) cites.add(i);
}
dire('des drapeaux sont cités par les questions', cites.size > 0);

const sansDessin = [...cites].filter(i => !fichiers.has(i)).sort();
dire(`les ${cites.size} pays cités ont tous leur dessin`, sansDessin.length === 0,
  sansDessin.join(' ') + ' → affichés en emoji minuscule');

// Hors connexion, un drapeau absent du pré-cache du Service Worker ne
// s'affiche pas du tout — et ça ne se voit qu'une fois dans le métro.
const sw = lire('sw.js');
const precache = new Set([...sw.matchAll(/images\/flags\/([a-z]{2})\.svg/g)].map(m => m[1]));
const horsCache = [...fichiers].filter(i => !precache.has(i)).sort();
dire('tous les drapeaux sont pré-cachés pour le hors connexion', horsCache.length === 0,
  horsCache.join(' ') + ' → invisibles sans réseau');

// Un SVG vide ou tronqué passerait les contrôles ci-dessus sans rien afficher.
const vides = [...fichiers].filter(i => {
  const s = readFileSync(join(racine, 'images/flags', i + '.svg'), 'utf8');
  return s.length < 80 || !/<svg[\s>]/.test(s) || !/<\/svg>/.test(s);
});
dire('aucun fichier vide ou tronqué', vides.length === 0, vides.join(' '));

console.log('\n══════════════════════════════');
console.log(`  ${ok} réussis · ${ko} échoués`);
console.log('══════════════════════════════');
process.exit(ko ? 1 : 0);
