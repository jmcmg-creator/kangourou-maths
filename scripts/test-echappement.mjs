/* Garde-fou XSS — toute valeur d'origine externe insérée dans du HTML doit
 * passer par esc().
 *
 * POURQUOI CE TEST EXISTE
 * Le scan semgrep (règles p/xss, p/owasp-top-ten) tourne en CI, mais il
 * télécharge ses règles depuis semgrep.dev : il ne protège que si le réseau,
 * le service et la ligne de commande sont tous les trois en état. Ils ne
 * l'ont pas été — une dérive de version a éteint le scan pendant une semaine
 * sans que rien ne le signale, parce qu'un échec permanent ne se distingue
 * plus d'un vrai problème.
 * Ce test-ci est local, sans réseau, sans dépendance. Il ne remplace pas
 * semgrep : il couvre le cas précis qui compte dans une app pour enfants —
 * un prénom, une question générée par l'IA ou le pseudo d'un adversaire qui
 * arriverait dans le DOM sans être échappé.
 *
 * PORTÉE, ET SES LIMITES
 * Analyse par motifs, pas suivi de flux de données : une interpolation
 * répartie sur plusieurs lignes peut lui échapper. C'est un filet, pas une
 * preuve. Le test de mutation en fin de fichier vérifie au moins que le
 * filet n'est pas troué.
 *
 * Lancer : node scripts/test-echappement.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const game = readFileSync(join(root, 'game.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (name, cond, detail) => {
  if (cond) { pass++; console.log('  ✅', name); }
  else { fail++; console.log('  ❌', name, detail === undefined ? '' : '→ ' + detail); }
};

/* Valeurs d'ORIGINE EXTERNE : saisies par un humain, générées par l'IA, ou
   reçues d'un autre joueur. Ce sont les seules qui peuvent porter du HTML.
   Les tables du code source (couleurs, icônes, libellés de niveaux) n'y
   figurent pas : elles sont écrites par nous, pas par un utilisateur. */
const EXTERNE = /\b(profile\.name|playerName\(\)|\.pseudo|inv\.from|hostName|p\.name|f\.name|adv\.name|opponent|e\.q|ex\.q|sl\.q|\.se\b|\.ch\[|\.author|poem|custom)/;

// Lignes qui construisent du HTML : affectation innerHTML, ou continuation
// d'un littéral (concaténation, template literal).
const CONSTRUIT_HTML = (l) => /innerHTML\s*[+]?=/.test(l) || /^\s*[+`'"]/.test(l);

function interpolations(source) {
  const out = [];
  source.split('\n').forEach((l, n) => {
    if (!CONSTRUIT_HTML(l)) return;
    const exprs = [];
    for (const m of l.matchAll(/\$\{([^}]*)\}/g)) exprs.push(m[1]);       // `${x}`
    for (const m of l.matchAll(/'\s*\+\s*([^+]+?)\s*\+\s*'/g)) exprs.push(m[1]); // '+x+'
    for (const e of exprs) out.push({ ligne: n + 1, expr: e.trim() });
  });
  return out;
}
const nonEchappees = (source) =>
  interpolations(source).filter(i => EXTERNE.test(i.expr) && !/esc\(/.test(i.expr));

console.log('\n── Échappement du HTML ──');

const total = interpolations(game).length;
const fuites = nonEchappees(game);
ok(`${total} interpolations analysées dans game.js`, total > 50, `seulement ${total}`);
ok('aucune valeur d\'origine externe insérée sans esc()',
   fuites.length === 0,
   fuites.map(f => `ligne ${f.ligne} : ${f.expr.slice(0, 70)}`).join(' | '));

/* Test de mutation : un contrôle qui ne trouve jamais rien peut être un
   contrôle cassé. On retire volontairement un esc() et on exige que le
   contrôle s'en aperçoive. Sans ça, le ✅ ci-dessus ne prouve rien. */
const cible = "esc(profile.name)";
const mute = game.replace(cible, 'profile.name');
ok('le contrôle sait détecter une fuite (test de mutation)',
   game.includes(cible) && nonEchappees(mute).length > fuites.length,
   'le contrôle ne réagit pas à un esc() retiré — il est inopérant');

console.log('\n══════════════════════════════');
console.log(`  ${pass} réussis · ${fail} échoués`);
console.log('══════════════════════════════');
process.exit(fail ? 1 : 0);
