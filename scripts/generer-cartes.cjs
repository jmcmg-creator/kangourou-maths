#!/usr/bin/env node
/* Génère cartes-monde.js : l'Asie, l'Afrique et l'Amérique, pays par pays, avec
 * leurs formes touchables, leurs noms français (avec article) et leurs capitales.
 *
 * SOURCES, toutes libres
 *   - frontières : Natural Earth 1:110m (domaine public), via le paquet world-atlas
 *   - noms français : i18n-iso-countries (MIT)
 *   - capitales et régions : world-countries (ODbL, attribution ci-dessus)
 *
 * POURQUOI 1:110m ET PAS PLUS FIN
 * Sur un écran de téléphone, un pays est une tache de quelques millimètres :
 * un tracé plus précis ne se verrait pas et triplerait le poids. Les
 * micro-États sont écartés (seuil de surface par continent) — intouchables du
 * doigt de toute façon — et les petits pays reçoivent une zone tactile ronde
 * dans l'app (voir renderCountryMapArea).
 *
 * USAGE (les paquets ne sont pas des dépendances du projet : on les installe
 * dans un dossier jetable pour ne pas alourdir npm ci de Codemagic)
 *   mkdir /tmp/cartes && cd /tmp/cartes && npm init -y >/dev/null
 *   npm install world-atlas@2 topojson-client d3-geo i18n-iso-countries world-countries
 *   NODE_PATH=/tmp/cartes/node_modules node scripts/generer-cartes.cjs
 */
const wa=require('world-atlas/countries-110m.json');const topo=require('topojson-client');const d3=require('d3-geo');
const i18n=require('i18n-iso-countries');i18n.registerLocale(require('i18n-iso-countries/langs/fr.json'));
const wc=require('world-countries');const byN3={};wc.forEach(c=>byN3[c.ccn3]=c);
const fc=topo.feature(wa,wa.objects.countries);
function sansParentheses(t){
  let out='',i=0;
  while(i<t.length){
    const j=t.indexOf('(',i); if(j<0){out+=t.slice(i);break}
    const k=t.indexOf(')',j); out+=t.slice(i,j).trimEnd(); i=k<0?t.length:k+1;
  }
  return out.trim();
}
const CAP_FR={'Vienna':'Vienne','Warsaw':'Varsovie','Lisbon':'Lisbonne','Copenhagen':'Copenhague','Athens':'Athènes','Moscow':'Moscou','Beijing':'Pékin','Cairo':'Le Caire','Algiers':'Alger','Mexico City':'Mexico','Havana':'La Havane','Seoul':'Séoul','Riyadh':'Riyad','Tehran':'Téhéran','Damascus':'Damas','Baghdad':'Bagdad','Jerusalem':'Jérusalem','Kabul':'Kaboul','Ulan Bator':'Oulan-Bator','Ulaanbaatar':'Oulan-Bator','Manila':'Manille','Hanoi':'Hanoï','Dhaka':'Dacca','Kathmandu':'Katmandou','Tashkent':'Tachkent','Addis Ababa':'Addis-Abeba','Mogadishu':'Mogadiscio','Juba':'Djouba','Washington D.C.':'Washington','Washington, D.C.':'Washington','Guatemala City':'Guatemala','Santo Domingo':'Saint-Domingue','Panama City':'Panama','Bogotá':'Bogota','Asunción':'Asunción','Brasília':'Brasilia','Kyiv':'Kiev','Bucharest':'Bucarest','Belgrade':'Belgrade','Sofia':'Sofia','Bern':'Berne','Brussels':'Bruxelles','Prague':'Prague','Budapest':'Budapest','Helsinki':'Helsinki','Stockholm':'Stockholm','Oslo':'Oslo','Dublin':'Dublin','London':'Londres','Rome':'Rome','Berlin':'Berlin','Madrid':'Madrid','Paris':'Paris','Amsterdam':'Amsterdam','Ankara':'Ankara','Nur-Sultan':'Astana','Astana':'Astana','Bishkek':'Bichkek','Dushanbe':'Douchanbé','Ashgabat':'Achgabat','Yangon':'Rangoun','Naypyidaw':'Naypyidaw','Thimphu':'Thimphou','Muscat':'Mascate','Sanaa':'Sanaa','Abu Dhabi':'Abou Dabi','Doha':'Doha','Kuwait City':'Koweït','Beirut':'Beyrouth','Amman':'Amman','Tbilisi':'Tbilissi','Yerevan':'Erevan','Baku':'Bakou','Pyongyang':'Pyongyang','Taipei':'Taipei','Islamabad':'Islamabad','Colombo':'Colombo','Male':'Malé','Singapore':'Singapour','Bandar Seri Begawan':'Bandar Seri Begawan','Dili':'Dili','Kuala Lumpur':'Kuala Lumpur','Jakarta':'Jakarta','Phnom Penh':'Phnom Penh','Vientiane':'Vientiane','Bangkok':'Bangkok','Tokyo':'Tokyo','New Delhi':'New Delhi','Tunis':'Tunis','Tripoli':'Tripoli','Rabat':'Rabat','Nouakchott':'Nouakchott','Dakar':'Dakar','Bamako':'Bamako','Niamey':'Niamey','N\'Djamena':'N\'Djamena','Khartoum':'Khartoum','Asmara':'Asmara','Djibouti':'Djibouti','Nairobi':'Nairobi','Kampala':'Kampala','Kigali':'Kigali','Dodoma':'Dodoma','Lusaka':'Lusaka','Harare':'Harare','Maputo':'Maputo','Lilongwe':'Lilongwe','Antananarivo':'Antananarivo','Windhoek':'Windhoek','Gaborone':'Gaborone','Pretoria':'Pretoria','Luanda':'Luanda','Kinshasa':'Kinshasa','Brazzaville':'Brazzaville','Libreville':'Libreville','Yaoundé':'Yaoundé','Bangui':'Bangui','Abuja':'Abuja','Accra':'Accra','Lomé':'Lomé','Porto-Novo':'Porto-Novo','Ouagadougou':'Ouagadougou','Yamoussoukro':'Yamoussoukro','Conakry':'Conakry','Freetown':'Freetown','Monrovia':'Monrovia','Bissau':'Bissau','Banjul':'Banjul','Malabo':'Malabo','Ottawa':'Ottawa','Caracas':'Caracas','Quito':'Quito','Lima':'Lima','La Paz':'La Paz','Santiago':'Santiago','Buenos Aires':'Buenos Aires','Montevideo':'Montevideo','Paramaribo':'Paramaribo','Georgetown':'Georgetown','San José':'San José','Managua':'Managua','Tegucigalpa':'Tegucigalpa','San Salvador':'San Salvador','Belmopan':'Belmopan','Kingston':'Kingston','Port-au-Prince':'Port-au-Prince','Nuuk':'Nuuk'};
// Les continents, avec la liste des pays qu'un enfant peut viser du doigt sur
// un écran de téléphone : on écarte les micro-États. Zone de projection
// choisie à la main pour que le continent remplisse la carte.
// Noms raccourcis pour un enfant, et articles pour « Où est … ? ».
const NOM_FR={TZ:'Tanzanie',US:'États-Unis',SZ:'Eswatini',DO:'République dominicaine',AE:'Émirats arabes unis',BN:'Brunei',VN:'Vietnam',
  KR:'Corée du Sud',KP:'Corée du Nord',LA:'Laos',IR:'Iran',SY:'Syrie',BO:'Bolivie',VE:'Venezuela',TL:'Timor oriental',CD:'République démocratique du Congo',
  CG:'Congo',CI:'Côte d\'Ivoire',MM:'Birmanie',PS:'Palestine',TW:'Taïwan',MD:'Moldavie',RU:'Russie',TR:'Turquie',MK:'Macédoine du Nord',CZ:'Tchéquie'};
const ART_EXC={US:'les',AE:'les',PH:'les',NL:'les',MX:'le',KH:'le',MZ:'le',ZW:'le',CL:'le',BW:'le',ZM:'la',SZ:'l\'',CG:'le',CD:'la',TD:'le',NE:'le',NG:'le',ML:'le',SN:'le',GH:'le',BJ:'le',TG:'le',BF:'le',GA:'le',CM:'le',KE:'le',RW:'le',BI:'le',MW:'le',LS:'le',SD:'le',SS:'le',DJ:'le',MA:'le',JP:'le',VN:'le',LA:'le',NP:'le',BD:'le',BT:'le',PK:'le',LK:'le',MM:'la',KZ:'le',KG:'le',TJ:'le',TM:'le',UZ:'l\'',QA:'le',KW:'le',OM:'l\'',YE:'le',IQ:'l\'',IR:'l\'',AF:'l\'',IL:'Israël',JO:'la',LB:'le',SY:'la',SA:'l\'',TR:'la',CA:'le',BR:'le',PE:'le',PY:'le',UY:'l\'',SR:'le',GY:'le',VE:'le',SV:'le',HN:'le',NI:'le',CR:'le',PA:'le',BZ:'le',GT:'le',CU:'Cuba',HT:'Haïti',DO:'la',TL:'le',ID:'l\'',MY:'la',TH:'la',CN:'la',IN:'l\'',MN:'la',KR:'la',KP:'la',GE:'la',AM:'l\'',AZ:'l\'',TW:'Taïwan',EG:'l\'',LY:'la',TN:'la',DZ:'l\'',MR:'la',GN:'la',GW:'la',SL:'la',LR:'le',CI:'la',GM:'la',ET:'l\'',ER:'l\'',SO:'la',UG:'l\'',TZ:'la',AO:'l\'',NA:'la',ZA:'l\'',MG:'Madagascar',AR:'l\'',CO:'la',EC:'l\'',BO:'la',MX:'le',CF:'la',GQ:'la',PG:'la'};
function article(a2,nom){
  const e=ART_EXC[a2]; if(e&&!/^(le|la|les|l')$/.test(e)) return nom;           // pas d'article : « Où est Cuba ? »
  const art=e||(/^[AEIOUÉÈÊÎÔÛH]/i.test(nom)?'l\'':/e$/.test(nom)?'la':'le');
  return art==='l\''?'l\''+nom:art+' '+nom;
}
const EXCLURE=['RU','GL','EH','PS','CY','PR','TW','GQ','SS'];
const CONT={
  asie:{nom:'Asie',regions:['Asia'],exclure:EXCLURE,minKm2:60000,proj:()=>d3.geoConicEqualArea().parallels([15,55]).rotate([-90,0])},
  afrique:{nom:'Afrique',regions:['Africa'],exclure:EXCLURE,minKm2:25000,proj:()=>d3.geoConicEqualArea().parallels([-20,20]).rotate([-18,0])},
  amerique:{nom:'Amérique',regions:['Americas'],exclure:EXCLURE,minKm2:40000,proj:()=>d3.geoConicEqualArea().parallels([-20,50]).rotate([85,0])},
};
const out={};
for(const [cle,c] of Object.entries(CONT)){
  const feats=[];
  for(const f of fc.features){const n3=String(f.id).padStart(3,'0');const w=byN3[n3];if(!w||!c.regions.includes(w.region))continue;
    if(c.exclure.includes(w.cca2))continue;const km2=d3.geoArea(f)*6371*6371;if(km2<c.minKm2)continue;
    feats.push({f,a2:w.cca2.toLowerCase(),A2:w.cca2,fr:sansParentheses(NOM_FR[w.cca2]||i18n.getName(w.cca2,'fr')||w.name.common),cap:(w.capital||[])[0]||'',km2});}
  const coll={type:'FeatureCollection',features:feats.map(x=>x.f)};
  const proj=c.proj().fitExtent([[3,3],[97,97]],coll);
  const path=d3.geoPath(proj).digits(2);
  const pays={};
  for(const x of feats){
    const d=path(x.f);if(!d)continue;
    // Deux décimales suffisent sur 100 unités : le tracé reste net sur un
    // écran Retina et le fichier reste léger. C'est d3 qui arrondit (digits),
    // pas une expression régulière sur le tracé : une regex du type
    // (\d+\.\d\d)\d+ recule sur chaque chiffre d'une longue suite et devient
    // quadratique — CodeQL la classe en gravité haute (déni de service).
    const dd=d;
    const centre=path.centroid(x.f);const b=path.bounds(x.f);
    pays[x.a2]={name:article(x.A2,x.fr),nom:x.fr,cap:CAP_FR[x.cap]||x.cap,path:dd,cx:+centre[0].toFixed(1),cy:+centre[1].toFixed(1),w:+(b[1][0]-b[0][0]).toFixed(1),h:+(b[1][1]-b[0][1]).toFixed(1),km2:Math.round(x.km2)};
  }
  out[cle]={nom:c.nom,pays};
  console.log(cle.padEnd(9),Object.keys(pays).length,'pays ·',Math.round(JSON.stringify(pays).length/1024),'Ko · ex:',Object.entries(pays).slice(0,5).map(([k,v])=>k+' '+v.name+'/'+v.cap).join(' · '));
}

// Aperçu visuel pour contrôle à l'œil.
const svg=k=>{const p=out[k].pays;return `<svg viewBox="0 0 100 100" width="360" height="360" style="background:#0f172a"><g fill="#38bdf8" fill-opacity=".55" stroke="#e0f2fe" stroke-width=".25">${Object.entries(p).map(([id,v])=>`<path d="${v.path}"/>`).join('')}</g><g font-size="1.6" fill="#fff" text-anchor="middle">${Object.entries(p).map(([id,v])=>`<text x="${v.cx}" y="${v.cy}">${id}</text>`).join('')}</g></svg>`};
require('fs').writeFileSync(require('path').join(require('os').tmpdir(),'cartes-apercu.html'),`<body style="margin:0;background:#111;display:flex;gap:8px;flex-wrap:wrap">${['asie','afrique','amerique'].map(svg).join('')}</body>`);

const js='/* Cartes de l\'Asie, de l\'Afrique et de l\'Amérique — GÉNÉRÉ par scripts/generer-cartes.cjs\n'+
'   à partir de Natural Earth (domaine public) via world-atlas, avec les noms français de\n'+
'   i18n-iso-countries et les capitales de world-countries. Ne pas modifier à la main. */\n'+
'const MAP_SETS_MONDE='+JSON.stringify(out)+';\n';
require('fs').writeFileSync(require('path').join(__dirname,'..','cartes-monde.js'),js);
console.log('cartes-monde.js :',Math.round(js.length/1024),'Ko');
for(const k of Object.keys(out)){const p=out[k].pays;const petits=Object.entries(p).filter(([,v])=>Math.min(v.w,v.h)<5).map(([id])=>id);console.log(' ',k,'· tout petits (zone tactile) :',petits.join(' '));console.log('   ex :',Object.values(p).slice(0,6).map(v=>'Où est '+v.name+' ? / '+v.cap).join(' | '));}
