const fs = require('fs'), vm = require('vm');
const g = fs.readFileSync('/home/user/kangourou-maths/game.js', 'utf8');
const d = g.indexOf('const FABLES=');
const f = g.indexOf('\n];', d) + 3;
const c = {}; vm.createContext(c);
vm.runInContext(g.slice(d, f).replace('const FABLES=', 'var FABLES='), c);
console.log(JSON.stringify(c.FABLES.map(p => ({
  id: p.id,
  titre: p.title,
  auteur: p.author || '',
  texte: String(p.text).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
}))));
