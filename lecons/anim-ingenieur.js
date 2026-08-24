/* ════════════════════════════════════════════════════════════════════
   ANIMATIONS DU ROYAUME DE L'INGÉNIEUR
   Vingt machines n'étaient expliquées que par du texte. Un enfant de 8 ans
   ne « voit » pas un piston à quatre temps dans un paragraphe : il faut le
   regarder monter, descendre, et comprendre QUAND l'explosion pousse.

   Neuf mécanismes animés couvrent les vingt machines — la plupart
   partagent le même principe physique, et un mécanisme bien fait vaut
   mieux que vingt schémas bâclés.

   CHOIX TECHNIQUES
   · SVG + CSS, aucune bibliothèque : la leçon marche hors connexion et ne
     pèse rien.
   · Uniquement `transform` et `opacity` : ce sont les deux seules
     propriétés que le téléphone anime sans repeindre — même raison que
     pour le correctif de batterie.
   · Tout s'arrête quand la page n'est pas visible, et rien ne bouge si
     « Réduire les animations » est activé sur l'appareil.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var C = {
    metal: '#94a3b8', metalD: '#64748b', metalL: '#cbd5e1',
    chaud: '#f97316', feu: '#fb923c', froid: '#38bdf8',
    elec: '#facc15', eau: '#22d3ee', vert: '#4ade80',
    sombre: '#1e293b', trait: '#475569', texte: '#e2e8f0', pale: '#94a3b8'
  };

  /* ── 1. Piston à quatre temps ──────────────────────────────────────
     Le seul temps qui produit de l'énergie est l'explosion : c'est
     exactement ce que le texte peine à faire sentir, et ce que
     l'animation montre d'un coup d'œil. */
  function piston() {
    return '' +
      '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="Cycle à quatre temps d\'un moteur">' +
      '<rect x="96" y="18" width="76" height="104" rx="4" fill="' + C.sombre + '" stroke="' + C.metal + '" stroke-width="3"/>' +
      // gaz coloré selon le temps
      '<rect class="ai-gaz" x="99" y="21" width="70" height="98" rx="3"/>' +
      // soupapes
      '<g class="ai-soup-in"><rect x="106" y="6" width="9" height="26" rx="3" fill="' + C.metalL + '"/><rect x="99" y="28" width="23" height="6" rx="3" fill="' + C.metalL + '"/></g>' +
      '<g class="ai-soup-ex"><rect x="153" y="6" width="9" height="26" rx="3" fill="' + C.metalL + '"/><rect x="146" y="28" width="23" height="6" rx="3" fill="' + C.metalL + '"/></g>' +
      '<text x="90" y="24" class="ai-lbl" text-anchor="end">admission</text>' +
      '<text x="178" y="24" class="ai-lbl">échappement</text>' +
      // bougie + étincelle
      '<rect x="130" y="4" width="8" height="18" rx="2" fill="' + C.metalD + '"/>' +
      '<circle class="ai-etincelle" cx="134" cy="30" r="8" fill="' + C.elec + '"/>' +
      // piston + bielle + vilebrequin
      '<g class="ai-piston">' +
      '<rect x="99" y="70" width="70" height="26" rx="3" fill="' + C.metalL + '" stroke="' + C.metalD + '" stroke-width="2"/>' +
      '<rect x="130" y="94" width="8" height="46" fill="' + C.metal + '"/>' +
      '</g>' +
      '<g class="ai-vilebrequin"><circle cx="134" cy="158" r="24" fill="none" stroke="' + C.metalD + '" stroke-width="5"/>' +
      '<circle cx="134" cy="140" r="6" fill="' + C.metal + '"/></g>' +
      '<circle cx="134" cy="158" r="5" fill="' + C.metalL + '"/>' +
      // légende des quatre temps
      '<g class="ai-temps">' +
      '<text x="208" y="46" class="ai-t1">1 · Admission</text>' +
      '<text x="208" y="76" class="ai-t2">2 · Compression</text>' +
      '<text x="208" y="106" class="ai-t3">3 · EXPLOSION</text>' +
      '<text x="208" y="136" class="ai-t4">4 · Échappement</text>' +
      '</g>' +
      '</svg>';
  }

  /* ── 2. Rotor ──────────────────────────────────────────────────────
     Éolienne, pompe, turbine de barrage, tambour, aspirateur : dans tous
     les cas quelque chose entre et fait tourner quelque chose. */
  function rotor(o) {
    var pales = o.pales || 3, coul = o.couleur || C.metalL, flux = o.flux || C.froid;
    var lames = '';
    for (var i = 0; i < pales; i++) {
      lames += '<g transform="rotate(' + (i * 360 / pales) + ' 160 100)">' +
        '<path d="M160 100 L152 44 Q160 32 168 44 Z" fill="' + coul + '"/></g>';
    }
    var fleches = '';
    for (var k = 0; k < 3; k++) {
      fleches += '<g class="ai-flux" style="animation-delay:' + (k * 0.5) + 's">' +
        '<path d="M14 ' + (58 + k * 30) + ' h44" stroke="' + flux + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M52 ' + (52 + k * 30) + ' l10 6 l-10 6" fill="' + flux + '"/></g>';
    }
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="' + esc(o.alt || 'Rotor en rotation') + '">' +
      fleches +
      '<rect x="152" y="100" width="16" height="86" rx="4" fill="' + C.metalD + '"/>' +
      '<g class="ai-rotor" style="animation-duration:' + (o.vitesse || 3) + 's">' + lames + '</g>' +
      '<circle cx="160" cy="100" r="11" fill="' + C.metalD + '" stroke="' + C.metalL + '" stroke-width="3"/>' +
      '<text x="16" y="34" class="ai-lbl">' + esc(o.entree || 'ce qui entre') + '</text>' +
      '<text x="196" y="' + (o.sortieY || 96) + '" class="ai-lbl-fort">' + esc(o.sortie || 'rotation') + '</text>' +
      (o.sortie2 ? '<text x="196" y="' + ((o.sortieY || 96) + 20) + '" class="ai-lbl">' + esc(o.sortie2) + '</text>' : '') +
      '</svg>';
  }

  /* ── 3. Circuit électrique ─────────────────────────────────────────
     Une boucle FERMÉE : c'est le point que les enfants ratent le plus
     souvent — le courant doit revenir à sa source. */
  function circuit(o) {
    var n = 10, elec = '';
    for (var i = 0; i < n; i++) {
      elec += '<circle class="ai-electron" r="4" fill="' + C.elec + '" style="animation-delay:' + (-i * (3 / n)).toFixed(2) + 's"/>';
    }
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="' + esc(o.alt || 'Circuit électrique') + '">' +
      '<rect x="46" y="46" width="228" height="108" rx="14" fill="none" stroke="' + C.trait + '" stroke-width="7"/>' +
      elec +
      // source
      '<rect x="18" y="78" width="56" height="44" rx="6" fill="' + C.sombre + '" stroke="' + C.metal + '" stroke-width="3"/>' +
      '<text x="46" y="104" class="ai-lbl-c">' + esc(o.source || 'pile') + '</text>' +
      // récepteur
      '<g class="ai-recepteur">' +
      '<circle cx="254" cy="100" r="26" fill="' + (o.couleur || C.elec) + '" opacity="0.25"/>' +
      '<circle class="ai-lueur" cx="254" cy="100" r="17" fill="' + (o.couleur || C.elec) + '"/>' +
      '</g>' +
      '<text x="254" y="178" class="ai-lbl-c">' + esc(o.recepteur || 'lampe') + '</text>' +
      '<text x="160" y="36" class="ai-lbl-c">' + esc(o.haut || 'les électrons tournent en boucle') + '</text>' +
      (o.bas ? '<text x="130" y="196" class="ai-lbl-c">' + esc(o.bas) + '</text>' : '') +
      '</svg>';
  }

  /* ── 4. Circuit de fluide ──────────────────────────────────────────
     Frigo, chauffage, cafetière : un liquide fait la navette entre un
     endroit chaud et un endroit froid, et transporte la chaleur. */
  function fluide(o) {
    var n = 9, gouttes = '';
    for (var i = 0; i < n; i++) {
      gouttes += '<circle class="ai-goutte" r="5" style="animation-delay:' + (-i * (4 / n)).toFixed(2) + 's"/>';
    }
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="' + esc(o.alt || 'Circulation d\'un fluide') + '">' +
      '<defs><linearGradient id="aiTuyau" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="' + (o.gaucheCoul || C.froid) + '"/><stop offset="1" stop-color="' + (o.droiteCoul || C.chaud) + '"/>' +
      '</linearGradient></defs>' +
      '<rect x="52" y="52" width="216" height="96" rx="18" fill="none" stroke="url(#aiTuyau)" stroke-width="9"/>' +
      gouttes +
      '<g class="ai-pulse-froid"><rect x="4" y="66" width="46" height="68" rx="10" fill="' + (o.gaucheCoul || C.froid) + '" opacity="0.22" stroke="' + (o.gaucheCoul || C.froid) + '" stroke-width="2"/></g>' +
      '<g class="ai-pulse-chaud"><rect x="270" y="66" width="46" height="68" rx="10" fill="' + (o.droiteCoul || C.chaud) + '" opacity="0.22" stroke="' + (o.droiteCoul || C.chaud) + '" stroke-width="2"/></g>' +
      '<text x="4" y="22" class="ai-lbl">' + esc(o.gauche || 'froid') + '</text>' +
      '<text x="316" y="22" class="ai-lbl" text-anchor="end">' + esc(o.droite || 'chaud') + '</text>' +
      '<text x="160" y="174" class="ai-lbl-c">' + esc(o.haut || 'le fluide transporte la chaleur') + '</text>' +
      '<text x="160" y="192" class="ai-lbl-c">' + esc(o.bas || 'la pompe le fait tourner sans fin') + '</text>' +
      '</svg>';
  }

  /* ── 5. Poulie et contrepoids (ascenseur) ─────────────────────────
     Le contrepoids monte exactement autant que la cabine descend :
     le moteur ne soulève que la DIFFÉRENCE. */
  function poulie() {
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="Ascenseur à câbles et contrepoids">' +
      '<circle cx="160" cy="30" r="20" fill="none" stroke="' + C.metalD + '" stroke-width="6"/>' +
      '<g class="ai-poulie"><path d="M160 12 V48 M142 30 H178" stroke="' + C.metalL + '" stroke-width="4"/></g>' +
      '<path d="M124 30 V170 M196 30 V170" stroke="' + C.metal + '" stroke-width="2"/>' +
      '<g class="ai-cabine"><rect x="84" y="60" width="80" height="56" rx="6" fill="' + C.sombre + '" stroke="' + C.vert + '" stroke-width="3"/>' +
      '<circle cx="124" cy="80" r="9" fill="' + C.vert + '" opacity=".7"/>' +
      '<rect x="116" y="92" width="16" height="18" rx="3" fill="' + C.vert + '" opacity=".5"/></g>' +
      '<g class="ai-contrepoids"><rect x="181" y="118" width="30" height="46" rx="5" fill="' + C.metalD + '" stroke="' + C.metalL + '" stroke-width="2"/></g>' +
      '<text x="24" y="70" class="ai-lbl">cabine</text>' +
      '<text x="224" y="146" class="ai-lbl">contrepoids</text>' +
      '<text x="160" y="192" class="ai-lbl-c">l\'un monte pendant que l\'autre descend</text>' +
      '</svg>';
  }

  /* ── 6. Engrenages et chaîne (vélo) ───────────────────────────────
     Le petit pignon tourne plus vite que le grand plateau : c'est tout
     le principe du braquet. */
  function engrenage() {
    function roue(cx, cy, r, dents, coul) {
      var d = '';
      for (var i = 0; i < dents; i++) {
        var a = i * 360 / dents;
        d += '<rect x="' + (cx - 3) + '" y="' + (cy - r - 7) + '" width="6" height="9" rx="1.5" fill="' + coul + '" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')"/>';
      }
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + coul + '" stroke-width="5"/>' + d;
    }
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="Pédalier, chaîne et pignon">' +
      '<path d="M92 66 H236 M92 134 H236" stroke="' + C.metalD + '" stroke-width="5" stroke-dasharray="8 6" class="ai-chaine"/>' +
      '<g class="ai-roue-lente">' + roue(92, 100, 40, 16, C.metalL) + '</g>' +
      '<g class="ai-roue-vite">' + roue(236, 100, 22, 9, C.chaud) + '</g>' +
      '<circle cx="92" cy="100" r="6" fill="' + C.metalD + '"/><circle cx="236" cy="100" r="5" fill="' + C.metalD + '"/>' +
      '<text x="92" y="176" class="ai-lbl-c">grand plateau · 1 tour</text>' +
      '<text x="236" y="176" class="ai-lbl-c">petit pignon · 2 tours</text>' +
      '<text x="160" y="26" class="ai-lbl-c">un coup de pédale = deux tours de roue</text>' +
      '</svg>';
  }

  /* ── 7. Ondes (four à micro-ondes) ────────────────────────────────
     Ce ne sont PAS les ondes qui chauffent : ce sont les molécules d'eau
     qu'elles font tourner, et qui frottent entre elles. */
  function ondes() {
    var arcs = '';
    for (var i = 0; i < 3; i++) {
      arcs += '<path class="ai-onde" style="animation-delay:' + (i * 0.6) + 's" d="M64 100 q22 -30 44 0 q22 30 44 0 q22 -30 44 0" fill="none" stroke="' + C.elec + '" stroke-width="4" stroke-linecap="round"/>';
    }
    var molecules = '';
    var pos = [[214, 62], [252, 92], [220, 126], [258, 146], [196, 100]];
    for (var k = 0; k < pos.length; k++) {
      molecules += '<g transform="translate(' + pos[k][0] + ' ' + pos[k][1] + ')">' +
        '<g class="ai-molecule" style="animation-delay:' + (k * 0.18) + 's">' +
        '<circle r="9" fill="' + C.eau + '"/>' +
        '<circle cx="-9" cy="-8" r="5" fill="' + C.metalL + '"/><circle cx="9" cy="-8" r="5" fill="' + C.metalL + '"/>' +
        '</g></g>';
    }
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="Micro-ondes et molécules d\'eau">' +
      '<rect x="12" y="60" width="44" height="80" rx="6" fill="' + C.sombre + '" stroke="' + C.metal + '" stroke-width="3"/>' +
      '<text x="34" y="52" class="ai-lbl-c">magnétron</text>' +
      arcs + molecules +
      '<text x="230" y="180" class="ai-lbl-c">les molécules d\'eau tournent et frottent</text>' +
      '<text x="230" y="34" class="ai-lbl-c">→ c\'est le frottement qui chauffe</text>' +
      '</svg>';
  }

  /* ── 8. Goupilles (serrure) ───────────────────────────────────────
     La bonne clé n'est pas celle qui « rentre » : c'est celle dont les
     creux alignent toutes les goupilles sur la même ligne. */
  function goupilles() {
    var g = '', hauteurs = [26, 14, 34, 20, 30];
    for (var i = 0; i < 5; i++) {
      var x = 84 + i * 34;
      g += '<g class="ai-goupille" style="--h:' + hauteurs[i] + 'px;animation-delay:' + (i * 0.12) + 's">' +
        '<rect x="' + x + '" y="' + (44 - hauteurs[i]) + '" width="14" height="' + (34 + hauteurs[i]) + '" rx="4" fill="' + C.chaud + '"/>' +
        '<rect x="' + x + '" y="78" width="14" height="30" rx="4" fill="' + C.metalL + '"/></g>';
    }
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="Serrure à goupilles">' +
      '<rect x="66" y="16" width="204" height="64" rx="6" fill="' + C.sombre + '" stroke="' + C.metal + '" stroke-width="3"/>' +
      g +
      '<path d="M66 108 H270" stroke="' + C.vert + '" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<text x="270" y="126" class="ai-lbl" text-anchor="end">ligne de césure</text>' +
      '<g class="ai-cle"><path d="M10 116 h130 v18 h-14 v-9 h-12 v9 h-12 v-9 h-12 v9 H10 Z" fill="' + C.elec + '"/>' +
      '<circle cx="4" cy="125" r="16" fill="none" stroke="' + C.elec + '" stroke-width="7"/></g>' +
      '<text x="160" y="188" class="ai-lbl-c">les creux de la clé alignent toutes les goupilles</text>' +
      '</svg>';
  }

  /* ── 9. Réservoir à flotteur (chasse d'eau) ───────────────────────
     Le flotteur descend avec l'eau, puis ROUVRE l'arrivée tout seul :
     personne ne surveille le remplissage. */
  function reservoir() {
    return '<svg viewBox="0 0 320 200" class="ai-svg" aria-label="Chasse d\'eau : vidage et remplissage">' +
      '<rect x="60" y="26" width="200" height="126" rx="8" fill="none" stroke="' + C.metal + '" stroke-width="4"/>' +
      '<g class="ai-eau"><rect x="64" y="46" width="192" height="102" rx="5" fill="' + C.eau + '" opacity="0.45"/></g>' +
      '<g class="ai-flotteur"><circle cx="104" cy="56" r="16" fill="' + C.chaud + '"/>' +
      '<path d="M120 56 H186" stroke="' + C.metalL + '" stroke-width="5"/></g>' +
      '<g class="ai-clapet"><rect x="146" y="140" width="34" height="10" rx="4" fill="' + C.vert + '"/></g>' +
      '<path d="M156 152 v34" stroke="' + C.eau + '" stroke-width="8" class="ai-jet"/>' +
      '<text x="104" y="20" class="ai-lbl-c">flotteur</text>' +
      '<text x="272" y="146" class="ai-lbl">clapet</text>' +
      '<text x="160" y="196" class="ai-lbl-c">l\'eau part, le flotteur descend, l\'arrivée se rouvre</text>' +
      '</svg>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Quelle machine utilise quel mécanisme ───────────────────────── */
  var MAP = {
    'moteur-essence': { f: piston, legende: 'Regarde : sur les quatre temps, un seul pousse le piston vers le bas. Les trois autres sont « portés » par l\'élan du vilebrequin.' },
    'chasse-eau': { f: reservoir, legende: 'Le flotteur est un interrupteur mécanique : il descend avec l\'eau, ce qui rouvre l\'arrivée, et remonte avec elle, ce qui la referme.' },
    'chauffage': { f: fluide, o: { gauche: 'chaudière', droite: 'radiateur', gaucheCoul: C.chaud, droiteCoul: C.chaud, haut: 'l\'eau chaude fait le tour de la maison', bas: 'elle revient tiède, la chaudière la réchauffe', alt: 'Circuit d\'eau chaude du chauffage central' }, legende: 'La même eau tourne en boucle depuis des années : elle ne fait que transporter la chaleur d\'un endroit à un autre.' },
    'pompe': { f: rotor, o: { pales: 6, couleur: C.eau, flux: C.eau, entree: 'eau aspirée', sortie: 'eau projetée', sortie2: 'vers le tuyau', vitesse: 1.2, alt: 'Roue d\'une pompe centrifuge' }, legende: 'La roue ne « pousse » pas l\'eau : elle la fait tourner très vite, et c\'est la force centrifuge qui l\'envoie vers la sortie.' },
    'tableau-electrique': { f: circuit, o: { source: 'compteur', recepteur: 'prises', couleur: C.vert, haut: 'le disjoncteur surveille le courant', bas: 'trop de courant → il coupe la boucle', alt: 'Boucle électrique protégée par un disjoncteur' }, legende: 'Couper la boucle en un seul point suffit à tout arrêter : c\'est ce que fait le disjoncteur en un centième de seconde.' },
    'frigo': { f: fluide, o: { gauche: 'intérieur', droite: 'grille arrière', gaucheCoul: C.froid, droiteCoul: C.chaud, haut: 'le fluide prend la chaleur DEDANS', bas: 'et la rejette DEHORS', alt: 'Circuit frigorifique' }, legende: 'Un frigo ne fabrique pas de froid : il déplace la chaleur de l\'intérieur vers l\'extérieur. Touche la grille à l\'arrière, elle est tiède.' },
    'micro-ondes': { f: ondes, legende: 'Les ondes ne chauffent pas l\'assiette : elles secouent les molécules d\'eau de l\'aliment, et ce sont leurs frottements qui produisent la chaleur.' },
    'led': { f: circuit, o: { source: 'courant', recepteur: 'LED', couleur: '#a5b4fc', haut: 'les électrons traversent un cristal', bas: 'chaque passage libère un grain de lumière', alt: 'Circuit d\'une ampoule LED' }, legende: 'La LED ne chauffe presque pas : l\'électricité devient directement de la lumière, au lieu de passer par la chaleur.' },
    'velo': { f: engrenage, legende: 'Changer de vitesse, c\'est changer la taille du pignon : petit pignon = tu tournes plus vite mais tu pousses plus fort.' },
    'ascenseur': { f: poulie, legende: 'Sans contrepoids, il faudrait soulever toute la cabine. Avec, le moteur ne soulève que la différence : bien moins d\'énergie.' },
    'eolienne': { f: rotor, o: { pales: 3, couleur: C.metalL, flux: '#cbd5e1', entree: 'vent', sortie: 'rotation', sortie2: '→ électricité', vitesse: 4, alt: 'Rotor d\'éolienne' }, legende: 'Les pales sont vrillées comme une aile d\'avion : le vent ne les pousse pas, il les ASPIRE vers l\'avant.' },
    'solaire': { f: circuit, o: { source: 'panneau', recepteur: 'maison', couleur: C.elec, haut: 'la lumière arrache des électrons au silicium', bas: 'les électrons arrachés forment le courant', alt: 'Circuit d\'un panneau solaire' }, legende: 'Aucune pièce ne bouge dans un panneau solaire. C\'est pour ça qu\'il dure trente ans sans entretien.' },
    'barrage': { f: rotor, o: { pales: 8, couleur: C.eau, flux: C.eau, entree: 'eau qui tombe', sortie: 'turbine', sortie2: '→ électricité', vitesse: 1.5, alt: 'Turbine de barrage' }, legende: 'Plus le barrage est haut, plus l\'eau tombe vite, et plus la turbine tourne fort. La hauteur compte autant que le débit.' },
    'cafetiere': { f: fluide, o: { gauche: 'réservoir', droite: 'filtre', gaucheCoul: C.froid, droiteCoul: C.chaud, haut: 'l\'eau chauffée devient vapeur et MONTE', bas: 'elle retombe sur le café', alt: 'Circuit d\'une cafetière filtre' }, legende: 'Il n\'y a aucune pompe dans une cafetière : c\'est la vapeur qui pousse l\'eau vers le haut, toute seule.' },
    'lave-linge': { f: rotor, o: { pales: 3, couleur: C.eau, flux: C.eau, entree: 'eau + lessive', sortie: 'tambour', sortie2: 'essorage : 1000 tours/min', vitesse: 2, alt: 'Tambour de lave-linge' }, legende: 'À l\'essorage, le tambour tourne si vite que l\'eau est plaquée contre les trous et s\'échappe : c\'est la même force qui te colle au siège dans un virage.' },
    'aspirateur': { f: rotor, o: { pales: 7, couleur: C.metalL, flux: '#cbd5e1', entree: 'air + poussière', sortie: 'turbine', sortie2: 'crée le vide', vitesse: 0.9, alt: 'Turbine d\'aspirateur' }, legende: 'L\'aspirateur n\'aspire pas : il chasse l\'air vers l\'arrière. C\'est la pression de la pièce qui pousse l\'air — et la poussière — dans le tuyau.' },
    'ampoule-filament': { f: circuit, o: { source: 'courant', recepteur: 'filament', couleur: C.chaud, haut: 'les électrons bousculent les atomes du fil', bas: 'le fil chauffe à 2500 °C et devient blanc', alt: 'Circuit d\'une ampoule à filament' }, legende: 'Une ampoule à filament transforme 95 % de l\'électricité en chaleur et seulement 5 % en lumière. C\'est un radiateur qui éclaire un peu.' },
    'batterie': { f: circuit, o: { source: 'lithium', recepteur: 'téléphone', couleur: C.vert, haut: 'les ions lithium traversent la batterie', bas: 'en charge, ils font le chemin inverse', alt: 'Circuit d\'une batterie lithium-ion' }, legende: 'Rien ne se consomme dans une batterie : les mêmes atomes font l\'aller-retour. C\'est pour ça qu\'elle se recharge des milliers de fois.' },
    'serrure': { f: goupilles, legende: 'Une fausse clé entre sans problème. Ce qui bloque, c\'est qu\'elle ne met pas TOUTES les goupilles sur la ligne en même temps.' },
    'sonnette': { f: circuit, o: { source: 'bouton', recepteur: 'électroaimant', couleur: '#f472b6', haut: 'le courant aimante le fer', bas: 'le marteau frappe… et coupe le courant', alt: 'Circuit d\'une sonnette électromécanique' }, legende: 'La sonnette se coupe elle-même : en frappant, le marteau ouvre le circuit, l\'aimant lâche, le marteau revient — et ça recommence. D\'où le « driiing ».' }
  };

  /* ── API publique ─────────────────────────────────────────────────
     Renvoie '' si la machine n'a pas d'animation : la fiche reste
     parfaitement lisible sans. */
  window.animIngenieur = function (id) {
    var m = MAP[id];
    if (!m) return '';
    var svg = m.o ? m.f(m.o) : m.f();
    return '<div class="ai-bloc">' + svg +
      (m.legende ? '<p class="ai-legende">' + esc(m.legende) + '</p>' : '') + '</div>';
  };
})();
