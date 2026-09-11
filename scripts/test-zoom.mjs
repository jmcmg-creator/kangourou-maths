import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const calls=[],frames=[];
const meta={setAttribute(k,v){this[k]=v;calls.push(v)}};
const button={style:{},setAttribute(){}};
const vv={scale:3,offsetLeft:210,offsetTop:90,addEventListener(){}};
const ctx={document:{querySelector:()=>meta,createElement:()=>button,body:{appendChild(){}},activeElement:{blur(){}}},window:{visualViewport:vv,addEventListener(){}},requestAnimationFrame:fn=>frames.push(fn)};
vm.runInNewContext(readFileSync(new URL('../zoom.js',import.meta.url),'utf8'),ctx);
assert.equal(button.hidden,false);
assert.equal(button.style.transform,'translate(214px,94px) scale(0.3333333333333333)');
button.onclick();assert(meta.content.includes('maximum-scale=1'));
while(frames.length)frames.shift()();
assert(meta.content.includes('maximum-scale=5'));assert(meta.content.includes('user-scalable=yes'));
for(const name of ['index.html',...['atomes','corps-humain','cycle-eau','eau','electricite','gravite','ingenieur','inventions','lumiere','ondes-em','ondes-sonores','photosynthese','planetes','volcans'].map(n=>'lecons/'+n+'.html')]){
 const html=readFileSync(new URL('../'+name,import.meta.url),'utf8');
 assert(html.includes('zoom.js?v=1'),name);assert(!html.includes('user-scalable=no'),name);
}
console.log('✅ Zoom : bouton visible et compensé à 3×, remise à 1× puis pincement réactivé ; 15 pages couvertes.');
