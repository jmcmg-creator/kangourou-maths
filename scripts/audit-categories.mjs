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
for (const f of ['exercises.js', 'exercises_extra.js', 'exercises_logic.js', 'cartes-monde.js'])
  vm.runInContext(readFileSync(join(racine, f), 'utf8').replace(/^const EX=/m, 'var EX='), ctx, { filename: f });
vm.runInContext(readFileSync(join(racine, 'game.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: 'game.js' });

const rows=ctx.SUBJECTS.map(s=>({subject:s.id,levels:(s.levels||[]).map(l=>({id:l.id,count:ctx.EX.filter(e=>e.lv===l.id).length,categories:[...new Set(ctx.EX.filter(e=>e.lv===l.id).map(e=>e.cat))]}))}));
console.log(JSON.stringify({total:ctx.EX.length,rows,unknown:ctx.EX.filter(e=>!ctx.subjectOfLevel(e.lv)),suspects:ctx.EX.filter(e=>ctx._horsSujet(e,e.lv))},null,2));
process.exit(0);
