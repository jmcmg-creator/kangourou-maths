// Les continents : chaque pays a une forme touchable, les capitales se placent
// SUR le pays, et l'Asie, l'Afrique puis l'Amérique s'ouvrent l'une après
// l'autre, seulement quand la précédente est terminée.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
let ok = 0, ko = 0;
const dire = (l, c, d) => { c ? (ok++, console.log('  ✅ ' + l)) : (ko++, console.log('  ❌ ' + l + (d ? ' → ' + d : ''))); };
const el = () => ({ style: {}, classList: { add(){}, remove(){}, toggle(){}, contains(){ return false } }, addEventListener(){}, set innerHTML(v){}, get innerHTML(){ return '' }, textContent: '', dataset: {}, querySelector: () => null, querySelectorAll: () => [], appendChild(){}, focus(){}, click(){}, getBoundingClientRect(){ return { top:0, left:0, width:0, height:0 } } });
const mem = {}; const ctx = {};
for (const k of Object.getOwnPropertyNames(globalThis)) { try { ctx[k] = globalThis[k] } catch (e) {} }
Object.assign(ctx, { console, setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame: (f) => setTimeout(f, 0),
  localStorage: { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v) }, removeItem: (k) => { delete mem[k] } },
  navigator: { userAgent: 'test', language: 'fr' }, location: { href: 'http://localhost/', search: '', hash: '', origin: 'http://localhost' },
  fetch: () => Promise.reject(new Error('hors ligne')), alert(){}, confirm(){ return false }, prompt(){ return null },
  history: { pushState(){}, replaceState(){} }, screen: {}, matchMedia: () => ({ matches: false, addEventListener(){} }),
  addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return true }, scrollTo(){}, innerHeight: 800, innerWidth: 390, scrollY: 0, getComputedStyle: () => ({ getPropertyValue: () => '' }) });
ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
ctx.document = Object.assign(el(), { documentElement: el(), body: el(), head: el(), getElementById: () => el(), createElement: () => el(), querySelector: () => el(), querySelectorAll: () => [], addEventListener(){}, hidden: false, visibilityState: 'visible' });
vm.createContext(ctx);
for (const f of ['exercises.js', 'exercises_extra.js', 'exercises_logic.js', 'cartes-monde.js'])
  vm.runInContext(readFileSync(join(racine, f), 'utf8').replace(/^const (EX|MAP_SETS_MONDE)=/m, 'var $1='), ctx, { filename: f });
vm.runInContext(readFileSync(join(racine, 'game.js'), 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: 'game.js' });

console.log('\n── Les cartes générées');
for (const [id, set] of Object.entries(ctx.MAP_SETS_MONDE)) {
  const pays = Object.values(set.pays);
  const casse = pays.filter(p => !p.path || !p.name || p.w == null || p.h == null || !p.cap);
  dire(`${set.nom} : ${pays.length} pays, tous avec forme, nom, taille et capitale`, casse.length === 0, casse.map(p => p.nom).join(','));
}
dire('« Où sont les États-Unis ? » (pluriel)', ctx.ouEst('les États-Unis') === 'Où sont les États-Unis ?', ctx.ouEst('les États-Unis'));
dire('« Où est le Kenya ? » (singulier)', ctx.ouEst('le Kenya') === 'Où est le Kenya ?');

console.log('\n── Les questions');
const parNiveau = (lv) => ctx.EX.filter(e => e.lv === lv);
for (const [lv, attendu] of [['geo-carte-asie', 35 * 2], ['geo-carte-afrique', 43 * 2], ['geo-carte-amerique', 22 * 2]]) {
  const l = parNiveau(lv); const jouables = l.filter(ctx.isPlayableEx).length;
  dire(`${lv} : ${l.length} questions (pays + capitales), toutes jouables`, l.length === attendu && jouables === l.length, `${l.length}/${attendu}, jouables ${jouables}`);
}
const eu = parNiveau('geo-carte-europe');
dire('Capitales d\'Europe : plus aucune question à points (QCM déguisé)', eu.every(e => e.type === 'map-country'), eu.filter(e => e.type !== 'map-country').map(e => e.id).join(','));
dire('… et les anciens identifiants sont conservés (la progression de Judith survit)', eu.some(e => e.id === 'mapeu_paris') && eu.some(e => e.id === 'mapeu_vienne'));
const paris = eu.find(e => e.id === 'mapeu_paris');
dire('Paris → toucher la France', paris && paris.target === 'fr' && paris.cap === 'Paris', JSON.stringify(paris && { t: paris.target, c: paris.cap }));
dire('la bonne réponse d\'une capitale est le nom du pays', ctx.exAnswerText(paris) === 'la France', ctx.exAnswerText(paris));
const astana = ctx.EX.find(e => e.id === 'mapk_asie_kz');
for (const [n,a] of [['le Kenya','du Kenya'],['la France','de la France'],["l'Iran","de l'Iran"],['les États-Unis','des États-Unis'],['Israël',"d'Israël"],['Cuba','de Cuba']]) dire(`« la capitale ${a} »`, ctx.deNom(n)===a, ctx.deNom(n));
dire('Astana → toucher le Kazakhstan, avec le bon corrigé', astana && astana.target === 'kz' && /Astana est la capitale du Kazakhstan\./.test(astana.se), astana && astana.se);

console.log('\n── La chaîne des continents');
ctx.profile = ctx.migrate({ name: 'Nina', grade: 3, exerciseStats: {} });
dire('au départ, l\'Asie est fermée', !ctx.isLevelUnlocked('geo-carte-asie'));
dire('l\'Afrique et l\'Amérique aussi', !ctx.isLevelUnlocked('geo-carte-afrique') && !ctx.isLevelUnlocked('geo-carte-amerique'));
const maitriser = (lv) => { for (const e of parNiveau(lv)) ctx.profile.exerciseStats[e.id] = { att: 1, cor: 1 }; };
maitriser('geo-carte-payseu');
dire('les pays d\'Europe terminés ne suffisent pas : il faut aussi les capitales', !ctx.isLevelUnlocked('geo-carte-asie'));
maitriser('geo-carte-europe');
dire('Europe terminée (pays + capitales) → l\'Asie s\'ouvre', ctx.isLevelUnlocked('geo-carte-asie'));
dire('… mais pas l\'Afrique', !ctx.isLevelUnlocked('geo-carte-afrique'));
maitriser('geo-carte-asie');
dire('Asie terminée → l\'Afrique s\'ouvre, l\'Amérique non', ctx.isLevelUnlocked('geo-carte-afrique') && !ctx.isLevelUnlocked('geo-carte-amerique'));
maitriser('geo-carte-afrique');
dire('Afrique terminée → l\'Amérique s\'ouvre', ctx.isLevelUnlocked('geo-carte-amerique'));
// Un continent ouvert alimente les thèmes de révision, un continent fermé non.
ctx.profile = ctx.migrate({ name: 'Nina', grade: 3, exerciseStats: {} });
const themes = ctx.themesDuSujet('geographie').map(([c]) => c);
dire('un continent fermé n\'apparaît pas dans « Réviser un thème »', !themes.some(c => /Asie|Afrique|Amérique/.test(c)), themes.join(' | '));
dire('la classe ne contourne pas la chaîne (CM2 : Asie toujours fermée)', (ctx.profile.grade = 5, !ctx.isLevelUnlocked('geo-carte-asie')));

console.log('\n══════════════════════════════');
console.log(`  ${ok} réussis · ${ko} échoués`);
console.log('══════════════════════════════');
process.exit(ko ? 1 : 0);
