/* Zoom natif accessible, avec une sortie toujours dans le viewport visible. */
(function(){
  const meta=document.querySelector('meta[name="viewport"]');
  if(!meta)return;
  const normal='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover';
  meta.setAttribute('content',normal);
  const button=document.createElement('button');
  button.type='button';button.textContent='100 %';
  button.setAttribute('aria-label','Revenir au zoom normal');
  // Sous le bouton « ← Retour » des leçons (top:12px + encoche), qui ne
  // suit pas le zoom : sans cette marge les deux boutons se chevauchaient
  // au début d'un pincement, avant que l'utilisateur ait déplacé la vue.
  // La formule du translate() plus bas suppose un point de départ à top:0 ;
  // ce décalage s'ADDITIONNE à elle plutôt que de la changer.
  button.style.cssText='position:fixed;top:calc(64px + env(safe-area-inset-top,0px));left:0;z-index:20000;min-height:44px;min-width:60px;border:2px solid #fbbf24;border-radius:12px;background:#1e1650;color:white;font:700 16px sans-serif;transform-origin:top left';
  document.body.appendChild(button);
  const vv=window.visualViewport;
  function position(){
    const scale=vv?vv.scale:1;
    button.hidden=scale<=1.02;
    button.style.transform='translate('+((vv?vv.offsetLeft:0)+12/scale)+'px,'+((vv?vv.offsetTop:0)+12/scale)+'px) scale('+(1/scale)+')';
  }
  button.onclick=function(){
    if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
    meta.setAttribute('content','width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=yes, viewport-fit=cover');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{meta.setAttribute('content',normal);position()}));
  };
  if(vv){vv.addEventListener('resize',position);vv.addEventListener('scroll',position)}
  window.addEventListener('resize',position);
  position();
})();
