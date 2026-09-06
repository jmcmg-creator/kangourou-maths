// Une question de maths ne doit jamais être servie dans un autre royaume, même
// si elle est arrivée dans le profil avec l'étiquette de ce royaume.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

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
for (const f of ['exercises.js', 'exercises_extra.js', 'exercises_logic.js'])
  vm.runInContext(readFileSync(join(racine, f), 'utf8').replace(/^const EX=/m, 'var EX='), ctx, { filename: f });
vm.runInContext(readFileSync(join(racine, 'game.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: 'game.js' });

const geo = { id: 'ia-geo-1', lv: 'geo-cm1', cat: 'Capitales', q: 'Quelle est la capitale de la Pologne ?', ch: ['Varsovie', 'Cracovie', 'Prague', 'Vienne'], ans: 0, se: 'Varsovie est la capitale.' };
const geoNombres = { id: 'ia-geo-2', lv: 'geo-cm1', cat: 'Continents', q: 'Combien y a-t-il de continents ?', ch: ['5', '6', '7', '8'], ans: 2, se: 'On en compte 7.' };
const maths1 = { id: 'ia-m-1', lv: 'geo-cm1', cat: 'Calcul mental', q: 'Combien font 7 × 8 ?', ch: ['54', '56', '58', '48'], ans: 1, se: '7 × 8 = 56.' };
const maths2 = { id: 'ia-m-2', lv: 'geo-cm1', cat: 'Géographie', q: 'Un train parcourt 120 km en 2 h. Calcule sa vitesse.', ch: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], ans: 1, se: '120 ÷ 2 = 60.' };
const maths3 = { id: 'ia-m-3', lv: 'geo-cm1', cat: 'Monde', q: 'Quel est le résultat de 45 + 37 ?', ch: ['72', '82', '92', '81'], ans: 1, se: '45 + 37 = 82.' };
const mathsEnMaths = { id: 'ia-m-4', lv: 'cm1-cm2', cat: 'Calcul mental', q: 'Combien font 7 × 8 ?', ch: ['54', '56', '58', '48'], ans: 1, se: '7 × 8 = 56.' };

console.log('\n── Le juge');
dire('une capitale est bien de la géographie', !ctx._horsSujet(geo, 'geo-cm1'));
dire('« combien de continents » n\'est PAS du calcul', !ctx._horsSujet(geoNombres, 'geo-cm1'));
dire('« combien font 7 × 8 » sous geo-cm1 est hors sujet', ctx._horsSujet(maths1, 'geo-cm1'));
dire('un problème de vitesse déguisé en « Géographie » aussi', ctx._horsSujet(maths2, 'geo-cm1'));
dire('« le résultat de 45 + 37 » aussi', ctx._horsSujet(maths3, 'geo-cm1'));
dire('le même calcul dans le royaume des maths est à sa place', !ctx._horsSujet(mathsEnMaths, 'cm1-cm2'));

console.log('\n── Au chargement du profil : purge');
const p = ctx.migrate({ name: 'Nina', grade: 3, aiExercises: [geo, maths1, geoNombres, maths2, maths3, mathsEnMaths] });
const restants = p.aiExercises.map(e => e.id);
dire('les trois questions de maths étiquetées géo sont retirées', !restants.includes('ia-m-1') && !restants.includes('ia-m-2') && !restants.includes('ia-m-3'), restants.join(','));
dire('les questions de géographie sont gardées', restants.includes('ia-geo-1') && restants.includes('ia-geo-2'));
dire('les maths dans le royaume des maths sont gardées', restants.includes('ia-m-4'));
dire('le compteur dit combien ont été retirées', p.horsSujetPurgees === 3, String(p.horsSujetPurgees));
const p2 = ctx.migrate(p);
dire('la purge ne repasse pas (marqueur de version)', p2.horsSujetPurgees === 3);

console.log('\n── Au tirage : ceinture et bretelles');
ctx.profile = ctx.migrate({ name: 'Nina', grade: 3, aiExercises: [] });
ctx.profile.aiExercises = [geo, maths1, maths2];   // on contourne la purge exprès
ctx.profile.horsSujetPurgeV = 99;
let servis = new Set();
for (let i = 0; i < 30; i++) for (const e of ctx.pickExercises('training', 'geo-cm1') || []) servis.add(e.id);
dire('la question de géographie générée peut être servie', servis.has('ia-geo-1'));
dire('les questions de maths étiquetées géo ne sont JAMAIS servies', !servis.has('ia-m-1') && !servis.has('ia-m-2'), [...servis].filter(x => /ia-m/.test(x)).join(','));

console.log('\n══════════════════════════════');
console.log(`  ${ok} réussis · ${ko} échoués`);
console.log('══════════════════════════════');
process.exit(ko ? 1 : 0);
