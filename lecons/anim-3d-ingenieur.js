/* ════════ ROYAUME DE L'INGÉNIEUR : MACHINES EN 3D ════════
   Quatre machines phares (moteur à 4 temps, éolienne, vélo, barrage) en vraie 3D qu'on tourne au
   doigt et qu'on règle avec un curseur. Petit moteur 3D maison (faces ombrées, perspective, tri en
   profondeur) : aucune bibliothèque, tout marche hors connexion. Les autres machines gardent
   leur schéma animé 2D. Réduire les animations : l'image reste fixe. */
(function () {
  'use strict';
  var prev2d = window.animIngenieur;
  var REDUIT = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── géométrie ── */
  function rx(p, a) { var c = Math.cos(a), s = Math.sin(a); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; }
  function ry(p, a) { var c = Math.cos(a), s = Math.sin(a); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; }
  function rz(p, a) { var c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]]; }
  function mv(polys, f) { return polys.map(function (q) { return { pts: q.pts.map(f), col: q.col, al: q.al }; }); }
  function box(w, h, d, col, al) {
    var x = w / 2, y = h / 2, z = d / 2, P = [[-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z], [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]];
    return [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]].map(function (f) { return { pts: f.map(function (i) { return P[i]; }), col: col, al: al }; });
  }
  // Prisme dont l'axe est y (profil = liste de rayons par sommet, n sommets)
  function prism(radii, h, col, al, colTop) {
    var n = radii.length, T = [], B = [], out = [], i;
    for (i = 0; i < n; i++) { var a = i / n * 6.2832; T.push([Math.cos(a) * radii[i], h / 2, Math.sin(a) * radii[i]]); B.push([Math.cos(a) * radii[i], -h / 2, Math.sin(a) * radii[i]]); }
    out.push({ pts: T, col: colTop || col, al: al }); out.push({ pts: B.slice().reverse(), col: colTop || col, al: al });
    for (i = 0; i < n; i++) { var j = (i + 1) % n; out.push({ pts: [B[i], B[j], T[j], T[i]], col: col, al: al }); }
    return out;
  }
  function cyl(r, h, col, al, n) { var a = [], i; for (i = 0; i < (n || 18); i++) a.push(r); return prism(a, h, col, al); }
  function gear(r, teeth, td, h, col) { var a = [], i; for (i = 0; i < teeth * 4; i++) { var k = i % 4; a.push(k === 1 || k === 2 ? r + td : r); } return prism(a, h, col, 1); }
  // Poutre entre deux points
  function beam(p1, p2, t, col) {
    var dx = p2[0] - p1[0], dy = p2[1] - p1[1], dz = p2[2] - p1[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
    var b = box(t, L, t, col, 1), az = Math.atan2(dx, dy), ax = Math.asin(dz / L) ;
    var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2, mz = (p1[2] + p2[2]) / 2;
    return mv(b, function (p) { var q = rx(p, 0); q = rz(q, -az); return [q[0] + mx, q[1] + my, q[2] + mz]; });
  }
  function at(polys, x, y, z) { return mv(polys, function (p) { return [p[0] + x, p[1] + y, p[2] + z]; }); }
  function spin(polys, axis, a, cx, cy, cz) {
    var f = axis === 'x' ? rx : axis === 'y' ? ry : rz;
    return mv(polys, function (p) { var q = f(p, a); return [q[0] + cx, q[1] + cy, q[2] + cz]; });
  }

  /* ── scènes ── */
  var METAL = [150, 165, 185], METALD = [95, 110, 130], ROUGE = [220, 80, 70], OR = [250, 190, 60], BLEU = [90, 170, 255], VERT = [90, 200, 130], GRIS = [120, 130, 145];

  var PHASES = [
    ['1. Admission', 'Le piston descend et aspire l\'air mélangé à l\'essence.', [120, 190, 255]],
    ['2. Compression', 'Le piston remonte et écrase le mélange : il devient très chaud.', [255, 215, 90]],
    ['3. Explosion', 'L\'étincelle enflamme le mélange : c\'est LE temps qui pousse le piston.', [255, 110, 40]],
    ['4. Échappement', 'Le piston remonte et chasse les gaz brûlés par le pot d\'échappement.', [150, 150, 160]]
  ];
  var moteur = {
    ctrl: { label: 'Vitesse du moteur', min: 1, max: 10, val: 3, fmt: function (v) { return v + ' tr/s ÷ 3'; } },
    state: { th: 0 },
    step: function (S, dt, v) { S.th += dt * v * 1.1; },
    build: function (S) {
      var th = S.th, tot = th % (4 * Math.PI), ph = Math.floor(tot / Math.PI), a = tot % (2 * Math.PI);
      var R = .95, L = 2.9, cy = -2.4, th2 = th % (2 * Math.PI);
      var py = cy + R * Math.cos(th2) + Math.sqrt(L * L - Math.pow(R * Math.sin(th2), 2));
      var pol = [];
      pol = pol.concat(at(cyl(1.35, 4.9, GRIS, .16, 22), 0, .4, 0));
      pol = pol.concat(at(cyl(1.4, .3, METALD, 1, 22), 0, 3.0, 0));
      var haut = 3.0 - (py + .45);
      if (haut > .05) pol = pol.concat(at(cyl(1.25, haut, PHASES[ph][2], .5, 22), 0, py + .45 + haut / 2, 0));
      pol = pol.concat(at(cyl(1.25, .8, METAL, 1, 22), 0, py, 0));
      var pin = [R * Math.sin(th2), cy + R * Math.cos(th2), 0];
      pol = pol.concat(beam([0, py - .1, 0], pin, .28, [190, 195, 205]));
      pol = pol.concat(spin(at(cyl(1.5, .35, METALD, 1, 24), 0, 0, 0), 'x', Math.PI / 2, 0, cy, 0));
      pol = pol.concat(at(box(.35, .35, .6, ROUGE, 1), pin[0], pin[1], 0));
      // contrepoids du vilebrequin
      pol = pol.concat(at(box(.7, .6, .35, METALD, 1), -pin[0] * 1.0, cy - R * Math.cos(th2) * 1.0, 0));
      // soupapes
      var vi = ph === 0 ? .35 : 0, ve = ph === 3 ? .35 : 0;
      pol = pol.concat(at(cyl(.22, .8, [90, 200, 255], 1, 10), -.6, 3.45 - vi, 0));
      pol = pol.concat(at(cyl(.22, .8, [255, 150, 100], 1, 10), .6, 3.45 - ve, 0));
      // bougie + étincelle
      pol = pol.concat(at(cyl(.12, .7, [230, 230, 240], 1, 8), 0, 3.5, 0));
      if (ph === 2 && a - 2 * Math.PI * 0 < 1.2 && ((tot - 2 * Math.PI) < .9)) pol = pol.concat(at(box(.2, .5, .2, [255, 255, 160], 1), 0, 2.75, 0));
      return { polys: pol, info: PHASES[ph][0], texte: PHASES[ph][1], cam: [.55, .22, 12.5, .4] };
    }
  };

  var eolienne = {
    ctrl: { label: 'Vitesse du vent', min: 2, max: 25, val: 10, fmt: function (v) { return v + ' m/s (' + Math.round(v * 3.6) + ' km/h)'; } },
    state: { a: 0 },
    step: function (S, dt, v) { S.a += dt * v * .16; },
    build: function (S, v) {
      var pol = [];
      var tour = mv(prism([.5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5], 6, [225, 230, 238], 1), function (p) { var k = (p[1] + 3) / 6; return [p[0] * (1 - .35 * k) , p[1] - 1, p[2] * (1 - .35 * k)]; });
      pol = pol.concat(tour);
      pol = pol.concat(at(box(.9, .8, 2.2, [215, 222, 232], 1), 0, 2.4, -.2));
      pol = pol.concat(at(spin(cyl(.5, .7, ROUGE, 1, 14), 'x', Math.PI / 2, 0, 0, 0), 0, 2.4, 1.1));
      for (var b = 0; b < 3; b++) {
        var ang = S.a + b * Math.PI * 2 / 3;
        var blade = [{ pts: [[-.1, .5, 0], [.28, .5, 0], [.14, 4.2, 0], [-.05, 4.2, 0]], col: [235, 238, 245], al: 1 }, { pts: [[-.1, .5, .05], [.28, .5, .05], [.14, 4.2, .05], [-.05, 4.2, .05]], col: [200, 205, 215], al: 1 }];
        blade = mv(blade, function (p) { var q = ry(p, 0); var tw = rx([0, p[1], 0], 0); return [p[0], p[1], p[2] + (p[1] - .5) * .04]; });
        pol = pol.concat(mv(blade, function (p) { var q = rz(p, ang); return [q[0], q[1] + 2.4, q[2] + 1.45]; }));
      }
      // vent : traits qui défilent vers l'éolienne
      var t = S.a * 3;
      for (var i = 0; i < 14; i++) {
        var yy = -1 + ((i * 37) % 11) * .55, xx = -4 + ((i * 53) % 9) * 1.0, zz = (-6 + ((t + i * 1.7) % 9)) * 1.0;
        pol = pol.concat(at(box(.06, .06, .8, [190, 215, 255], .6), xx * .8, yy + 1.5, zz - 1));
      }
      var kw = Math.min(3000, Math.round(.0008 * v * v * v * 1000));
      return { polys: pol, info: 'Puissance : ' + kw + ' kW', texte: 'Le vent pousse les pales, le rotor tourne, la génératrice fabrique de l\'électricité. Double la vitesse du vent : la puissance est multipliée par 8 (v × v × v).', cam: [.6, .1, 19, 0] };
    }
  };

  var velo = {
    ctrl: { label: 'Pignon arrière', min: 0, max: 2, val: 1, step: 1, fmt: function (v) { return [11, 16, 24][v] + ' dents'; } },
    state: { a: 0, r2: .6 },
    step: function (S, dt, v) { S.a += dt * 1.2; var cible = [.41, .6, .9][v]; S.r2 += (cible - S.r2) * Math.min(1, dt * 6); },
    build: function (S, v) {
      var T1 = 44, T2 = [11, 16, 24][v], r1 = 1.65, r2 = S.r2, c1 = [-2.2, 0], c2 = [2.2, 0];
      var pol = [];
      var a1 = S.a, a2 = S.a * T1 / T2;
      // le prisme est autour de y : on le couche pour que l'axe soit z, puis on le fait tourner
      function roue(r, t, a, c, col) { var g = gear(r, Math.max(6, t / 2), .12, .22, col); g = mv(g, function (p) { return rx(p, Math.PI / 2); }); g = mv(g, function (p) { return rz(p, a); }); return at(g, c[0], c[1], 0); }
      pol = pol.concat(roue(r1, T1, a1, c1, METAL));
      pol = pol.concat(roue(r2, T2, a2, c2, OR));
      // roue arrière (disque + rayons) qui tourne avec le pignon
      var rr = 3.0, roueArr = mv(cyl(rr, .1, [60, 70, 90], .35, 36), function (p) { return rz(rx(p, Math.PI / 2), a2); });
      pol = pol.concat(at(roueArr, c2[0], c2[1], -.5));
      for (var s = 0; s < 8; s++) { var sa = a2 + s * Math.PI / 4; pol = pol.concat(beam([c2[0], c2[1], -.5], [c2[0] + Math.cos(sa) * rr * .96, c2[1] + Math.sin(sa) * rr * .96, -.5], .06, [190, 200, 215])); }
      // manivelle + pédale
      pol = pol.concat(beam([c1[0], c1[1], .3], [c1[0] + Math.cos(a1 - 1.2) * 2.2, c1[1] + Math.sin(a1 - 1.2) * 2.2, .3], .22, ROUGE));
      var pe = [c1[0] + Math.cos(a1 - 1.2) * 2.2, c1[1] + Math.sin(a1 - 1.2) * 2.2, .3];
      pol = pol.concat(at(box(.7, .12, .45, [40, 45, 60], 1), pe[0], pe[1], .55));
      // chaîne
      var d = c2[0] - c1[0], s = (r1 - r2) / d, cs = Math.sqrt(1 - s * s);
      var u1 = [c1[0] + r1 * s, c1[1] + r1 * cs], u2 = [c2[0] + r2 * s, c2[1] + r2 * cs], l1 = [c1[0] + r1 * s, c1[1] - r1 * cs], l2 = [c2[0] + r2 * s, c2[1] - r2 * cs];
      var path = [];
      function seg(p, q) { var n = Math.max(2, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / .12)); for (var i = 0; i < n; i++) path.push([p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]); }
      function arc(c, r, a0, a1_) { var n = Math.max(3, Math.round(Math.abs(a1_ - a0) * r / .12)); for (var i = 0; i < n; i++) { var aa = a0 + (a1_ - a0) * i / n; path.push([c[0] + Math.cos(aa) * r, c[1] + Math.sin(aa) * r]); } }
      var angU = Math.atan2(cs, s), angL = Math.atan2(-cs, s);
      seg(u1, u2); arc(c2, r2, angU, angL - 0 + 0 > angU ? angL : angL); seg(l2, l1); arc(c1, r1, angL + 0, angU + 2 * Math.PI * 0 - 0);
      var N = path.length, off = Math.floor((S.a * 3) * 4) % 2;
      for (var k = 0; k < N; k += 2) {
        var q = path[(k + off) % N]; pol = pol.concat(at(box(.1, .1, .16, [60, 65, 75], 1), q[0], q[1], .1));
      }
      var ratio = (T1 / T2).toFixed(1).replace('.', ',');
      return { polys: pol, info: '1 tour de pédale = ' + ratio + ' tours de roue', texte: 'Petit pignon : la roue tourne plus vite mais tu pousses plus fort (vitesse de plaine). Grand pignon : moins vite, moins d\'effort (montée).', cam: [.2, .12, 13.5, 0] };
    }
  };

  var barrage = {
    ctrl: { label: 'Ouverture de la vanne', min: 0, max: 100, val: 60, fmt: function (v) { return v + ' %'; } },
    state: { a: 0, t: 0 },
    step: function (S, dt, v) { S.a += dt * v * .06; S.t += dt * v * .03; },
    build: function (S, v) {
      var pol = [], f = v / 100;
      pol = pol.concat(at(box(1.8, 6, 6, [170, 175, 185], 1), 0, 0, 0));
      pol = pol.concat(at(box(6, 4.2, 6, BLEU, .35), -3.9, -.3, 0));
      pol = pol.concat(at(box(6, .6, 6, [60, 120, 200], .5), 4.4, -2.7, 0));
      pol = pol.concat(at(box(6, .5, 6.4, [90, 110, 90], 1), 4.4, -3.2, 0));
      pol = pol.concat(at(mv(cyl(.5, 4.6, METALD, .9, 14), function (p) { return rz(p, Math.PI / 2); }), 1.1, -1.9, 0));
      // gouttes dans la conduite
      for (var i = 0; i < 10; i++) { var px = -1.1 + ((S.t * 3 + i * .46) % 4.4); pol = pol.concat(at(box(.25, .25, .25, [190, 225, 255], .9), px + 1.0, -1.9, 0)); }
      pol = pol.concat(at(cyl(1.3, 1.1, METALD, .5, 20), 3.3, -1.9, 0));
      for (var b2 = 0; b2 < 8; b2++) { var an = S.a + b2 * Math.PI / 4; pol = pol.concat(mv(box(.9, .8, .08, [110, 220, 255], 1), function (p) { var q = ry(p, 0); q = [q[0] + .65, q[1], q[2]]; q = ry(q, an); return [q[0] + 3.3, q[1] - 1.9, q[2]]; })); }
      pol = pol.concat(at(cyl(.12, 2.6, [210, 215, 225], 1, 8), 3.3, -.2, 0));
      pol = pol.concat(at(cyl(.8, 1.1, ROUGE, 1, 16), 3.3, 1.5, 0));
      var glow = Math.round(60 + 195 * f);
      pol = pol.concat(at(box(.5, .5, .5, [255, glow, 70], 1), 3.3, 2.5, 0));
      var mw = Math.round(f * f * 120);
      return { polys: pol, info: 'Puissance : ' + mw + ' MW (indicatif)', texte: 'L\'eau du lac tombe dans la conduite, pousse la turbine qui entraîne l\'alternateur. Plus la vanne est ouverte, plus l\'eau pousse fort, plus il y a d\'électricité.', cam: [.3, .25, 25, 0] };
    }
  };
  var SCENES = { 'moteur-essence': moteur, 'eolienne': eolienne, 'velo': velo, 'barrage': barrage };

  /* ── rendu ── */
  var active = null;
  function init(cv) {
    var id = cv.getAttribute('data-m3d'), sc = SCENES[id]; if (!sc) return;
    var cx = cv.getContext('2d'), W = 320, H = 360, DPR = 1;
    var S = JSON.parse(JSON.stringify(sc.state)), val = sc.ctrl.val;
    var yaw = null, pitch = null, drag = null, user = false, last = 0, stopped = false;
    var wrap = cv.parentNode, slider = wrap.querySelector('input'), lab = wrap.querySelector('.m3d-val');
    function setVal(v) { val = v; lab.textContent = sc.ctrl.fmt(v); }
    setVal(val); slider.addEventListener('input', function () { setVal(+slider.value); });
    function size() { DPR = Math.min(window.devicePixelRatio || 1, 2); W = Math.max(260, wrap.clientWidth); H = Math.round(Math.min(460, W * .95)); cv.width = W * DPR; cv.height = H * DPR; cv.style.height = H + 'px'; }
    size(); window.addEventListener('resize', size);
    cv.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY }; user = true; try { cv.setPointerCapture(e.pointerId); } catch (_) { } });
    cv.addEventListener('pointermove', function (e) { if (!drag) return; yaw += (e.clientX - drag.x) * .012; pitch = Math.max(-.2, Math.min(1.1, pitch + (e.clientY - drag.y) * .006)); drag = { x: e.clientX, y: e.clientY }; });
    ['pointerup', 'pointercancel'].forEach(function (n) { cv.addEventListener(n, function () { drag = null; }); });
    function frame(t) {
      if (stopped || !document.body.contains(cv)) { window.removeEventListener('resize', size); return; }
      var dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
      if (!document.hidden && !REDUIT) sc.step(S, dt, val);
      var B = sc.build(S, val), cam = B.cam;
      if (yaw === null) { yaw = cam[0]; pitch = cam[1]; }
      var y0 = user ? yaw : cam[0] + Math.sin(t / 3800) * .35, D = cam[2];
      var cy = Math.cos(y0), sy = Math.sin(y0), cp = Math.cos(pitch), sp = Math.sin(pitch), f = H * 1.1;
      var faces = [];
      B.polys.forEach(function (q) {
        var P = q.pts.map(function (p) { var a = [p[0] * cy + p[2] * sy, p[1], -p[0] * sy + p[2] * cy]; var b = [a[0], a[1] * cp - a[2] * sp, a[1] * sp + a[2] * cp]; return [b[0], b[1] - cam[3], b[2]]; });
        var z = 0, i; for (i = 0; i < P.length; i++) z += P[i][2]; z /= P.length;
        var u = [P[1][0] - P[0][0], P[1][1] - P[0][1], P[1][2] - P[0][2]], w = [P[2][0] - P[0][0], P[2][1] - P[0][1], P[2][2] - P[0][2]];
        var n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], nl = Math.hypot(n[0], n[1], n[2]) || 1;
        var lum = .42 + .58 * Math.abs((n[0] * .35 + n[1] * .75 - n[2] * .55) / nl);
        faces.push({ P: P, z: z, lum: lum, q: q });
      });
      faces.sort(function (a, b) { return b.z - a.z; });
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var bg = cx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0d1424'); bg.addColorStop(1, '#1a2540'); cx.fillStyle = bg; cx.fillRect(0, 0, W, H);
      faces.forEach(function (fc) {
        cx.beginPath();
        for (var i = 0; i < fc.P.length; i++) { var p = fc.P[i], s = f / (D + p[2]), X = W / 2 + p[0] * s, Y = H * .52 - p[1] * s; if (i) cx.lineTo(X, Y); else cx.moveTo(X, Y); }
        cx.closePath(); var c = fc.q.col, l = fc.lum;
        cx.globalAlpha = fc.q.al == null ? 1 : fc.q.al; cx.fillStyle = 'rgb(' + Math.round(c[0] * l) + ',' + Math.round(c[1] * l) + ',' + Math.round(c[2] * l) + ')'; cx.fill();
        if (cx.globalAlpha > .7) { cx.strokeStyle = 'rgba(0,0,0,.18)'; cx.lineWidth = .6; cx.stroke(); }
      });
      cx.globalAlpha = 1; cx.fillStyle = '#ffd27a'; cx.font = 'bold 15px Trebuchet MS'; cx.textAlign = 'center'; cx.fillText(B.info, W / 2, 24); cx.textAlign = 'start';
      wrap.querySelector('.m3d-txt').textContent = B.texte;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function html(id) {
    var c = SCENES[id].ctrl;
    return '<div class="m3d-wrap" style="margin:6px 0 14px"><canvas data-m3d="' + id + '" style="width:100%;display:block;border-radius:12px;touch-action:pan-y;cursor:grab" aria-label="Machine en 3D, glisse pour tourner"></canvas>' +
      '<p style="font-size:13px;color:#9fb3d9;text-align:center;margin:8px 0 4px">Glisse le doigt sur la machine pour la tourner.</p>' +
      '<label style="display:flex;justify-content:space-between;font-weight:700;font-size:14px;margin:6px 0 4px"><span>' + c.label + '</span><span class="m3d-val" style="color:#fdba74"></span></label>' +
      '<input type="range" min="' + c.min + '" max="' + c.max + '" value="' + c.val + '" step="' + (c.step || 1) + '" style="width:100%;accent-color:#fb923c">' +
      '<p class="m3d-txt" style="font-size:14px;line-height:1.6;margin-top:10px;color:#e2e8f0"></p></div>';
  }
  window.animIngenieur = function (id) {
    var old = prev2d ? prev2d(id) : '';
    if (!SCENES[id]) return old;
    setTimeout(function () { var cv = document.querySelector('canvas[data-m3d="' + id + '"]'); if (cv) init(cv); }, 0);
    return html(id) + (old ? '<p style="font-size:13px;color:#9fb3d9;margin:4px 0 6px">Et le schéma animé :</p>' + old : '');
  };
})();
