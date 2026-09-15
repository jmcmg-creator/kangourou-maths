// Une question de maths ne doit jamais être servie dans un autre royaume, même
// si elle est arrivée dans le profil avec l'étiquette de ce royaume.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
let ok = 0, ko = 0;
const dire = (l, c, d) => { c ? (ok++, console.log('  ✅ ' + l)) : (ko++, console.log('  ❌ ' + l + (d ? ' → ' + d : ''))); };

// Un navigateur factice, juste assez pour que game.js se charge.
const el = () => ({ style: {}, classList: { add(){}, remove(){}, toggle(){}, contains(){ return false } }, addEventListener(){}, set innerHTML(v){}, get innerHTML(){ return '' }, textContent: '', dataset: {}, querySelector: () => null, querySelectorAll: () => [], appendChild(){}, focus(){}, click(){}, getBoundingClientRect(){ return { top:0, left:0, width:0, height:0 } } });
const mem = {};
// Tous les globaux de Node (URL, URLSearchParams, TextEncoder, crypto, atob…)
// plutôt qu'une liste à la main qu'on complète à chaque plantage.
const ctx = {};
for (const k of Object.getOwnPropertyNames(globalThis)) { try { ctx[k] = globalThis[k] } catch (e) {} }
Object.assign(ctx, {
  console, Math, JSON, Object, Array, String, Number, Set, Map, Date, RegExp, Promise, setTimeout, clearTimeout, setInterval, clearInterval,
  requestAnimationFrame: (f) => setTimeout(f, 0),
  localStorage: { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v) }, removeItem: (k) => { delete mem[k] } },
  navigator: { userAgent: 'test', language: 'fr' }, location: { href: 'http://localhost/', search: '', hash: '', origin: 'http://localhost' },
  fetch: () => Promise.reject(new Error('hors ligne')), alert(){}, confirm(){ return false }, prompt(){ return null },
  history: { pushState(){}, replaceState(){} }, screen: {}, matchMedia: () => ({ matches: false, addEventListener(){} }),
});
ctx.addEventListener = () => {}; ctx.removeEventListener = () => {}; ctx.dispatchEvent = () => true;
ctx.scrollTo = () => {}; ctx.innerHeight = 800; ctx.innerWidth = 390; ctx.scrollY = 0;
ctx.getComputedStyle = () => ({ getPropertyValue: () => '' });
ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
ctx.document = Object.assign(el(), { documentElement: el(), body: el(), head: el(), getElementById: () => el(), createElement: () => el(), querySelector: () => el(), querySelectorAll: () => [], addEventListener(){}, hidden: false, visibilityState: 'visible' });
vm.createContext(ctx);
for (const f of ['exercises.js', 'exercises_extra.js', 'exercises_logic.js', 'cartes-monde.js'])
  vm.runInContext(readFileSync(join(racine, f), 'utf8').replace(/^const EX=/m, 'var EX='), ctx, { filename: f });
vm.runInContext(readFileSync(join(racine, 'game.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: 'game.js' });


const test=(name,fn)=>{fn();console.log('✅ '+name)};
ctx.profile=ctx.migrate({name:'Test',grade:3});
const ex=ctx.EX.find(e=>e.lv==='geo-cm1'&&ctx.isPlayableEx(e));
ctx.rememberSuccess(ex,true);
test('réussite persistée avant fin de partie',()=>assert(ctx.loadProfileByName('Test').successfulQuestions['id:'+ex.id]));
test('autre identifiant et choix réordonnés exclus',()=>assert.equal(ctx.remainingOf([{...ex,id:'copy',ch:[...ex.ch].reverse()}]).length,0));
test('échec reste disponible',()=>{const q={...ex,id:'failed',q:'Une autre question'};ctx.rememberSuccess(q,false);assert.equal(ctx.remainingOf([q]).length,1)});
test('identités distinctes pour addition et multiplication',()=>assert.notEqual(ctx._qKey({...ex,q:'2 + 2 ?'}),ctx._qKey({...ex,q:'2 × 2 ?'})));
test('migration des anciens compteurs',()=>{const p=ctx.migrate({exerciseStats:{[ex.id]:{att:1,cor:1}}});assert(p.successfulQuestions['q:'+ctx._qKey(ex)])});
test('fusion conserve les réussites des deux appareils',()=>{const p=ctx.mergeProfiles(ctx.migrate({name:'Test',successfulQuestions:{a:true}}),ctx.migrate({name:'Test',successfulQuestions:{b:true}}));assert(p.successfulQuestions.a&&p.successfulQuestions.b)});
test('profil élève isolé',()=>{const saved=ctx.profile;ctx.profile=ctx.newProfile();assert.equal(ctx.remainingOf([ex]).length,1);ctx.profile=saved});
test('tous modes : aucun exercice réussi et stock épuisé vide',()=>{
  ctx.profile=ctx.migrate({name:'Test',grade:null});
  for(const e of ctx.EX)ctx.profile.successfulQuestions['id:'+e.id]=true;
  for(const lv of ctx.LEVELS){
    ctx.state.level=lv.id;ctx.state.themeSubject=ctx.subjectOfLevel(lv.id);ctx.state.themeCat=ctx.EX.find(e=>e.lv===lv.id)?.cat;
    for(const mode of ['training','challenge','adaptive','progression','theme'])assert.equal(ctx.pickExercises(mode,lv.id).length,0,lv.id+'/'+mode);
  }
});
test('Quête avec un seul exercice : aucune fuite vers les maths',()=>{
  const all=ctx.EX;ctx.profile=ctx.migrate({name:'Test',grade:null});
  ctx.EX=[ex,...all.filter(e=>e.lv==='cm1-cm2')];
  assert.deepEqual(Array.from(ctx.pickExercises('progression',ex.lv),e=>e.id),[ex.id]);ctx.EX=all;
});
test('exercices parent mal étiquetés filtrés',()=>{
  ctx.profile.customExercises=[{...ex,id:'bad',q:'Combien font 7 × 8 ?',cat:'Calcul'}];
  assert(!ctx.pickExercises('training',ex.lv).some(e=>e.id==='bad'));
});
test('défi avec question déjà réussie refusé sans changer le score',()=>{
  ctx.profile.successfulQuestions['id:'+ex.id]=true;ctx.state.screen='battleHome';
  ctx.startBattleGame({exIds:[ex.id],level:ex.lv,code:'ABC'});assert.equal(ctx.state.screen,'battleHome');
});
test('tables : réussite immédiate, reste décroissant et ancien sans-faute migré',()=>{
  ctx.profile=ctx.migrate({name:'Test',grade:3});
  ctx.rememberSuccess(ctx.tableQuestion(7,8),true);
  assert(!ctx.remainingTable(7).includes(8));assert.equal(ctx.remainingTable(7).length,9);
  ctx.tablesStats()[7]={sansFaute:true};assert.equal(ctx.remainingTable(7).length,0);
});
test('mini-quiz des fiches : même identité, persistance et isolation',()=>{
  vm.runInContext(readFileSync(join(racine,'lesson-questions.js'),'utf8'),ctx);
  ctx.profile=ctx.migrate({name:'Test',grade:3});ctx.saveProfile();
  const q=['Quelle planète ?', ['Mercure','Vénus'],0,'Mercure'];
  assert.equal(ctx.LessonQuestions.key(q),'q:'+ctx._qKey({q:q[0],ch:q[1]}));
  assert(ctx.LessonQuestions.pending(q));assert(ctx.LessonQuestions.pass(q));assert(!ctx.LessonQuestions.pending(q));
  ctx.saveProfile();assert(!ctx.LessonQuestions.pending(q),'une sauvegarde de l’ancien état conserve la réussite de la fiche');
  ctx.profile=ctx.migrate({name:'Autre',grade:3});ctx.saveProfile();assert(ctx.LessonQuestions.pending(q));
  ctx.profile=ctx.loadProfileByName('Test');ctx.saveProfile();
});
let requests=0,approved;
ctx.parentalGate=fn=>{requests++;approved=fn};ctx.render=()=>{};
ctx.document.getElementById=()=>null;
test('sortie de profil bloquée avant saisie du code',()=>{ctx.state.screen='home';ctx.navigate('profilePicker');assert.equal(requests,1);assert.equal(ctx.state.screen,'home')});
test('annuler ne change pas le profil',()=>assert.equal(ctx.profile.name,'Test'));
test('validation ouvre le sélecteur puis autorisation consommée au retour',()=>{approved();assert.equal(ctx.state.screen,'profilePicker');ctx.navigate('home');ctx.navigate('profilePicker');assert.equal(requests,2);assert.equal(ctx.state.screen,'home')});
test('retour du niveau vers sa matière',()=>{ctx.state.screen='mode';ctx.state.subjectId='geographie';ctx.retourArriere();assert.equal(ctx.state.screen,'subject')});
test('retour des résultats vers le niveau',()=>{ctx.state.screen='results';ctx.state.mode='training';ctx.retourArriere();assert.equal(ctx.state.screen,'mode')});
test('retour fiche vers liste des thèmes',()=>{ctx.state.screen='fichesView';ctx.retourArriere();assert.equal(ctx.state.screen,'fichesTopics')});
test('sortie de partie sauvegarde une seule fois',()=>{
  let saved=0;ctx.finishGame=()=>{saved++;ctx.state.sessionSaved=true};
  ctx.state.screen='game';ctx.state.sessionSaved=false;ctx.navigate('home');ctx.navigate('home');assert.equal(saved,1);
});
test('quitter une partie avec le code ne perd pas son autorisation',()=>{
  ctx.state.screen='game';ctx.state.sessionSaved=false;ctx._profileAccess=true;
  ctx.finishGame=()=>{ctx.state.sessionSaved=true;ctx._profileAccess=false};
  ctx.navigate('profilePicker');assert.equal(ctx._profileAccess,true);
});
console.log('Parcours : tous les tests passent.');process.exit(0);
