/* Atlas du corps humain en 3D.
   Données : BodyParts3D 4.0 (© The Database Center for Life Science, CC BY 4.0), adulte homme, adaptées
   (simplifiées, quantifiées, regroupées par système) d'après le projet open source Human Atlas (MIT).
   Moteur : three.js (MIT). Chaque système se télécharge à la demande puis reste en cache (hors connexion). */
import * as THREE from './atlas/three.module.min.js';

const BASE = new URL('./atlas/', import.meta.url).href;
const GROUPS = [
  { id: 'squelette', label: '🦴 Squelette', mo: 2.2, color: '#e6dcbc', on: true },
  { id: 'organes', label: '🫀 Organes', mo: 1.6, color: '#c9776d', on: true },
  { id: 'nerveux', label: '🧠 Nerfs et cerveau', mo: 1.8, color: '#d8b565', on: false },
  { id: 'muscles', label: '💪 Muscles', mo: 5.0, color: '#a85b50', on: false },
  { id: 'vaisseaux', label: '🩸 Vaisseaux', mo: 2.9, color: '#c05245', on: false },
  { id: 'peau', label: '🖐️ Peau', mo: 0.3, color: '#d7b79c', on: false }
];
const SYS_COLOR = { skeletal: '#e6dcbc', cardiac: '#d0504f', respiratory: '#e59aa6', digestive: '#c9966a', urinary: '#c47a5c', endocrine: '#d9a8a0',
  nervous: '#e2c36e', sensory: '#b9d2d8', muscular: '#b4604f', arterial: '#d1453a', venous: '#4f7fb0', integumentary: '#d7b79c' };
const SYS_FR = { skeletal: 'Squelette', cardiac: 'Cœur', respiratory: 'Système respiratoire', digestive: 'Système digestif', urinary: 'Système urinaire', endocrine: 'Glandes',
  nervous: 'Système nerveux', sensory: 'Organes des sens', muscular: 'Muscles', arterial: 'Artères', venous: 'Veines', integumentary: 'Peau' };
const KEYS = [[/stomach/i, 'Estomac'], [/liver|hepatic/i, 'Foie'], [/gallbladder/i, 'Vésicule biliaire'], [/pancreas/i, 'Pancréas'], [/kidney/i, 'Rein'], [/ureter/i, 'Uretère'], [/bladder/i, 'Vessie'],
  [/lung|bronch|trachea/i, 'Poumons et voies respiratoires'], [/ventric|atrium|valve|cusp|leaflet|heart/i, 'Cœur'], [/aorta|artery/i, 'Artère'], [/vein|vena/i, 'Veine'],
  [/jejunum|ileum|duodenum|colon|cecum|rectum|appendix|intestin/i, 'Intestin'], [/esophag/i, 'Œsophage'], [/spleen/i, 'Rate'], [/thyroid/i, 'Glande thyroïde'], [/adrenal/i, 'Glande surrénale'],
  [/cerebell/i, 'Cervelet'], [/brain|cerebr|cortex|thalam|hippocamp|midbrain|medulla|pons|forebrain|ventricle of/i, 'Cerveau'], [/spinal cord/i, 'Moelle épinière'], [/nerve|ganglion/i, 'Nerf'],
  [/eyeball|retina|cornea|lens|iris|sclera|choroid|vitreous/i, 'Œil'], [/ear|cochlea|tympanic|ossicle|stapes|incus|malleus/i, 'Oreille'],
  [/skull|cranium|frontal bone|parietal|occipital|temporal bone|sphenoid|mandible|maxilla|zygomatic/i, 'Crâne et mâchoire'], [/vertebra|sacrum|coccyx|intervertebral/i, 'Colonne vertébrale'],
  [/rib|sternum|costal/i, 'Cage thoracique'], [/femur|tibia|fibula|patella|calcan|talus|tars|metatars|phalan/i, 'Jambe et pied'], [/humerus|radius|ulna|scapula|clavicle|carpal/i, 'Bras et épaule'], [/hip bone|ilium|pelvi/i, 'Bassin'],
  [/muscle|major|minor|brachii|femoris|abdominis|trapezius|deltoid|gluteus|biceps|triceps|gastrocnemius|soleus|tendon/i, 'Muscle'], [/skin/i, 'Peau'], [/hair|eyebrow/i, 'Poils et cheveux'], [/lip/i, 'Lèvre']];
function frKey(n) { for (const [re, f] of KEYS) if (re.test(n)) return f; return ''; }
const FOCUS = [ /* index = organe de la liste ORGANS de corps-humain.html */
  { g: ['nerveux', 'organes'], f: p => /^(Left |Right )?(cerebral|brain|cerebr|forebrain|midbrain|cerebell|medulla)|brain|cerebr|cerebell|cortex/i.test(p.n) && p.s === 'nervous' },
  { g: ['organes'], f: p => p.s === 'cardiac' },
  { g: ['organes'], f: p => p.s === 'respiratory' },
  { g: ['organes'], f: p => /stomach|esophag/i.test(p.n) },
  { g: ['squelette'], f: p => p.s === 'skeletal' },
  { g: ['peau'], f: p => p.s === 'integumentary' },
  { g: ['muscles'], f: p => p.s === 'muscular' }
];

export function initAtlas(root, opts = {}) {
  const canvas = root.querySelector('canvas');
  const ui = { chips: root.querySelector('.at-chips'), info: root.querySelector('.at-info'), expl: root.querySelector('.at-expl'), msg: root.querySelector('.at-msg') };
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x0d1226);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x445066, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(1.5, 3, 3); scene.add(key);
  const rim = new THREE.DirectionalLight(0x88aaff, .8); rim.position.set(-2, 1, -3); scene.add(rim);
  const cam = new THREE.PerspectiveCamera(32, 1, .05, 50);
  const target = new THREE.Vector3(0, .95, 0), goal = new THREE.Vector3(0, .95, 0);
  let yaw = .5, pitch = .08, dist = 3.5, goalDist = 3.5, auto = true;
  const bodyCenter = new THREE.Vector3(0, .95, 0);
  const mats = {};
  const matFor = (sys, kind) => {
    const k = sys + kind; if (mats[k]) return mats[k];
    const col = new THREE.Color(SYS_COLOR[sys] || '#bbb');
    const o = { metalness: .05, roughness: .55, side: THREE.DoubleSide };
    if (kind === 'sel') { o.color = new THREE.Color('#3fe0c0'); o.emissive = new THREE.Color('#0a6a5a'); }
    else if (kind === 'dim') { o.color = col; o.transparent = true; o.opacity = .1; o.depthWrite = false; }
    else if (sys === 'integumentary') { o.color = col; o.transparent = true; o.opacity = .14; o.depthWrite = false; }
    else o.color = col;
    return (mats[k] = new THREE.MeshStandardMaterial(o));
  };
  const loaded = {}; // id -> { meshes:[{mesh,p,home}], group }
  const visible = {}; let selected = null, focusFilter = null, explode = 0, dirty = true;
  const root3 = new THREE.Group(); scene.add(root3);

  async function gunzip(buf) {
    if (typeof DecompressionStream === 'undefined') throw new Error('Navigateur trop ancien pour charger ce modèle');
    const s = new Response(buf).body.pipeThrough(new DecompressionStream('gzip'));
    return new Response(s).arrayBuffer();
  }
  async function fetchCached(url) {
    try { if (window.caches) { const c = await caches.open('atlas-v1'); let r = await c.match(url); if (!r) { r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); await c.put(url, r.clone()); } return r; } } catch (e) { if (!window.caches) throw e; }
    const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return r;
  }
  async function load(id) {
    if (loaded[id]) return loaded[id];
    if (loaded[id + '_p']) return loaded[id + '_p'];
    return (loaded[id + '_p'] = (async () => {
      const g = GROUPS.find(x => x.id === id);
      setMsg('Chargement : ' + g.label + ' (' + g.mo + ' Mo)…');
      const meta = await (await fetchCached(BASE + id + '.json')).json();
      const buf = await gunzip(await (await fetchCached(BASE + id + '.bin.gz')).arrayBuffer());
      const grp = new THREE.Group(); const list = [];
      for (const p of meta.parts) {
        const Q = new Uint16Array(buf, p.po, p.v * 4), pos = new Float32Array(p.v * 3);
        for (let i = 0; i < p.v; i++) for (let a = 0; a < 3; a++) pos[i * 3 + a] = p.mn[a] + Q[i * 4 + a] / 65535 * (p.mx[a] - p.mn[a]);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const ib = new THREE.InterleavedBuffer(new Int8Array(buf, p.no, p.v * 4), 4);
        geo.setAttribute('normal', new THREE.InterleavedBufferAttribute(ib, 3, 0, true));
        geo.setIndex(new THREE.BufferAttribute(new Uint16Array(buf, p.io, p.i), 1));
        geo.computeBoundingSphere();
        const mesh = new THREE.Mesh(geo, matFor(p.s, 'base'));
        const c = new THREE.Vector3((p.mn[0] + p.mx[0]) / 2, (p.mn[1] + p.mx[1]) / 2, (p.mn[2] + p.mx[2]) / 2);
        mesh.userData.part = p; grp.add(mesh); list.push({ mesh, p, c });
      }
      root3.add(grp); loaded[id] = { group: grp, list, id }; setMsg('');
      return loaded[id];
    })());
  }
  function setMsg(t) { if (ui.msg) { ui.msg.textContent = t; ui.msg.style.display = t ? 'block' : 'none'; } }
  function applyState() {
    for (const g of GROUPS) { const L = loaded[g.id]; if (L) L.group.visible = !!visible[g.id]; }
    for (const g of GROUPS) { const L = loaded[g.id]; if (!L) continue;
      for (const { mesh, p, c } of L.list) {
        const on = focusFilter ? focusFilter(p) : true;
        mesh.material = (selected === mesh) ? matFor(p.s, 'sel') : (on ? matFor(p.s, 'base') : matFor(p.s, 'dim'));
        mesh.renderOrder = on ? 0 : 1;
        const d = c.clone().sub(bodyCenter).multiplyScalar(explode * 1.1); mesh.position.copy(d);
      } }
    dirty = true;
  }
  async function setGroup(id, on) {
    visible[id] = on; renderChips();
    if (on) { try { await load(id); } catch (e) { visible[id] = false; setMsg('Impossible de charger (' + e.message + '). Réessaie avec du réseau.'); renderChips(); return; } }
    applyState();
  }
  function renderChips() {
    ui.chips.innerHTML = GROUPS.map(g => `<button class="at-chip${visible[g.id] ? ' on' : ''}" data-g="${g.id}" style="--c:${g.color}">${g.label}${loaded[g.id] ? '' : ` <small>${g.mo} Mo</small>`}</button>`).join('');
    ui.chips.querySelectorAll('button').forEach(b => b.onclick = () => setGroup(b.dataset.g, !visible[b.dataset.g]));
  }
  function showInfo(p) {
    if (!p) { ui.info.innerHTML = '<span class="at-hint">Touche une structure pour voir son nom. Glisse pour tourner, pince pour zoomer.</span>'; return; }
    const fr = frKey(p.n);
    ui.info.innerHTML = `<b style="color:${SYS_COLOR[p.s]}">${fr || SYS_FR[p.s]}</b>${fr ? `<div>${SYS_FR[p.s]}</div>` : ''}<div class="at-en">Nom anatomique (anglais) : <i>${p.n}</i></div>`;
  }
  // --- interactions
  let drag = null, pinch = null, moved = 0;
  const ptrs = new Map();
  canvas.addEventListener('pointerdown', e => { canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = 0; auto = false;
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); } });
  canvas.addEventListener('pointermove', e => { const p = ptrs.get(e.pointerId); if (!p) return;
    if (ptrs.size === 2) { p.x = e.clientX; p.y = e.clientY; const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) goalDist = Math.min(7, Math.max(.35, goalDist * pinch / d)); pinch = d; moved += 10; dirty = true; return; }
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    yaw -= dx * .008; pitch = Math.max(-1.2, Math.min(1.2, pitch + dy * .006)); dirty = true; });
  const up = e => { const was = moved; ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; if (was < 8 && ptrs.size === 0) pick(e); };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', e => { ptrs.delete(e.pointerId); pinch = null; });
  canvas.addEventListener('wheel', e => { e.preventDefault(); goalDist = Math.min(7, Math.max(.35, goalDist * (1 + e.deltaY * .001))); dirty = true; }, { passive: false });
  const ray = new THREE.Raycaster();
  function pick(e) {
    const r = canvas.getBoundingClientRect(); const v = new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(v, cam);
    const objs = []; for (const g of GROUPS) { const L = loaded[g.id]; if (L && L.group.visible) for (const it of L.list) if (!focusFilter || focusFilter(it.p)) { if (it.p.s === 'integumentary' && Object.keys(visible).some(k => k !== 'peau' && visible[k])) continue; objs.push(it.mesh); } }
    const hit = ray.intersectObjects(objs, false)[0];
    selected = hit ? hit.object : null; showInfo(hit ? hit.object.userData.part : null); applyState();
    if (hit) { goal.copy(hit.object.getWorldPosition(new THREE.Vector3())); const b = hit.object.geometry.boundingSphere; goal.add(b.center.clone().multiply(hit.object.scale)); goalDist = Math.max(.5, Math.min(goalDist, b.radius * 6 + .4)); }
    else { goal.set(0, .95, 0); }
  }
  ui.expl.addEventListener('input', () => { explode = +ui.expl.value / 100; applyState(); });
  function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.5 : 2)); renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); dirty = true; }
  new ResizeObserver(resize).observe(canvas); resize();
  let last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (auto) { yaw += .004; dirty = true; }
    const k = .12; target.lerp(goal, k); const nd = dist + (goalDist - dist) * k; if (Math.abs(nd - dist) > 1e-4 || target.distanceTo(goal) > 1e-4) dirty = true; dist = nd;
    if (!dirty) return; dirty = false;
    cam.position.set(target.x + Math.sin(yaw) * Math.cos(pitch) * dist, target.y + Math.sin(pitch) * dist, target.z + Math.cos(yaw) * Math.cos(pitch) * dist);
    cam.lookAt(target); renderer.render(scene, cam);
  }
  requestAnimationFrame(frame);
  // --- API
  renderChips(); showInfo(null);
  (async () => { for (const g of GROUPS) if (g.on) await setGroup(g.id, true); })();
  window.atlasFocus = async function (i) {
    const F = FOCUS[i]; if (!F) return;
    for (const id of F.g) if (!visible[id]) await setGroup(id, true);
    focusFilter = F.f; selected = null; applyState();
    const pts = []; for (const id of F.g) { const L = loaded[id]; if (L) for (const it of L.list) if (F.f(it.p)) pts.push(it.c); }
    if (pts.length) { const c = new THREE.Vector3(); pts.forEach(q => c.add(q)); c.multiplyScalar(1 / pts.length); const bb = new THREE.Box3().setFromPoints(pts); goal.copy(c); goalDist = Math.max(.9, Math.min(3.5, bb.getSize(new THREE.Vector3()).length() * 1.6)); }
    auto = false; dirty = true;
  };
  window.atlasReset = function () { focusFilter = null; selected = null; goal.set(0, .95, 0); goalDist = 3.5; applyState(); showInfo(null); };
  return { setGroup };
}
