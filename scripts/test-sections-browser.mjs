// Exécuté uniquement sur le runner GitHub, avec des profils fictifs.
import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const root=resolve('.');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
const server=createServer(async(req,res)=>{
  try{
    const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://test').pathname));
    if(path!==root&&!path.startsWith(root+'/')){res.writeHead(403).end();return}
    const file=path===root?resolve(root,'index.html'):path;
    res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));
  }catch{res.writeHead(404).end()}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch();
try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
  await context.addInitScript(()=>{
    if(!localStorage.getItem('royaume_active_v1')){
      localStorage.setItem('royaume_active_v1','CoursTest');
      localStorage.setItem('royaume_profiles_v1',JSON.stringify({CoursTest:{name:'CoursTest',grade:3,age:9}}));
      localStorage.setItem('royaume_parent_pin',JSON.stringify({salt:'test',hash:'test'}));
    }
  });
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/index.html#lecons');
  await page.getByRole('button',{name:/Mathématiques/}).click();
  await page.getByRole('button',{name:/Fractions.*Comprendre/}).click();
  await page.getByRole('button',{name:/Ouvrir la leçon/}).click();
  await page.getByRole('button',{name:'Part 1 sur 4',exact:true}).click();
  await page.getByRole('button',{name:'Part 2 sur 4',exact:true}).click();
  assert((await page.getByRole('status').first().textContent()).includes('2/4'));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'pas de débordement mobile');
  await mkdir('artifacts',{recursive:true});
  await page.screenshot({path:'artifacts/fractions-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Suivant →',exact:true}).click();
  await page.getByRole('button',{name:'Suivant →',exact:true}).click();
  await page.locator('.section-page select').selectOption('4');
  assert((await page.getByRole('status').first().textContent()).includes('1/2 = 4/8'));
  await page.setViewportSize({width:1280,height:900});
  await page.screenshot({path:'artifacts/fractions-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'← Ma section',exact:true}).click();
  await page.getByRole('button',{name:/Commencer les questions/}).click();
  const first=await page.evaluate(()=>({id:state.exercises[state.idx].id,ans:state.exercises[state.idx].ans}));
  await page.locator('.choices-grid button').nth(first.ans).click();
  assert.equal(await page.evaluate(()=>Boolean(state.autoNextID)),false,'l’élève garde le temps de lire');
  await page.getByRole('button',{name:'Question suivante →',exact:true}).click();
  const wrong=await page.evaluate(()=>({ans:state.exercises[state.idx].ans,n:state.exercises[state.idx].ch.length}));
  await page.locator('.choices-grid button').nth((wrong.ans+1)%wrong.n).click();
  const log=await page.evaluate(()=>profile.answerHistory);
  assert.equal(log.length,2);assert(log[0].correct);assert(!log[1].correct);
  await page.getByRole('button',{name:'Question suivante →',exact:true}).click();
  await page.evaluate(()=>retourArriere());
  assert.equal(await page.evaluate(()=>state.screen),'section');
  await page.evaluate(()=>navigate('profilePicker'));
  await page.getByRole('dialog').waitFor();
  assert.equal(await page.evaluate(()=>state.screen),'section');
  await page.getByRole('button',{name:'Annuler',exact:true}).click();
  // Rechargement : même section, succès exclu et erreur toujours conservée.
  await page.goto(base+'/index.html#section=maths&notion=%7CFractions');
  await page.reload();
  await page.getByRole('button',{name:/Continuer les questions/}).waitFor();
  assert(!(await page.evaluate(()=>pickSectionExercises().map(e=>e.id))).includes(first.id));
  assert.equal(await page.evaluate(()=>profile.answerHistory.length),2);
  // Navigation expérience -> section dans la même matière.
  await page.evaluate(()=>{
    const s=sectionsOf('sciences').find(s=>s.cat==='Lumière');openSection('sciences',s.key);
  });
  await page.getByRole('button',{name:/Ouvrir la leçon/}).click();
  await page.getByText('🔬 Faire une expérience interactive',{exact:true}).click();
  await page.getByRole('button',{name:/La Lumière et les Couleurs/}).click();
  await page.getByRole('link',{name:'← Ma section',exact:true}).click();
  await page.getByRole('button',{name:/Ouvrir la leçon/}).waitFor();
  assert.equal(await page.evaluate(()=>state.screen),'section');
  assert.equal(await page.evaluate(()=>state.subjectId),'sciences');
  // Le cache doit permettre de relire les leçons sans réseau.
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller,{},{timeout:60000});
  await context.setOffline(true);
  await page.reload();
  await page.getByRole('button',{name:/Ouvrir la leçon/}).click();
  assert.equal(await page.evaluate(()=>state.screen),'sectionLesson');
  assert.equal(errors.length,0,errors.join('\n'));
  console.log('✅ Navigateur : fractions mobile/desktop, réponses, retours, verrou parental, reprise et leçons hors ligne.');

  await context.setOffline(false);
  await page.evaluate(()=>{_memVoice=false;navigate('memoryHome')});
  async function solveMemory(){
    await page.evaluate(()=>{state.mem.preview=0;renderMemoryGame()});
    const pairs=await page.evaluate(()=>{
      const ids=[...new Set(state.mem.cards.map(c=>c.pair))];
      return ids.map(id=>state.mem.cards.map((c,i)=>c.pair===id?i:-1).filter(i=>i>=0));
    });
    for(const [a,b] of pairs){await page.locator('.mem-card').nth(a).click();await page.locator('.mem-card').nth(b).click()}
    await page.getByRole('button',{name:'Voir ma progression →',exact:true}).waitFor();
  }
  await page.locator('button[data-stage="visuel-1"]').first().click();
  assert.equal(await page.evaluate(()=>state.mem.preview),12);
  await page.screenshot({path:'artifacts/memory-mobile.png',fullPage:true});
  const board1=await page.evaluate(()=>state.mem.board);
  await solveMemory();
  assert.equal(await page.evaluate(()=>memoryStageProgress(MEMORY_STAGES[0]).wins),1);
  await page.getByRole('button',{name:'Voir ma progression →',exact:true}).click();
  await page.locator('button[data-stage="visuel-1"]').first().click();
  assert.notEqual(await page.evaluate(()=>state.mem.board),board1);
  await solveMemory();
  await page.getByRole('button',{name:'Voir ma progression →',exact:true}).click();
  assert.equal(await page.locator('button[data-stage="visuel-2"]').first().isEnabled(),true);
  assert.equal(await page.evaluate(()=>profile.answerHistory.filter(r=>r.memory?.kind==='move').length),12);
  await page.evaluate(()=>openSection('maths','geometry-3|Géométrie'));
  await page.getByRole('button',{name:/Ouvrir la leçon/}).click();
  await page.getByRole('button',{name:'Suivant →',exact:true}).click();
  await page.getByRole('button',{name:'Colonne 0, ligne 2',exact:true}).click();
  assert((await page.locator('.section-page').textContent()).includes('3 carreaux'));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'artifacts/geometrie-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'← Ma section',exact:true}).click();
  await page.getByRole('button',{name:/Commencer les questions/}).click();
  assert.equal(await page.evaluate(()=>state.exercises.length),2);
  assert(await page.evaluate(()=>state.exercises.every(e=>e.schoolGrade===3&&e.lessonTier===1)));
  await page.evaluate(()=>retourArriere());
  await page.reload();
  assert.equal(await page.evaluate(()=>memoryStageProgress(MEMORY_STAGES[0]).wins),2,'Memory persistant après rechargement');
  assert.equal(errors.length,0,errors.join('\n'));
  console.log('✅ Navigateur : Memory progressif persistant, deux plateaux distincts et géométrie CM1 interactive.');

  await context.close();
}finally{await browser.close();await new Promise(done=>server.close(done))}
