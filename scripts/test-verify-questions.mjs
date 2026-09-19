// scripts/verify-questions.mjs a longtemps échoué en silence : le workflow
// n'a jamais tourné (ANTHROPIC_API_KEY absent), donc son bug de lecture des
// questions n'a jamais été vu. exercises.js déclare SON PROPRE `const EX=[…]`
// (script classique, pas un module) ; exercises_extra.js réutilise ensuite ce
// même tableau via `EX.push(…)`. L'ancienne fonction passait un objet `{push}`
// EN PARAMÈTRE nommé EX à exercises.js — qui tentait alors de redéclarer un
// `const EX` par-dessus ce paramètre. SyntaxError, jamais vue en CI.
//
// Ce test lit les VRAIS fichiers du dépôt (comme test-versions.mjs), pour
// que ce bug précis ne puisse plus repasser inaperçu. Le reste couvre les
// pièces qui tournent sans réseau : la rotation des lots hebdomadaires et le
// cadencement des requêtes sous le quota gratuit.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadAllExercises, choisirLot, creerAppelModele } from './verify-questions.mjs';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(racine); // loadAllExercises() lit des chemins relatifs, comme en CI

let ok = 0, ko = 0;
const dire = (l, c, d) => { c ? (ok++, console.log('  ✅ ' + l)) : (ko++, console.log('  ❌ ' + l + (d ? ' → ' + d : ''))); };

console.log('\n── Lecture des vrais fichiers de questions ──');
const all = loadAllExercises();
dire('exercises.js + exercises_extra.js se lisent sans erreur (ni SyntaxError)', all.length > 100, `${all.length} exercices`);
const qcm = all.filter((e) => Array.isArray(e.ch) && e.ch.length === 4 && typeof e.ans === 'number');
dire('des QCM à 4 choix sont bien présents', qcm.length > 100, `${qcm.length} QCM`);
dire('les exercices d\'exercises_extra.js sont bien dedans (pas juste ceux d\'exercises.js)', all.some((e) => e.id === 'lion-rat' || all.length > 1000));
const ids = new Set(all.map((e) => e.id));
dire('tous les identifiants sont uniques', ids.size === all.length, `${ids.size} uniques sur ${all.length}`);

console.log('\n── Rotation des lots hebdomadaires ──');
const semaine = 7 * 24 * 3600 * 1000;
const bidon = Array.from({ length: 97 }, (_, i) => ({ id: 'q' + i }));
{
  const lot0 = choisirLot(bidon, { batchSize: 40, maintenant: 0 });
  const lot1 = choisirLot(bidon, { batchSize: 40, maintenant: semaine });
  dire('deux semaines qui se suivent donnent deux lots différents', JSON.stringify(lot0) !== JSON.stringify(lot1));
  dire('un lot ne dépasse pas la taille demandée', lot0.length <= 40 && lot1.length <= 40);
}
{
  // Sur assez de semaines, TOUTE la banque doit finir par être couverte —
  // sinon des questions resteraient éternellement hors du balayage.
  const vus = new Set();
  for (let s = 0; s < 10; s++) {
    for (const q of choisirLot(bidon, { batchSize: 40, maintenant: s * semaine })) vus.add(q.id);
  }
  dire('après assez de semaines, toute la banque a été couverte', vus.size === bidon.length, `${vus.size}/${bidon.length}`);
}
{
  const petit = [{ id: 'a' }, { id: 'b' }];
  const lot = choisirLot(petit, { batchSize: 40, maintenant: 3 * semaine });
  dire('une banque plus petite que le lot ne plante pas', lot.length === petit.length, `${lot.length}`);
}

console.log('\n── Un appel bien formé donne un verdict ──');
{
  const reponse = (corps) => ({ ok: true, status: 200, headers: new Map(), json: async () => corps, text: async () => '' });
  const fauxFetch = async () => reponse({ choices: [{ message: { content: '{"ok":true,"correct_index":1,"reason":""}' } }] });
  const { verifyOne } = creerAppelModele({ apiKey: 'k', fetchImpl: fauxFetch, attendre: async () => {} });
  const r = await verifyOne({ q: 'Combien font 2+2 ?', ch: ['3', '4', '5', '6'], ans: 1 });
  dire('un JSON valide donne ok=true', r.ok === true, JSON.stringify(r));

  const { verifyOne: verifyPasQcm } = creerAppelModele({ apiKey: 'k', fetchImpl: fauxFetch, attendre: async () => {} });
  const skip = await verifyPasQcm({ q: 'texte libre', type: 'saisie' });
  dire('une question sans 4 choix est ignorée sans appeler le modèle', skip.skipped === true);
}

console.log('\n── Un texte sans JSON ne fait pas planter le lot ──');
{
  const fauxFetch = async () => ({ ok: true, status: 200, headers: new Map(), json: async () => ({ choices: [{ message: { content: 'Désolé, je ne sais pas.' } }] }) });
  const { verifyOne } = creerAppelModele({ apiKey: 'k', fetchImpl: fauxFetch, attendre: async () => {} });
  const r = await verifyOne({ q: '?', ch: ['a', 'b', 'c', 'd'], ans: 0 });
  dire('une réponse sans JSON devient une erreur technique, pas un « à corriger »', !!r.error && r.ok === undefined, JSON.stringify(r));
}

console.log('\n── 429 : on patiente selon Retry-After, puis on abandonne proprement ──');
{
  let appels = 0;
  const patiences = [];
  const fauxFetch = async () => { appels++; return { ok: false, status: 429, headers: new Map([['retry-after', '2']]) }; };
  const { verifyOne, estQuotaEpuise } = creerAppelModele({
    apiKey: 'k', fetchImpl: fauxFetch, maxRetries429: 2,
    attendre: async (ms) => { patiences.push(ms); },
  });
  const r = await verifyOne({ q: '?', ch: ['a', 'b', 'c', 'd'], ans: 0 });
  dire('après le nombre d\'essais prévu, on obtient rateLimited (pas une erreur)', r.rateLimited === true, JSON.stringify(r));
  dire('le Retry-After (2s) a bien été respecté, pas un délai inventé', patiences.includes(2000), JSON.stringify(patiences));
  dire('le quota est marqué épuisé une fois les essais épuisés', estQuotaEpuise() === true);

  const r2 = await verifyOne({ q: '?', ch: ['a', 'b', 'c', 'd'], ans: 0 });
  dire('une fois le quota marqué épuisé, on n\'appelle plus le réseau du tout', r2.rateLimited === true && appels === 3, `${appels} appels réseau`);
}

console.log('\n── Cadencement : le créneau minimal est respecté même sans 429 ──');
{
  const fauxFetch = async () => ({ ok: true, status: 200, headers: new Map(), json: async () => ({ choices: [{ message: { content: '{"ok":true}' } }] }) });
  const patiences = [];
  const { verifyOne } = creerAppelModele({
    apiKey: 'k', fetchImpl: fauxFetch, minIntervalMs: 3200,
    attendre: async (ms) => { patiences.push(ms); },
  });
  await verifyOne({ q: '1', ch: ['a', 'b', 'c', 'd'], ans: 0 });
  await verifyOne({ q: '2', ch: ['a', 'b', 'c', 'd'], ans: 0 });
  dire('le deuxième appel attend bien ≈3,2s après le premier (20/min)', patiences.some((p) => p >= 3100 && p <= 3300), JSON.stringify(patiences));
}

console.log(`\n${ok} réussis · ${ko} échoués`);
process.exit(ko ? 1 : 0);
