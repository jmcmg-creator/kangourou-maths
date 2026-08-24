/* Épingle les actions GitHub sur une empreinte de commit.
 *
 * POURQUOI
 * « uses: actions/checkout@v4 » ne désigne pas un code précis : v4 est une
 * étiquette, que son propriétaire peut déplacer vers n'importe quel contenu,
 * à tout moment, sans prévenir. Si son compte est compromis, le code de
 * l'attaquant s'exécute au prochain passage de vos workflows — c'est ainsi
 * que trivy-action et kics-github-action ont été piégés.
 * Une empreinte de commit, elle, ne se déplace pas.
 *
 * USAGE
 *   1. Remplir les « sha » dans scripts/actions-epinglees.json
 *      (voir docs/EPINGLER-ACTIONS.md pour savoir où les trouver)
 *   2. node scripts/epingler-actions.mjs
 *
 *   node scripts/epingler-actions.mjs --verifier   → contrôle sans rien écrire
 *
 * Le script ne réécrit RIEN tant qu'une seule empreinte manque ou est
 * malformée : un workflow à moitié épinglé casserait toutes les livraisons.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const dossier = join(racine, '.github', 'workflows');
const config = join(racine, 'scripts', 'actions-epinglees.json');
const verifierSeulement = process.argv.includes('--verifier');

const SHA = /^[0-9a-f]{40}$/;
const USES = /uses:\s*([A-Za-z0-9._-]+\/[A-Za-z0-9._/-]+)@([A-Za-z0-9._-]+)/g;

const fichiers = readdirSync(dossier).filter(f => /\.ya?ml$/.test(f));
const conf = JSON.parse(readFileSync(config, 'utf8'));

// ── Ce que les workflows utilisent réellement ────────────────────────
const utilisees = new Map();          // action → Set(références actuelles)
for (const f of fichiers) {
  const src = readFileSync(join(dossier, f), 'utf8');
  for (const m of src.matchAll(USES)) {
    if (!utilisees.has(m[1])) utilisees.set(m[1], new Set());
    utilisees.get(m[1]).add(m[2]);
  }
}

let bloquant = 0;

// ── Une action utilisée mais absente du fichier passerait entre les
//    mailles : on le signale plutôt que de l'ignorer. ─────────────────
for (const action of utilisees.keys()) {
  if (!conf[action]) {
    console.log(`  ❌ ${action} est utilisée mais absente de actions-epinglees.json`);
    bloquant++;
  }
}

// ── Contrôle des empreintes ──────────────────────────────────────────
const aEpingler = [];
for (const [action, v] of Object.entries(conf)) {
  if (action.startsWith('_')) continue;
  const refs = utilisees.get(action);
  if (!refs) { console.log(`  ⚠️  ${action} est listée mais plus utilisée — ligne inutile`); continue; }
  if ([...refs].every(r => SHA.test(r))) { console.log(`  ✅ ${action} déjà épinglée`); continue; }
  if (!v.sha) {
    console.log(`  ⬜ ${action}@${v.tag} — empreinte à remplir`);
    bloquant++; continue;
  }
  if (!SHA.test(v.sha)) {
    console.log(`  ❌ ${action} — « ${v.sha} » n'est pas une empreinte (40 caractères 0-9 a-f)`);
    bloquant++; continue;
  }
  aEpingler.push([action, v]);
}

if (bloquant) {
  console.log(`\n  ${bloquant} point(s) à régler avant de pouvoir épingler.`);
  console.log('  Rien n\'a été modifié : un workflow à moitié épinglé casserait les livraisons.');
  console.log('  Où trouver les empreintes → docs/EPINGLER-ACTIONS.md');
  process.exit(1);
}

if (verifierSeulement) {
  console.log(`\n  ✅ tout est prêt : ${aEpingler.length} action(s) à épingler.`);
  process.exit(0);
}

// ── Réécriture ───────────────────────────────────────────────────────
let total = 0;
for (const f of fichiers) {
  const chemin = join(dossier, f);
  let src = readFileSync(chemin, 'utf8');
  let n = 0;
  for (const [action, v] of aEpingler) {
    // On garde le tag en commentaire : sans lui, plus personne ne sait
    // quelle version tourne, et la mise à jour devient un déchiffrage.
    const re = new RegExp(`(uses:\\s*${action.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')})@${v.tag.replace(/\./g, '\\.')}(?![\\w.-])`, 'g');
    src = src.replace(re, (_, debut) => { n++; return `${debut}@${v.sha} # ${v.tag}`; });
  }
  if (n) { writeFileSync(chemin, src); console.log(`  ${f} — ${n} épinglage(s)`); total += n; }
}
console.log(`\n  ✅ ${total} utilisation(s) épinglée(s).`);
console.log('  Relancez « node scripts/epingler-actions.mjs --verifier » pour confirmer,');
console.log('  puis poussez : les workflows doivent repasser au vert.');
