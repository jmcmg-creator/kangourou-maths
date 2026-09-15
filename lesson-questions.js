/* Mini-quiz des fiches : même identité de contenu et même registre que le jeu.
   Le test compare les clés avec game.js pour éviter toute divergence. */
window.LessonQuestions=(function(){
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
  const extra=JSON.stringify([e.type||'',e.map||'',e.target||'',e.flag||'',e.visual||'',e.visualImg||'',e.answers||[]]);
  return _norm(String(e.q||'').replace(/[+*\/−×÷=<>-]/g,c=>' operator'+c.codePointAt(0)+' '))+'||'+ch+extra;
}

  function current(){
    try{
      const name=localStorage.getItem('royaume_active_v1');
      const dict=JSON.parse(localStorage.getItem('royaume_profiles_v1')||'{}');
      return name&&dict[name]?{name,dict,p:dict[name]}:null;
    }catch(e){return null}
  }
  function key(q){return 'q:'+_qKey({q:q[0],ch:q[1]})}
  function pending(q){const x=current();return !!x&&!x.p.successfulQuestions?.[key(q)]}
  function record(q,choice,context={}){
    const x=current();if(!x)return false;
    const correct=choice===q[2];
    if(correct)x.p.successfulQuestions={...(x.p.successfulQuestions||{}),[key(q)]:true};
    const row={id:crypto.randomUUID(),date:new Date().toISOString(),exerciseId:context.id||'',
      q:q[0],questionKey:_qKey({q:q[0],ch:q[1]}),choices:q[1].slice(),given:q[1][choice]||'(sans réponse)',answer:q[1][q[2]],
      correct,level:context.level||'fiches',subject:context.subject||'sciences',category:context.category||'',
      mode:'fiche',explanation:q[3]||''};
    x.p.answerHistory=[...(x.p.answerHistory||[]),row];
    try{
      localStorage.setItem('royaume_profiles_v1',JSON.stringify(x.dict));
      localStorage.setItem('royaume_v3',JSON.stringify(x.p));
      sync();return true;
    }catch(e){return false}
  }
  function pass(q){return record(q,q[2])}
  async function sync(){
    const x=current();if(!x)return;
    try{
      if(window.Supa&&Supa.enabled()&&Supa.creds(x.name)){
        const res=await Supa.saveProfile(x.name,x.p);
        if(!res?.ok)throw new Error('sync');
      }else if(x.p.aid){
        const copy={...x.p};delete copy.name;
        const res=await fetch('https://royaume-api.square-paris75.workers.dev/profile/'+x.p.aid,{
          method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(copy)});
        if(!res.ok)throw new Error('sync');
      }else return;
      const status=document.getElementById('lessonSyncStatus');if(status)status.remove();
    }catch(e){
      if(!document.getElementById('lessonSyncStatus')){
        const status=document.createElement('p');status.id='lessonSyncStatus';status.setAttribute('role','status');
        status.textContent='Réponses conservées sur cet appareil. Synchronisation en base en attente.';
        document.body.appendChild(status);
      }
    }
  }
  window.addEventListener('online',sync);
  window.addEventListener('pagehide',sync);
  function emptyMessage(){return current()?'Toutes les questions de cette fiche sont déjà réussies.':'Ouvre ton espace élève pour répondre aux questions.'}
  return {key,pending,pass,record,emptyMessage};
})();
