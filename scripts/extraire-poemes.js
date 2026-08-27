/* Extrait les poèmes de game.js en JSON, pour que les outils de voix
 * travaillent sur EXACTEMENT le texte que l'app affiche. Recopier ces textes
 * ailleurs les ferait diverger un jour ou l'autre, sans que rien ne le signale.
 *
 *   node scripts/extraire-poemes.js
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const g = readFileSync(join(racine, 'game.js'), 'utf8');

const d = g.indexOf('const FABLES=');
if (d < 0) { console.error('FABLES introuvable dans game.js'); process.exit(1) }
const f = g.indexOf('\n];', d) + 3;

const c = {};
vm.createContext(c);
vm.runInContext(g.slice(d, f).replace('const FABLES=', 'var FABLES='), c);

console.log(JSON.stringify(c.FABLES.map((p) => ({
  id: p.id,
  titre: p.title,
  auteur: p.author || '',
  texte: String(p.text).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
}))));
