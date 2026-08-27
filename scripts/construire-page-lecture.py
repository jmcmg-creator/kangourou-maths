import sys, os
sys.path.insert(0, '/home/user/kangourou-maths/scripts')
import importlib.util as u
spec = u.spec_from_file_location('g', '/home/user/kangourou-maths/scripts/generer-voix.py')
g = u.module_from_spec(spec); spec.loader.exec_module(g)

COULEURS = ['#a3e635','#34d399','#22d3ee','#60a5fa','#a78bfa','#f472b6','#fb923c','#f59e0b','#ef4444','#fbbf24']

sections = []
for a in range(1, 11):
    lignes = ''.join(
        f'<li><span class="num">{k}</span><span class="dire">{g.phrase_table(a,k)}</span></li>'
        for k in range(1, 11))
    sections.append(f'''<section class="table" id="t{a}" style="--c:{COULEURS[a-1]}">
  <header class="t-tete">
    <label class="coche">
      <input type="checkbox" data-table="{a}">
      <span class="case" aria-hidden="true"></span>
      <span class="t-titre">Table de {a}</span>
    </label>
    <span class="t-etat">10 lignes · environ 40 secondes</span>
  </header>
  <ol class="lignes">{lignes}</ol>
</section>''')
CORPS = '\n'.join(sections)

HTML = '''<title>Les tables, dans ta voix</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Karla:wght@400;500;700&display=swap">
<style>
:root{
  --fond:#FBF8F3;--surface:#FFF;--surface-2:#F2EDE4;
  --encre:#1F1B16;--encre-2:#5F574C;--trait:rgba(31,27,22,.13);
  --accent:#B45309;--accent-doux:rgba(180,83,9,.10);
  --ombre:0 1px 2px rgba(31,27,22,.05),0 10px 26px -14px rgba(31,27,22,.25);
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --fond:#141210;--surface:#1D1A17;--surface-2:#272320;
  --encre:#F5F0E8;--encre-2:#AEA396;--trait:rgba(245,240,232,.14);
  --accent:#FBBF24;--accent-doux:rgba(251,191,36,.13);
  --ombre:0 1px 2px rgba(0,0,0,.5),0 12px 32px -16px rgba(0,0,0,.8);
}}
:root[data-theme="dark"]{
  --fond:#141210;--surface:#1D1A17;--surface-2:#272320;
  --encre:#F5F0E8;--encre-2:#AEA396;--trait:rgba(245,240,232,.14);
  --accent:#FBBF24;--accent-doux:rgba(251,191,36,.13);
  --ombre:0 1px 2px rgba(0,0,0,.5),0 12px 32px -16px rgba(0,0,0,.8);
}
*{box-sizing:border-box}
body{margin:0;background:var(--fond);color:var(--encre);
  font-family:Karla,ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.5;
  -webkit-font-smoothing:antialiased}
.env{max-width:42rem;margin:0 auto;padding:2.25rem 1.15rem 5rem;display:flex;flex-direction:column;gap:2rem}
.oeil{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:700}
h1{font-family:Fraunces,ui-serif,Georgia,serif;font-weight:600;font-size:clamp(1.9rem,6.5vw,2.5rem);
  line-height:1.1;margin:.45rem 0 0;letter-spacing:-.015em;text-wrap:balance}
.intro{margin:.8rem 0 0;color:var(--encre-2);font-size:1.02rem}
.marche{background:var(--surface);border:1px solid var(--trait);border-radius:14px;
  padding:1.05rem 1.2rem;box-shadow:var(--ombre);margin-top:1.15rem}
.marche h2{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);
  font-weight:700;margin:0 0 .7rem;font-family:Karla,sans-serif}
.marche ol{margin:0;padding-left:1.25rem;display:flex;flex-direction:column;gap:.5rem;color:var(--encre-2)}
.marche li strong{color:var(--encre)}
.avance{position:sticky;top:0;z-index:5;background:var(--fond);
  padding:.7rem 0 .55rem;border-bottom:1px solid var(--trait);
  display:flex;align-items:center;gap:.7rem;font-size:.88rem;color:var(--encre-2)}
.avance .barre{flex:1;height:6px;border-radius:3px;background:var(--trait);overflow:hidden}
.avance .plein{display:block;height:100%;width:0;background:var(--accent);border-radius:3px;
  transition:width .3s ease}
.avance b{font-variant-numeric:tabular-nums;color:var(--encre)}
.table{background:var(--surface);border:1px solid var(--trait);border-left:5px solid var(--c);
  border-radius:14px;padding:1.05rem 1.15rem;box-shadow:var(--ombre)}
.table.faite{opacity:.5}
.t-tete{display:flex;flex-direction:column;gap:.2rem;margin-bottom:.85rem}
.coche{display:flex;align-items:center;gap:.7rem;cursor:pointer;-webkit-tap-highlight-color:transparent}
.coche input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
.case{width:26px;height:26px;flex:0 0 auto;border:2px solid var(--trait);border-radius:8px;
  display:grid;place-items:center;transition:background .18s,border-color .18s}
.case::after{content:"";width:9px;height:15px;border:solid var(--fond);border-width:0 3px 3px 0;
  transform:rotate(45deg) scale(0);transition:transform .18s var(--eb,cubic-bezier(.34,1.56,.64,1));
  margin-top:-3px}
.coche input:checked + .case{background:var(--c);border-color:var(--c)}
.coche input:checked + .case::after{transform:rotate(45deg) scale(1)}
.coche input:focus-visible + .case{outline:3px solid var(--accent);outline-offset:3px}
.t-titre{font-family:Fraunces,ui-serif,Georgia,serif;font-weight:600;font-size:1.35rem;color:var(--c)}
.t-etat{font-size:.82rem;color:var(--encre-2);padding-left:2.35rem}
.lignes{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.55rem}
.lignes li{display:flex;align-items:baseline;gap:.85rem}
.num{flex:0 0 1.5rem;text-align:right;font-size:.82rem;color:var(--encre-2);
  font-variant-numeric:tabular-nums}
.dire{font-size:clamp(1.15rem,4.6vw,1.4rem);font-weight:500;letter-spacing:.005em}
.pied{border-top:1px solid var(--trait);padding-top:1.6rem;display:flex;flex-direction:column;gap:.9rem}
.pied h2{font-family:Fraunces,ui-serif,Georgia,serif;font-weight:600;font-size:1.2rem;margin:0}
.note{background:var(--surface);border:1px solid var(--trait);border-left:3px solid var(--accent);
  border-radius:10px;padding:.85rem 1rem;font-size:.9rem;color:var(--encre-2)}
.note b{color:var(--encre)}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<div class="env">
  <header>
    <span class="oeil">Le Royaume des Savoirs</span>
    <h1>Les tables, dans ta voix</h1>
    <p class="intro">Cent lignes à lire. Aucun modèle ne sonnera jamais comme toi, et pour Judith et Joseph ce ne sera pas la même chose du tout.</p>
    <div class="marche">
      <h2>Comment faire</h2>
      <ol>
        <li><strong>Une table = un enregistrement.</strong> Dix courtes prises de 40 secondes, pas une longue. Si une table se rate, tu ne refais que celle-là.</li>
        <li><strong>Ouvre Dictaphone</strong> (ou n’importe quel enregistreur), lance, et lis les dix lignes.</li>
        <li><strong>Marque une pause d’une seconde entre chaque ligne.</strong> C’est ce qui me permet de découper proprement — c’est le seul point vraiment important.</li>
        <li><strong>Envoie-moi le fichier</strong> en disant simplement « table 3 ». Coche la table ici pour t’y retrouver.</li>
      </ol>
    </div>
    <div class="note" style="margin-top:.9rem">
      <b>Pour que ça sonne bien :</b> pièce calme, téléphone à 20 cm de la bouche, ton posé et régulier — comme si tu récitais à côté d’eux. Pas besoin d’articuler exagérément.
    </div>
  </header>

  <div class="avance">
    <span>Tables enregistrées</span>
    <span class="barre"><span class="plein" id="plein"></span></span>
    <span><b id="compte">0</b>/10</span>
  </div>

CORPS_ICI

  <footer class="pied">
    <h2>Ensuite, je m’occupe de tout</h2>
    <p style="margin:0;color:var(--encre-2)">Je découpe chaque enregistrement en dix clips, je vérifie qu’il y en a bien dix, j’égalise le volume et je les range dans l’app. Si une table n’en donne que neuf, je te le dis et tu refais celle-là seulement.</p>
    <div class="note">
      <b>Tu peux t’arrêter quand tu veux.</b> Les cases cochées sont gardées sur ton téléphone : reviens sur cette page plus tard, tu reprendras où tu en étais. Et une table livrée, c’est déjà une table qui marche dans l’app — pas besoin des dix pour commencer.
    </div>
  </footer>
</div>
<script>
(function(){
  var CLE='royaume_tables_enregistrees';
  var faites={};
  try{ faites=JSON.parse(localStorage.getItem(CLE)||'{}')||{}; }catch(e){ faites={}; }
  var cases=[].slice.call(document.querySelectorAll('input[data-table]'));
  function majuscule(){
    var n=cases.filter(function(c){return c.checked}).length;
    document.getElementById('compte').textContent=n;
    document.getElementById('plein').style.width=(n*10)+'%';
  }
  cases.forEach(function(c){
    var t=c.dataset.table;
    c.checked=!!faites[t];
    c.closest('.table').classList.toggle('faite', c.checked);
    c.addEventListener('change', function(){
      faites[t]=c.checked;
      c.closest('.table').classList.toggle('faite', c.checked);
      try{ localStorage.setItem(CLE, JSON.stringify(faites)); }catch(e){}
      majuscule();
    });
  });
  majuscule();
})();
</script>
'''
out='/tmp/claude-0/-home-user-kangourou-maths/54893b74-d62e-546e-8b60-496f7bcf7d36/scratchpad/art/studio.html'
open(out,'w',encoding='utf-8').write(HTML.replace('CORPS_ICI', CORPS))
print('page : %.0f Ko' % (os.path.getsize(out)/1024))
print('exemple de ligne :', g.phrase_table(7,8))
