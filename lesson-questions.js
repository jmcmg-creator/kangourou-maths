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
  function pass(q){
    const x=current();if(!x)return false;
    x.p.successfulQuestions={...(x.p.successfulQuestions||{}),[key(q)]:true};
    try{
      localStorage.setItem('royaume_profiles_v1',JSON.stringify(x.dict));
      localStorage.setItem('royaume_v3',JSON.stringify(x.p));
      return true;
    }catch(e){return false}
  }
  function emptyMessage(){return current()?'Toutes les questions de cette fiche sont déjà réussies.':'Ouvre ton espace élève pour répondre aux questions.'}
  return {key,pending,pass,emptyMessage};
})();
