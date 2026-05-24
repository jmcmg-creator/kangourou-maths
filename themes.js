/* ════════ THÈMES ════════
   Chaque thème ré-habille l'app : palette, dégradé de fond, mascotte,
   nom du royaume principal, et substitution de noms/objets dans les
   énoncés d'exercices. Les noms sont 100% originaux (pas de marques
   protégées) pour rester publiables sur l'App Store.
*/
const THEMES={
  dragons:{
    id:"dragons",
    name:"Dragons & Sortilèges",
    icon:"\u{1F409}",
    desc:"L'aventure classique du royaume",
    palette:{
      primary:"#f59e0b",
      secondary:"#dc2626",
      accent:"#7c3aed",
      bgGradient:"linear-gradient(180deg,#fef3c7 0%,#fde68a 35%,#fed7aa 70%,#ffffff 100%)",
      headerColor:"#0369a1"
    },
    appTitle:"Le Royaume des Nombres",
    mascotEmoji:"\u{1F409}",
    nameMap:{}
  },
  animaux:{
    id:"animaux",
    name:"Animaux & Safari",
    icon:"\u{1F981}",
    desc:"La savane et la jungle s'invitent",
    palette:{
      primary:"#16a34a",
      secondary:"#ca8a04",
      accent:"#ea580c",
      bgGradient:"linear-gradient(180deg,#dcfce7 0%,#fef3c7 35%,#fed7aa 70%,#ffffff 100%)",
      headerColor:"#166534"
    },
    appTitle:"Le Royaume de la Savane",
    mascotEmoji:"\u{1F981}",
    nameMap:{
      "Lina":"Léa la Lionne","Léa":"Léa la Lionne","Marie":"Mira la Girafe","Emma":"Émilie l'Éléphante",
      "Tom":"Toby le Tigre","Paul":"Pongo le Panda","Lucas":"Léo le Léopard","Hugo":"Hippo",
      "bonbons":"graines","pommes":"bananes","gâteaux":"noix de coco","billes":"graines","jouets":"plumes"
    }
  },
  monstres:{
    id:"monstres",
    name:"Monstrelins à Collectionner",
    icon:"\u{1F47E}",
    desc:"Attrape, entraîne, fais évoluer tes créatures",
    palette:{
      primary:"#eab308",
      secondary:"#dc2626",
      accent:"#2563eb",
      bgGradient:"linear-gradient(180deg,#fef9c3 0%,#fecaca 35%,#dbeafe 70%,#ffffff 100%)",
      headerColor:"#a16207"
    },
    appTitle:"L'Académie des Monstrelins",
    mascotEmoji:"\u{1F47E}",
    nameMap:{
      "Lina":"Lina la Dresseuse","Léa":"Lila la Dresseuse","Marie":"Mara","Emma":"Élise",
      "Tom":"Sacha","Paul":"Pierre le Dresseur","Lucas":"Léo","Hugo":"Hugo le Champion",
      "bonbons":"Pierre-Bonbons","pommes":"Baies-Mira","billes":"Médaillons","jouets":"Capsules"
    }
  },
  magie:{
    id:"magie",
    name:"École des Sorciers",
    icon:"\u{1FA84}",
    desc:"Baguette, chouette et grimoires",
    palette:{
      primary:"#7c3aed",
      secondary:"#a16207",
      accent:"#dc2626",
      bgGradient:"linear-gradient(180deg,#ede9fe 0%,#ddd6fe 35%,#fef3c7 70%,#ffffff 100%)",
      headerColor:"#5b21b6"
    },
    appTitle:"L'Académie des Sorciers",
    mascotEmoji:"\u{1F985}",
    nameMap:{
      "Lina":"Lyra","Léa":"Luna","Marie":"Morgane","Emma":"Élara",
      "Tom":"Théo","Paul":"Perceval","Lucas":"Léandre","Hugo":"Hagard",
      "bonbons":"dragées surprises","pommes":"pommes magiques","gâteaux":"chaudrons sucrés",
      "billes":"perles de cristal","jouets":"grimoires"
    }
  },
  glaces:{
    id:"glaces",
    name:"Royaume des Glaces",
    icon:"❄️",
    desc:"Châteaux de glace et flocons",
    palette:{
      primary:"#0ea5e9",
      secondary:"#a78bfa",
      accent:"#f472b6",
      bgGradient:"linear-gradient(180deg,#e0f2fe 0%,#dbeafe 35%,#ede9fe 70%,#ffffff 100%)",
      headerColor:"#1e3a8a"
    },
    appTitle:"Le Royaume des Glaces",
    mascotEmoji:"\u{1F3F0}",
    nameMap:{
      "Lina":"Liana la Princesse","Léa":"Lila des Neiges","Marie":"Maïa la Reine","Emma":"Elsie",
      "Tom":"Tymo le Patineur","Paul":"Pino","Lucas":"Loup le Bûcheron","Hugo":"Hiver",
      "bonbons":"flocons sucrés","pommes":"baies givrées","gâteaux":"glaçons sucrés",
      "billes":"perles de glace","jouets":"chocolats chauds"
    }
  }
};

const DEFAULT_THEME_ID="dragons";

function getActiveTheme(){
  try{
    const id=(typeof profile!=='undefined'&&profile&&profile.theme)||localStorage.getItem('royaume_theme')||DEFAULT_THEME_ID;
    return THEMES[id]||THEMES[DEFAULT_THEME_ID];
  }catch(e){return THEMES[DEFAULT_THEME_ID]}
}

function setActiveTheme(id){
  if(!THEMES[id]) return;
  try{localStorage.setItem('royaume_theme',id)}catch(e){}
  if(typeof profile!=='undefined'&&profile){
    profile.theme=id;
    if(typeof saveProfile==='function'&&profile.name) saveProfile();
  }
  applyThemeStyles();
}

function applyThemeStyles(){
  const t=getActiveTheme();
  const p=t.palette;
  document.body.style.background=p.bgGradient;
  document.body.style.backgroundAttachment='fixed';
  const h1=document.querySelector('header h1');
  if(h1) h1.style.color=p.headerColor;
  document.documentElement.style.setProperty('--theme-primary',p.primary);
  document.documentElement.style.setProperty('--theme-secondary',p.secondary);
  document.documentElement.style.setProperty('--theme-accent',p.accent);
  document.documentElement.style.setProperty('--theme-bg-gradient',p.bgGradient);
}

// Substitution de noms/objets dans le texte d'un exercice selon le thème.
// On utilise des regex avec word-boundary pour éviter de massacrer le texte.
// Le texte original n'est jamais modifié — on retourne une nouvelle string.
function themeText(text){
  if(!text) return text;
  const t=getActiveTheme();
  if(!t.nameMap||Object.keys(t.nameMap).length===0) return text;
  let out=String(text);
  for(const [from,to] of Object.entries(t.nameMap)){
    // Échappe les caractères regex spéciaux dans la clé
    const safe=from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    // Word boundary uniquement si le mot commence/finit par une lettre
    const re=new RegExp('\\b'+safe+'\\b','gu');
    out=out.replace(re,to);
  }
  return out;
}

// Ré-habille un objet exercice complet (question + choix + correction).
// On clone pour ne pas muter les données originales.
function themeExercise(ex){
  if(!ex) return ex;
  const t=getActiveTheme();
  if(t.id===DEFAULT_THEME_ID||!t.nameMap||Object.keys(t.nameMap).length===0) return ex;
  const c=Object.assign({},ex);
  if(c.q) c.q=themeText(c.q);
  if(Array.isArray(c.ch)) c.ch=c.ch.map(themeText);
  if(c.se) c.se=themeText(c.se);
  if(c.pourquoi) c.pourquoi=themeText(c.pourquoi);
  if(Array.isArray(c.methode)) c.methode=c.methode.map(themeText);
  if(c.exemple) c.exemple=themeText(c.exemple);
  return c;
}

// Applique le thème dès que le DOM est prêt (avant que game.js ne rende).
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',applyThemeStyles);
}else{
  applyThemeStyles();
}
