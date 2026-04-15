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
      {id:"histoire-ce2",name:"Histoire",sub:"CE2 \u2014 Pr\u00e9histoire/Romains",icon:"\u{1F3DB}\uFE0F",color:"#fbbf24"},
      {id:"histoire-cm1",name:"Histoire",sub:"CM1 \u2014 Moyen \u00c2ge/Renaissance",icon:"\u{1F451}",color:"#fbbf24"},
      {id:"histoire-cm2",name:"Histoire",sub:"CM2 \u2014 R\u00e9volution/XXe",icon:"\u{1F4DC}",color:"#fbbf24"},
      {id:"geographie-ce2",name:"G\u00e9ographie",sub:"CE2 \u2014 La France",icon:"\u{1F1EB}\u{1F1F7}",color:"#22d3ee"},
      {id:"geographie-cm1",name:"G\u00e9ographie",sub:"CM1 \u2014 R\u00e9gions de France",icon:"\u{1F5FA}\uFE0F",color:"#22d3ee"},
      {id:"geographie-cm2",name:"G\u00e9ographie",sub:"CM2 \u2014 Europe & Monde",icon:"\u{1F30D}",color:"#22d3ee"},
      {id:"francais-ce2",name:"Fran\u00e7ais",sub:"CE2 \u2014 Grammaire/Conjugaison",icon:"\u{270F}\uFE0F",color:"#f472b6"},
      {id:"francais-cm1",name:"Fran\u00e7ais",sub:"CM1 \u2014 Conjugaisons/Accords",icon:"\u{1F4D6}",color:"#f472b6"},
      {id:"francais-cm2",name:"Fran\u00e7ais",sub:"CM2 \u2014 Tous temps/Figures",icon:"\u{1F4DD}",color:"#f472b6"},
      {id:"emc-ce2",name:"EMC",sub:"CE2 \u2014 Citoyennet\u00e9",icon:"\u{1F970}",color:"#a78bfa"},
      {id:"emc-cm1",name:"EMC",sub:"CM1 \u2014 D\u00e9mocratie",icon:"\u{1F396}\uFE0F",color:"#a78bfa"},
      {id:"emc-cm2",name:"EMC",sub:"CM2 \u2014 Institutions",icon:"\u{1F3DB}\uFE0F",color:"#a78bfa"}
    ]},
  {id:"langues",name:"Langues",icon:"\u{1F310}",color:"#10b981",desc:"H\u00e9breu (alphabet, vocabulaire, lecture)",
    levels:[
      {id:"hebreu-alphabet",name:"H\u00e9breu",sub:"Alphabet (\u05D0\u05D1\u05D2)",icon:"\u{1F524}",color:"#0ea5e9"},
      {id:"hebreu-vocabulaire",name:"H\u00e9breu",sub:"Vocabulaire de base",icon:"\u{1F4DA}",color:"#0ea5e9"},
      {id:"hebreu-expressions",name:"H\u00e9breu",sub:"Expressions courantes",icon:"\u{1F5E3}\uFE0F",color:"#0ea5e9"},
      {id:"hebreu-lecture",name:"H\u00e9breu",sub:"Lecture mots et phrases",icon:"\u{1F4D6}",color:"#0ea5e9"}
    ]},
  {id:"sciences",name:"Sciences",icon:"\u{1F52C}",color:"#22d3ee",desc:"Physique, Chimie, Biologie",
    levels:[
      {id:"physique-ce2",name:"Physique",sub:"CE2 \u2014 Mati\u00e8re/Lumi\u00e8re",icon:"\u{1F4A1}",color:"#3b82f6"},
      {id:"physique-cm1",name:"Physique",sub:"CM1 \u2014 \u00c9nergie/\u00c9lectricit\u00e9",icon:"\u26A1",color:"#3b82f6"},
      {id:"physique-cm2",name:"Physique",sub:"CM2 \u2014 Forces/Circuits",icon:"\u{1F9F2}",color:"#3b82f6"},
      {id:"chimie-ce2",name:"Chimie",sub:"CE2 \u2014 \u00c9tats mati\u00e8re",icon:"\u{1F9EA}",color:"#10b981"},
      {id:"chimie-cm1",name:"Chimie",sub:"CM1 \u2014 M\u00e9langes/Dissolution",icon:"\u{1F4A7}",color:"#10b981"},
      {id:"chimie-cm2",name:"Chimie",sub:"CM2 \u2014 Transformations",icon:"\u2697\uFE0F",color:"#10b981"},
      {id:"biologie-ce2",name:"SVT",sub:"CE2 \u2014 Corps/Animaux",icon:"\u{1F9B7}",color:"#84cc16"},
      {id:"biologie-cm1",name:"SVT",sub:"CM1 \u2014 Nutrition/Reproduction",icon:"\u{1F33F}",color:"#84cc16"},
      {id:"biologie-cm2",name:"SVT",sub:"CM2 \u2014 \u00c9cosyst\u00e8mes",icon:"\u{1F33B}",color:"#84cc16"}
    ]}
];

// Aplatir tous les niveaux pour rétrocompat
const LEVELS=SUBJECTS.flatMap(s=>s.levels);

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

/* ════════ DRAGONNETS (gamification) ════════ */
const STAGES=[
{threshold:0,name:"\u0152uf",emoji:"\u{1F95A}",desc:"Un \u0153uf mystérieux repose..."},
{threshold:100,name:"B\u00e9b\u00e9 dragonneau",emoji:"\u{1F423}",desc:"Il vient d'\u00e9clore !"},
{threshold:300,name:"Dragonneau juv\u00e9nile",emoji:"\u{1F409}",desc:"Ses ailes s'affirment."},
{threshold:700,name:"Dragon adulte",emoji:"\u{1F432}",desc:"Majestueux et puissant !"},
{threshold:1500,name:"Dragon l\u00e9gendaire",emoji:"\u{1F432}\u2728",desc:"Une cr\u00e9ature mythique !"}
];

const DRAGONNETS=[
{id:"fire",name:"Flambo",emoji:"\u{1F525}\u{1F409}",elem:"Feu",threshold:10,desc:"Souffle de feu"},
{id:"ice",name:"Givrion",emoji:"\u2744\uFE0F\u{1F409}",elem:"Glace",threshold:25,desc:"Gel glac\u00e9"},
{id:"forest",name:"Verdoyant",emoji:"\u{1F343}\u{1F409}",elem:"For\u00eat",threshold:50,desc:"Magie des plantes"},
{id:"storm",name:"Tonnerre",emoji:"\u26A1\u{1F409}",elem:"Orage",threshold:100,desc:"Foudre et tonnerre"},
{id:"light",name:"Luminion",emoji:"\u2728\u{1F409}",elem:"Lumi\u00e8re",threshold:200,desc:"Lumi\u00e8re divine"}
];

/* ════════ QUÊTES JOURNALIÈRES ════════ */
const QUEST_TEMPLATES=[
{id:"q_correct5",desc:"R\u00e9ussis 5 bonnes r\u00e9ponses aujourd'hui",target:5,type:"correct",reward:50},
{id:"q_streak3",desc:"Fais une s\u00e9rie de 3 bonnes r\u00e9ponses",target:3,type:"streak",reward:30},
{id:"q_streak5",desc:"Fais une s\u00e9rie de 5 bonnes r\u00e9ponses",target:5,type:"streak",reward:60},
{id:"q_games2",desc:"Termine 2 parties aujourd'hui",target:2,type:"games",reward:40},
{id:"q_perfect",desc:"Obtiens 100% \u00e0 une partie",target:1,type:"perfect",reward:80},
{id:"q_correct10",desc:"R\u00e9ussis 10 bonnes r\u00e9ponses aujourd'hui",target:10,type:"correct",reward:100}
];

/* ════════ STATE + PERSISTENCE ════════ */
const STORAGE_KEY="royaume_v3";
function loadProfile(){
  try{
    const d=localStorage.getItem(STORAGE_KEY);
    if(d) return migrate(JSON.parse(d));
  }catch(e){}
  return newProfile();
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
function saveProfile(){localStorage.setItem(STORAGE_KEY,JSON.stringify(profile))}
let profile=loadProfile();
let state={screen:'home',level:null,mode:null,exercises:[],idx:0,selected:null,score:0,streak:0,maxStreak:0,results:[],timer:60,timerID:null,gameOver:false,startTime:null,gameData:null,detailOpen:false,sessionXP:0,sessionCristaux:0,aiExercises:[],generating:false,syncing:false};

const $=id=>document.getElementById(id);
const app=$('app');
const backArrow=$('backArrow');

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
  try{
    const r=await fetch(API_BASE+'/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({level,count})
    });
    if(!r.ok) throw new Error('status '+r.status);
    const data=await r.json();
    if(data.error) throw new Error(data.error.message||'API error');
    // Persiste dans le profil pour cross-device + sessions futures
    if(!profile.aiExercises) profile.aiExercises=[];
    profile.aiExercises=profile.aiExercises.concat(data.exercises);
    // Limite à 200 max pour éviter explosion de taille
    if(profile.aiExercises.length>200) profile.aiExercises=profile.aiExercises.slice(-200);
    saveProfile();
    state.generating=false;
    return data.exercises;
  }catch(e){state.generating=false;throw e}
}

// Auto-generation en arrière-plan (fire & forget) si pool insuffisant
function maybeAutoGenerate(level){
  const pool=EX.filter(e=>e.lv===level);
  const aiPool=(profile.aiExercises||[]).filter(e=>e.lv===level);
  // Compte les exos jamais vus
  const allPool=[...pool,...aiPool];
  const unseen=allPool.filter(e=>!profile.exerciseStats[e.id]||!profile.exerciseStats[e.id].att);
  // Si moins de 15 exos jamais vus → génère 10 nouveaux en arrière-plan
  if(unseen.length<15){
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
    case 'collection': renderCollection(); break;
    case 'fichesHome': renderFichesHome(); break;
    case 'fichesSubject': renderFichesSubject(); break;
    case 'fichesTopics': renderFichesTopics(); break;
    case 'fichesView': renderFichesView(); break;
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
  if(!profile.name){navigate('nameAsk');return}
  checkDailyQuest();
  const stageIdx=getCurrentStage();
  const stage=STAGES[stageIdx];
  const next=getNextStage();
  const xpBar=next?Math.round((profile.xp-stage.threshold)/(next.threshold-stage.threshold)*100):100;
  const xpLabel=next?`${profile.xp} / ${next.threshold} XP`:`${profile.xp} XP (Max !)`;
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
    <div class="dragon-card fade-in">
      <div class="dragon-emoji float">${stage.emoji}</div>
      <div class="dragon-name">${stage.name}</div>
      <div class="dragon-stage">${stage.desc}</div>
      <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${xpBar}%"></div></div>
      <div class="xp-label">${xpLabel}</div>
      <div class="resources-row">
        <div class="resource flame">\u{1F525} ${profile.totalGames} parties</div>
        <div class="resource crystal">\u{1F48E} ${profile.cristaux}</div>
        <div class="resource xp">\u2728 ${profile.xp} XP</div>
      </div>
    </div>
    <div class="text-center fade-in mb-4">
      <h2 class="title" style="font-size:clamp(1.4rem,4vw,2rem)">\u{1F44B} Salut ${profile.name} !</h2>
      <p style="color:#7a5a3a;font-size:1rem">Choisis ton domaine d'aventure</p>
    </div>
    ${questHTML}
    ${SUBJECTS.map((s,i)=>`<div class="subject-card fade-in" style="border-color:${s.color};animation-delay:${i*.1}s" onclick="navigate('subject',{subjectId:'${s.id}'})">
      <div class="subject-emoji bounce">${s.icon}</div>
      <div class="subject-info">
        <h3 class="subject-name" style="color:${s.color}">${s.name}</h3>
        <p class="subject-desc">${s.desc}</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>`).join('')}
    <div class="subject-card fade-in" style="border-color:#fbbf24;background:linear-gradient(135deg,#fef9f3,#fff5e6)" onclick="navigate('fichesHome')">
      <div class="subject-emoji bounce">\u{1F4D6}</div>
      <div class="subject-info">
        <h3 class="subject-name" style="color:#7a3f04">Fiches bilan</h3>
        <p class="subject-desc">R\u00e9visions par th\u00e8me, g\u00e9n\u00e9r\u00e9es par IA</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
    <div class="btn-row mt-4">
      <button class="btn-stone" onclick="navigate('royaume')">\u2728 Mon Royaume</button>
      <button class="btn-stone" onclick="navigate('collection')">\u{1F409} Dragonnets</button>
    </div>
    <button class="parent-btn mt-4" onclick="navigate('parent')" style="width:100%">\u{1F464} Espace Parent</button>
  `;
}

function renderSubject(){
  const s=SUBJECTS.find(x=>x.id===state.subjectId)||SUBJECTS[0];
  const visibleLevels=s.levels.filter(l=>!l.secret||profile.name.toLowerCase()==='joseph');
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
  app.innerHTML=`<div class="card fade-in" style="margin-top:40px">
    <h2 class="title" style="color:#7a3f04;font-size:1.3rem">Comment t'appelles-tu, aventuri\u00e8re ?</h2>
    <p style="color:#2d2018;margin-bottom:16px">Ton pr\u00e9nom sera affich\u00e9 dans ton Royaume.</p>
    <input class="name-prompt" id="nameInp" placeholder="Ton pr\u00e9nom" maxlength="20" value="${profile.name||''}">
    <button class="btn-fire" onclick="setName()">Entrer dans le Royaume \u2192</button>
  </div>`;
  setTimeout(()=>$('nameInp').focus(),100);
}
async function setName(){
  const v=$('nameInp').value.trim();
  if(v.length<1){alert('Entre ton pr\u00e9nom');return}
  profile.name=v;
  saveProfile();
  navigate('home');
}

// Au démarrage : tenter de récupérer le profil depuis le cloud (cas: lien sync utilisé)
(async function initialSync(){
  await new Promise(r=>setTimeout(r,200)); // attendre que le DOM soit prêt
  const result=await syncProfileFromCloud();
  if(result==='restored'){
    alert('🎉 Royaume récupéré ! '+profile.totalGames+' parties, '+profile.cristaux+' cristaux, '+(profile.aiExercises||[]).length+' exercices IA.');
    if(state.screen==='home') render();
  }
})();

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
    if(st){st.innerHTML='\u274C Erreur : '+e.message}
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
  // Si pas d'exercices (sujet non-maths sans pool g\u00e9n\u00e9r\u00e9), g\u00e9n\u00e9rer maintenant
  if(exercises.length===0){
    const lv=LEVELS.find(l=>l.id===state.level);
    if(!lv||!lv.hasStatic){
      app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\u{1F52E}</div><h2 class="title">Le Dragon prépare tes défis...</h2><p class="sub">Première g\u00e9n\u00e9ration : 5 \u00e0 15 secondes</p></div>';
      try{
        await generateAIExercises(state.level,10);
        exercises=pickExercises(mode,state.level);
      }catch(e){
        alert('\u00c9chec g\u00e9n\u00e9ration : '+e.message);
        return;
      }
    }
  }
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
  const levelBadge=state.mode==='progression'?`<span class="badge" style="background:${lv.color}22;color:${lv.color};border-color:${lv.color}44;margin-left:6px">${lv.sub}</span>`:'';
  app.innerHTML=`<div style="margin:8px 0"><div class="row-between cinzel" style="font-size:.75rem;color:#9c6f3a;margin-bottom:4px">
    <span>Question ${state.idx+1}/${total}</span>
    <span>Score : ${state.score}/${state.idx+(state.selected!==null?1:0)}</span>
    ${streakHTML}</div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div></div>
  ${timerHTML}
  <div class="card fade-in mt-3">
    <div class="row gap-2 mb-4" style="flex-wrap:wrap">
      <span class="badge">${ex.cat}</span>
      <span class="stars">${'\u2605'.repeat(ex.diff)}${'\u2606'.repeat(5-ex.diff)}</span>
      ${levelBadge}
    </div>
    <p style="font-size:clamp(1rem,2.5vw,1.2rem);color:#2d2018;line-height:1.7;margin-bottom:24px">${ex.q}</p>
    <div class="choices-grid">
      ${ex.ch.map((c,i)=>{let cls='choice-btn';if(state.selected!==null){if(i===ex.ans)cls+=' correct';else if(i===state.selected&&i!==ex.ans)cls+=' wrong'}return `<button class="${cls}" ${state.selected!==null?'disabled':''} onclick="selectAnswer(${i})"><span class="choice-letter">${String.fromCharCode(65+i)}.</span>${c}</button>`}).join('')}
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
  const methodeHTML=ex.methode.map(m=>`<div class="pedago-step">${m}</div>`).join('');
  const gainHTML=correct?`<span class="xp-gain">+${Math.round(ex.diff*10*(state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1))} XP</span> <span class="crystal-gain">\u{1F48E} +${ex.diff*2}</span>`:'';
  el.innerHTML=`<div class="card fade-in mt-6">
    <div class="row gap-2 mb-2"><span style="font-size:1.5rem">${correct?'\u2705':'\u274C'}</span>
    <h4 class="fredoka" style="font-size:1.1rem;font-weight:700;color:${correct?'#22c55e':'#ef4444'};margin:0">${correct?'Excellent, sorci\u00e8re !':'Pas cette fois\u2026'}</h4>
    ${gainHTML}</div>
    <p style="color:#2d2018;margin-bottom:12px;line-height:1.6;font-weight:600">${ex.se}</p>
    ${!correct?`<div class="error-box"><p style="font-size:.9rem;margin:0"><span class="error-label">\u{1F914} L'erreur probable : </span><span style="color:#2d2018">${ex.pourquoi}</span></p></div>`:''}
    <a class="detail-link mt-3" style="display:inline-block;margin-top:10px" onclick="toggleDetail()">${state.detailOpen?'Masquer':'Voir'} la m\u00e9thode pas \u00e0 pas \u2192</a>
    <div id="detailPanel" class="${state.detailOpen?'':'hidden'}">
      <div class="pedago-box">
        <div class="pedago-title">\u{1F4D0} M\u00e9thode du prof</div>
        ${methodeHTML}
      </div>
      <div class="tip-box">
        <p style="font-size:.9rem;margin:0"><span class="tip-label">\u{1F4A1} \u00c0 retenir : </span><span class="tip-text">${ex.regle}</span></p>
      </div>
      ${ex.exemple?`<div class="pedago-box" style="background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.2)"><div class="pedago-title" style="color:#93c5fd">\u{1F4DA} Exemple similaire</div><p style="color:#2d2018;font-size:.9rem">${ex.exemple}</p></div>`:''}
      <p style="font-size:.75rem;color:#9c6f3a;margin-top:8px">Comp\u00e9tence : ${ex.sk}</p>
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
    profile.totalGames++;
    profile.totalQuestions+=total;
    profile.totalCorrect+=state.score;
    if(state.maxStreak>profile.bestStreak)profile.bestStreak=state.maxStreak;
    profile.xp+=state.sessionXP;
    profile.cristaux+=state.sessionCristaux;
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
  if(d.evolved&&d.newStage){
    evolveHTML=`<div class="card fade-in" style="background:linear-gradient(145deg,#5c2f03,#7a3f04);border-color:#7a3f04"><div class="text-center">
      <div style="font-size:4rem" class="evolve-anim">${d.newStage.emoji}</div>
      <h3 class="fredoka" style="color:#7a3f04;font-size:1.2rem;margin-top:8px">\u2728 \u00c9VOLUTION ! \u2728</h3>
      <p style="color:#fde0b0;margin-top:4px">Ton dragonnet est devenu <strong>${d.newStage.name}</strong> !</p>
      <p style="color:#2d2018;font-size:.85rem;margin-top:4px">${d.newStage.desc}</p>
    </div></div>`;
  }
  let dragonnetsHTML='';
  if(d.newDragonnets&&d.newDragonnets.length>0){
    dragonnetsHTML=`<div class="card fade-in" style="background:linear-gradient(145deg,#1e3a5f,#2e4a6f);border-color:#93c5fd">
      <h3 class="fredoka" style="color:#93c5fd;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em">\u{1F409} Nouveau dragonnet d\u00e9bloqu\u00e9 !</h3>
      <div class="dragonnet-grid">${d.newDragonnets.map(dg=>`<div class="dragonnet-card unlocked pulse"><div class="dragonnet-emoji">${dg.emoji}</div><div class="dragonnet-name">${dg.name}</div><div class="dragonnet-elem">${dg.elem}</div></div>`).join('')}</div>
    </div>`;
  }
  const badgesHTML=(d.newBadges&&d.newBadges.length>0)?`<div class="card fade-in" style="background:linear-gradient(145deg,#5c2f03,#7a3f04);border-color:#7a3f04">
    <h3 class="fredoka" style="color:#7a3f04;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em">\u2728 Nouveaux badges !</h3>
    <div class="badge-grid">${d.newBadges.map(b=>`<div class="badge-card unlocked pulse"><div class="badge-ic">${b.icon}</div><div class="badge-name">${b.name}</div><div class="badge-desc">${b.desc}</div></div>`).join('')}</div></div>`:'';
  const questHTML=d.questDone?`<div class="card fade-in" style="background:rgba(139,92,246,.15);border-color:#c4b5fd"><div class="text-center"><div style="font-size:2.5rem">\u{1F3AF}</div><h3 class="fredoka" style="color:#c4b5fd;margin-top:6px">Qu\u00eate journali\u00e8re r\u00e9ussie !</h3><p style="color:#2d2018;margin-top:4px">Tu gagnes \u{1F48E} +${d.questReward} cristaux !</p></div></div>`:'';

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
  ${dragonnetsHTML}
  ${badgesHTML}
  <div class="card mb-6"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">R\u00e9capitulatif</h3>
    <div class="recap-scroll">${d.results.map(r=>`<div class="recap-item">
      <span class="recap-icon">${r.correct?'\u2705':'\u274C'}</span>
      <div class="flex-1"><p class="recap-q">${r.ex.q.length>110?r.ex.q.slice(0,110)+'\u2026':r.ex.q}</p>
      ${!r.correct?`<p class="recap-answer">R\u00e9ponse : ${r.ex.ch[r.ex.ans]}</p>`:''}</div></div>`).join('')}</div></div>
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
    <p class="sub">${profile.name}, voici ta progression</p></div>
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
  <div class="bar-chart">${cats.map(([c,s])=>{const p=s.att>0?Math.round(s.cor/s.att*100):0;const col=p>=75?'#22c55e':p>=50?'#f7a020':'#ef4444';return `<div class="bar-row"><div class="bar-label">${c}</div><div class="bar-track"><div class="bar-fill" style="width:${p}%;background:${col}"></div></div><div class="bar-val">${p}%</div></div>`}).join('')}</div></div>`:''}
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
    <p class="sub">Suivi de ${profile.name}</p></div>
  <div class="card mb-4" style="border-color:#c4b5fd"><div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:#c4b5fd">${profile.totalGames}</div><div class="stat-label">Parties</div></div>
    <div class="stat-card"><div class="stat-val" style="color:${pct>=60?'#22c55e':'#ef4444'}">${pct}%</div><div class="stat-label">R\u00e9ussite</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#7a3f04">${totalMinutes}m</div><div class="stat-label">Temps total</div></div>
  </div></div>
  ${weak.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#ef4444;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u26A0\uFE0F Domaines \u00e0 travailler</h3>
  ${weak.map(([c,s])=>{const p=Math.round(s.cor/s.att*100);return `<div class="weak-cat"><div><div style="color:#fca5a5;font-weight:700">${c}</div><div style="font-size:.75rem;color:#9c6f3a">${s.cor}/${s.att} bonnes r\u00e9ponses</div></div><div style="color:#ef4444;font-weight:700;font-family:'Cinzel'">${p}%</div></div>`}).join('')}
  <p style="font-size:.8rem;color:#9c6f3a;margin-top:8px;font-style:italic">Conseil : lancez le \u00ab Mode adaptatif \u00bb pour travailler ces domaines.</p></div>`:''}
  ${strong.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#22c55e;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u2B50 Points forts</h3>
  ${strong.map(([c,s])=>{const p=Math.round(s.cor/s.att*100);return `<div class="strong-cat"><div><div style="color:#bbf7d0;font-weight:700">${c}</div><div style="font-size:.75rem;color:#9c6f3a">${s.cor}/${s.att} bonnes r\u00e9ponses</div></div><div style="color:#22c55e;font-weight:700;font-family:'Cinzel'">${p}%</div></div>`}).join('')}</div>`:''}
  ${failedEx.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">Exercices \u00e0 refaire ensemble</h3>
  <div class="recap-scroll">${failedEx.map(e=>`<div class="recap-item"><span class="recap-icon">\u{1F4DD}</span><div class="flex-1"><p class="recap-q"><strong>${e.cat}</strong> \u2014 ${e.q.length>120?e.q.slice(0,120)+'\u2026':e.q}</p><p style="color:#22c55e;font-size:.75rem;margin-top:4px">R\u00e9ponse : ${e.ch[e.ans]}</p></div></div>`).join('')}</div></div>`:''}
  ${recentSessions.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">10 derni\u00e8res sessions</h3>
  ${recentSessions.map(s=>{const p=s.total>0?Math.round(s.score/s.total*100):0;const lv=LEVELS.find(l=>l.id===s.level);const dt=new Date(s.date);const dtStr=dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+' '+dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});return `<div class="session-item"><div><div style="color:#2d2018">${lv?lv.icon+' '+lv.sub:s.level} \u00b7 ${s.mode}</div><div style="font-size:.7rem;color:#9c6f3a">${dtStr} \u00b7 ${Math.round((s.duration||0)/60)}min</div></div><div style="color:${p>=60?'#22c55e':'#ef4444'};font-weight:700;font-family:'Cinzel'">${s.score}/${s.total}</div></div>`}).join('')}</div>`:''}
  <div class="card mb-4" style="border-color:#c4b5fd"><h3 class="fredoka" style="font-size:.85rem;color:#c4b5fd;margin-bottom:8px">\u{1F517} Sync sur un autre appareil</h3>
  <p style="color:#2d2018;font-size:.8rem;margin-bottom:10px">Ouvrez ce lien sur l'autre téléphone/tablette pour récupérer le Royaume de ${profile.name}. <strong>Ne le partagez avec personne d'autre</strong> (équivaut à un mot de passe).</p>
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
  a.href=url;a.download='royaume-'+profile.name+'-'+today()+'.json';
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

/* ════════ FICHES BILAN ════════ */
function renderFichesHome(){
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3.5rem">\u{1F4D6}</div>
    <h2 class="title" style="color:#7a3f04;font-size:1.6rem">Fiches Bilan</h2>
    <p class="sub">Choisis un domaine pour r\u00e9viser</p>
  </div>
  ${SUBJECTS.map((s,i)=>`<div class="subject-card fade-in" style="border-color:${s.color};animation-delay:${i*.1}s" onclick="navigate('fichesSubject',{subjectId:'${s.id}'})">
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
  ${state.topics.map((t,i)=>`<div class="card clickable fade-in" style="animation-delay:${i*.05}s" onclick="loadFiche('${(t.id||'').replace(/[^a-z0-9-]/gi,'')}','${(t.title||'').replace(/'/g,'').replace(/\"/g,'')}')">
    <div class="row">
      <div style="font-size:2rem">${t.emoji||'\u{1F4D6}'}</div>
      <div class="flex-1">
        <h3 class="card-title">${t.title}</h3>
        <p class="sub">${t.desc||''}</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
  </div>`).join('')}
  <button class="btn-stone mt-4" onclick="navigate('fichesSubject',{subjectId:state.subjectId})">\u2190 Retour</button>`;
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
    <div style="font-size:2rem">${lv?lv.icon:'\u{1F4D6}'}</div>
    <p class="sub">${lv?lv.sub||lv.name:''}</p>
  </div>
  <div class="fiche-card fade-in">
    <h1 class="fiche-h1">${f.titre||state.ficheTopic.title}</h1>
    ${f.intro?`<p class="fiche-intro">${f.intro}</p>`:''}
    ${(f.essentiel&&f.essentiel.length>0)?`<div class="fiche-section"><h3>\u2728 L'essentiel</h3><ul class="fiche-list">${f.essentiel.map(p=>`<li>${p}</li>`).join('')}</ul></div>`:''}
    ${(f.dates&&f.dates.length>0)?`<div class="fiche-section"><h3>\u{1F4C5} Dates cl\u00e9s</h3>${f.dates.map(d=>`<div class="fiche-mini"><b>${d.date}</b> \u2014 ${d.evenement}</div>`).join('')}</div>`:''}
    ${(f.personnalites&&f.personnalites.length>0)?`<div class="fiche-section"><h3>\u{1F464} Personnalit\u00e9s</h3>${f.personnalites.map(p=>`<div class="fiche-mini"><b>${p.nom}</b> \u2014 ${p.role}</div>`).join('')}</div>`:''}
    ${(f.vocabulaire&&f.vocabulaire.length>0)?`<div class="fiche-section"><h3>\u{1F4DA} Vocabulaire</h3>${f.vocabulaire.map(v=>`<div class="fiche-mini"><b>${v.mot}</b> : ${v.definition}</div>`).join('')}</div>`:''}
    ${f.anecdote?`<div class="fiche-anecdote">\u{1F4A1} <b>Le savais-tu ?</b> ${f.anecdote}</div>`:''}
    ${f.retiens_bien?`<div class="fiche-retiens">\u{1F31F} ${f.retiens_bien}</div>`:''}
    ${(f.quiz_rapide&&f.quiz_rapide.length>0)?`<div class="fiche-section"><h3>\u{1F3AF} Quiz \u00e9clair</h3>${f.quiz_rapide.map((q,i)=>`<div class="fiche-mini" onclick="this.querySelector('span').classList.toggle('hidden')" style="cursor:pointer"><b>Q${i+1} :</b> ${q.q}<br><span class="hidden" style="color:#15803d;font-weight:600">\u279c ${q.r}</span><br><small style="color:#9c6f3a">(clique pour voir la r\u00e9ponse)</small></div>`).join('')}</div>`:''}
  </div>
  <div class="btn-row">
    <button class="btn-stone" onclick="loadFiche(state.ficheTopic.id,state.ficheTopic.title)">\u{1F504} R\u00e9g\u00e9n\u00e9rer</button>
    <button class="btn-stone" onclick="navigate('fichesTopics')">\u2190 Autres th\u00e8mes</button>
  </div>`;
}

render();
