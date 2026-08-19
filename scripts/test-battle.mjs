/* Tests unitaires — contenu des battles.
 * Aucune dépendance : on extrait les fonctions pures de game.js et on les
 * évalue isolément (game.js n'est pas importable tel quel : il touche au DOM).
 * Lancer : npm test
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const game = readFileSync(join(root, 'game.js'), 'utf8');
const logic = readFileSync(join(root, 'exercises_logic.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (name, cond, detail) => {
  if (cond) { pass++; console.log('  ✅', name); }
  else { fail++; console.log('  ❌', name, detail === undefined ? '' : '→ ' + detail); }
};
const section = (t) => console.log('\n── ' + t + ' ──');

/* ---------- extraction des fonctions pures ---------- */
function grab(startMarker, endMarker) {
  const i = game.indexOf(startMarker);
  if (i < 0) throw new Error('introuvable: ' + startMarker);
  const j = game.indexOf(endMarker, i);
  if (j < 0) throw new Error('fin introuvable pour: ' + startMarker);
  return game.slice(i, j);
}
const src = [
  grab('function _seedFromCode(code){', 'function genEclairQuestions'),
  grab('function genEclairQuestions(code,n){', '\n// Base PUBLIQUE'),
  grab('function normalizeBattleCode(raw){', 'function randomBattleCode'),
  'const BATTLE_DISCIPLINES=' + game.slice(game.indexOf('const BATTLE_DISCIPLINES=[') + 'const BATTLE_DISCIPLINES='.length, game.indexOf('function battleDiscipline')),
].join('\n');
const EX = [];
const sandbox = new Function('EX', src + '\nreturn {genEclairQuestions,normalizeBattleCode,_seedFromCode,BATTLE_DISCIPLINES};');
const M = sandbox(EX);

/* ---------- pool logique ---------- */
section('Pool Logique & Réflexion');
const pool = [];
new Function('EX', logic.replace(/if\(typeof EX[\s\S]*$/, '') + '\nEX.push(...EX_LOGIQUE);')(pool);
ok('60 questions chargées', pool.length === 60, pool.length);
ok('identifiants uniques', new Set(pool.map(q => q.id)).size === pool.length);
ok('toutes en niveau "logique"', pool.every(q => q.lv === 'logique'));
ok('toutes ont 4 choix (requis pour les battles)', pool.every(q => Array.isArray(q.ch) && q.ch.length === 4));
ok('index de réponse valide', pool.every(q => Number.isInteger(q.ans) && q.ans >= 0 && q.ans < 4));
ok('choix non vides et distincts', pool.every(q => new Set(q.ch).size === 4 && q.ch.every(c => String(c).trim())));
ok('difficulté entre 1 et 5', pool.every(q => q.diff >= 1 && q.diff <= 5));
ok('explication présente', pool.every(q => typeof q.se === 'string' && q.se.length > 10));
ok('question non vide', pool.every(q => typeof q.q === 'string' && q.q.length > 5));

/* ---------- générateur Éclair ---------- */
section('Calcul Éclair — déterminisme et justesse');
const a1 = M.genEclairQuestions('SAPHIR-18', 10);
const a2 = M.genEclairQuestions('SAPHIR-18', 10);
ok('même code → questions identiques (2 téléphones)', JSON.stringify(a1) === JSON.stringify(a2));
const b1 = M.genEclairQuestions('DRAGON-42', 10);
ok('codes différents → questions différentes', JSON.stringify(a1) !== JSON.stringify(b1));
ok('génère le bon nombre', M.genEclairQuestions('K7M4', 5).length === 5 && a1.length === 10);
const evalQ = (q) => {
  const m = q.q.match(/^(\d+) ([+−×]) (\d+) = \?$/);
  if (!m) return null;
  const x = +m[1], y = +m[3];
  return m[2] === '+' ? x + y : m[2] === '−' ? x - y : x * y;
};
ok('la bonne réponse est mathématiquement juste', a1.every(q => String(evalQ(q)) === q.ch[q.ans]), a1.map(q => q.q + ' → ' + q.ch[q.ans]).join(' | '));
ok('4 propositions distinctes', a1.every(q => new Set(q.ch).size === 4));
ok('jamais de résultat négatif proposé', a1.every(q => q.ch.every(c => Number(c) >= 0)));
ok('soustractions jamais négatives', a1.filter(q => q.q.includes('−')).every(q => evalQ(q) >= 0));
const spread = new Set(a1.map(q => q.q.replace(/\d+/g, '#')));
ok('mélange les opérations', spread.size >= 2, [...spread].join(','));

/* ---------- codes de battle (rétro-compatibilité) ---------- */
section('Codes de battle');
ok('ancien format conservé', M.normalizeBattleCode('DRAGON-80') === 'DRAGON-80');
ok('ancien format sans tiret réparé', M.normalizeBattleCode('dragon80') === 'DRAGON-80');
ok('lien complet accepté', M.normalizeBattleCode('https://x.y/?battle=SAPHIR-18') === 'SAPHIR-18');
ok('espaces et casse tolérés', M.normalizeBattleCode(' sa phir 18 ') === 'SAPHIR-18');
ok('mot court + chiffres (YETI12)', M.normalizeBattleCode('YETI12') === 'YETI-12');
ok('code court laissé intact', M.normalizeBattleCode('K7M4') === 'K7M4');
ok('code court ambigu non transformé', M.normalizeBattleCode('AB12') === 'AB12');
ok('entrée vide ne casse pas', M.normalizeBattleCode('') === '' && M.normalizeBattleCode(null) === '');

/* ---------- disciplines ---------- */
section('Disciplines de battle');
const D = M.BATTLE_DISCIPLINES;
ok('5 disciplines', D.length === 5, D.length);
ok('identifiants uniques', new Set(D.map(d => d.id)).size === D.length);
ok('chacune a icône, nom, couleur', D.every(d => d.icon && d.name && /^#[0-9a-f]{6}$/i.test(d.color)));
ok('chacune sait quoi jouer', D.every(d => d.lv || d.mode || d.gen));
ok('aucune ne dépend d\'un niveau scolaire', D.every(d => !/(cp|ce1|ce2|cm1|cm2|6e|5e)$/.test(String(d.lv || ''))), D.map(d => d.lv).join(','));

/* ---------- observation générée ---------- */
section('Observation & vitesse');
const obsSrc = grab('const OBS_SETS=[', '\n// Base PUBLIQUE');
const OBS = new Function(grab('function _seedFromCode(code){','function genEclairQuestions')+obsSrc+'\nreturn genObservationQuestions;')();
const o1 = OBS('K7M4', 8), o2 = OBS('K7M4', 8);
ok('même code → même grille', JSON.stringify(o1) === JSON.stringify(o2));
ok('codes différents → grilles différentes', JSON.stringify(o1) !== JSON.stringify(OBS('ZZZZ', 8)));
ok('4 propositions distinctes', o1.every(q => new Set(q.ch).size === 4));
ok('index de réponse valide', o1.every(q => q.ans >= 0 && q.ans < 4));
ok('visuel fourni', o1.every(q => typeof q.visual === 'string' && q.visual.length > 0 && q.visualKind === 'grid'));
const counting = o1.filter(q => q.q.startsWith('Combien'));
ok('comptage exact', counting.every(q => {
  const sym = q.q.match(/Combien de (\S+) /)[1];
  const n = [...q.visual].join('').split(sym).length - 1;
  return String(n) === q.ch[q.ans];
}), counting.map(q => q.q).join(' | '));
const odd = o1.filter(q => q.q.startsWith('Quel numéro'));
ok('intrus unique et bien numéroté', odd.every(q => {
  const cells = q.visual.replace(/\n/g, '  ').split(/\s{2,}/).filter(Boolean);
  const syms = cells.map(c => [...c][0]);
  const counts = {}; syms.forEach(x => counts[x] = (counts[x] || 0) + 1);
  const rare = Object.keys(counts).find(k => counts[k] === 1);
  return rare !== undefined && String(syms.indexOf(rare) + 1) === q.ch[q.ans];
}), odd.map(q => q.visual.replace(/\n/g, ' / ')).join(' || '));

/* ---------- déblocage progressif ---------- */
section('Déblocage progressif');
const gsrc = grab('const GRADES=[', 'function subjectOfLevel');
const G = new Function(gsrc + '\nreturn {GRADES,levelMinGrade,gradeByRank};')();
ok('7 classes CP→5e', G.GRADES.length === 7);
ok('rangs 0..6 continus', G.GRADES.every((g, i) => g.rank === i));
ok('CE1–CE2 exige CE1', G.levelMinGrade({ id: 'x', sub: 'CE1 – CE2' }) === 1);
ok('CM1–CM2 exige CM1', G.levelMinGrade({ id: 'y', sub: 'CM1 – CM2' }) === 3);
ok('6e–5e exige 6e', G.levelMinGrade({ id: 'z', sub: '6e – 5e' }) === 5);
ok('CP exige CP', G.levelMinGrade({ id: 'w', sub: 'CP fort (secret)' }) === 0);
ok('« Tous âges » jamais verrouillé', G.levelMinGrade({ id: 'logique', sub: 'Tous âges — suites, intrus, énigmes' }) === null);
ok('« Tous niveaux » jamais verrouillé', G.levelMinGrade({ id: 'geo-drapeaux', sub: 'Tous niveaux — Reconnaître les drapeaux' }) === null);

/* ---------- anti-doublon ---------- */
section('Anti-doublon — jamais deux fois la même question');
const dsrc = grab('const RECENT_MAX=150;', 'function pickExercises');
const DUP = new Function('profile', dsrc + '\nreturn {_qKey,dedupeExercises,recentExIds,rememberExercises,_applyCooldown,finalizePick};');
const prof = { recentExIds: [] };
const A = DUP(prof);

ok('id identique → une seule occurrence',
  A.dedupeExercises([{ id: 'a', q: 'Combien font 2+2 ?' }, { id: 'a', q: 'Combien font 2+2 ?' }]).length === 1);
ok('énoncé identique sous 2 ids → une seule occurrence',
  A.dedupeExercises([{ id: 'a', q: 'Combien font 2+2 ?' }, { id: 'b', q: 'Combien font 2+2 ?' }]).length === 1);
ok('énoncé identique à accents/ponctuation près → une seule occurrence',
  A.dedupeExercises([{ id: 'a', q: 'Où est la Grèce ?' }, { id: 'b', q: 'ou est la grece' }]).length === 1);
ok('questions différentes → toutes conservées',
  A.dedupeExercises([{ id: 'a', q: 'Combien font 2+2 ?' }, { id: 'b', q: 'Combien font 3+3 ?' }]).length === 2);
ok('ordre préservé',
  A.dedupeExercises([{ id: 'b', q: 'Q2' }, { id: 'a', q: 'Q1' }, { id: 'b', q: 'Q2' }]).map(e => e.id).join() === 'b,a');
ok('entrées nulles ignorées sans planter',
  A.dedupeExercises([null, undefined, { id: 'a', q: 'Q' }]).length === 1);
ok('liste vide → liste vide', A.dedupeExercises([]).length === 0 && A.dedupeExercises(null).length === 0);

const mk = n => Array.from({ length: n }, (_, i) => ({ id: 'e' + i, q: 'Question numéro ' + i }));
prof.recentExIds = ['e0', 'e1', 'e2'];
ok('les questions récentes sont écartées quand le pool suffit',
  A.finalizePick(mk(20), 10).every(e => !['e0', 'e1', 'e2'].includes(e.id)));
prof.recentExIds = mk(12).map(e => e.id);
const tight = A.finalizePick(mk(12), 10);
ok('pool épuisé → on ré-admet plutôt que de rendre une partie vide', tight.length === 10);
ok('ré-admission : les plus anciennes d’abord', tight[0].id === 'e0');
ok('ré-admission sans doublon', new Set(tight.map(e => e.id)).size === tight.length);

prof.recentExIds = [];
A.rememberExercises(['x1', 'x2']);
A.rememberExercises(['x2', 'x3']);
ok('mémoire : pas de doublon interne', prof.recentExIds.length === 3);
ok('mémoire : la question rejouée redevient la plus récente',
  prof.recentExIds.join() === 'x1,x2,x3');
prof.recentExIds = [];
A.rememberExercises(Array.from({ length: 200 }, (_, i) => 'y' + i));
ok('mémoire plafonnée à 150', prof.recentExIds.length === 150 && prof.recentExIds[0] === 'y50');
A.rememberExercises([]);
ok('mémoire : appel vide sans effet', prof.recentExIds.length === 150);

/* ---------- chemin de quête ---------- */
section('Chemin de quête (coffres)');
const qsrc = grab('const QUEST_CHESTS=[2,5,9];', 'function renderQuestPath');
const Q = new Function(qsrc + '\nreturn {QUEST_CHESTS};')();
ok('3 coffres', Q.QUEST_CHESTS.length === 3);
ok('coffres dans les bornes d’une partie de 10', Q.QUEST_CHESTS.every(i => i >= 0 && i < 10));
ok('dernier coffre sur la dernière question', Q.QUEST_CHESTS[Q.QUEST_CHESTS.length - 1] === 9);
ok('coffres strictement croissants', Q.QUEST_CHESTS.every((v, i, a) => i === 0 || v > a[i - 1]));

console.log('\n══════════════════════════════');
console.log(`  ${pass} réussis · ${fail} échoués`);
console.log('══════════════════════════════');
process.exit(fail ? 1 : 0);
