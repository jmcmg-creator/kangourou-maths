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
const dsrc = grab('const RECENT_MAX=150;', '// fin anti-doublon');
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

/* ---------- difficulté adaptative par domaine ---------- */
section('Difficulté adaptative — domaine par domaine');
const msrc = grab('const MASTERY_WINDOW=8;', '// fin maitrise');
const SUB = [
  { id: 'maths', levels: [{ id: 'ce1-ce2' }, { id: 'cm1-cm2' }] },
  { id: 'francais', levels: [{ id: 'fr-ce2' }] },
];
const prof2 = { sessions: [] };
const MA = new Function('SUBJECTS', 'profile',
  msrc + '\nreturn {subjectAccuracy,targetDifficulty,MASTERY_WINDOW};')(SUB, prof2);

const play = (level, score, total, n) => {
  for (let i = 0; i < n; i++) prof2.sessions.push({ level, score, total });
};
ok('sans historique → aucune adaptation', MA.targetDifficulty('maths') === null);
play('ce1-ce2', 1, 10, 1);
ok('une seule partie ne suffit pas à conclure', MA.targetDifficulty('maths') === null);
prof2.sessions = []; play('ce1-ce2', 10, 10, 3);
ok('excellent en maths → questions plus dures', MA.targetDifficulty('maths').label === 'expert');
ok('… et la fourchette exclut les plus faciles', MA.targetDifficulty('maths').min === 3);
ok('le français n’est PAS affecté (cloisonnement)', MA.targetDifficulty('francais') === null);
prof2.sessions = []; play('fr-ce2', 2, 10, 3);
ok('en difficulté → questions plus douces', MA.targetDifficulty('francais').label === 'doux');
ok('… plafonnée à 3 étoiles', MA.targetDifficulty('francais').max === 3);
ok('les maths restent intacts', MA.targetDifficulty('maths') === null);
prof2.sessions = []; play('ce1-ce2', 8, 10, 4);
ok('niveau confirmé → fourchette large', MA.targetDifficulty('maths').label === 'confirme');
prof2.sessions = []; play('ce1-ce2', 5, 10, 4);
ok('niveau moyen → tirage normal', MA.targetDifficulty('maths') === null);
prof2.sessions = []; play('ce1-ce2', 0, 10, 20); play('ce1-ce2', 10, 10, 8);
ok('seules les dernières parties comptent', MA.targetDifficulty('maths').label === 'expert');
prof2.sessions = []; play('ce1-ce2', 5, 0, 3);
ok('parties vides ignorées sans division par zéro', MA.subjectAccuracy('maths') === null);
ok('matière inconnue → null', MA.subjectAccuracy('zzz') === null);

/* ---------- drapeaux sur la carte ---------- */
section('Carte d’Europe & drapeaux');
const fsrc = game.slice(game.indexOf('const MAP_FLAGS='), game.indexOf('Object.keys(MAP_FLAGS)'));
const F = new Function(fsrc + '\nreturn {MAP_FLAGS,MAP_FLAG_HINTS};')();
// La liste des pays est lue depuis game.js : impossible d’oublier d’étendre le test.
const CC = [...game.slice(game.indexOf('const MAP_COUNTRIES={'), game.indexOf("EX.push({id:'mapcy_"))
  .matchAll(/\n {2}([a-z]{2}):\{name:"/g)].map(m => m[1]);
ok('carte bien fournie (≥ 30 pays)', CC.length >= 30, CC.length + ' pays');
ok('aucun code pays en double', new Set(CC).size === CC.length);
ok('un drapeau pour chaque pays de la carte',
  CC.every(c => typeof F.MAP_FLAGS[c] === 'string' && F.MAP_FLAGS[c].length > 0), CC.filter(c => !F.MAP_FLAGS[c]).join());
ok('aucun drapeau en double', new Set(Object.values(F.MAP_FLAGS)).size === Object.keys(F.MAP_FLAGS).length);
ok('autant de drapeaux que de pays', Object.keys(F.MAP_FLAGS).length === CC.length,
  Object.keys(F.MAP_FLAGS).length + ' vs ' + CC.length);
ok('capitale + repère visuel pour chaque pays',
  CC.every(c => Array.isArray(F.MAP_FLAG_HINTS[c]) && F.MAP_FLAG_HINTS[c][0] && F.MAP_FLAG_HINTS[c][1]),
  CC.filter(c => !F.MAP_FLAG_HINTS[c]).join());
ok('drapeaux bien composés de 2 indicateurs régionaux',
  Object.values(F.MAP_FLAGS).every(f => [...f].length === 2));
ok('un exercice « où est ce pays » par pays',
  CC.every(c => game.includes("id:'mapcy_" + c + "'")), CC.filter(c => !game.includes("id:'mapcy_" + c + "'")).join());

/* Les tracés doivent rester dans le cadre visible de la carte (viewBox 0-100),
   sinon le pays est injouable : on ne peut pas toucher ce qu’on ne voit pas. */
const paths = [...game.slice(game.indexOf('const MAP_COUNTRIES={'), game.indexOf("EX.push({id:'mapcy_"))
  .matchAll(/\n {2}([a-z]{2}):\{name:"[^"]*",path:"([^"]+)"/g)];
ok('un tracé pour chaque pays', paths.length === CC.length, paths.length + ' vs ' + CC.length);
const offscreen = paths.filter(([, cc, d]) => {
  const pts = (d.match(/-?\d+(\.\d+)?,-?\d+(\.\d+)?/g) || []).map(s => s.split(',').map(Number));
  return !pts.some(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100);
}).map(m => m[1]);
ok('chaque pays a une partie visible à l’écran', offscreen.length === 0, offscreen.join());
ok('tracés bien fermés', paths.every(([, , d]) => d.trim().endsWith('Z')));

/* Zone tactile : un pays minuscule doit être atteignable au doigt. */
const geom = [...game.slice(game.indexOf('const MAP_COUNTRIES={'), game.indexOf("EX.push({id:'mapcy_"))
  .matchAll(/\n {2}([a-z]{2}):\{name:"[^"]*",path:"[^"]+",cx:(-?[\d.]+),cy:(-?[\d.]+),w:([\d.]+),h:([\d.]+)/g)]
  .map(m => ({ cc: m[1], cx: +m[2], cy: +m[3], w: +m[4], h: +m[5] }));
ok('les nouveaux pays portent leur centre et leur taille', geom.length >= 15, geom.length);
const tinySrc = game.slice(game.indexOf('const TINY_COUNTRY='), game.indexOf('function renderCountryMapArea'));
const T = new Function(tinySrc + '\nreturn {TINY_COUNTRY,TINY_HIT_R};')();
const tiny = geom.filter(g => Math.min(g.w, g.h) < T.TINY_COUNTRY);
ok('les pays minuscules reçoivent une zone tactile', tiny.length > 0, tiny.map(g => g.cc).join());
ok('… assez large pour un doigt', T.TINY_HIT_R >= 3);
ok('centres des petits pays dans le cadre',
  tiny.every(g => g.cx >= 0 && g.cx <= 100 && g.cy >= 0 && g.cy <= 100), tiny.filter(g => g.cx < 0 || g.cx > 100 || g.cy < 0 || g.cy > 100).map(g => g.cc).join());

/* ---------- géo hors progression scolaire ---------- */
section('Géographie décorrélée de la classe');
const GEO_FREE = ['geo-drapeaux', 'geo-carte-drapeaux', 'geo-carte-france', 'geo-carte-europe', 'geo-carte-payseu'];
ok('les 5 niveaux carte/drapeaux sont marqués « toujours ouverts »',
  GEO_FREE.every(id => new RegExp('id:"' + id + '"[\\s\\S]{0,220}?alwaysOpen:true').test(game)),
  GEO_FREE.filter(id => !new RegExp('id:"' + id + '"[\\s\\S]{0,220}?alwaysOpen:true').test(game)).join());
ok('alwaysOpen court-circuite la déduction de classe',
  G.levelMinGrade({ id: 'geo-x', sub: 'CM2 — piège', alwaysOpen: true }) === null);
ok('… et un niveau normal reste indexé sur la classe',
  G.levelMinGrade({ id: 'geo-y', sub: 'CM2 — Le Monde' }) === 4);

/* ---------- journal des erreurs ---------- */
section('Journal des erreurs (espace parent)');
const jsrc = grab('const MISSES_MAX=120;', '// fin journal erreurs');
const profM = { recentMisses: [] };
const J = new Function('profile', jsrc.slice(0, jsrc.indexOf('function replayMisses')) + '\nreturn {MISSES_MAX,recentMisses,missesBySubject};')(profM);
ok('mémoire portée à 120 erreurs', J.MISSES_MAX === 120);
ok('aucune erreur → aucun groupe', J.missesBySubject().length === 0);
profM.recentMisses = [
  { subject: 'maths', subjectName: 'Mathématiques', subjectIcon: '🧮', q: 'A', date: '1' },
  { subject: 'geographie', subjectName: 'Géographie', subjectIcon: '🌍', q: 'B', date: '2' },
  { subject: 'maths', subjectName: 'Mathématiques', subjectIcon: '🧮', q: 'C', date: '3' },
];
const gs = J.missesBySubject();
ok('regroupement par royaume', gs.length === 2);
ok('royaume le plus en difficulté en premier', gs[0].id === 'maths' && gs[0].items.length === 2);
ok('la plus récente en tête', gs[0].items[0].q === 'C');
profM.recentMisses = [{ q: 'orpheline', date: '1' }];
ok('erreur sans royaume rangée sans planter', J.missesBySubject().length === 1);

const rec = game.slice(game.indexOf('profile.recentMisses.push({'), game.indexOf('date:d.date});') + 14);
for (const f of ['q:', 'given', 'ans:', 'se:', 'pourquoi:', 'lvName:', 'subjectName:', 'diff:', 'flag:', 'skill:'])
  ok('le détail « ' + f.replace(':', '') + ' » est enregistré', rec.includes(f));
ok('plus de troncature de l’énoncé à 140 caractères', !rec.includes("slice(0,140)"));

console.log('\n══════════════════════════════');
console.log(`  ${pass} réussis · ${fail} échoués`);
console.log('══════════════════════════════');
process.exit(fail ? 1 : 0);
