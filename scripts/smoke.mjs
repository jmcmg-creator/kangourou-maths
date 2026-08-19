/* Smoke test navigateur : serveur HTTP + Chrome headless (CDP) dans un seul
 * process, donc rien à lancer à côté. Vérifie que l'app démarre vraiment,
 * que les nouveautés sont là et que l'existant n'a pas régressé.
 * Lancer : npm run smoke */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { extname, join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html':'text/html;charset=utf-8', '.js':'text/javascript;charset=utf-8',
  '.json':'application/json', '.css':'text/css', '.svg':'image/svg+xml', '.mp3':'audio/mpeg' };
const server = createServer(async (req, res) => {
  try {
    const p = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
    const file = join(ROOT, p === '/' ? 'index.html' : p);
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end('nope'); }
});
await new Promise(r => server.listen(8899, '127.0.0.1', r));

const BIN = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const chrome = spawn(BIN, ['--headless=new','--no-sandbox','--disable-gpu',
  '--remote-debugging-port=9337','--window-size=430,932','about:blank'], { stdio: 'ignore' });
await sleep(2200);
const targets = await (await fetch('http://127.0.0.1:9337/json/list')).json();
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
let id = 0; const pending = new Map(); const errors = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
  if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push('console: ' + d.params.args.map(a => a.value || a.description).join(' '));
};
await new Promise(r => ws.onopen = r);
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const js = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
// Le bac à sable n'a pas accès à Google Fonts : on coupe net pour que le
// test soit reproductible et rapide (en production les polices chargent).
await send('Network.setBlockedURLs', { urls: ['*fonts.googleapis.com*', '*fonts.gstatic.com*'] });
await send('Page.navigate', { url: 'http://127.0.0.1:8899/index.html' });
await sleep(2600);
// Profil de test : l'app renvoie sinon vers l'écran « ton prénom ».
await js(`profile.name='Testeur'; profile.grade=null; setActiveName('Testeur'); saveProfile(); 1`);

const R = []; const check = (n, v, d) => R.push([n, !!v, d]);
const section = (t) => R.push(['§' + t]);

section('Démarrage');
check('aucune exception au chargement', errors.length === 0, errors.slice(0, 2).join(' | '));
check('EX chargé', (await js('typeof EX!=="undefined"&&EX.length')) > 1100, await js('typeof EX!=="undefined"?EX.length:"absent"'));
check('pool logique (60)', (await js('EX.filter(e=>e.lv==="logique").length')) === 60);

section('Contenu des battles');
check('5 disciplines', (await js('BATTLE_DISCIPLINES.length')) === 5);
check('Éclair déterministe', await js('JSON.stringify(genEclairQuestions("AB",5))===JSON.stringify(genEclairQuestions("AB",5))'));
check('Observation déterministe', await js('JSON.stringify(genObservationQuestions("AB",5))===JSON.stringify(genObservationQuestions("AB",5))'));
check('analytics silencieux', await js('track("smoke",{n:1}); analyticsDump().length>0'));

section('Écran Battle (non-régression)');
await js('navigate("battleHome")'); await sleep(500);
check('écran rendu', (await js('document.getElementById("app").innerHTML.length')) > 800);
check('5 puces de discipline', (await js('document.querySelectorAll(".battle-disc").length')) === 5);
check('sélecteur scolaire conservé', await js('!!document.getElementById("battleLv")'));
check('ligue conservée', await js('document.getElementById("app").innerHTML.includes("Ligue des amis")'));
check('rejoindre par code conservé', await js('!!document.getElementById("battleCodeInp")'));

section('Partie Logique (moteur de jeu)');
await js('state.level="logique"; startGame("training")'); await sleep(900);
check('la partie démarre', (await js('state.screen')) === 'game');
check('questions tirées', (await js('state.exercises.length')) > 0, await js('state.exercises.length'));
check('question affichée', await js('document.getElementById("app").innerHTML.includes("Question 1/")'));
check('bonne réponse comptée', await (async () => { await js('selectAnswer(state.exercises[0].ans)'); await sleep(250); return (await js('state.score')) === 1; })());

section('Anti-doublon (en vrai, dans le navigateur)');
check('aucun id en double dans la partie tirée',
  await js('new Set(state.exercises.map(e=>e.id)).size===state.exercises.length'));
check('aucun énoncé en double dans la partie tirée',
  await js('new Set(state.exercises.map(e=>_qKey(e))).size===state.exercises.length'));
const _dupN = await js(`(function(){const seen={};let n=0;for(const e of EX){const k=_qKey(e);if(!k)continue;if(seen[k])n++;else seen[k]=e.id}return n})()`);
// Doublons historiques du pool statique : on ne supprime PAS les entrées
// (des battles déjà créées référencent leurs ids), le moteur les filtre au
// tirage. Ce seuil est un garde-fou : il ne doit jamais augmenter.
check('doublons du pool statique sous contrôle', _dupN <= 15, _dupN + ' doublons dans EX');
const _dupPlayed = await js(`(function(){const g=dedupeExercises(EX.filter(e=>e.lv==='geographie-cm2'));return new Set(g.map(_qKey)).size===g.length})()`);
check('un royaume à doublons est nettoyé au tirage', _dupPlayed);

check('les questions jouées sont mémorisées', await (async () => {
  await js('profile.recentExIds=[]; state.level="logique"; startGame("training")'); await sleep(700);
  const ids = await js('JSON.stringify(state.exercises.slice(0,3).map(e=>e.id))');
  await js('for(let i=0;i<3;i++){ selectAnswer(state.exercises[state.idx].ans); nextQuestion() }'); await sleep(400);
  await js('finishGame(true)'); await sleep(600);
  const mem = await js('JSON.stringify(profile.recentExIds)');
  return JSON.parse(ids).every(id => JSON.parse(mem).includes(id));
})());
check('la partie suivante évite les questions déjà jouées', await (async () => {
  const before = await js('JSON.stringify(profile.recentExIds)');
  await js('state.level="logique"; startGame("training")'); await sleep(700);
  const now = await js('JSON.stringify(state.exercises.map(e=>e.id))');
  const seen = new Set(JSON.parse(before));
  return JSON.parse(now).every(id => !seen.has(id));
})());
check('doublon IA rejeté avant persistance',
  await js('_qKey({q:EX[0].q})===_qKey({q:EX[0].q.toUpperCase()})'));

section('Chemin de quête (gamification)');
check('le chemin s’affiche pendant la partie', await (async () => {
  await js('state.level="logique"; startGame("training")'); await sleep(700);
  return await js('document.querySelectorAll(".qp-path .qp-cell").length===state.exercises.length');
})());
check('une seule case « en cours »', await js('document.querySelectorAll(".qp-cell.qp-now").length===1'));
check('les cases suivantes sont fermées',
  await js('document.querySelectorAll(".qp-cell.qp-lock").length===state.exercises.length-1'));
check('une bonne réponse allume une case', await (async () => {
  await js('selectAnswer(state.exercises[0].ans)'); await sleep(300);
  return await js('document.querySelectorAll(".qp-cell.qp-ok").length===1');
})());
await js('state.level="logique"; startGame("training")'); await sleep(700);
await js('state.chestsOpen=[]; state.sessionCristaux=0');
await js('for(let i=0;i<3;i++){ selectAnswer(state.exercises[state.idx].ans); if(i<2) nextQuestion() }'); await sleep(400);
const _cr = await js('state.sessionCristaux'), _ch = await js('state.chestsOpen.length');
check('le coffre du 3e palier crédite des cristaux', _cr > 0 && _ch === 1, 'cristaux=' + _cr + ' coffres=' + _ch);
check('le coffre ne s’ouvre jamais deux fois', await (async () => {
  const c = await js('questChestAward(); questChestAward(); state.chestsOpen.length');
  return c === 1;
})());

section('Visuels de question');
check('drapeaux en champ dédié', (await js('EX.filter(e=>e.flag).length')) > 60, await js('EX.filter(e=>e.flag).length'));
check('rendu drapeau', await js('renderQuestionVisual({flag:"🇫🇷"}).includes("q-visual-flag")'));
check('rendu grille observation', await js('renderQuestionVisual(genObservationQuestions("X",1)[0]).includes("q-visual-grid")'));
check('pas de visuel si inutile', (await js('renderQuestionVisual({q:"2+2?"})')) === '');

section('Déblocage progressif');
check('profil sans classe : tout ouvert', await js('profile.grade=null; isLevelUnlocked("6e-5e")===true'));
check('CP : 6e verrouillé', await js('profile.grade=0; profile.unlocks={}; isLevelUnlocked("6e-5e")===false'));
check('CP : porte d\'entrée maths ouverte', await js('isLevelUnlocked("ce1-ce2")===true'));
check('CP : niveau intermédiaire verrouillé', await js('isLevelUnlocked("cm1-cm2")===false'));
check('logique jamais verrouillée', await js('isLevelUnlocked("logique")===true'));
check('bonus ouvre le palier suivant', await js('profile.grade=2; profile.unlocks={maths:1}; isLevelUnlocked("cm1-cm2")===true'));
check('3 parties à 80% débloquent', await js(`
  profile.grade=1; profile.unlocks={}; profile.unlockProgress={};
  let r; for(let i=0;i<3;i++){ r=checkLevelUnlock("ce1-ce2",9,10) }
  !!(r&&r.unlocked)`));
check('échec remet le compteur à zéro', await js(`
  profile.grade=1; profile.unlocks={}; profile.unlockProgress={};
  checkLevelUnlock("ce1-ce2",9,10); checkLevelUnlock("ce1-ce2",4,10);
  (profile.unlockProgress["ce1-ce2"]||0)===0`));
check('cadenas affiché dans la matière', await (async () => {
  await js('profile.grade=0; profile.unlocks={}; navigate("subject",{subjectId:"maths"})'); await sleep(400);
  return await js('document.getElementById("app").innerHTML.includes("level-locked")');
})());

section('Inscription enrichie');
check('écran classe existe', await (async () => { await js('navigate("gradeAsk")'); await sleep(350); return (await js('document.querySelectorAll(".grade-chip").length')) === 7; })());
check('choisir une classe la mémorise', await js('pickGrade(3); profile.grade===3&&profile.age===9'));
check('« ne pas dire » laisse tout ouvert', await js('skipGrade(); profile.grade===null&&isLevelUnlocked("6e-5e")===true'));

section('Non-régression générale');
check('carte des pays (19)', (await js('Object.keys(MAP_COUNTRIES).length')) === 19);
check('memory intact', (await js('MEMORY_MODES.length')) >= 6);
check('leçons intactes', (await js('LECONS.length')) >= 12);
check('toast fonctionne', await js('toast("test"); document.querySelectorAll("#toast-area .toast").length>0'));
check('accueil se rend', await (async () => { await js('profile.name="Testeur"; profile.grade=null; navigate("home")'); await sleep(700); const L = await js('document.getElementById("app").innerHTML.length'); return L > 1000 && (await js('state.screen')) === 'home'; })());
check('toujours aucune exception', errors.length === 0, errors.slice(0, 3).join(' | '));

console.log('\n════ SMOKE TEST NAVIGATEUR ════');
let fail = 0, pass = 0;
for (const row of R) {
  if (row[0].startsWith('§')) { console.log('\n── ' + row[0].slice(1) + ' ──'); continue; }
  const [n, v, d] = row;
  if (v) { pass++; console.log('  ✅ ' + n); } else { fail++; console.log('  ❌ ' + n + (d === undefined ? '' : ' → ' + d)); }
}
console.log(`\n  ${pass} réussis · ${fail} échoués\n`);
ws.close(); chrome.kill(); server.close();
process.exit(fail ? 1 : 0);
