// Test de la comparaison récitation/texte (poésies) : ordre, tolérance, répétitions.
import fs from 'fs';
const src=fs.readFileSync(new URL('../game.js',import.meta.url),'utf8');
const i=src.indexOf('function _normMots');const j=src.indexOf("/* ════════ POÉSIES PERSONNALISÉES");
const compareTexts=new Function(src.slice(i,j)+';return compareTexts')();
let ko=0;const t=(n,c)=>{if(!c){ko++;console.log('❌',n)}else console.log('✅',n)};
const P='La cigale ayant chanté tout l\'été, se trouva fort dépourvue quand la bise fut venue.';
t('texte exact = 100%',compareTexts(P,P).score===100);
t('accents et ponctuation ignorés',compareTexts(P,'la cigale ayant chante tout l ete se trouva fort depourvue quand la bise fut venue').score===100);
t('pluriel/variante tolérés',compareTexts('les petits chats dorment','le petit chat dorment').score>=75);
t('faute d\'une lettre tolérée (mot long)',compareTexts('dépourvue','depourvu').score===100);
t('mots dans le désordre pénalisés',compareTexts('un deux trois quatre cinq','cinq quatre trois deux un').score<=40);
t('mot répété compté une fois',compareTexts('la la la','la').matched===1);
t('texte vide = 0',compareTexts(P,'').score===0);
t('moitié du texte ≈ 50%',(()=>{const s=compareTexts(P,'la cigale ayant chanté tout l été').score;return s>=40&&s<=60})());
console.log(ko?`\n${ko} échoués`:'\nTous réussis');process.exit(ko?1:0);
