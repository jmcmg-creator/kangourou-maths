/* Relie l'expérience de sciences à la section active, sans changer d'élève. */
(function(){
  let back;
  try{back=JSON.parse(sessionStorage.getItem('royaume_section_return')||'null')}catch(e){return}
  if(!back||location.hash!==back.hash||back.name!==localStorage.getItem('royaume_active_v1')||typeof back.hash!=='string'||!back.hash.startsWith('#section='))return;
  const target='../index.html'+back.hash;
  for(const a of document.querySelectorAll('a[href]')){
    if(a.getAttribute('href')==='../index.html'||a.getAttribute('href')==='../index.html#lecons'){
      a.href=target;a.textContent='← Ma section';
    }
  }
  const link=document.createElement('a');link.href=target;link.textContent='🎯 Continuer vers les questions de ma section';
  link.style.cssText='display:block;position:relative;margin:24px;padding:16px;border:2px solid #fbbf24;border-radius:12px;background:#201638;color:#fff;text-align:center;font:700 16px sans-serif';
  document.body.appendChild(link);
})();