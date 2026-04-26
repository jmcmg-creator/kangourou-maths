/* ════════ NIVEAUX / MODES ════════ */
const SUBJECTS=[
  {id:"maths",name:"Math\u00e9matiques",icon:"\u{1F9EE}",color:"#f7a020",desc:"Royaume des Nombres",
    levels:[
      {id:"cp",name:"Apprenti Dragonneau",sub:"CP fort (secret)",icon:"\u{1F95A}",color:"#93c5fd",secret:true,hasStatic:true},
      {id:"ce1-ce2",name:"Apprenti Sorcier",sub:"CE1 \u2013 CE2",icon:"\u{1F9D9}",color:"#22c55e",hasStatic:true},
      {id:"cm1-cm2",name:"Chevalier du Savoir",sub:"CM1 \u2013 CM2",icon:"\u2694\uFE0F",color:"#f7a020",hasStatic:true},
      {id:"6e-5e",name:"Ma\u00eetre Dragon",sub:"6\u1d49 \u2013 5\u1d49",icon:"\u{1F409}",color:"#ef4444",hasStatic:true}
    ]},
  {id:"culture",name:"Culture g\u00e9n\u00e9rale",icon:"\u{1F4DA}",color:"#c4b5fd",desc:"Histoire, G\u00e9o, Fran\u00e7ais, EMC",
    levels:[
      {id:"histoire-ce2",name:"Histoire",sub:"CE2 \u2014 Pr\u00e9histoire/Romains",icon:"\u{1F3DB}\uFE0F",color:"#fbbf24",hasStatic:true},
      {id:"histoire-cm1",name:"Histoire",sub:"CM1 \u2014 Moyen \u00c2ge/Renaissance",icon:"\u{1F451}",color:"#fbbf24",hasStatic:true},
      {id:"histoire-cm2",name:"Histoire",sub:"CM2 \u2014 R\u00e9volution/XXe",icon:"\u{1F4DC}",color:"#fbbf24",hasStatic:true},
      {id:"geographie-ce2",name:"G\u00e9ographie",sub:"CE2 \u2014 La France",icon:"\u{1F1EB}\u{1F1F7}",color:"#22d3ee",hasStatic:true},
      {id:"geographie-cm1",name:"G\u00e9ographie",sub:"CM1 \u2014 R\u00e9gions de France",icon:"\u{1F5FA}\uFE0F",color:"#22d3ee",hasStatic:true},
      {id:"geographie-cm2",name:"G\u00e9ographie",sub:"CM2 \u2014 Europe & Monde",icon:"\u{1F30D}",color:"#22d3ee",hasStatic:true},
      {id:"francais-ce2",name:"Fran\u00e7ais",sub:"CE2 \u2014 Grammaire/Conjugaison",icon:"\u{270F}\uFE0F",color:"#f472b6",hasStatic:true},
      {id:"francais-cm1",name:"Fran\u00e7ais",sub:"CM1 \u2014 Conjugaisons/Accords",icon:"\u{1F4D6}",color:"#f472b6",hasStatic:true},
      {id:"francais-cm2",name:"Fran\u00e7ais",sub:"CM2 \u2014 Tous temps/Figures",icon:"\u{1F4DD}",color:"#f472b6",hasStatic:true},
      {id:"emc-ce2",name:"EMC",sub:"CE2 \u2014 Citoyennet\u00e9",icon:"\u{1F970}",color:"#a78bfa",hasStatic:true},
      {id:"emc-cm1",name:"EMC",sub:"CM1 \u2014 D\u00e9mocratie",icon:"\u{1F396}\uFE0F",color:"#a78bfa",hasStatic:true},
      {id:"emc-cm2",name:"EMC",sub:"CM2 \u2014 Institutions",icon:"\u{1F3DB}\uFE0F",color:"#a78bfa",hasStatic:true}
    ]},
  {id:"poesie",name:"Po\u00e9sies La Fontaine",icon:"\u{1F4DC}",color:"#a78bfa",desc:"\u00c9coute, r\u00e9cite \u00e0 voix haute (avec micro)",isPoetry:true},
  {id:"langues",name:"Langues",icon:"\u{1F310}",color:"#10b981",desc:"H\u00e9breu (alphabet, vocabulaire, lecture)",
    levels:[
      {id:"hebreu-alphabet",name:"H\u00e9breu",sub:"Alphabet (\u05D0\u05D1\u05D2)",icon:"\u{1F524}",color:"#0ea5e9",hasStatic:true},
      {id:"hebreu-vocabulaire",name:"H\u00e9breu",sub:"Vocabulaire de base",icon:"\u{1F4DA}",color:"#0ea5e9",hasStatic:true},
      {id:"hebreu-expressions",name:"H\u00e9breu",sub:"Expressions courantes",icon:"\u{1F5E3}\uFE0F",color:"#0ea5e9",hasStatic:true},
      {id:"hebreu-lecture",name:"H\u00e9breu",sub:"Lecture mots et phrases",icon:"\u{1F4D6}",color:"#0ea5e9",hasStatic:true}
    ]},
  {id:"sciences",name:"Sciences",icon:"\u{1F52C}",color:"#22d3ee",desc:"Physique, Chimie, Biologie",
    levels:[
      {id:"physique-ce2",name:"Physique",sub:"CE2 \u2014 Mati\u00e8re/Lumi\u00e8re",icon:"\u{1F4A1}",color:"#3b82f6",hasStatic:true},
      {id:"physique-cm1",name:"Physique",sub:"CM1 \u2014 \u00c9nergie/\u00c9lectricit\u00e9",icon:"\u26A1",color:"#3b82f6",hasStatic:true},
      {id:"physique-cm2",name:"Physique",sub:"CM2 \u2014 Forces/Circuits",icon:"\u{1F9F2}",color:"#3b82f6",hasStatic:true},
      {id:"chimie-ce2",name:"Chimie",sub:"CE2 \u2014 \u00c9tats mati\u00e8re",icon:"\u{1F9EA}",color:"#10b981",hasStatic:true},
      {id:"chimie-cm1",name:"Chimie",sub:"CM1 \u2014 M\u00e9langes/Dissolution",icon:"\u{1F4A7}",color:"#10b981",hasStatic:true},
      {id:"chimie-cm2",name:"Chimie",sub:"CM2 \u2014 Transformations",icon:"\u2697\uFE0F",color:"#10b981",hasStatic:true},
      {id:"biologie-ce2",name:"SVT",sub:"CE2 \u2014 Corps/Animaux",icon:"\u{1F9B7}",color:"#84cc16",hasStatic:true},
      {id:"biologie-cm1",name:"SVT",sub:"CM1 \u2014 Nutrition/Reproduction",icon:"\u{1F33F}",color:"#84cc16",hasStatic:true},
      {id:"biologie-cm2",name:"SVT",sub:"CM2 \u2014 \u00c9cosyst\u00e8mes",icon:"\u{1F33B}",color:"#84cc16",hasStatic:true}
    ]}
];

// Aplatir tous les niveaux pour rétrocompat. `|| []` est crucial : poesie
// n'a pas de `levels` (isPoetry:true), donc sans ça flatMap insère un
// undefined dans LEVELS, et tout LEVELS.find(...) plante au passage de
// ce trou — rendant les niveaux qui suivent poesie (langues, sciences)
// non-fonctionnels.
const LEVELS=SUBJECTS.flatMap(s=>s.levels||[]);

function getSubjectForLevel(lvId){
  for(const s of SUBJECTS) if(s.levels.find(l=>l.id===lvId)) return s;
  return SUBJECTS[0];
}
const MODES=[
{id:"training",name:"Entra\u00eenement libre",icon:"\u{1F4DC}",desc:"Sans limite de temps. Apprends \u00e0 ton rythme."},
{id:"adaptive",name:"Mode adaptatif",icon:"\u{1F3AF}",desc:"Exercices cibl\u00e9s sur tes points faibles."},
{id:"challenge",name:"D\u00e9fi chrono",icon:"\u23F1\uFE0F",desc:"60 secondes par question. Chaque seconde compte !"},
{id:"progression",name:"Qu\u00eate du Dragon",icon:"\u{1F3F0}",desc:"Difficult\u00e9 croissante. M\u00e9lange tous les niveaux."}
];

/* ════════ BADGES ════════ */
const BADGES=[
{id:"first",icon:"\u{1F331}",name:"Premier pas",desc:"1\u02b3\u1d49 partie termin\u00e9e",cond:p=>p.totalGames>=1},
{id:"streak5",icon:"\u{1F525}",name:"Flamme",desc:"S\u00e9rie de 5",cond:p=>p.bestStreak>=5},
{id:"streak10",icon:"\u{1F409}",name:"Dragon",desc:"S\u00e9rie de 10",cond:p=>p.bestStreak>=10},
{id:"perfect",icon:"\u{1F451}",name:"Sorci\u00e8re",desc:"100% \u00e0 une partie",cond:p=>p.sessions.some(s=>s.score===s.total&&s.total>=5)},
{id:"knight",icon:"\u2694\uFE0F",name:"Chevali\u00e8re",desc:"10 parties jou\u00e9es",cond:p=>p.totalGames>=10},
{id:"erudit",icon:"\u{1F4DA}",name:"\u00c9rudite",desc:"10 cat\u00e9gories attaqu\u00e9es",cond:p=>Object.keys(p.catStats||{}).length>=10},
{id:"daily",icon:"\u{1F4C5}",name:"R\u00e9gularit\u00e9",desc:"3 jours diff\u00e9rents",cond:p=>(p.playDays||[]).length>=3},
{id:"master",icon:"\u{1F3C6}",name:"Ma\u00eetresse",desc:"50 bonnes r\u00e9ponses au total",cond:p=>(p.totalCorrect||0)>=50}
];

/* ════════ ROYAUMES — chaque domaine = un royaume avec sa mascotte ════════ */
const ROYAUMES={
  maths:{
    id:"maths",name:"Royaume des Nombres",color:"#f7a020",bgGradient:"linear-gradient(135deg,#fef3c7,#fde68a,#fcd34d)",
    stages:[
      {threshold:0,name:"\u0152uf de feu",emoji:"\u{1F95A}",desc:"Un \u0153uf br\u00fblant repose..."},
      {threshold:100,name:"B\u00e9b\u00e9 Dragon",emoji:"\u{1F423}",desc:"Il vient d'\u00e9clore !"},
      {threshold:300,name:"Jeune Dragon",emoji:"\u{1F409}",desc:"Ses ailes s'affirment"},
      {threshold:700,name:"Dragon Adulte",emoji:"\u{1F432}",desc:"Majestueux !"},
      {threshold:1500,name:"Dragon L\u00e9gendaire",emoji:"\u{1F432}\u2728",desc:"Une cr\u00e9ature mythique"}
    ],
    companions:[
      {id:"fire",name:"Flambo",emoji:"\u{1F525}",elem:"Feu",threshold:10},
      {id:"ice",name:"Givrion",emoji:"\u2744\uFE0F",elem:"Glace",threshold:25},
      {id:"forest",name:"Verdoyant",emoji:"\u{1F343}",elem:"For\u00eat",threshold:50},
      {id:"storm",name:"Tonnerre",emoji:"\u26A1",elem:"Orage",threshold:100},
      {id:"light",name:"Luminion",emoji:"\u2728",elem:"Lumi\u00e8re",threshold:200}
    ]
  },
  culture:{
    id:"culture",name:"Royaume du Savoir",color:"#c4b5fd",bgGradient:"linear-gradient(135deg,#ede9fe,#ddd6fe,#c4b5fd)",
    stages:[
      {threshold:0,name:"Vieux Livre",emoji:"\u{1F4D5}",desc:"Un livre poussi\u00e9reux..."},
      {threshold:100,name:"Apprenti Sage",emoji:"\u{1F4D6}",desc:"Tu commences \u00e0 lire !"},
      {threshold:300,name:"\u00c9rudit",emoji:"\u{1F393}",desc:"Le savoir te nourrit"},
      {threshold:700,name:"Sage",emoji:"\u{1F9D9}",desc:"Tu guides les autres"},
      {threshold:1500,name:"Grand Sage",emoji:"\u{1F9D9}\u2728",desc:"Ma\u00eetre du savoir"}
    ],
    companions:[
      {id:"hist",name:"Antikon",emoji:"\u{1F3DB}\uFE0F",elem:"Histoire",threshold:10},
      {id:"geo",name:"Globion",emoji:"\u{1F30D}",elem:"G\u00e9ographie",threshold:25},
      {id:"lettre",name:"Plumelet",emoji:"\u{270F}\uFE0F",elem:"Lettres",threshold:50},
      {id:"emc",name:"Civicor",emoji:"\u{1F396}\uFE0F",elem:"Citoyennet\u00e9",threshold:100},
      {id:"sage",name:"Polymathe",emoji:"\u{1F451}",elem:"Sagesse",threshold:200}
    ]
  },
  sciences:{
    id:"sciences",name:"Royaume des D\u00e9couvertes",color:"#22d3ee",bgGradient:"linear-gradient(135deg,#cffafe,#a5f3fc,#67e8f9)",
    stages:[
      {threshold:0,name:"Tube \u00e0 essai",emoji:"\u{1F9EA}",desc:"Tout commence ici..."},
      {threshold:100,name:"Petit Chercheur",emoji:"\u{1F50D}",desc:"Premi\u00e8re exp\u00e9rience !"},
      {threshold:300,name:"Inventeur",emoji:"\u{1F52C}",desc:"Tu cherches, tu trouves"},
      {threshold:700,name:"Savant",emoji:"\u{1F9D1}\u200D\u{1F52C}",desc:"Le monde s'\u00e9claire"},
      {threshold:1500,name:"G\u00e9nie",emoji:"\u{1F9D1}\u200D\u{1F52C}\u2728",desc:"Einstein t'admire"}
    ],
    companions:[
      {id:"phys",name:"\u00c9clairon",emoji:"\u{1F4A1}",elem:"Physique",threshold:10},
      {id:"chim",name:"Bullion",emoji:"\u{1F9EA}",elem:"Chimie",threshold:25},
      {id:"bio",name:"Pousselin",emoji:"\u{1F33F}",elem:"Biologie",threshold:50},
      {id:"astro",name:"Stellaron",emoji:"\u{1F320}",elem:"Espace",threshold:100},
      {id:"genie",name:"Eurekon",emoji:"\u{1F9E0}",elem:"G\u00e9nie",threshold:200}
    ]
  },
  langues:{
    id:"langues",name:"Royaume des Mots",color:"#10b981",bgGradient:"linear-gradient(135deg,#d1fae5,#a7f3d0,#6ee7b7)",
    stages:[
      {threshold:0,name:"Lettre solitaire",emoji:"\u{1F524}",desc:"Une lettre attend..."},
      {threshold:100,name:"Petit Linguiste",emoji:"\u{1F5E3}\uFE0F",desc:"Premi\u00e8res paroles !"},
      {threshold:300,name:"Voyageur",emoji:"\u{1F30E}",desc:"Tu d\u00e9couvres les langues"},
      {threshold:700,name:"Polyglotte",emoji:"\u{1F454}",desc:"Tu parles plusieurs langues"},
      {threshold:1500,name:"Sage des Mots",emoji:"\u{1F454}\u2728",desc:"Ma\u00eetre des langues"}
    ],
    companions:[
      {id:"aleph",name:"Alephion",emoji:"\u{1F1EE}\u{1F1F1}",elem:"H\u00e9breu",threshold:10},
      {id:"abc",name:"Abecedo",emoji:"\u{1F1EB}\u{1F1F7}",elem:"Fran\u00e7ais",threshold:25},
      {id:"abc-en",name:"Globlette",emoji:"\u{1F1EC}\u{1F1E7}",elem:"Anglais bonus",threshold:50}
    ]
  },
  poesie:{
    id:"poesie",name:"Royaume de la Plume",color:"#a78bfa",bgGradient:"linear-gradient(135deg,#ede9fe,#c4b5fd,#a78bfa)",
    stages:[
      {threshold:0,name:"Plume vierge",emoji:"\u{1FAB6}",desc:"Une plume t'attend..."},
      {threshold:100,name:"Apprenti Po\u00e8te",emoji:"\u270D\uFE0F",desc:"Premi\u00e8res rimes !"},
      {threshold:300,name:"Conteur",emoji:"\u{1F3AD}",desc:"Tu r\u00e9cites avec brio"},
      {threshold:700,name:"Po\u00e8te",emoji:"\u{1F3AD}\u{1F4DC}",desc:"Tes vers enchantent"},
      {threshold:1500,name:"Ma\u00eetre Po\u00e8te",emoji:"\u{1F3AD}\u2728",desc:"\u00c9gal des plus grands"}
    ],
    companions:[
      {id:"corbeau",name:"Corbinou",emoji:"\u{1F426}",elem:"Le Corbeau",threshold:10},
      {id:"renard",name:"Goupil",emoji:"\u{1F98A}",elem:"Le Renard",threshold:25},
      {id:"lievre",name:"Lapidou",emoji:"\u{1F407}",elem:"Le Li\u00e8vre",threshold:50},
      {id:"lion",name:"Royal",emoji:"\u{1F981}",elem:"Le Lion",threshold:100},
      {id:"phoenix",name:"Ph\u00e9nix",emoji:"\u{1F985}",elem:"L\u00e9gende",threshold:200}
    ]
  }
};

// Helper : trouver le royaume d'un sujet ou d'un niveau
function getRoyaumeId(subjectOrLvId){
  if(ROYAUMES[subjectOrLvId])return subjectOrLvId;
  // Trouver via SUBJECTS
  const s=SUBJECTS.find(x=>x.id===subjectOrLvId);
  if(s)return s.id;
  // Trouver via niveau (chercher dans quelle subject est ce niveau)
  for(const subj of SUBJECTS){
    if(subj.levels&&subj.levels.find(l=>l.id===subjectOrLvId))return subj.id;
  }
  return 'maths';
}

function getRoyaumeData(rid){
  if(!profile.royaumes)profile.royaumes={};
  if(!profile.royaumes[rid])profile.royaumes[rid]={xp:0,cristaux:0,games:0,questions:0,correct:0,bestStreak:0,companions:[]};
  return profile.royaumes[rid];
}

function getStageInRoyaume(rid){
  const data=getRoyaumeData(rid);
  const stages=ROYAUMES[rid].stages;
  let idx=0;
  for(let i=0;i<stages.length;i++) if(data.xp>=stages[i].threshold) idx=i;
  return {idx,stage:stages[idx],next:idx<stages.length-1?stages[idx+1]:null};
}

// Ancien système gardé pour compat (totaux globaux)
const STAGES=ROYAUMES.maths.stages;
const DRAGONNETS=ROYAUMES.maths.companions;

/* ════════ QUÊTES JOURNANIÈRES ════════ */
const QUEST_TEMPLATES=[
{id:"q_correct5",desc:"R\u00e9ussis 5 bonnes r\u00e9ponses aujourd'hui",target:5,type:"correct",reward:50},
{id:"q_streak3",desc:"Fais une s\u00e9rie de 3 bonnes r\u00e9ponses",target:3,type:"streak",reward:30},
{id:"q_streak5",desc:"Fais une s\u00e9rie de 5 bonnes r\u00e9ponses",target:5,type:"streak",reward:60},
{id:"q_games2",desc:"Termine 2 parties aujourd'hui",target:2,type:"games",reward:40},
{id:"q_perfect",desc:"Obtiens 100% \u00e0 une partie",target:1,type:"perfect",reward:80},
{id:"q_correct10",desc:"R\u00e9ussis 10 bonnes r\u00e9ponses aujourd'hui",target:10,type:"correct",reward:100}
];

/* ════════ STATE + PERSISTENCE — MULTI-PROFIL ════════ */
const STORAGE_KEY="royaume_v3";          // legacy single-profile slot (read-only fallback)
const STORAGE_PROFILES="royaume_profiles_v1";  // dict { [name]: profileData }
const STORAGE_ACTIVE="royaume_active_v1";      // last-active profile name

function loadProfilesDict(){
  try{const d=localStorage.getItem(STORAGE_PROFILES); if(d) return JSON.parse(d)}catch(e){}
  return {};
}
function saveProfilesDict(d){localStorage.setItem(STORAGE_PROFILES,JSON.stringify(d))}
function getActiveName(){return localStorage.getItem(STORAGE_ACTIVE)||''}
function setActiveName(n){localStorage.setItem(STORAGE_ACTIVE,n||'')}

// One-time migration : si l'ancien profil unique existe et que le dict est vide,
// on l'enregistre dans le dict sous son propre nom (et il devient actif).
function migrateLegacyProfile(){
  const dict=loadProfilesDict();
  if(Object.keys(dict).length>0) return;
  try{
    const legacy=localStorage.getItem(STORAGE_KEY);
    if(!legacy) return;
    const p=JSON.parse(legacy);
    if(!p||!p.name) return;
    dict[p.name]=p;
    saveProfilesDict(dict);
    setActiveName(p.name);
  }catch(e){}
}

function newProfile(){
  return {name:"",totalGames:0,totalQuestions:0,totalCorrect:0,bestStreak:0,sessions:[],catStats:{},exerciseStats:{},playDays:[],unlockedBadges:[],
    xp:0,cristaux:0,dragonnets:[],mainDragon:"main",stage:0,
    dailyQuest:null,aiExercises:[]};
}
function migrate(p){
  const base=newProfile();
  return Object.assign(base,p);
}

// Charge le profil actif (s'il existe) ou retourne un profil vide.
// Utilisé quand l'utilisateur clique sur un profil dans le picker.
function loadProfileByName(name){
  const dict=loadProfilesDict();
  if(name&&dict[name]) return migrate(dict[name]);
  return newProfile();
}

// Sauvegarde le profil courant dans le dict (clé = profile.name) ET dans
// le STORAGE_KEY legacy pour compatibilité ascendante.
function saveProfile(){
  if(!profile.name) return;
  const dict=loadProfilesDict();
  dict[profile.name]=profile;
  saveProfilesDict(dict);
  setActiveName(profile.name);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(profile))}catch(e){}
}

migrateLegacyProfile();
// Au boot on n'auto-charge AUCUN profil : l'utilisateur doit toujours choisir
// dans le picker (à chaque ouverture). Ça évite d'écraser un profil
// par accident quand plusieurs personnes utilisent l'app sur le même appareil.
let profile=newProfile();
let state={screen:'home',level:null,mode:null,exercises:[],idx:0,selected:null,score:0,streak:0,maxStreak:0,results:[],timer:60,timerID:null,gameOver:false,startTime:null,gameData:null,detailOpen:false,sessionXP:0,sessionCristaux:0,aiExercises:[],generating:false,syncing:false};

const $=id=>document.getElementById(id);
const app=$('app');
const backArrow=$('backArrow');

/* ════════ HTML escaping (XSS protection) ════════ */
const _ESC_MAP={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','`':'&#x60;'};
function esc(s){return s==null?'':String(s).replace(/[&<>"'`]/g,c=>_ESC_MAP[c])}
// Light sanitizer for values used inside attribute single-quoted JS calls (rare)
function escAttr(s){return esc(s).replace(/\\/g,'\\\\')}

function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function today(){return new Date().toISOString().slice(0,10)}

/* ════════ BACKEND API (sync sécurisé via AID + AI generation) ════════ */
const API_BASE="https://royaume-api.square-paris75.workers.dev";

// AID = identifiant unique aléatoire (32 hex), généré et stocké localement.
// Sert de "clé secrète" pour le profil. Impossible à deviner.
function getAid(){
  let aid=localStorage.getItem('royaume_aid');
  if(!aid){
    // Génère UUID v4 sans tirets = 32 chars hex
    aid=(crypto.randomUUID?crypto.randomUUID():'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return (c==='x'?r:(r&0x3|0x8)).toString(16)})).replace(/-/g,'');
    localStorage.setItem('royaume_aid',aid);
  }
  return aid;
}

// Au chargement : si URL contient ?sync=AID, on remplace l'AID local (transfert depuis autre appareil)
(function checkSyncLink(){
  const params=new URLSearchParams(window.location.search);
  const incoming=params.get('sync');
  if(incoming&&/^[a-f0-9]{32}$/.test(incoming)){
    const current=localStorage.getItem('royaume_aid');
    if(current!==incoming){
      if(confirm('Tu vas récupérer le Royaume d\'un autre appareil. Cela remplacera tes données locales. Continuer ?')){
        localStorage.setItem('royaume_aid',incoming);
        // Vide les données locales pour forcer la récup depuis le cloud
        localStorage.removeItem('royaume_v3');
      }
    }
    // Nettoie l'URL
    window.history.replaceState({},'',window.location.pathname);
  }
})();

const AID=getAid();

async function syncProfileFromCloud(){
  try{
    const r=await fetch(API_BASE+'/profile/'+AID);
    if(!r.ok) return null;
    const txt=await r.text();
    if(txt==='null'||!txt) return null;
    const remote=JSON.parse(txt);
    if(remote.totalGames>profile.totalGames){
      profile=migrate(remote);
      _localSave();
      return 'restored';
    }
    return 'local_newer';
  }catch(e){return null}
}

async function pushProfileToCloud(){
  if(!profile.name) return;
  try{
    await fetch(API_BASE+'/profile/'+AID,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(profile)
    });
  }catch(e){}
}

function getSyncLink(){
  return window.location.origin+window.location.pathname+'?sync='+AID;
}

async function generateAIExercises(level,count){
  state.generating=true;
  const ctrl=new AbortController();
  const timeoutMs=25000;
  const tid=setTimeout(()=>ctrl.abort(),timeoutMs);
  try{
    const r=await fetch(API_BASE+'/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({level,count}),
      signal:ctrl.signal
    });
    clearTimeout(tid);
    if(!r.ok){
      let body='';
      try{body=(await r.text()).slice(0,300)}catch(_){}
      throw new Error('HTTP '+r.status+(body?' — '+body:''));
    }
    const data=await r.json();
    if(data.error) throw new Error(data.error.message||'API error');
    if(!Array.isArray(data.exercises)||data.exercises.length===0){
      throw new Error('Réponse vide (exercises absent ou []) — niveau "'+level+'" non supporté par le Worker ?');
    }
    // Persiste dans le profil pour cross-device + sessions futures
    if(!profile.aiExercises) profile.aiExercises=[];
    profile.aiExercises=profile.aiExercises.concat(data.exercises);
    // Limité à 200 max pour éviter explosion de taille
    if(profile.aiExercises.length>200) profile.aiExercises=profile.aiExercises.slice(-200);
    saveProfile();
    state.generating=false;
    return data.exercises;
  }catch(e){
    clearTimeout(tid);
    state.generating=false;
    if(e.name==='AbortError') throw new Error('Timeout après '+(timeoutMs/1000)+'s — le Worker IA n\'a pas répondu');
    throw e;
  }
}

// Auto-génération en arrière-plan (fire & forget) si pool insuffisant
function maybeAutoGenerate(level){
  const pool=EX.filter(e=>e.lv===level);
  const aiPool=(profile.aiExercises||[]).filter(e=>e.lv===level);
  // Compte les exos jamais vus
  const allPool=[...pool,...aiPool];
  const unseen=allPool.filter(e=>!profile.exerciseStats[e.id]||!profile.exerciseStats[e.id].att);
  // Si moins de 15 exos jamais vus → génère 10 nouveaux en arrière-plan
  if(unseen.length<5){
    generateAIExercises(level,10).catch(e=>console.warn('auto-gen failed',e));
  }
}

// Override saveProfile to push to cloud (debounced)
let _syncTimer=null;
const _localSave=saveProfile;
saveProfile=function(){
  _localSave();
  if(_syncTimer) clearTimeout(_syncTimer);
  _syncTimer=setTimeout(()=>pushProfileToCloud(),1000);
};

/* ════════ EMBERS ════════ */
setInterval(()=>{
  const e=document.createElement('div');
  e.className='ember';
  e.style.left=Math.random()*100+'%';
  e.style.bottom=(70+Math.random()*30)+'%';
  e.style.animationDelay=Math.random()*2+'s';
  $('embers').appendChild(e);
  setTimeout(()=>e.remove(),2500);
},500);

/* ════════ NAVIGATION ════════ */
$('headerHome').onclick=()=>navigate('home');
function navigate(screen,data){
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  state.screen=screen;
  if(data) Object.assign(state,data);
  backArrow.classList.toggle('hidden',screen==='home');
  render();
  window.scrollTo(0,0);
}

function render(){
  switch(state.screen){
    case 'home': renderHome(); break;
    case 'subject': renderSubject(); break;
    case 'mode': renderMode(); break;
    case 'game': renderGame(); break;
    case 'results': renderResults(); break;
    case 'royaume': renderRoyaume(); break;
    case 'parent': renderParent(); break;
    case 'nameAsk': renderNameAsk(); break;
    case 'profilePicker': renderProfilePicker(); break;
    case 'collection': renderCollection(); break;
    case 'fichesHome': renderFichesHome(); break;
    case 'fichesSubject': renderFichesSubject(); break;
    case 'fichesTopics': renderFichesTopics(); break;
    case 'fichesView': renderFichesView(); break;
    case 'poesieHome': renderPoesieHome(); break;
    case 'poesieFable': renderPoesieFable(); break;
  }
}

/* ════════ STAGE DRAGONNET ════════ */
function getCurrentStage(){
  let idx=0;
  for(let i=0;i<STAGES.length;i++){
    if(profile.xp>=STAGES[i].threshold) idx=i;
  }
  return idx;
}
function getNextStage(){
  const cur=getCurrentStage();
  return cur<STAGES.length-1?STAGES[cur+1]:null;
}

function checkDailyQuest(){
  const td=today();
  if(!profile.dailyQuest || profile.dailyQuest.date!==td){
    const tpl=QUEST_TEMPLATES[Math.floor(Math.random()*QUEST_TEMPLATES.length)];
    profile.dailyQuest={date:td,...tpl,progress:0,done:false};
    saveProfile();
  }
}

/* ════════ HOME ════════ */
function renderHome(){
  if(!profile.name){
    // Pas de profil actif : si au moins un profil existe localement,
    // on affiche le picker. Sinon on demande le prénom directement.
    const dict=loadProfilesDict();
    navigate(Object.keys(dict).length>0?'profilePicker':'nameAsk');
    return;
  }
  checkDailyQuest();
  // Total des XP de tous les royaumes
  const totalXp=Object.values(profile.royaumes||{}).reduce((s,r)=>s+(r.xp||0),0)+(profile.xp||0);
  const totalCristaux=Object.values(profile.royaumes||{}).reduce((s,r)=>s+(r.cristaux||0),0)+(profile.cristaux||0);
  let questHTML='';
  if(profile.dailyQuest){
    const q=profile.dailyQuest;
    questHTML=`<div class="quest-card">
      <div class="quest-title">\u{1F3AF} Qu\u00eate du jour</div>
      <div class="quest-desc">${q.desc}</div>
      <div class="row-between">
        <div class="quest-progress ${q.done?'quest-done':''}">${q.done?'\u2705 R\u00e9ussie !':'Progression : '+q.progress+'/'+q.target}</div>
        <div class="quest-progress">\u{1F48E} +${q.reward}</div>
      </div>
    </div>`;
  }
  app.innerHTML=`
    <div class="text-center fade-in mb-4 py-4">
      <h2 class="title" style="font-size:clamp(1.4rem,4vw,2rem)">\u{1F44B} Salut ${esc(profile.name)} !</h2>
      <p style="color:#7a5a3a;font-size:1rem">Bienvenue dans tes Royaumes</p>
      <div class="resources-row">
        <div class="resource flame">\u{1F525} ${profile.totalGames||0} parties</div>
        <div class="resource crystal">\u{1F48E} ${totalCristaux}</div>
        <div class="resource xp">\u2728 ${totalXp} XP total</div>
      </div>
    </div>
    ${questHTML}
    ${SUBJECTS.map((s,i)=>{
      const rid=s.id;
      const r=ROYAUMES[rid];
      if(!r){
        const target=s.isPoetry?"navigate('poesieHome')":"navigate('subject',{subjectId:'"+s.id+"'})";
        return `<div class="subject-card fade-in" style="border-color:${s.color};animation-delay:${i*.08}s" onclick="${target}"><div class="subject-emoji bounce">${s.icon}</div><div class="subject-info"><h3 class="subject-name" style="color:${s.color}">${s.name}</h3><p class="subject-desc">${s.desc}</p></div><div class="arrow">\u2192</div></div>`;
      }
      const data=getRoyaumeData(rid);
      const st=getStageInRoyaume(rid);
      const xpBar=st.next?Math.round((data.xp-st.stage.threshold)/(st.next.threshold-st.stage.threshold)*100):100;
      const target=s.isPoetry?"navigate('poesieHome')":"navigate('subject',{subjectId:'"+s.id+"'})";
      return `<div class="card clickable fade-in" style="animation-delay:${i*.08}s;border-color:${r.color};background:${r.bgGradient};padding:18px" onclick="${target}">
        <div class="row" style="gap:16px">
          <div style="font-size:3.2rem;flex-shrink:0;filter:drop-shadow(0 4px 8px rgba(0,0,0,.1))">${st.stage.emoji}</div>
          <div class="flex-1">
            <h3 class="card-title" style="color:#2d2018;font-size:1.15rem">${r.name}</h3>
            <p class="sub" style="color:#5a4830;font-weight:600">${st.stage.name}</p>
            <div class="xp-bar-track" style="margin-top:8px;background:rgba(255,255,255,.5)"><div class="xp-bar-fill" style="width:${xpBar}%"></div></div>
            <p style="font-size:.7rem;color:#7a5a3a;margin-top:4px;font-weight:600">${data.xp} XP \u2022 \u{1F48E} ${data.cristaux} \u2022 ${data.games} parties</p>
          </div>
          <div class="arrow">\u2192</div>
        </div>
      </div>`;
    }).join('')}
    <div class="subject-card fade-in" style="border-color:#fbbf24;background:linear-gradient(135deg,#fef9f3,#fff5e6)" onclick="navigate('fichesHome')">
      <div class="subject-emoji bounce">\u{1F4D6}</div>
      <div class="subject-info">
        <h3 class="subject-name" style="color:#7a3f04">Fiches bilan</h3>
        <p class="subject-desc">R\u00e9visions par th\u00e8me, g\u00e9n\u00e9r\u00e9es par IA</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
    <div class="btn-row mt-4">
      <button class="btn-stone" onclick="navigate('royaume')">\u2728 Vue d'ensemble</button>
      <button class="btn-stone" onclick="navigate('parent')">\u{1F464} Espace Parent</button>
    </div>
    <button class="btn-stone mt-3" style="width:100%;font-size:.85rem" onclick="navigate('profilePicker')">\u{1F504} Changer d'utilisateur</button>
  `;
}

function renderSubject(){
  const s=SUBJECTS.find(x=>x.id===state.subjectId)||SUBJECTS[0];
  if(s.isPoetry){navigate('poesieHome');return}
  const visibleLevels=(s.levels||[]).filter(l=>!l.secret||profile.name.toLowerCase()==='joseph');
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3.5rem">${s.icon}</div>
    <h2 class="title" style="color:${s.color};font-size:1.6rem">${s.name}</h2>
    <p class="sub">${s.desc}</p>
  </div>
  ${visibleLevels.map((lv,i)=>`<div class="card clickable fade-in" style="animation-delay:${i*.06}s;border-color:${lv.color}" onclick="navigate('mode',{level:'${lv.id}'})">
    <div class="row">
      <div style="font-size:2.2rem">${lv.icon}</div>
      <div class="flex-1">
        <h3 class="card-title" style="color:${lv.color}">${lv.name}${lv.secret?' \u{1F510}':''}</h3>
        <p class="sub">${lv.sub||''}</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
  </div>`).join('')}
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}

function renderNameAsk(){
  const dict=loadProfilesDict();
  const hasOthers=Object.keys(dict).length>0;
  app.innerHTML=`<div class="card fade-in" style="margin-top:40px">
    <h2 class="title" style="color:#7a3f04;font-size:1.3rem">${hasOthers?'Nouvel utilisateur':'Comment t\'appelles-tu ?'}</h2>
    <p style="color:#2d2018;margin-bottom:16px">Ton pr\u00e9nom sera affich\u00e9 dans ton Royaume.</p>
    <input class="name-prompt" id="nameInp" placeholder="Ton pr\u00e9nom" maxlength="20" value="${esc(profile.name||'')}">
    <button class="btn-fire" onclick="setName()">Entrer dans le Royaume \u2192</button>
    ${hasOthers?`<button class="btn-stone mt-3" style="width:100%" onclick="navigate(\u0027profilePicker\u0027)">\u2190 Choisir un profil existant</button>`:''}
  </div>`;
  setTimeout(()=>$('nameInp').focus(),100);
}
async function setName(){
  // Strip HTML/control chars to keep the profile name display-safe everywhere.
  const v=$('nameInp').value.replace(/[<>"'`\\\/]/g,'').replace(/[ -]/g,'').trim().slice(0,20);
  if(v.length<1){alert('Entre ton pr\u00e9nom');return}
  // Si ce nom existe d\u00e9j\u00e0 dans le dict, on charge ce profil (pas d\u0027\u00e9crasement).
  const dict=loadProfilesDict();
  if(dict[v]){
    profile=migrate(dict[v]);
  }else{
    profile=newProfile();
    profile.name=v;
  }
  saveProfile();
  navigate('home');
}

/* ════════ PROFILE PICKER ════════ */
function renderProfilePicker(){
  const dict=loadProfilesDict();
  const names=Object.keys(dict).sort((a,b)=>{
    const active=getActiveName();
    if(a===active) return -1;
    if(b===active) return 1;
    const xa=(dict[a].xp||0)+Object.values(dict[a].royaumes||{}).reduce((s,r)=>s+(r.xp||0),0);
    const xb=(dict[b].xp||0)+Object.values(dict[b].royaumes||{}).reduce((s,r)=>s+(r.xp||0),0);
    return xb-xa;
  });
  const cards=names.map((n,i)=>{
    const p=dict[n];
    const xp=(p.xp||0)+Object.values(p.royaumes||{}).reduce((s,r)=>s+(r.xp||0),0);
    const cris=(p.cristaux||0)+Object.values(p.royaumes||{}).reduce((s,r)=>s+(r.cristaux||0),0);
    const games=p.totalGames||0;
    const safeName=esc(n).replace(/'/g,'&#x27;');
    return '<div class="card clickable fade-in" style="animation-delay:'+(i*.06)+'s;border-color:#f7a020" onclick="switchProfile(\u0027'+safeName+'\u0027)"><div class="row"><div style="font-size:2.5rem;flex-shrink:0">\u{1F409}</div><div class="flex-1" style="min-width:0"><h3 class="card-title" style="color:#7a3f04">'+esc(n)+'</h3><p class="sub">\u2728 '+xp+' XP \u2022 \u{1F48E} '+cris+' \u2022 '+games+' parties</p></div><div class="arrow">\u2192</div></div></div>';
  }).join('');
  const deleteBtns=names.map(n=>{
    const safeName=esc(n).replace(/'/g,'&#x27;');
    return '<button class="btn-stone btn-small" style="margin:4px;font-size:.7rem" onclick="deleteProfile(\u0027'+safeName+'\u0027)">\u{1F5D1}\uFE0F '+esc(n)+'</button>';
  }).join('');
  app.innerHTML='<div class="text-center py-6 fade-in"><div style="font-size:3.5rem">\u{1F44B}</div><h2 class="title" style="color:#7a3f04;font-size:1.5rem">Qui joue aujourd\u0027hui ?</h2><p class="sub">Choisis ton profil ou cr\u00e9es-en un nouveau</p></div>'+cards+'<div class="card clickable fade-in" style="border-color:#22c55e;background:linear-gradient(135deg,#dcfce7,#bbf7d0)" onclick="addNewProfile()"><div class="row"><div style="font-size:2.5rem;flex-shrink:0">\u2795</div><div class="flex-1"><h3 class="card-title" style="color:#15803d">Nouvel utilisateur</h3><p class="sub" style="color:#166534">Cr\u00e9er un nouveau profil</p></div></div></div>'+(names.length>0?'<details style="margin-top:24px"><summary style="color:#7a5a3a;font-size:.85rem;cursor:pointer;text-align:center">Supprimer un profil</summary><div style="margin-top:12px;text-align:center">'+deleteBtns+'</div></details>':'');
}

function switchProfile(name){
  profile=loadProfileByName(name);
  setActiveName(name);
  navigate('home');
}

function addNewProfile(){
  profile=newProfile();
  navigate('nameAsk');
}

function deleteProfile(name){
  if(!confirm('Supprimer le profil "'+name+'" ? Cette action est d\u00e9finitive.')) return;
  const dict=loadProfilesDict();
  delete dict[name];
  saveProfilesDict(dict);
  if(getActiveName()===name) setActiveName('');
  if(profile.name===name) profile=newProfile();
  const remaining=Object.keys(dict);
  navigate(remaining.length>0?'profilePicker':'nameAsk');
}

// Le sync cloud automatique au boot est désactivé en multi-profil :
// avec un AID unique par appareil et plusieurs profils locaux, le sync
// auto fusionnerait les profils. Le sync reste accessible manuellement
// via l'URL ?sync=AID. À refaire proprement avec un AID par profil.

/* ════════ MODE SELECT ════════ */
function renderMode(){
  const lv=LEVELS.find(l=>l.id===state.level);
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem;margin-bottom:12px">${lv.icon}</div>
    <h2 class="title" style="color:${lv.color};font-size:1.5rem">${lv.name}</h2>
    <p class="sub">${lv.sub} \u2014 Choisis ton mode</p>
  </div>${MODES.map((m,i)=>`<div class="card clickable fade-in" style="animation-delay:${i*.1}s" onclick="startGame('${m.id}')">
    <div class="row"><div class="mode-icon">${m.icon}</div><div class="flex-1">
      <h3 class="card-title" style="color:#7a3f04">${m.name}</h3>
      <p class="sub">${m.desc}</p></div></div></div>`).join('')}
  <div class="card mb-4" style="border-color:#c4b5fd;background:linear-gradient(145deg,rgba(139,92,246,.1),rgba(59,130,246,.1))">
    <h3 class="fredoka" style="color:#c4b5fd;font-size:.85rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">\u{1F52E} Forge du Dragon (IA)</h3>
    <p style="color:#2d2018;font-size:.85rem;margin-bottom:6px">Le Dragon forge automatiquement de nouveaux d\u00e9fis quand tu en as besoin. Tu en as actuellement <strong style="color:#c4b5fd">${(profile.aiExercises||[]).filter(e=>e.lv===state.level).length} exercices IA</strong> disponibles pour ce niveau.</p>
    <p style="color:#9c6f3a;font-size:.75rem;margin-bottom:10px;font-style:italic">\u{1F4A1} Astuce : les exos AI ont des nombres et des sc\u00e9narios diff\u00e9rents \u00e0 chaque g\u00e9n\u00e9ration.</p>
    <button class="btn-stone btn-small" onclick="reqGen('${state.level}',10)" id="genBtn">\u{1F525} Forger 10 nouveaux d\u00e9fis maintenant</button>
    <div id="genStatus" style="margin-top:8px;font-size:.8rem;color:#93c5fd"></div>
  </div>
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}

async function reqGen(lvId,n){
  const btn=$('genBtn');const st=$('genStatus');
  if(state.generating){st.textContent='G\u00e9n\u00e9ration en cours...';return}
  if(btn){btn.disabled=true;btn.textContent='\u23F3 G\u00e9n\u00e9ration en cours (5-15s)...'}
  if(st){st.textContent='Le Dragon r\u00e9fl\u00e9chit \u2728...'}
  try{
    const exos=await generateAIExercises(lvId,n);
    if(st){st.innerHTML='\u2705 <strong>'+exos.length+' nouveaux exercices</strong> ajout\u00e9s ! Lance n\'importe quel mode pour les d\u00e9couvrir.'}
    if(btn){btn.textContent='\u{1F525} G\u00e9n\u00e9rer 10 de plus';btn.disabled=false}
  }catch(e){
    if(st){st.innerHTML='\u274C Erreur : '+esc(e.message)}
    if(btn){btn.textContent='\u{1F525} R\u00e9essayer';btn.disabled=false}
  }
}

/* ════════ ROTATION INTELLIGENTE ════════ */
function pickExercises(mode,lvId){
  const lv=LEVELS.find(l=>l.id===lvId);
  const hasStatic=lv&&lv.hasStatic;
  // Inclure les exercices AI générés (persistés dans le profil)
  const aiPool=(profile.aiExercises||[]).filter(e=>e.lv===lvId);
  const staticPool=hasStatic?EX.filter(e=>e.lv===lvId):[];
  const pool=staticPool.concat(aiPool);
  if(mode==='progression'){
    return shuffle(EX.filter(e=>e.lv!=='cp')).sort((a,b)=>a.diff-b.diff).slice(0,10);
  }
  if(mode==='adaptive'){
    // Priorise les exercices rat\u00e9s ou jamais vus
    return pool.slice().sort((a,b)=>{
      const sa=profile.exerciseStats[a.id]||{att:0,cor:0};
      const sb=profile.exerciseStats[b.id]||{att:0,cor:0};
      const scA=sa.att>0?sa.cor/sa.att:0.5;
      const scB=sb.att>0?sb.cor/sb.att:0.5;
      return scA-scB;
    }).slice(0,10);
  }
  // Training / Challenge : rotation intelligente
  // S\u00e9pare : jamais vus vs d\u00e9j\u00e0 vus
  const unseen=pool.filter(e=>!profile.exerciseStats[e.id]||!profile.exerciseStats[e.id].att);
  const seen=pool.filter(e=>profile.exerciseStats[e.id]&&profile.exerciseStats[e.id].att);
  // Trie les vus par date (plus anciens d'abord)
  seen.sort((a,b)=>{
    const la=profile.exerciseStats[a.id].lastSeen||'';
    const lb=profile.exerciseStats[b.id].lastSeen||'';
    return la.localeCompare(lb);
  });
  // Priorit\u00e9 aux jamais vus, puis les plus anciens
  let candidates=shuffle(unseen);
  if(candidates.length<10) candidates=candidates.concat(seen.slice(0,10-candidates.length));
  return candidates.slice(0,10);
}

async function startGame(mode){
  let exercises=pickExercises(mode,state.level);
  // FALLBACK ULTIME : si pour une raison quelconque (niveau non couvert,
  // bug futur, etc.) il n'y a aucun exo, on tire 10 exos au hasard de
  // tout EX. L'utilisateur ne reste JAMAIS sans rien à jouer.
  if(exercises.length===0) exercises=shuffle(EX).slice(0,10);
  state.mode=mode;state.exercises=exercises;state.idx=0;state.selected=null;state.score=0;state.streak=0;state.maxStreak=0;state.results=[];state.timer=60;state.gameOver=false;state.startTime=Date.now();state.detailOpen=false;state.sessionXP=0;state.sessionCristaux=0;
  if(state.level&&state.level!=='cp') maybeAutoGenerate(state.level);
  navigate('game');
}

/* ════════ GAME SCREEN ════════ */
function renderGame(){
  const ex=state.exercises[state.idx];
  if(!ex) return finishGame();
  const total=state.exercises.length;
  const pct=(state.idx/total)*100;
  const lv=LEVELS.find(l=>l.id===ex.lv);
  let timerHTML='';
  if(state.mode==='challenge'&&state.selected===null&&!state.gameOver){
    const tc=state.timer>30?'#22c55e':state.timer>10?'#f7a020':'#ef4444';
    const tp=(state.timer/60)*100;
    timerHTML=`<div class="mb-4"><div class="row-between" style="font-size:.85rem;margin-bottom:4px"><span class="fredoka" style="color:#7a5a3a">Temps restant</span><span class="fredoka" style="font-weight:700;color:${tc}">${state.timer}s</span></div><div class="timer-track"><div class="timer-fill" style="width:${tp}%;background:${tc}"></div></div></div>`;
  }
  const streakHTML=state.streak>=2?`<span style="color:#f7a020">\u{1F525} ${state.streak}</span>`:'';
  const levelBadge=state.mode==='progression'?`<span class="badge" style="background:${lv.color}22;color:${lv.color};border-color:${lv.color}44;margin-left:6px">${esc(lv.sub)}</span>`:'';
  app.innerHTML=`<div style="margin:8px 0"><div class="row-between cinzel" style="font-size:.75rem;color:#9c6f3a;margin-bottom:4px">
    <span>Question ${state.idx+1}/${total}</span>
    <span>Score : ${state.score}/${state.idx+(state.selected!==null?1:0)}</span>
    ${streakHTML}</div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div></div>
  ${timerHTML}
  <div class="card fade-in mt-3">
    <div class="row gap-2 mb-4" style="flex-wrap:wrap">
      <span class="badge">${esc(ex.cat)}</span>
      <span class="stars">${'\u2605'.repeat(ex.diff)}${'\u2606'.repeat(5-ex.diff)}</span>
      ${levelBadge}
    </div>
    <p style="font-size:clamp(1rem,2.5vw,1.2rem);color:#2d2018;line-height:1.7;margin-bottom:24px">${esc(ex.q)}</p>
    <div class="choices-grid">
      ${ex.ch.map((c,i)=>{let cls='choice-btn';if(state.selected!==null){if(i===ex.ans)cls+=' correct';else if(i===state.selected&&i!==ex.ans)cls+=' wrong'}return `<button class="${cls}" ${state.selected!==null?'disabled':''} onclick="selectAnswer(${i})"><span class="choice-letter">${String.fromCharCode(65+i)}.</span>${esc(c)}</button>`}).join('')}
    </div>
    <div id="explanation"></div>
  </div>
  ${state.selected===null?`<button class="btn-stone mt-3" onclick="finishGame(true)">Abandonner la qu\u00eate</button>`:''}`;
  if(state.mode==='challenge'&&state.selected===null&&!state.gameOver){
    if(state.timerID)clearInterval(state.timerID);
    state.timerID=setInterval(()=>{
      state.timer--;
      if(state.timer<=0){clearInterval(state.timerID);state.timerID=null;selectAnswer(-1)}
      else{
        const tc=state.timer>30?'#22c55e':state.timer>10?'#f7a020':'#ef4444';
        const tp=(state.timer/60)*100;
        const tEl=document.querySelector('.timer-fill');
        const tTxt=document.querySelector('.timer-track')?.parentElement?.querySelector('span:last-child');
        if(tEl){tEl.style.width=tp+'%';tEl.style.background=tc}
        if(tTxt){tTxt.style.color=tc;tTxt.textContent=state.timer+'s'}
      }
    },1000);
  }
}

function selectAnswer(i){
  if(state.selected!==null||state.gameOver) return;
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  state.selected=i;
  const ex=state.exercises[state.idx];
  const correct=i===ex.ans;
  state.results.push({ex,choice:i,correct});
  if(correct){
    state.score++;
    state.streak++;
    if(state.streak>state.maxStreak)state.maxStreak=state.streak;
    // XP : difficult\u00e9 \u00d7 10 \u00d7 multiplicateur s\u00e9rie
    const mult=state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1;
    const xpGained=Math.round(ex.diff*10*mult);
    const crGained=ex.diff*2+(state.streak===3||state.streak===5||state.streak===10?10:0);
    state.sessionXP+=xpGained;
    state.sessionCristaux+=crGained;
  }else{
    state.streak=0;
    if(state.mode==='progression')state.gameOver=true;
  }
  renderGame();
  showExplanation(ex,correct);
}

function showExplanation(ex,correct){
  const el=$('explanation');
  if(!el) return;
  const methodeHTML=(ex.methode||[]).map(m=>`<div class="pedago-step">${esc(m)}</div>`).join('');
  const gainHTML=correct?`<span class="xp-gain">+${Math.round(ex.diff*10*(state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1))} XP</span> <span class="crystal-gain">\u{1F48E} +${ex.diff*2}</span>`:'';
  el.innerHTML=`<div class="card fade-in mt-6">
    <div class="row gap-2 mb-2"><span style="font-size:1.5rem">${correct?'\u2705':'\u274C'}</span>
    <h4 class="fredoka" style="font-size:1.1rem;font-weight:700;color:${correct?'#15803d':'#b91c1c'};margin:0">${correct?'Excellent, sorci\u00e8re !':'Pas cette fois\u2026'}</h4>
    ${gainHTML}</div>
    <p style="color:#2d2018;margin-bottom:12px;line-height:1.6;font-weight:600">${esc(ex.se)}</p>
    ${!correct?`<div class="error-box"><p style="font-size:.9rem;margin:0;line-height:1.5"><span class="error-label">\u{1F914} L'erreur probable : </span><span style="color:#2d2018">${esc(ex.pourquoi)}</span></p></div>`:''}
    <a class="detail-link mt-3" style="display:inline-block;margin-top:10px" onclick="toggleDetail()">${state.detailOpen?'Masquer':'Voir'} la m\u00e9thode pas \u00e0 pas \u2192</a>
    <div id="detailPanel" class="${state.detailOpen?'':'hidden'}">
      <div class="pedago-box">
        <div class="pedago-title">\u{1F4D0} M\u00e9thode du prof</div>
        ${methodeHTML}
      </div>
      <div class="tip-box">
        <p style="font-size:.9rem;margin:0;line-height:1.55"><span class="tip-label">\u{1F4A1} \u00c0 retenir : </span><span class="tip-text">${esc(ex.regle)}</span></p>
      </div>
      ${ex.exemple?`<div class="pedago-box" style="background:linear-gradient(135deg,#dbeafe,#bfdbfe);border-color:rgba(59,130,246,.35)"><div class="pedago-title" style="color:#1e40af">\u{1F4DA} Exemple similaire</div><p style="color:#1e3a8a;font-size:.9rem;line-height:1.55;margin:0">${esc(ex.exemple)}</p></div>`:''}
      <p style="font-size:.75rem;color:#7a3f04;margin-top:10px;font-weight:600">Comp\u00e9tence : ${esc(ex.sk)}</p>
    </div>
    <button class="btn-fire mt-6" onclick="nextQuestion()">Question suivante \u2192</button>
  </div>`;
}
function toggleDetail(){state.detailOpen=!state.detailOpen;const p=$('detailPanel');if(p)p.classList.toggle('hidden');const a=document.querySelector('.detail-link');if(a)a.textContent=(state.detailOpen?'Masquer':'Voir')+' la m\u00e9thode pas \u00e0 pas \u2192'}

function nextQuestion(){
  if(state.gameOver||state.idx>=state.exercises.length-1) return finishGame();
  state.idx++;state.selected=null;state.timer=60;state.detailOpen=false;
  navigate('game');
}

/* ════════ FINISH + PERSIST ════════ */
function finishGame(abandoned){
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  const total=abandoned?state.idx:state.results.length;
  const duration=Math.round((Date.now()-state.startTime)/1000);
  const d={score:state.score,total,maxStreak:state.maxStreak,results:state.results,mode:state.mode,abandoned:!!abandoned,duration,date:new Date().toISOString(),level:state.level,xp:state.sessionXP,cristaux:state.sessionCristaux};
  state.gameData=d;
  if(total>0){
    const oldStage=getCurrentStage();
    // Per-royaume stats
    const rid=getRoyaumeId(state.level);
    const rdata=getRoyaumeData(rid);
    const oldRStage=getStageInRoyaume(rid).idx;
    rdata.xp+=state.sessionXP;
    rdata.cristaux+=state.sessionCristaux;
    rdata.games++;
    rdata.questions+=total;
    rdata.correct+=state.score;
    if(state.maxStreak>(rdata.bestStreak||0))rdata.bestStreak=state.maxStreak;
    // Stats globales (rétrocompat)
    profile.totalGames++;
    profile.totalQuestions+=total;
    profile.totalCorrect+=state.score;
    if(state.maxStreak>profile.bestStreak)profile.bestStreak=state.maxStreak;
    profile.xp+=state.sessionXP;
    profile.cristaux+=state.sessionCristaux;
    // Compagnons débloqués pour ce royaume
    const royaume=ROYAUMES[rid];
    if(royaume){
      if(!rdata.companions)rdata.companions=[];
      const newComps=[];
      royaume.companions.forEach(c=>{
        if(rdata.correct>=c.threshold&&!rdata.companions.includes(c.id)){
          rdata.companions.push(c.id);
          newComps.push({...c,royaume:royaume.name});
        }
      });
      d.newRoyaumeCompanions=newComps;
      // Évolution dragon de ce royaume
      const newRStage=getStageInRoyaume(rid).idx;
      if(newRStage>oldRStage){
        d.royaumeEvolved=true;
        d.newRoyaumeStage=royaume.stages[newRStage];
        d.royaumeName=royaume.name;
      }
    }
    profile.sessions.push({date:d.date,level:state.level,mode:state.mode,score:state.score,total,duration,maxStreak:state.maxStreak,xp:state.sessionXP,cristaux:state.sessionCristaux});
    if(profile.sessions.length>100)profile.sessions=profile.sessions.slice(-100);
    const td=today();
    if(!profile.playDays.includes(td))profile.playDays.push(td);
    state.results.forEach(r=>{
      const cat=r.ex.cat;
      if(!profile.catStats[cat])profile.catStats[cat]={att:0,cor:0};
      profile.catStats[cat].att++;
      if(r.correct)profile.catStats[cat].cor++;
      const eid=r.ex.id;
      if(!profile.exerciseStats[eid])profile.exerciseStats[eid]={att:0,cor:0};
      profile.exerciseStats[eid].att++;
      if(r.correct)profile.exerciseStats[eid].cor++;
      profile.exerciseStats[eid].lastSeen=d.date;
    });
    // Badges
    const newBadges=[];
    BADGES.forEach(b=>{
      if(b.cond(profile)&&!profile.unlockedBadges.includes(b.id)){
        profile.unlockedBadges.push(b.id);
        newBadges.push(b);
      }
    });
    d.newBadges=newBadges;
    // Dragonnets d\u00e9bloqu\u00e9s
    const newDragonnets=[];
    DRAGONNETS.forEach(dg=>{
      if(profile.totalCorrect>=dg.threshold&&!profile.dragonnets.includes(dg.id)){
        profile.dragonnets.push(dg.id);
        newDragonnets.push(dg);
      }
    });
    d.newDragonnets=newDragonnets;
    // G\u00e9n\u00e9ration auto pour la prochaine session (en arri\u00e8re-plan)
    if(state.level&&state.level!=='cp'&&!abandoned) maybeAutoGenerate(state.level);
    // \u00c9volution dragon
    const newStage=getCurrentStage();
    d.evolved=newStage>oldStage;
    if(d.evolved){d.newStage=STAGES[newStage]}
    // Qu\u00eate du jour
    if(profile.dailyQuest&&!profile.dailyQuest.done){
      const q=profile.dailyQuest;
      if(q.type==='correct') q.progress+=state.score;
      if(q.type==='streak') q.progress=Math.max(q.progress,state.maxStreak);
      if(q.type==='games') q.progress+=1;
      if(q.type==='perfect'&&state.score===state.results.length&&state.results.length>=5) q.progress=1;
      if(q.progress>=q.target){q.done=true;profile.cristaux+=q.reward;d.questDone=true;d.questReward=q.reward}
    }
    saveProfile();
  }
  navigate('results');
}

/* ════════ RESULTS ════════ */
function renderResults(){
  const d=state.gameData;
  if(!d) return navigate('home');
  const pct=d.total>0?Math.round(d.score/d.total*100):0;
  let title,sub,emoji;
  if(d.abandoned){title="Qu\u00eate abandonn\u00e9e";sub="Le dragon attend toujours\u2026";emoji="\u{1F3C3}"}
  else if(pct===100){title="Perfection absolue !";sub="Tu es la Ma\u00eetresse incontest\u00e9e du Royaume !";emoji="\u{1F451}"}
  else if(pct>=80){title="Victoire glorieuse !";sub="Le dragon s'incline devant ta sagesse.";emoji="\u{1F409}"}
  else if(pct>=60){title="Bien jou\u00e9, chevali\u00e8re !";sub="Encore quelques sortil\u00e8ges \u00e0 ma\u00eetriser.";emoji="\u2694\uFE0F"}
  else if(pct>=40){title="Apprentie courageuse";sub="Le chemin du savoir est long mais tu progresses.";emoji="\u{1F9D9}"}
  else{title="Le dragon a vaincu\u2026";sub="R\u00e9vise tes sortil\u00e8ges et retente !";emoji="\u{1F525}"}

  // \u00c9volution
  let evolveHTML='';
  if(d.royaumeEvolved&&d.newRoyaumeStage){
    evolveHTML=`<div class="card fade-in" style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-color:#fbbf24;text-align:center">
      <div style="font-size:5rem" class="bounce">${d.newRoyaumeStage.emoji}</div>
      <h3 class="fredoka" style="color:#7a3f04;font-size:1.3rem;margin-top:8px">\u2728 \u00c9VOLUTION dans ${d.royaumeName} ! \u2728</h3>
      <p style="color:#451a03;margin-top:4px;font-weight:600">Ta mascotte est devenue <strong>${d.newRoyaumeStage.name}</strong> !</p>
      <p style="color:#7a3f04;font-size:.9rem;margin-top:4px">${d.newRoyaumeStage.desc}</p>
    </div>`;
  } else if(d.evolved&&d.newStage){
    evolveHTML=`<div class="card fade-in" style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-color:#fbbf24;text-align:center">
      <div style="font-size:4rem" class="bounce">${d.newStage.emoji}</div>
      <h3 class="fredoka" style="color:#7a3f04;font-size:1.2rem;margin-top:8px">\u2728 \u00c9volution g\u00e9n\u00e9rale ! \u2728</h3>
      <p style="color:#451a03;margin-top:4px">Ton dragonnet maths est devenu <strong>${d.newStage.name}</strong> !</p>
    </div>`;
  }
  let royaumeCompHTML='';
  if(d.newRoyaumeCompanions&&d.newRoyaumeCompanions.length>0){
    royaumeCompHTML=`<div class="card fade-in" style="background:linear-gradient(135deg,#dbeafe,#bfdbfe);border-color:#3b82f6">
      <h3 class="fredoka" style="color:#1e40af;font-size:.95rem;text-transform:uppercase;letter-spacing:.08em">\u{1F389} Nouveau compagnon dans ${d.newRoyaumeCompanions[0].royaume} !</h3>
      <div class="dragonnet-grid">${d.newRoyaumeCompanions.map(c=>`<div class="dragonnet-card unlocked pulse"><div class="dragonnet-emoji">${c.emoji}</div><div class="dragonnet-name">${c.name}</div><div class="dragonnet-elem">${c.elem}</div></div>`).join('')}</div>
    </div>`;
  }
  let dragonnetsHTML='';
  if(d.newDragonnets&&d.newDragonnets.length>0){
    dragonnetsHTML=`<div class="card fade-in" style="background:linear-gradient(145deg,#1e3a5f,#2e4a6f);border-color:#93c5fd">
      <h3 class="fredoka" style="color:#93c5fd;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em">\u{1F409} Nouveau dragonnet d\u00e9bloqu\u00e9 !</h3>
      <div class="dragonnet-grid">${d.newDragonnets.map(dg=>`<div class="dragonnet-card unlocked pulse"><div class="dragonnet-emoji">${dg.emoji}</div><div class="dragonnet-name">${dg.name}</div><div class="dragonnet-elem">${dg.elem}</div></div>`).join('')}</div>
    </div>`;
  }
  const badgesHTML=(d.newBadges&&d.newBadges.length>0)?`<div class="card fade-in" style="background:linear-gradient(145deg,#fff5e1,#ffeacc);border-color:#f7a020">
    <h3 class="fredoka" style="color:#7a3f04;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em">\u2728 Nouveaux badges !</h3>
    <div class="badge-grid">${d.newBadges.map(b=>`<div class="badge-card unlocked pulse"><div class="badge-ic">${esc(b.icon)}</div><div class="badge-name">${esc(b.name)}</div><div class="badge-desc">${esc(b.desc)}</div></div>`).join('')}</div></div>`:'';
  const questHTML=d.questDone?`<div class="card fade-in" style="background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-color:#a78bfa"><div class="text-center"><div style="font-size:2.5rem">\u{1F3AF}</div><h3 class="fredoka" style="color:#5b21b6;margin-top:6px">Qu\u00eate journali\u00e8re r\u00e9ussie !</h3><p style="color:#2d2018;margin-top:4px">Tu gagnes \u{1F48E} +${d.questReward} cristaux !</p></div></div>`:'';

  app.innerHTML=`<div class="text-center py-8 fade-in"><div class="huge-icon">${emoji}</div>
    <h2 class="title" style="font-size:clamp(1.3rem,3.5vw,2rem);color:#7a3f04">${title}</h2><p style="color:#7a5a3a">${sub}</p></div>
  <div class="card mb-4"><div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:#f7a020">${d.score}/${d.total}</div><div class="stat-label">Bonnes r\u00e9ponses</div></div>
    <div class="stat-card"><div class="stat-val" style="color:${pct>=60?'#22c55e':'#ef4444'}">${pct}%</div><div class="stat-label">R\u00e9ussite</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#fb923c">${d.maxStreak}</div><div class="stat-label">S\u00e9rie max \u{1F525}</div></div></div>
    <div class="resources-row mt-4">
      <div class="resource xp">\u2728 +${d.xp} XP</div>
      <div class="resource crystal">\u{1F48E} +${d.cristaux} cristaux</div>
    </div></div>
  ${evolveHTML}
  ${questHTML}
  ${royaumeCompHTML}
  ${dragonnetsHTML}
  ${badgesHTML}
  <div class="card mb-6"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">R\u00e9capitulatif</h3>
    <div class="recap-scroll">${d.results.map(r=>`<div class="recap-item">
      <span class="recap-icon">${r.correct?'\u2705':'\u274C'}</span>
      <div class="flex-1" style="min-width:0"><p class="recap-q">${esc(r.ex.q.length>110?r.ex.q.slice(0,110)+'\u2026':r.ex.q)}</p>
      ${!r.correct?`<p class="recap-answer">R\u00e9ponse : ${esc(r.ex.ch[r.ex.ans])}</p>`:''}</div></div>`).join('')}</div></div>
  <div class="btn-row">
    <button class="btn-fire" onclick="startGame('${d.mode}')">Rejouer</button>
    <button class="btn-stone" onclick="navigate('royaume')">Mon Royaume</button>
    <button class="btn-stone" onclick="navigate('home')">Accueil</button>
  </div>
  <button class="parent-btn mt-4" onclick="navigate('parent')" style="width:100%">\u{1F464} Recap pour Papa/Maman</button>`;
}

/* ════════ MON ROYAUME ════════ */
function renderRoyaume(){
  const pct=profile.totalQuestions>0?Math.round(profile.totalCorrect/profile.totalQuestions*100):0;
  const cats=Object.entries(profile.catStats||{}).sort((a,b)=>(b[1].att-a[1].att));
  const totalMinutes=Math.round(profile.sessions.reduce((s,x)=>s+(x.duration||0),0)/60);
  const stageIdx=getCurrentStage();
  const stage=STAGES[stageIdx];
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem">\u2728</div>
    <h2 class="title sparkle-anim" style="color:#7a3f04;font-size:1.8rem">Mon Royaume</h2>
    <p class="sub">${esc(profile.name)}, voici ta progression</p></div>
  <div class="dragon-card">
    <div class="dragon-emoji float">${stage.emoji}</div>
    <div class="dragon-name">${stage.name}</div>
    <div class="dragon-stage">${profile.xp} XP \u2022 Niveau ${stageIdx+1}/${STAGES.length}</div>
  </div>
  <div class="card mb-4"><div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:#f7a020">${profile.totalGames}</div><div class="stat-label">Parties</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#22c55e">${profile.totalCorrect}</div><div class="stat-label">Bonnes r\u00e9ponses</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#7a3f04">${pct}%</div><div class="stat-label">R\u00e9ussite</div></div>
  </div>
  <div class="stats-grid mt-3">
    <div class="stat-card"><div class="stat-val" style="color:#fb923c">${profile.bestStreak}</div><div class="stat-label">S\u00e9rie record \u{1F525}</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#c4b5fd">${(profile.playDays||[]).length}</div><div class="stat-label">Jours jou\u00e9s</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#60a5fa">${totalMinutes}m</div><div class="stat-label">Temps total</div></div>
  </div>
  <div class="resources-row mt-4">
    <div class="resource crystal">\u{1F48E} ${profile.cristaux}</div>
    <div class="resource xp">\u2728 ${profile.xp} XP</div>
  </div></div>
  ${cats.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">Performance par cat\u00e9gorie</h3>
  <div class="bar-chart">${cats.map(([c,s])=>{const p=s.att>0?Math.round(s.cor/s.att*100):0;const col=p>=75?'#22c55e':p>=50?'#f7a020':'#ef4444';return `<div class="bar-row"><div class="bar-label">${esc(c)}</div><div class="bar-track"><div class="bar-fill" style="width:${p}%;background:${col}"></div></div><div class="bar-val">${p}%</div></div>`}).join('')}</div></div>`:''}
  <div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">Badges</h3>
  <div class="badge-grid">${BADGES.map(b=>{const u=b.cond(profile);return `<div class="badge-card ${u?'unlocked':''}"><div class="badge-ic">${b.icon}</div><div class="badge-name">${b.name}</div><div class="badge-desc">${b.desc}</div></div>`}).join('')}</div></div>
  <div class="btn-row">
    <button class="btn-stone" onclick="navigate('collection')">\u{1F409} Mes Dragonnets</button>
    <button class="btn-stone" onclick="navigate('home')">\u2190 Retour</button>
  </div>`;
}

/* ════════ COLLECTION DRAGONNETS ════════ */
function renderCollection(){
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem">\u{1F409}</div>
    <h2 class="title sparkle-anim" style="color:#7a3f04;font-size:1.6rem">Collection de Dragonnets</h2>
    <p class="sub">Gagne des bonnes r\u00e9ponses pour tous les d\u00e9bloquer !</p></div>
  <div class="card">
    <div class="dragonnet-grid">${DRAGONNETS.map(dg=>{
      const unlocked=profile.totalCorrect>=dg.threshold;
      return `<div class="dragonnet-card ${unlocked?'unlocked':'locked'}">
        <div class="dragonnet-emoji">${dg.emoji}</div>
        <div class="dragonnet-name">${dg.name}</div>
        <div class="dragonnet-elem">${dg.elem}</div>
        <div class="dragonnet-unlock">${unlocked?'\u2705 '+dg.desc:'\u{1F512} '+dg.threshold+' bonnes r\u00e9ponses'}</div>
      </div>`;
    }).join('')}</div>
  </div>
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}

/* ════════ ESPACE PARENT ════════ */
function renderParent(){
  const pct=profile.totalQuestions>0?Math.round(profile.totalCorrect/profile.totalQuestions*100):0;
  const cats=Object.entries(profile.catStats||{});
  const weak=cats.filter(([c,s])=>s.att>=3).sort((a,b)=>(a[1].cor/a[1].att)-(b[1].cor/b[1].att)).slice(0,3);
  const strong=cats.filter(([c,s])=>s.att>=3).sort((a,b)=>(b[1].cor/b[1].att)-(a[1].cor/a[1].att)).slice(0,3);
  const recentSessions=(profile.sessions||[]).slice(-10).reverse();
  const totalMinutes=Math.round(profile.sessions.reduce((s,x)=>s+(x.duration||0),0)/60);
  const failedExIds=Object.entries(profile.exerciseStats).filter(([id,s])=>s.att>=1&&s.cor/s.att<0.5).map(([id])=>id);
  const failedEx=failedExIds.map(id=>EX.find(e=>e.id===id)).filter(Boolean).slice(0,10);
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem">\u{1F464}</div>
    <h2 class="title" style="color:#c4b5fd;font-size:1.6rem">Espace Parent</h2>
    <p class="sub">Suivi de ${esc(profile.name)}</p></div>
  <div class="card mb-4" style="border-color:#c4b5fd"><div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:#c4b5fd">${profile.totalGames}</div><div class="stat-label">Parties</div></div>
    <div class="stat-card"><div class="stat-val" style="color:${pct>=60?'#22c55e':'#ef4444'}">${pct}%</div><div class="stat-label">R\u00e9ussite</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#7a3f04">${totalMinutes}m</div><div class="stat-label">Temps total</div></div>
  </div></div>
  ${weak.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#ef4444;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u26A0\uFE0F Domaines \u00e0 travailler</h3>
  ${weak.map(([c,s])=>{const p=Math.round(s.cor/s.att*100);return `<div class="weak-cat"><div><div style="font-weight:700">${esc(c)}</div><div style="font-size:.75rem">${s.cor}/${s.att} bonnes r\u00e9ponses</div></div><div style="color:#b91c1c;font-weight:700;font-family:'Cinzel',Georgia,serif;flex-shrink:0">${p}%</div></div>`}).join('')}
  <p style="font-size:.8rem;color:#9c6f3a;margin-top:8px;font-style:italic">Conseil : lancez le \u00ab Mode adaptatif \u00bb pour travailler ces domaines.</p></div>`:''}
  ${strong.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#22c55e;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u2B50 Points forts</h3>
  ${strong.map(([c,s])=>{const p=Math.round(s.cor/s.att*100);return `<div class="strong-cat"><div><div style="font-weight:700">${esc(c)}</div><div style="font-size:.75rem">${s.cor}/${s.att} bonnes r\u00e9ponses</div></div><div style="color:#15803d;font-weight:700;font-family:'Cinzel',Georgia,serif;flex-shrink:0">${p}%</div></div>`}).join('')}</div>`:''}
  ${failedEx.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">Exercices \u00e0 refaire ensemble</h3>
  <div class="recap-scroll">${failedEx.map(e=>`<div class="recap-item"><span class="recap-icon">\u{1F4DD}</span><div class="flex-1" style="min-width:0"><p class="recap-q"><strong>${esc(e.cat)}</strong> \u2014 ${esc(e.q.length>120?e.q.slice(0,120)+'\u2026':e.q)}</p><p class="recap-answer">R\u00e9ponse : ${esc(e.ch[e.ans])}</p></div></div>`).join('')}</div></div>`:''}
  ${recentSessions.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">10 derni\u00e8res sessions</h3>
  ${recentSessions.map(s=>{const p=s.total>0?Math.round(s.score/s.total*100):0;const lv=LEVELS.find(l=>l.id===s.level);const dt=new Date(s.date);const dtStr=dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+' '+dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});return `<div class="session-item"><div><div style="color:#2d2018;font-weight:600">${lv?esc(lv.icon)+' '+esc(lv.sub):esc(s.level)} \u00b7 ${esc(s.mode)}</div><div style="font-size:.7rem;color:#7a5a3a">${dtStr} \u00b7 ${Math.round((s.duration||0)/60)}min</div></div><div style="color:${p>=60?'#15803d':'#b91c1c'};font-weight:700;font-family:'Cinzel',Georgia,serif;flex-shrink:0">${s.score}/${s.total}</div></div>`}).join('')}</div>`:''}
  <div class="card mb-4" style="border-color:#c4b5fd"><h3 class="fredoka" style="font-size:.85rem;color:#c4b5fd;margin-bottom:8px">\u{1F517} Sync sur un autre appareil</h3>
  <p style="color:#2d2018;font-size:.85rem;margin-bottom:12px;line-height:1.5">Ouvrez ce lien sur l'autre téléphone/tablette pour récupérer le Royaume de ${esc(profile.name)}. <strong>Ne le partagez avec personne d'autre</strong> (équivaut à un mot de passe).</p>
  <button class="btn-stone btn-small" onclick="copySyncLink()">\u{1F4CB} Copier le lien</button>
  <button class="btn-stone btn-small" onclick="shareSyncLink()" style="margin-left:8px">\u{1F4F2} Partager (WhatsApp...)</button>
  <div id="syncMsg" style="margin-top:8px;font-size:.75rem;color:#22c55e"></div></div>
  <div class="card mb-4" style="border-color:#573c1e"><h3 class="fredoka" style="font-size:.85rem;color:#9c6f3a;margin-bottom:8px">Donn\u00e9es</h3>
  <button class="btn-stone btn-small" onclick="exportData()">\u{1F4E4} Exporter (JSON)</button>
  <button class="btn-stone btn-small" onclick="resetData()" style="margin-top:8px;background:linear-gradient(135deg,#7f1d1d,#991b1b)">\u{1F5D1}\uFE0F R\u00e9initialiser</button></div>
  <button class="btn-stone" onclick="navigate('home')">\u2190 Retour</button>`;
}

function copySyncLink(){
  const link=getSyncLink();
  navigator.clipboard.writeText(link).then(()=>{
    const m=$('syncMsg');if(m)m.textContent='✅ Lien copié dans le presse-papiers ! Colle-le sur l\'autre appareil.';
  }).catch(()=>{
    prompt('Copie ce lien et ouvre-le sur l\'autre appareil :',link);
  });
}
async function shareSyncLink(){
  const link=getSyncLink();
  if(navigator.share){
    try{await navigator.share({title:'Mon Royaume des Nombres',text:'Ouvre ce lien pour récupérer mon Royaume',url:link});}catch(e){}
  }else{
    copySyncLink();
  }
}

function exportData(){
  const blob=new Blob([JSON.stringify(profile,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='royaume-'+(profile.name||'invite').replace(/[^\p{L}\p{N}_-]/gu,'_')+'-'+today()+'.json';
  a.click();
  URL.revokeObjectURL(url);
}
function resetData(){
  if(confirm('R\u00e9initialiser TOUTES les donn\u00e9es de '+profile.name+' ? Irr\u00e9versible.')){
    localStorage.removeItem(STORAGE_KEY);
    profile=loadProfile();
    navigate('nameAsk');
  }
}

/* ════════ POÉSIES LA FONTAINE ════════ */
const FABLES=[
  {id:"corbeau-renard",title:"Le Corbeau et le Renard",icon:"\u{1F98A}",dur:75,
    text:"Maître Corbeau, sur un arbre perché, tenait en son bec un fromage. Maître Renard, par l'odeur alléché, lui tint à peu près ce langage : \"Hé ! bonjour, Monsieur du Corbeau. Que vous êtes joli ! que vous me semblez beau ! Sans mentir, si votre ramage se rapporte à votre plumage, vous êtes le Phénix des hôtes de ces bois.\" À ces mots le Corbeau ne se sent pas de joie ; et pour montrer sa belle voix, il ouvre un large bec, laisse tomber sa proie. Le Renard s'en saisit, et dit : \"Mon bon Monsieur, apprenez que tout flatteur vit aux dépens de celui qui l'écoute.\"",
    morale:"Tout flatteur vit aux dépens de celui qui l'écoute."},
  {id:"lievre-tortue",title:"Le Lièvre et la Tortue",icon:"\u{1F422}",dur:60,
    text:"Rien ne sert de courir ; il faut partir à point. Le Lièvre et la Tortue en sont un témoignage. Gageons, dit celle-ci, que vous n'atteindrez point sitôt que moi ce but. Sitôt ? Êtes-vous sage ? répartit l'animal léger. La Tortue partit. Elle s'évertue, elle se hâte avec lenteur. Le Lièvre cependant méprise une telle victoire, tient la gageure à peu de gloire. Quand il voit que l'autre touche presque au bout de la carrière, il partit comme un trait ; mais les élans qu'il fit furent vains : la Tortue arriva la première.",
    morale:"Rien ne sert de courir ; il faut partir à point."},
  {id:"cigale-fourmi",title:"La Cigale et la Fourmi",icon:"\u{1F41C}",dur:55,
    text:"La Cigale, ayant chanté tout l'été, se trouva fort dépourvue quand la bise fut venue : pas un seul petit morceau de mouche ou de vermisseau. Elle alla crier famine chez la Fourmi sa voisine, la priant de lui prêter quelque grain pour subsister jusqu'à la saison nouvelle. La Fourmi n'est pas prêteuse : c'est là son moindre défaut. \"Que faisiez-vous au temps chaud ? dit-elle à cette emprunteuse. Nuit et jour à tout venant je chantais, ne vous déplaise. Vous chantiez ? j'en suis fort aise. Eh bien ! dansez maintenant.\"",
    morale:"Il faut prévoir le futur, pas seulement profiter du présent."},
  {id:"loup-agneau",title:"Le Loup et l'Agneau",icon:"\u{1F40F}",dur:60,
    text:"La raison du plus fort est toujours la meilleure. Un Agneau se désaltérait dans le courant d'une onde pure. Un Loup survient à jeun qui cherchait aventure, et que la faim en ces lieux attirait. \"Qui te rend si hardi de troubler mon breuvage ? dit cet animal plein de rage. Tu seras châtié de ta témérité.\" \"Sire, répond l'Agneau, que Votre Majesté ne se mette pas en colère ; mais plutôt qu'elle considère que je me vas désaltérant dans le courant, plus de vingt pas au-dessous d'Elle.\" Là-dessus, au fond des forêts le Loup l'emporte, et puis le mange, sans autre forme de procès.",
    morale:"La raison du plus fort est toujours la meilleure."},
  {id:"grenouille-boeuf",title:"La Grenouille qui se veut faire aussi grosse que le Bœuf",icon:"\u{1F438}",dur:50,
    text:"Une Grenouille vit un Bœuf qui lui sembla de belle taille. Elle, qui n'était pas grosse en tout comme un œuf, envieuse, s'étend, et s'enfle, et se travaille pour égaler l'animal en grosseur, disant : \"Regardez bien, ma sœur ; est-ce assez ? dites-moi ; n'y suis-je point encore ? Nenni. M'y voici donc ? Point du tout. M'y voilà ? Vous n'en approchez point.\" La chétive pécore s'enfla si bien qu'elle creva.",
    morale:"Le monde est plein de gens qui ne sont pas plus sages : tout petit prince a des ambassadeurs."},
  {id:"renard-raisins",title:"Le Renard et les Raisins",icon:"\u{1F347}",dur:35,
    text:"Certain Renard Gascon, d'autres disent Normand, mourant presque de faim, vit au haut d'une treille des Raisins mûrs apparemment, et couverts d'une peau vermeille. Le galand en eût fait volontiers un repas ; mais comme il n'y pouvait atteindre : \"Ils sont trop verts, dit-il, et bons pour des goujats.\" Fit-il pas mieux que de se plaindre ?",
    morale:"On méprise ce qu'on ne peut obtenir."},
  {id:"chene-roseau",title:"Le Chêne et le Roseau",icon:"\u{1F33F}",dur:65,
    text:"Le Chêne un jour dit au Roseau : \"Vous avez bien sujet d'accuser la nature ; un roitelet pour vous est un pesant fardeau ; le moindre vent qui d'aventure fait rider la face de l'eau, vous oblige à baisser la tête.\" Le vent redouble ses efforts, et fait si bien qu'il déracine celui de qui la tête au ciel était voisine, et dont les pieds touchaient à l'empire des morts.",
    morale:"Plier sait mieux résister que rester rigide."},
  {id:"lion-rat",title:"Le Lion et le Rat",icon:"\u{1F981}",dur:55,
    text:"Il faut, autant qu'on peut, obliger tout le monde : on a souvent besoin d'un plus petit que soi. De cette vérité deux fables feront foi. Entre les pattes d'un Lion un Rat sortit assez à l'étourdie. Le Roi des animaux, en cette occasion, montra ce qu'il était, et lui donna la vie. Quelque temps après, ce Lion fut pris dans des rets, dont ses rugissements ne le purent défaire. Sire Rat accourut, et fit tant par ses dents qu'une maille rongée emporta tout l'ouvrage.",
    morale:"Patience et longueur de temps font plus que force ni que rage."}
];

function speakText(text){
  if(!('speechSynthesis' in window)){alert('Synthèse vocale non disponible sur ce navigateur');return}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='fr-FR';u.rate=0.85;u.pitch=1;
  speechSynthesis.speak(u);
}
function stopSpeaking(){if('speechSynthesis' in window)speechSynthesis.cancel()}

let _recognition=null;
function startRecording(onResult,onEnd){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){alert('Reconnaissance vocale non supportée. Utilise Safari sur iPhone ou Chrome.');return null}
  if(_recognition){_recognition.stop();_recognition=null}
  _recognition=new SR();
  _recognition.lang='fr-FR';
  _recognition.continuous=true;
  _recognition.interimResults=true;
  let finalTxt='';
  _recognition.onresult=(e)=>{
    let interim='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      if(e.results[i].isFinal) finalTxt+=e.results[i][0].transcript+' ';
      else interim+=e.results[i][0].transcript;
    }
    onResult(finalTxt+interim);
  };
  _recognition.onend=()=>{onEnd&&onEnd(finalTxt)};
  _recognition.onerror=(e)=>{onEnd&&onEnd(finalTxt+' [erreur: '+e.error+']')};
  _recognition.start();
  return _recognition;
}
function stopRecording(){if(_recognition){_recognition.stop();_recognition=null}}

function compareTexts(orig,spoken){
  const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\w\s]/g,' ').replace(/\s+/g,' ').trim();
  const o=norm(orig).split(' ');
  const s=norm(spoken).split(' ');
  const sSet=new Set(s);
  let matched=0;
  const result=o.map(w=>{const ok=sSet.has(w);if(ok)matched++;return {w,ok}});
  return {matched,total:o.length,score:Math.round(matched/o.length*100),result};
}

function renderPoesieHome(){
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3.5rem">\u{1F4DC}</div>
    <h2 class="title" style="color:#a78bfa;font-size:1.6rem">Poésies La Fontaine</h2>
    <p class="sub">Écoute, lis, récite à voix haute</p>
  </div>
  ${FABLES.map((f,i)=>{
    const stats=(profile.poesieStats||{})[f.id]||{};
    const best=stats.best||0;
    const star=best>=80?'\u2B50\u2B50\u2B50':best>=60?'\u2B50\u2B50':best>=40?'\u2B50':'';
    return `<div class="card clickable fade-in" style="animation-delay:${i*.05}s;border-color:#c4b5fd" onclick="navigate('poesieFable',{fableId:'${f.id}'})">
      <div class="row">
        <div style="font-size:2.2rem">${f.icon}</div>
        <div class="flex-1">
          <h3 class="card-title" style="color:#5b21b6">${f.title}</h3>
          <p class="sub">${f.dur}s à lire ${star?' \u2014 '+star:''}</p>
        </div>
        <div class="arrow">\u2192</div>
      </div>
    </div>`;
  }).join('')}
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}

function renderPoesieFable(){
  const f=FABLES.find(x=>x.id===state.fableId);
  if(!f){navigate('poesieHome');return}
  const stats=(profile.poesieStats||{})[f.id]||{plays:0,best:0};
  app.innerHTML=`<div class="text-center py-4 fade-in">
    <div style="font-size:3rem">${f.icon}</div>
    <h2 class="title" style="color:#5b21b6">${f.title}</h2>
    <p class="sub">de Jean de La Fontaine</p>
  </div>
  <div class="card mb-4" style="border-color:#c4b5fd">
    <div style="font-style:italic;color:#2d2018;line-height:1.7;font-size:1.05rem;font-weight:500" id="fableText">${f.text}</div>
    <div class="divider"></div>
    <div style="background:#fef3c7;padding:10px 14px;border-radius:10px;border-left:3px solid #fbbf24;color:#7a3f04;font-weight:600">\u{1F4A1} Morale : <em>${f.morale}</em></div>
  </div>
  <div class="card mb-4" style="border-color:#a78bfa">
    <h3 class="card-title" style="color:#5b21b6;margin-bottom:12px">\u{1F3A7} Écoute la fable</h3>
    <p class="sub mb-2">Le Sage va te lire la fable lentement.</p>
    <div class="btn-row">
      <button class="btn-fire" onclick="speakText(document.getElementById('fableText').innerText)">\u25B6\uFE0F Écouter</button>
      <button class="btn-stone" onclick="stopSpeaking()">\u23F9\uFE0F Stop</button>
    </div>
  </div>
  <div class="card mb-4" style="border-color:#22c55e">
    <h3 class="card-title" style="color:#15803d;margin-bottom:12px">\u{1F3A4} À toi de réciter !</h3>
    <p class="sub mb-2">Clique sur le micro et récite la fable. L'app va comparer ce que tu dis au texte.</p>
    <button class="btn-fire" id="recBtn" onclick="togglePoesieRec()">\u{1F534} Démarrer le micro</button>
    <div id="recLive" style="margin-top:14px;padding:12px;background:#f0fdf4;border-radius:10px;border:1px solid #86efac;min-height:60px;color:#14532d;font-style:italic;display:none"></div>
    <div id="recResult"></div>
  </div>
  <div class="card mb-4">
    <h3 class="card-title" style="margin-bottom:8px">\u{1F4CA} Tes scores</h3>
    <div class="row gap-2"><div class="resource">\u{1F39E}\uFE0F ${stats.plays||0} essais</div><div class="resource flame">\u{1F31F} Meilleur : ${stats.best||0}%</div></div>
  </div>
  <button class="btn-stone" onclick="navigate('poesieHome')">\u2190 Autres fables</button>`;
}

window._poesieRecording=false;
function togglePoesieRec(){
  const btn=$('recBtn');const live=$('recLive');const res=$('recResult');
  if(window._poesieRecording){
    stopRecording();
    window._poesieRecording=false;
    btn.textContent='\u{1F534} Démarrer le micro';
    btn.classList.remove('pulse');
    return;
  }
  const f=FABLES.find(x=>x.id===state.fableId);
  if(!f)return;
  res.innerHTML='';
  live.style.display='block';
  live.textContent='\u{1F3A4} J\'écoute...';
  btn.textContent='\u23F9\uFE0F Arrêter';
  btn.classList.add('pulse');
  window._poesieRecording=true;
  startRecording(
    (txt)=>{live.textContent=txt||'\u{1F3A4} Parle...'},
    (finalTxt)=>{
      window._poesieRecording=false;
      btn.textContent='\u{1F504} Recommencer';
      btn.classList.remove('pulse');
      if(!finalTxt||finalTxt.trim().length<5){res.innerHTML='<p style="color:#7a3f04;margin-top:10px">Pas de voix détectée. Réessaie !</p>';return}
      const cmp=compareTexts(f.text,finalTxt);
      // Save score
      if(!profile.poesieStats)profile.poesieStats={};
      const s=profile.poesieStats[f.id]||{plays:0,best:0};
      s.plays++;if(cmp.score>s.best)s.best=cmp.score;
      profile.poesieStats[f.id]=s;
      // XP reward
      const xpGain=Math.round(cmp.score/2);
      profile.xp+=xpGain;
      saveProfile();
      const wordsHTML=cmp.result.map(x=>`<span style="color:${x.ok?'#15803d':'#9c6f3a'};${x.ok?'':'text-decoration:underline wavy #ef4444'};margin:0 2px">${x.w}</span>`).join('');
      res.innerHTML=`<div class="divider"></div>
        <div class="card" style="background:${cmp.score>=70?'#dcfce7':cmp.score>=40?'#fef3c7':'#fee2e2'};border-color:${cmp.score>=70?'#22c55e':cmp.score>=40?'#fbbf24':'#ef4444'}">
          <h3 class="card-title">${cmp.score>=80?'\u{1F389} Excellent !':cmp.score>=60?'\u{1F44D} Bien joué !':cmp.score>=40?'\u{1F4AA} Continue !':'\u{1F4DA} Réécoute et retente'}</h3>
          <p style="font-size:1.4rem;font-weight:700;color:#7a3f04;margin:8px 0">${cmp.score}% \u2014 ${cmp.matched}/${cmp.total} mots</p>
          <p class="sub">+${xpGain} XP gagnés \u2728</p>
          <div class="divider"></div>
          <p class="sub mb-2">Mots reconnus (en vert) :</p>
          <div style="font-size:.95rem;line-height:1.7">${wordsHTML}</div>
        </div>`;
    }
  );
}

/* ════════ FICHES BILAN ════════ */
function renderFichesHome(){
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3.5rem">\u{1F4D6}</div>
    <h2 class="title" style="color:#7a3f04;font-size:1.6rem">Fiches Bilan</h2>
    <p class="sub">Choisis un domaine pour r\u00e9viser</p>
  </div>
  ${SUBJECTS.filter(s=>!s.isPoetry&&Array.isArray(s.levels)&&s.levels.length>0).map((s,i)=>`<div class="subject-card fade-in" style="border-color:${s.color};animation-delay:${i*.1}s" onclick="navigate('fichesSubject',{subjectId:'${s.id}'})">
    <div class="subject-emoji">${s.icon}</div>
    <div class="subject-info">
      <h3 class="subject-name" style="color:${s.color}">${s.name}</h3>
      <p class="subject-desc">${s.desc}</p>
    </div>
    <div class="arrow">\u2192</div>
  </div>`).join('')}
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}
function renderFichesSubject(){
  const s=SUBJECTS.find(x=>x.id===state.subjectId)||SUBJECTS[0];
  if(s.isPoetry||!Array.isArray(s.levels)){navigate('fichesHome');return}
  const visibleLevels=s.levels.filter(l=>!l.secret||profile.name.toLowerCase()==='joseph');
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem">${s.icon}</div>
    <h2 class="title" style="color:${s.color};font-size:1.5rem">${s.name}</h2>
    <p class="sub">Choisis un niveau / discipline</p>
  </div>
  ${visibleLevels.map((lv,i)=>`<div class="card clickable fade-in" style="animation-delay:${i*.05}s;border-color:${lv.color}" onclick="loadTopics('${lv.id}')">
    <div class="row">
      <div style="font-size:2rem">${lv.icon}</div>
      <div class="flex-1">
        <h3 class="card-title" style="color:${lv.color}">${lv.name}</h3>
        <p class="sub">${lv.sub||''}</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
  </div>`).join('')}
  <button class="btn-stone mt-4" onclick="navigate('fichesHome')">\u2190 Retour</button>`;
}

async function loadTopics(lvId){
  state.ficheLv=lvId;
  state.topics=null;
  navigate('fichesTopics');
  const cached=(profile.topicsCache||{})[lvId];
  if(cached){state.topics=cached;render();return}
  try{
    const subj=lvId.includes('-')?lvId:'maths-'+lvId;
    const r=await fetch(API_BASE+'/topics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:subj})});
    const data=await r.json();
    if(data.error)throw new Error(data.error.message||'err');
    state.topics=data.topics;
    if(!profile.topicsCache)profile.topicsCache={};
    profile.topicsCache[lvId]=data.topics;
    saveProfile();
    render();
  }catch(e){state.topics=[];alert('Erreur chargement th\u00e8mes : '+e.message);render()}
}

function renderFichesTopics(){
  const lv=LEVELS.find(l=>l.id===state.ficheLv);
  if(!state.topics){
    app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\u{1F4DA}</div><h2 class="title">Le Sage charge les th\u00e8mes...</h2></div>';
    return;
  }
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:2.5rem">${lv.icon}</div>
    <h2 class="title" style="color:${lv.color}">${lv.name}</h2>
    <p class="sub">${lv.sub||''} \u2014 Choisis un th\u00e8me</p>
  </div>
  ${state.topics.map((t,i)=>{
    // Stash full topic in window for safe lookup; only use index in onclick.
    window._topicCache=window._topicCache||[];
    window._topicCache[i]=t;
    return `<div class="card clickable fade-in" style="animation-delay:${i*.05}s" onclick="loadTopicByIndex(${i})">
      <div class="row">
        <div style="font-size:2rem;flex-shrink:0">${esc(t.emoji||'\u{1F4D6}')}</div>
        <div class="flex-1" style="min-width:0">
          <h3 class="card-title">${esc(t.title||'Th\u00e8me')}</h3>
          <p class="sub">${esc(t.desc||'')}</p>
        </div>
        <div class="arrow">\u2192</div>
      </div>
    </div>`;
  }).join('')}
  <button class="btn-stone mt-4" onclick="navigate('fichesSubject',{subjectId:state.subjectId})">\u2190 Retour</button>`;
}

function loadTopicByIndex(i){
  const t=(window._topicCache||[])[i];
  if(!t)return;
  loadFiche(String(t.id||'').slice(0,80),String(t.title||'').slice(0,200));
}
async function loadFiche(topicId,topicTitle){
  state.fiche=null;state.ficheTopic={id:topicId,title:topicTitle};
  navigate('fichesView');
  try{
    const subj=state.ficheLv.includes('-')?state.ficheLv:'maths-'+state.ficheLv;
    const r=await fetch(API_BASE+'/fiche',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:subj,topic:topicTitle})});
    const data=await r.json();
    if(data.error)throw new Error(data.error.message||'err');
    state.fiche=data;
    render();
  }catch(e){alert('Erreur g\u00e9n\u00e9ration fiche : '+e.message);navigate('fichesTopics')}
}

function renderFichesView(){
  if(!state.fiche){
    app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\u{1F58B}\uFE0F</div><h2 class="title">Le Sage \u00e9crit ta fiche...</h2><p class="sub">5 \u00e0 15 secondes</p></div>';
    return;
  }
  const f=state.fiche;
  const lv=LEVELS.find(l=>l.id===state.ficheLv);
  app.innerHTML=`<div class="text-center py-4 fade-in">
    <div style="font-size:2rem">${lv?esc(lv.icon):'\u{1F4D6}'}</div>
    <p class="sub">${lv?esc(lv.sub||lv.name):''}</p>
  </div>
  <div class="fiche-card fade-in">
    <h1 class="fiche-h1">${esc(f.titre||state.ficheTopic.title)}</h1>
    ${f.intro?`<p class="fiche-intro">${esc(f.intro)}</p>`:''}
    ${(f.essentiel&&f.essentiel.length>0)?`<div class="fiche-section"><h3>\u2728 L'essentiel</h3><ul class="fiche-list">${f.essentiel.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>`:''}
    ${(f.dates&&f.dates.length>0)?`<div class="fiche-section"><h3>\u{1F4C5} Dates cl\u00e9s</h3>${f.dates.map(d=>`<div class="fiche-mini"><b>${esc(d.date)}</b> \u2014 ${esc(d.evenement)}</div>`).join('')}</div>`:''}
    ${(f.personnalites&&f.personnalites.length>0)?`<div class="fiche-section"><h3>\u{1F464} Personnalit\u00e9s</h3>${f.personnalites.map(p=>`<div class="fiche-mini"><b>${esc(p.nom)}</b> \u2014 ${esc(p.role)}</div>`).join('')}</div>`:''}
    ${(f.vocabulaire&&f.vocabulaire.length>0)?`<div class="fiche-section"><h3>\u{1F4DA} Vocabulaire</h3>${f.vocabulaire.map(v=>`<div class="fiche-mini"><b>${esc(v.mot)}</b> : ${esc(v.definition)}</div>`).join('')}</div>`:''}
    ${f.anecdote?`<div class="fiche-anecdote">\u{1F4A1} <b>Le savais-tu ?</b> ${esc(f.anecdote)}</div>`:''}
    ${f.retiens_bien?`<div class="fiche-retiens">\u{1F31F} ${esc(f.retiens_bien)}</div>`:''}
    ${(f.quiz_rapide&&f.quiz_rapide.length>0)?`<div class="fiche-section"><h3>\u{1F3AF} Quiz \u00e9clair</h3>${f.quiz_rapide.map((q,i)=>`<div class="fiche-mini" onclick="this.querySelector('span').classList.toggle('hidden')" style="cursor:pointer"><b>Q${i+1} :</b> ${esc(q.q)}<br><span class="hidden" style="color:#15803d;font-weight:600">\u279c ${esc(q.r)}</span><br><small style="color:#7a3f04">(clique pour voir la r\u00e9ponse)</small></div>`).join('')}</div>`:''}
  </div>
  <div class="btn-row">
    <button class="btn-stone" onclick="loadFiche(state.ficheTopic.id,state.ficheTopic.title)">\u{1F504} R\u00e9g\u00e9n\u00e9rer</button>
    <button class="btn-stone" onclick="navigate('fichesTopics')">\u2190 Autres th\u00e8mes</button>
  </div>`;
}

render();
