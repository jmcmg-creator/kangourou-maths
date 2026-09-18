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



const ex=ctx.EX.find(e=>e.lv==='ce1-ce2'&&ctx.isPlayableEx(e));
ctx.profile=ctx.migrate({name:'Journal',grade:3});
const wrong=(ex.ans+1)%ex.ch.length;
ctx.state.results=[{ex,choice:wrong,correct:false}];
const first=ctx.recordAnswer(ex,false,wrong);
ctx.state.results.push({ex,choice:ex.ans,correct:true});
const second=ctx.recordAnswer(ex,true,ex.ans);
assert.notEqual(first.id,second.id);
assert.equal(ctx.profile.answerHistory.length,2);
assert.equal(ctx.loadProfileByName('Journal').answerHistory.length,2);
assert.equal(first.given,ex.ch[wrong]);
assert.equal(second.answer,ex.ch[ex.ans]);
assert.equal(first.correct,false);assert.equal(second.correct,true);
assert.equal(ctx.remainingOf([ex]).length,0);
assert.equal(ctx.profile.answerHistory[0].q,ex.q);
ctx.profile.sessions=[];ctx.profile.recentMisses=[];
assert.equal(ctx.migrate(ctx.profile).answerHistory.length,2,'indépendant des journaux bornés');
const history=Array.from({length:300},(_,i)=>({...first,id:'attempt'+i}));
const merged=ctx.mergeProfiles(ctx.migrate({name:'Journal',answerHistory:history}),ctx.migrate({name:'Journal',answerHistory:[first,second]}));
assert.equal(merged.answerHistory.length,302);
assert.equal(ctx.mergeProfiles(merged,merged).answerHistory.length,302);
const legacy=ctx.migrate({name:'Ancien',sessions:[{date:'2026-09-01T10:00:00Z',mode:'training',results:[{ex,correct:false,choice:wrong}]}]});
assert.equal(legacy.answerHistory.length,1);
assert.equal(ctx.migrate(legacy).answerHistory.length,1);
ctx.profile=ctx.migrate({name:'HTML',answerHistory:[{...first,q:'<img src=x onerror=alert(1)>',given:'<script>',answer:'<b>'}]});
let html=ctx.renderAnswerHistory();assert(html.includes('&lt;img'));assert(!html.includes('<img src=x'));
ctx.state.answerHistoryFilter='correct';assert(!ctx.renderAnswerHistory().includes('&lt;img'));
ctx.profile=ctx.migrate({name:'Autre'});assert.equal(ctx.profile.answerHistory.length,0);
console.log('✅ Historique : réussites et erreurs immédiates, migration, aucune troncature, fusion idempotente, filtres et échappement.');

// Adaptateur : vraie sérialisation, lots, reprise réseau et lectures paginées.
const storage={};const database=new Map();let online=true,profilePayload=null;
const calls=[];
const api={console,JSON,Map,Set,Array,String,Number,localStorage:{
 getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},SUPABASE_CONFIG:{url:'https://database.test',anonKey:'test'},
 fetch:async(url,options)=>{
   if(!online)throw new Error('offline');
   const fn=url.split('/').pop(),args=JSON.parse(options.body);calls.push({fn,args});
   let result;
   if(fn==='save_question_answers'){
     for(const a of args.p_answers)if(!database.has(a.id))database.set(a.id,a);
     result={ok:true};
   }else if(fn==='save_profile'){profilePayload=args.p_profile;result={ok:true}}
   else if(fn==='load_profile')result={profile:profilePayload||{}};
   else if(fn==='load_question_answers'){
     const rows=[...database.values()].slice(args.p_after,args.p_after+100);
     result={answers:rows,next:args.p_after+rows.length};
   }
   return {ok:true,json:async()=>result};
 }};
api.window=api;vm.createContext(api);
storage.royaume_supa_journal=JSON.stringify({id:'player-1',token:'test',pseudo:'Journal'});
vm.runInContext(readFileSync(join(racine,'supa.js'),'utf8'),api);
const snapshot={name:'Journal',answerHistory:history,answerHistoryVersion:1};
online=false;assert((await api.Supa.saveProfile('Journal',snapshot)).error);
assert.equal(database.size,0);
online=true;assert((await api.Supa.saveProfile('Journal',snapshot)).ok);
assert.equal(database.size,300);
assert(!Object.hasOwn(profilePayload,'answerHistory'));assert(!Object.hasOwn(profilePayload,'name'));
const batches=calls.filter(c=>c.fn==='save_question_answers').length;
await api.Supa.saveProfile('Journal',snapshot);
assert.equal(calls.filter(c=>c.fn==='save_question_answers').length,batches);
const restored=await api.Supa.loadProfile('Journal');assert.equal(restored.answerHistory.length,300);
assert.equal(restored.answerHistory[0].given,first.given);
assert.equal(snapshot.answerHistory.length,300,'la copie locale reste intacte');
const recovered=ctx.migrate({name:'Journal',answerHistory:[second]});
assert(recovered.successfulQuestions['id:'+ex.id],'réussites reconstruites depuis le journal en base');
console.log('✅ Base : reprise après échec, lots de 100, accusés de réception, profil sans historique volumineux et lecture paginée.');
process.exit(0);
