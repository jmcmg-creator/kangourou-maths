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



ctx._memVoice=false;
ctx.profile=ctx.migrate({name:'Memoire',grade:2,age:8});
ctx.navigate=(s,data)=>{ctx.state.screen=s;if(data)Object.assign(ctx.state,data)};
ctx.document.querySelectorAll=()=>Array.from({length:30},()=>el());
const stages=ctx.MEMORY_STAGES;
assert.equal(stages.length,8);
assert(ctx.memoryStageOpen(stages[0]));assert(!ctx.memoryStageOpen(stages[1]));
ctx.startMemory('path:visuel-2');assert(!ctx.state.mem,'pas de contournement du verrou');
ctx.startMemory('path:visuel-1');
assert.equal(ctx.state.mem.cards.length,12);assert.equal(ctx.state.mem.preview,12);
ctx.state.mem.preview=0;
const a=0,b=ctx.state.mem.cards.findIndex((c,i)=>i!==a&&c.pair!==ctx.state.mem.cards[a].pair);
ctx.memFlip(a);ctx.memFlip(b);
assert.equal(ctx.profile.answerHistory.at(-1).correct,false);
assert.equal(ctx.profile.answerHistory.at(-1).memory.errors,1);
ctx.state.mem.lock=false;ctx.state.mem.flipped=[];
const pair=ctx.state.mem.cards.findIndex((c,i)=>i!==0&&c.pair===ctx.state.mem.cards[0].pair);
ctx.memFlip(0);ctx.memFlip(pair);
assert.equal(ctx.profile.answerHistory.at(-1).correct,true);
ctx.recordMemorySession(false);
assert.equal(ctx.memoryStageProgress(stages[0]).wins,0);
assert.equal(ctx.profile.answerHistory.filter(r=>r.memory.kind==='session').length,1);
ctx.recordMemorySession(false);assert.equal(ctx.profile.answerHistory.filter(r=>r.memory.kind==='session').length,1);

function completed(errors){
 ctx.startMemory('path:visuel-1');
 const m=ctx.state.mem;m.erreurs=errors;m.found=m.cards.length/2;m.moves=m.found+errors;
 ctx.memWin();const xp=ctx.profile.xp;ctx.memWin();assert.equal(ctx.profile.xp,xp,'victoire idempotente');
 return m.board;
}
completed(3);assert.equal(ctx.memoryStageProgress(stages[0]).wins,0,'3 erreurs ne valident pas');
const first=completed(2);assert.equal(ctx.memoryStageProgress(stages[0]).wins,1);
const second=completed(0);assert.notEqual(first,second);assert.equal(ctx.memoryStageProgress(stages[0]).wins,2);
assert(ctx.memoryStageOpen(stages[1]));
ctx.profile=ctx.loadProfileByName('Memoire');assert(ctx.memoryStageOpen(stages[1]),'rechargement');
const merged=ctx.mergeProfiles(ctx.profile,ctx.profile);
assert.equal(merged.answerHistory.length,ctx.profile.answerHistory.length,'fusion idempotente');
ctx.profile=ctx.migrate({name:'Autre',grade:2,age:8});assert(!ctx.memoryStageOpen(stages[1]),'profils isolés');
ctx.profile.memoryStats={'zoo-facile':{erreurs:1,moves:7,time:25}};
assert.equal(ctx.memoryStageProgress(stages[0]).wins,1,'un ancien record vaut une validation');
for(const stage of stages){
 const b=ctx._memBuildPairs('path:'+stage.id,stage);
 assert.equal(b.cards.length,stage.pairs*2);
 const counts=new Map();for(const c of b.cards)counts.set(c.pair,(counts.get(c.pair)||0)+1);
 assert([...counts.values()].every(n=>n===2));
 if(stage.tables)assert.equal(new Set(b.cards.filter(c=>!c.face.includes('×')).map(c=>c.face)).size,stage.pairs);
}
const geo=ctx.EX.filter(e=>Number.isInteger(e.schoolGrade));
assert.equal(geo.length,42);
for(let grade=0;grade<=6;grade++){
 ctx.profile=ctx.migrate({name:'Classe'+grade,grade,age:6+grade});
 const list=ctx.sectionsOf('maths').filter(s=>Number.isInteger(s.grade));
 assert.equal(list.length,grade+1,'une section pour chaque classe accessible');
 const section=list.find(s=>s.grade===grade);assert(section);assert.equal(section.pool.length,6);
 assert(geo.filter(e=>e.schoolGrade===grade).every(e=>ctx.isPlayableEx(e)));
 ctx.state.subjectId='maths';ctx.state.sectionKey=section.key;
 assert(ctx.pickSectionExercises().every(e=>e.schoolGrade===grade));
 for(const mode of ['training','adaptive','challenge','progression']){
  const batch=ctx.pickExercises(mode,section.pool[0].lv);
  assert(batch.every(e=>!Number.isInteger(e.schoolGrade)||e.schoolGrade<=grade),'filtrage '+mode+' classe '+grade);
 }
 for(let step=0;step<4;step++)assert(ctx.renderGeometryLesson(step,grade).length>100);
}
assert(ctx.renderGeometryDiagram({diagram:{shape:'square',labels:['<img src=x>']}}).includes('&lt;img'));
assert(!ctx.renderGeometryDiagram({diagram:{shape:'javascript:alert(1)'}}).includes('<svg'));
ctx.state.geoAngle=90;assert(ctx.geometryAngleHTML().includes('angle droit'));
ctx.state.geoPoint={x:1,y:1};assert(ctx.geometrySymmetryHTML().includes('2 carreaux'));
console.log('✅ Memory : étapes, deux validations distinctes, erreurs, interruption, reprise, migration, profils et plateaux.');
console.log('✅ Géométrie : 42 questions, sept classes, leçons, diagrammes et filtrage de tous les modes.');
process.exit(0);
