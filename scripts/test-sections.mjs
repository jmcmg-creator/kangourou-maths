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



ctx.profile=ctx.migrate({name:'Sections',grade:3,age:9});
const sections=ctx.sectionsOf('maths');
const fractions=sections.find(s=>s.cat==='Fractions');
assert(fractions,'Fractions présentes dans la matière');
ctx.state.subjectId='maths';ctx.state.sectionKey=fractions.key;
const first=ctx.pickSectionExercises();
assert(first.length>0&&first.length<=5);
assert(first.every(e=>e.cat==='Fractions'&&ctx.subjectOfLevel(e.lv)==='maths'&&ctx.isLevelUnlocked(e.lv)));
assert(first.every(e=>ctx.sectionTier(e)===Math.min(...ctx.remainingOf(fractions.pool).map(ctx.sectionTier))));
ctx.state.mode='section';assert.equal(ctx.xpMalus(first[0]),0);
ctx.recordAnswer(first[0],false,(first[0].ans+1)%first[0].ch.length);
assert(ctx.pickSectionExercises().some(e=>e.id===first[0].id),'erreur conservée pour travailler');
ctx.recordAnswer(first[0],true,first[0].ans);
assert(!ctx.pickSectionExercises().some(e=>e.id===first[0].id),'réussite exclue immédiatement');
assert.equal(ctx.profile.answerHistory.length,2);
assert.equal(ctx.profile.answerHistory[0].mode,'section');
let previous=0,count=0;
for(let guard=0;guard<200;guard++){
  const batch=ctx.pickSectionExercises();if(!batch.length)break;
  const tier=ctx.sectionTier(batch[0]);assert(tier>=previous);previous=tier;
  assert(batch.every(e=>ctx.sectionTier(e)===tier),'un seul palier à la fois');
  for(const e of batch){ctx.rememberSuccess(e,true);count++}
}
assert(count>0);assert.equal(ctx.pickSectionExercises().length,0);
assert(ctx.sectionsOf('maths').some(s=>s.cat==='Fractions'),'section terminée consultable');
ctx.profile=ctx.loadProfileByName('Sections');
assert.equal(ctx.pickSectionExercises().length,0,'rechargement conserve épuisement');
ctx.profile=ctx.migrate({name:'Second',grade:3,age:9});
assert(ctx.pickSectionExercises().length>0,'profils isolés');

for(const subject of ctx.SUBJECTS.filter(s=>s.levels)){
  for(const section of ctx.sectionsOf(subject.id)){
    assert(section.pool.every(e=>ctx.subjectOfLevel(e.lv)===subject.id),'matière unique');
    assert(section.pool.every(e=>ctx.sectionKey(e)===section.key),'notion et discipline uniques');
    ctx.state.subjectId=subject.id;ctx.state.sectionKey=section.key;
    for(const e of ctx.pickSectionExercises())assert(ctx.isLevelUnlocked(e.lv),'pas de niveau fermé');
  }
}
ctx.state.subjectId='maths';ctx.state.sectionKey=fractions.key;
ctx.state.fractionParts=4;ctx.state.fractionSelected=[];
ctx.state.sectionStep=0;
ctx.setFractionParts(4);ctx.toggleFractionPart(0);ctx.toggleFractionPart(1);
assert.equal(ctx.state.fractionSelected.length,2);
assert(ctx.renderFractionLesson(0).includes('2/4'));
ctx.setFractionParts(3);assert.equal(ctx.state.fractionSelected.length,0);
ctx.setFractionParts(999);assert.equal(ctx.state.fractionParts,3);
ctx.setFractionScale(4);assert(ctx.renderFractionLesson(2).includes('1/2 = 4/8'));
ctx.setFractionGroups(3);assert(ctx.renderFractionLesson(3).includes('12 ÷ 3 = 4'));
assert(ctx.renderFractionLesson(4).includes('2/6 + 1/6 = 3/6'));
ctx.state.sectionReveal=true;assert(ctx.renderFractionLesson(5).includes('6 × 5 = 30'));

const navigate=ctx.navigate;
let destination;
ctx.navigate=(screen,data)=>{destination=screen;if(data)Object.assign(ctx.state,data)};
ctx.document.getElementById=()=>null;
ctx.state.screen='sectionLesson';ctx.retourArriere();assert.equal(destination,'section');
ctx.state.screen='section';ctx.retourArriere();assert.equal(destination,'subject');
ctx.state.screen='game';ctx.state.mode='section';ctx.retourArriere();assert.equal(destination,'section');
ctx.location.hash='#section=maths&notion='+encodeURIComponent(fractions.key);
assert(ctx.restoreSectionLink());assert.equal(ctx.state.screen,'section');
ctx.location.hash='#section=sciences&notion='+encodeURIComponent(fractions.key);
assert.equal(ctx.restoreSectionLink(),false,'liens impossibles refusés');

const added=ctx.EX.filter(e=>String(e.id).startsWith('section_frac_'));
assert.equal(added.length,20);
assert.equal(new Set(added.map(e=>ctx._qKey(e))).size,20);
for(const e of added){
  assert.equal(e.cat,'Fractions');assert(ctx.isPlayableEx(e));
  assert.equal(new Set(e.ch).size,e.ch.length);
  assert(e.ans>=0&&e.ans<e.ch.length);assert(e.lessonTier>=1&&e.lessonTier<=5);
}
console.log('✅ Sections : matières et disciplines isolées, paliers croissants, erreurs et réussites conservées, reprise, manipulations, liens et navigation.');
process.exit(0);
