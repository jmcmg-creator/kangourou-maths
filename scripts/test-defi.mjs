// Test du système de codes de défi et de l'envoi fiable des scores.
import fs from 'fs';
const src=fs.readFileSync(new URL('../game.js',import.meta.url),'utf8');
const a=src.indexOf('const BATTLE_WORDS');const b=src.indexOf('async function fetchBattle');
const c=src.indexOf('async function pushBattle');const d=src.indexOf('/* ════════ ANALYTICS PRODUIT');
let calls=0,mode='ok';
const fetchStub=async()=>{calls++;if(mode==='fail')return {ok:false,status:500};if(mode==='flaky'&&calls<3)return {ok:false,status:503};return {ok:true}};
// battleAid est requis par pushBattle : on le remplace.
const full=new Function('fetch','API_BASE','setTimeout','battleAid',src.slice(a,b)+src.slice(c,d)+';return {normalizeBattleCode,randomBattleCode,pushBattle}');
const L=full(fetchStub,'http://x',(f)=>f(),async()=>'a'.repeat(32));
let ko=0;const t=(n,x)=>{if(!x){ko++;console.log('❌',n)}else console.log('✅',n)};
t('ancien code DRAGON80 -> DRAGON-80',L.normalizeBattleCode('dragon80')==='DRAGON-80');
t('ancien code avec tiret inchangé',L.normalizeBattleCode('POTION-37')==='POTION-37');
const s=new Set();let okf=true;for(let i=0;i<5000;i++){const x=L.randomBattleCode();s.add(x);if(!/^[A-Z]+-\d{2}-[A-HJKMNP-Z2-9]{4}$/.test(x)||L.normalizeBattleCode(x)!==x)okf=false}
t('5000 codes: bon format et stables après normalisation',okf);
t('5000 codes: aucun doublon',s.size===5000);
t('code collé sans tirets accepté',L.normalizeBattleCode('dragon80k7q2')==='DRAGON-80-K7Q2');
t('lien complet accepté',L.normalizeBattleCode('https://x/?battle=DRAGON-80-K7Q2')==='DRAGON-80-K7Q2');
mode='flaky';calls=0;let r=true;try{await L.pushBattle({code:'DRAGON-80'})}catch(e){r=false}
t('envoi : réussit au 3e essai',r&&calls===3);
mode='fail';calls=0;r=false;try{await L.pushBattle({code:'DRAGON-80'})}catch(e){r=true}
t('envoi : erreur claire après 3 échecs',r&&calls===3);
console.log(ko?`\n${ko} échoués`:'\nTous réussis');process.exit(ko?1:0);
