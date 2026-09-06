/* ════════ REVENIR D'UNE FICHE ════════
   Les royaumes de l'Ingénieur et des Inventions ont deux niveaux : une grille
   de tuiles, puis une fiche par machine. Trois défauts rendaient le retour
   « impossible », et ils étaient mesurés, pas supposés :

   1. Ouvrir une fiche ne créait AUCUNE entrée d'historique. Le geste « retour »
      d'iOS (glisser depuis le bord) et le bouton retour du navigateur
      quittaient donc le royaume entier au lieu de refermer la fiche.
   2. Le seul bouton visible en haut — « ← Retour », fixe — sortait aussi du
      royaume. Le bouton qui ramène à la liste était tout en bas d'une fiche de
      2 700 px : après les pièces, les étapes, le quiz.
   3. Revenir à la liste renvoyait en haut de la grille. Après la douzième
      machine, il fallait redescendre douze tuiles.

   Ce module règle les trois d'un coup, pour les deux pages, sans que chacune
   ait à le refaire :
   - ouvrir une fiche POUSSE une entrée d'historique ; le geste iOS et le
     bouton du navigateur la referment ;
   - le bouton fixe du haut change de rôle : sur une fiche il ramène à la
     liste, sur la liste il sort du royaume. Un seul bouton, toujours visible,
     qui fait toujours « un pas en arrière » ;
   - la position dans la grille est retenue et rendue.

   USAGE, dans la page :
     <a href="../index.html" class="back-btn" data-liste="Les machines">← Retour</a>
     FicheRetour.ouvrir(fnQuiRefermeLaFiche)   // à la fin de showDetail()
     FicheRetour.retour()                       // à la place de showHome()
*/
window.FicheRetour = (function () {
  var scrollGrille = 0;
  var fermer = null;
  var bouton = null;
  var texteSortie = '';

  function _bouton() {
    if (!bouton) {
      bouton = document.querySelector('.back-btn');
      if (bouton) texteSortie = bouton.textContent;
    }
    return bouton;
  }

  function ouvrir(fnFermer) {
    fermer = fnFermer;
    // Passer d'une fiche à la suivante (« Machine suivante ») ne doit PAS
    // empiler une entrée par fiche : il faudrait alors autant de « retour »
    // pour ressortir. Une seule entrée pour tout le séjour en fiche.
    if (!(history.state && history.state.fiche)) {
      scrollGrille = window.scrollY;
      try { history.pushState({ fiche: true }, ''); } catch (e) {}
    }
    var b = _bouton();
    if (b) {
      b.textContent = '← ' + (b.dataset.liste || 'La liste');
      b.setAttribute('aria-label', 'Revenir à la liste');
      b.onclick = function (e) { e.preventDefault(); retour(); };
    }
    // Une fiche se lit depuis le haut.
    window.scrollTo(0, 0);
  }

  function _fermerReel() {
    if (fermer) fermer();
    var b = _bouton();
    if (b) {
      b.textContent = texteSortie || '← Retour';
      b.removeAttribute('aria-label');
      b.onclick = null;
    }
    // On redonne la place qu'on occupait dans la grille. Réappliqué une fois
    // la mise en page stabilisée : le navigateur déplace parfois la position
    // quand du contenu au-dessus réapparaît.
    var y = scrollGrille;
    var poser = function () { window.scrollTo(0, y); };
    poser();
    try { requestAnimationFrame(function () { poser(); requestAnimationFrame(poser); }); } catch (e) {}
  }

  function retour() {
    // Si une entrée d'historique a été poussée, on la DÉPILE : c'est popstate
    // qui refermera la fiche, et l'historique reste juste. Sinon (page
    // rechargée directement sur une fiche, par exemple) on referme à la main.
    if (history.state && history.state.fiche) history.back();
    else _fermerReel();
  }

  window.addEventListener('popstate', function () {
    if (fermer && !(history.state && history.state.fiche)) _fermerReel();
  });

  return { ouvrir: ouvrir, retour: retour };
})();
