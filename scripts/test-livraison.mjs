// Le fichier VERSION décide de ce qui part chez les testeurs : le pousser sur
// main pose un tag, et le tag lance le build TestFlight. Un numéro mal écrit
// ne se verrait qu'après coup, dans un workflow rouge — et une version qui
// RECULE ne se verrait pas du tout : le tag serait simplement refusé comme
// « déjà existant », et on croirait avoir livré.
//
// On contrôle donc ici, avant même de pousser :
//   1. le format du numéro, avec les mêmes règles que le workflow ;
//   2. que la version ne recule pas par rapport au dernier tag connu.
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
let ok = 0, ko = 0;
const dire = (l, c, d) => { c ? (ok++, console.log('  ✅ ' + l)) : (ko++, console.log('  ❌ ' + l + (d ? ' → ' + d : ''))); };

console.log('\n── Livraison de version ──');

const chemin = join(racine, 'VERSION');
dire('le fichier VERSION existe à la racine', existsSync(chemin));
if (!existsSync(chemin)) { console.log('\n  1 échec'); process.exit(1) }

const brut = readFileSync(chemin, 'utf8');
const version = brut.replace(/[\s ]/g, '').replace(/^v/, '');

// Exactement le motif du workflow : si les deux divergent, le contrôle local
// ne protège plus de rien.
const MOTIF = /^[0-9]+(\.[0-9]+){0,2}$/;
dire(`« ${version} » est un numéro valide (1.9, 2.0 ou 1.9.1)`, MOTIF.test(version));

dire('VERSION ne contient qu\'une seule ligne', brut.trim().split('\n').length === 1,
  JSON.stringify(brut));

// Le fichier ne doit PAS contenir le « v » : le workflow le rajoute. Deux v
// donneraient « vv1.9 » si un jour on retirait la tolérance côté workflow.
dire('VERSION est écrit sans le « v »', !/^\s*v/i.test(brut), JSON.stringify(brut.trim()));

// ── La version ne doit pas reculer ────────────────────────────────────
const cmp = (a, b) => {
  const A = a.split('.').map(Number), B = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const x = A[i] || 0, y = B[i] || 0;
    if (x !== y) return x - y;
  }
  return 0;
};

let tags = [];
try {
  tags = execFileSync('git', ['tag', '--list', 'v*'], { cwd: racine, encoding: 'utf8' })
    .split('\n').map(t => t.trim().replace(/^v/, '')).filter(t => MOTIF.test(t));
} catch (e) {
  console.log('  ⏭️  pas de dépôt git lisible — comparaison aux tags ignorée');
}

if (tags.length) {
  const plusHaut = tags.sort(cmp).at(-1);
  const deja = tags.includes(version);
  console.log(`     dernier tag connu : v${plusHaut}`);
  // Égal est normal : c'est l'état entre deux livraisons, et le workflow ne
  // repose jamais un tag existant. Seul un RECUL est un problème.
  dire(`v${version} ne recule pas sous v${plusHaut}`, cmp(version, plusHaut) >= 0,
    `v${version} < v${plusHaut} : le tag serait refusé et rien ne partirait`);
  if (deja) console.log(`     ℹ️  v${version} est déjà livrée — changez VERSION pour livrer à nouveau`);
}

// ── Le workflow doit vraiment lire ce fichier ─────────────────────────
const wf = join(racine, '.github/workflows/livrer-version.yml');
dire('le workflow de livraison existe', existsSync(wf));
if (existsSync(wf)) {
  const src = readFileSync(wf, 'utf8');
  dire('le workflow se déclenche sur une modification de VERSION',
    /paths:\s*\n\s*-\s*'?VERSION'?/.test(src));
  dire('le workflow lit bien le fichier VERSION', /<\s*VERSION/.test(src));
  dire('le workflow refuse de réécrire un tag existant', /refs\/tags\/\$tag/.test(src));
  dire('le workflow pose le tag sur main', /ref:\s*main/.test(src));
}

console.log('\n══════════════════════════════');
console.log(`  ${ok} réussis · ${ko} échoués`);
console.log('══════════════════════════════');
process.exit(ko ? 1 : 0);
