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
  {id:"poesie",name:"Po\u00e9sies",icon:"\u{1F4DC}",color:"#a78bfa",desc:"\u00c9coute, r\u00e9cite \u00e0 voix haute (avec micro)",isPoetry:true},
  {id:"langues",name:"Langues",icon:"\u{1F310}",color:"#10b981",desc:"H\u00e9breu, Espagnol, Italien",
    levels:[
      {id:"espagnol-debutant",name:"Espagnol",sub:"D\u00e9butant \u2014 mots & phrases",icon:"\u{1F1EA}\u{1F1F8}",color:"#f59e0b"},
      {id:"italien-debutant",name:"Italien",sub:"D\u00e9butant \u2014 mots & phrases",icon:"\u{1F1EE}\u{1F1F9}",color:"#22c55e"},
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
    ]},
  {id:"informatique",name:"Informatique & Code",icon:"\u{1F4BB}",color:"#6366f1",desc:"Algorithmes, code et pens\u00e9e logique",
    levels:[
      {id:"info-cp",name:"D\u00e9couverte",sub:"CP \u2014 S\u00e9quences & directions",icon:"\u{1F916}",color:"#818cf8"},
      {id:"info-ce1-ce2",name:"Algorithmes",sub:"CE1-CE2 \u2014 Boucles & conditions",icon:"\u{1F504}",color:"#6366f1"},
      {id:"info-cm1",name:"Programmation",sub:"CM1 \u2014 Scratch & variables",icon:"\u{1F4DD}",color:"#4f46e5"},
      {id:"info-cm2",name:"Code avanc\u00e9",sub:"CM2 \u2014 HTML, binaire, donn\u00e9es",icon:"\u{1F5A5}\uFE0F",color:"#4338ca"}
    ]},
  {id:"art",name:"Art & Histoire de l'art",icon:"\u{1F3A8}",color:"#ec4899",desc:"\u0152uvres, artistes et mouvements",
    levels:[
      {id:"art-cp-ce1",name:"Premiers arts",sub:"CP-CE1 \u2014 Couleurs & formes",icon:"\u{1F58D}\uFE0F",color:"#f472b6"},
      {id:"art-ce2",name:"Arts anciens",sub:"CE2 \u2014 Pr\u00e9histoire au Moyen \u00c2ge",icon:"\u{1F3DB}\uFE0F",color:"#ec4899"},
      {id:"art-cm1",name:"Grands ma\u00eetres",sub:"CM1 \u2014 Renaissance & classiques",icon:"\u{1F5BC}\uFE0F",color:"#db2777"},
      {id:"art-cm2",name:"Art moderne",sub:"CM2 \u2014 Impressionnisme \u00e0 aujourd'hui",icon:"\u2728",color:"#be185d"}
    ]},
  {id:"logique",name:"Logique & M\u00e9moire",icon:"\u{1F9E9}",color:"#14b8a6",desc:"Raisonnement, patterns et m\u00e9moire",
    levels:[
      {id:"logique",name:"D\u00e9fis Logique",sub:"Tous \u00e2ges \u2014 suites, intrus, \u00e9nigmes",icon:"\u{1F9E0}",color:"#2dd4bf",hasStatic:true},
      {id:"logique-cp",name:"Premiers patterns",sub:"CP \u2014 Suites & formes",icon:"\u{1F537}",color:"#5eead4"},
      {id:"logique-ce1-ce2",name:"Raisonnement",sub:"CE1-CE2 \u2014 D\u00e9ductions",icon:"\u{1F9E0}",color:"#14b8a6"},
      {id:"logique-cm1",name:"\u00c9nigmes",sub:"CM1 \u2014 Casse-t\u00eate & sudoku",icon:"\u{1F510}",color:"#0d9488"},
      {id:"logique-cm2",name:"D\u00e9fis experts",sub:"CM2 \u2014 Logique avanc\u00e9e",icon:"\u265F\uFE0F",color:"#0f766e"}
    ]},
  {id:"geographie",name:"G\u00e9ographie & Pays",icon:"\u{1F30D}",color:"#0ea5e9",desc:"Pays, capitales, drapeaux et continents",
    levels:[
      {id:"geo-cp-ce1",name:"Mon monde",sub:"CP-CE1 \u2014 Ma ville, mon pays",icon:"\u{1F3E0}",color:"#38bdf8"},
      {id:"geo-ce2",name:"La France",sub:"CE2 \u2014 R\u00e9gions & villes",icon:"\u{1F1EB}\u{1F1F7}",color:"#0ea5e9"},
      {id:"geo-cm1",name:"L'Europe",sub:"CM1 \u2014 Pays & capitales",icon:"\u{1F5FA}\uFE0F",color:"#0284c7"},
      {id:"geo-cm2",name:"Le Monde",sub:"CM2 \u2014 Continents & cultures",icon:"\u{1F30F}",color:"#0369a1"},
      {id:"geo-drapeaux",name:"Pays & Drapeaux",sub:"Tous niveaux \u2014 Reconna\u00eetre les drapeaux",icon:"\u{1F6A9}",color:"#0ea5e9"},
      {id:"geo-carte-drapeaux",name:"Drapeaux sur la carte",sub:"Vois le drapeau, touche le pays",icon:"\u{1F6A9}",color:"#22d3ee",noBattle:true},
      {id:"geo-carte-france",name:"Villes de France",sub:"Place les villes sur la carte",icon:"\u{1F4CD}",color:"#06b6d4",noBattle:true},
      {id:"geo-carte-europe",name:"Capitales d'Europe",sub:"Place les capitales sur la carte",icon:"\u{1F9ED}",color:"#0891b2",noBattle:true},
      {id:"geo-carte-payseu",name:"Pays d'Europe",sub:"Touche le pays sur la carte",icon:"\u{1F30D}",color:"#0ea5e9",noBattle:true}
    ]}
];

// Aplatir tous les niveaux pour rétrocompat
// Certains sujets (Poésies) n'ont pas de levels — le "||[]" empêche undefined
// de s'infiltrer dans LEVELS et de faire planter tout LEVELS.find(...).
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
    id:"maths",name:"Royaume des Nombres",color:"#f7a020",bgGradient:"linear-gradient(135deg,rgba(247,160,32,0.15),rgba(247,160,32,0.05))",
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
    id:"culture",name:"Royaume du Savoir",color:"#c4b5fd",bgGradient:"linear-gradient(135deg,rgba(196,181,253,0.15),rgba(196,181,253,0.05))",
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
    id:"sciences",name:"Royaume des D\u00e9couvertes",color:"#22d3ee",bgGradient:"linear-gradient(135deg,rgba(34,211,238,0.15),rgba(34,211,238,0.05))",
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
    id:"langues",name:"Royaume des Mots",color:"#10b981",bgGradient:"linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.05))",
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
    id:"poesie",name:"Royaume de la Plume",color:"#a78bfa",bgGradient:"linear-gradient(135deg,rgba(167,139,250,0.15),rgba(167,139,250,0.05))",
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
  },
  informatique:{
    id:"informatique",name:"Royaume du Code",color:"#6366f1",bgGradient:"linear-gradient(135deg,rgba(99,102,241,0.15),rgba(99,102,241,0.05))",
    stages:[
      {threshold:0,name:"Pixel",emoji:"\u2B1C",desc:"Un simple pixel\u2026"},
      {threshold:100,name:"Script",emoji:"\u{1F4DC}",desc:"Premi\u00e8res lignes de code !"},
      {threshold:300,name:"D\u00e9veloppeur",emoji:"\u{1F4BB}",desc:"Tu codes avec assurance"},
      {threshold:700,name:"Hacker \u00e9thique",emoji:"\u{1F513}",desc:"Tu comprends les syst\u00e8mes"},
      {threshold:1500,name:"Architecte",emoji:"\u{1F3D7}\uFE0F\u2728",desc:"Tu construis des mondes"}
    ],
    companions:[
      {id:"bit",name:"Bittou",emoji:"0\uFE0F\u20E3",elem:"Binaire",threshold:10},
      {id:"loop",name:"Bouclix",emoji:"\u{1F504}",elem:"Boucles",threshold:25},
      {id:"bug",name:"Debugo",emoji:"\u{1F41B}",elem:"Debug",threshold:50},
      {id:"algo",name:"Algorix",emoji:"\u{1F4CA}",elem:"Algorithmes",threshold:100},
      {id:"ia",name:"Neurona",emoji:"\u{1F9E0}",elem:"IA",threshold:200}
    ]
  },
  art:{
    id:"art",name:"Royaume des Arts",color:"#ec4899",bgGradient:"linear-gradient(135deg,rgba(236,72,153,0.15),rgba(236,72,153,0.05))",
    stages:[
      {threshold:0,name:"Crayon",emoji:"\u270F\uFE0F",desc:"Un crayon attend ta main\u2026"},
      {threshold:100,name:"Apprenti artiste",emoji:"\u{1F58C}\uFE0F",desc:"Premi\u00e8res couleurs !"},
      {threshold:300,name:"Peintre",emoji:"\u{1F3A8}",desc:"Tu m\u00e9langes les styles"},
      {threshold:700,name:"Ma\u00eetre d'atelier",emoji:"\u{1F5BC}\uFE0F",desc:"Ton \u0153uvre impressionne"},
      {threshold:1500,name:"G\u00e9nie cr\u00e9atif",emoji:"\u{1F5BC}\uFE0F\u2728",desc:"L\u00e9onard t'applaudit"}
    ],
    companions:[
      {id:"pinceau",name:"Pincelon",emoji:"\u{1F58C}\uFE0F",elem:"Peinture",threshold:10},
      {id:"sculpture",name:"Marbrix",emoji:"\u{1F5FF}",elem:"Sculpture",threshold:25},
      {id:"photo",name:"Flasho",emoji:"\u{1F4F8}",elem:"Photo",threshold:50},
      {id:"musique-art",name:"Harmonia",emoji:"\u{1F3B5}",elem:"Musique",threshold:100},
      {id:"cinema",name:"Scenar",emoji:"\u{1F3AC}",elem:"Cin\u00e9ma",threshold:200}
    ]
  },
  logique:{
    id:"logique",name:"Royaume de la Logique",color:"#14b8a6",bgGradient:"linear-gradient(135deg,rgba(20,184,166,0.15),rgba(20,184,166,0.05))",
    stages:[
      {threshold:0,name:"Pion",emoji:"\u265F\uFE0F",desc:"La premi\u00e8re pi\u00e8ce\u2026"},
      {threshold:100,name:"Observateur",emoji:"\u{1F441}\uFE0F",desc:"Tu rep\u00e8res les indices"},
      {threshold:300,name:"Strat\u00e8ge",emoji:"\u{1F3AF}",desc:"Rien ne t'\u00e9chappe"},
      {threshold:700,name:"Ma\u00eetre logicien",emoji:"\u{1F9E9}",desc:"Tu r\u00e9sous tout"},
      {threshold:1500,name:"Oracle",emoji:"\u{1F9E9}\u2728",desc:"Tu vois au-del\u00e0"}
    ],
    companions:[
      {id:"pattern",name:"Motifon",emoji:"\u{1F537}",elem:"Patterns",threshold:10},
      {id:"memory",name:"Mn\u00e9mox",emoji:"\u{1F9E0}",elem:"M\u00e9moire",threshold:25},
      {id:"deduc",name:"Sherlok",emoji:"\u{1F50D}",elem:"D\u00e9duction",threshold:50},
      {id:"puzzle",name:"Puzzlix",emoji:"\u{1F9E9}",elem:"Puzzles",threshold:100},
      {id:"zen",name:"Z\u00e9nith",emoji:"\u{1F4AB}",elem:"Intuition",threshold:200}
    ]
  },
  geographie:{
    id:"geographie",name:"Royaume des Explorateurs",color:"#0ea5e9",bgGradient:"linear-gradient(135deg,rgba(14,165,233,0.15),rgba(14,165,233,0.05))",
    stages:[
      {threshold:0,name:"Boussole",emoji:"\u{1F9ED}",desc:"Une boussole t'attend\u2026"},
      {threshold:100,name:"Voyageur",emoji:"\u{1F6B6}",desc:"Premiers pas dans le monde"},
      {threshold:300,name:"Explorateur",emoji:"\u{1F5FA}\uFE0F",desc:"Tu parcours les continents"},
      {threshold:700,name:"Globe-trotter",emoji:"\u2708\uFE0F",desc:"Aucune fronti\u00e8re ne t'arr\u00eate"},
      {threshold:1500,name:"Cartographe",emoji:"\u{1F30D}\u2728",desc:"Tu connais chaque recoin"}
    ],
    companions:[
      {id:"drapeau",name:"Flaggo",emoji:"\u{1F3F4}",elem:"Drapeaux",threshold:10},
      {id:"capitale",name:"Capitalo",emoji:"\u{1F3DB}\uFE0F",elem:"Capitales",threshold:25},
      {id:"mont",name:"Sommet",emoji:"\u{1F3D4}\uFE0F",elem:"Relief",threshold:50},
      {id:"ocean",name:"Oceano",emoji:"\u{1F30A}",elem:"Oc\u00e9ans",threshold:100},
      {id:"satellite",name:"Orbita",emoji:"\u{1F6F0}\uFE0F",elem:"Vue satellite",threshold:200}
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

/* ════════ QUÊTES JOURNALIÈRES ════════ */
const QUEST_TEMPLATES=[
{id:"q_correct5",desc:"R\u00e9ussis 5 bonnes r\u00e9ponses aujourd'hui",target:5,type:"correct",reward:50},
{id:"q_streak3",desc:"Fais une s\u00e9rie de 3 bonnes r\u00e9ponses",target:3,type:"streak",reward:30},
{id:"q_streak5",desc:"Fais une s\u00e9rie de 5 bonnes r\u00e9ponses",target:5,type:"streak",reward:60},
{id:"q_games2",desc:"Termine 2 parties aujourd'hui",target:2,type:"games",reward:40},
{id:"q_perfect",desc:"Obtiens 100% \u00e0 une partie",target:1,type:"perfect",reward:80},
{id:"q_correct10",desc:"R\u00e9ussis 10 bonnes r\u00e9ponses aujourd'hui",target:10,type:"correct",reward:100}
];

/* ════════ STATE + PERSISTENCE — MULTI-PROFIL ════════
   royaume_v3          : ancien profil unique (legacy, lu une fois pour migration)
   royaume_profiles_v1 : dictionnaire { [prénom]: profil }
   royaume_active_v1   : prénom du dernier profil utilisé
*/
const STORAGE_KEY="royaume_v3";
const STORAGE_PROFILES="royaume_profiles_v1";
const STORAGE_ACTIVE="royaume_active_v1";

function loadProfilesDict(){
  try{const d=localStorage.getItem(STORAGE_PROFILES); if(d) return JSON.parse(d)||{};}catch(e){}
  return {};
}
function saveProfilesDict(d){try{localStorage.setItem(STORAGE_PROFILES,JSON.stringify(d))}catch(e){}}
function getActiveName(){return localStorage.getItem(STORAGE_ACTIVE)||''}
function setActiveName(n){try{localStorage.setItem(STORAGE_ACTIVE,n||'')}catch(e){}}

function newProfile(){
  return {name:"",totalGames:0,totalQuestions:0,totalCorrect:0,bestStreak:0,sessions:[],catStats:{},exerciseStats:{},playDays:[],unlockedBadges:[],
    xp:0,cristaux:0,dragonnets:[],mainDragon:"main",stage:0,
    dailyQuest:null,aiExercises:[],recentMisses:[],aid:"",
    grade:null,age:null,unlocks:{},unlockProgress:{},recentExIds:[]};
}
function migrate(p){
  const base=newProfile();
  return Object.assign(base,p);
}
function loadProfileByName(name){
  const dict=loadProfilesDict();
  if(name&&dict[name]) return migrate(dict[name]);
  return newProfile();
}
// Sauvegarde le profil courant dans le dictionnaire (clé = prénom) et
// dans le slot legacy pour compatibilité.
function saveProfile(){
  if(!profile.name) return;
  const dict=loadProfilesDict();
  dict[profile.name]=profile;
  saveProfilesDict(dict);
  setActiveName(profile.name);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(profile))}catch(e){}
}
// Migration unique : l'ancien profil unique entre dans le dictionnaire.
function migrateLegacyProfile(){
  const dict=loadProfilesDict();
  if(Object.keys(dict).length>0) return;
  try{
    const legacy=localStorage.getItem(STORAGE_KEY);
    if(!legacy) return;
    const p=migrate(JSON.parse(legacy));
    if(!p||!p.name) return;
    dict[p.name]=p;
    saveProfilesDict(dict);
    setActiveName(p.name);
  }catch(e){}
}
migrateLegacyProfile();
// Au boot : aucun profil chargé d'office. renderHome affichera le sélecteur
// si des profils existent, sinon l'écran « entre ton prénom ».
let profile=newProfile();

/* ════════ HTML escaping (protection XSS) ════════ */
const _ESC_MAP={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','`':'&#x60;'};
function esc(x){return x==null?'':String(x).replace(/[&<>"'`]/g,c=>_ESC_MAP[c])}
let state={screen:'home',level:null,mode:null,exercises:[],idx:0,selected:null,score:0,streak:0,maxStreak:0,results:[],timer:60,timerID:null,gameOver:false,startTime:null,gameData:null,detailOpen:false,sessionXP:0,sessionCristaux:0,aiExercises:[],generating:false,syncing:false};

const $=id=>document.getElementById(id);
const app=$('app');
const backArrow=$('backArrow');

function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function today(){return new Date().toISOString().slice(0,10)}

/* ════════ BACKEND API (sync sécurisé via AID + AI generation) ════════ */
const API_BASE="https://royaume-api.square-paris75.workers.dev";

// AID déterministe : SHA-256 du prénom normalisé -> 32 hex.
// « Joseph » donne le MÊME AID sur tous les appareils, donc son profil se
// retrouve automatiquement dans le cloud — sans lien de transfert.
async function aidFromName(name){
  const norm=String(name||'').toLowerCase().trim().replace(/\s+/g,'');
  if(!norm) return '';
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('royaume:'+norm));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,32);
}
// Garantit que profile.aid est renseigné (dérivé du nom si absent).
async function ensureAid(){
  if(!profile.aid&&profile.name){profile.aid=await aidFromName(profile.name);}
  return profile.aid;
}

async function fetchProfileByAid(aid){
  if(!aid||!/^[a-f0-9]{32}$/.test(aid)) return null;
  try{
    const r=await fetch(API_BASE+'/profile/'+aid);
    if(!r.ok) return null;
    const txt=await r.text();
    if(txt==='null'||!txt) return null;
    return JSON.parse(txt);
  }catch(e){return null}
}

// Fusionne deux profils SANS JAMAIS perdre de progression : max sur les
// compteurs, union sur les listes, champ à champ sur les stats. C'est la
// réponse au bug « Judith avait 8000 XP, elle se logue ailleurs et n'en a
// plus que 3000 » : avant, un vieux profil pouvait en écraser un récent.
function mergeProfiles(a,b){
  if(!a||!a.name) return b;
  if(!b) return a;
  // Les copies cloud récentes n'ont plus de prénom (RGPD) : on reprend
  // celui du profil local pour que la fusion fonctionne.
  if(!b.name) b=Object.assign({},b,{name:a.name});
  const out=migrate(Object.assign({},a));
  const mx=(k)=>{out[k]=Math.max(Number(a[k])||0,Number(b[k])||0)};
  ['totalGames','totalQuestions','totalCorrect','bestStreak','xp','cristaux'].forEach(mx);
  // Sessions : union dédupliquée (par date+mode+score), les 100 dernières.
  const seen=new Set();
  out.sessions=[...(a.sessions||[]),...(b.sessions||[])].filter(s=>{
    const k=(s&&s.date||'')+'|'+(s&&s.mode||'')+'|'+(s&&s.score||0)+'|'+(s&&s.total||0);
    if(seen.has(k))return false;seen.add(k);return true;
  }).sort((x,y)=>String(x.date||'').localeCompare(String(y.date||''))).slice(-100);
  // Dernières erreurs : union dédupliquée (date+exercice), les 50 dernières.
  const seenM=new Set();
  out.recentMisses=[...(a.recentMisses||[]),...(b.recentMisses||[])].filter(m=>{
    const k=(m&&m.date||'')+'|'+(m&&m.id||'');
    if(seenM.has(k))return false;seenM.add(k);return true;
  }).sort((x,y)=>String(x.date||'').localeCompare(String(y.date||''))).slice(-50);
  const uni=(k)=>{out[k]=Array.from(new Set([...(a[k]||[]),...(b[k]||[])]))};
  ['playDays','unlockedBadges','dragonnets','dismissedInvites'].forEach(uni);
  // Royaumes : champ à champ, on garde le meilleur de chaque compteur.
  out.royaumes={};
  for(const rid of new Set([...Object.keys(a.royaumes||{}),...Object.keys(b.royaumes||{})])){
    const ra=(a.royaumes||{})[rid]||{},rb=(b.royaumes||{})[rid]||{};
    out.royaumes[rid]={};
    for(const f of new Set([...Object.keys(ra),...Object.keys(rb)])){
      if(f==='companions'){out.royaumes[rid][f]=Array.from(new Set([...(ra[f]||[]),...(rb[f]||[])]))}
      else out.royaumes[rid][f]=Math.max(Number(ra[f])||0,Number(rb[f])||0);
    }
  }
  // Stats par catégorie / exercice / poésie : max champ à champ.
  const mergeStats=(sa,sb)=>{
    const o={};
    for(const k of new Set([...Object.keys(sa||{}),...Object.keys(sb||{})])){
      const va=(sa||{})[k]||{},vb=(sb||{})[k]||{};
      o[k]={};
      for(const f of new Set([...Object.keys(va),...Object.keys(vb)])){
        o[k][f]=(typeof va[f]==='string'||typeof vb[f]==='string')
          ?(String(va[f]||'')>String(vb[f]||'')?va[f]:vb[f])
          :Math.max(Number(va[f])||0,Number(vb[f])||0);
      }
    }
    return o;
  };
  out.catStats=mergeStats(a.catStats,b.catStats);
  out.exerciseStats=mergeStats(a.exerciseStats,b.exerciseStats);
  out.poesieStats=mergeStats(a.poesieStats,b.poesieStats);
  // Contenus ajoutés par le parent + IA + battles + amis : union par identifiant.
  const uniById=(k,idf)=>{
    const m=new Map();
    for(const it of [...(a[k]||[]),...(b[k]||[])]){
      if(!it)continue;const id=idf(it);
      if(!m.has(id)||String(it.updatedAt||it.date||'')>String(m.get(id).updatedAt||m.get(id).date||''))m.set(id,it);
    }
    out[k]=Array.from(m.values());
  };
  uniById('aiExercises',x=>x.id);out.aiExercises=out.aiExercises.slice(-200);
  uniById('customPoems',x=>x.id);
  uniById('customExercises',x=>x.id);
  uniById('battleHistory',x=>x.code);out.battleHistory=out.battleHistory.sort((x,y)=>String(y.date||'').localeCompare(String(x.date||''))).slice(0,50);
  out.friends=Object.assign({},a.friends||{},b.friends||{});
  // Anti-doublon multi-appareils : union des questions déjà jouées (b = plus récent).
  out.recentExIds=Array.from(new Set([...(a.recentExIds||[]),...(b.recentExIds||[])])).slice(-RECENT_MAX);
  // Classe et âge : on garde la valeur renseignée (jamais d'écrasement par null).
  out.grade=(b.grade!=null?b.grade:(a.grade!=null?a.grade:null));
  out.age=(b.age!=null?b.age:(a.age!=null?a.age:null));
  // Déblocages : on garde le plus avancé des deux appareils.
  out.unlocks={};
  for(const k of new Set([...Object.keys(a.unlocks||{}),...Object.keys(b.unlocks||{})])){
    out.unlocks[k]=Math.max(Number((a.unlocks||{})[k])||0,Number((b.unlocks||{})[k])||0);
  }
  out.unlockProgress={};
  for(const k of new Set([...Object.keys(a.unlockProgress||{}),...Object.keys(b.unlockProgress||{})])){
    out.unlockProgress[k]=Math.max(Number((a.unlockProgress||{})[k])||0,Number((b.unlockProgress||{})[k])||0);
  }
  out.topicsCache=Object.assign({},a.topicsCache||{},b.topicsCache||{});
  // Quête du jour : la plus récente.
  out.dailyQuest=(String((b.dailyQuest||{}).date||'')>String((a.dailyQuest||{}).date||''))?b.dailyQuest:a.dailyQuest;
  return out;
}

async function syncProfileFromCloud(){
  await ensureAid();
  if(!profile.aid) return null;
  const remote=await fetchProfileByAid(profile.aid);
  if(!remote) return null;
  // FUSION au lieu de remplacement : impossible de perdre des XP.
  const before=JSON.stringify(profile);
  profile=mergeProfiles(profile,migrate(remote));
  if(!profile.aid) await ensureAid();
  _localSave();
  return JSON.stringify(profile)!==before?'merged':'same';
}

async function pushProfileToCloud(){
  await ensureAid();
  if(!profile.name||!profile.aid) return;
  // Si Supabase est actif et que ce profil a un pseudo enregistré, la sync
  // sécurisée (jeton + pseudo unique) prend le relais : on n'envoie plus
  // rien au Worker historique non authentifié.
  try{if(window.Supa&&Supa.enabled()&&Supa.creds(profile.name)) return}catch(e){}
  try{
    // RGPD enfants : on ne transmet JAMAIS le prénom au serveur. La copie
    // cloud est identifiée par l'AID seul ; le prénom reste sur l'appareil.
    const copie=Object.assign({},profile);
    delete copie.name;
    await fetch(API_BASE+'/profile/'+profile.aid,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(copie),
      keepalive:true
    });
  }catch(e){}
}

function getSyncLink(){
  return profile.aid?(window.location.origin+window.location.pathname+'?sync='+profile.aid):'';
}

// Lien ?sync=AID entrant : importe le profil distant dans le dictionnaire
// local (sans rien écraser de force, l'utilisateur confirme).
function processIncomingSyncLink(){
  const params=new URLSearchParams(window.location.search);
  const incoming=params.get('sync');
  if(!incoming||!/^[a-f0-9]{32}$/.test(incoming)) return;
  window.history.replaceState({},'',window.location.pathname);
  setTimeout(async()=>{
    const remote=await fetchProfileByAid(incoming);
    if(!remote||!remote.name){alert('Aucun profil trouvé pour ce lien.');return}
    const dict=loadProfilesDict();
    const exists=!!dict[remote.name];
    if(!confirm((exists?'Mettre à jour':'Importer')+' le profil « '+remote.name+' » depuis l\'autre appareil ?')) return;
    remote.aid=incoming;
    dict[remote.name]=remote;
    saveProfilesDict(dict);
    setActiveName(remote.name);
    profile=migrate(remote);
    alert('✅ Profil « '+remote.name+' » '+(exists?'mis à jour':'importé')+' !');
    navigate('home');
  },150);
}

// Détecte une réponse de filtre contenu (LLM bloqué par sa politique de
// sécurité). Renvoie un message utilisable côté UI au lieu de la trace technique.
function _isContentFilterError(msg){
  const s=String(msg||'').toLowerCase();
  return s.includes('content filter')||s.includes('output blocked')||s.includes('content_filter')||s.includes('moderation')||s.includes('filtering policy');
}
function _friendlyApiError(rawMsg){
  if(_isContentFilterError(rawMsg)){
    return "🪄 Le Sage prépare une nouvelle leçon. Cette formule magique n'a pas marché — réessaie dans quelques secondes ou choisis un autre thème.";
  }
  if(/network|fetch|timeout|abort/i.test(String(rawMsg||''))){
    return "🌐 Le messager n'a pas pu atteindre le Sage. Vérifie ta connexion et réessaie.";
  }
  return "✨ Le Sage est occupé. Réessaie dans un instant. ("+String(rawMsg||'inconnu').slice(0,80)+")";
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
    if(data.error){
      // Filtre contenu LLM : on ignore silencieusement (auto-gen en arrière-plan).
      if(_isContentFilterError(data.error.message)){state.generating=false;return [];}
      throw new Error(data.error.message||'API error');
    }
    // Persiste dans le profil pour cross-device + sessions futures
    if(!profile.aiExercises) profile.aiExercises=[];
    // Anti-doublon à la source : le Dragon regénère parfois un énoncé déjà connu
    // avec un id neuf. On le jette ici, sinon il polluerait tous les tirages.
    const known=new Set(EX.concat(profile.aiExercises).concat(profile.customExercises||[]).map(_qKey));
    data.exercises=(data.exercises||[]).filter(e=>{
      const k=_qKey(e);
      if(!k||known.has(k)) return false;
      known.add(k);return true;
    });
    profile.aiExercises=profile.aiExercises.concat(data.exercises);
    // Plafond PAR NIVEAU puis global : avant, un seul plafond global de 200
    // suffisait à faire disparaître les questions d'un royaume dès qu'un autre
    // en générait beaucoup. On garde les 60 plus récentes de chaque niveau,
    // 500 au total.
    profile.aiExercises=_trimAiPool(profile.aiExercises);
    saveProfile();
    // Stockage cloud : le profil (et donc les questions générées) est poussé
    // vers la base, pour les retrouver sur l'autre téléphone et demain.
    try{pushProfileToCloud()}catch(e){}
    state.generating=false;
    return data.exercises;
  }catch(e){state.generating=false;throw e}
}

const AI_PER_LEVEL=60, AI_TOTAL=500;
function _trimAiPool(list){
  const byLv={},out=[];
  // On parcourt du plus récent au plus ancien pour garder les nouveaux.
  for(let i=list.length-1;i>=0;i--){
    const e=list[i];if(!e)continue;
    const lv=e.lv||'?';
    byLv[lv]=(byLv[lv]||0)+1;
    if(byLv[lv]<=AI_PER_LEVEL) out.push(e);
  }
  out.reverse();
  return out.length>AI_TOTAL?out.slice(-AI_TOTAL):out;
}

/* ══════ RÉAPPROVISIONNEMENT AUTOMATIQUE ══════
   Dès que le stock de questions encore JAMAIS POSÉES d'un niveau descend trop
   bas, le Dragon en fabrique de nouvelles en arrière-plan et elles sont
   enregistrées dans le profil — donc dans la base, donc disponibles demain et
   sur l'autre téléphone. Le compte tient désormais compte de la mémoire
   anti-doublon : une question posée hier ne compte plus comme disponible,
   c'est exactement le cas que Julien décrit. */
const AUTOGEN_FLOOR=18, AUTOGEN_BATCH=10, AUTOGEN_COOLDOWN_MS=45000;
const _autogenAt={};
// Niveaux que l'IA ne sait pas fabriquer : cartes tactiles (tracés dessinés à
// la main) et disciplines générées localement à partir du code de battle.
function _aiCanGenerate(level){
  const l=String(level||'');
  if(!l||l==='cp') return false;
  if(l.indexOf('geo-carte')===0) return false;
  if(l==='eclair'||l==='observation') return false;
  return true;
}
// Questions encore disponibles = ni jamais posées, ni dans la mémoire récente.
function availableCount(level){
  const recent=new Set(recentExIds());
  const all=EX.filter(e=>e.lv===level)
    .concat((profile.aiExercises||[]).filter(e=>e.lv===level))
    .concat((profile.customExercises||[]).filter(e=>e.lv===level))
    .filter(isPlayableEx);
  return dedupeExercises(all).filter(e=>{
    if(recent.has(e.id)) return false;
    const st=profile.exerciseStats&&profile.exerciseStats[e.id];
    return !st||!st.att;
  }).length;
}
function maybeAutoGenerate(level){
  try{
    if(!_aiCanGenerate(level)) return;
    const left=availableCount(level);
    if(left>=AUTOGEN_FLOOR) return;
    // Anti-rafale : une génération à la fois par niveau.
    const now=Date.now();
    if(_autogenAt[level]&&now-_autogenAt[level]<AUTOGEN_COOLDOWN_MS) return;
    _autogenAt[level]=now;
    // Stock très bas ⇒ on demande un lot double, sinon un lot simple.
    const n=left<AUTOGEN_BATCH?AUTOGEN_BATCH*2:AUTOGEN_BATCH;
    track('autogen_requested',{level:String(level).slice(0,30),left:left});
    generateAIExercises(level,n).catch(e=>console.warn('auto-gen failed',e));
  }catch(e){console.warn('autogen',e)}
}

// Override saveProfile to push to cloud (debounced)
let _syncTimer=null;
const _localSave=saveProfile;
saveProfile=function(){
  _localSave();
  if(_syncTimer) clearTimeout(_syncTimer);
  _syncTimer=setTimeout(()=>{
    pushProfileToCloud();
    try{if(window.Supa&&Supa.enabled()&&Supa.creds(profile.name))Supa.saveProfile(profile.name,profile)}catch(e){}
  },1000);
};
// Flush immédiat : pousse vers le cloud sans attendre le debounce. Sur mobile,
// l'app peut être fermée/mise en arrière-plan avant la fin du debounce.
function flushProfileSync(){
  if(_syncTimer){clearTimeout(_syncTimer);_syncTimer=null;}
  pushProfileToCloud();
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushProfileSync();});
window.addEventListener('pagehide',flushProfileSync);

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

/* ════════ GARDE-FOUS SÉCURITÉ ENFANTS ════════
   Portail parental + filtre prénoms + consentement micro.
   Conformité Apple Kids / RGPD-K basique.
*/
const _PROFANITY=['merde','putain','con','conne','salop','encule','pute','bite','couille','chiant','cul','enfoir','niqu','batard','enculer','enfoiré','pd','pédé','tarlouze','tafiole','nique'];
function isCleanName(name){
  if(!name) return true;
  const norm=String(name).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  return !_PROFANITY.some(w=>norm.includes(w));
}
function parentalGate(onPass,onCancel){
  // Déjà passé dans les 15 dernières minutes ? on laisse passer.
  try{
    const last=parseInt(localStorage.getItem('royaume_parental_ok')||'0',10);
    if(Date.now()-last<15*60*1000){onPass&&onPass();return}
  }catch(e){}
  const a=7+Math.floor(Math.random()*8); // 7-14
  const b=6+Math.floor(Math.random()*8); // 6-13
  const answer=a*b;
  const choices=new Set([answer]);
  while(choices.size<4){
    const off=(Math.random()<.5?-1:1)*(2+Math.floor(Math.random()*15));
    const v=answer+off;
    if(v>0) choices.add(v);
  }
  const arr=[...choices].sort(()=>Math.random()-.5);
  const overlay=document.createElement('div');
  overlay.id='parentalGate';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(15,10,46,.92);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
  overlay.innerHTML=
    '<div style="background:var(--bg-card-solid,#1e1650);border:1px solid rgba(251,191,36,.3);border-radius:18px;padding:24px;max-width:380px;width:100%;box-shadow:0 12px 48px rgba(0,0,0,.6);text-align:center">'
    +'<div style="font-size:2.5rem;margin-bottom:8px">🔐</div>'
    +'<h2 style="color:var(--gold,#fbbf24);font-size:1.2rem;margin-bottom:6px;font-family:Fredoka,sans-serif">Espace adulte</h2>'
    +'<p style="color:var(--text-mid,#c4b5fd);font-size:.9rem;margin-bottom:14px">Résous cette opération pour continuer :</p>'
    +'<p style="font-size:1.8rem;font-weight:700;color:var(--gold,#fbbf24);font-family:Fredoka,sans-serif;margin-bottom:16px">'+a+' × '+b+' = ?</p>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">'
    +arr.map(c=>'<button data-val="'+c+'" style="min-height:48px;background:rgba(251,191,36,.1);color:var(--text-bright,#faf5ff);border:1px solid rgba(251,191,36,.3);border-radius:12px;font-weight:700;font-size:1.1rem;cursor:pointer;font-family:Quicksand,sans-serif">'+c+'</button>').join('')
    +'</div>'
    +'<button data-cancel="1" style="background:transparent;color:var(--text-dim,#8b7ec8);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 16px;font-size:.85rem;cursor:pointer;font-family:Quicksand,sans-serif">Annuler</button>'
    +'<p style="font-size:.7rem;margin-top:12px;color:var(--text-dim,#8b7ec8)">Empêche les enfants d\'accéder seuls aux réglages.</p>'
    +'</div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click',function(e){
    const t=e.target;
    if(t.dataset&&t.dataset.cancel){overlay.remove();onCancel&&onCancel();return}
    if(t.dataset&&t.dataset.val){
      const v=parseInt(t.dataset.val,10);
      if(v===answer){
        try{localStorage.setItem('royaume_parental_ok',String(Date.now()))}catch(e){}
        overlay.remove();onPass&&onPass();
      }else{
        t.style.background='rgba(248,113,113,.3)';
        t.style.borderColor='#f87171';
        t.disabled=true;
        const remaining=Array.from(overlay.querySelectorAll('button[data-val]')).filter(b=>!b.disabled);
        if(remaining.length===0){overlay.remove();onCancel&&onCancel()}
      }
    }
  });
}
function ensureMicConsent(onYes,onNo){
  try{if(localStorage.getItem('royaume_mic_consent')==='1'){onYes&&onYes();return}}catch(e){}
  const ok=window.confirm("Le micro va s'allumer pour écouter la récitation.\n\n• Ta voix est analysée par la reconnaissance vocale de l'appareil (le service du fabricant, ex. Apple, peut la traiter).\n• L'app n'enregistre ni ne conserve aucun son.\n• Tu peux arrêter à tout moment.\n\nAutoriser le micro ?");
  if(ok){try{localStorage.setItem('royaume_mic_consent','1')}catch(e){}onYes&&onYes()}else{onNo&&onNo()}
}

/* ════════ NAVIGATION ════════ */
$('headerHome').onclick=()=>navigate('home');
function navigate(screen,data){
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  if(state.autoNextID){clearTimeout(state.autoNextID);state.autoNextID=null}
  if(state.battlePollID){clearTimeout(state.battlePollID);state.battlePollID=null}
  if(state.memTickID){clearInterval(state.memTickID);state.memTickID=null}
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
    case 'battleHome': renderBattleHome(); break;
    case 'memoryHome': renderMemoryHome(); break;
    case 'pseudoSetup': renderPseudoSetup(); break;
    case 'memoryGame': renderMemoryGame(); break;
    case 'battleResults': renderBattleResults(); break;
    case 'royaume': renderRoyaume(); break;
    case 'parent': renderParent(); break;
    case 'nameAsk': renderNameAsk(); break;
    case 'gradeAsk': renderGradeAsk(); break;
    case 'profilePicker': renderProfilePicker(); break;
    case 'collection': renderCollection(); break;
    case 'leconsHome': renderLecons(); break;
    case 'fichesHome': renderFichesHome(); break;
    case 'fichesSubject': renderFichesSubject(); break;
    case 'fichesTopics': renderFichesTopics(); break;
    case 'fichesView': renderFichesView(); break;
    case 'poesieHome': renderPoesieHome(); break;
    case 'poesieFable': renderPoesieFable(); break;
    case 'addPoem': renderAddPoem(); break;
    case 'addExercise': renderAddExercise(); break;
    case 'photoExercise': renderPhotoExercise(); break;
  }
  updateFooter();
}

/* Petit bandeau éphémère (le conteneur #toast-area existait déjà dans
   index.html mais rien ne l'alimentait). Ne bloque jamais le jeu. */
function toast(msg,kind){
  try{
    const area=document.getElementById('toast-area');
    if(!area){console.log('[toast]',msg);return}
    const el=document.createElement('div');
    el.className='toast'+(kind?' toast-'+kind:'');
    el.setAttribute('role','status');
    el.textContent=String(msg||'');
    area.appendChild(el);
    setTimeout(()=>{el.classList.add('toast-out');setTimeout(()=>el.remove(),400)},kind==='win'?4200:3200);
  }catch(e){}
}

/* ════════ CLASSE DE L'ENFANT & DÉBLOCAGE PROGRESSIF ════════
   Principe : l'enfant démarre avec les niveaux de SA classe (et en dessous)
   ouverts. Les niveaux supérieurs sont verrouillés 🔒 et s'ouvrent à la
   performance : 3 parties à 80 % ou plus sur son niveau le plus haut
   débloquent le palier suivant, matière par matière.

   RÈGLE DE NON-RÉGRESSION : un profil qui n'a PAS de classe renseignée
   (tous les profils existants) garde TOUT ouvert, exactement comme avant.
   Le verrouillage ne s'applique qu'aux profils qui ont choisi leur classe. */
const GRADES=[
  {id:'cp',   name:'CP',  age:6,  rank:0},
  {id:'ce1',  name:'CE1', age:7,  rank:1},
  {id:'ce2',  name:'CE2', age:8,  rank:2},
  {id:'cm1',  name:'CM1', age:9,  rank:3},
  {id:'cm2',  name:'CM2', age:10, rank:4},
  {id:'6e',   name:'6e',  age:11, rank:5},
  {id:'5e',   name:'5e',  age:12, rank:6}
];
function gradeByRank(r){return GRADES.find(g=>g.rank===r)||null}
function gradeById(id){return GRADES.find(g=>g.id===id)||null}

/* Palier minimum d'un niveau, déduit de son libellé ("CE1 – CE2" → CE1).
   Un niveau sans mention de classe ("Tous âges", "Tous niveaux") est
   transverse : jamais verrouillé. */
const _GRADE_PATTERNS=[
  [/\bCP\b/i,0],[/\bCE1\b/i,1],[/\bCE2\b/i,2],
  [/\bCM1\b/i,3],[/\bCM2\b/i,4],[/\b6[eè]\b/i,5],[/\b5[eè]\b/i,6]
];
const _minGradeCache={};
function levelMinGrade(lv){
  if(!lv) return null;
  if(_minGradeCache[lv.id]!==undefined) return _minGradeCache[lv.id];
  const txt=String(lv.sub||'')+' '+String(lv.name||'')+' '+String(lv.id||'');
  let min=null;
  for(const [re,rank] of _GRADE_PATTERNS){
    if(re.test(txt)&&(min===null||rank<min)) min=rank;
  }
  _minGradeCache[lv.id]=min;
  return min;
}
// Matière à laquelle appartient un niveau (pour un déblocage par matière).
function subjectOfLevel(lvId){
  for(const s of SUBJECTS){ if((s.levels||[]).some(l=>l.id===lvId)) return s.id }
  return null;
}
// Palier maximum ouvert dans une matière = classe de l'enfant + bonus gagnés.
function maxOpenGrade(subjectId){
  if(profile.grade==null) return 99;                 // profil sans classe : tout ouvert
  const bonus=(profile.unlocks&&profile.unlocks[subjectId])||0;
  return profile.grade+bonus;
}
// Le niveau le plus bas d'une matière est TOUJOURS ouvert : sans cela un
// enfant de CP se retrouverait sans aucune porte d'entrée dans une matière
// dont le premier palier commence en CE1 (cas réel des maths).
function _lowestLevelOf(subjectId){
  const su=SUBJECTS.find(x=>x.id===subjectId);
  if(!su) return null;
  const graded=(su.levels||[]).filter(l=>!l.secret&&levelMinGrade(l)!==null);
  if(graded.length===0) return null;
  return graded.reduce((a,b)=>(levelMinGrade(b)<levelMinGrade(a)?b:a));
}
function isLevelUnlocked(lvId){
  const lv=LEVELS.find(l=>l.id===lvId);
  if(!lv) return true;
  if(profile.grade==null) return true;               // non-régression
  const need=levelMinGrade(lv);
  if(need===null) return true;                       // contenu transverse
  const subj=subjectOfLevel(lvId);
  const lowest=_lowestLevelOf(subj);
  if(lowest&&lowest.id===lvId) return true;          // porte d'entrée garantie
  return need<=maxOpenGrade(subj);
}
// Niveau le plus haut actuellement ouvert dans une matière (celui à travailler).
function topOpenLevel(subjectId){
  const s=SUBJECTS.find(x=>x.id===subjectId);
  if(!s) return null;
  const open=(s.levels||[]).filter(l=>!l.secret&&isLevelUnlocked(l.id)&&levelMinGrade(l)!==null);
  if(open.length===0) return null;
  return open.reduce((a,b)=>(levelMinGrade(b)>levelMinGrade(a)?b:a));
}
function nextLockedLevel(subjectId){
  const s=SUBJECTS.find(x=>x.id===subjectId);
  if(!s) return null;
  const locked=(s.levels||[]).filter(l=>!l.secret&&!isLevelUnlocked(l.id)&&levelMinGrade(l)!==null);
  if(locked.length===0) return null;
  return locked.reduce((a,b)=>(levelMinGrade(b)<levelMinGrade(a)?b:a));
}

/* Appelé à la fin de chaque partie : 3 parties à ≥ 80 % sur le niveau le
   plus haut ouvert débloquent le palier suivant de la matière. */
const UNLOCK_THRESHOLD=0.8, UNLOCK_GAMES=3, UNLOCK_MIN_QUESTIONS=5;
function checkLevelUnlock(lvId,score,total){
  try{
    if(profile.grade==null) return null;              // pas de progression sans classe
    if(!lvId||total<UNLOCK_MIN_QUESTIONS) return null;
    const subj=subjectOfLevel(lvId);
    if(!subj) return null;
    const top=topOpenLevel(subj);
    if(!top||top.id!==lvId) return null;              // on ne progresse que sur son plus haut niveau
    const nextLv=nextLockedLevel(subj);
    if(!nextLv) return null;                          // déjà tout ouvert
    if(!profile.unlockProgress) profile.unlockProgress={};
    const ratio=total>0?score/total:0;
    if(ratio<UNLOCK_THRESHOLD){
      profile.unlockProgress[lvId]=0;                 // il faut 3 bonnes parties d'affilée
      saveProfile();
      return null;
    }
    const n=(profile.unlockProgress[lvId]||0)+1;
    profile.unlockProgress[lvId]=n;
    if(n<UNLOCK_GAMES){ saveProfile(); return {progress:n,need:UNLOCK_GAMES,next:nextLv}; }
    if(!profile.unlocks) profile.unlocks={};
    profile.unlocks[subj]=(profile.unlocks[subj]||0)+1;
    profile.unlockProgress[lvId]=0;
    saveProfile();
    track('level_unlocked',{level:String(nextLv.id).slice(0,30)});
    return {unlocked:nextLv,progress:UNLOCK_GAMES,need:UNLOCK_GAMES,next:nextLv};
  }catch(e){console.warn('unlock',e);return null}
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
    navigate(Object.keys(loadProfilesDict()).length>0?'profilePicker':'nameAsk');
    return;
  }
  // Lien de battle reçu (?battle=CODE via WhatsApp/QR) : on rejoint direct,
  // maintenant qu'un profil est actif.
  let _pb=null;
  try{_pb=localStorage.getItem('royaume_pending_battle')}catch(e){}
  if(_pb){
    try{localStorage.removeItem('royaume_pending_battle')}catch(e){}
    joinBattle(_pb);
    return;
  }
  checkDailyQuest();
  checkBattleInvites();
  setTimeout(()=>{
    if(window.Supa&&Supa.enabled()&&!profile.pseudo&&state.screen==='home'&&!document.getElementById('pseudoNudge')){
      const d=document.createElement('div');
      d.innerHTML='<div class="card fade-in" id="pseudoNudge" style="border-color:#f472b6"><div class="row" style="gap:12px"><div style="font-size:2rem">🛡️</div><div class="flex-1"><h3 class="card-title" style="color:#f472b6">Choisis ton pseudo de battle !</h3><p class="sub">Un nom unique pour défier tes amis, protégé par un code secret.</p></div><button class="btn-fire btn-small" onclick="navigate(&quot;pseudoSetup&quot;)">Go !</button></div></div>';
      const first=app.firstElementChild;
      if(first)app.insertBefore(d.firstElementChild,first);
    }
  },100);   // bannière "X te défie !" si un ami a lancé un défi
  checkFinishedBattles(); // bannière "🏁 Léa a fini !" si une battle attendue est terminée
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
      <h2 class="title" style="font-size:clamp(1.4rem,4vw,2rem)">\u{1F44B} Salut ${profile.name} !</h2>
      <p style="color:var(--text-mid);font-size:1rem">Bienvenue dans tes Royaumes</p>
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
      return `<div class="kingdom-gate fade-in" style="animation-delay:${i*.1}s;--k-color:${r.color}" onclick="${target}">
        <div class="kingdom-glow" style="background:radial-gradient(ellipse at 30% 50%,${r.color}22,transparent 70%)"></div>
        <div class="kingdom-border-glow" style="--k-color:${r.color}"></div>
        <div class="kingdom-inner">
          <div class="kingdom-mascot">${st.stage.emoji}</div>
          <div class="kingdom-info">
            <h3 class="kingdom-name" style="color:${r.color}">${r.name}</h3>
            <p class="kingdom-stage">${st.stage.emoji} ${st.stage.name}</p>
            <div class="kingdom-xp-track"><div class="kingdom-xp-fill" style="width:${xpBar}%;background:linear-gradient(90deg,${r.color},${r.color}cc)"></div></div>
            <div class="kingdom-stats">
              <span>\u2728 ${data.xp} XP</span>
              <span>\u{1F48E} ${data.cristaux}</span>
              <span>\u{1F3AE} ${data.games}</span>
            </div>
          </div>
          <div class="kingdom-enter" style="color:${r.color}">\u2794</div>
        </div>
      </div>`;
    }).join('')}
    <div class="kingdom-gate fade-in" style="animation-delay:.95s;--k-color:#22d3ee" onclick="navigate('leconsHome')">
      <div class="kingdom-glow" style="background:radial-gradient(ellipse at 30% 50%,rgba(34,211,238,0.12),transparent 70%)"></div>
      <div class="kingdom-border-glow" style="--k-color:#22d3ee"></div>
      <div class="kingdom-inner">
        <div class="kingdom-mascot">\u{1F52C}</div>
        <div class="kingdom-info">
          <h3 class="kingdom-name" style="color:#22d3ee">Le\u00e7ons Interactives</h3>
          <p class="kingdom-stage">11 exp\u00e9riences scientifiques anim\u00e9es</p>
        </div>
        <div class="kingdom-enter" style="color:#22d3ee">\u2794</div>
      </div>
    </div>
    <div class="kingdom-gate fade-in" style="animation-delay:1.05s;--k-color:#60a5fa" onclick="location.href='lecons/ingenieur.html'">
      <div class="kingdom-glow" style="background:radial-gradient(ellipse at 30% 50%,rgba(96,165,250,0.12),transparent 70%)"></div>
      <div class="kingdom-border-glow" style="--k-color:#60a5fa"></div>
      <div class="kingdom-inner">
        <div class="kingdom-mascot">\u{1F527}</div>
        <div class="kingdom-info">
          <h3 class="kingdom-name" style="color:#60a5fa">Royaume de l'Ing\u00e9nieur</h3>
          <p class="kingdom-stage">20 machines du quotidien d\u00e9mont\u00e9es et expliqu\u00e9es</p>
        </div>
        <div class="kingdom-enter" style="color:#60a5fa">\u2794</div>
      </div>
    </div>
    <div class="kingdom-gate fade-in" style="animation-delay:1.1s;--k-color:#fb923c" onclick="location.href='lecons/inventions.html'">
      <div class="kingdom-glow" style="background:radial-gradient(ellipse at 30% 50%,rgba(251,146,60,0.12),transparent 70%)"></div>
      <div class="kingdom-border-glow" style="--k-color:#fb923c"></div>
      <div class="kingdom-inner">
        <div class="kingdom-mascot">\u{1F680}</div>
        <div class="kingdom-info">
          <h3 class="kingdom-name" style="color:#fb923c">Les Grandes Inventions</h3>
          <p class="kingdom-stage">34 id\u00e9es g\u00e9niales en images \u2014 s\u00e9rie \u00ab une invention par soir \u00bb</p>
        </div>
        <div class="kingdom-enter" style="color:#fb923c">\u2794</div>
      </div>
    </div>
    <div class="subject-card fade-in" style="border-color:#34d399;background:rgba(52,211,153,0.07)" onclick="navigate('memoryHome')">
      <div class="subject-emoji bounce">\u{1F0CF}</div>
      <div class="subject-info">
        <h3 class="subject-name" style="color:#34d399">Memory</h3>
        <p class="subject-desc">M\u00e9morise les cartes 10 secondes, puis retrouve les paires d'animaux !</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
    <div class="subject-card fade-in" style="border-color:#f472b6;background:rgba(244,114,182,0.07)" onclick="navigate('battleHome')">
      <div class="subject-emoji bounce">\u2694\ufe0f</div>
      <div class="subject-info">
        <h3 class="subject-name" style="color:#f472b6">Battle des Amis</h3>
        <p class="subject-desc">D\u00e9fie un copain avec un code \u2014 m\u00eames questions, qui gagne ?</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
    <div class="subject-card fade-in" style="border-color:#fbbf24;background:rgba(251,191,36,0.06)" onclick="navigate('fichesHome')">
      <div class="subject-emoji bounce">\u{1F4D6}</div>
      <div class="subject-info">
        <h3 class="subject-name" style="color:#fbbf24">Fiches bilan</h3>
        <p class="subject-desc">R\u00e9visions par th\u00e8me, g\u00e9n\u00e9r\u00e9es par IA</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
    <div class="btn-row mt-4">
      <button class="btn-stone" onclick="navigate('royaume')">\u2728 Vue d'ensemble</button>
      <button class="btn-stone" onclick="parentalGate(function(){navigate('parent')})">\u{1F510} Espace Parent</button>
    </div>
  `;
}

/* Bandeau « où j'en suis DANS CE royaume » : rend visible le fait que la
   progression est cloisonnée par matière. */
function subjectProgressBanner(s){
  if(profile.grade==null) return '';
  const top=topOpenLevel(s.id);
  if(!top) return '';
  const nxt=nextLockedLevel(s.id);
  const prog=(profile.unlockProgress||{})[top.id]||0;
  const band=targetDifficulty(s.id);
  const hot=band&&band.label==='expert'
    ?'<div class="sub" style="color:#f7a020;margin-top:6px">\u{1F525} Tu cartonnes ici : le Dragon te sort des questions plus costaudes.</div>':'';
  const nextHTML=nxt
    ?'<div class="sub" style="margin-top:6px">Prochain palier : <b style="color:'+s.color+'">'+esc(nxt.name)+'</b> \u2014 '+prog+'/3 parties r\u00e9ussies</div>'
      +'<div class="progress-track" style="margin-top:6px"><div class="progress-fill" style="width:'+Math.round(prog/3*100)+'%"></div></div>'
    :'<div class="sub" style="margin-top:6px">Tout est ouvert dans ce royaume \u2705</div>';
  return '<div class="card mb-3" style="border-color:'+s.color+'55">'
    +'<div style="color:#faf5ff;font-weight:700">\u{1F393} Ton niveau ici : <span style="color:'+s.color+'">'+esc(top.name)+'</span></div>'
    +'<div class="sub" style="margin-top:2px;font-size:.72rem">Chaque royaume avance \u00e0 son rythme \u2014 ce que tu gagnes ici ne compte que pour '+esc(s.name)+'.</div>'
    +nextHTML+hot
  +'</div>';
}

function renderSubject(){
  const s=SUBJECTS.find(x=>x.id===state.subjectId)||SUBJECTS[0];
  const visibleLevels=s.levels.filter(l=>!l.secret||profile.name.toLowerCase()==='joseph');
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3.5rem">${s.icon}</div>
    <h2 class="title" style="color:${s.color};font-size:1.6rem">${s.name}</h2>
    <p class="sub">${s.desc}</p>
  </div>
  ${subjectProgressBanner(s)}
  ${visibleLevels.map((lv,i)=>{
    const open=isLevelUnlocked(lv.id);
    const prog=(profile.unlockProgress||{})[topOpenLevel(s.id)&&topOpenLevel(s.id).id]||0;
    const isNext=!open&&nextLockedLevel(s.id)&&nextLockedLevel(s.id).id===lv.id;
    return `<div class="card ${open?'clickable':'level-locked'} fade-in" style="animation-delay:${i*.06}s;border-color:${open?lv.color:'rgba(255,255,255,0.10)'}" onclick="${open?`navigate('mode',{level:'${lv.id}'})`:`showLockedLevel('${lv.id}')`}">
    <div class="row">
      <div style="font-size:2.2rem">${open?lv.icon:'\u{1F512}'}</div>
      <div class="flex-1">
        <h3 class="card-title" style="color:${open?lv.color:'#8b7ec8'}">${lv.name}${lv.secret?' \u{1F510}':''}</h3>
        <p class="sub">${open?(lv.sub||''):(isNext?`\u00c0 d\u00e9bloquer \u2014 ${prog}/3 parties r\u00e9ussies`:'Bient\u00f4t\u2026')}</p>
      </div>
      <div class="arrow">${open?'\u2192':''}</div>
    </div>
  </div>`}).join('')}
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}

// Niveau verrouillé : on explique gentiment comment l'ouvrir.
function showLockedLevel(lvId){
  const lv=LEVELS.find(l=>l.id===lvId);
  const subj=subjectOfLevel(lvId);
  const top=topOpenLevel(subj);
  const prog=(profile.unlockProgress||{})[top&&top.id]||0;
  track('locked_level_tapped');
  if(top){
    toast('\u{1F512} Ce niveau s\'ouvrira apr\u00e8s 3 belles parties en \u00ab '+top.name+' \u00bb ('+prog+'/3)');
  }else{
    toast('\u{1F512} Continue de progresser pour ouvrir ce niveau !');
  }
}

/* ════════ LEÇONS INTERACTIVES ════════ */
const LECONS=[
  {id:"electricite",title:"Le Laboratoire Électrique",emoji:"⚡",color:"#ff9d3c",desc:"Circuits, courant, loi d'Ohm — avec un vrai circuit animé !",file:"lecons/electricite.html"},
  {id:"planetes",title:"Le Système Solaire",emoji:"🪐",color:"#ffc83c",desc:"Les 8 planètes qui tournent autour du Soleil",file:"lecons/planetes.html"},
  {id:"eau",title:"La Chimie de l'Eau",emoji:"💧",color:"#3cb4ff",desc:"H₂O : la molécule la plus importante de la Terre",file:"lecons/eau.html"},
  {id:"ondes-em",title:"Les Ondes Électromagnétiques",emoji:"📡",color:"#a064ff",desc:"Radio, lumière, rayons X — la même famille !",file:"lecons/ondes-em.html"},
  {id:"ondes-sonores",title:"Les Ondes Sonores",emoji:"🔊",color:"#64dca0",desc:"Comment le son voyage jusqu'à tes oreilles",file:"lecons/ondes-sonores.html"},
  {id:"cycle-eau",title:"Le Cycle de l'Eau",emoji:"🌧️",color:"#3ca0ff",desc:"Le voyage sans fin d'une goutte d'eau",file:"lecons/cycle-eau.html"},
  {id:"photosynthese",title:"La Photosynthèse",emoji:"🌿",color:"#3cc850",desc:"Comment les plantes fabriquent leur nourriture",file:"lecons/photosynthese.html"},
  {id:"volcans",title:"Les Volcans",emoji:"🌋",color:"#ff6428",desc:"Quand la Terre crache du feu",file:"lecons/volcans.html"},
  {id:"corps-humain",title:"Le Corps Humain",emoji:"🫀",color:"#dc5078",desc:"Explore la machine la plus incroyable",file:"lecons/corps-humain.html"},
  {id:"gravite",title:"Les Forces et la Gravité",emoji:"🍎",color:"#64a0ff",desc:"Pourquoi les choses tombent",file:"lecons/gravite.html"},
  {id:"lumiere",title:"La Lumière et les Couleurs",emoji:"🌈",color:"#ffc828",desc:"Pourquoi le ciel est bleu et l'arc-en-ciel a 7 couleurs",file:"lecons/lumiere.html"},
  {id:"atomes",title:"Les Atomes",emoji:"⚛️",color:"#50c8f0",desc:"Les briques qui composent tout l'univers",file:"lecons/atomes.html"}
];
function renderLecons(){
  app.innerHTML=`
    <div class="text-center fade-in py-6">
      <div style="font-size:3.5rem">🔬</div>
      <h2 class="title" style="color:#22d3ee;font-size:1.6rem">Leçons Interactives</h2>
      <p class="sub" style="color:var(--text-mid)">Des expériences animées pour comprendre la science</p>
    </div>
    ${LECONS.map((l,i)=>`
      <div class="kingdom-gate fade-in" style="animation-delay:${i*.07}s;--k-color:${l.color}" onclick="location.href='${l.file}'">
        <div class="kingdom-glow" style="background:radial-gradient(ellipse at 30% 50%,${l.color}18,transparent 70%)"></div>
        <div class="kingdom-border-glow" style="--k-color:${l.color}"></div>
        <div class="kingdom-inner">
          <div class="kingdom-mascot" style="font-size:3rem">${l.emoji}</div>
          <div class="kingdom-info">
            <h3 class="kingdom-name" style="color:${l.color}">${l.title}</h3>
            <p class="kingdom-stage">${l.desc}</p>
          </div>
          <div class="kingdom-enter" style="color:${l.color}">➔</div>
        </div>
      </div>
    `).join('')}
    <button class="btn-stone mt-4" onclick="navigate('home')">← Retour</button>
  `;
}

function renderNameAsk(){
  const hasProfiles=Object.keys(loadProfilesDict()).length>0;
  app.innerHTML=`<div class="card fade-in" style="margin-top:40px">
    <h2 class="title" style="color:#fbbf24;font-size:1.3rem">${hasProfiles?'Nouvel aventurier':"Comment t'appelles-tu ?"}</h2>
    <p style="color:#faf5ff;margin-bottom:16px">Ton prénom sera affiché dans ton Royaume.</p>
    <input class="name-prompt" id="nameInp" placeholder="Ton prénom" maxlength="20" value="${esc(profile.name||'')}">
    <button class="btn-fire" onclick="setName()">Entrer dans le Royaume →</button>
    ${hasProfiles?`<button class="btn-stone" style="width:100%;margin-top:12px" onclick="navigate('profilePicker')">← Choisir un profil existant</button>`:''}
  </div>`;
  setTimeout(()=>{const i=$('nameInp');if(i)i.focus();},100);
}
async function setName(){
  // Nettoie le prénom : retire les caractères dangereux (protection XSS).
  const v=$('nameInp').value.replace(/[<>"'&]/g,'').trim().slice(0,20);
  if(v.length<1){alert('Entre ton prénom');return}
  if(!isCleanName(v)){alert('Ce prénom contient un mot interdit. Choisis-en un autre.');return}
  const aid=await aidFromName(v);
  app.innerHTML='<div class="card text-center fade-in" style="margin-top:60px"><div class="big-icon">🔍</div><h2 class="title">Recherche de ton Royaume…</h2></div>';
  const dict=loadProfilesDict();
  // Lookup local insensible à la casse (« Judith » et « judith » = 1 profil).
  const localKey=Object.keys(dict).find(k=>k.toLowerCase()===v.toLowerCase());
  const local=localKey?migrate(dict[localKey]):null;
  // On récupère TOUTES les sources possibles puis on FUSIONNE :
  //  - le cloud sous la clé dérivée du prénom (standard)
  //  - le cloud sous l'ancienne clé du profil local si elle diffère
  //    (anciens profils poussés sous une clé aléatoire → introuvables
  //     par prénom depuis un autre appareil : on les rapatrie ici)
  const remoteName=await fetchProfileByAid(aid);
  let remoteOld=null;
  if(local&&local.aid&&local.aid!==aid) remoteOld=await fetchProfileByAid(local.aid);
  let merged=local;
  if(remoteName&&remoteName.name) merged=mergeProfiles(merged,migrate(remoteName));
  if(remoteOld&&remoteOld.name) merged=mergeProfiles(merged,migrate(remoteOld));
  if(merged&&merged.name){
    profile=merged;
  }else{
    profile=newProfile();
    profile.name=v;
  }
  // Standardise la clé sur le prénom : tous les appareils regarderont ici.
  profile.aid=aid;
  if(localKey&&localKey!==profile.name) delete dict[localKey];
  dict[profile.name]=profile;
  saveProfilesDict(dict);
  setActiveName(profile.name);
  saveProfile(); // pousse la version fusionnée au cloud (debounced)
  // Nouveau profil (aucune partie jouée, pas de classe connue) → on demande
  // l'âge/la classe. Un profil existant n'est jamais réinterrogé.
  if(profile.grade==null&&!(profile.totalGames>0)){ navigate('gradeAsk'); return }
  navigate('home');
}

/* ════════ ÉCRAN 2 DE L'INSCRIPTION : âge & classe ════════
   Demandé une seule fois, à la création du profil. Sert à ouvrir les bons
   niveaux dès le départ (et à verrouiller ceux qui viendront plus tard).
   Un enfant peut passer l'étape : dans ce cas tout reste ouvert, comme
   avant — aucune régression pour les profils existants. */
function renderGradeAsk(){
  const cur=profile.grade;
  app.innerHTML='<div class="card fade-in" style="margin-top:32px">'
    +'<h2 class="title" style="color:#fbbf24;font-size:1.3rem">Tu es en quelle classe, '+esc(profile.name)+' ?</h2>'
    +'<p style="color:#faf5ff;margin-bottom:14px">On ouvrira les niveaux qui te correspondent. Les suivants se débloqueront quand tu progresseras 🔓</p>'
    +'<div class="grade-grid">'
    +GRADES.map(g=>'<button class="grade-chip'+(cur===g.rank?' grade-on':'')+'" data-r="'+g.rank+'" onclick="pickGrade(+this.dataset.r)">'
        +'<span class="grade-name">'+g.name+'</span>'
        +'<span class="grade-age">'+g.age+' ans</span>'
      +'</button>').join('')
    +'</div>'
    +'<button class="btn-fire mt-4" id="gradeGo" onclick="confirmGrade()"'+(cur==null?' disabled style="opacity:.45"':'')+'>C\'est parti ! →</button>'
    +'<button class="btn-stone" style="width:100%;margin-top:10px" onclick="skipGrade()">Je préfère ne pas dire</button>'
  +'</div>';
}
function pickGrade(rank){
  profile.grade=rank;
  const g=gradeByRank(rank);
  if(g) profile.age=g.age;
  saveProfile();
  track('signup_grade_picked',{grade:g?g.id:''});
  renderGradeAsk();
}
function confirmGrade(){
  if(profile.grade==null){toast('Choisis ta classe pour continuer');return}
  if(!profile.unlocks) profile.unlocks={};
  saveProfile();
  track('signup_completed',{grade:(gradeByRank(profile.grade)||{}).id||''});
  const g=gradeByRank(profile.grade);
  toast('\u{1F393} Niveaux ' + (g?g.name:'') + ' ouverts ! Les suivants se débloqueront en jouant.','win');
  navigate('home');
}
function skipGrade(){
  profile.grade=null; profile.age=null;
  saveProfile();
  track('signup_grade_skipped');
  navigate('home');
}

/* ════════ SÉLECTEUR DE PROFIL (MULTI-UTILISATEUR) ════════ */
function renderProfilePicker(){
  const dict=loadProfilesDict();
  const active=getActiveName();
  const names=Object.keys(dict).sort((a,b)=>{
    if(a===active) return -1;
    if(b===active) return 1;
    return (dict[b].totalGames||0)-(dict[a].totalGames||0);
  });
  // Sécurité : jamais de donnée dynamique dans un onclick inline (le
  // navigateur décode les entités HTML AVANT d'exécuter le JS, donc esc()
  // ne protège pas ici). On passe par un index dans une liste mémorisée.
  window._profileNames=names;
  const cards=names.map((n,i)=>{
    const p=dict[n];
    const xp=(p.xp||0)+Object.values(p.royaumes||{}).reduce((s,r)=>s+(r.xp||0),0);
    return `<div class="card fade-in" style="animation-delay:${i*.06}s;cursor:pointer;border-color:#fbbf24" onclick="switchProfileIdx(${i})">
      <div class="row">
        <div style="font-size:2.4rem">🧙</div>
        <div class="flex-1">
          <h3 class="title" style="margin:0;font-size:1.15rem">${esc(n)}</h3>
          <p class="sub">✨ ${xp} XP · 🎮 ${p.totalGames||0} parties</p>
        </div>
        <div class="arrow">→</div>
      </div>
    </div>`;
  }).join('');
  const delBtns=names.map((n,i)=>`<button class="btn-stone btn-small" style="margin:4px" onclick="deleteProfileIdx(${i})">🗑️ ${esc(n)}</button>`).join('');
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div class="big-icon">👋</div>
    <h2 class="title">Qui joue aujourd'hui ?</h2>
    <p class="sub">Choisis ton profil ou crée-en un nouveau</p>
  </div>
  ${cards}
  <div class="card fade-in" style="cursor:pointer;border-color:#34d399" onclick="addNewProfile()">
    <div class="row">
      <div style="font-size:2.4rem">➕</div>
      <div class="flex-1"><h3 class="title" style="margin:0;font-size:1.1rem;color:#34d399">Nouvel aventurier</h3><p class="sub">Créer un nouveau profil</p></div>
    </div>
  </div>
  ${names.length>0?`<details style="margin-top:24px"><summary style="color:var(--text-dim);font-size:.85rem;cursor:pointer;text-align:center">Supprimer un profil</summary><div style="margin-top:12px;text-align:center">${delBtns}</div></details>`:''}`;
}

function switchProfileIdx(i){const n=(window._profileNames||[])[i];if(n!=null)switchProfile(n)}
function deleteProfileIdx(i){const n=(window._profileNames||[])[i];if(n!=null)deleteProfile(n)}
async function switchProfile(name){
  profile=loadProfileByName(name);
  const nameAid=await aidFromName(profile.name||name);
  const oldAid=(profile.aid&&profile.aid!==nameAid)?profile.aid:null;
  profile.aid=nameAid; // clé standard : celle que tous les appareils calculent
  setActiveName(profile.name);
  navigate('home');
  // Sync cloud en arrière-plan : FUSION (plus jamais d'écrasement), en
  // rapatriant aussi l'éventuelle ancienne clé aléatoire du profil.
  setTimeout(async()=>{
    try{
      if(oldAid){
        const old=await fetchProfileByAid(oldAid);
        if(old&&old.name){profile=mergeProfiles(profile,migrate(old));profile.aid=nameAid;_localSave()}
      }
      const result=await syncProfileFromCloud();
      if(result==='merged'&&state.screen==='home') render();
      pushProfileToCloud(); // le cloud reçoit toujours la meilleure version
    }catch(e){}
  },50);
}

function addNewProfile(){parentalGate(function(){_doAddNewProfile()})}
function _doAddNewProfile(){
  profile=newProfile();
  navigate('nameAsk');
}

function deleteProfile(name){
  if(!confirm('Supprimer le profil « '+name+' » sur cet appareil ? Action définitive.')) return;
  const dict=loadProfilesDict();
  delete dict[name];
  saveProfilesDict(dict);
  if(getActiveName()===name) setActiveName('');
  if(profile.name===name) profile=newProfile();
  navigate(Object.keys(dict).length>0?'profilePicker':'nameAsk');
}

// Barre « changer d'utilisateur » en pied de page : visible dès qu'un profil
// est actif, sauf sur les écrans de choix/création de profil.
function updateFooter(){
  const sw=$('userSwitch');
  if(!sw) return;
  const show=!!profile.name && state.screen!=='nameAsk' && state.screen!=='profilePicker';
  sw.classList.toggle('hidden',!show);
  if(show){const nm=$('footerUserName');if(nm)nm.textContent=profile.name;}
}

// Au démarrage : traiter un éventuel lien ?sync=AID entrant.
processIncomingSyncLink();

// Lien battle (?battle=CODE) : on stocke le code, renderHome le consommera
// dès qu'un profil est actif (gère aussi le 1er lancement sans profil).
(function(){
  try{
    const params=new URLSearchParams(window.location.search);
    const b=params.get('battle');
    if(!b) return;
    window.history.replaceState({},'',window.location.pathname);
    localStorage.setItem('royaume_pending_battle',b);
  }catch(e){}
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
      <h3 class="card-title" style="color:#fbbf24">${m.name}</h3>
      <p class="sub">${m.desc}</p></div></div></div>`).join('')}
  <div class="card mb-4" style="border-color:#c4b5fd;background:linear-gradient(145deg,rgba(139,92,246,.1),rgba(59,130,246,.1))">
    <h3 class="fredoka" style="color:#c4b5fd;font-size:.85rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">\u{1F52E} Forge du Dragon (IA)</h3>
    <p style="color:#faf5ff;font-size:.85rem;margin-bottom:6px">Le Dragon forge automatiquement de nouveaux d\u00e9fis quand tu en as besoin. Tu en as actuellement <strong style="color:#c4b5fd">${(profile.aiExercises||[]).filter(e=>e.lv===state.level).length} exercices IA</strong> disponibles pour ce niveau.</p>
    <p style="color:#8b7ec8;font-size:.75rem;margin-bottom:10px;font-style:italic">\u{1F4A1} Astuce : les exos AI ont des nombres et des sc\u00e9narios diff\u00e9rents \u00e0 chaque g\u00e9n\u00e9ration.</p>
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
// Un exercice n'est jouable que s'il est un vrai QCM à 4 choix.
// Les exos "oraux" (micro) n'ont pas de `ch` et il n'y a pas d'UI micro
// dans cette version : les inclure gelait la partie (renderGame plantait
// sur ex.ch.map). On les écarte de TOUS les modes.
function isPlayableEx(e){
  if(!e||e.oral) return false;
  if(e.type==='map') return !!(MAP_POINTS[e.map]&&e.target&&MAP_POINTS[e.map].some(p=>p.id===e.target));
  if(e.type==='map-country') return !!(e.target&&MAP_COUNTRIES[e.target]);
  if(e.type==='input') return Array.isArray(e.answers)&&e.answers.length>0&&typeof e.q==='string';
  return Array.isArray(e.ch)&&e.ch.length>=2&&e.ch.length<=4&&typeof e.ans==='number'&&e.ans>=0&&e.ans<e.ch.length;
}
// Réponse correcte d'un exo, quel que soit son format.
function exAnswerText(e){
  if(e.type==='map'){const p=((MAP_POINTS[e.map])||[]).find(x=>x.id===e.target);return p?p.name:''}
  if(e.type==='map-country'){const cy=MAP_COUNTRIES[e.target];return cy?cy.name:''}
  return e.type==='input'?(e.answers&&e.answers[0]||''):(e.ch&&e.ch[e.ans]||'');
}
// Normalisation pour comparer une réponse tapée (accents/casse/espaces).
function normAnswer(s){
  return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\u00e6\u0153]+/g,' ').replace(/\s+/g,' ').trim();
}
/* ════════ CARTES GÉO : villes de France & capitales d'Europe ════════
   Type d'exercice 'map' : l'enfant touche le bon point sur une carte SVG. */
const MAP_POINTS={
  france:[
    {id:'paris',name:'Paris',x:50.3,y:24.2,diff:1,se:"Paris, la capitale, est au nord, sur la Seine."},
    {id:'marseille',name:'Marseille',x:70.5,y:79.2,diff:2,se:"Marseille est le grand port du sud, sur la Méditerranée."},
    {id:'lyon',name:'Lyon',x:66.9,y:54.8,diff:2,se:"Lyon est au sud-est, au confluent du Rhône et de la Saône."},
    {id:'lille',name:'Lille',x:55.1,y:6.6,diff:2,se:"Lille est tout au nord, près de la Belgique."},
    {id:'nice',name:'Nice',x:83.1,y:75.1,diff:2,se:"Nice est au bord de la Méditerranée, tout près de l'Italie."},
    {id:'toulouse',name:'Toulouse',x:44.3,y:76.2,diff:3,se:"Toulouse, la « ville rose », est dans le sud-ouest."},
    {id:'bordeaux',name:'Bordeaux',x:30.8,y:64,diff:3,se:"Bordeaux est dans le sud-ouest, près de l'océan Atlantique."},
    {id:'strasbourg',name:'Strasbourg',x:86.3,y:27,diff:3,se:"Strasbourg est à l'est, en Alsace, à la frontière allemande."},
    {id:'nantes',name:'Nantes',x:24.3,y:40.4,diff:3,se:"Nantes est à l'ouest, sur la Loire, près de l'Atlantique."},
    {id:'montpellier',name:'Montpellier',x:60.5,y:76.1,diff:4,se:"Montpellier est dans le sud, près de la Méditerranée."},
    {id:'rennes',name:'Rennes',x:23.5,y:31.5,diff:4,se:"Rennes est la capitale de la Bretagne."},
    {id:'brest',name:'Brest',x:4.8,y:28.8,diff:4,se:"Brest est à la pointe de la Bretagne, tout à l'ouest."}
  ],
  europe:[
    {id:'paris',name:'Paris',gen:"de la France",x:29.4,y:44.6,diff:2,se:"Paris est la capitale de la France, à l'ouest de l'Europe."},
    {id:'londres',name:'Londres',gen:"du Royaume-Uni",x:23.5,y:34,diff:2,se:"Londres est la capitale du Royaume-Uni, sur l'île de Grande-Bretagne."},
    {id:'madrid',name:'Madrid',gen:"de l'Espagne",x:15,y:78.3,diff:2,se:"Madrid est au centre de l'Espagne, sur la péninsule Ibérique."},
    {id:'rome',name:'Rome',gen:"de l'Italie",x:53.6,y:72.4,diff:2,se:"Rome est la capitale de l'Italie, la « botte » au sud de l'Europe."},
    {id:'berlin',name:'Berlin',gen:"de l'Allemagne",x:55.7,y:29.9,diff:3,se:"Berlin est la capitale de l'Allemagne, au nord-est du pays."},
    {id:'bruxelles',name:'Bruxelles',gen:"de la Belgique",x:34.2,y:36.6,diff:3,se:"Bruxelles est la capitale de la Belgique, juste au nord de la France."},
    {id:'amsterdam',name:'Amsterdam',gen:"des Pays-Bas",x:35.5,y:30.5,diff:3,se:"Amsterdam est la capitale des Pays-Bas, au bord de la mer du Nord."},
    {id:'lisbonne',name:'Lisbonne',gen:"du Portugal",x:2.5,y:85.1,diff:3,se:"Lisbonne est la capitale du Portugal, tout à l'ouest de l'Europe, sur l'Atlantique."},
    {id:'athenes',name:'Athènes',gen:"de la Grèce",x:80.3,y:88.1,diff:3,se:"Athènes est la capitale de la Grèce, au sud-est de l'Europe."},
    {id:'berne',name:'Berne',gen:"de la Suisse",x:41.5,y:52.2,diff:4,se:"Berne est la capitale de la Suisse, au cœur des Alpes."},
    {id:'vienne',name:'Vienne',gen:"de l'Autriche",x:62.8,y:47.2,diff:4,se:"Vienne est la capitale de l'Autriche, sur le Danube."},
    {id:'prague',name:'Prague',gen:"de la Tchéquie",x:58.1,y:39.6,diff:4,se:"Prague est la capitale de la Tchéquie, en Europe centrale."},
    {id:'varsovie',name:'Varsovie',gen:"de la Pologne",x:73.8,y:31.1,diff:4,se:"Varsovie est la capitale de la Pologne, à l'est de l'Allemagne."},
    {id:'copenhague',name:'Copenhague',gen:"du Danemark",x:53.7,y:17.3,diff:4,se:"Copenhague est la capitale du Danemark, entre la mer du Nord et la Baltique."},
    {id:'stockholm',name:'Stockholm',gen:"de la Suède",x:66.8,y:2.7,diff:4,se:"Stockholm est la capitale de la Suède, en Scandinavie."},
    {id:'oslo',name:'Oslo',gen:"de la Norvège",x:49.4,y:1.5,diff:5,se:"Oslo est la capitale de la Norvège, à l'ouest de la Scandinavie."},
    {id:'dublin',name:'Dublin',gen:"de l'Irlande",x:8.9,y:26.6,diff:5,se:"Dublin est la capitale de l'Irlande, l'île à l'ouest de la Grande-Bretagne."},
    {id:'budapest',name:'Budapest',gen:"de la Hongrie",x:69.1,y:50,diff:5,se:"Budapest est la capitale de la Hongrie, sur le Danube."}
  ]
};
MAP_POINTS.france.forEach(p=>EX.push({id:'mapfr_'+p.id,lv:'geo-carte-france',cat:'Villes de France',diff:p.diff,type:'map',map:'france',target:p.id,q:'Où est '+p.name+' ? Touche le bon point sur la carte !',se:p.se,sk:'Carte de France'}));
MAP_POINTS.europe.forEach(p=>EX.push({id:'mapeu_'+p.id,lv:'geo-carte-europe',cat:"Capitales d'Europe",diff:p.diff,type:'map',map:'europe',target:p.id,q:'Où est '+p.name+', la capitale '+p.gen+' ? Touche le bon point !',se:p.se,sk:"Capitales d'Europe"}));

/* ════════ PLACER LES PAYS : vraies frontières tappables (Natural Earth) ════════ */
const MAP_COUNTRIES={
  no:{name:"la Norvège",path:"M97.9,-38.2 L93.8,-36.6 L91.9,-36.3 L92.9,-39.1 L89.8,-40.7 L86.1,-39.3 L85,-36.4 L82.7,-34.6 L80.1,-35.6 L77,-35.4 L74.4,-37.5 L73,-36.4 L71.5,-36.3 L71.1,-33.6 L66.7,-34.3 L66,-32 L63.7,-32.1 L62.2,-29.2 L59.8,-24.8 L56.1,-19.1 L57,-17.8 L56.1,-16.2 L53.8,-16.3 L52.2,-12.5 L52.4,-7.2 L53.9,-5.2 L53.1,-0.5 L51.1,2.3 L50.1,4.6 L48.5,2.1 L43.8,6.7 L40.6,7.7 L37.3,5.6 L36.4,1.3 L35.7,-7.9 L37.9,-10.5 L44.2,-13.8 L48.9,-17.9 L53.2,-23.5 L59,-31.2 L62.9,-34.3 L69.5,-39.3 L74.7,-41 L78.6,-40.8 L82.3,-44.1 L86.6,-43.9 L90.9,-44.7 L98.3,-41.8 L95.2,-40.7 L97.9,-38.2 Z"},
  fr:{name:"la France",path:"M38.5,42.1 L39.7,43.2 L43.1,43.9 L41.9,46.7 L41.6,49.5 L40.9,50.2 L39.9,49.8 L39.9,50.9 L38.2,53.1 L38.1,54.9 L39.3,54.3 L40.1,56 L40,57.2 L40.7,58.7 L39.9,59.9 L40.5,63 L41.8,63.5 L41.5,65.2 L39.4,67.5 L34.7,66.4 L31.2,67.7 L30.9,70.1 L28.2,70.6 L25.5,68.8 L24.6,69.7 L20.2,67.9 L19.3,66.3 L20.5,63.9 L21,55.9 L18.5,51.7 L16.8,49.7 L13.1,48.2 L12.9,45.3 L16,44.4 L20,45.4 L19.2,40.9 L21.5,42.6 L27,39.5 L27.7,36.2 L29.8,35.4 L30.1,36.8 L31.2,36.9 L32.4,38.5 L34,40.4 L35.2,40.1 L37.3,41.9 L37.9,42.2 L38.5,42.1 Z"},
  se:{name:"la Suède",path:"M50.1,4.6 L51.1,2.3 L53.1,-0.5 L53.9,-5.2 L52.4,-7.2 L52.2,-12.5 L53.8,-16.3 L56.1,-16.2 L57,-17.8 L56.1,-19.1 L59.8,-24.8 L62.2,-29.2 L63.7,-32.1 L66,-32 L66.7,-34.3 L71.1,-33.6 L71.5,-36.3 L73,-36.4 L76.1,-34.5 L79.9,-31.7 L79.9,-25.6 L80.7,-24 L76.6,-22.9 L74.3,-20.1 L74.7,-17.7 L70.9,-14.4 L66.3,-11 L64.6,-5.4 L66.3,-2.5 L68.5,-0.3 L66.4,4.2 L63.9,5.1 L63,11.8 L61.6,15.6 L58.7,15.2 L57.4,18.4 L54.6,18.6 L53.9,14.8 L51.9,10.2 L50.1,4.6 Z"},
  pl:{name:"la Pologne",path:"M79.7,24.4 L79.8,26.1 L80.5,27.6 L80.5,29.2 L79,30.1 L79.8,31.9 L79.8,33.7 L81,37.2 L80.8,38.3 L79.6,38.8 L77.4,42.1 L78,43.9 L77.5,43.7 L75.3,42.1 L73.5,42.7 L72.4,42.3 L71,43.1 L69.8,41.7 L68.8,42.3 L68.7,42 L67.6,40 L65.8,39.8 L65.6,38.5 L64,38.1 L63.6,39.1 L62.3,38.3 L62.5,37.2 L60.7,36.9 L59.6,35.6 L58.6,33 L58.8,31.6 L58.2,29.5 L57.3,28.1 L58,27 L57.4,25 L59.1,23.8 L62.8,21.9 L65.8,20.6 L68.1,21.3 L68.3,22.2 L70.6,22.3 L73.6,22.7 L77.9,22.7 L79.2,23.1 L79.7,24.4 Z"},
  at:{name:"l'Autriche",path:"M64.2,47.5 L64.1,49.1 L62.7,49.2 L63.2,50 L62.4,52.6 L61.9,53.3 L59.8,53.4 L58.6,54.3 L56.7,54 L53.3,52.9 L52.7,51.5 L50.4,52.2 L50.1,53 L48.7,52.4 L47.5,52.3 L46.4,51.6 L46.7,50.6 L46.7,49.9 L47.4,49.7 L48.6,50.8 L48.9,49.7 L51,49.9 L52.7,49.2 L53.9,49.3 L54.6,50.1 L54.8,49.4 L54.5,46.8 L55.3,46.3 L56.2,44.5 L57.9,45.8 L59.3,44.1 L60.1,43.8 L62,45.1 L63.1,44.9 L64.2,45.6 L64,46.1 L64.2,47.5 Z"},
  hu:{name:"la Hongrie",path:"M76.4,46.3 L77.7,47.4 L77.9,48.5 L76.4,49.3 L75.3,52 L73.9,54.7 L72,55.5 L70.5,55.3 L68.6,56.4 L67.8,57 L65.8,56.2 L64,54.5 L63.3,54 L62.8,52.6 L62.4,52.6 L63.2,50 L62.7,49.2 L64.1,49.1 L64.2,47.5 L65.4,48.5 L66.3,49 L68.3,48.5 L68.5,47.7 L69.5,47.6 L70.6,46.9 L70.9,47.2 L72,46.7 L72.6,45.7 L73.3,45.5 L75.9,46.7 L76.4,46.3 Z"},
  ro:{name:"la Roumanie",path:"M91,58 L92.1,58.8 L93.2,58.1 L94.3,58.8 L94.3,59.9 L93.2,60.7 L92.5,60.3 L91.8,65.2 L90.4,64.8 L88.7,63.3 L85.9,64.2 L84.7,65.2 L81.2,65 L79.4,64.4 L78.4,64.7 L77.8,63.1 L77.3,62.4 L77.9,61.7 L77.3,61.2 L76.5,62.1 L75.1,60.9 L75,59.3 L73.5,58.3 L73.2,57.1 L72,55.5 L73.9,54.7 L75.3,52 L76.4,49.3 L77.9,48.5 L78.9,47.6 L80.4,48.1 L81.9,48.1 L83,49.1 L83.8,48.4 L85.6,48.1 L86.2,47.1 L87.2,47.1 L87.9,47.5 L88.6,48.7 L89.4,50.4 L90.8,52.8 L90.9,54.5 L90.6,56.2 L91,58 Z"},
  de:{name:"l'Allemagne",path:"M57.4,25 L58,27 L57.3,28.1 L58.2,29.5 L58.8,31.6 L58.6,33 L59.6,35.6 L58.5,36 L57.9,35.5 L57.3,36.3 L55.6,37.1 L54.7,38.1 L52.9,38.9 L53.4,40.1 L53.6,41.8 L54.8,42.8 L56.2,44.5 L55.3,46.3 L54.5,46.8 L54.8,49.4 L54.6,50.1 L53.9,49.3 L52.7,49.2 L51,49.9 L48.9,49.7 L48.6,50.8 L47.4,49.7 L46.7,49.9 L44.1,48.7 L43.6,49.5 L41.6,49.5 L41.9,46.7 L43.1,43.9 L39.7,43.2 L38.5,42.1 L38.7,40.4 L38.2,39.5 L38.5,36.8 L38.1,32.6 L39.5,32.6 L40.1,31.1 L40.7,27.4 L40.3,26.1 L40.7,25.2 L42.7,25 L43.2,25.9 L44.8,23.9 L44.2,22.4 L44.1,20.1 L45.9,20.7 L47.4,20.1 L47.5,21.6 L49.9,22.5 L49.9,24 L52.3,23.2 L53.6,22.1 L56.3,23.7 L57.4,25 Z"},
  gr:{name:"la Grèce",path:"M86.4,98.8 L86.1,100 L82.7,100.3 L82.7,99.7 L79.8,98.9 L80.2,97.2 L81.5,98.5 L83.4,98.3 L85.2,98.6 L85.1,99.3 L86.4,98.8 Z M78.5,74.6 L80.2,74.8 L82.1,73.7 L83.8,75.1 L86,74.7 L86,72.7 L87.1,73.8 L86.4,76.3 L85.8,76.7 L84.4,76.6 L83.2,76.2 L80.3,77.3 L81.9,79.5 L80.7,80.2 L79.4,80.2 L78.1,78.1 L77.7,79 L78.2,81.4 L79.4,83.2 L78.5,84.1 L79.8,86 L81,87.1 L81,89.4 L78.8,88.3 L79.5,90.4 L78,90.8 L78.9,94.3 L77.4,94.4 L75.4,92.6 L74.5,89.4 L74.1,86.8 L73.2,84.9 L71.9,82.6 L71.8,81.5 L72.9,79.6 L73,78.3 L73.8,77.7 L73.9,76.6 L75.4,76.3 L76.3,75.4 L77.6,75.5 L78,74.8 L78.5,74.6 Z"},
  ch:{name:"la Suisse",path:"M46.7,49.9 L46.7,50.6 L46.4,51.6 L47.5,52.3 L48.7,52.4 L48.5,54.1 L47.4,54.7 L45.7,54.2 L45.2,55.9 L44,56 L43.6,55.3 L42.3,56.7 L41.1,56.9 L40.1,56 L39.3,54.3 L38.1,54.9 L38.2,53.1 L39.9,50.9 L39.9,49.8 L40.9,50.2 L41.6,49.5 L43.6,49.5 L44.1,48.7 L46.7,49.9 Z"},
  be:{name:"la Belgique",path:"M38.5,36.8 L38.2,39.5 L37.6,39.6 L37.3,41.9 L35.2,40.1 L34,40.4 L32.4,38.5 L31.2,36.9 L30.1,36.8 L29.8,35.4 L31.7,34.6 L33.4,34.9 L35.7,34.1 L37.2,35.8 L38.5,36.8 Z"},
  nl:{name:"les Pays-Bas",path:"M40.3,26.1 L40.7,27.4 L40.1,31.1 L39.5,32.6 L38.1,32.6 L38.5,36.8 L37.2,35.8 L35.7,34.1 L33.4,34.9 L31.7,34.6 L32.9,33.5 L35,27.6 L38.3,26 L40.3,26.1 Z"},
  pt:{name:"le Portugal",path:"M2.3,72.5 L3.2,71.5 L4.1,70.9 L4.7,72.8 L6.1,72.8 L6.5,72.3 L7.9,72.5 L8.6,74.5 L7.5,75.6 L7.5,78.7 L7.1,79.3 L7,81.2 L6,81.5 L6.9,83.9 L6.3,86.5 L7.1,87.7 L6.7,88.8 L5.9,90.3 L6.1,91.6 L5.1,92.6 L3.9,92.1 L2.6,92.5 L3,89.4 L2.8,86.9 L1.7,86.6 L1.1,85 L1.3,82.4 L2.3,81 L2.4,79.4 L2.9,77 L2.9,75.3 L2.4,73.8 L2.3,72.5 Z"},
  es:{name:"l'Espagne",path:"M6.1,91.6 L5.9,90.3 L6.7,88.8 L7.1,87.7 L6.3,86.5 L6.9,83.9 L6,81.5 L7,81.2 L7.1,79.3 L7.5,78.7 L7.5,75.6 L8.6,74.5 L7.9,72.5 L6.5,72.3 L6.1,72.8 L4.7,72.8 L4.1,70.9 L3.2,71.5 L2.3,72.5 L2.4,69.6 L1.4,67.9 L4.8,65 L7.7,65.7 L10.9,65.7 L13.5,66.4 L15.4,66.2 L19.3,66.3 L20.2,67.9 L24.6,69.7 L25.5,68.8 L28.2,70.6 L30.9,70.1 L31,72.4 L28.8,75.1 L25.7,75.9 L25.5,77.3 L24.1,79.5 L23.1,82.8 L24.1,85 L22.7,86.8 L22.2,89.4 L20.4,90.2 L18.7,93.3 L15.7,93.4 L13.4,93.3 L11.9,94.7 L11,96.2 L9.8,95.9 L9,94.5 L8.3,92.2 L6.1,91.6 Z"},
  ie:{name:"l'Irlande",path:"M9.1,24.5 L9.4,27.4 L7.6,31 L3.4,33.3 L0.1,32.7 L2,28.5 L0.7,24.5 L4,21.3 L5.8,19.5 L6.3,21.6 L5.8,23.8 L7.3,23.7 L9.1,24.5 Z"},
  it:{name:"l'Italie",path:"M48.7,52.4 L50.1,53 L50.4,52.2 L52.7,51.5 L53.3,52.9 L56.7,54 L56.4,55.9 L57,57.6 L55.1,57.1 L53.2,58.5 L53.3,60.5 L53,61.6 L53.8,63.6 L56,65.7 L57.2,69 L59.9,72.2 L61.7,72.2 L62.3,73 L61.6,73.8 L63.8,75.3 L65.5,76.5 L67.6,78.6 L67.8,79.3 L67.4,80.8 L66,78.9 L64,78.2 L63,80.8 L64.7,82.3 L64.4,84.4 L63.4,84.6 L62.1,88.1 L61.2,88.4 L61.2,87.1 L61.6,85 L62.2,84.1 L61.2,81.8 L60.5,79.8 L59.5,79.3 L58.8,77.6 L57.3,76.9 L56.3,75.2 L54.5,75 L52.6,73.2 L50.5,70.6 L48.8,68.3 L48.1,64.3 L46.9,63.9 L45,62.5 L43.9,63.1 L42.5,64.9 L41.5,65.2 L41.8,63.5 L40.5,63 L39.9,59.9 L40.7,58.7 L40,57.2 L40.1,56 L41.1,56.9 L42.3,56.7 L43.6,55.3 L44,56 L45.2,55.9 L45.7,54.2 L47.4,54.7 L48.5,54.1 L48.7,52.4 Z M59,87.4 L60.8,87.1 L59.9,90.2 L60.3,91.5 L59.8,93.5 L57.9,92 L56.7,91.6 L53.4,89.5 L53.7,87.5 L56.5,87.9 L59,87.4 Z M44.5,76.4 L45.7,75.2 L47.2,78 L46.8,83.3 L45.7,83 L44.8,84.4 L43.9,83.3 L43.8,78.5 L43.2,76.2 L44.5,76.4 Z"},
  dk:{name:"le Danemark",path:"M47.4,20.1 L45.9,20.7 L44.1,20.1 L43.1,17.9 L43.1,13.8 L43.5,12.8 L44.2,11.6 L46.2,11.3 L47.1,10.2 L49,9.1 L48.9,11.1 L48.2,12.4 L48.5,13.6 L49.8,14.2 L49.2,15.7 L48.5,15.2 L46.8,18.1 L47.4,20.1 Z"},
  gb:{name:"le Royaume-Uni",path:"M9.1,24.5 L7.3,23.7 L5.8,23.8 L6.3,21.6 L5.8,19.5 L7.8,19.3 L10.3,21.8 L9.1,24.5 Z M16.4,26.4 L16.8,24.1 L15.2,21.6 L12.3,20.8 L11.7,19.8 L12.6,18 L11.8,16.9 L10.5,18.8 L10.4,14.9 L9.2,12.9 L10,8.7 L11.9,5.5 L13.8,5.8 L16.7,5.5 L14.1,9.8 L16.5,9.2 L19.1,9.3 L18.5,12.5 L16.4,16.1 L18.8,16.4 L19,16.8 L21.2,21.5 L22.8,22.1 L24.3,26.7 L24.9,28.3 L27.8,29 L27.5,31.6 L26.3,32.8 L27.3,34.8 L25.1,36.9 L21.9,36.9 L17.9,38 L16.8,37.2 L15.2,39.1 L13,38.6 L11.3,40.2 L10.1,39.4 L13.5,35.2 L15.7,34.3 L11.9,33.6 L11.3,32 L13.8,30.8 L12.5,28.6 L12.9,26 L16.4,26.4 Z"},
  cz:{name:"la Tchéquie",path:"M59.6,35.6 L60.7,36.9 L62.5,37.2 L62.3,38.3 L63.6,39.1 L64,38.1 L65.6,38.5 L65.8,39.8 L67.6,40 L68.7,42 L68,42 L67.6,42.7 L67.1,42.9 L66.9,43.8 L66.5,44 L66.4,44.4 L65.6,44.8 L64.5,44.7 L64.2,45.6 L63.1,44.9 L62,45.1 L60.1,43.8 L59.3,44.1 L57.9,45.8 L56.2,44.5 L54.8,42.8 L53.6,41.8 L53.4,40.1 L52.9,38.9 L54.7,38.1 L55.6,37.1 L57.3,36.3 L57.9,35.5 L58.5,36 L59.6,35.6 Z"}
};
EX.push({id:'mapcy_no',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:4,type:'map-country',target:'no',q:'Où est '+MAP_COUNTRIES.no.name+' ? Touche le pays sur la carte !',se:"La Norvège est tout au nord — on voit sa pointe sud, autour d'Oslo.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_fr',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:1,type:'map-country',target:'fr',q:'Où est '+MAP_COUNTRIES.fr.name+' ? Touche le pays sur la carte !',se:"La France est à l'ouest de l'Europe, entre l'Atlantique et la Méditerranée.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_se',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:3,type:'map-country',target:'se',q:'Où est '+MAP_COUNTRIES.se.name+' ? Touche le pays sur la carte !',se:"La Suède est en Scandinavie — sur la carte on voit sa moitié sud.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_pl',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:3,type:'map-country',target:'pl',q:'Où est '+MAP_COUNTRIES.pl.name+' ? Touche le pays sur la carte !',se:"La Pologne est à l'est de l'Allemagne.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_at',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:4,type:'map-country',target:'at',q:'Où est '+MAP_COUNTRIES.at.name+' ? Touche le pays sur la carte !',se:"L'Autriche est à l'est de la Suisse, dans les Alpes.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_hu',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:4,type:'map-country',target:'hu',q:'Où est '+MAP_COUNTRIES.hu.name+' ? Touche le pays sur la carte !',se:"La Hongrie est en Europe centrale, traversée par le Danube.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_ro',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:4,type:'map-country',target:'ro',q:'Où est '+MAP_COUNTRIES.ro.name+' ? Touche le pays sur la carte !',se:"La Roumanie est à l'est, au bord de la mer Noire.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_de',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:2,type:'map-country',target:'de',q:'Où est '+MAP_COUNTRIES.de.name+' ? Touche le pays sur la carte !',se:"L'Allemagne est au centre de l'Europe, à l'est de la France.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_gr',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:2,type:'map-country',target:'gr',q:'Où est '+MAP_COUNTRIES.gr.name+' ? Touche le pays sur la carte !',se:"La Grèce est tout au sud-est, entourée par la mer Méditerranée.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_ch',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:3,type:'map-country',target:'ch',q:'Où est '+MAP_COUNTRIES.ch.name+' ? Touche le pays sur la carte !',se:"La Suisse est un petit pays de montagnes au cœur des Alpes.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_be',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:3,type:'map-country',target:'be',q:'Où est '+MAP_COUNTRIES.be.name+' ? Touche le pays sur la carte !',se:"La Belgique est un petit pays juste au nord de la France.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_nl',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:3,type:'map-country',target:'nl',q:'Où est '+MAP_COUNTRIES.nl.name+' ? Touche le pays sur la carte !',se:"Les Pays-Bas sont au bord de la mer du Nord, au nord de la Belgique.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_pt',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:2,type:'map-country',target:'pt',q:'Où est '+MAP_COUNTRIES.pt.name+' ? Touche le pays sur la carte !',se:"Le Portugal est tout à l'ouest, face à l'océan Atlantique.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_es',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:2,type:'map-country',target:'es',q:'Où est '+MAP_COUNTRIES.es.name+' ? Touche le pays sur la carte !',se:"L'Espagne occupe la majeure partie de la péninsule Ibérique, au sud-ouest.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_ie',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:3,type:'map-country',target:'ie',q:'Où est '+MAP_COUNTRIES.ie.name+' ? Touche le pays sur la carte !',se:"L'Irlande est l'île verte à l'ouest de la Grande-Bretagne.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_it',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:1,type:'map-country',target:'it',q:'Où est '+MAP_COUNTRIES.it.name+' ? Touche le pays sur la carte !',se:"L'Italie a la forme d'une botte qui plonge dans la Méditerranée.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_dk',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:4,type:'map-country',target:'dk',q:'Où est '+MAP_COUNTRIES.dk.name+' ? Touche le pays sur la carte !',se:"Le Danemark est une presqu'île entre l'Allemagne et la Suède.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_gb',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:2,type:'map-country',target:'gb',q:'Où est '+MAP_COUNTRIES.gb.name+' ? Touche le pays sur la carte !',se:"Le Royaume-Uni est une île au nord-ouest de la France.",sk:"Pays d'Europe"});
EX.push({id:'mapcy_cz',lv:'geo-carte-payseu',cat:"Pays d'Europe",diff:4,type:'map-country',target:'cz',q:'Où est '+MAP_COUNTRIES.cz.name+' ? Touche le pays sur la carte !',se:"La Tchéquie est entre l'Allemagne et la Pologne.",sk:"Pays d'Europe"});

/* ══════ ANTI-DOUBLON : jamais deux fois la même question ══════
   Trois couches, de la plus stricte à la plus tolérante :
   1. dedupeExercises() — dans une même partie, un id OU un énoncé ne peut
      apparaître qu'une seule fois. Garantie dure, appliquée à tous les modes
      (entraînement, chrono, progression, adaptatif, battle). Le doublon
      d'énoncé compte vraiment : l'IA regénère parfois la même question avec
      un id différent, et le pool statique + le pool parent peuvent se croiser.
   2. profile.recentExIds — mémoire glissante des 150 dernières questions
      jouées. Écartées du tirage pour ne pas revoir la même d'une partie
      à l'autre.
   3. Si tout écarter ne laisse pas assez d'exercices, on ré-admet les plus
      anciennes d'abord : mieux vaut un rappel espacé qu'une partie vide. */
const RECENT_MAX=150;
function _norm(t){
  return String(t||'').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    // On enlève la ponctuation et les espaces, mais on GARDE toutes les
    // écritures (hébreu, emoji, drapeaux…) : « Quelle lettre s'écrit ב ? » et
    // « Quelle lettre s'écrit א ? » sont deux questions différentes.
    .replace(/[\s!-\/:-@\[-`{-~\u00ab\u00bb\u2026\u2013\u2014\u201c\u201d\u2018\u2019]+/g,' ').trim();
}
/* Clé d'unicité d'une question = énoncé + réponses proposées (triées).
   Deux exercices peuvent légitimement partager un énoncé générique
   (« Quelle phrase est correcte ? ») avec des propositions différentes :
   ce ne sont PAS des doublons. En revanche, même énoncé + mêmes propositions
   (l'IA qui regénère, deux royaumes qui se recouvrent) → doublon. */
function _qKey(e){
  if(!e) return '';
  const ch=Array.isArray(e.ch)?e.ch.map(_norm).sort().join('|'):'';
  const extra=e.target?('@'+e.target):(e.flag?('@'+e.flag):'');
  return _norm(e.q)+'||'+ch+extra;
}
function dedupeExercises(list){
  const ids=new Set(),qs=new Set(),out=[];
  for(const e of (list||[])){
    if(!e) continue;
    const k=_qKey(e);
    if(e.id&&ids.has(e.id)) continue;
    if(k&&qs.has(k)) continue;
    if(e.id) ids.add(e.id);
    if(k) qs.add(k);
    out.push(e);
  }
  return out;
}
function recentExIds(){return Array.isArray(profile.recentExIds)?profile.recentExIds:[]}
// Enregistre les questions réellement jouées (appelé en fin de partie).
function rememberExercises(ids){
  try{
    const fresh=(ids||[]).filter(Boolean);
    if(!fresh.length) return;
    const kept=recentExIds().filter(id=>fresh.indexOf(id)<0);
    profile.recentExIds=kept.concat(fresh).slice(-RECENT_MAX);
  }catch(e){}
}
/* Écarte les questions récemment jouées. Ordre préservé pour les modes où
   il porte du sens (progression = par difficulté, adaptatif = par faiblesse). */
function _applyCooldown(candidates,n){
  const recent=recentExIds();
  if(!recent.length) return candidates;
  const rank=new Map(recent.map((id,i)=>[id,i])); // 0 = la plus ancienne
  const fresh=candidates.filter(e=>!rank.has(e.id));
  if(fresh.length>=n) return fresh;
  const stale=candidates.filter(e=>rank.has(e.id)).sort((a,b)=>rank.get(a.id)-rank.get(b.id));
  return fresh.concat(stale);
}
function finalizePick(candidates,n){
  return _applyCooldown(dedupeExercises(candidates),n).slice(0,n);
}
// fin anti-doublon

/* ── Drapeaux SUR LA CARTE (ÉTAPE demandée par Julien) ──
   Même carte tactile que « Pays d'Europe », mais la consigne est un drapeau :
   l'enfant voit 🇵🇹 et doit toucher le Portugal. Deux compétences d'un coup,
   reconnaître le drapeau ET situer le pays — et c'est le seul écran où
   drapeau et géographie se rencontrent vraiment. */
const MAP_FLAGS={
  no:'\u{1F1F3}\u{1F1F4}', fr:'\u{1F1EB}\u{1F1F7}', se:'\u{1F1F8}\u{1F1EA}', pl:'\u{1F1F5}\u{1F1F1}',
  at:'\u{1F1E6}\u{1F1F9}', hu:'\u{1F1ED}\u{1F1FA}', ro:'\u{1F1F7}\u{1F1F4}', de:'\u{1F1E9}\u{1F1EA}',
  gr:'\u{1F1EC}\u{1F1F7}', ch:'\u{1F1E8}\u{1F1ED}', be:'\u{1F1E7}\u{1F1EA}', nl:'\u{1F1F3}\u{1F1F1}',
  pt:'\u{1F1F5}\u{1F1F9}', es:'\u{1F1EA}\u{1F1F8}', ie:'\u{1F1EE}\u{1F1EA}', it:'\u{1F1EE}\u{1F1F9}',
  dk:'\u{1F1E9}\u{1F1F0}', gb:'\u{1F1EC}\u{1F1E7}', cz:'\u{1F1E8}\u{1F1FF}'
};
// Repère mémo + capitale : ce que l'enfant lit APRÈS avoir répondu.
const MAP_FLAG_HINTS={
  fr:['Paris','Bleu-blanc-rouge : trois bandes verticales.'],
  de:['Berlin','Noir, rouge, or : trois bandes horizontales.'],
  it:['Rome','Vert, blanc, rouge — et le pays a la forme d\u2019une botte.'],
  es:['Madrid','Rouge et jaune, avec les armoiries \u00e0 gauche.'],
  pt:['Lisbonne','Vert et rouge, avec une sph\u00e8re dor\u00e9e : le Portugal, tout \u00e0 l\u2019ouest.'],
  gb:['Londres','L\u2019Union Jack : des croix rouges et blanches crois\u00e9es.'],
  ie:['Dublin','Vert, blanc, orange \u2014 l\u2019\u00eele verte, \u00e0 l\u2019ouest du Royaume-Uni.'],
  be:['Bruxelles','Noir, jaune, rouge, juste au nord de la France.'],
  nl:['Amsterdam','Rouge, blanc, bleu horizontal, au bord de la mer du Nord.'],
  ch:['Berne','Une croix blanche sur fond rouge, carr\u00e9e, au c\u0153ur des Alpes.'],
  at:['Vienne','Rouge, blanc, rouge \u2014 \u00e0 l\u2019est de la Suisse.'],
  cz:['Prague','Blanc, rouge et un triangle bleu, entre Allemagne et Pologne.'],
  pl:['Varsovie','Blanc en haut, rouge en bas, \u00e0 l\u2019est de l\u2019Allemagne.'],
  hu:['Budapest','Rouge, blanc, vert \u2014 travers\u00e9e par le Danube.'],
  ro:['Bucarest','Bleu, jaune, rouge, au bord de la mer Noire.'],
  gr:['Ath\u00e8nes','Bandes bleues et blanches avec une croix \u2014 tout au sud-est.'],
  dk:['Copenhague','Croix blanche sur fond rouge, entre Allemagne et Su\u00e8de.'],
  se:['Stockholm','Croix jaune sur fond bleu, en Scandinavie.'],
  no:['Oslo','Croix bleue bord\u00e9e de blanc sur fond rouge, tout au nord.']
};
Object.keys(MAP_FLAGS).forEach(cid=>{
  const c=MAP_COUNTRIES[cid]; if(!c) return;
  const base=EX.find(e=>e.id==='mapcy_'+cid);
  const h=MAP_FLAG_HINTS[cid]||[];
  EX.push({
    id:'mapfg_'+cid, lv:'geo-carte-drapeaux', cat:'Drapeaux sur la carte',
    diff:(base&&base.diff)||3, type:'map-country', target:cid,
    flag:MAP_FLAGS[cid],
    q:'\u00c0 quel pays appartient ce drapeau ? Touche-le sur la carte !',
    se:'C\u2019est '+c.name+(h[0]?', dont la capitale est '+h[0]:'')+'.'+(h[1]?' '+h[1]:''),
    regle:h[1]||'', sk:'Drapeaux & carte d\u2019Europe'
  });
});

/* ══════ DIFFICULTÉ ADAPTATIVE, DOMAINE PAR DOMAINE ══════
   Le déblocage des paliers est déjà cloisonné par matière
   (profile.unlocks[matière]) : un enfant fort en maths ouvre les niveaux de
   maths sans que ça change quoi que ce soit en français. On ajoute ici le
   second étage, demandé par Julien : DANS un niveau ouvert, viser des
   questions plus dures quand il excelle DANS CE domaine — et plus douces
   quand il rame — au lieu d'un tirage uniforme. */
const MASTERY_WINDOW=8;          // dernières parties de la matière regardées
const MASTERY_MIN_GAMES=2;       // en dessous, on ne conclut rien
function subjectAccuracy(subjectId){
  const su=SUBJECTS.find(x=>x.id===subjectId);
  if(!su) return null;
  const lvIds=new Set((su.levels||[]).map(l=>l.id));
  const ses=profile.sessions||[];
  let score=0,total=0,games=0;
  for(let i=ses.length-1;i>=0&&games<MASTERY_WINDOW;i--){
    const x=ses[i];
    if(!x||!lvIds.has(x.level)||!x.total) continue;
    score+=(x.score||0);total+=x.total;games++;
  }
  return total>0?{acc:score/total,games:games}:null;
}
/* Fourchette de difficulté visée (1..5), ou null = tirage normal.
   Jamais bloquant : si la fourchette ne donne pas assez de questions,
   pickExercises complète en dehors plutôt que de rendre une partie courte. */
function targetDifficulty(subjectId){
  const m=subjectAccuracy(subjectId);
  if(!m||m.games<MASTERY_MIN_GAMES) return null;
  if(m.acc>=0.90) return {min:3,max:5,label:'expert'};
  if(m.acc>=0.75) return {min:2,max:5,label:'confirme'};
  if(m.acc<0.50)  return {min:1,max:3,label:'doux'};
  return null;
}
// fin maitrise

function pickExercises(mode,lvId){
  const lv=LEVELS.find(l=>l.id===lvId);
  // Inclure les exercices AI générés (persistés dans le profil)
  const aiPool=(profile.aiExercises||[]).filter(e=>e.lv===lvId);
  // Exercices personnalisés ajoutés par le parent (synchronisés cloud).
  const customPool=(profile.customExercises||[]).filter(e=>e.lv===lvId);
  // Toujours essayer le pool statique : tout niveau présent dans
  // exercises.js / exercises_extra.js a des exos prêts à l'emploi.
  const staticPool=EX.filter(e=>e.lv===lvId);
  const pool=staticPool.concat(aiPool).concat(customPool).filter(isPlayableEx);
  if(mode==='progression'){
    // finalizePick d'abord (dédoublonnage + cooldown), tri par difficulté ensuite :
    // l'ordre croissant doit rester vrai sur les 10 questions réellement tirées.
    return finalizePick(shuffle(EX.filter(e=>e.lv!=='cp'&&isPlayableEx(e))),10)
      .sort((a,b)=>a.diff-b.diff);
  }
  if(mode==='adaptive'){
    // Priorise les exercices rat\u00e9s ou jamais vus.
    // Ici on d\u00e9doublonne mais on n'applique PAS le cooldown : le mode adaptatif
    // existe justement pour refaire les questions rat\u00e9es r\u00e9cemment.
    return dedupeExercises(pool.slice().sort((a,b)=>{
      const sa=profile.exerciseStats[a.id]||{att:0,cor:0};
      const sb=profile.exerciseStats[b.id]||{att:0,cor:0};
      const scA=sa.att>0?sa.cor/sa.att:0.5;
      const scB=sb.att>0?sb.cor/sb.att:0.5;
      return scA-scB;
    })).slice(0,10);
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
  // Priorit\u00e9 aux jamais vus, puis les plus anciens.
  // Et à l'intérieur, priorité à la bonne fourchette de difficulté POUR CETTE
  // MATIÈRE : fort en maths ⇒ questions de maths plus dures, sans rien changer
  // aux autres royaumes.
  const band=targetDifficulty(subjectOfLevel(lvId));
  const inBand=e=>!band||((e.diff||3)>=band.min&&(e.diff||3)<=band.max);
  let candidates=shuffle(unseen.filter(inBand));
  if(candidates.length<10) candidates=candidates.concat(shuffle(unseen.filter(e=>!inBand(e))));
  if(candidates.length<10) candidates=candidates.concat(seen.filter(inBand),seen.filter(e=>!inBand(e)));
  return finalizePick(candidates,10);
}

async function startGame(mode){
  let exercises=pickExercises(mode,state.level);
  // Si pas d'exercices (sujet non-maths sans pool g\u00e9n\u00e9r\u00e9), g\u00e9n\u00e9rer maintenant
  if(exercises.length===0){
    // Aucun exercice statique ni IA pour ce niveau : on tente la génération IA
    // (avant : gate hasStatic — bloquait tout royaume non-maths si IA indispo).
    app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\u{1F52E}</div><h2 class="title">Le Dragon prépare tes défis...</h2><p class="sub">Première g\u00e9n\u00e9ration : 5 \u00e0 15 secondes</p></div>';
    try{
      await generateAIExercises(state.level,10);
      exercises=pickExercises(mode,state.level);
    }catch(e){
      alert('\u00c9chec g\u00e9n\u00e9ration : '+e.message);
      return;
    }
  }
  state.battleCode=null; // partie normale : ne jamais soumettre à une battle quittée en route
  state.mode=mode;state.exercises=exercises;state.idx=0;state.selected=null;state.score=0;state.streak=0;state.maxStreak=0;state.results=[];state.timer=60;state.gameOver=false;state.startTime=Date.now();state.detailOpen=false;state.sessionXP=0;state.sessionCristaux=0;state.chestsOpen=[];
  if(state.level) maybeAutoGenerate(state.level);
  navigate('game');
}

/* ── VISUEL PÉDAGOGIQUE D'UNE QUESTION (ÉTAPE 12/13) ──
   Le visuel se place TOUJOURS avant les réponses et n'est affiché que
   s'il apporte vraiment une information (drapeau à reconnaître, grille à
   compter…). Rien à télécharger : tout est rendu en emoji ou en SVG, donc
   ça marche hors ligne et ça ne coûte rien en bande passante. */
function renderQuestionVisual(ex){
  if(!ex) return '';
  if(ex.flag){
    return '<div class="q-visual q-visual-flag" role="img" aria-label="Drapeau à reconnaître">'+esc(ex.flag)+'</div>';
  }
  if(ex.visual&&ex.visualKind==='grid'){
    const rows=String(ex.visual).split('\n').map(r=>'<div class="q-grid-row">'+esc(r)+'</div>').join('');
    return '<div class="q-visual q-visual-grid" role="img" aria-label="'+esc(ex.visualAlt||'Grille de symboles à observer')+'">'+rows+'</div>';
  }
  return '';
}

/* ════════ GAME SCREEN ════════ */
/* ══════ CHEMIN DE QUÊTE (accès gamifié aux questions suivantes) ══════
   Au lieu d'une barre de progression muette, l'enfant voit le chemin complet :
   les questions déjà gagnées deviennent des étoiles, celle en cours pulse,
   les suivantes restent fermées, et des coffres jalonnent le parcours.
   Objectif : donner envie d'ouvrir la case d'après. Purement visuel —
   aucune question n'est réellement bloquée, le moteur de jeu est inchangé. */
const QUEST_CHESTS=[2,5,9]; // index 0-based : coffres après les Q3, Q6 et Q10

function renderQuestPath(){
  const total=state.exercises.length;
  if(!total) return '';
  const answered=state.idx+(state.selected!==null?1:0); // cases résolues
  const cells=[];
  for(let i=0;i<total;i++){
    const isChest=QUEST_CHESTS.indexOf(i)>=0;
    const r=state.results[i];
    let cls='qp-cell',inner;
    if(i<answered){
      if(r&&r.correct){cls+=' qp-ok';inner=isChest?'\u{1F48E}':'★'}
      else{cls+=' qp-ko';inner=isChest?'\u{1F48E}':'·'}
    }else if(i===answered){
      cls+=' qp-now';inner=String(i+1);
    }else{
      cls+=' qp-lock';inner=isChest?'\u{1F381}':'';
    }
    cells.push('<span class="'+cls+'" aria-hidden="true">'+inner+'</span>');
  }
  const done=state.results.filter(r=>r&&r.correct).length;
  return '<div class="qp-path" role="img" aria-label="Question '+Math.min(answered+1,total)+' sur '+total+', '+done+' réussies">'+cells.join('')+'</div>';
}

/* Récompense de palier : ouvre le coffre atteint et crédite des cristaux.
   Bonus renforcé si le tronçon depuis le coffre précédent est parfait. */
function questChestAward(){
  const i=state.idx;
  const ci=QUEST_CHESTS.indexOf(i);
  if(ci<0) return;
  if(!Array.isArray(state.chestsOpen)) state.chestsOpen=[];
  if(state.chestsOpen.indexOf(i)>=0) return;
  state.chestsOpen.push(i);
  const from=ci===0?0:QUEST_CHESTS[ci-1]+1;
  let good=0,tot=0;
  for(let k=from;k<=i;k++){
    const r=state.results[k];
    if(r){tot++;if(r.correct)good++}
  }
  if(!tot) return;
  const perfect=good===tot;
  const bonus=perfect?15:good*3;
  if(bonus<=0){toast('\u{1F381} Coffre manqué — le prochain est à toi !');return}
  state.sessionCristaux+=bonus;
  toast(perfect?'\u{1F381} Coffre PARFAIT ! \u{1F48E} +'+bonus:'\u{1F381} Coffre ouvert \u{1F48E} +'+bonus, perfect?'win':'');
}

function renderGame(){
  // Anti "réponse pré-surlignée" : reset de selected dès que l'index change
  // (équivalent useEffect sur questionIndex).
  if(state._qIdxRendered!==state.idx){state._qIdxRendered=state.idx;state.selected=null}
  let ex=state.exercises[state.idx];
  if(!ex) return finishGame();
  // Défense en profondeur : si un exo invalide s'est glissé dans la partie
  // (vieille sauvegarde, exo IA malformé), on le saute au lieu de geler.
  while(ex&&!isPlayableEx(ex)){
    state.exercises.splice(state.idx,1);
    ex=state.exercises[state.idx];
  }
  if(!ex) return finishGame();
  const total=state.exercises.length;
  const pct=(state.idx/total)*100;
  const lv=LEVELS.find(l=>l.id===ex.lv);
  let timerHTML='';
  if(state.mode==='challenge'&&state.selected===null&&!state.gameOver){
    const tc=state.timer>30?'#22c55e':state.timer>10?'#f7a020':'#ef4444';
    const tp=(state.timer/60)*100;
    timerHTML=`<div class="mb-4"><div class="row-between" style="font-size:.85rem;margin-bottom:4px"><span class="fredoka" style="color:#c4b5fd">Temps restant</span><span class="fredoka" style="font-weight:700;color:${tc}">${state.timer}s</span></div><div class="timer-track"><div class="timer-fill" style="width:${tp}%;background:${tc}"></div></div></div>`;
  }
  const streakHTML=state.streak>=2?`<span style="color:#f7a020">\u{1F525} ${state.streak}</span>`:'';
  const levelBadge=state.mode==='progression'?`<span class="badge" style="background:${lv.color}22;color:${lv.color};border-color:${lv.color}44;margin-left:6px">${lv.sub}</span>`:'';
  app.innerHTML=`<div style="margin:8px 0"><div class="row-between cinzel" style="font-size:.75rem;color:#8b7ec8;margin-bottom:4px">
    <span>Question ${state.idx+1}/${total}</span>
    <span>Score : ${state.score}/${state.idx+(state.selected!==null?1:0)}</span>
    ${streakHTML}</div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    ${renderQuestPath()}</div>
  ${timerHTML}
  <div class="card fade-in mt-3">
    <div class="row gap-2 mb-4" style="flex-wrap:wrap">
      <span class="badge">${esc(ex.cat)}</span>
      <span class="stars">${'\u2605'.repeat(ex.diff)}${'\u2606'.repeat(5-ex.diff)}</span>
      ${levelBadge}
    </div>
    ${renderQuestionVisual(ex)}
    <p style="font-size:clamp(1rem,2.5vw,1.2rem);color:#faf5ff;line-height:1.7;margin-bottom:24px">${esc(ex.q)}</p>
    ${ex.type==='map-country'
      ?renderCountryMapArea(ex)
      :ex.type==='map'
      ?renderMapArea(ex)
      :ex.type==='input'
      ?(state.selected===null
        ?`<input class="name-prompt" id="inputAnswer" placeholder="Écris ta réponse ici…" autocomplete="off" autocapitalize="off" onkeydown="if(event.key==='Enter')submitInputAnswer()">
          <button class="btn-fire" onclick="submitInputAnswer()">✅ Valider ma réponse</button>`
        :`<div class="choice-btn ${state.results[state.results.length-1]&&state.results[state.results.length-1].correct?'correct':'wrong'}" style="cursor:default">Ta réponse : ${esc(String(state.selected))}</div>
          ${state.results[state.results.length-1]&&state.results[state.results.length-1].correct?'':`<div class="choice-btn correct" style="cursor:default;margin-top:8px">Bonne réponse : ${esc(exAnswerText(ex))}</div>`}`)
      :`<div class="choices-grid">
      ${ex.ch.map((c,i)=>{let cls='choice-btn';if(state.selected!==null){if(i===ex.ans)cls+=' correct';else if(i===state.selected&&i!==ex.ans)cls+=' wrong'}const flagOnly=/^[\u{1F1E6}-\u{1F1FF}\s]+$/u.test(String(c));return `<button class="${cls}" ${state.selected!==null?'disabled':''} onclick="selectAnswer(${i})"${flagOnly?' style="font-size:2.4rem;text-align:center;line-height:1.2"':''}>${flagOnly?'':`<span class="choice-letter">${String.fromCharCode(65+i)}.</span>`}${esc(c)}</button>`}).join('')}
    </div>`}
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

function submitInputAnswer(){
  if(state.selected!==null||state.gameOver) return;
  const el=document.getElementById('inputAnswer');
  const val=el?el.value:'';
  if(!val.trim()){if(el)el.focus();return}
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  const ex=state.exercises[state.idx];
  const mine=normAnswer(val);
  const correct=(ex.answers||[]).some(a=>{
    const ref=normAnswer(a);
    if(ref===mine) return true;
    // Tolérance numérique : "12" == "12.0" == "12,0"
    const n1=parseFloat(mine.replace(',','.')),n2=parseFloat(ref.replace(',','.'));
    return !isNaN(n1)&&!isNaN(n2)&&n1===n2&&/^[-\d.,\s]+$/.test(mine);
  });
  state.selected=val;
  state.results.push({ex,choice:val,correct});
  if(correct){
    state.score++;state.streak++;
    if(state.streak>state.maxStreak)state.maxStreak=state.streak;
    const mult=state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1;
    state.sessionXP+=Math.round(ex.diff*10*mult);
    state.sessionCristaux+=ex.diff*2+(state.streak===3||state.streak===5||state.streak===10?10:0);
  }else{
    state.streak=0;
    if(state.mode==='progression')state.gameOver=true;
  }
  questChestAward();
  renderGame();
  showExplanation(ex,correct);
  if(correct){
    if(state.autoNextID)clearTimeout(state.autoNextID);
    state.autoNextID=setTimeout(()=>{state.autoNextID=null;if(state.screen==='game'&&state.selected!==null)nextQuestion()},1600);
  }
}

/* ── Exercices carte : rendu SVG + gestion du toucher ── */
/* Vraies frontières (Natural Earth, domaine public) — projection équirectangulaire
   France : bbox lon -5.2..9.8, lat 41.2..51.3 · Europe : lon -10..32, lat 35..60.
   Les coordonnées des points MAP_POINTS utilisent exactement la même projection. */
const MAP_SVG_PATHS={
  france:"M97.9,84.1 L97.7,85.6 L97.8,86 L98.1,86.3 L98.2,86.6 L98.4,90.5 L98.3,90.8 L97.5,92.4 L97.3,92.8 L97.3,94.7 L97.2,95.3 L96.9,95.8 L96.4,97.4 L95.9,98.2 L94.7,97.3 L94,96.9 L93.6,96.4 L93.4,96.2 L93.5,95.8 L93.9,95.4 L93.9,95 L93.1,94.7 L92.8,94.4 L92.8,94 L93,93.4 L92.9,92.8 L92.5,92.9 L92.1,92.8 L92.1,92.5 L92.4,92.1 L92.7,91.7 L92.7,91.1 L92.3,90.9 L91.9,90.5 L91.8,89.9 L92.1,89.5 L92.5,89.3 L92.2,88.7 L91.9,88.7 L91.8,88.5 L91.9,88.3 L92.3,87.9 L92.8,86.6 L93.4,86.1 L94.6,85.7 L95,85.5 L95.3,85.1 L95.6,84.8 L96,84.9 L96.4,85 L96.6,85.2 L96.8,85 L96.9,84.5 L96.8,84 L96.9,82.7 L97.1,82 L97.4,82 L97.8,82.4 L97.7,82.7 L97.8,83.6 L97.9,84.1 Z M85.4,36.7 L84.6,37.1 L84.5,37.5 L84.1,38.1 L83.6,38.3 L83.1,38.4 L82.7,38.3 L82.4,38.1 L82.5,37.9 L82.2,37.7 L81.7,37.7 L81.1,38.1 L80.7,38.7 L80.8,39 L81.2,39.1 L81.3,39.4 L81.2,39.6 L81,39.9 L80.1,41 L79.2,42 L79.1,42.3 L78.8,42.5 L77.7,43.1 L77.5,44.2 L77.4,45 L76.6,45.7 L75.7,46.4 L75.5,46.9 L75.4,47.4 L75.1,47.9 L75.1,48.2 L75.5,48.7 L75.4,49.1 L75.3,49.7 L74.9,50.1 L74.5,50.3 L74.5,51 L74.7,51.1 L75.2,51 L76,50.6 L76.5,50 L76.2,49.4 L76.8,48.6 L77.5,48.2 L78.5,48.1 L79.7,48.4 L79.8,48.8 L79.9,49.4 L80.1,49.7 L79.8,50.8 L80,51.2 L80.4,51.6 L80.6,52 L81,52.3 L81.4,52.9 L81.5,53.2 L80.9,53.8 L80,54.3 L79.9,54.6 L79.9,55 L80,55.4 L80.5,55.7 L81.1,56.6 L81.4,57.4 L82.2,58.2 L82.4,58.4 L82.3,58.6 L82.1,58.9 L81.9,60 L81.6,60.2 L81.2,60.2 L80.3,61 L79.9,60.9 L79.3,61 L78.9,61.2 L78.9,61.7 L79.3,62.2 L79.5,62.6 L79.6,63.2 L80,63.5 L80.6,63.8 L80.9,63.8 L81.3,64.1 L81.5,65.2 L81.4,65.5 L81.1,65.6 L80.9,66 L80.5,66.7 L80.3,67.2 L80.5,67.7 L80.6,68 L80.5,68.4 L80.7,68.9 L81.1,69.5 L82.3,70.3 L83.4,70.9 L83.8,71 L85.3,70.6 L85.6,70.6 L85.8,71.1 L85.8,71.5 L85.7,71.9 L85.3,72.6 L84.8,73.2 L84.6,73.6 L84.6,74 L84.6,74.6 L84.3,74.8 L84.2,74.6 L84,74.6 L83.9,74.9 L83.1,75.3 L82.5,75.6 L80.4,77.8 L79.4,78.5 L79.2,78.9 L79.1,79.6 L78.5,80.2 L78,80.5 L76.7,80.8 L75.4,81.5 L74.9,81.2 L73.4,81.2 L72.5,80.4 L70.7,79.9 L70.1,78.8 L69.3,78.7 L68.8,78.7 L68.5,78.6 L68.4,78.2 L68.4,77.8 L67.8,78 L67.4,78 L67.2,78.1 L67,78.3 L66.7,78.2 L66.6,78.4 L66.1,78.5 L65.5,78.3 L64.1,77.7 L63.8,77.7 L62.8,77.4 L62.4,77.2 L62.1,76.6 L61.8,76.4 L60.7,76.6 L60.4,77.1 L59.9,77.6 L56.4,80.3 L55.8,81.4 L55,83 L55,83.8 L55.3,86.2 L56,87.5 L56.1,87.8 L55.7,87.8 L55,87.6 L54.5,87.5 L54,87.6 L53.4,87.8 L53,88 L52.7,88 L52.5,88.2 L52.4,88.5 L52.3,88.7 L51.8,88.7 L50.5,88.2 L49.3,87.9 L48.6,88.2 L48.2,88.6 L47.9,88.5 L47.7,88.2 L47.5,87.9 L47.1,87.6 L46,87.1 L46.3,86.6 L46.1,86.1 L45.1,85.8 L44.7,85.7 L44.4,85.9 L44.2,86.2 L43.7,85.2 L43.3,85.1 L42.7,85 L42.1,84.7 L41.4,84.4 L39.8,83.8 L39.3,83.7 L39,84.2 L39,85.1 L38.9,85.3 L38.1,85.3 L37.2,85.2 L36.7,85.2 L36.4,85.2 L36,84.9 L34.4,85.3 L34.1,85.1 L33.7,84.7 L33.3,84.3 L33,84.1 L32.7,83.9 L32.4,83.9 L32,84.1 L31.5,84.2 L31,84.1 L29.7,83.1 L29.6,82.8 L29.1,82.7 L28.4,82.7 L26.8,82 L26.1,81.6 L26,81.2 L25.7,81.5 L25.5,81.8 L25.2,81.8 L24.9,81.7 L24.8,81.5 L24.9,81.1 L25.2,80.7 L25.3,80.2 L25.3,79.8 L24.9,79.5 L24.3,79.4 L23.8,79.4 L23.3,79.1 L23,79 L22.7,78.5 L22.7,78.1 L23.8,77.8 L24.8,76.6 L25.7,72.1 L26.4,66.7 L26.9,65.7 L27.5,65.4 L27,64.7 L26.7,65.1 L26.5,65.5 L26.4,65.7 L26.7,60.8 L27,59 L27.5,57.1 L28.4,57.8 L29.2,58.6 L29.6,59.3 L30.1,61.5 L30.4,61.9 L31,62.4 L30.8,61.9 L30.4,61.5 L29.8,58.6 L29.4,57.7 L28.8,57.1 L26.9,55.6 L26.7,55.3 L26.6,54.7 L27.2,54.8 L27.8,55 L27.7,54.7 L27.6,54.4 L27.3,53.2 L27.1,50.5 L27.1,50 L27,49.4 L26.4,49.3 L25.9,49.2 L25.4,49 L22.8,47.4 L21.9,45.7 L20.9,44.5 L20.7,43.9 L20.7,43.4 L21.2,42.2 L20.8,41.5 L20.4,41.3 L20,41 L20.4,40.4 L20.6,40 L21.1,39.9 L21.9,40 L22.5,40.3 L23,40.4 L21.5,39.5 L19,39.8 L18.4,39.7 L18,39.5 L17.8,38.8 L18.2,38.5 L18.5,37.9 L18.1,37.5 L17.6,37.4 L16.9,37.4 L16.2,37.5 L16,37.3 L16.4,36.6 L16.1,36.4 L15.6,36.5 L14.9,36.6 L14.2,36.4 L13.6,35.7 L13.2,35.7 L12.9,35.8 L12.5,35.5 L12,35.4 L11.7,35.5 L11.3,35.1 L8.7,34.3 L7.5,34.2 L6.5,34.6 L5.9,34.4 L5.5,33.9 L5.2,33 L3.5,32.3 L3.8,31.8 L4.6,31.7 L5.5,31.4 L5.8,31 L5.1,30.5 L4.6,30.4 L4.2,29.8 L4.5,29.6 L4.7,29.7 L5.3,29.8 L6.4,29.7 L6,29.2 L5.6,29.1 L4.5,29 L4.1,29.1 L3.2,29.1 L3,28.6 L2.9,28.2 L3.2,27.3 L4.5,26.5 L7.6,25.7 L9,25.8 L9.9,25.6 L11,25.1 L11.5,24.6 L13.1,24.3 L14.6,24.8 L16.1,26.7 L16.7,27.4 L18.4,26.3 L20.8,26.3 L21.3,26.9 L21.5,26.4 L22,25.8 L22.3,26 L22.5,26.4 L25.1,26.3 L25.5,26.2 L24.8,25.8 L24.2,24.7 L24.1,20.8 L23.4,19.7 L22.6,17.9 L22.2,16.9 L22.2,16.5 L22.3,16 L23.3,16 L24.1,16.2 L25.6,15.8 L26.3,16 L26.2,16.8 L26.4,17.9 L26.7,18.4 L27.1,18.9 L28.3,18.9 L29.6,19.2 L31.2,19.3 L33.6,19.8 L34.6,19.5 L35.6,18.8 L37.4,18.3 L37.6,18.1 L36.5,18.2 L35.5,17.7 L35.4,17.2 L35.5,16.8 L35.9,15.8 L38.8,14.2 L40.8,13.8 L43,12.9 L44,12 L44.8,10.8 L45,10.6 L45.3,10.4 L45,10 L45.2,5.6 L45.4,4.8 L45.8,4.1 L46.5,3.6 L47.4,3.1 L51,2.3 L51.5,2 L51.6,2.5 L51.8,3.1 L52,3.4 L51.9,3.8 L52,4.2 L52.5,4.8 L53.1,5.4 L53.6,5.8 L54.1,5.7 L54.8,5.3 L55.4,5.2 L55.7,5.5 L56.2,6.3 L56.3,7 L56.5,7.6 L56.8,7.8 L57.8,7.9 L58.6,8.2 L59.1,9.6 L59.3,9.8 L59.5,9.7 L59.7,9.5 L60.4,9.5 L61,9.5 L61.6,9.7 L62.5,10.4 L62.5,10.7 L62.3,11.1 L62.2,11.5 L62.6,11.9 L62.6,12.3 L62.3,12.6 L62.3,12.9 L62.3,13.2 L62.5,13.3 L63.8,13.4 L65,13.3 L65.7,12.8 L65.8,12.4 L66,11.9 L66.5,11.5 L66.8,11.3 L67.1,11.5 L66.6,13.3 L66.9,13.7 L67,14.4 L67.1,15 L67.5,15 L68,15.1 L68.4,15.3 L68.8,15.6 L69.4,16 L69.9,16.1 L70.4,16.6 L70.9,17.3 L71.4,17.7 L72.1,17.5 L72.7,17.4 L73.3,17.5 L73.5,17.8 L74,17.9 L74.2,18.1 L74.4,18.3 L74.7,18.4 L75.2,18.3 L75.5,18 L75.9,17.8 L76.3,17.9 L76.5,18.1 L77,18.3 L77.2,18.2 L77.7,18.4 L78.2,18.9 L78.4,19.3 L78.5,19.6 L78.7,19.9 L79.6,21.2 L79.8,21.2 L80.1,21 L80.3,20.8 L80.6,20.7 L81,20.8 L81.3,21 L81.5,21.6 L81.8,21.5 L82.1,21.5 L82.7,21.6 L83.4,21.5 L84,21.2 L84.3,21.3 L84.8,21.9 L85.4,22.2 L86.7,22.3 L88,22.7 L88.5,22.9 L88.9,23 L88.9,23.9 L87.5,25.8 L86.9,26.4 L86.6,27.3 L86.4,28.6 L86,29.9 L85.4,31.1 L85.2,32 L85.4,32.6 L85.3,33.6 L84.9,34.9 L84.9,35.9 L85.1,36.6 L85.4,36.7 Z M26.8,53.4 L26.6,54.3 L26.1,53.5 L25.5,52.8 L25.4,52.2 L25.4,52 L26.1,52.4 L26.8,53.4 Z",
  europe:"M77.9,22.7 L73.6,22.7 L70.6,22.3 L71.2,20.5 L74.4,19.2 L76.9,19.9 L78,20.6 L77.7,21.7 L77.9,22.7 Z M335.2,71.1 L334.9,70.4 L334.8,68.4 L336.1,68.3 L336.4,63.6 L335.8,60.1 L337.8,58.7 L340.7,59.4 L342.3,55.5 L343.1,51.1 L344,49.7 L345.3,46.1 L341.4,47.3 L339.3,48.8 L335.7,48.8 L334.7,45.1 L331.9,42.2 L327.8,41 L326.9,37 L326,34.6 L325.2,32.9 L323.7,28.8 L321.6,27.4 L318,26.2 L314.9,26.3 L311.9,27 L309.9,29 L311.3,29.9 L311.3,32.1 L310,33.4 L307.8,37.7 L307.8,39.4 L304.5,42 L301.6,40.4 L298.8,40.8 L297.5,39.4 L296.1,39 L292.6,41.8 L289.5,42.5 L287.3,43.5 L284.3,42.8 L282.1,42.9 L280.6,40.8 L278.3,38.9 L275.9,38.4 L272.9,38.9 L270.7,39.6 L267.3,38 L266.8,35 L264,33.9 L261.9,33.5 L259.2,31.8 L256.7,36 L257.7,38.3 L255.4,41.1 L251.9,40.1 L249.6,39.9 L248,38.1 L245.5,38 L243.4,36.8 L239.8,38.7 L235.2,42.1 L232.7,42.8 L231.8,43.1 L230.6,40.7 L227.5,41.2 L226.5,39.5 L224.8,38.8 L223.7,36.4 L222.3,35.7 L218.9,36.7 L215.6,34.4 L214.4,36.5 L209.1,26.4 L206,23.3 L206.9,22 L200.9,25.8 L198.6,26 L198.8,23.9 L195.8,22.5 L193.3,23.5 L192.5,19.3 L188.3,18.5 L186.1,20.1 L180.2,21.6 L179,22.6 L170.1,24 L169,25.3 L170.7,28.1 L168.4,29.1 L168.9,30.2 L166.6,32.2 L170.4,34.9 L169.9,36.8 L166.5,36.6 L165.8,37.8 L162.8,35.7 L159,35.8 L156.5,37.5 L153.6,35.9 L148.4,33.1 L144.7,33.2 L139.8,37.6 L139.5,40.5 L137,38.2 L135.1,42.6 L135.8,43.4 L134.4,46.4 L136.5,49.1 L138.2,49 L139.8,51.7 L139.5,53.8 L140.7,54.4 L139.6,56.8 L137.3,57.4 L135,61.6 L137.1,65.4 L136.9,68.1 L139.5,72.8 L138.1,74.4 L137.7,75.4 L136.6,75.1 L135,72.7 L134.3,72.6 L132.8,71.6 L132.1,70 L129.9,69.2 L128.4,69.8 L128,69 L124.8,67.1 L121.2,66.5 L119.2,65.8 L118.9,66.3 L115.9,62.9 L113.2,61.4 L111.1,59 L112.9,58.4 L114.8,55 L113.5,53.5 L117,51.8 L117,50.9 L114.8,51.6 L114.9,49.8 L116.1,48.7 L118.4,48.4 L118.8,47.1 L118.3,44.9 L119.2,42.8 L119.2,41.6 L115.7,40.3 L114.3,40.3 L112.8,38.5 L111,39.1 L108,37.7 L108,36.9 L107.2,35.2 L105.3,35 L105.1,33.7 L105.7,32.9 L104.2,30.7 L101.7,31 L101,30.8 L100.4,31.8 L99.5,31.6 L98.9,29 L98.3,27.7 L98.8,27.3 L100.7,27.5 L101.7,26.6 L101,25.5 L99.4,24.8 L99.5,24.1 L98.5,23.4 L97,20.8 L97.6,19.7 L97.3,17.8 L95,16.8 L93.7,17.3 L93.4,16.3 L90.9,15.3 L90.1,13 L89.9,11 L88.8,10.1 L89.8,8.8 L89.1,5.1 L90.8,2.8 L90.4,2.1 L93.1,-0.1 L90.6,-2 L95.7,-7.1 L97.9,-9.4 L98.8,-11.5 L95.3,-14.2 L96.3,-16.8 L94.2,-19.8 L95.8,-23.2 L93,-27.8 L95.2,-30.8 L91.5,-33.5 L91.9,-36.3 L93.8,-36.6 L97.9,-38.2 L100.3,-39.6 L104.2,-37.2 L110.7,-36.3 L119.7,-31.7 L121.6,-29.8 L121.7,-27.2 L119.1,-25.1 L115.2,-24 L104.6,-27 L102.8,-26.5 L106.7,-23.6 L106.9,-21.7 L107,-17.7 L110.1,-16.4 L111.9,-15.4 L112.2,-17.3 L110.8,-19.1 L112.3,-20.6 L118.1,-18.1 L120.1,-19.1 L118.5,-22 L124,-25.9 L126.2,-25.7 L128.5,-24.3 L129.8,-27 L127.9,-29.4 L129,-31.8 L127.3,-34.3 L133.9,-33 L135.3,-30.8 L132.3,-30.3 L132.3,-28 L134.2,-26.7 L137.8,-27.5 L138.4,-30.1 L143.4,-32 L151.7,-35.4 L153.5,-35.2 L151.2,-32.8 L154.1,-32.4 L155.8,-33.8 L160.3,-33.9 L163.8,-35.5 L166.5,-33.1 L169.2,-35.8 L166.7,-38.1 L168,-39.4 L175,-38.2 L178.3,-36.9 L186.9,-32.4 L188.5,-34.5 L186.1,-36.6 L186,-37.4 L183.2,-37.8 L184,-39.7 L182.7,-42.8 L182.6,-44.1 L187,-47.7 L188.6,-51.4 L190.3,-52.2 L196.6,-51.1 L197.1,-48.9 L194.9,-45.6 L196.4,-44.4 L197.1,-41.6 L196.6,-36.1 L199.2,-33.6 L198.2,-31 L193.5,-25.3 L196.2,-24.7 L197.2,-26.1 L199.8,-27.2 L200.4,-29.1 L202.5,-31 L201.1,-33.3 L202.2,-36 L199.6,-36.3 L199,-38.5 L201,-42.5 L197.9,-45.8 L202.1,-48.5 L201.6,-51.3 L202.8,-51.4 L204,-49.2 L203.1,-45.3 L205.6,-44.6 L204.5,-47.5 L208.5,-49.1 L213.5,-49.3 L217.9,-47 L215.7,-50.3 L215.5,-54.6 L219.6,-55.4 L225.4,-55.2 L230.5,-55.7 L228.6,-57.8 L231.3,-60.5 L234.1,-60.6 L238.7,-62.6 L245,-63.1 L245.8,-64.2 L252,-64.6 L254,-63.7 L259.3,-65.8 L263.7,-65.7 L264.4,-67.4 L266.6,-69.2 L272.3,-70.8 L276.3,-69.5 L273.1,-68.5 L278.5,-67.9 L279.1,-65.9 L281.3,-66.9 L288.3,-66.8 L293.6,-64.9 L295.6,-63.4 L295,-61.3 L292.3,-60.1 L286.1,-57.9 L284.3,-56.7 L287.2,-56.2 L290.8,-55.2 L292.9,-55.9 L294.1,-53.3 L295.2,-54.4 L299,-55 L306.6,-54.4 L307.2,-52.5 L317.1,-51.9 L317.3,-54.9 L322.3,-54.2 L326.1,-54.3 L330,-52.2 L331.1,-49.6 L329.7,-47.9 L332.7,-44.8 L336.4,-43.1 L338.7,-47.3 L342.5,-45.5 L346.6,-46.6 L351.2,-45.4 L352.9,-46.5 L356.8,-45.9 L355.1,-49.7 L358.3,-51.4 L379.8,-48.8 L381.8,-46.4 L388,-43.4 L397.6,-44.1 L402.4,-43.5 L404.4,-41.8 L404.1,-38.9 L407,-37.8 L410.2,-38.6 L414.4,-38.7 L418.9,-37.9 L423.4,-38.3 L427.6,-34.8 L430.5,-36.1 L428.6,-38.6 L429.6,-40.4 L437.2,-39.3 L442.2,-39.5 L449,-37.6 L-404.8,-35.9 L-398.9,-32.8 L-392.7,-28.8 L-392.9,-26.3 L-391.3,-25.3 L-391.8,-28.2 L-385.4,-27.6 L-380.7,-23.9 L-383.1,-22.2 L-387,-21.8 L-387,-17.8 L-388,-17 L-390.2,-17.1 L-392,-18.5 L-395.2,-19.7 L-395.7,-21.4 L-398.2,-22.1 L-400.9,-21.6 L-402.1,-23 L-401.6,-24.4 L-404.5,-23.5 L-403.4,-21.6 L-404.8,-19.9 L452.4,-19.9 L449.3,-18.1 L446.2,-18.4 L448.4,-16.3 L449.8,-13 L450.9,-11.9 L451.2,-10.3 L450.5,-9.2 L446.1,-10.1 L439.4,-7.1 L437.3,-6.6 L433.7,-3.8 L430.2,-1.3 L429.4,0.5 L426,-2.3 L419.7,0.8 L418.7,-0.6 L416.4,1.1 L413.2,0.5 L412.4,3.2 L409.6,7 L409.7,8.6 L412.4,9.5 L412,15.4 L409.8,15.5 L408.8,18.9 L409.8,20.6 L405.6,22.6 L404.8,27.2 L401.3,28.2 L400.5,32.2 L397.1,36 L396.2,33.2 L395.2,27.4 L393.9,18.5 L395,12.9 L397,10.5 L397.2,8.7 L400.9,7.8 L405.1,2.7 L409.2,-1.4 L413.5,-4.6 L415.4,-10.2 L412.5,-9.9 L411.1,-6.6 L405,-2.2 L403.1,-7.1 L397,-5.7 L391,1 L393,3.4 L387.6,4.5 L384,4.9 L384.1,2 L380.4,1.4 L377.5,3.3 L370.2,2.7 L362.4,3.8 L354.7,11.6 L345.5,21.1 L349.3,21.6 L350.5,24.1 L352.8,25 L354.3,23 L356.9,23.2 L360.3,27.6 L360.4,31 L358.6,35 L358.4,39.8 L357.3,46.2 L353.7,52 L352.9,54.8 L349.7,59.4 L346.5,64 L344.9,66.4 L341.8,68.8 L340.3,68.8 L338.8,66.9 L335.6,69.8 L335.2,71.1 Z M97.9,-38.2 L93.8,-36.6 L91.9,-36.3 L92.9,-39.1 L89.8,-40.7 L86.1,-39.3 L85,-36.4 L82.7,-34.6 L80.1,-35.6 L77,-35.4 L74.4,-37.5 L73,-36.4 L71.5,-36.3 L71.1,-33.6 L66.7,-34.3 L66,-32 L63.7,-32.1 L62.2,-29.2 L59.8,-24.8 L56.1,-19.1 L57,-17.8 L56.1,-16.2 L53.8,-16.3 L52.2,-12.5 L52.4,-7.2 L53.9,-5.2 L53.1,-0.5 L51.1,2.3 L50.1,4.6 L48.5,2.1 L43.8,6.7 L40.6,7.7 L37.3,5.6 L36.4,1.3 L35.7,-7.9 L37.9,-10.5 L44.2,-13.8 L48.9,-17.9 L53.2,-23.5 L59,-31.2 L62.9,-34.3 L69.5,-39.3 L74.7,-41 L78.6,-40.8 L82.3,-44.1 L86.6,-43.9 L90.9,-44.7 L98.3,-41.8 L95.2,-40.7 L97.9,-38.2 Z M38.5,42.1 L39.7,43.2 L43.1,43.9 L41.9,46.7 L41.6,49.5 L40.9,50.2 L39.9,49.8 L39.9,50.9 L38.2,53.1 L38.1,54.9 L39.3,54.3 L40.1,56 L40,57.2 L40.7,58.7 L39.9,59.9 L40.5,63 L41.8,63.5 L41.5,65.2 L39.4,67.5 L34.7,66.4 L31.2,67.7 L30.9,70.1 L28.2,70.6 L25.5,68.8 L24.6,69.7 L20.2,67.9 L19.3,66.3 L20.5,63.9 L21,55.9 L18.5,51.7 L16.8,49.7 L13.1,48.2 L12.9,45.3 L16,44.4 L20,45.4 L19.2,40.9 L21.5,42.6 L27,39.5 L27.7,36.2 L29.8,35.4 L30.1,36.8 L31.2,36.9 L32.4,38.5 L34,40.4 L35.2,40.1 L37.3,41.9 L37.9,42.2 L38.5,42.1 Z M46.4,118.8 L45.4,111.6 L43.9,110 L43.9,109 L41.9,106.6 L41.7,103.6 L43.2,101.4 L43.8,98.1 L43.4,94.3 L43.9,92.2 L46.5,90.6 L48.1,91.1 L48,93.1 L50.1,91.6 L50.2,92.4 L49,94.4 L49,96.2 L49.9,97.2 L49.5,100.7 L48,102.7 L48.4,104.9 L49.7,104.9 L50.3,106.8 L51.2,107.5 L51,110.5 L49.9,111.7 L49.1,113 L47.5,114.5 L47.8,116.1 L47.5,117.8 L46.4,118.8 Z M3.1,130.4 L3.2,129.6 L3.2,124.6 L7,121.7 L9.4,121.1 L11.3,120 L12.2,118 L15,116.4 L15.1,113.4 L16.5,113.1 L17.6,111.6 L20.7,111 L21.1,109.4 L20.5,108.5 L19.7,104.3 L19.5,101.9 L18.6,99.3 L20.9,97.1 L23.5,96.4 L25,94.8 L27.3,93.6 L31.3,92.9 L35.3,92.5 L36.5,93.1 L38.7,91.6 L41.3,91.5 L42.2,92.5 L43.9,92.2 L43.4,94.3 L43.8,98.1 L43.2,101.4 L41.7,103.6 L41.9,106.6 L43.9,109 L43.9,110 L45.4,111.6 L46.4,118.8 L47.2,122.3 L47.3,124.2 L46.9,127.4 L47,129.3 L46.7,131.4 L46.9,133.9 L46,135.6 L47.4,138.5 L47.5,140.3 L48.3,142.5 L49.5,141.7 L51.3,143.6 L52.4,146.1 L44.2,153.7 L37.3,161.6 L34,163.4 L31.3,163.8 L31.3,161.2 L30.2,160.6 L28.7,159.4 L28.2,157.6 L20.1,148.8 L12.1,140.1 L3.1,130.4 Z M50.1,4.6 L51.1,2.3 L53.1,-0.5 L53.9,-5.2 L52.4,-7.2 L52.2,-12.5 L53.8,-16.3 L56.1,-16.2 L57,-17.8 L56.1,-19.1 L59.8,-24.8 L62.2,-29.2 L63.7,-32.1 L66,-32 L66.7,-34.3 L71.1,-33.6 L71.5,-36.3 L73,-36.4 L76.1,-34.5 L79.9,-31.7 L79.9,-25.6 L80.7,-24 L76.6,-22.9 L74.3,-20.1 L74.7,-17.7 L70.9,-14.4 L66.3,-11 L64.6,-5.4 L66.3,-2.5 L68.5,-0.3 L66.4,4.2 L63.9,5.1 L63,11.8 L61.6,15.6 L58.7,15.2 L57.4,18.4 L54.6,18.6 L53.9,14.8 L51.9,10.2 L50.1,4.6 Z M90.9,15.3 L93.4,16.3 L93.7,17.3 L95,16.8 L97.3,17.8 L97.6,19.7 L97,20.8 L98.5,23.4 L99.5,24.1 L99.4,24.8 L101,25.5 L101.7,26.6 L100.7,27.5 L98.8,27.3 L98.3,27.7 L98.9,29 L99.5,31.6 L97.4,31.8 L96.7,32.7 L96.6,34.7 L95.6,34.3 L93.5,34.5 L92.8,33.6 L91.9,34.3 L91,33.7 L89.2,33.6 L86.5,32.7 L84.1,32.4 L82.3,32.4 L81,33.5 L79.8,33.7 L79.8,31.9 L79,30.1 L80.5,29.2 L80.5,27.6 L79.8,26.1 L79.7,24.4 L82,24.4 L84.6,22.9 L85.2,20.6 L87.1,19.3 L86.9,17.5 L88.3,16.9 L90.9,15.3 Z M99.5,31.6 L100.4,31.8 L101,30.8 L101.7,31 L104.2,30.7 L105.7,32.9 L105.1,33.7 L105.3,35 L107.2,35.2 L108,36.9 L108,37.7 L111,39.1 L112.8,38.5 L114.3,40.3 L115.7,40.3 L119.2,41.6 L119.2,42.8 L118.3,44.9 L118.8,47.1 L118.4,48.4 L116.1,48.7 L114.9,49.8 L114.8,51.6 L112.9,51.9 L111.3,53.2 L109.1,53.4 L107.1,54.9 L107.2,57.1 L106.8,56.9 L106.5,56.1 L105.7,56 L104,55.1 L103.4,56.1 L103.1,55.7 L99.4,54.7 L99.2,53.2 L97,53.7 L96.1,55.9 L94.3,58.8 L93.2,58.1 L92.1,58.8 L91,58 L91.6,57.6 L92.1,56.2 L92.7,55 L92.5,54.2 L93,53.9 L93.3,54.5 L94.7,54.6 L95.3,54.3 L94.9,53.9 L95,53.3 L94.2,52.3 L93.8,50.6 L93,50 L93.1,48.6 L92.1,47.5 L91.1,47.4 L89.3,46.1 L87.8,46.5 L87.2,47.1 L86.2,47.1 L85.6,48.1 L83.8,48.4 L83,49.1 L81.9,48.1 L80.4,48.1 L78.9,47.6 L77.9,48.5 L77.7,47.4 L76.4,46.3 L76.9,44.7 L77.5,43.7 L78,43.9 L77.4,42.1 L79.6,38.8 L80.8,38.3 L81,37.2 L79.8,33.7 L81,33.5 L82.3,32.4 L84.1,32.4 L86.5,32.7 L89.2,33.6 L91,33.7 L91.9,34.3 L92.8,33.6 L93.5,34.5 L95.6,34.3 L96.6,34.7 L96.7,32.7 L97.4,31.8 L99.5,31.6 Z M79.7,24.4 L79.8,26.1 L80.5,27.6 L80.5,29.2 L79,30.1 L79.8,31.9 L79.8,33.7 L81,37.2 L80.8,38.3 L79.6,38.8 L77.4,42.1 L78,43.9 L77.5,43.7 L75.3,42.1 L73.5,42.7 L72.4,42.3 L71,43.1 L69.8,41.7 L68.8,42.3 L68.7,42 L67.6,40 L65.8,39.8 L65.6,38.5 L64,38.1 L63.6,39.1 L62.3,38.3 L62.5,37.2 L60.7,36.9 L59.6,35.6 L58.6,33 L58.8,31.6 L58.2,29.5 L57.3,28.1 L58,27 L57.4,25 L59.1,23.8 L62.8,21.9 L65.8,20.6 L68.1,21.3 L68.3,22.2 L70.6,22.3 L73.6,22.7 L77.9,22.7 L79.2,23.1 L79.7,24.4 Z M64.2,47.5 L64.1,49.1 L62.7,49.2 L63.2,50 L62.4,52.6 L61.9,53.3 L59.8,53.4 L58.6,54.3 L56.7,54 L53.3,52.9 L52.7,51.5 L50.4,52.2 L50.1,53 L48.7,52.4 L47.5,52.3 L46.4,51.6 L46.7,50.6 L46.7,49.9 L47.4,49.7 L48.6,50.8 L48.9,49.7 L51,49.9 L52.7,49.2 L53.9,49.3 L54.6,50.1 L54.8,49.4 L54.5,46.8 L55.3,46.3 L56.2,44.5 L57.9,45.8 L59.3,44.1 L60.1,43.8 L62,45.1 L63.1,44.9 L64.2,45.6 L64,46.1 L64.2,47.5 Z M76.4,46.3 L77.7,47.4 L77.9,48.5 L76.4,49.3 L75.3,52 L73.9,54.7 L72,55.5 L70.5,55.3 L68.6,56.4 L67.8,57 L65.8,56.2 L64,54.5 L63.3,54 L62.8,52.6 L62.4,52.6 L63.2,50 L62.7,49.2 L64.1,49.1 L64.2,47.5 L65.4,48.5 L66.3,49 L68.3,48.5 L68.5,47.7 L69.5,47.6 L70.6,46.9 L70.9,47.2 L72,46.7 L72.6,45.7 L73.3,45.5 L75.9,46.7 L76.4,46.3 Z M87.2,47.1 L87.8,46.5 L89.3,46.1 L91.1,47.4 L92.1,47.5 L93.1,48.6 L93,50 L93.8,50.6 L94.2,52.3 L95,53.3 L94.9,53.9 L95.3,54.3 L94.7,54.6 L93.3,54.5 L93,53.9 L92.5,54.2 L92.7,55 L92.1,56.2 L91.6,57.6 L91,58 L90.6,56.2 L90.9,54.5 L90.8,52.8 L89.4,50.4 L88.6,48.7 L87.9,47.5 L87.2,47.1 Z M91,58 L92.1,58.8 L93.2,58.1 L94.3,58.8 L94.3,59.9 L93.2,60.7 L92.5,60.3 L91.8,65.2 L90.4,64.8 L88.7,63.3 L85.9,64.2 L84.7,65.2 L81.2,65 L79.4,64.4 L78.4,64.7 L77.8,63.1 L77.3,62.4 L77.9,61.7 L77.3,61.2 L76.5,62.1 L75.1,60.9 L75,59.3 L73.5,58.3 L73.2,57.1 L72,55.5 L73.9,54.7 L75.3,52 L76.4,49.3 L77.9,48.5 L78.9,47.6 L80.4,48.1 L81.9,48.1 L83,49.1 L83.8,48.4 L85.6,48.1 L86.2,47.1 L87.2,47.1 L87.9,47.5 L88.6,48.7 L89.4,50.4 L90.8,52.8 L90.9,54.5 L90.6,56.2 L91,58 Z M86.9,17.5 L87.1,19.3 L85.2,20.6 L84.6,22.9 L82,24.4 L79.7,24.4 L79.2,23.1 L77.9,22.7 L77.7,21.7 L78,20.6 L76.9,19.9 L74.4,19.2 L73.9,15.9 L76.7,14.7 L80.7,14.9 L83,14.5 L83.3,15.3 L84.6,15.6 L86.9,17.5 Z M88.8,10.1 L89.9,11 L90.1,13 L90.9,15.3 L88.3,16.9 L86.9,17.5 L84.6,15.6 L83.3,15.3 L83,14.5 L80.7,14.9 L76.7,14.7 L73.9,15.9 L74,12.9 L75.2,10.4 L77.4,9 L79.3,12 L81.2,11.9 L81.7,8.8 L83.7,8.1 L84.8,8.6 L86.8,10.1 L88.8,10.1 Z M90.4,2.1 L90.8,2.8 L89.1,5.1 L89.8,8.8 L88.8,10.1 L86.8,10.1 L84.8,8.6 L83.7,8.1 L81.7,8.8 L82,6.5 L81.1,7 L79.6,5.6 L79.4,3.2 L82.4,2.1 L85.4,1.6 L88,2.2 L90.4,2.1 Z M57.4,25 L58,27 L57.3,28.1 L58.2,29.5 L58.8,31.6 L58.6,33 L59.6,35.6 L58.5,36 L57.9,35.5 L57.3,36.3 L55.6,37.1 L54.7,38.1 L52.9,38.9 L53.4,40.1 L53.6,41.8 L54.8,42.8 L56.2,44.5 L55.3,46.3 L54.5,46.8 L54.8,49.4 L54.6,50.1 L53.9,49.3 L52.7,49.2 L51,49.9 L48.9,49.7 L48.6,50.8 L47.4,49.7 L46.7,49.9 L44.1,48.7 L43.6,49.5 L41.6,49.5 L41.9,46.7 L43.1,43.9 L39.7,43.2 L38.5,42.1 L38.7,40.4 L38.2,39.5 L38.5,36.8 L38.1,32.6 L39.5,32.6 L40.1,31.1 L40.7,27.4 L40.3,26.1 L40.7,25.2 L42.7,25 L43.2,25.9 L44.8,23.9 L44.2,22.4 L44.1,20.1 L45.9,20.7 L47.4,20.1 L47.5,21.6 L49.9,22.5 L49.9,24 L52.3,23.2 L53.6,22.1 L56.3,23.7 L57.4,25 Z M77.8,63.1 L78.4,64.7 L79.4,64.4 L81.2,65 L84.7,65.2 L85.9,64.2 L88.7,63.3 L90.4,64.8 L91.8,65.2 L90.6,66.8 L89.7,69.7 L90.5,72 L88.4,71.4 L86,72.7 L86,74.7 L83.8,75.1 L82.1,73.7 L80.2,74.8 L78.5,74.6 L78.3,72 L77.1,70.7 L77.5,70.2 L77.2,69.7 L77.6,68.4 L78.5,67.2 L77.4,65.4 L77.2,64 L77.8,63.1 Z M86.4,98.8 L86.1,100 L82.7,100.3 L82.7,99.7 L79.8,98.9 L80.2,97.2 L81.5,98.5 L83.4,98.3 L85.2,98.6 L85.1,99.3 L86.4,98.8 Z M78.5,74.6 L80.2,74.8 L82.1,73.7 L83.8,75.1 L86,74.7 L86,72.7 L87.1,73.8 L86.4,76.3 L85.8,76.7 L84.4,76.6 L83.2,76.2 L80.3,77.3 L81.9,79.5 L80.7,80.2 L79.4,80.2 L78.1,78.1 L77.7,79 L78.2,81.4 L79.4,83.2 L78.5,84.1 L79.8,86 L81,87.1 L81,89.4 L78.8,88.3 L79.5,90.4 L78,90.8 L78.9,94.3 L77.4,94.4 L75.4,92.6 L74.5,89.4 L74.1,86.8 L73.2,84.9 L71.9,82.6 L71.8,81.5 L72.9,79.6 L73,78.3 L73.8,77.7 L73.9,76.6 L75.4,76.3 L76.3,75.4 L77.6,75.5 L78,74.8 L78.5,74.6 Z M130.4,91.3 L129.3,92 L128.4,91 L125.7,90.5 L124.6,91.1 L121.9,91.7 L120.7,91.6 L117.9,93.1 L115.9,93.2 L114.7,92.4 L112.1,93.5 L111.3,92.7 L111.2,95 L110.5,95.8 L109.9,96.7 L109,94.9 L109.9,93.4 L108.5,93.7 L106.5,92.8 L104.8,95.1 L101.2,95.6 L99.3,93.4 L96.7,93.3 L96.2,94.9 L94.5,95.4 L92.2,93.3 L89.6,93.4 L88.2,89.4 L86.5,87.2 L87.6,84.1 L86.1,82.1 L88.8,78.3 L92.4,78.2 L93.4,75.1 L98,75.7 L100.8,73.1 L103.6,71.9 L107.5,71.8 L111.7,74.7 L115.1,76.2 L117.9,75.6 L119.9,75.9 L122.7,73.9 L125.3,73.7 L127.6,75.6 L128,77 L127.8,79 L129.5,80 L130.5,81.1 L128.8,82.3 L129.6,86.9 L129.1,88.1 L130.4,91.3 Z M86,72.7 L88.4,71.4 L90.5,72 L90.7,73.5 L92.8,74.8 L92.4,75.8 L89.6,76 L88.6,77.2 L86.6,79.4 L85.8,77.5 L85.8,76.7 L86.4,76.3 L87.1,73.8 L86,72.7 Z M73.9,76.6 L73.8,77.7 L73,78.3 L72.9,79.6 L71.8,81.5 L71.4,81.2 L71.3,80.3 L70,79 L69.8,77.1 L70,74.4 L70.3,73.1 L69.9,72.5 L69.8,71.2 L70.8,69.2 L71,70 L71.6,69.6 L72.1,70.7 L72.7,71.1 L72.8,72.6 L72.5,73.9 L72.9,75.7 L73.9,76.6 Z M63.3,54 L64,54.5 L65.8,56.2 L67.8,57 L68.6,56.4 L69.2,57.9 L70,59.1 L69.1,60.6 L68,59.7 L66.3,59.7 L64.3,59.1 L63.2,59.2 L62.7,60 L61.8,59.1 L61.3,60.7 L62.5,62.6 L63,63.8 L64.1,65.3 L65,66.2 L65.9,67.9 L68,69.4 L67.7,70.1 L65.5,68.6 L64.1,67.2 L61.9,66 L59.9,63 L60.4,62.7 L59.3,61 L59.3,59.7 L57.8,59.1 L57,60.8 L56.3,59.4 L56.4,58.1 L58.1,58.1 L58.6,57.5 L59.4,58.1 L60.3,58.2 L60.3,57.1 L61.1,56.7 L61.4,55 L63.3,54 Z M46.7,49.9 L46.7,50.6 L46.4,51.6 L47.5,52.3 L48.7,52.4 L48.5,54.1 L47.4,54.7 L45.7,54.2 L45.2,55.9 L44,56 L43.6,55.3 L42.3,56.7 L41.1,56.9 L40.1,56 L39.3,54.3 L38.1,54.9 L38.2,53.1 L39.9,50.9 L39.9,49.8 L40.9,50.2 L41.6,49.5 L43.6,49.5 L44.1,48.7 L46.7,49.9 Z M38.5,36.8 L38.2,39.5 L37.6,39.6 L37.3,41.9 L35.2,40.1 L34,40.4 L32.4,38.5 L31.2,36.9 L30.1,36.8 L29.8,35.4 L31.7,34.6 L33.4,34.9 L35.7,34.1 L37.2,35.8 L38.5,36.8 Z M40.3,26.1 L40.7,27.4 L40.1,31.1 L39.5,32.6 L38.1,32.6 L38.5,36.8 L37.2,35.8 L35.7,34.1 L33.4,34.9 L31.7,34.6 L32.9,33.5 L35,27.6 L38.3,26 L40.3,26.1 Z M2.3,72.5 L3.2,71.5 L4.1,70.9 L4.7,72.8 L6.1,72.8 L6.5,72.3 L7.9,72.5 L8.6,74.5 L7.5,75.6 L7.5,78.7 L7.1,79.3 L7,81.2 L6,81.5 L6.9,83.9 L6.3,86.5 L7.1,87.7 L6.7,88.8 L5.9,90.3 L6.1,91.6 L5.1,92.6 L3.9,92.1 L2.6,92.5 L3,89.4 L2.8,86.9 L1.7,86.6 L1.1,85 L1.3,82.4 L2.3,81 L2.4,79.4 L2.9,77 L2.9,75.3 L2.4,73.8 L2.3,72.5 Z M6.1,91.6 L5.9,90.3 L6.7,88.8 L7.1,87.7 L6.3,86.5 L6.9,83.9 L6,81.5 L7,81.2 L7.1,79.3 L7.5,78.7 L7.5,75.6 L8.6,74.5 L7.9,72.5 L6.5,72.3 L6.1,72.8 L4.7,72.8 L4.1,70.9 L3.2,71.5 L2.3,72.5 L2.4,69.6 L1.4,67.9 L4.8,65 L7.7,65.7 L10.9,65.7 L13.5,66.4 L15.4,66.2 L19.3,66.3 L20.2,67.9 L24.6,69.7 L25.5,68.8 L28.2,70.6 L30.9,70.1 L31,72.4 L28.8,75.1 L25.7,75.9 L25.5,77.3 L24.1,79.5 L23.1,82.8 L24.1,85 L22.7,86.8 L22.2,89.4 L20.4,90.2 L18.7,93.3 L15.7,93.4 L13.4,93.3 L11.9,94.7 L11,96.2 L9.8,95.9 L9,94.5 L8.3,92.2 L6.1,91.6 Z M9.1,24.5 L9.4,27.4 L7.6,31 L3.4,33.3 L0.1,32.7 L2,28.5 L0.7,24.5 L4,21.3 L5.8,19.5 L6.3,21.6 L5.8,23.8 L7.3,23.7 L9.1,24.5 Z M48.7,52.4 L50.1,53 L50.4,52.2 L52.7,51.5 L53.3,52.9 L56.7,54 L56.4,55.9 L57,57.6 L55.1,57.1 L53.2,58.5 L53.3,60.5 L53,61.6 L53.8,63.6 L56,65.7 L57.2,69 L59.9,72.2 L61.7,72.2 L62.3,73 L61.6,73.8 L63.8,75.3 L65.5,76.5 L67.6,78.6 L67.8,79.3 L67.4,80.8 L66,78.9 L64,78.2 L63,80.8 L64.7,82.3 L64.4,84.4 L63.4,84.6 L62.1,88.1 L61.2,88.4 L61.2,87.1 L61.6,85 L62.2,84.1 L61.2,81.8 L60.5,79.8 L59.5,79.3 L58.8,77.6 L57.3,76.9 L56.3,75.2 L54.5,75 L52.6,73.2 L50.5,70.6 L48.8,68.3 L48.1,64.3 L46.9,63.9 L45,62.5 L43.9,63.1 L42.5,64.9 L41.5,65.2 L41.8,63.5 L40.5,63 L39.9,59.9 L40.7,58.7 L40,57.2 L40.1,56 L41.1,56.9 L42.3,56.7 L43.6,55.3 L44,56 L45.2,55.9 L45.7,54.2 L47.4,54.7 L48.5,54.1 L48.7,52.4 Z M59,87.4 L60.8,87.1 L59.9,90.2 L60.3,91.5 L59.8,93.5 L57.9,92 L56.7,91.6 L53.4,89.5 L53.7,87.5 L56.5,87.9 L59,87.4 Z M44.5,76.4 L45.7,75.2 L47.2,78 L46.8,83.3 L45.7,83 L44.8,84.4 L43.9,83.3 L43.8,78.5 L43.2,76.2 L44.5,76.4 Z M47.4,20.1 L45.9,20.7 L44.1,20.1 L43.1,17.9 L43.1,13.8 L43.5,12.8 L44.2,11.6 L46.2,11.3 L47.1,10.2 L49,9.1 L48.9,11.1 L48.2,12.4 L48.5,13.6 L49.8,14.2 L49.2,15.7 L48.5,15.2 L46.8,18.1 L47.4,20.1 Z M9.1,24.5 L7.3,23.7 L5.8,23.8 L6.3,21.6 L5.8,19.5 L7.8,19.3 L10.3,21.8 L9.1,24.5 Z M16.4,26.4 L16.8,24.1 L15.2,21.6 L12.3,20.8 L11.7,19.8 L12.6,18 L11.8,16.9 L10.5,18.8 L10.4,14.9 L9.2,12.9 L10,8.7 L11.9,5.5 L13.8,5.8 L16.7,5.5 L14.1,9.8 L16.5,9.2 L19.1,9.3 L18.5,12.5 L16.4,16.1 L18.8,16.4 L19,16.8 L21.2,21.5 L22.8,22.1 L24.3,26.7 L24.9,28.3 L27.8,29 L27.5,31.6 L26.3,32.8 L27.3,34.8 L25.1,36.9 L21.9,36.9 L17.9,38 L16.8,37.2 L15.2,39.1 L13,38.6 L11.3,40.2 L10.1,39.4 L13.5,35.2 L15.7,34.3 L11.9,33.6 L11.3,32 L13.8,30.8 L12.5,28.6 L12.9,26 L16.4,26.4 Z M56.7,54 L58.6,54.3 L59.8,53.4 L61.9,53.3 L62.4,52.6 L62.8,52.6 L63.3,54 L61.4,55 L61.1,56.7 L60.3,57.1 L60.3,58.2 L59.4,58.1 L58.6,57.5 L58.1,58.1 L56.5,58 L57,57.6 L56.4,55.9 L56.7,54 Z M91.9,-36.3 L91.5,-33.5 L95.2,-30.8 L93,-27.8 L95.8,-23.2 L94.2,-19.8 L96.3,-16.8 L95.3,-14.2 L98.8,-11.5 L97.9,-9.4 L95.7,-7.1 L90.6,-2 L86.3,-1.7 L82.1,-0.2 L78.3,0.6 L76.9,-1.6 L74.6,-2.9 L75.1,-6.8 L73.9,-10.4 L75.1,-12.8 L77.2,-15.3 L82.7,-19.6 L84.3,-20.4 L84,-22.1 L80.7,-24 L79.9,-25.6 L79.9,-31.7 L76.1,-34.5 L73,-36.4 L74.4,-37.5 L77,-35.4 L80.1,-35.6 L82.7,-34.6 L85,-36.4 L86.1,-39.3 L89.8,-40.7 L92.9,-39.1 L91.9,-36.3 Z M77.5,43.7 L76.9,44.7 L76.4,46.3 L75.9,46.7 L73.3,45.5 L72.6,45.7 L72,46.7 L70.9,47.2 L70.6,46.9 L69.5,47.6 L68.5,47.7 L68.3,48.5 L66.3,49 L65.4,48.5 L64.2,47.5 L64,46.1 L64.2,45.6 L64.5,44.7 L65.6,44.8 L66.4,44.4 L66.5,44 L66.9,43.8 L67.1,42.9 L67.6,42.7 L68,42 L68.7,42 L68.8,42.3 L69.8,41.7 L71,43.1 L72.4,42.3 L73.5,42.7 L75.3,42.1 L77.5,43.7 Z M59.6,35.6 L60.7,36.9 L62.5,37.2 L62.3,38.3 L63.6,39.1 L64,38.1 L65.6,38.5 L65.8,39.8 L67.6,40 L68.7,42 L68,42 L67.6,42.7 L67.1,42.9 L66.9,43.8 L66.5,44 L66.4,44.4 L65.6,44.8 L64.5,44.7 L64.2,45.6 L63.1,44.9 L62,45.1 L60.1,43.8 L59.3,44.1 L57.9,45.8 L56.2,44.5 L54.8,42.8 L53.6,41.8 L53.4,40.1 L52.9,38.9 L54.7,38.1 L55.6,37.1 L57.3,36.3 L57.9,35.5 L58.5,36 L59.6,35.6 Z M18.6,99.3 L19.5,101.9 L19.7,104.3 L20.5,108.5 L21.1,109.4 L20.7,111 L17.6,111.6 L16.5,113.1 L15.1,113.4 L15,116.4 L12.2,118 L11.3,120 L9.4,121.1 L7,121.7 L3.2,124.6 L3.2,129.4 L2.8,129.4 L2.9,131.5 L1.4,131.6 L0.6,132.6 L-0.5,132.6 L-1.3,132 L-3.3,132.5 L-4.1,135.6 L-4.8,135.9 L-6,140.9 L-9.3,145.2 L-10.1,150.8 L-11,152.6 L-11.3,154 L-16.7,154.3 L-16.6,152.5 L-15.7,151.4 L-14.9,149.3 L-15.1,147.9 L-14.2,145.1 L-12.9,142.6 L-12.1,141.9 L-11.5,139.6 L-11.4,137.5 L-10.6,135 L-9,133.5 L-7.5,129.4 L-6.2,127.8 L-4,127.4 L-2.1,124.7 L-0.9,123.6 L1,120.3 L0.4,115.3 L1.3,111.9 L1.7,109.7 L3.2,107 L5.6,105.2 L7.3,103.6 L8.9,99.4 L9.7,97 L11.4,97 L12.9,98.7 L15.1,98.4 L17.6,99.3 L18.6,99.3 Z M68,69.4 L65.9,67.9 L65,66.2 L64.1,65.3 L63,63.8 L62.5,62.6 L61.3,60.7 L61.8,59.1 L62.7,60 L63.2,59.2 L64.3,59.1 L66.3,59.7 L68,59.7 L69.1,60.6 L69.9,60.5 L69.3,62.3 L70.5,63.8 L70.1,65.7 L69.6,65.9 L69.1,66.3 L68.4,67.2 L68,69.4 Z M77.1,70.7 L78.3,72 L78.5,74.6 L78,74.8 L77.6,75.5 L76.3,75.4 L75.4,76.3 L73.9,76.6 L72.9,75.7 L72.5,73.9 L72.8,72.6 L73.1,72.6 L73.2,71.8 L74.7,71.2 L75.2,71 L76,70.8 L77.1,70.7 Z M68.6,56.4 L70.5,55.3 L72,55.5 L73.2,57.1 L73.5,58.3 L75,59.3 L75.1,60.9 L76.5,62.1 L77.3,61.2 L77.9,61.7 L77.3,62.4 L77.8,63.1 L77.2,64 L77.4,65.4 L78.5,67.2 L77.6,68.4 L77.2,69.7 L77.5,70.2 L77.1,70.7 L76,70.8 L75.2,71 L75.1,70.7 L75.4,70.2 L75.7,69.3 L75.3,69.3 L74.9,68.5 L74.5,68.4 L74.2,67.7 L73.7,67.5 L73.4,66.9 L72.9,67.1 L72.6,68.5 L72,68.8 L72.2,68.4 L71.3,67.6 L70.5,67.1 L70.2,66.6 L69.6,65.9 L70.1,65.7 L70.5,63.8 L69.3,62.3 L69.9,60.5 L69.1,60.6 L70,59.1 L69.2,57.9 L68.6,56.4 Z M71.6,69.6 L71,70 L70.8,69.2 L69.8,71.2 L69.9,72.5 L69.4,72.2 L68.8,70.9 L67.7,70.1 L68,69.4 L68.4,67.2 L69.1,66.3 L69.6,65.9 L70.2,66.6 L70.5,67.1 L71.3,67.6 L72.2,68.4 L72,68.8 L71.6,69.6 Z M72.8,72.6 L72.7,71.1 L72.1,70.7 L71.6,69.6 L72,68.8 L72.6,68.5 L72.9,67.1 L73.4,66.9 L73.7,67.5 L74.2,67.7 L74.5,68.4 L74.9,68.5 L75.3,69.3 L75.7,69.3 L75.4,70.2 L75.1,70.7 L75.2,71 L74.7,71.2 L73.2,71.8 L73.1,72.6 L72.8,72.6 Z"
};
function mapSVG(kind){
  return '<svg viewBox="0 0 100 100" aria-hidden="true"><path class="map-land" d="'+MAP_SVG_PATHS[kind]+'"/></svg>';
}
function renderMapArea(ex){
  const pts=MAP_POINTS[ex.map]||[];
  const done=state.selected!==null;
  return '<div class="map-wrap">'+mapSVG(ex.map)
    +pts.map(p=>{
      let cls='map-dot';
      if(done){if(p.id===ex.target)cls+=' correct';else if(p.id===state.selected)cls+=' wrong'}
      // Étiquette : sous le point si près du bord haut, calée si près des bords gauche/droit (sinon coupée par overflow:hidden)
      const lblStyle=(p.y<10?'top:30px;':'')+(p.x<12?'left:0;transform:none;':p.x>88?'left:auto;right:0;transform:none;':'');
      const lbl=done&&(p.id===ex.target||p.id===state.selected)?'<span class="map-lbl" style="'+lblStyle+'">'+esc(p.name)+'</span>':'';
      return '<button class="'+cls+'" style="left:'+p.x+'%;top:'+p.y+'%" '+(done?'disabled':'')+' data-id="'+p.id+'" aria-label="Point sur la carte" onclick="selectMapAnswer(this.dataset.id)">'+lbl+'</button>';
    }).join('')
  +'</div>';
}
// ── Placer les PAYS : chaque pays est une vraie forme tappable ──────────
function renderCountryMapArea(ex){
  const done=state.selected!==null;
  const shapes=Object.keys(MAP_COUNTRIES).map(cid=>{
    let cls='map-country';
    if(done){if(cid===ex.target)cls+=' correct';else if(cid===state.selected)cls+=' wrong'}
    return '<path class="'+cls+'" d="'+MAP_COUNTRIES[cid].path+'" data-id="'+cid+'" onclick="selectCountryAnswer(this.dataset.id)"/>';
  }).join('');
  return '<div class="map-wrap"><svg viewBox="0 0 100 100">'
    +'<path class="map-land" style="pointer-events:none" d="'+MAP_SVG_PATHS.europe+'"/>'
    +shapes+'</svg>'
    +'<p class="sub" style="position:absolute;bottom:6px;left:0;right:0;text-align:center;font-size:.7rem;pointer-events:none">Touche le bon pays !</p>'
  +'</div>';
}
function selectCountryAnswer(id){
  if(state.selected!==null||state.gameOver) return;
  if(!MAP_COUNTRIES[id]) return;
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  const ex=state.exercises[state.idx];
  const correct=id===ex.target;
  state.selected=id;
  state.results.push({ex,choice:id,correct});
  if(correct){
    state.score++;state.streak++;
    if(state.streak>state.maxStreak)state.maxStreak=state.streak;
    const mult=state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1;
    state.sessionXP+=Math.round(ex.diff*10*mult);
    state.sessionCristaux+=ex.diff*2+(state.streak===3||state.streak===5||state.streak===10?10:0);
  }else{
    state.streak=0;
    if(state.mode==='progression')state.gameOver=true;
  }
  questChestAward();
  renderGame();
  showExplanation(ex,correct);
  if(correct){
    if(state.autoNextID)clearTimeout(state.autoNextID);
    state.autoNextID=setTimeout(()=>{state.autoNextID=null;if(state.screen==='game'&&state.selected!==null)nextQuestion()},1600);
  }
}

function selectMapAnswer(id){
  if(state.selected!==null||state.gameOver) return;
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  const ex=state.exercises[state.idx];
  const correct=id===ex.target;
  state.selected=id;
  state.results.push({ex,choice:id,correct});
  if(correct){
    state.score++;state.streak++;
    if(state.streak>state.maxStreak)state.maxStreak=state.streak;
    const mult=state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1;
    state.sessionXP+=Math.round(ex.diff*10*mult);
    state.sessionCristaux+=ex.diff*2+(state.streak===3||state.streak===5||state.streak===10?10:0);
  }else{
    state.streak=0;
    if(state.mode==='progression')state.gameOver=true;
  }
  questChestAward();
  renderGame();
  showExplanation(ex,correct);
  if(correct){
    if(state.autoNextID)clearTimeout(state.autoNextID);
    state.autoNextID=setTimeout(()=>{state.autoNextID=null;if(state.screen==='game'&&state.selected!==null)nextQuestion()},1600);
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
  questChestAward();
  renderGame();
  showExplanation(ex,correct);
  // Bonne réponse → passage automatique à la question suivante.
  // Mauvaise réponse → l'enfant lit l'explication et clique « Suivant ».
  if(correct){
    if(state.autoNextID)clearTimeout(state.autoNextID);
    state.autoNextID=setTimeout(()=>{
      state.autoNextID=null;
      if(state.screen==='game'&&state.selected!==null) nextQuestion();
    },1600);
  }
}

function showExplanation(ex,correct){
  const el=$('explanation');
  if(!el) return;
  // Tous les champs p\u00e9dagogiques sont OPTIONNELS : 717 exos sur 977 n'ont
  // pas de `methode`, beaucoup n'ont pas `pourquoi`/`regle`. Avant, l'acc\u00e8s
  // direct ex.methode.map plantait ici \u2192 plus de bouton Suivant \u2192 partie
  // gel\u00e9e sur tous les royaumes non-maths, chrono et progression compris.
  const hasMethode=Array.isArray(ex.methode)&&ex.methode.length>0;
  const hasDetail=hasMethode||ex.regle||ex.exemple;
  const methodeHTML=hasMethode?ex.methode.map(m=>`<div class="pedago-step">${esc(m)}</div>`).join(''):'';
  const gainHTML=correct?`<span class="xp-gain">+${Math.round(ex.diff*10*(state.streak>=10?3:state.streak>=5?2:state.streak>=3?1.5:1))} XP</span> <span class="crystal-gain">\u{1F48E} +${ex.diff*2}</span>`:'';
  const isLast=state.gameOver||state.idx>=state.exercises.length-1;
  // Bonne r\u00e9ponse : passage auto (message discret). Mauvaise : bouton Suivant.
  const footerHTML=correct
    ?`<p class="sub qp-unlock" style="margin-top:16px;font-style:italic">${isLast?'R\u00e9sultats dans un instant\u2026':'\u{1F513} Tu d\u00e9bloques la question suivante\u2026'}</p>`
    :`<button class="btn-fire mt-6" onclick="nextQuestion()">${isLast?'Voir mes r\u00e9sultats \u2192':'Question suivante \u2192'}</button>`;
  el.innerHTML=`<div class="card fade-in mt-6">
    <div class="row gap-2 mb-2"><span style="font-size:1.5rem">${correct?'\u2705':'\u274C'}</span>
    <h4 class="fredoka" style="font-size:1.1rem;font-weight:700;color:${correct?'#22c55e':'#ef4444'};margin:0">${correct?'Excellent !':'Pas cette fois\u2026'}</h4>
    ${gainHTML}</div>
    ${ex.se?`<p style="color:#faf5ff;margin-bottom:12px;line-height:1.6;font-weight:600">${esc(ex.se)}</p>`:''}
    ${!correct&&ex.pourquoi?`<div class="error-box"><p style="font-size:.9rem;margin:0"><span class="error-label">\u{1F914} L'erreur probable : </span><span style="color:#faf5ff">${esc(ex.pourquoi)}</span></p></div>`:''}
    ${hasDetail?`<a class="detail-link mt-3" style="display:inline-block;margin-top:10px" onclick="toggleDetail()">${state.detailOpen?'Masquer':'Voir'} la m\u00e9thode pas \u00e0 pas \u2192</a>
    <div id="detailPanel" class="${state.detailOpen?'':'hidden'}">
      ${hasMethode?`<div class="pedago-box">
        <div class="pedago-title">\u{1F4D0} M\u00e9thode du prof</div>
        ${methodeHTML}
      </div>`:''}
      ${ex.regle?`<div class="tip-box">
        <p style="font-size:.9rem;margin:0"><span class="tip-label">\u{1F4A1} \u00c0 retenir : </span><span class="tip-text">${esc(ex.regle)}</span></p>
      </div>`:''}
      ${ex.exemple?`<div class="pedago-box" style="background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.2)"><div class="pedago-title" style="color:#93c5fd">\u{1F4DA} Exemple similaire</div><p style="color:#faf5ff;font-size:.9rem">${esc(ex.exemple)}</p></div>`:''}
      ${ex.sk?`<p style="font-size:.75rem;color:#8b7ec8;margin-top:8px">Comp\u00e9tence : ${esc(ex.sk)}</p>`:''}
    </div>`:''}
    ${footerHTML}
  </div>`;
}
function toggleDetail(){state.detailOpen=!state.detailOpen;const p=$('detailPanel');if(p)p.classList.toggle('hidden');const a=document.querySelector('.detail-link');if(a)a.textContent=(state.detailOpen?'Masquer':'Voir')+' la m\u00e9thode pas \u00e0 pas \u2192'}

function nextQuestion(){
  if(state.autoNextID){clearTimeout(state.autoNextID);state.autoNextID=null}
  if(state.gameOver||state.idx>=state.exercises.length-1) return finishGame();
  state.idx++;state.selected=null;state.timer=60;state.detailOpen=false;
  navigate('game');
}

/* ════════ FINISH + PERSIST ════════ */
function finishGame(abandoned){
  if(state.timerID){clearInterval(state.timerID);state.timerID=null}
  if(state.autoNextID){clearTimeout(state.autoNextID);state.autoNextID=null}
  const total=abandoned?state.idx:state.results.length;
  const duration=Math.round((Date.now()-state.startTime)/1000);
  const d={score:state.score,total,maxStreak:state.maxStreak,results:state.results,mode:state.mode,abandoned:!!abandoned,duration,date:new Date().toISOString(),level:state.level,xp:state.sessionXP,cristaux:state.sessionCristaux};
  state.gameData=d;
  if(total>0){
    // Déblocage progressif : 3 parties à 80 % ouvrent le palier suivant.
    const _unlock=checkLevelUnlock(state.level,state.score,total);
    if(_unlock&&_unlock.unlocked){
      setTimeout(()=>toast('\u{1F389} Nouveau niveau d\u00e9bloqu\u00e9 : '+_unlock.unlocked.name+' !','win'),900);
    }else if(_unlock&&_unlock.progress){
      setTimeout(()=>toast('\u{1F525} '+_unlock.progress+'/3 parties r\u00e9ussies \u2014 encore '+(_unlock.need-_unlock.progress)+' pour ouvrir \u00ab '+_unlock.next.name+' \u00bb'),900);
    }
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
      // Journal des erreurs pour l'Espace Parent : question + réponse donnée + bonne réponse.
      if(!r.correct){
        if(!profile.recentMisses)profile.recentMisses=[];
        const e=r.ex;let given='';
        if(e.type==='map-country'){const cy=MAP_COUNTRIES[r.choice];given=cy?cy.name:'(temps écoulé)'}
        else if(e.type==='map'){const p=(MAP_POINTS[e.map]||[]).find(x=>x.id===r.choice);given=p?p.name:'(temps écoulé)'}
        else if(e.type==='input'){given=String(r.choice||'')||'(vide)'}
        else{given=(typeof r.choice==='number'&&r.choice>=0&&Array.isArray(e.ch))?String(e.ch[r.choice]):'(temps écoulé)'}
        profile.recentMisses.push({id:e.id,q:(e.q||'').length>140?e.q.slice(0,140)+'…':(e.q||''),cat:e.cat||'',lv:e.lv||'',given,ans:exAnswerText(e),date:d.date});
        if(profile.recentMisses.length>50)profile.recentMisses=profile.recentMisses.slice(-50);
      }
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
    // Mémoire anti-doublon : ces questions ne ressortiront pas tout de suite.
    rememberExercises(state.results.map(r=>r.ex&&r.ex.id).filter(Boolean));
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
    if(state.level) maybeAutoGenerate(state.level);
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
  // Partie jouée dans le cadre d'une battle : on envoie le résultat au
  // document partagé puis on affiche l'écran de comparaison.
  // Une battle abandonnée n'est PAS soumise (pas de score fantôme).
  if(state.battleCode){
    const code=state.battleCode;
    state.battleCode=null;
    if(!abandoned&&state.results.length>0){submitBattleResult(code,d);return}
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
    evolveHTML=`<div class="card fade-in" style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.05));border-color:rgba(251,191,36,0.3);text-align:center">
      <div style="font-size:5rem" class="bounce">${d.newRoyaumeStage.emoji}</div>
      <h3 class="fredoka" style="color:#fbbf24;font-size:1.3rem;margin-top:8px">\u2728 \u00c9VOLUTION dans ${d.royaumeName} ! \u2728</h3>
      <p style="color:#fde68a;margin-top:4px;font-weight:600">Ta mascotte est devenue <strong>${d.newRoyaumeStage.name}</strong> !</p>
      <p style="color:#fbbf24;font-size:.9rem;margin-top:4px">${d.newRoyaumeStage.desc}</p>
    </div>`;
  } else if(d.evolved&&d.newStage){
    evolveHTML=`<div class="card fade-in" style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.05));border-color:rgba(251,191,36,0.3);text-align:center">
      <div style="font-size:4rem" class="bounce">${d.newStage.emoji}</div>
      <h3 class="fredoka" style="color:#fbbf24;font-size:1.2rem;margin-top:8px">\u2728 \u00c9volution g\u00e9n\u00e9rale ! \u2728</h3>
      <p style="color:#fde68a;margin-top:4px">Ton dragonnet maths est devenu <strong>${d.newStage.name}</strong> !</p>
    </div>`;
  }
  let royaumeCompHTML='';
  if(d.newRoyaumeCompanions&&d.newRoyaumeCompanions.length>0){
    royaumeCompHTML=`<div class="card fade-in" style="background:linear-gradient(135deg,rgba(96,165,250,0.1),rgba(96,165,250,0.05));border-color:rgba(96,165,250,0.3)">
      <h3 class="fredoka" style="color:#93c5fd;font-size:.95rem;text-transform:uppercase;letter-spacing:.08em">\u{1F389} Nouveau compagnon dans ${d.newRoyaumeCompanions[0].royaume} !</h3>
      <div class="dragonnet-grid">${d.newRoyaumeCompanions.map(c=>`<div class="dragonnet-card unlocked pulse"><div class="dragonnet-emoji">${c.emoji}</div><div class="dragonnet-name">${c.name}</div><div class="dragonnet-elem">${c.elem}</div></div>`).join('')}</div>
    </div>`;
  }
  let dragonnetsHTML='';
  if(d.newDragonnets&&d.newDragonnets.length>0){
    dragonnetsHTML=`<div class="card fade-in" style="background:linear-gradient(145deg,rgba(96,165,250,0.1),rgba(96,165,250,0.05));border-color:rgba(96,165,250,0.3)">
      <h3 class="fredoka" style="color:#93c5fd;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em">\u{1F409} Nouveau dragonnet d\u00e9bloqu\u00e9 !</h3>
      <div class="dragonnet-grid">${d.newDragonnets.map(dg=>`<div class="dragonnet-card unlocked pulse"><div class="dragonnet-emoji">${dg.emoji}</div><div class="dragonnet-name">${dg.name}</div><div class="dragonnet-elem">${dg.elem}</div></div>`).join('')}</div>
    </div>`;
  }
  const badgesHTML=(d.newBadges&&d.newBadges.length>0)?`<div class="card fade-in" style="background:linear-gradient(145deg,rgba(251,191,36,0.1),rgba(251,191,36,0.04));border-color:rgba(251,191,36,0.25)">
    <h3 class="fredoka" style="color:#fbbf24;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em">\u2728 Nouveaux badges !</h3>
    <div class="badge-grid">${d.newBadges.map(b=>`<div class="badge-card unlocked pulse"><div class="badge-ic">${b.icon}</div><div class="badge-name">${b.name}</div><div class="badge-desc">${b.desc}</div></div>`).join('')}</div></div>`:'';
  const questHTML=d.questDone?`<div class="card fade-in" style="background:rgba(139,92,246,.15);border-color:#c4b5fd"><div class="text-center"><div style="font-size:2.5rem">\u{1F3AF}</div><h3 class="fredoka" style="color:#c4b5fd;margin-top:6px">Qu\u00eate journali\u00e8re r\u00e9ussie !</h3><p style="color:#faf5ff;margin-top:4px">Tu gagnes \u{1F48E} +${d.questReward} cristaux !</p></div></div>`:'';

  app.innerHTML=`<div class="text-center py-8 fade-in"><div class="huge-icon">${emoji}</div>
    <h2 class="title" style="font-size:clamp(1.3rem,3.5vw,2rem);color:#fbbf24">${title}</h2><p style="color:#c4b5fd">${sub}</p></div>
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
      <div class="flex-1"><p class="recap-q">${esc(r.ex.q.length>110?r.ex.q.slice(0,110)+'\u2026':r.ex.q)}</p>
      ${!r.correct?`<p class="recap-answer">R\u00e9ponse : ${esc(exAnswerText(r.ex))}</p>`:''}</div></div>`).join('')}</div></div>
  <div class="btn-row">
    <button class="btn-fire" onclick="startGame('${d.mode}')">Rejouer</button>
    <button class="btn-stone" onclick="navigate('royaume')">Mon Royaume</button>
    <button class="btn-stone" onclick="navigate('home')">Accueil</button>
  </div>
  <button class="parent-btn mt-4" onclick="parentalGate(function(){navigate('parent')})" style="width:100%">\u{1F510} Recap pour Papa/Maman</button>`;
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
    <h2 class="title sparkle-anim" style="color:#fbbf24;font-size:1.8rem">Mon Royaume</h2>
    <p class="sub">${profile.name}, voici ta progression</p></div>
  <div class="dragon-card">
    <div class="dragon-emoji float">${stage.emoji}</div>
    <div class="dragon-name">${stage.name}</div>
    <div class="dragon-stage">${profile.xp} XP \u2022 Niveau ${stageIdx+1}/${STAGES.length}</div>
  </div>
  <div class="card mb-4"><div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:#f7a020">${profile.totalGames}</div><div class="stat-label">Parties</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#22c55e">${profile.totalCorrect}</div><div class="stat-label">Bonnes r\u00e9ponses</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#fbbf24">${pct}%</div><div class="stat-label">R\u00e9ussite</div></div>
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
    <h2 class="title sparkle-anim" style="color:#fbbf24;font-size:1.6rem">Collection de Dragonnets</h2>
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
  // Cherche aussi dans les exos IA et personnalisés, pas seulement le pool statique.
  const _allPools=EX.concat(profile.aiExercises||[]).concat(profile.customExercises||[]);
  const failedEx=failedExIds.map(id=>_allPools.find(e=>e.id===id)).filter(Boolean).slice(0,10);
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem">\u{1F464}</div>
    <h2 class="title" style="color:#c4b5fd;font-size:1.6rem">Espace Parent</h2>
    <p class="sub">Suivi de ${profile.name}</p></div>
  <div class="card mb-4" style="border-color:#c4b5fd"><div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:#c4b5fd">${profile.totalGames}</div><div class="stat-label">Parties</div></div>
    <div class="stat-card"><div class="stat-val" style="color:${pct>=60?'#22c55e':'#ef4444'}">${pct}%</div><div class="stat-label">R\u00e9ussite</div></div>
    <div class="stat-card"><div class="stat-val" style="color:#fbbf24">${totalMinutes}m</div><div class="stat-label">Temps total</div></div>
  </div></div>
  ${(function(){
    const g=gradeByRank(profile.grade);
    const rows=SUBJECTS.filter(su=>(su.levels||[]).some(l=>levelMinGrade(l)!==null)).map(su=>{
      const top=topOpenLevel(su.id), nxt=nextLockedLevel(su.id);
      const prog=(profile.unlockProgress||{})[top&&top.id]||0;
      if(!top) return '';
      return '<div class="row-between" style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06)">'
        +'<div class="flex-1" style="min-width:0"><div style="color:#faf5ff;font-weight:600">'+su.icon+' '+esc(su.name)+'</div>'
        +'<div class="sub" style="font-size:.72rem">Niveau ouvert : '+esc(top.name)+(nxt?(' \u00b7 prochain : '+esc(nxt.name)+' ('+prog+'/3)'):' \u00b7 tout est ouvert \u2705')+'</div></div></div>';
    }).join('');
    return '<div class="card mb-4" style="border-color:#fbbf24">'
      +'<h3 class="fredoka" style="font-size:.85rem;color:#fbbf24;margin-bottom:8px;letter-spacing:.1em;text-transform:uppercase">\u{1F393} Niveau et \u00e2ge</h3>'
      +(g
        ?'<p style="color:#faf5ff;font-size:.85rem;margin-bottom:4px">Classe d\u00e9clar\u00e9e : <b style="color:#fbbf24">'+g.name+'</b> ('+g.age+' ans). Les niveaux sup\u00e9rieurs se d\u00e9bloquent apr\u00e8s 3 parties r\u00e9ussies \u00e0 80 %.</p>'+rows
        :'<p style="color:#faf5ff;font-size:.85rem">Aucune classe renseign\u00e9e : <b>tous les niveaux sont ouverts</b>. Indiquez la classe pour activer la progression guid\u00e9e.</p>')
      +'<button class="btn-stone btn-small mt-3" onclick="parentalGate(function(){navigate(\'gradeAsk\')})">'+(g?'Changer la classe':'Indiquer la classe')+'</button>'
    +'</div>';
  })()}
  ${weak.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#ef4444;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u26A0\uFE0F Domaines \u00e0 travailler</h3>
  ${weak.map(([c,s])=>{const p=Math.round(s.cor/s.att*100);return `<div class="weak-cat"><div><div style="color:#fca5a5;font-weight:700">${c}</div><div style="font-size:.75rem;color:#8b7ec8">${s.cor}/${s.att} bonnes r\u00e9ponses</div></div><div style="color:#ef4444;font-weight:700;font-family:'Cinzel'">${p}%</div></div>`}).join('')}
  <p style="font-size:.8rem;color:#8b7ec8;margin-top:8px;font-style:italic">Conseil : lancez le \u00ab Mode adaptatif \u00bb pour travailler ces domaines.</p></div>`:''}
  ${strong.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#22c55e;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u2B50 Points forts</h3>
  ${strong.map(([c,s])=>{const p=Math.round(s.cor/s.att*100);return `<div class="strong-cat"><div><div style="color:#bbf7d0;font-weight:700">${c}</div><div style="font-size:.75rem;color:#8b7ec8">${s.cor}/${s.att} bonnes r\u00e9ponses</div></div><div style="color:#22c55e;font-weight:700;font-family:'Cinzel'">${p}%</div></div>`}).join('')}</div>`:''}
  ${(function(){
    const misses=(profile.recentMisses||[]).slice().reverse().slice(0,15);
    if(misses.length===0)return `<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f87171;margin-bottom:8px;letter-spacing:.1em;text-transform:uppercase">\u274c Ses derni\u00e8res erreurs</h3><p class="sub" style="font-style:italic">Les prochaines erreurs de ${esc(profile.name)} appara\u00eetront ici, avec sa r\u00e9ponse et la bonne r\u00e9ponse.</p></div>`;
    return `<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f87171;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">\u274c Ses derni\u00e8res erreurs (${misses.length})</h3>
    <div class="recap-scroll">${misses.map(m=>{
      const dt=new Date(m.date);const dtStr=isNaN(dt)?'':dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+' '+dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
      return `<div class="recap-item"><span class="recap-icon">\u274c</span><div class="flex-1"><p class="recap-q"><strong>${esc(m.cat)}</strong> \u2014 ${esc(m.q)}</p>
      <p style="color:#fca5a5;font-size:.78rem;margin-top:4px">Sa r\u00e9ponse : ${esc(m.given)}</p>
      <p style="color:#22c55e;font-size:.78rem;margin-top:2px">Bonne r\u00e9ponse : ${esc(m.ans)}</p>
      ${dtStr?`<p style="color:#8b7ec8;font-size:.68rem;margin-top:2px">${dtStr}</p>`:''}</div></div>`}).join('')}</div></div>`;
  })()}
  ${failedEx.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">Exercices \u00e0 refaire ensemble</h3>
  <div class="recap-scroll">${failedEx.map(e=>`<div class="recap-item"><span class="recap-icon">\u{1F4DD}</span><div class="flex-1"><p class="recap-q"><strong>${e.cat}</strong> \u2014 ${e.q.length>120?e.q.slice(0,120)+'\u2026':e.q}</p><p style="color:#22c55e;font-size:.75rem;margin-top:4px">R\u00e9ponse : ${esc(exAnswerText(e))}</p></div></div>`).join('')}</div></div>`:''}
  ${recentSessions.length>0?`<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#f7a020;margin-bottom:12px;letter-spacing:.1em;text-transform:uppercase">10 derni\u00e8res sessions</h3>
  ${recentSessions.map(s=>{const p=s.total>0?Math.round(s.score/s.total*100):0;const lv=LEVELS.find(l=>l.id===s.level);const dt=new Date(s.date);const dtStr=dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+' '+dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});return `<div class="session-item"><div><div style="color:#faf5ff">${lv?lv.icon+' '+lv.sub:s.level} \u00b7 ${s.mode}</div><div style="font-size:.7rem;color:#8b7ec8">${dtStr} \u00b7 ${Math.round((s.duration||0)/60)}min</div></div><div style="color:${p>=60?'#22c55e':'#ef4444'};font-weight:700;font-family:'Cinzel'">${s.score}/${s.total}</div></div>`}).join('')}</div>`:''}
  <div class="card mb-4" style="border-color:#c4b5fd"><h3 class="fredoka" style="font-size:.85rem;color:#c4b5fd;margin-bottom:8px">\u{1F517} Sync sur un autre appareil</h3>
  <p style="color:#faf5ff;font-size:.8rem;margin-bottom:10px">Ouvrez ce lien sur l'autre téléphone/tablette pour récupérer le Royaume de ${profile.name}. <strong>Ne le partagez avec personne d'autre</strong> (équivaut à un mot de passe).</p>
  <button class="btn-stone btn-small" onclick="copySyncLink()">\u{1F4CB} Copier le lien</button>
  <button class="btn-stone btn-small" onclick="shareSyncLink()" style="margin-left:8px">\u{1F4F2} Partager (WhatsApp...)</button>
  <div id="syncMsg" style="margin-top:8px;font-size:.75rem;color:#22c55e"></div></div>
  ${(()=>{
    const list=profile.customPoems||[];
    const items=list.map(p=>`<div class="row-between" style="padding:10px 0;border-top:1px solid rgba(255,255,255,0.06)">
      <div class="flex-1" style="min-width:0">
        <div style="color:#faf5ff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.title)}</div>
        <div class="sub" style="margin-top:2px">${esc(p.author||'sans auteur')} · ${p.dur||'?'}s</div>
      </div>
      <div class="row gap-2">
        <button class="btn-stone btn-small" onclick="editCustomPoemId(this.dataset.pid)" data-pid="${esc(p.id)}">✏️</button>
        <button class="btn-stone btn-small" onclick="deleteCustomPoemId(this.dataset.pid)" data-pid="${esc(p.id)}" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#fca5a5">🗑️</button>
      </div>
    </div>`).join('');
    return `<div class="card mb-4" style="border-color:#a78bfa">
      <h3 class="fredoka" style="font-size:.85rem;color:#a78bfa;margin-bottom:8px;letter-spacing:.1em;text-transform:uppercase">📝 Tes poésies pour ${esc(profile.name)}</h3>
      <p style="color:#faf5ff;font-size:.8rem;margin-bottom:10px">Ajoute des poésies que ton enfant devra apprendre et réciter. Elles s'ajoutent à la liste des Poésies du Royaume et se synchronisent sur tous tes appareils.</p>
      <button class="btn-fire btn-small" onclick="state.editingPoemId=null;navigate('addPoem')">➕ Ajouter une poésie</button>
      ${list.length>0?`<div style="margin-top:12px">${items}</div>`:'<p class="sub" style="margin-top:10px;font-style:italic">Aucune poésie ajoutée pour le moment.</p>'}
    </div>`;
  })()}
  ${(function(){
    const list=profile.customExercises||[];
    const items=list.map(ex=>'<div class="row-between" style="padding:10px 0;border-top:1px solid rgba(255,255,255,0.06)">'
      +'<div class="flex-1" style="min-width:0">'
        +'<div style="color:#faf5ff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(ex.q||'(sans titre)')+'</div>'
        +'<div class="sub" style="margin-top:2px">'+esc(ex.lv||'?')+' · '+esc(ex.cat||'?')+'</div>'
      +'</div>'
      +'<div class="row gap-2">'
        +'<button class="btn-stone btn-small" data-id="'+esc(ex.id)+'" onclick="editCustomExercise(this.dataset.id)">✏️</button>'
        +'<button class="btn-stone btn-small" data-id="'+esc(ex.id)+'" onclick="deleteCustomExercise(this.dataset.id)" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#fca5a5">🗑️</button>'
      +'</div>'
    +'</div>').join('');
    return '<div class="card mb-4" style="border-color:#34d399">'
      +'<h3 class="fredoka" style="font-size:.85rem;color:#34d399;margin-bottom:8px;letter-spacing:.1em;text-transform:uppercase">📚 Tes exercices personnalisés</h3>'
      +'<p style="color:#faf5ff;font-size:.8rem;margin-bottom:10px">Ajoute tes propres questions à choix multiples (géo, maths, etc.). Elles s\'intègrent au pool de '+esc(profile.name)+' et se synchronisent sur tous tes appareils.</p>'
      +'<button class="btn-fire btn-small" onclick="navigate(\'photoExercise\')">📸 Photographier un exercice</button>'
      +'<button class="btn-stone btn-small" style="margin-left:8px" onclick="state.editingExerciseId=null;navigate(\'addExercise\')">✍️ À la main</button>'
      +(list.length>0?'<div style="margin-top:12px">'+items+'</div>':'<p class="sub" style="margin-top:10px;font-style:italic">Aucun exercice personnalisé pour le moment.</p>')
    +'</div>';
  })()}
  <div class="card mb-4" style="border-color:rgba(255,255,255,0.08)"><h3 class="fredoka" style="font-size:.85rem;color:#8b7ec8;margin-bottom:8px">Donn\u00e9es</h3>
  <button class="btn-stone btn-small" onclick="exportData()">\u{1F4E4} Exporter (JSON)</button>
  <button class="btn-stone btn-small" onclick="resetData()" style="margin-top:8px;background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#fca5a5">\u{1F5D1}\uFE0F R\u00e9initialiser</button></div>
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
function shareSyncLink(){parentalGate(function(){_doShareSyncLink()})}
async function _doShareSyncLink(){
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
  parentalGate(function(){_doResetDataInner()});
}
function _doResetDataInner(){
  if(confirm('R\u00e9initialiser TOUTES les donn\u00e9es de '+profile.name+' ? Irr\u00e9versible.')){
    const dict=loadProfilesDict();
    delete dict[profile.name];
    saveProfilesDict(dict);
    if(getActiveName()===profile.name) setActiveName('');
    localStorage.removeItem(STORAGE_KEY);
    profile=newProfile();
    navigate('home');
  }
}

/* ════════ POÉSIES LA FONTAINE ════════ */
/* Helpers poésies : agrège FABLES (built-in) + profile.customPoems (perso) */
function getAllPoems(){return [...FABLES, ...(profile.customPoems||[])]}
function getPoemById(id){return getAllPoems().find(p=>p.id===id)}
function isCustomPoem(id){return id&&id.startsWith('custom-')}

const FABLES=[
  {id:"corbeau-renard",title:"Le Corbeau et le Renard",icon:"\u{1F98A}",dur:75,author:"Jean de La Fontaine",
    text:"Maître Corbeau, sur un arbre perché, tenait en son bec un fromage. Maître Renard, par l'odeur alléché, lui tint à peu près ce langage : \"Hé ! bonjour, Monsieur du Corbeau. Que vous êtes joli ! que vous me semblez beau ! Sans mentir, si votre ramage se rapporte à votre plumage, vous êtes le Phénix des hôtes de ces bois.\" À ces mots le Corbeau ne se sent pas de joie ; et pour montrer sa belle voix, il ouvre un large bec, laisse tomber sa proie. Le Renard s'en saisit, et dit : \"Mon bon Monsieur, apprenez que tout flatteur vit aux dépens de celui qui l'écoute.\"",
    morale:"Tout flatteur vit aux dépens de celui qui l'écoute."},
  {id:"lievre-tortue",title:"Le Lièvre et la Tortue",icon:"\u{1F422}",dur:60,author:"Jean de La Fontaine",
    text:"Rien ne sert de courir ; il faut partir à point. Le Lièvre et la Tortue en sont un témoignage. Gageons, dit celle-ci, que vous n'atteindrez point sitôt que moi ce but. Sitôt ? Êtes-vous sage ? répartit l'animal léger. La Tortue partit. Elle s'évertue, elle se hâte avec lenteur. Le Lièvre cependant méprise une telle victoire, tient la gageure à peu de gloire. Quand il voit que l'autre touche presque au bout de la carrière, il partit comme un trait ; mais les élans qu'il fit furent vains : la Tortue arriva la première.",
    morale:"Rien ne sert de courir ; il faut partir à point."},
  {id:"cigale-fourmi",title:"La Cigale et la Fourmi",icon:"\u{1F41C}",dur:55,author:"Jean de La Fontaine",
    text:"La Cigale, ayant chanté tout l'été, se trouva fort dépourvue quand la bise fut venue : pas un seul petit morceau de mouche ou de vermisseau. Elle alla crier famine chez la Fourmi sa voisine, la priant de lui prêter quelque grain pour subsister jusqu'à la saison nouvelle. La Fourmi n'est pas prêteuse : c'est là son moindre défaut. \"Que faisiez-vous au temps chaud ? dit-elle à cette emprunteuse. Nuit et jour à tout venant je chantais, ne vous déplaise. Vous chantiez ? j'en suis fort aise. Eh bien ! dansez maintenant.\"",
    morale:"Il faut prévoir le futur, pas seulement profiter du présent."},
  {id:"loup-agneau",title:"Le Loup et l'Agneau",icon:"\u{1F40F}",dur:60,author:"Jean de La Fontaine",
    text:"La raison du plus fort est toujours la meilleure. Un Agneau se désaltérait dans le courant d'une onde pure. Un Loup survient à jeun qui cherchait aventure, et que la faim en ces lieux attirait. \"Qui te rend si hardi de troubler mon breuvage ? dit cet animal plein de rage. Tu seras châtié de ta témérité.\" \"Sire, répond l'Agneau, que Votre Majesté ne se mette pas en colère ; mais plutôt qu'elle considère que je me vas désaltérant dans le courant, plus de vingt pas au-dessous d'Elle.\" Là-dessus, au fond des forêts le Loup l'emporte, et puis le mange, sans autre forme de procès.",
    morale:"La raison du plus fort est toujours la meilleure."},
  {id:"grenouille-boeuf",title:"La Grenouille qui se veut faire aussi grosse que le Bœuf",icon:"\u{1F438}",dur:50,author:"Jean de La Fontaine",
    text:"Une Grenouille vit un Bœuf qui lui sembla de belle taille. Elle, qui n'était pas grosse en tout comme un œuf, envieuse, s'étend, et s'enfle, et se travaille pour égaler l'animal en grosseur, disant : \"Regardez bien, ma sœur ; est-ce assez ? dites-moi ; n'y suis-je point encore ? Nenni. M'y voici donc ? Point du tout. M'y voilà ? Vous n'en approchez point.\" La chétive pécore s'enfla si bien qu'elle creva.",
    morale:"Le monde est plein de gens qui ne sont pas plus sages : tout petit prince a des ambassadeurs."},
  {id:"renard-raisins",title:"Le Renard et les Raisins",icon:"\u{1F347}",dur:35,author:"Jean de La Fontaine",
    text:"Certain Renard Gascon, d'autres disent Normand, mourant presque de faim, vit au haut d'une treille des Raisins mûrs apparemment, et couverts d'une peau vermeille. Le galand en eût fait volontiers un repas ; mais comme il n'y pouvait atteindre : \"Ils sont trop verts, dit-il, et bons pour des goujats.\" Fit-il pas mieux que de se plaindre ?",
    morale:"On méprise ce qu'on ne peut obtenir."},
  {id:"chene-roseau",title:"Le Chêne et le Roseau",icon:"\u{1F33F}",dur:65,author:"Jean de La Fontaine",
    text:"Le Chêne un jour dit au Roseau : \"Vous avez bien sujet d'accuser la nature ; un roitelet pour vous est un pesant fardeau ; le moindre vent qui d'aventure fait rider la face de l'eau, vous oblige à baisser la tête.\" Le vent redouble ses efforts, et fait si bien qu'il déracine celui de qui la tête au ciel était voisine, et dont les pieds touchaient à l'empire des morts.",
    morale:"Plier sait mieux résister que rester rigide."},
  {id:"lion-rat",title:"Le Lion et le Rat",icon:"\u{1F981}",dur:55,author:"Jean de La Fontaine",
    text:"Il faut, autant qu'on peut, obliger tout le monde : on a souvent besoin d'un plus petit que soi. De cette vérité deux fables feront foi. Entre les pattes d'un Lion un Rat sortit assez à l'étourdie. Le Roi des animaux, en cette occasion, montra ce qu'il était, et lui donna la vie. Quelque temps après, ce Lion fut pris dans des rets, dont ses rugissements ne le purent défaire. Sire Rat accourut, et fit tant par ses dents qu'une maille rongée emporta tout l'ouvrage.",
    morale:"Patience et longueur de temps font plus que force ni que rage."},
  {id:"schneider-tu-dis",title:"Tu dis... Tu dis...",author:"J.-P. Schneider",icon:"\u{1FAB6}",dur:40,
    text:"Tu dis sable<br>et déjà<br>la mer est à tes pieds.<br>Tu dis forêt<br>et déjà<br>les arbres te tendent leurs bras.<br>Tu dis colline<br>et déjà<br>le sentier court avec toi vers le sommet.<br>Tu dis nuage<br>et déjà<br>un cumulus t'offre la promesse du voyage.<br>Tu dis poème<br>Et déjà<br>les mots volent et dansent<br>comme étincelles dans la cheminée."}
];

// Retire les balises HTML avant lecture/comparaison (les poèmes ont des <br>).
function stripHtmlText(t){return String(t).replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'')}

// Choisit la meilleure voix française disponible sur le navigateur/OS courant.
function _pickFrenchVoice(){
  if(!('speechSynthesis' in window)) return null;
  const all=speechSynthesis.getVoices()||[];
  const fr=all.filter(v=>/^fr/i.test(v.lang));
  if(!fr.length) return null;
  // Préférences (les voix les plus naturelles sur iOS / macOS / Android)
  const prefs=['Thomas','Aurélie','Audrey','Marie','Daniel','Amelie','Amélie','Google français'];
  for(const p of prefs){const v=fr.find(x=>x.name.includes(p));if(v) return v;}
  // À défaut : la première voix locale (souvent meilleure que les voix réseau).
  return fr.find(v=>v.localService)||fr[0];
}

function speakText(text){
  if(!('speechSynthesis' in window)){alert('Synthèse vocale non disponible sur ce navigateur');return}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(stripHtmlText(text));
  u.lang='fr-FR';
  u.rate=0.82;     // un peu plus lent pour la poésie
  u.pitch=1.05;    // légèrement plus chaleureux
  const v=_pickFrenchVoice();
  if(v) u.voice=v;
  speechSynthesis.speak(u);
}
function stopSpeaking(){if('speechSynthesis' in window)speechSynthesis.cancel()}

// Lecteur audio unifié : MP3 studio si disponible (f.audioUrl), sinon
// synthèse vocale du navigateur. Géré via un singleton <audio>.
let _poesieAudio=null;
function playPoesie(){
  const f=getPoemById(state.fableId);
  if(!f) return;
  stopPoesie();
  const btn=$('playBtn');
  // Texte propre pour la synthèse vocale : on prend l'innerText du DOM rendu
  // (entités HTML décodées, sauts de ligne respectés), avec fallback sur stripHtmlText.
  const ftEl=$('fableText');
  const cleanText=ftEl?ftEl.innerText:stripHtmlText(f.text);
  if(f.audioUrl){
    _poesieAudio=new Audio(f.audioUrl);
    _poesieAudio.preload='auto';
    _poesieAudio.addEventListener('ended',()=>{_poesieAudio=null;if(btn)btn.textContent='▶️ Écouter';});
    _poesieAudio.addEventListener('error',()=>{
      _poesieAudio=null;
      if(btn)btn.textContent='▶️ Écouter';
      speakText(cleanText);
    });
    _poesieAudio.play().catch(()=>speakText(cleanText));
    if(btn)btn.textContent='⏸ Pause';
  }else{
    speakText(cleanText);
    if(btn)btn.textContent='⏸ En lecture…';
  }
}
function stopPoesie(){
  if(_poesieAudio){try{_poesieAudio.pause()}catch(e){};_poesieAudio=null;}
  stopSpeaking();
  const btn=$('playBtn');if(btn)btn.textContent='▶️ Écouter';
}

let _recognition=null;
// iOS Safari ignore continuous=true et coupe après ~5s de silence.
// On détecte iOS et on relance silencieusement jusqu'à 12 fois tant que
// l'utilisateur n'a pas cliqué Stop → illusion d'écoute continue pour
// les longues récitations.
let _recUserStopped=false;
let _recRestartCount=0;
const _IS_IOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function startRecording(onResult,onEnd){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){alert('Reconnaissance vocale non supportée. Utilise Safari sur iPhone ou Chrome.');return null}
  if(_recognition){try{_recognition.stop()}catch(e){}_recognition=null}
  _recUserStopped=false;
  _recRestartCount=0;
  let finalTxt='';
  function _spawn(){
    _recognition=new SR();
    _recognition.lang='fr-FR';
    _recognition.continuous=true;
    _recognition.interimResults=true;
    _recognition.onresult=(e)=>{
      let interim='';
      for(let i=e.resultIndex;i<e.results.length;i++){
        if(e.results[i].isFinal) finalTxt+=e.results[i][0].transcript+' ';
        else interim+=e.results[i][0].transcript;
      }
      onResult(finalTxt+interim);
    };
    _recognition.onend=()=>{
      if(!_recUserStopped&&_IS_IOS&&_recRestartCount<12){
        _recRestartCount++;
        try{_spawn();return}catch(e){}
      }
      onEnd&&onEnd(finalTxt);
    };
    _recognition.onerror=(e)=>{
      if(e.error==='no-speech'||e.error==='aborted') return;
      _recUserStopped=true;
      onEnd&&onEnd(finalTxt+' [erreur: '+e.error+']');
    };
    _recognition.start();
  }
  try{_spawn()}catch(e){onEnd&&onEnd(finalTxt+' [erreur: '+e.message+']');return null}
  return _recognition;
}
function stopRecording(){
  _recUserStopped=true;
  if(_recognition){try{_recognition.stop()}catch(e){}_recognition=null}
}

function compareTexts(orig,spoken){
  const norm=s=>s.toLowerCase().replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\w\s]/g,' ').replace(/\s+/g,' ').trim();
  const o=norm(orig).split(' ');
  const s=norm(spoken).split(' ');
  const sSet=new Set(s);
  let matched=0;
  const result=o.map(w=>{const ok=sSet.has(w);if(ok)matched++;return {w,ok}});
  return {matched,total:o.length,score:Math.round(matched/o.length*100),result};
}

/* ════════ POÉSIES PERSONNALISÉES (ajoutées par le parent) ════════ */
function renderAddPoem(){
  const editing=state.editingPoemId?((profile.customPoems||[]).find(p=>p.id===state.editingPoemId)):null;
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3rem">📝</div>
    <h2 class="title" style="color:#a78bfa;font-size:1.5rem">${editing?'Modifier la poésie':'Ajouter une poésie'}</h2>
    <p class="sub">Pour que ton enfant l'écoute, la lise et la récite</p>
  </div>
  <div class="card mb-4">
    <label class="sub" style="display:block;margin-bottom:6px;font-weight:600">Titre</label>
    <input class="name-prompt" id="poemTitle" placeholder="Ex. La fourmi" maxlength="80" value="${esc(editing?editing.title:'')}">
    <label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Auteur (facultatif)</label>
    <input class="name-prompt" id="poemAuthor" placeholder="Ex. Robert Desnos" maxlength="60" value="${esc(editing?editing.author||'':'')}">
    <label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Texte de la poésie</label>
    <textarea id="poemText" rows="12" style="width:100%;padding:14px;background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-bright);font-family:inherit;font-size:1rem;line-height:1.6;resize:vertical">${esc(editing?editing.text:'')}</textarea>
    <p class="sub" style="margin-top:6px">Les sauts de ligne sont respectés. Pas besoin de balises.</p>
  </div>
  <div class="btn-row">
    <button class="btn-fire" onclick="saveCustomPoem()">${editing?'💾 Mettre à jour':'➕ Ajouter à mes poésies'}</button>
    <button class="btn-stone" onclick="cancelAddPoem()">Annuler</button>
  </div>`;
  setTimeout(()=>{const i=$('poemTitle');if(i&&!editing)i.focus();},100);
}

function cancelAddPoem(){state.editingPoemId=null;navigate('parent');}

function saveCustomPoem(){
  const title=$('poemTitle').value.trim();
  const author=$('poemAuthor').value.trim();
  const rawText=$('poemText').value.trim();
  if(!title){alert('Donne un titre à la poésie.');return}
  if(rawText.length<20){alert('Le texte de la poésie est trop court (au moins quelques vers).');return}
  if(!profile.customPoems) profile.customPoems=[];
  if(state.editingPoemId){
    const p=profile.customPoems.find(x=>x.id===state.editingPoemId);
    if(p){p.title=title;p.author=author;p.text=rawText;p.updatedAt=today();}
    state.editingPoemId=null;
  }else{
    const id='custom-'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
    const words=rawText.split(/\s+/).filter(Boolean).length;
    const dur=Math.max(20,Math.min(180,Math.round(words/2.5))); // ~150 mots/min
    profile.customPoems.push({id,title,author,text:rawText,dur,icon:'📝',addedAt:today(),custom:true});
  }
  saveProfile();
  navigate('poesieHome');
}

function editCustomPoem(id){state.editingPoemId=id;navigate('addPoem');}
function editCustomPoemId(id){editCustomPoem(id)}
function deleteCustomPoemId(id){deleteCustomPoem(id)}
function openFableIdx(i){const f=getAllPoems()[i];if(f)navigate('poesieFable',{fableId:f.id})}


/* ════════ EXERCICES PERSONNALISÉS (ajoutés par le parent) ════════ */
function renderAddExercise(){
  const editing=state.editingExerciseId?((profile.customExercises||[]).find(e=>e.id===state.editingExerciseId)):null;
  const cur=editing||{lv:'geo-cm2',cat:'',diff:2,q:'',ch:['','','',''],ans:0,se:''};
  const lvOptions=LEVELS.map(lv=>'<option value="'+esc(lv.id)+'"'+(cur.lv===lv.id?' selected':'')+'>'+esc(lv.name)+' — '+esc(lv.sub||'')+'</option>').join('');
  app.innerHTML='<div class="text-center py-6 fade-in">'
    +'<div style="font-size:3rem">\u{1F4DA}</div>'
    +'<h2 class="title" style="color:#34d399;font-size:1.5rem">'+(editing?'Modifier l\'exercice':'Ajouter un exercice')+'</h2>'
    +'<p class="sub">Question à choix multiples qui s\'ajoute au pool de '+esc(profile.name)+'</p>'
  +'</div>'
  +'<div class="card mb-4">'
    +'<label class="sub" style="display:block;margin-bottom:6px;font-weight:600">Niveau / matière</label>'
    +'<select class="name-prompt" id="exLv">'+lvOptions+'</select>'
    +'<label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Catégorie</label>'
    +'<input class="name-prompt" id="exCat" placeholder="Ex. Capitales du monde" maxlength="60" value="'+esc(cur.cat||'')+'">'
    +'<label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Difficulté (1 facile → 5 difficile)</label>'
    +'<select class="name-prompt" id="exDiff">'+[1,2,3,4,5].map(d=>'<option value="'+d+'"'+(cur.diff===d?' selected':'')+'>'+d+'</option>').join('')+'</select>'
    +'<label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Question</label>'
    +'<textarea id="exQ" rows="3" style="width:100%;padding:14px;background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-bright);font-family:inherit;font-size:1rem;line-height:1.5;resize:vertical">'+esc(cur.q||'')+'</textarea>'
    +'<label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Les 4 choix (coche la bonne réponse)</label>'
    +[0,1,2,3].map(i=>'<div class="row gap-2" style="margin-bottom:6px;align-items:center">'
      +'<input type="radio" name="exAns" value="'+i+'"'+(cur.ans===i?' checked':'')+' style="width:20px;height:20px;accent-color:#34d399;flex-shrink:0">'
      +'<input class="name-prompt" id="exCh'+i+'" style="margin:0;flex:1" placeholder="Choix '+String.fromCharCode(65+i)+'" maxlength="120" value="'+esc((cur.ch||[])[i]||'')+'">'
    +'</div>').join('')
    +'<label class="sub" style="display:block;margin:14px 0 6px;font-weight:600">Explication (affichée après la réponse)</label>'
    +'<textarea id="exSe" rows="2" style="width:100%;padding:14px;background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-bright);font-family:inherit;font-size:1rem;line-height:1.5;resize:vertical">'+esc(cur.se||'')+'</textarea>'
  +'</div>'
  +'<div class="btn-row">'
    +'<button class="btn-fire" onclick="saveCustomExercise()">'+(editing?'\u{1F4BE} Mettre à jour':'➕ Ajouter à mes exercices')+'</button>'
    +'<button class="btn-stone" onclick="cancelAddExercise()">Annuler</button>'
  +'</div>';
}

function cancelAddExercise(){state.editingExerciseId=null;navigate('parent');}

function saveCustomExercise(){
  const lv=$('exLv').value;
  const cat=$('exCat').value.trim().slice(0,60);
  const diff=parseInt($('exDiff').value,10)||2;
  const q=$('exQ').value.trim();
  const ch=[$('exCh0').value.trim(),$('exCh1').value.trim(),$('exCh2').value.trim(),$('exCh3').value.trim()];
  const ansEl=document.querySelector('input[name="exAns"]:checked');
  const ans=ansEl?parseInt(ansEl.value,10):0;
  const se=$('exSe').value.trim();
  if(!cat){alert('Donne une catégorie à l\'exercice (ex. « Capitales »).');return}
  if(q.length<5){alert('La question est trop courte.');return}
  if(ch.some(c=>!c)){alert('Remplis les 4 choix de réponse.');return}
  if(typeof isCleanName==='function'&&!isCleanName(q+' '+ch.join(' ')+' '+se)){alert('Ton exercice contient un mot interdit.');return}
  if(!profile.customExercises) profile.customExercises=[];
  if(state.editingExerciseId){
    const e=profile.customExercises.find(x=>x.id===state.editingExerciseId);
    if(e){e.lv=lv;e.cat=cat;e.diff=diff;e.q=q;e.ch=ch;e.ans=ans;e.se=se;e.updatedAt=today()}
    state.editingExerciseId=null;
  }else{
    const id='cex-'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
    profile.customExercises.push({id,lv,cat,diff,q,ch,ans,se,sk:cat,custom:true,addedAt:today()});
  }
  saveProfile();
  navigate('parent');
}

function editCustomExercise(id){state.editingExerciseId=id;navigate('addExercise');}

function deleteCustomExercise(id){
  const ex=(profile.customExercises||[]).find(x=>x.id===id);
  if(!ex) return;
  if(!confirm('Supprimer cet exercice ?')) return;
  profile.customExercises=profile.customExercises.filter(x=>x.id!==id);
  saveProfile();
  navigate('parent');
}


function deleteCustomPoem(id){
  const p=(profile.customPoems||[]).find(x=>x.id===id);
  if(!p) return;
  if(!confirm('Supprimer la poésie « '+p.title+' » ?')) return;
  profile.customPoems=profile.customPoems.filter(x=>x.id!==id);
  saveProfile();
  navigate(state.screen==='poesieFable'?'poesieHome':'parent');
}

function renderPoesieHome(){
  app.innerHTML=`<div class="text-center py-6 fade-in">
    <div style="font-size:3.5rem">\u{1F4DC}</div>
    <h2 class="title" style="color:#a78bfa;font-size:1.6rem">Poésies</h2>
    <p class="sub">Écoute, lis, récite à voix haute</p>
  </div>
  ${getAllPoems().map((f,i)=>{
    const stats=(profile.poesieStats||{})[f.id]||{};
    const best=stats.best||0;
    const star=best>=80?'\u2B50\u2B50\u2B50':best>=60?'\u2B50\u2B50':best>=40?'\u2B50':'';
    return `<div class="card clickable fade-in" style="animation-delay:${i*.05}s;border-color:#c4b5fd" onclick="openFableIdx(${i})">
      <div class="row">
        <div style="font-size:2.2rem">${f.icon}</div>
        <div class="flex-1">
          <h3 class="card-title" style="color:#5b21b6">${esc(f.title)}${f.custom?' <span style="font-size:.7rem;color:#34d399;border:1px solid #34d399;padding:2px 7px;border-radius:9999px;vertical-align:middle">📝 perso</span>':''}</h3>
          <p class="sub">${f.author?esc(f.author)+' · ':''}${f.dur}s à lire ${star?' \u2014 '+star:''}</p>
        </div>
        <div class="arrow">\u2192</div>
      </div>
    </div>`;
  }).join('')}
  <button class="btn-stone mt-4" onclick="navigate('home')">\u2190 Retour</button>`;
}

function renderPoesieFable(){
  const f=getPoemById(state.fableId);
  if(!f){navigate('poesieHome');return}
  const stats=(profile.poesieStats||{})[f.id]||{plays:0,best:0};
  // Les poésies persos sont stockées en texte brut : on les échappe et on
  // convertit les sauts de ligne. Les fables built-in sont déjà mises en
  // forme avec des <br> littéraux dans le code.
  const textHtml=f.custom?esc(f.text).replace(/\n/g,'<br>'):f.text;
  app.innerHTML=`<div class="text-center py-4 fade-in">
    <div style="font-size:3rem">${f.icon}</div>
    <h2 class="title" style="color:#5b21b6">${esc(f.title)}</h2>
    <p class="sub">${f.author?'de '+esc(f.author):''}${f.custom?' · 📝 ajoutée par toi':''}</p>
  </div>
  <div class="card mb-4" style="border-color:#c4b5fd">
    <div style="font-style:italic;color:#faf5ff;line-height:1.7;font-size:1.05rem;font-weight:500" id="fableText">${textHtml}</div>
    ${f.morale?`<div class="divider"></div>
    <div style="background:rgba(251,191,36,0.08);padding:10px 14px;border-radius:10px;border-left:3px solid rgba(251,191,36,0.5);color:#fbbf24;font-weight:600">\u{1F4A1} Morale : <em>${esc(f.morale)}</em></div>`:''}
  </div>
  <div class="card mb-4" style="border-color:#a78bfa">
    <h3 class="card-title" style="color:#5b21b6;margin-bottom:6px">\u{1F3A7} Écoute</h3>
    <p class="sub mb-2">${f.audioUrl?'\u{1F3A4} Lecture studio (voix expressive d\'un conteur).':'\u{1F916} Voix de synthèse du navigateur (intonation limitée).'}</p>
    <div class="btn-row">
      <button class="btn-fire" id="playBtn" onclick="playPoesie()">\u25B6\uFE0F Écouter</button>
      <button class="btn-stone" onclick="stopPoesie()">\u23F9\uFE0F Stop</button>
    </div>
  </div>
  <div class="card mb-4" style="border-color:#22c55e">
    <h3 class="card-title" style="color:#34d399;margin-bottom:12px">\u{1F3A4} À toi de réciter !</h3>
    <p class="sub mb-2">Clique sur le micro et récite la fable. L'app va comparer ce que tu dis au texte.</p>
    <button class="btn-fire" id="recBtn" onclick="togglePoesieRec()">\u{1F534} Démarrer le micro</button>
    <div id="recLive" style="margin-top:14px;padding:12px;background:rgba(52,211,153,0.06);border-radius:10px;border:1px solid #86efac;min-height:60px;color:#a7f3d0;font-style:italic;display:none"></div>
    <div id="recResult"></div>
  </div>
  <div class="card mb-4">
    <h3 class="card-title" style="margin-bottom:8px">\u{1F4CA} Tes scores</h3>
    <div class="row gap-2"><div class="resource">\u{1F39E}\uFE0F ${stats.plays||0} essais</div><div class="resource flame">\u{1F31F} Meilleur : ${stats.best||0}%</div></div>
  </div>
  ${f.custom?`<div class="btn-row mb-4"><button class="btn-stone btn-small" onclick="editCustomPoemId(this.dataset.pid)" data-pid="${esc(f.id)}">\u270f\ufe0f Modifier</button><button class="btn-stone btn-small" onclick="deleteCustomPoemId(this.dataset.pid)" data-pid="${esc(f.id)}" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#fca5a5">\ud83d\uddd1\ufe0f Supprimer</button></div>`:''}
  <button class="btn-stone" onclick="navigate('poesieHome')">\u2190 Autres po\u00e9sies</button>`;
}

window._poesieRecording=false;
function togglePoesieRec(){
  const btn=$('recBtn');const live=$('recLive');const res=$('recResult');
  if(!window._poesieRecording&&!localStorage.getItem('royaume_mic_consent')){
    ensureMicConsent(function(){togglePoesieRec()},function(){});
    return;
  }
  if(window._poesieRecording){
    stopRecording();
    window._poesieRecording=false;
    btn.textContent='\u{1F534} Démarrer le micro';
    btn.classList.remove('pulse');
    return;
  }
  const f=getPoemById(state.fableId);
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
      if(!finalTxt||finalTxt.trim().length<5){res.innerHTML='<p style="color:#fbbf24;margin-top:10px">Pas de voix détectée. Réessaie !</p>';return}
      // Utilise l'innerText du DOM rendu : sauts de ligne propres et entités HTML décodées.
      const ftEl=$('fableText');
      const cleanOrig=ftEl?ftEl.innerText:f.text;
      const cmp=compareTexts(cleanOrig,finalTxt);
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
          <p style="font-size:1.4rem;font-weight:700;color:#fbbf24;margin:8px 0">${cmp.score}% \u2014 ${cmp.matched}/${cmp.total} mots</p>
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
    <h2 class="title" style="color:#fbbf24;font-size:1.6rem">Fiches Bilan</h2>
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
  }catch(e){
    state.topics=[];
    alert(_friendlyApiError(e.message));
    render();
  }
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
  ${state.topics.map((t,i)=>`<div class="card clickable fade-in" style="animation-delay:${i*.05}s" onclick="loadFicheIdx(${i})">
    <div class="row">
      <div style="font-size:2rem">${esc(t.emoji||'\u{1F4D6}')}</div>
      <div class="flex-1">
        <h3 class="card-title">${esc(t.title)}</h3>
        <p class="sub">${esc(t.desc||'')}</p>
      </div>
      <div class="arrow">\u2192</div>
    </div>
  </div>`).join('')}
  <button class="btn-stone mt-4" onclick="navigate('fichesSubject',{subjectId:state.subjectId})">\u2190 Retour</button>`;
}

function loadFicheIdx(i){const t=(state.topics||[])[i];if(t)loadFiche(String(t.id||''),String(t.title||''))}
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
  }catch(e){
    // Si filtre contenu : on propose juste un retour au choix de thème sans alarmer.
    if(_isContentFilterError(e.message)){
      alert("🪄 Cette leçon est en cours d'écriture par le Sage. Choisis un autre thème ou réessaie plus tard.");
    }else{
      alert(_friendlyApiError(e.message));
    }
    navigate('fichesTopics');
  }
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
    <h1 class="fiche-h1">${esc(f.titre||state.ficheTopic.title)}</h1>
    ${f.intro?`<p class="fiche-intro">${esc(f.intro)}</p>`:''}
    ${(f.essentiel&&f.essentiel.length>0)?`<div class="fiche-section"><h3>\u2728 L'essentiel</h3><ul class="fiche-list">${f.essentiel.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>`:''}
    ${(f.dates&&f.dates.length>0)?`<div class="fiche-section"><h3>\u{1F4C5} Dates cl\u00e9s</h3>${f.dates.map(d=>`<div class="fiche-mini"><b>${esc(d.date)}</b> \u2014 ${esc(d.evenement)}</div>`).join('')}</div>`:''}
    ${(f.personnalites&&f.personnalites.length>0)?`<div class="fiche-section"><h3>\u{1F464} Personnalit\u00e9s</h3>${f.personnalites.map(p=>`<div class="fiche-mini"><b>${esc(p.nom)}</b> \u2014 ${esc(p.role)}</div>`).join('')}</div>`:''}
    ${(f.vocabulaire&&f.vocabulaire.length>0)?`<div class="fiche-section"><h3>\u{1F4DA} Vocabulaire</h3>${f.vocabulaire.map(v=>`<div class="fiche-mini"><b>${esc(v.mot)}</b> : ${esc(v.definition)}</div>`).join('')}</div>`:''}
    ${f.anecdote?`<div class="fiche-anecdote">\u{1F4A1} <b>Le savais-tu ?</b> ${esc(f.anecdote)}</div>`:''}
    ${f.retiens_bien?`<div class="fiche-retiens">\u{1F31F} ${esc(f.retiens_bien)}</div>`:''}
    ${(f.quiz_rapide&&f.quiz_rapide.length>0)?`<div class="fiche-section"><h3>\u{1F3AF} Quiz \u00e9clair</h3>${f.quiz_rapide.map((q,i)=>`<div class="fiche-mini" onclick="this.querySelector('span').classList.toggle('hidden')" style="cursor:pointer"><b>Q${i+1} :</b> ${esc(q.q)}<br><span class="hidden" style="color:#34d399;font-weight:600">\u279c ${esc(q.r)}</span><br><small style="color:#8b7ec8">(clique pour voir la r\u00e9ponse)</small></div>`).join('')}</div>`:''}
  </div>
  <div class="btn-row">
    <button class="btn-stone" onclick="loadFiche(state.ficheTopic.id,state.ficheTopic.title)">\u{1F504} R\u00e9g\u00e9n\u00e9rer</button>
    <button class="btn-stone" onclick="navigate('fichesTopics')">\u2190 Autres th\u00e8mes</button>
  </div>`;
}

/* ════════ IDENTITÉ DE BATTLE (pseudo Supabase si configuré) ════════
   Quand Supabase est branché (config.js), chaque enfant réserve un pseudo
   UNIQUE protégé par un code secret : les battles utilisent le pseudo,
   fini les collisions entre deux « Léa ». Sans config : prénom, comme avant.
*/
function playerName(){return (profile&&profile.pseudo)||(profile&&profile.name)||''}

function _renderInviteBanner(inv,totalCount){
  const holder=document.createElement('div');
  holder.innerHTML='<div class="card fade-in glow-anim" id="inviteBanner" style="border-color:#f472b6;background:rgba(244,114,182,0.1)">'
    +'<div class="row" style="gap:12px">'
      +'<div style="font-size:2.2rem">⚔️</div>'
      +'<div class="flex-1"><h3 class="card-title" style="color:#f472b6">'+esc(inv.from)+' te défie !</h3>'
      +'<p class="sub">'+esc(inv.lvName||'')+' · '+(inv.count||'?')+' questions'+(totalCount>1?' · +'+(totalCount-1)+' autre(s) défi(s)':'')+'</p></div>'
    +'</div>'
    +'<div class="btn-row mt-3">'
      +'<button class="btn-fire" data-code="'+esc(inv.code)+'" onclick="joinBattle(this.dataset.code)">🔥 Relever le défi</button>'
      +'<button class="btn-stone" data-code="'+esc(inv.code)+'" onclick="dismissInvite(this.dataset.code)">Plus tard</button>'
    +'</div>'
  +'</div>';
  const first=app.firstElementChild;
  if(first) app.insertBefore(holder.firstElementChild,first);
}

function renderPseudoSetup(){
  if(!window.Supa||!Supa.enabled()){navigate('home');return}
  app.innerHTML='<div class="text-center py-6 fade-in">'
    +'<div style="font-size:3.5rem">🛡️</div>'
    +'<h2 class="title" style="color:#f472b6;font-size:1.5rem">Ton pseudo de battle</h2>'
    +'<p class="sub">Un nom unique au monde pour te battre avec tes amis — protégé par ton code secret.</p>'
  +'</div>'
  +'<div class="card mb-4" style="border-color:#f472b6">'
    +'<h3 class="fredoka" style="font-size:.85rem;color:#f472b6;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">✨ Créer mon pseudo</h3>'
    +'<input class="name-prompt" id="pseudoInp" placeholder="Ex. DragonDore" maxlength="16" autocomplete="off" oninput="checkPseudoLive()">'
    +'<p class="sub" id="pseudoHint" style="font-size:.75rem;margin:4px 0 10px">3 à 16 caractères : lettres, chiffres, - et _</p>'
    +'<input class="name-prompt" id="pinInp" placeholder="Code secret : 4 chiffres" maxlength="6" inputmode="numeric" pattern="[0-9]*" type="password">'
    +'<p class="sub" style="font-size:.72rem;margin-top:4px">🔐 Retiens-le bien : il servira sur les autres appareils. Papa/Maman peuvent le noter.</p>'
    +'<button class="btn-fire mt-3" onclick="doRegisterPseudo()">🛡️ Réserver mon pseudo</button>'
  +'</div>'
  +'<div class="card mb-4" style="border-color:#60a5fa">'
    +'<h3 class="fredoka" style="font-size:.85rem;color:#60a5fa;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">🔑 J\'ai déjà un pseudo</h3>'
    +'<input class="name-prompt" id="pseudoLoginInp" placeholder="Ton pseudo" maxlength="16" autocomplete="off">'
    +'<input class="name-prompt" id="pinLoginInp" style="margin-top:8px" placeholder="Ton code secret" maxlength="6" inputmode="numeric" type="password">'
    +'<button class="btn-fire mt-3" onclick="doLoginPseudo()">🚀 Me connecter</button>'
  +'</div>'
  +'<button class="btn-stone" onclick="navigate(\'home\')">Plus tard →</button>';
}
let _pseudoCheckT=null;
function checkPseudoLive(){
  const inp=document.getElementById('pseudoInp');
  const hint=document.getElementById('pseudoHint');
  if(!inp||!hint)return;
  const v=inp.value.trim();
  if(_pseudoCheckT)clearTimeout(_pseudoCheckT);
  if(!/^[A-Za-z0-9_-]{3,16}$/.test(v)){hint.textContent='3 à 16 caractères : lettres, chiffres, - et _';hint.style.color='#8b7ec8';return}
  _pseudoCheckT=setTimeout(async()=>{
    const r=await Supa.checkPseudo(v);
    const cur=document.getElementById('pseudoInp');
    if(cur&&cur.value.trim()===v){
      if(r&&r.available){hint.textContent='✅ « '+v+' » est libre !';hint.style.color='#34d399'}
      else{hint.textContent='❌ « '+v+' » est déjà pris — essaie '+v+Math.floor(Math.random()*90+10);hint.style.color='#f87171'}
    }
  },350);
}
async function doRegisterPseudo(){
  const pseudo=((document.getElementById('pseudoInp')||{}).value||'').trim();
  const pin=((document.getElementById('pinInp')||{}).value||'').trim();
  if(!/^[A-Za-z0-9_-]{3,16}$/.test(pseudo)){alert('Pseudo : 3 à 16 caractères (lettres, chiffres, - et _).');return}
  if(!/^[0-9]{4,6}$/.test(pin)){alert('Code secret : 4 à 6 chiffres.');return}
  if(typeof isCleanName==='function'&&!isCleanName(pseudo)){alert('Ce pseudo contient un mot interdit.');return}
  const res=await Supa.register(profile.name,pseudo,pin);
  if(res&&res.pseudo){
    profile.pseudo=res.pseudo;
    saveProfile();
    alert('🛡️ Pseudo « '+res.pseudo+' » réservé pour toujours ! En battle, tes amis te verront sous ce nom.');
    navigate('home');
  }else if(res&&res.error==='pseudo_pris'){
    alert('❌ Ce pseudo est déjà pris. Essaie une variante !');
  }else{
    alert('🌐 Impossible pour le moment ('+((res&&res.error)||'réseau')+'). Réessaie.');
  }
}
async function doLoginPseudo(){
  const pseudo=((document.getElementById('pseudoLoginInp')||{}).value||'').trim();
  const pin=((document.getElementById('pinLoginInp')||{}).value||'').trim();
  if(!pseudo||!pin){alert('Entre ton pseudo et ton code secret.');return}
  const res=await Supa.login(profile.name,pseudo,pin);
  if(res&&res.pseudo){
    profile.pseudo=res.pseudo;
    if(res.profile&&res.profile.name){profile=mergeProfiles(profile,migrate(res.profile));profile.pseudo=res.pseudo}
    saveProfile();
    alert('🚀 Re-bonjour '+res.pseudo+' ! Ton profil est synchronisé.');
    navigate('home');
  }else{
    alert('❌ Pseudo ou code secret incorrect.');
  }
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 BATTLE DES AMIS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   Deux joueurs (ou plus) jouent EXACTEMENT les m\u00eames questions, chacun sur
   son appareil, reli\u00e9s par un code court kid-friendly (ex. POTION-37).
   Le document de battle est stock\u00e9 c\u00f4t\u00e9 Worker sous une cl\u00e9 d\u00e9riv\u00e9e du
   code (sha256 'battle:'+code \u2192 32 hex), via les endpoints /profile
   existants \u2014 aucun changement backend n\u00e9cessaire.
   Jeu asynchrone fa\u00e7on Wordle : pas besoin d'\u00eatre connect\u00e9s en m\u00eame temps.
*/
const BATTLE_WORDS=['DRAGON','POTION','ETOILE','LICORNE','GRIFFON','CRISTAL','PHENIX','TONNERRE','COMETE','SORCIER','PLUME','LUTIN','ORAGE','SAPHIR','RUBIS','MERLIN','PEGASE','YETI','KRAKEN','NINJA'];

function normalizeBattleCode(raw){
  let s=String(raw||'');
  // Tolère un ancien lien complet (…?battle=TONNERRE-80) collé ou scanné.
  const url=s.match(/[?&]battle=([^&\s]+)/i);
  if(url) s=decodeURIComponent(url[1]);
  s=s.toUpperCase().replace(/[^A-Z0-9]/g,'');
  // Format historique MOT+2 chiffres (DRAGON80 \u2192 DRAGON-80). Le seuil de
  // 6 caract\u00e8res \u00e9vite de transformer un futur code court type "AB12".
  if(s.length>=6){
    const m=s.match(/^([A-Z]+)(\d{2})$/);
    if(m) return m[1]+'-'+m[2];
  }
  return s;
}
function randomBattleCode(){
  const w=BATTLE_WORDS[Math.floor(Math.random()*BATTLE_WORDS.length)];
  const n=String(Math.floor(Math.random()*100)).padStart(2,'0');
  return w+'-'+n;
}
async function battleAid(code){
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('battle:'+normalizeBattleCode(code)));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,32);
}
async function fetchBattle(code){
  return await fetchProfileByAid(await battleAid(code));
}
async function pushBattle(battle){
  const aid=await battleAid(battle.code);
  await fetch(API_BASE+'/profile/'+aid,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(battle)});
}
/* ════════ ANALYTICS PRODUIT (local, sans SDK tiers) ════════
   Aucune donnée personnelle n'est collectée : juste des compteurs
   d'événements pour mesurer ce qui marche. Ne lève JAMAIS d'exception. */
function track(event,props){
  try{
    const e={e:String(event),t:Date.now()};
    if(props&&typeof props==='object'){
      for(const k of Object.keys(props)){
        const v=props[k];
        if(typeof v==='number'||typeof v==='boolean') e[k]=v;
        else if(typeof v==='string'&&v.length<=40) e[k]=v;
      }
    }
    const arr=JSON.parse(localStorage.getItem('royaume_events')||'[]');
    arr.push(e);
    while(arr.length>200) arr.shift();
    localStorage.setItem('royaume_events',JSON.stringify(arr));
  }catch(err){}
}
function analyticsDump(){try{return JSON.parse(localStorage.getItem('royaume_events')||'[]')}catch(e){return[]}}

/* ════════ CONTENU DES BATTLES — décorrélé du niveau scolaire ════════
   CHOIX PRODUIT : un CE2 et un 5e ne doivent pas être départagés par leur
   classe mais par leur réflexion, leur mémoire et leur rapidité. Les
   battles piochent donc par défaut dans des pools TRANSVERSES, identiques
   pour les deux joueurs — le problème d'équilibrage de niveau disparaît.
   Le mode « programme scolaire » reste disponible (même niveau imposé aux
   deux joueurs, comportement historique inchangé). */
const BATTLE_DISCIPLINES=[
  {id:'logique', name:'Logique',  icon:'\u{1F9E0}', color:'#a78bfa', lv:'logique',
   desc:'Suites, intrus, énigmes'},
  {id:'memory',  name:'Memory',   icon:'\u{1F0CF}', color:'#34d399', mode:'memory',
   desc:'8 paires, mêmes cartes'},
  {id:'monde',   name:'Monde',    icon:'\u{1F30D}', color:'#38bdf8', lv:'geo-drapeaux',
   desc:'Drapeaux, pays, capitales'},
  {id:'eclair',  name:'Éclair',   icon:'⚡', color:'#fbbf24', gen:'eclair',
   desc:'Calcul mental rapide'},
  {id:'observation', name:'Observation', icon:'\u{1F440}', color:'#f472b6', gen:'observation',
   desc:'Compter et repérer vite'}
];
function battleDiscipline(id){return BATTLE_DISCIPLINES.find(d=>d.id===id)||null}

/* Générateur DÉTERMINISTE : à partir du code de la battle, les deux
   appareils fabriquent exactement les mêmes calculs — rien à stocker,
   aucune divergence possible entre les deux téléphones. */
function _seedFromCode(code){
  let h=2166136261>>>0; const c=String(code||'');
  for(let i=0;i<c.length;i++){h^=c.charCodeAt(i);h=Math.imul(h,16777619)>>>0}
  return h>>>0;
}
function _mulberry32(a){
  return function(){
    a=(a+0x6D2B79F5)>>>0; let t=a;
    t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61);
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
function genEclairQuestions(code,n){
  const rnd=_mulberry32(_seedFromCode(code)); const out=[];
  for(let i=0;i<n;i++){
    const kind=Math.floor(rnd()*3); let a,b,res,sym;
    if(kind===0){a=2+Math.floor(rnd()*48);b=2+Math.floor(rnd()*48);res=a+b;sym='+'}
    else if(kind===1){a=10+Math.floor(rnd()*60);b=2+Math.floor(rnd()*(a-2));res=a-b;sym='−'}
    else{a=2+Math.floor(rnd()*9);b=2+Math.floor(rnd()*9);res=a*b;sym='×'}
    const set=new Set([res]);
    while(set.size<4){
      const off=(rnd()<0.5?-1:1)*(1+Math.floor(rnd()*9));
      const v=res+off; if(v>=0) set.add(v);
    }
    const ch=Array.from(set);
    for(let k=ch.length-1;k>0;k--){const j=Math.floor(rnd()*(k+1));const t=ch[k];ch[k]=ch[j];ch[j]=t}
    out.push({id:'ecl_'+code+'_'+i,lv:'eclair',cat:'Calcul Éclair',diff:2,
      q:a+' '+sym+' '+b+' = ?',ch:ch.map(String),ans:ch.indexOf(res),
      se:a+' '+sym+' '+b+' = '+res,sk:'Calcul mental'});
  }
  return out;
}

/* ── ÉPREUVE OBSERVATION & VITESSE (générée, donc toujours équitable) ──
   Compter des formes, repérer l'intrus visuel : ça ne s'apprend pas à
   l'école — un CP attentif peut battre un 5e distrait. Comme le Calcul
   Éclair, tout est fabriqué à partir du code de la battle, donc les deux
   téléphones voient exactement la même grille. */
const OBS_SETS=[
  ['\u{1F534}','\u{1F535}'],['\u{1F7E2}','\u{1F7E1}'],['\u{1F536}','\u{1F537}'],
  ['\u2B50','\u2728'],['\u{1F34E}','\u{1F345}'],['\u{1F431}','\u{1F436}'],
  ['\u{1F338}','\u{1F33C}'],['\u{1F41D}','\u{1F41E}']
];
function genObservationQuestions(code,n){
  const rnd=_mulberry32(_seedFromCode('obs:'+code));
  const shuf=(arr)=>{for(let k=arr.length-1;k>0;k--){const j=Math.floor(rnd()*(k+1));const t=arr[k];arr[k]=arr[j];arr[j]=t}return arr};
  const out=[];
  for(let i=0;i<n;i++){
    const pair=OBS_SETS[Math.floor(rnd()*OBS_SETS.length)];
    const A=pair[0],B=pair[1];
    if(Math.floor(rnd()*2)===0){
      // Compter : combien de A dans la grille ?
      const total=12+Math.floor(rnd()*9);
      const nA=3+Math.floor(rnd()*Math.min(7,total-4));
      const cells=[];
      for(let k=0;k<total;k++) cells.push(k<nA?A:B);
      shuf(cells);
      const rows=[];
      for(let k=0;k<cells.length;k+=6) rows.push(cells.slice(k,k+6).join(' '));
      const set=new Set([nA]);
      while(set.size<4){const v=nA+(rnd()<0.5?-1:1)*(1+Math.floor(rnd()*3));if(v>0)set.add(v)}
      const ch=shuf(Array.from(set)).map(String);
      out.push({id:'obs_'+code+'_'+i,lv:'observation',cat:'Observation',diff:2,
        q:'Combien de '+A+' vois-tu ?',visual:rows.join('\n'),visualKind:'grid',
        ch:ch,ans:ch.indexOf(String(nA)),se:'Il y en avait exactement '+nA+'.',sk:'Compter vite'});
    }else{
      // Repérer l'intrus : une seule case diffère.
      const total=8+Math.floor(rnd()*5);
      const pos=Math.floor(rnd()*total);
      const cells=[];
      for(let k=0;k<total;k++) cells.push(k===pos?B:A);
      const rows=[];
      for(let k=0;k<cells.length;k+=6){
        rows.push(cells.slice(k,k+6).map((c,idx)=>c+String(k+idx+1)).join('  '));
      }
      const good=String(pos+1);
      const set=new Set([good]);
      while(set.size<4){set.add(String(1+Math.floor(rnd()*total)))}
      const ch=shuf(Array.from(set));
      out.push({id:'obs_'+code+'_'+i,lv:'observation',cat:'Observation',diff:3,
        q:'Quel numéro est différent des autres ?',visual:rows.join('\n'),visualKind:'grid',
        ch:ch,ans:ch.indexOf(good),se:'Le numéro '+good+' était un '+B+' au milieu des '+A+'.',sk:'Repérer vite'});
    }
  }
  return out;
}

// Base PUBLIQUE du jeu : toujours le site web. Dans l'app iOS,
// window.location.origin vaut capacitor://localhost → lien mort. Jamais ça.
const PUBLIC_BASE='https://jmcmg-creator.github.io/kangourou-maths/';
const TESTFLIGHT_URL='https://testflight.apple.com/join/KY83JYtY';
// Lien magique : un tap dessus ouvre le jeu directement dans la battle
// (dans le navigateur — et propose l'app iPhone via TestFlight).
function battleLink(code){
  return PUBLIC_BASE+'?battle='+encodeURIComponent(normalizeBattleCode(code));
}
// QR affiché à l'écran : le copain le scanne avec son appareil photo →
// l'iPhone propose d'ouvrir le lien → le jeu s'ouvre et rejoint la battle.
// Le scanner intégré de l'app sait aussi le lire (normalizeBattleCode
// extrait le code depuis ?battle=XXX).
function renderBattleQRInto(elId,code){
  const el=document.getElementById(elId);
  if(!el||typeof window.qrcode!=='function') return;
  try{
    const qr=window.qrcode(0,'M');
    qr.addData(battleLink(code));
    qr.make();
    const n=qr.getModuleCount(),quiet=3,sz=n+quiet*2;
    let rects='';
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(qr.isDark(r,c))rects+='<rect x="'+(c+quiet)+'" y="'+(r+quiet)+'" width="1" height="1"/>';
    el.innerHTML='<svg viewBox="0 0 '+sz+' '+sz+'" style="width:170px;height:170px;background:#fff;border-radius:12px;display:block;margin:10px auto 0" shape-rendering="crispEdges"><g fill="#0f0a2e">'+rects+'</g></svg>'
      +'<p class="sub" style="font-size:.72rem;margin-top:6px">📷 Scanne-le avec l\'appareil photo : le jeu s\'ouvre tout seul dans la battle</p>';
  }catch(e){console.warn('qr fail',e)}
}

// ── Scanner QR natif (app iOS — @capacitor-mlkit/barcode-scanning) ────
function _hasNativeScanner(){
  return !!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
}
async function scanBattleQR(){
  if(!_hasNativeScanner()){alert('Le scanner est disponible dans l\'app iPhone.');return}
  try{
    const BS=window.Capacitor.registerPlugin('BarcodeScanner');
    try{
      const p=await BS.requestPermissions();
      if(p&&p.camera&&p.camera!=='granted'&&p.camera!=='limited'){
        alert('Autorise la caméra dans Réglages → Royaume des Savoirs pour scanner.');
        return;
      }
    }catch(e){}
    const res=await BS.scan({formats:['QR_CODE']});
    const raw=res&&res.barcodes&&res.barcodes[0]&&res.barcodes[0].rawValue;
    if(!raw){alert('Aucun QR détecté. Réessaie en visant bien le carré.');return}
    // Accepte le code brut ET les anciens QR contenant ?battle=XXX.
    const code=normalizeBattleCode(raw);
    const inp=document.getElementById('battleCodeInp');
    if(inp)inp.value=code;
    joinBattle(code);
  }catch(e){
    alert('Scan impossible : '+((e&&e.message)||e));
  }
}

// ── Boîte à défis (invitations entre amis) ────────────────────────────
// Chaque joueur a une "boîte" stockée sous une clé dérivée de son prénom.
// Un ami y dépose un défi ; le destinataire la consulte à l'ouverture.
async function mailboxAid(name){
  const norm=String(name||'').toLowerCase().trim().replace(/\s+/g,'');
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('royaume-mailbox:'+norm));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,32);
}
async function sendBattleInvite(friendName,battle){
  if(window.Supa&&Supa.enabled()&&Supa.creds(profile.name)){
    const r=await Supa.sendInvite(profile.name,friendName,battle.code,battle.lvName,battle.count);
    if(r&&r.ok) return true;
    if(r&&r.error==='destinataire_inconnu') return false;
  }
  try{
    const aid=await mailboxAid(friendName);
    let box=await fetchProfileByAid(aid);
    if(!box||!box.mailbox) box={mailbox:true,invites:[]};
    box.invites=(box.invites||[]).filter(i=>i.code!==battle.code).slice(-9);
    box.invites.push({code:battle.code,from:playerName(),lvName:battle.lvName,count:battle.count,at:new Date().toISOString()});
    await fetch(API_BASE+'/profile/'+aid,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(box)});
    return true;
  }catch(e){console.warn('invite fail',e);return false}
}
// Bannière "X te défie !" sur l'accueil (fire-and-forget, jamais bloquant).
async function checkBattleInvites(){
  if(!playerName()) return;
  try{
    if(window.Supa&&Supa.enabled()&&Supa.creds(profile.name)){
      const inv=await Supa.fetchInvites(profile.name);
      if(inv&&inv.length&&state.screen==='home'){
        const played=new Set((profile.battleHistory||[]).map(h=>h.code));
        const dismissed=new Set(profile.dismissedInvites||[]);
        const fresh=inv.filter(i=>i&&i.code&&!played.has(i.code)&&!dismissed.has(i.code));
        if(fresh.length){_renderInviteBanner(fresh[fresh.length-1],fresh.length);return}
      }
    }
  }catch(e){}
  try{
    const aid=await mailboxAid(playerName());
    const box=await fetchProfileByAid(aid);
    if(!box||!box.mailbox||!Array.isArray(box.invites)||box.invites.length===0) return;
    if(state.screen!=='home') return; // l'utilisateur a déjà navigué ailleurs
    const played=new Set((profile.battleHistory||[]).map(h=>h.code));
    const dismissed=new Set(profile.dismissedInvites||[]);
    const weekAgo=Date.now()-7*24*3600*1000;
    const fresh=box.invites.filter(i=>i&&i.code&&!played.has(i.code)&&!dismissed.has(i.code)&&(new Date(i.at||0).getTime()>weekAgo));
    if(fresh.length===0) return;
    const inv=fresh[fresh.length-1]; // le plus récent
    const holder=document.createElement('div');
    holder.innerHTML='<div class="card fade-in glow-anim" id="inviteBanner" style="border-color:#f472b6;background:rgba(244,114,182,0.1)">'
      +'<div class="row" style="gap:12px">'
        +'<div style="font-size:2.2rem">⚔️</div>'
        +'<div class="flex-1"><h3 class="card-title" style="color:#f472b6">'+esc(inv.from)+' te défie !</h3>'
        +'<p class="sub">'+esc(inv.lvName||'')+' · '+(inv.count||'?')+' questions'+(fresh.length>1?' · +'+(fresh.length-1)+' autre(s) défi(s)':'')+'</p></div>'
      +'</div>'
      +'<div class="btn-row mt-3">'
        +'<button class="btn-fire" data-code="'+esc(inv.code)+'" onclick="joinBattle(this.dataset.code)">🔥 Relever le défi</button>'
        +'<button class="btn-stone" data-code="'+esc(inv.code)+'" onclick="dismissInvite(this.dataset.code)">Plus tard</button>'
      +'</div>'
    +'</div>';
    const first=app.firstElementChild;
    if(first) app.insertBefore(holder.firstElementChild,first);
  }catch(e){}
}
function dismissInvite(code){
  if(!profile.dismissedInvites)profile.dismissedInvites=[];
  if(!profile.dismissedInvites.includes(code))profile.dismissedInvites.push(code);
  profile.dismissedInvites=profile.dismissedInvites.slice(-30);
  saveProfile();
  const b=document.getElementById('inviteBanner');
  if(b)b.remove();
}
// Défi 1-tap depuis la liste d'amis : crée la battle avec le niveau/quantité
// sélectionnés dans le formulaire, et dépose l'invitation chez l'ami.
function challengeFriend(name){
  const lvSel=document.getElementById('battleLv');
  const lvId=lvSel?lvSel.value:null;
  createBattle(lvId,window._battleCount||5,name);
}

// \u2500\u2500 Cr\u00e9ation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// inviteName (optionnel) : d\u00e9pose aussi un d\u00e9fi dans la bo\u00eete de cet ami.
async function createBattle(lvId,count,inviteName){
  // Discipline « Éclair » : les questions ne viennent pas d'un pool mais
  // sont fabriquées à partir du code de la battle → strictement identiques
  // sur les deux téléphones, sans rien stocker.
  const gen=(lvId==='eclair'||lvId==='observation')?lvId:null;
  const GEN_LABEL={eclair:{name:'\u26a1 Calcul \u00c9clair',sub:'Tous \u00e2ges'},observation:{name:'\u{1F440} Observation',sub:'Tous \u00e2ges'}};
  const lv=gen?GEN_LABEL[gen]:LEVELS.find(l=>l.id===lvId);
  if(!lv){alert('Choisis d\'abord un niveau.');return}
  // dedupeExercises : deux joueurs ne doivent jamais tomber deux fois sur le même énoncé.
  const pool=gen?[]:dedupeExercises(EX.filter(e=>e.lv===lvId&&isPlayableEx(e)&&Array.isArray(e.ch)&&e.ch.length===4));
  if(!gen&&pool.length<count){alert('Pas assez de questions pour ce niveau ('+pool.length+' dispo). Choisis un autre niveau ou 5 questions.');return}
  app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\u2694\ufe0f</div><h2 class="title">Pr\u00e9paration de la battle\u2026</h2></div>';
  // Code unique : on retire si une battle existe d\u00e9j\u00e0 sous ce code.
  let code=randomBattleCode();
  for(let tries=0;tries<5;tries++){
    const existing=await fetchBattle(code);
    if(!existing||!existing.battle) break;
    code=randomBattleCode();
  }
  const exIds=gen?[]:shuffle(pool).slice(0,count).map(e=>e.id);
  const battle={battle:true,code,createdAt:new Date().toISOString(),level:lvId,lvName:(lv.name+' \u2014 '+(lv.sub||'')),count,exIds,hostName:playerName(),players:{}};
  if(gen) battle.gen=gen;
  try{await pushBattle(battle)}catch(e){alert('\ud83c\udf10 Impossible de cr\u00e9er la battle (connexion ?). R\u00e9essaie.');navigate('battleHome');return}
  // M\u00e9morise dans l'historique local (r\u00e9sultats compl\u00e9t\u00e9s plus tard).
  if(!profile.battleHistory)profile.battleHistory=[];
  profile.battleHistory.unshift({code,date:battle.createdAt,level:lvId,lvName:battle.lvName,count});
  profile.battleHistory=profile.battleHistory.slice(0,50);
  saveProfile();
  if(inviteName){
    const ok=await sendBattleInvite(inviteName,battle);
    if(ok) alert('\u2694\ufe0f D\u00e9fi envoy\u00e9 \u00e0 '+inviteName+' ! Il/elle le verra en ouvrant son app.');
  }
  track('battle_code_created',{discipline:String(lvId).slice(0,20),count:count});
  navigate('battleResults',{battleViewCode:code});
}

// \u2500\u2500 Rejoindre \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function joinBattle(rawCode){
  const code=normalizeBattleCode(rawCode);
  if(!code||code.length<4){alert('Entre le code de la battle (ex. POTION-37).');return}
  app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\ud83d\udd0e</div><h2 class="title">Recherche de la battle\u2026</h2></div>';
  const battle=await fetchBattle(code);
  if(!battle||!battle.battle){alert('Aucune battle trouv\u00e9e avec le code \u00ab\u00a0'+esc(code)+'\u00a0\u00bb. V\u00e9rifie le code avec ton copain.');navigate('battleHome');return}
  if(!profile.battleHistory)profile.battleHistory=[];
  if(!profile.battleHistory.some(h=>h.code===code)){
    profile.battleHistory.unshift({code,date:battle.createdAt,level:battle.level,lvName:battle.lvName,count:battle.count});
    profile.battleHistory=profile.battleHistory.slice(0,50);
    saveProfile();
  }
  navigate('battleResults',{battleViewCode:code});
}

// \u2500\u2500 Jouer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function startBattleGame(battle){
  // Deux sources possibles, toutes deux identiques sur les deux appareils :
  //  - gen : questions fabriquées à partir du code (calcul Éclair) ;
  //  - exIds : identifiants du pool statique commun.
  let exercises;
  if(battle.gen==='eclair'){
    exercises=genEclairQuestions(battle.code,battle.count||5);
  }else if(battle.gen==='observation'){
    exercises=genObservationQuestions(battle.code,battle.count||5);
  }else{
    const byId={};EX.forEach(e=>{byId[e.id]=e});
    exercises=(battle.exIds||[]).map(id=>byId[id]).filter(e=>isPlayableEx(e));
  }
  exercises=dedupeExercises(exercises);
  if(exercises.length===0){alert('Questions introuvables \u2014 vos versions de l\'app diff\u00e8rent. Mettez \u00e0 jour puis recr\u00e9ez une battle.');return}
  state.battleCode=battle.code;
  state.level=battle.level;
  state.mode='battle';
  state.exercises=exercises;state.idx=0;state.selected=null;state.score=0;state.streak=0;state.maxStreak=0;state.results=[];state.timer=60;state.gameOver=false;state.startTime=Date.now();state.detailOpen=false;state.sessionXP=0;state.sessionCristaux=0;state.chestsOpen=[];
  navigate('game');
}

// \u2500\u2500 Soumission du r\u00e9sultat (read-merge-write) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function submitBattleResult(code,gameData){
  app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\ud83d\udce1</div><h2 class="title">Envoi de ton score\u2026</h2></div>';
  try{
    const battle=await fetchBattle(code);
    if(battle&&battle.battle){
      battle.players=battle.players||{};
      battle.players[playerName()]={
        name:playerName(),
        answers:state.results.map((r,i)=>({i,choice:r.choice,ok:!!r.correct})),
        score:gameData.score,total:gameData.total,maxStreak:gameData.maxStreak,
        duration:gameData.duration,finishedAt:new Date().toISOString()
      };
      await pushBattle(battle);
      // Marque "j'ai jou\u00e9" dans l'historique local : c'est ce qui permet \u00e0
      // checkFinishedBattles de surveiller cette battle depuis l'accueil.
      const h=(profile.battleHistory||[]).find(x=>x.code===code);
      if(h){h.me={score:gameData.score};saveProfile()}
    }
  }catch(e){console.warn('battle submit failed',e)}
  navigate('battleResults',{battleViewCode:code});
}

// \u2500\u2500 Notice de fin : "L\u00e9a a termin\u00e9 votre battle !" \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Appel\u00e9 sur l'accueil : v\u00e9rifie mes battles jou\u00e9es mais pas encore
// r\u00e9gl\u00e9es (adversaire pas pass\u00e9 au moment o\u00f9 j'ai quitt\u00e9 l'\u00e9cran).
// D\u00e8s qu'un adversaire a fini, r\u00e8gle le r\u00e9sultat (ligue \u00e0 jour) et
// affiche une banni\u00e8re avec le verdict \u2014 sans rouvrir l'\u00e9cran battle.
async function checkFinishedBattles(){
  if(!playerName()) return;
  const twoWeeks=Date.now()-14*24*3600*1000;
  const waiting=(profile.battleHistory||[]).filter(h=>h.me&&!h.settled&&new Date(h.date||0).getTime()>twoWeeks).slice(0,5);
  if(waiting.length===0) return;
  for(const h of waiting){
    try{
      const battle=await fetchBattle(h.code);
      if(!battle||!battle.battle) continue;
      const players=Object.values(battle.players||{});
      const me=battle.players&&battle.players[playerName()];
      if(!me||players.length<2) continue;
      // R\u00e8gle le r\u00e9sultat localement (la ligue se met \u00e0 jour sans ouvrir l'\u00e9cran).
      h.me={score:me.score};
      h.opps=players.filter(p=>p.name!==playerName()).map(p=>({name:p.name,score:p.score}));
      const best=Math.max(...h.opps.map(o=>o.score));
      h.won=me.score>best?true:me.score<best?false:null;
      h.settled=true;
      if(!profile.friends)profile.friends={};
      for(const p of players){if(p.name!==playerName())profile.friends[p.name]={name:p.name,lastBattle:battle.createdAt}}
      saveProfile();
      if(state.screen!=='home') return; // l'utilisateur a d\u00e9j\u00e0 navigu\u00e9 ailleurs
      const opp=h.opps[0];
      const total=h.count||me.total||'?';
      const msg=h.won===true?'\ud83c\udfc6 Tu as gagn\u00e9 contre '+esc(opp.name)+' !':h.won===false?'\ud83d\ude2e '+esc(opp.name)+' t\'a battu !':'\ud83e\udd1d \u00c9galit\u00e9 avec '+esc(opp.name)+' !';
      const holder=document.createElement('div');
      holder.innerHTML='<div class="card fade-in glow-anim" style="border-color:#fbbf24;background:rgba(251,191,36,0.08)">'
        +'<div class="row" style="gap:12px"><div style="font-size:2.2rem">\ud83c\udfc1</div>'
        +'<div class="flex-1"><h3 class="card-title" style="color:#fbbf24">'+msg+'</h3>'
        +'<p class="sub">Battle '+esc(h.code)+' : toi '+h.me.score+'/'+total+' \u00b7 '+esc(opp.name)+' '+opp.score+'/'+total+(h.opps.length>1?' \u00b7 +'+(h.opps.length-1)+' autre(s) joueur(s)':'')+'</p></div></div>'
        +'<div class="btn-row mt-3">'
          +'<button class="btn-fire" data-code="'+esc(h.code)+'" onclick="navigate(\'battleResults\',{battleViewCode:this.dataset.code})">Voir le d\u00e9tail</button>'
          +'<button class="btn-stone" data-lv="'+esc(h.level)+'" data-n="'+(h.count||5)+'" data-opp="'+esc(opp.name)+'" onclick="createBattle(this.dataset.lv,+this.dataset.n,this.dataset.opp)">\ud83d\udd04 Revanche</button>'
        +'</div>'
      +'</div>';
      const first=app.firstElementChild;
      if(first) app.insertBefore(holder.firstElementChild,first);
      return; // une banni\u00e8re \u00e0 la fois \u2014 les autres appara\u00eetront aux prochains passages
    }catch(e){}
  }
}

// \u2500\u2500 \u00c9cran d'accueil Battle : cr\u00e9er / rejoindre / ligue \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function renderBattleHome(){
  const lastLv=state.level&&LEVELS.find(l=>l.id===state.level)?state.level:(LEVELS[1]&&LEVELS[1].id);
  const lvOptions=SUBJECTS.map(s=>
    '<optgroup label="'+esc(s.name)+'">'
    +(s.levels||[]).filter(l=>!l.secret&&!l.noBattle).map(l=>'<option value="'+esc(l.id)+'"'+(l.id===lastLv?' selected':'')+'>'+esc(l.name)+' \u2014 '+esc(l.sub||'')+'</option>').join('')
    +'</optgroup>').join('');
  // Ligue des amis : agr\u00e9g\u00e9e depuis l'historique local r\u00e9gl\u00e9 (settled).
  const league=computeLeague();
  const leagueHTML=league.rows.length===0
    ?'<p class="sub" style="font-style:italic">Joue ta premi\u00e8re battle pour lancer la ligue !</p>'
    :'<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.9rem">'
      +'<tr style="color:#8b7ec8;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em"><td style="padding:6px 4px">#</td><td>Joueur</td><td style="text-align:center">V</td><td style="text-align:center">N</td><td style="text-align:center">D</td><td style="text-align:right">Pts</td></tr>'
      +league.rows.map((r,i)=>{
        const medal=i===0?'\ud83e\udd47':i===1?'\ud83e\udd48':i===2?'\ud83e\udd49':(i+1);
        const me=r.name===playerName();
        return '<tr style="border-top:1px solid rgba(255,255,255,0.07);'+(me?'color:#fbbf24;font-weight:700':'color:#faf5ff')+'"><td style="padding:8px 4px">'+medal+'</td><td>'+esc(r.name)+(me?' (toi)':'')+'</td><td style="text-align:center;color:#34d399">'+r.wins+'</td><td style="text-align:center;color:#8b7ec8">'+r.draws+'</td><td style="text-align:center;color:#f87171">'+r.losses+'</td><td style="text-align:right;font-weight:700">'+r.points+'</td></tr>';
      }).join('')
      +'</table></div><p class="sub" style="font-size:.7rem;margin-top:6px">Victoire = 3 pts \u00b7 \u00c9galit\u00e9 = 1 pt \u00b7 Bas\u00e9 sur tes battles termin\u00e9es</p>';
  const history=(profile.battleHistory||[]).slice(0,8);
  const historyHTML=history.length===0?'' :
    '<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#8b7ec8;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">\ud83d\udd50 Battles r\u00e9centes</h3>'
    +history.map(h=>{
      const settled=h.settled&&h.opps&&h.opps.length>0;
      const badge=settled?(h.won===true?'<span style="color:#34d399;font-weight:700">Gagn\u00e9e \ud83c\udfc6</span>':h.won===false?'<span style="color:#f87171;font-weight:700">Perdue</span>':'<span style="color:#8b7ec8;font-weight:700">\u00c9galit\u00e9</span>'):'<span style="color:#fbbf24">En cours\u2026</span>';
      return '<div class="row-between" style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06)"><div class="flex-1" style="min-width:0"><div style="color:#faf5ff;font-weight:600">'+esc(h.code)+'</div><div class="sub" style="font-size:.75rem">'+esc(h.lvName||h.level||'')+'</div></div><div class="row gap-2">'+badge+'<button class="btn-stone btn-small" data-code="'+esc(h.code)+'" onclick="navigate(\'battleResults\',{battleViewCode:this.dataset.code})">Voir</button></div></div>';
    }).join('')+'</div>';
  app.innerHTML='<div class="text-center py-6 fade-in">'
    +'<div style="font-size:3.5rem">\u2694\ufe0f</div>'
    +'<h2 class="title" style="color:#f472b6;font-size:1.6rem">Battle des Amis</h2>'
    +'<p class="sub">M\u00eames questions, chacun son appareil. Qui sera le champion ?</p>'
  +'</div>'
  +'<div class="card mb-4" style="border-color:#f472b6">'
    +'<h3 class="fredoka" style="font-size:.85rem;color:#f472b6;margin-bottom:6px;letter-spacing:.1em;text-transform:uppercase">\ud83c\udfaf Cr\u00e9er une battle</h3>'
    +'<p class="sub" style="font-size:.75rem;margin-bottom:10px">Ces d\u00e9fis ne d\u00e9pendent pas de la classe : petits et grands ont leurs chances.</p>'
    +'<div class="battle-disc-grid">'+BATTLE_DISCIPLINES.map(function(d){
      return '<button class="battle-disc" data-d="'+d.id+'" onclick="startDisciplineBattle(this.dataset.d)" style="--dc:'+d.color+'">'
        +'<span class="battle-disc-ico">'+d.icon+'</span>'
        +'<span class="battle-disc-name">'+esc(d.name)+'</span>'
        +'<span class="battle-disc-desc">'+esc(d.desc)+'</span>'
      +'</button>';
    }).join('')+'</div>'
    +'<div class="divider" style="margin:14px 0"></div>'
    +'<label class="sub" style="display:block;margin-bottom:4px">\ud83d\udcda Ou r\u00e9viser le programme (m\u00eame niveau pour les deux)</label>'
    +'<select class="name-prompt" id="battleLv">'+lvOptions+'</select>'
    +'<label class="sub" style="display:block;margin:12px 0 4px">Nombre de questions</label>'
    +'<div class="row gap-2">'
      +'<button class="btn-stone" style="flex:1" id="battleCount5" onclick="_setBattleCount(5)">\u26a1 \u00c9clair \u2014 5</button>'
      +'<button class="btn-stone" style="flex:1" id="battleCount10" onclick="_setBattleCount(10)">\ud83c\udff0 Classique \u2014 10</button>'
    +'</div>'
    +'<button class="btn-fire mt-4" onclick="createBattle(document.getElementById(\'battleLv\').value,window._battleCount||5)">\u2694\ufe0f Cr\u00e9er et obtenir le code</button>'
  +'</div>'
  +(function(){
    const friends=Object.values(profile.friends||{}).sort((a,b)=>(b.lastBattle||'').localeCompare(a.lastBattle||''));
    if(friends.length===0) return '';
    const settled=(profile.battleHistory||[]).filter(h=>h.settled&&h.opps);
    return '<div class="card mb-4" style="border-color:#34d399">'
      +'<h3 class="fredoka" style="font-size:.85rem;color:#34d399;margin-bottom:4px;letter-spacing:.1em;text-transform:uppercase">\ud83d\udc65 Tes amis</h3>'
      +'<p class="sub" style="font-size:.75rem;margin-bottom:8px">D\u00e9fie-les en 1 clic \u2014 ils verront ton d\u00e9fi en ouvrant leur app (niveau et nb de questions choisis ci-dessus).</p>'
      +friends.slice(0,8).map(f=>{
        let w=0,l=0;
        for(const h of settled){const o=(h.opps||[]).find(x=>x.name===f.name);if(o&&h.me){if(h.me.score>o.score)w++;else if(h.me.score<o.score)l++}}
        return '<div class="row-between" style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06)">'
          +'<div class="flex-1" style="min-width:0"><span style="color:#faf5ff;font-weight:600">'+esc(f.name)+'</span>'
          +' <span class="sub" style="font-size:.72rem">'+w+'V \u2013 '+l+'D contre toi</span></div>'
          +'<button class="btn-stone btn-small" data-name="'+esc(f.name)+'" onclick="challengeFriend(this.dataset.name)">\u2694\ufe0f D\u00e9fier</button>'
        +'</div>';
      }).join('')
    +'</div>';
  })()
  +'<div class="card mb-4" style="border-color:#60a5fa">'
    +'<h3 class="fredoka" style="font-size:.85rem;color:#60a5fa;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">\ud83d\udd11 Rejoindre avec un code</h3>'
    +'<p class="sub" style="font-size:.75rem;margin-bottom:8px">Ton copain t\'a envoy\u00e9 un lien ? Clique dessus, c\'est tout. Sinon entre son code :</p>'
    +'<input class="name-prompt" id="battleCodeInp" placeholder="Ex. POTION-37" maxlength="40" autocapitalize="characters" style="text-transform:uppercase;text-align:center;font-size:1.2rem;letter-spacing:.15em">'
    +(_hasNativeScanner()?'<button class="btn-stone mt-2" onclick="scanBattleQR()">\ud83d\udcf7 Scanner le QR du copain</button>':'')
    +'<button class="btn-fire mt-3" onclick="joinBattle(document.getElementById(\'battleCodeInp\').value)">\ud83d\ude80 Rejoindre la battle</button>'
  +'</div>'
  +'<div class="card mb-4" style="border-color:#fbbf24">'
    +'<h3 class="fredoka" style="font-size:.85rem;color:#fbbf24;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">\ud83c\udfc6 Ligue des amis</h3>'
    +leagueHTML
  +'</div>'
  +historyHTML
  +'<button class="btn-stone" onclick="navigate(\'home\')">\u2190 Retour</button>';
  setTimeout(()=>_setBattleCount(window._battleCount||5),30);
}
// Lance une battle « contenu transverse » (logique, memory, monde, éclair).
function startDisciplineBattle(id){
  const d=battleDiscipline(id);
  if(!d) return;
  const n=window._battleCount||5;
  track('battle_discipline_picked',{discipline:id});
  if(d.mode==='memory') return createMemoryBattle();
  return createBattle(d.gen?d.id:d.lv,n);
}
function _setBattleCount(n){
  window._battleCount=n;
  const b5=document.getElementById('battleCount5'),b10=document.getElementById('battleCount10');
  const on='background:linear-gradient(135deg,#f472b6,#db2777);color:#fff;border-color:#db2777';
  if(b5)b5.style.cssText='flex:1;'+(n===5?on:'');
  if(b10)b10.style.cssText='flex:1;'+(n===10?on:'');
}

// \u2500\u2500 Ligue : agr\u00e9gation de l'historique r\u00e9gl\u00e9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function computeLeague(){
  const tally={};
  function slot(name){if(!tally[name])tally[name]={name,wins:0,draws:0,losses:0,points:0};return tally[name]}
  for(const h of (profile.battleHistory||[])){
    if(!h.settled||!h.opps||h.opps.length===0||!h.me) continue;
    const myScore=h.me.score;
    for(const o of h.opps){
      const me=slot(playerName()),op=slot(o.name);
      if(myScore>o.score){me.wins++;me.points+=3;op.losses++}
      else if(myScore<o.score){me.losses++;op.wins++;op.points+=3}
      else{me.draws++;me.points+=1;op.draws++;op.points+=1}
    }
  }
  const rows=Object.values(tally).sort((a,b)=>b.points-a.points||b.wins-a.wins);
  return {rows};
}

// \u2500\u2500 \u00c9cran r\u00e9sultats / lobby / attente \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function renderBattleResults(){
  const code=state.battleViewCode;
  if(!code){navigate('battleHome');return}
  app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">\u2694\ufe0f</div><h2 class="title">Chargement de la battle\u2026</h2></div>';
  const battle=await fetchBattle(code);
  if(state.screen!=='battleResults'||state.battleViewCode!==code) return; // parti ailleurs pendant le fetch
  if(!battle||!battle.battle){
    app.innerHTML='<div class="card text-center" style="margin-top:60px"><div style="font-size:3rem">\ud83c\udf2b\ufe0f</div><h2 class="title">Battle introuvable</h2><p class="sub">Le code \u00ab\u00a0'+esc(code)+'\u00a0\u00bb n\'existe pas (ou plus).</p><button class="btn-stone mt-4" onclick="navigate(\'battleHome\')">\u2190 Retour</button></div>';
    return;
  }
  const players=Object.values(battle.players||{}).sort((a,b)=>(a.finishedAt||'').localeCompare(b.finishedAt||''));
  const me=battle.players&&battle.players[playerName()];
  const byId={};EX.forEach(e=>{byId[e.id]=e});
  // Met \u00e0 jour l'historique local (pour la ligue) d\u00e8s qu'il y a 2 joueurs et que j'ai jou\u00e9.
  if(me&&players.length>=2){
    const h=(profile.battleHistory||[]).find(x=>x.code===battle.code);
    if(h){
      h.me={score:me.score};
      h.opps=players.filter(p=>p.name!==playerName()).map(p=>({name:p.name,score:p.score}));
      const best=Math.max(...h.opps.map(o=>o.score));
      h.won=me.score>best?true:me.score<best?false:null;
      h.settled=true;
    }
    // Les adversaires deviennent des "amis" → défi 1-tap la prochaine fois.
    // (le nombre de battles par ami est déduit de battleHistory à l'affichage)
    if(!profile.friends)profile.friends={};
    for(const p of players){
      if(p.name===playerName()) continue;
      profile.friends[p.name]={name:p.name,lastBattle:battle.createdAt};
    }
    saveProfile();
  }
  // Bandeau vainqueur (si \u22652 joueurs ont fini)
  let bannerHTML='';
  if(players.length>=2){
    const sorted=[...players].sort((a,b)=>b.score-a.score||a.duration-b.duration);
    const top=sorted[0];
    const tie=sorted.length>1&&sorted[1].score===top.score&&sorted[1].duration===top.duration;
    const topLine=battle.mode==='memory'
      ?top.score+' pts \u2014 '+(top.moves||'?')+' coups en '+top.duration+'s'
      :top.score+'/'+top.total+' en '+top.duration+'s';
    bannerHTML=tie
      ?'<div class="card mb-4 text-center" style="border-color:#8b7ec8"><div style="font-size:2.5rem">\ud83e\udd1d</div><h3 class="title" style="font-size:1.3rem">\u00c9galit\u00e9 parfaite !</h3></div>'
      :'<div class="card mb-4 text-center glow-anim" style="border-color:#fbbf24"><div style="font-size:2.8rem">\ud83d\udc51</div><h3 class="title" style="color:#fbbf24;font-size:1.4rem">'+esc(top.name)+' remporte la battle !</h3><p class="sub">'+topLine+'</p></div>';
  }
  // Cartes scores par joueur
  const scoreCards=players.map(p=>{
    const isMe=p.name===playerName();
    const val=battle.mode==='memory'?(p.score+' pts'):(p.score+'/'+p.total);
    const detail=battle.mode==='memory'?('\ud83c\udccf '+(p.moves!=null?p.moves+' coups':'')+' \u00b7 \u23f1 '+p.duration+'s'):('\u23f1 '+p.duration+'s \u00b7 \ud83d\udd25 '+p.maxStreak);
    return '<div class="stat-card" style="'+(isMe?'border:1px solid rgba(251,191,36,.4)':'')+'"><div class="stat-val" style="color:'+(isMe?'#fbbf24':'#c4b5fd')+'">'+val+'</div><div class="stat-label">'+esc(p.name)+(isMe?' (toi)':'')+'<br>'+detail+'</div></div>';
  }).join('');
  // Grille question par question
  let gridHTML='';
  if(players.length>=1&&Array.isArray(battle.exIds)){
    const shown=players.slice(0,4); // max 4 colonnes pour rester lisible
    gridHTML='<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#8b7ec8;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">\ud83d\udccb Question par question</h3>'
      +'<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.85rem">'
      +'<tr style="color:#8b7ec8;font-size:.72rem"><td style="padding:6px 4px">Question</td>'+shown.map(p=>'<td style="text-align:center;padding:6px 2px;max-width:70px;overflow:hidden;text-overflow:ellipsis">'+esc(p.name)+'</td>').join('')+'</tr>'
      +battle.exIds.map((id,qi)=>{
        const ex=byId[id];
        const qTxt=ex?String(ex.q).slice(0,60)+(String(ex.q).length>60?'\u2026':''):('Question '+(qi+1));
        return '<tr style="border-top:1px solid rgba(255,255,255,0.07)"><td style="padding:8px 4px;color:#faf5ff;line-height:1.4">'+(qi+1)+'. '+esc(qTxt)+'</td>'
          +shown.map(p=>{
            const a=(p.answers||[]).find(x=>x.i===qi);
            const mark=!a?'<span style="color:#3f3768">\u2014</span>':a.ok?'<span style="color:#34d399;font-size:1.1rem">\u2705</span>':'<span style="color:#f87171;font-size:1.1rem">\u274c</span>';
            return '<td style="text-align:center">'+mark+'</td>';
          }).join('')+'</tr>';
      }).join('')
      +'</table></div></div>';
  }
  // Actions selon mon statut
  let actionsHTML='';
  if(!me){
    actionsHTML='<button class="btn-fire mb-2" onclick="_startBattleFromView()">'+(battle.mode==='memory'?'\ud83c\udccf Jouer le Memory !':'\u2694\ufe0f Jouer mes '+battle.count+' questions !')+'</button>';
  }else if(players.length<2){
    actionsHTML='<div class="card mb-4 text-center" style="border-color:#60a5fa"><div style="font-size:2rem">\u23f3</div><p style="color:#faf5ff;font-weight:600;margin:8px 0">En attente d\'un adversaire\u2026</p><p class="sub">Partage le code ci-dessus \u2014 la page se met \u00e0 jour toute seule.</p></div>';
  }
  if(me){
    actionsHTML+=battle.mode==='memory'
      ?'<button class="btn-stone mb-2" onclick="createMemoryBattle()">\ud83d\udd04 Revanche Memory (nouvelles cartes)</button>'
      :'<button class="btn-stone mb-2" data-lv="'+esc(battle.level)+'" data-n="'+battle.count+'" onclick="createBattle(this.dataset.lv,+this.dataset.n)">\ud83d\udd04 Revanche (nouvelles questions)</button>';
  }
  app.innerHTML='<div class="text-center py-4 fade-in">'
    +'<div style="font-size:2.5rem">\u2694\ufe0f</div>'
    +'<h2 class="title" style="color:#f472b6;font-size:1.4rem">Battle '+esc(battle.code)+'</h2>'
    +'<p class="sub">'+esc(battle.lvName||'')+' \u00b7 '+(battle.mode==='memory'?battle.pairs+' paires d\'animaux':battle.count+' questions')+'</p>'
    +'<div class="card mt-3" style="border-color:#f472b6;padding:14px">'
      +(navigator.share
        ?'<button class="btn-fire mb-2" onclick="_shareBattleCode(\''+esc(battle.code)+'\')">\ud83d\udcf2 Envoyer le d\u00e9fi (WhatsApp, SMS\u2026)</button>'
        :'<button class="btn-fire mb-2" onclick="_copyBattleCode(\''+esc(battle.code)+'\')">\ud83d\udccb Copier le message du d\u00e9fi</button>')
      +'<div id="battleQR"></div>'
      +'<div class="divider" style="margin:12px 0"></div>'
      +'<p class="sub" style="font-size:.75rem;margin-bottom:2px">Ou avec le code, dans \u00ab Rejoindre \u00bb :</p>'
      +'<p style="font-size:1.5rem;font-weight:800;letter-spacing:.18em;color:#fbbf24;font-family:Fredoka,sans-serif">'+esc(battle.code)
      +' <button class="btn-stone btn-small" style="vertical-align:middle" onclick="_copyBattleCode(\''+esc(battle.code)+'\')">\ud83d\udccb</button></p>'
      +'<p class="sub" style="font-size:.72rem;margin-top:8px">\ud83d\udcf2 Ton copain n\'a pas l\'app ? <a class="detail-link" href="'+TESTFLIGHT_URL+'" target="_blank" rel="noopener">T\u00e9l\u00e9charger sur TestFlight</a></p>'
    +'</div>'
  +'</div>'
  +bannerHTML
  +(players.length>0?'<div class="card mb-4"><div class="stats-grid">'+scoreCards+'</div></div>':'')
  +gridHTML
  +actionsHTML
  +'<button class="btn-stone" onclick="navigate(\'battleHome\')">\u2190 Battles</button>';
  window._battleView=battle;
  renderBattleQRInto('battleQR',battle.code);
  // Auto-poll tant qu'on attend un adversaire (ou que je n'ai pas jou\u00e9 et
  // que je veux voir arriver les scores) \u2014 toutes les 6 s, arr\u00eat\u00e9 par navigate().
  if(players.length<2||!me){
    state.battlePollID=setTimeout(()=>{state.battlePollID=null;if(state.screen==='battleResults')renderBattleResults()},6000);
  }
}
function _startBattleFromView(){
  const b=window._battleView;
  if(!b||!b.battle) return;
  if(b.mode==='memory') startMemoryBattle(b);
  else startBattleGame(b);
}

/* ── Battle MEMORY : même paquet de cartes pour les deux joueurs ────────
   Le paquet (disposition incluse) est stocké dans la battle → les deux
   appareils voient EXACTEMENT la même grille. Points = vitesse + peu de
   coups (plus haut = mieux, comparable au score des battles questions). */
async function createMemoryBattle(inviteName){
  app.innerHTML='<div class="card text-center" style="margin-top:60px"><div class="dragon-emoji float">🃏</div><h2 class="title">Préparation de la battle Memory…</h2></div>';
  let code=randomBattleCode();
  for(let tries=0;tries<5;tries++){
    const existing=await fetchBattle(code);
    if(!existing||!existing.battle) break;
    code=randomBattleCode();
  }
  const picked=shuffle(MEMORY_ANIMALS.slice()).slice(0,8);
  const deck=shuffle(picked.flatMap((a,i)=>[{pair:i,face:a},{pair:i,face:a}]));
  const battle={battle:true,code,createdAt:new Date().toISOString(),mode:'memory',level:'memory',lvName:'🃏 Memory — 8 paires',count:8,pairs:8,deck,hostName:playerName(),players:{}};
  try{await pushBattle(battle)}catch(e){alert('🌐 Impossible de créer la battle (connexion ?). Réessaie.');navigate('battleHome');return}
  if(!profile.battleHistory)profile.battleHistory=[];
  profile.battleHistory.unshift({code,date:battle.createdAt,level:'memory',lvName:battle.lvName,count:8});
  profile.battleHistory=profile.battleHistory.slice(0,50);
  saveProfile();
  if(inviteName){
    const ok=await sendBattleInvite(inviteName,battle);
    if(ok) alert('🃏 Défi Memory envoyé à '+inviteName+' !');
  }
  navigate('battleResults',{battleViewCode:code});
}
function startMemoryBattle(battle){
  const cards=(battle.deck||[]).map(c=>({pair:c.pair,face:c.face,animal:true}));
  if(cards.length<4){alert('Battle Memory illisible — recréez-en une.');return}
  state.mem={modeId:'battle',label:'🃏 Battle '+battle.code,cards,flipped:[],found:0,moves:0,lock:false,start:Date.now(),time:0,preview:10,battleCode:battle.code};
  navigate('memoryGame');
}
// Points battle Memory : 1000 de base, -40 par coup au-dessus du parfait, -3 par seconde.
function _memoryBattlePoints(moves,time,pairs){
  return Math.max(100,1000-Math.max(0,moves-pairs)*40-time*3);
}
async function _submitMemoryBattle(code,r){
  try{
    const battle=await fetchBattle(code);
    if(battle&&battle.battle){
      battle.players=battle.players||{};
      battle.players[playerName()]={name:playerName(),score:r.pts,total:1000,moves:r.moves,time:r.time,maxStreak:0,duration:r.time,finishedAt:new Date().toISOString()};
      await pushBattle(battle);
      const h=(profile.battleHistory||[]).find(x=>x.code===code);
      if(h){h.me={score:r.pts};saveProfile()}
    }
  }catch(e){console.warn('memory battle submit failed',e)}
}
function _copyBattleCode(code){
  const txt=_battleShareText(code);
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>alert('\u2705 Message copi\u00e9 ! Envoie-le \u00e0 ton copain.')).catch(()=>prompt('Copie ce message :',txt));
  }else{prompt('Copie ce message :',txt)}
}
function _battleShareText(code){
  const c=normalizeBattleCode(code);
  return '\u2694\ufe0f Je te d\u00e9fie sur Le Royaume des Savoirs !\n'
    +'\ud83d\udc49 Touche ce lien pour rejoindre ma battle : '+battleLink(c)+'\n'
    +'(ou entre le code '+c+' dans Battle des Amis \u2192 Rejoindre)\n'
    +'\ud83d\udcf2 L\'app iPhone : '+TESTFLIGHT_URL;
}
async function _shareBattleCode(code){
  try{
    await navigator.share({
      title:'Battle \u2014 Le Royaume des Savoirs',
      text:_battleShareText(code)
    });
  }catch(e){}
}


/* ════════ PHOTO → EXERCICES (Espace Parent) ════════
   Le parent photographie une feuille (exercice, leçon, manuel, affiche…).
   Le Sage (IA vision) la lit et invente des questions adaptées : QCM,
   Vrai/Faux et réponses à écrire. Aucun formulaire à remplir. */
function renderPhotoExercise(){
  const lastLv=state.level&&LEVELS.find(l=>l.id===state.level)?state.level:'ce1-ce2';
  const lvOptions=SUBJECTS.map(su=>'<optgroup label="'+esc(su.name)+'">'
    +(su.levels||[]).filter(l=>!l.secret).map(l=>'<option value="'+esc(l.id)+'"'+(l.id===lastLv?' selected':'')+'>'+esc(l.name)+' — '+esc(l.sub||'')+'</option>').join('')
    +'</optgroup>').join('');
  app.innerHTML='<div class="text-center py-6 fade-in">'
    +'<div style="font-size:3.2rem">📸</div>'
    +'<h2 class="title" style="color:#34d399;font-size:1.5rem">Photographier un exercice</h2>'
    +'<p class="sub">Prends en photo une feuille d\'exercices, une leçon, une page de manuel, une affiche de musée… Le Sage la lit et invente les bonnes questions pour '+esc(profile.name)+'.</p>'
  +'</div>'
  +'<div class="card mb-4" style="border-color:#34d399">'
    +'<label class="sub" style="display:block;margin-bottom:4px">Niveau / royaume où ranger les questions</label>'
    +'<select class="name-prompt" id="photoLv">'+lvOptions+'</select>'
    +'<input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none" onchange="photoChosen(this)">'
    +'<button class="btn-fire" onclick="document.getElementById(\'photoInput\').click()">📷 Prendre / choisir une photo</button>'
    +'<div id="photoPreview" style="margin-top:12px"></div>'
    +'<div id="photoStatus" style="margin-top:10px"></div>'
    +'<div id="photoResults" style="margin-top:12px"></div>'
  +'</div>'
  +'<button class="btn-stone" onclick="navigate(\'parent\')">← Retour Espace Parent</button>';
}
async function photoChosen(inp){
  const file=inp.files&&inp.files[0];
  if(!file) return;
  const st=document.getElementById('photoStatus');
  try{
    const dataUrl=await _compressPhoto(file,1400,0.82);
    const pv=document.getElementById('photoPreview');
    if(pv)pv.innerHTML='<img src="'+dataUrl+'" style="max-width:100%;border-radius:12px;border:1px solid rgba(255,255,255,0.15)">';
    if(st)st.innerHTML='<p class="sub">🔮 Le Sage lit ta photo et prépare les questions… (10-30 s)</p>';
    const lvSel=document.getElementById('photoLv');
    const lv=lvSel?lvSel.value:'ce1-ce2';
    const b64=dataUrl.split(',')[1];
    const r=await fetch(API_BASE+'/photo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:b64,media_type:'image/jpeg',level:lv})});
    if(!r.ok) throw new Error('status '+r.status);
    const data=await r.json();
    if(data.error) throw new Error(data.error.message||data.error);
    const clean=_sanitizePhotoExercises(data.exercises,lv);
    if(clean.length===0) throw new Error('Aucune question exploitable — réessaie avec une photo plus nette.');
    window._photoDraft=clean;
    if(st)st.innerHTML='<p style="color:#34d399;font-weight:600">✅ '+clean.length+' questions créées ! Décoche celles que tu ne veux pas, puis ajoute.</p>';
    const res=document.getElementById('photoResults');
    if(res)res.innerHTML=clean.map((ex,i)=>{
      const kind=ex.type==='input'?'✍️ À écrire':(ex.ch.length===2?'⚖️ Vrai/Faux':'🔤 QCM');
      const ans=ex.type==='input'?ex.answers[0]:ex.ch[ex.ans];
      return '<label class="row" style="align-items:flex-start;padding:10px 0;border-top:1px solid rgba(255,255,255,0.08);cursor:pointer">'
        +'<input type="checkbox" checked data-i="'+i+'" class="photoPick" style="margin-top:4px;width:18px;height:18px">'
        +'<div class="flex-1" style="min-width:0"><div style="color:#faf5ff;font-weight:600">'+esc(ex.q)+'</div>'
        +'<div class="sub" style="margin-top:2px">'+kind+' · Réponse : '+esc(ans)+'</div></div></label>';
    }).join('')
    +'<button class="btn-fire mt-3" onclick="addPhotoExercises()">➕ Ajouter au Royaume de '+esc(profile.name)+'</button>';
  }catch(e){
    if(st)st.innerHTML='<p style="color:#f87171">'+esc(_friendlyAIError(String(e&&e.message||e)))+'</p>';
  }
  inp.value='';
}
function _compressPhoto(file,maxDim,quality){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>{
      const scale=Math.min(1,maxDim/Math.max(img.width,img.height));
      const cv=document.createElement('canvas');
      cv.width=Math.round(img.width*scale);cv.height=Math.round(img.height*scale);
      cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);
      resolve(cv.toDataURL('image/jpeg',quality));
    };
    img.onerror=()=>reject(new Error('image illisible'));
    img.src=URL.createObjectURL(file);
  });
}
function _sanitizePhotoExercises(list,lv){
  if(!Array.isArray(list)) return [];
  const out=[];
  const ts=Date.now();
  list.slice(0,15).forEach((raw,i)=>{
    if(!raw||typeof raw.q!=='string'||!raw.q.trim()) return;
    const base={id:'photo_'+ts+'_'+i,lv,cat:String(raw.cat||'Exercice photo').slice(0,40),diff:Math.min(3,Math.max(1,parseInt(raw.diff,10)||2)),q:raw.q.slice(0,300),se:String(raw.se||'').slice(0,300),sk:'Photo',custom:true};
    if(raw.type==='input'&&Array.isArray(raw.answers)&&raw.answers.length>0){
      out.push(Object.assign(base,{type:'input',answers:raw.answers.slice(0,6).map(a=>String(a).slice(0,80))}));
    }else if(Array.isArray(raw.ch)&&(raw.ch.length===2||raw.ch.length===4)&&typeof raw.ans==='number'&&raw.ans>=0&&raw.ans<raw.ch.length){
      out.push(Object.assign(base,{ch:raw.ch.map(c=>String(c).slice(0,120)),ans:raw.ans}));
    }
  });
  return out;
}
function addPhotoExercises(){
  const draft=window._photoDraft||[];
  const picks=Array.from(document.querySelectorAll('.photoPick')).filter(c=>c.checked).map(c=>draft[+c.dataset.i]).filter(Boolean);
  if(picks.length===0){alert('Coche au moins une question.');return}
  if(!profile.customExercises)profile.customExercises=[];
  profile.customExercises=profile.customExercises.concat(picks);
  saveProfile();
  window._photoDraft=null;
  alert('✅ '+picks.length+' questions ajoutées ! '+profile.name+' les verra dans ses parties ('+picks[0].lv+').');
  navigate('parent');
}

/* ════════ MEMORY DES TABLES ════════
   Jeu de paires : associer « 7 × 8 » à « 56 ». Trois niveaux calés sur
   les programmes (Apprenti tables 2-5, Chevalier 3-7, Maître 6-9) ou une
   table précise. À chaque paire trouvée, l'app RÉCITE la multiplication
   à voix haute (« 7 fois 8, 56 ») pour ancrer la mémorisation auditive.
   Les produits du plateau sont uniques : aucune ambiguïté possible.
*/
const MEMORY_ANIMALS=["\u{1F436}","\u{1F431}","\u{1F981}","\u{1F43C}","\u{1F438}","\u{1F98A}","\u{1F435}","\u{1F437}","\u{1F430}","\u{1F992}","\u{1F418}","\u{1F98B}","\u{1F422}","\u{1F42C}","\u{1F989}","\u{1F434}","\u{1F99C}","\u{1F419}","\u{1F41D}","\u{1F995}","\u{1F42F}","\u{1F993}","\u{1F427}","\u{1F41E}"];
const MEMORY_MODES=[
  {id:"zoo-facile",name:"Petit Zoo",sub:"Animaux \u00b7 6 paires",icon:"\u{1F431}",animals:true,pairs:6,color:"#34d399"},
  {id:"zoo-moyen",name:"Grand Zoo",sub:"Animaux \u00b7 8 paires",icon:"\u{1F981}",animals:true,pairs:8,color:"#60a5fa"},
  {id:"zoo-expert",name:"Safari Expert",sub:"Animaux \u00b7 10 paires",icon:"\u{1F992}",animals:true,pairs:10,color:"#f472b6"},
  {id:"apprenti",name:"Apprenti",sub:"Tables 2 à 5 · 6 paires",icon:"\u{1F9D9}",tables:[2,3,4,5],pairs:6,color:"#22c55e"},
  {id:"chevalier",name:"Chevalier",sub:"Tables 3 à 7 · 8 paires",icon:"\u2694\uFE0F",tables:[3,4,5,6,7],pairs:8,color:"#f7a020"},
  {id:"maitre",name:"Ma\u00eetre Dragon",sub:"Tables 6 à 9 · 8 paires",icon:"\u{1F409}",tables:[6,7,8,9],pairs:8,color:"#ef4444"}
];
let _memVoice=true;
try{_memVoice=localStorage.getItem('royaume_mem_voice')!=='0'}catch(e){}

function renderMemoryHome(){
  const stats=profile.memoryStats||{};
  const tableChips=[2,3,4,5,6,7,8,9].map(t=>
    '<button class="btn-stone btn-small" style="min-width:52px" onclick="startMemory(\'table-'+t+'\')">\u00d7'+t+'</button>').join(' ');
  app.innerHTML='<div class="text-center py-6 fade-in">'
    +'<div style="font-size:3.5rem">\u{1F0CF}</div>'
    +'<h2 class="title" style="color:#34d399;font-size:1.6rem">Memory</h2>'
    +'<p class="sub">Toutes les cartes s\'affichent 10 secondes : m\u00e9morise-les bien, puis retrouve les paires ! Animaux pour tous \u2014 et tables de multiplication pour les champions.</p>'
  +'</div>'
  +MEMORY_MODES.map((m,i)=>{
    const best=stats[m.id];
    const bestTxt=best?('Record : '+best.moves+' coups \u00b7 '+best.time+'s'):'Pas encore jou\u00e9';
    return '<div class="card clickable fade-in" style="animation-delay:'+(i*.07)+'s;border-color:'+m.color+'" onclick="startMemory(\''+m.id+'\')">'
      +'<div class="row"><div style="font-size:2.2rem">'+m.icon+'</div>'
      +'<div class="flex-1"><h3 class="card-title" style="color:'+m.color+'">'+m.name+'</h3>'
      +'<p class="sub">'+m.sub+' \u2014 '+bestTxt+'</p></div>'
      +'<div class="arrow">\u2192</div></div></div>';
  }).join('')
  +'<div class="card mb-4"><h3 class="fredoka" style="font-size:.85rem;color:#8b7ec8;margin-bottom:10px;letter-spacing:.1em;text-transform:uppercase">\u{1F3AF} Ou entra\u00eene UNE table pr\u00e9cise</h3>'
  +'<div class="row" style="flex-wrap:wrap;gap:8px">'+tableChips+'</div></div>'
  +'<button class="btn-stone mb-2" onclick="toggleMemVoice()" id="memVoiceBtn">'+(_memVoice?'\u{1F50A} R\u00e9citation vocale : activ\u00e9e':'\u{1F507} R\u00e9citation vocale : coup\u00e9e')+'</button>'
  +'<button class="btn-stone" onclick="navigate(\'home\')">\u2190 Retour</button>';
}
function toggleMemVoice(){
  _memVoice=!_memVoice;
  try{localStorage.setItem('royaume_mem_voice',_memVoice?'1':'0')}catch(e){}
  const b=document.getElementById('memVoiceBtn');
  if(b)b.textContent=_memVoice?'\u{1F50A} R\u00e9citation vocale : activ\u00e9e':'\u{1F507} R\u00e9citation vocale : coup\u00e9e';
}

function _memBuildPairs(modeId){
  let tables,pairs,label;
  const mode=MEMORY_MODES.find(x=>x.id===modeId);
  if(mode&&mode.animals){
    // Vrai Memory : paires d'animaux identiques.
    const picked=shuffle(MEMORY_ANIMALS.slice()).slice(0,mode.pairs);
    return {label:mode.name,cards:shuffle(picked.flatMap((a,i)=>[
      {pair:i,face:a,animal:true},
      {pair:i,face:a,animal:true}
    ]))};
  }
  if(modeId.startsWith('table-')){
    const t=parseInt(modeId.slice(6),10);
    tables=[t];pairs=6;label='Table de '+t;
  }else{
    const m=MEMORY_MODES.find(x=>x.id===modeId)||MEMORY_MODES[0];
    tables=m.tables;pairs=m.pairs;label=m.name;
  }
  // Tire des opérations aux PRODUITS UNIQUES (sinon deux cartes résultat
  // identiques rendraient le jeu ambigu).
  const ops=[];
  for(const a of tables)for(let b2=2;b2<=9;b2++)ops.push([a,b2]);
  const chosen=[];const seen=new Set();
  for(const op of shuffle(ops)){
    const p=op[0]*op[1];
    if(seen.has(p))continue;
    seen.add(p);chosen.push(op);
    if(chosen.length>=pairs)break;
  }
  return {label,cards:shuffle(chosen.flatMap((op,i)=>[
    {pair:i,face:op[0]+' \u00d7 '+op[1],op},
    {pair:i,face:String(op[0]*op[1]),op}
  ]))};
}

function startMemory(modeId){
  const built=_memBuildPairs(modeId);
  state.mem={modeId,label:built.label,cards:built.cards,flipped:[],found:0,moves:0,lock:false,start:Date.now(),time:0,preview:10};
  navigate('memoryGame');
}

function renderMemoryGame(){
  const M=state.mem;
  if(!M){navigate('memoryHome');return}
  const total=M.cards.length/2;
  const cols=M.cards.length<=12?3:4;
  const preview=M.preview>0;
  app.innerHTML='<div class="text-center py-4 fade-in">'
    +'<h2 class="title" style="color:#34d399;font-size:1.3rem">\u{1F0CF} '+esc(M.label)+'</h2>'
    +(preview
      ?'<p class="sub" style="margin-top:6px;font-size:1rem">\u{1F440} M\u00e9morise les cartes\u2026 <b id="memPrev" style="color:#fbbf24;font-size:1.2rem">'+M.preview+'</b>s</p>'
      :'<div class="row" style="justify-content:center;gap:16px;margin-top:6px">'
        +'<span class="sub">Paires : <b id="memFound" style="color:#34d399">'+M.found+'</b>/'+total+'</span>'
        +'<span class="sub">Coups : <b id="memMoves" style="color:#fbbf24">'+M.moves+'</b></span>'
        +'<span class="sub">\u23F1 <b id="memTime" style="color:#60a5fa">'+M.time+'</b>s</span>'
      +'</div>')
  +'</div>'
  +'<div class="mem-grid" style="grid-template-columns:repeat('+cols+',1fr)">'
  +M.cards.map((c,i)=>{
    const st=c.matched?'matched':((preview||M.flipped.includes(i))?'flipped':'');
    const big=c.animal?'font-size:clamp(1.8rem,8vw,2.6rem)':'';
    return '<div class="mem-card '+st+'" onclick="memFlip('+i+')"><div class="mem-inner">'
      +'<div class="mem-front">\u2753</div>'
      +'<div class="mem-back" style="'+big+'">'+esc(c.face)+'</div>'
    +'</div></div>';
  }).join('')
  +'</div>'
  +'<div id="memWin"></div>'
  +'<button class="btn-stone mt-4" onclick="navigate(\'memoryHome\')">\u2190 Abandonner</button>';
  if(state.memTickID)clearInterval(state.memTickID);
  if(preview){
    // Phase de m\u00e9morisation : toutes les cartes visibles, puis elles se
    // retournent et le chrono d\u00e9marre.
    state.memTickID=setInterval(()=>{
      const m=state.mem;
      if(!m){clearInterval(state.memTickID);state.memTickID=null;return}
      m.preview--;
      const pv=document.getElementById('memPrev');
      if(pv)pv.textContent=m.preview;
      if(m.preview<=0){
        clearInterval(state.memTickID);state.memTickID=null;
        m.start=Date.now();m.time=0;
        if(state.screen==='memoryGame')renderMemoryGame();
      }
    },1000);
    return;
  }
  state.memTickID=setInterval(()=>{
    if(!state.mem)return;
    state.mem.time=Math.round((Date.now()-state.mem.start)/1000);
    const t=document.getElementById('memTime');
    if(t)t.textContent=state.mem.time;
  },1000);
}

function memFlip(i){
  const M=state.mem;
  if(!M||M.lock||M.preview>0)return;
  const c=M.cards[i];
  if(c.matched||M.flipped.includes(i))return;
  M.flipped.push(i);
  const el=document.querySelectorAll('.mem-card')[i];
  if(el)el.classList.add('flipped');
  if(M.flipped.length<2)return;
  M.moves++;
  const mv=document.getElementById('memMoves');if(mv)mv.textContent=M.moves;
  const [a,b2]=M.flipped;
  if(M.cards[a].pair===M.cards[b2].pair){
    // Paire trouvée : on la récite à voix haute pour ancrer la table.
    M.cards[a].matched=true;M.cards[b2].matched=true;
    M.found++;M.flipped=[];
    const f=document.getElementById('memFound');if(f)f.textContent=M.found;
    document.querySelectorAll('.mem-card')[a].classList.add('matched');
    document.querySelectorAll('.mem-card')[b2].classList.add('matched');
    const op=M.cards[a].op;
    if(op&&_memVoice&&'speechSynthesis' in window){
      try{
        speechSynthesis.cancel();
        const u=new SpeechSynthesisUtterance(op[0]+' fois '+op[1]+', '+(op[0]*op[1]));
        u.lang='fr-FR';u.rate=0.95;
        speechSynthesis.speak(u);
      }catch(e){}
    }
    if(M.found===M.cards.length/2)memWin();
  }else{
    M.lock=true;
    setTimeout(()=>{
      M.flipped=[];M.lock=false;
      const els=document.querySelectorAll('.mem-card');
      if(els[a]&&!M.cards[a].matched)els[a].classList.remove('flipped');
      if(els[b2]&&!M.cards[b2].matched)els[b2].classList.remove('flipped');
    },900);
  }
}

function memWin(){
  const M=state.mem;
  if(state.memTickID){clearInterval(state.memTickID);state.memTickID=null}
  const total=M.cards.length/2;
  const perfect=total; // minimum théorique de coups
  const stars=M.moves<=perfect+2?3:M.moves<=perfect+5?2:1;
  const xp=total*5+stars*10;
  const cr=total*2;
  profile.xp=(Number(profile.xp)||0)+xp;
  profile.cristaux=(Number(profile.cristaux)||0)+cr;
  if(!profile.memoryStats)profile.memoryStats={};
  const prev=profile.memoryStats[M.modeId];
  if(!prev||M.moves<prev.moves||(M.moves===prev.moves&&M.time<prev.time)){
    profile.memoryStats[M.modeId]={moves:M.moves,time:M.time,date:today()};
  }
  saveProfile();
  // Battle Memory : on envoie les points et on renvoie vers l'\u00e9cran battle.
  if(M.battleCode){
    const pts=_memoryBattlePoints(M.moves,M.time,total);
    _submitMemoryBattle(M.battleCode,{moves:M.moves,time:M.time,pts});
    const w2=document.getElementById('memWin');
    if(w2)w2.innerHTML='<div class="card fade-in glow-anim text-center mt-4" style="border-color:#34d399">'
      +'<div style="font-size:3rem">\ud83c\udccf</div>'
      +'<h3 class="title" style="color:#34d399">'+pts+' points !</h3>'
      +'<p class="sub">'+M.moves+' coups \u00b7 '+M.time+'s \u00b7 +'+xp+' XP \u00b7 \ud83d\udc8e +'+cr+'</p>'
      +'<button class="btn-fire mt-3" data-code="'+esc(M.battleCode)+'" onclick="navigate(\'battleResults\',{battleViewCode:this.dataset.code})">\u2694\ufe0f Voir la battle</button>'
    +'</div>';
    return;
  }
  const w=document.getElementById('memWin');
  if(w)w.innerHTML='<div class="card fade-in glow-anim text-center mt-4" style="border-color:#fbbf24">'
    +'<div style="font-size:3rem">'+(stars===3?'\u{1F3C6}':'\u{1F389}')+'</div>'
    +'<h3 class="title" style="color:#fbbf24">Bravo !</h3>'
    +'<p style="font-size:1.6rem;margin:6px 0">'+'\u2B50'.repeat(stars)+'</p>'
    +'<p class="sub">'+M.moves+' coups \u00b7 '+M.time+'s \u00b7 +'+xp+' XP \u00b7 \u{1F48E} +'+cr+'</p>'
    +'<div class="btn-row mt-3">'
      +'<button class="btn-fire" onclick="startMemory(\''+esc(M.modeId)+'\')">\u{1F504} Rejouer</button>'
      +'<button class="btn-stone" onclick="navigate(\'memoryHome\')">Autres niveaux</button>'
    +'</div></div>';
}

render();
