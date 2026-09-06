import sys, os
sys.path.insert(0, '/home/user/kangourou-maths/scripts')
import importlib.util as u
spec = u.spec_from_file_location('g', '/home/user/kangourou-maths/scripts/generer-voix.py')
g = u.module_from_spec(spec); spec.loader.exec_module(g)

COULEURS = ['#a3e635','#34d399','#22d3ee','#60a5fa','#a78bfa','#f472b6','#fb923c','#f59e0b','#ef4444','#fbbf24']

# Les poésies sont lues d'un trait : aucun découpage, donc aucune contrainte de
# pause. On extrait le texte depuis game.js pour qu'il soit rigoureusement
# celui que l'app affiche — un vers réécrit à la main finirait par diverger.
import json, subprocess
# Le texte est extrait de game.js par un script à part : l'écrire à la main ici
# le ferait diverger du texte que l'app affiche, sans que rien ne le signale.
POEMES = json.loads(subprocess.run(
    ['node', '/home/user/kangourou-maths/scripts/extraire-poemes.js'], capture_output=True, text=True, check=True).stdout)

def secondes(t):
    return max(15, round(len(t.split()) / 2.2))

blocs = []
for i, po in enumerate(POEMES):
    vers = ''.join(f'<p class="vers">{l.strip()}</p>'
                   for l in po['texte'].split('\n') if l.strip())
    d = secondes(po['texte'])
    blocs.append(f'''<section class="poeme" id="p-{po['id']}" style="--c:{COULEURS[i % 10]}">
  <header class="t-tete">
    <label class="coche">
      <input type="checkbox" data-poeme="{po['id']}">
      <span class="case" aria-hidden="true"></span>
      <span class="t-titre">{po['titre']}</span>
    </label>
    <span class="t-etat">{po['auteur']}{' · ' if po['auteur'] else ''}environ {d} secondes · <b>{po['id']}</b></span>
  </header>
  <div class="texte">{vers}</div>
</section>''')
POEMES_HTML = '\n'.join(blocs)

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

HTML = '''<title>Le Royaume, dans ta voix</title>
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
.onglets{display:flex;gap:.5rem;border-bottom:1px solid var(--trait);padding-bottom:.1rem}
.onglets button{flex:1;background:none;border:none;border-bottom:3px solid transparent;
  font-family:Karla,sans-serif;font-size:1rem;font-weight:700;color:var(--encre-2);
  padding:.7rem .4rem;cursor:pointer;-webkit-tap-highlight-color:transparent;
  transition:color .18s,border-color .18s}
.onglets button[aria-selected="true"]{color:var(--accent);border-bottom-color:var(--accent)}
.onglets button:focus-visible{outline:3px solid var(--accent);outline-offset:-3px;border-radius:6px}
#vue-clone,#vue-tables,#vue-poesies{display:flex;flex-direction:column;gap:1rem}
[hidden]{display:none!important}
.poeme,.fiche{background:var(--surface);border:1px solid var(--trait);border-left:5px solid var(--c);
  border-radius:14px;padding:1.05rem 1.15rem;box-shadow:var(--ombre)}
.poeme.faite{opacity:.5}
.texte{display:flex;flex-direction:column;gap:.35rem}
.vers{margin:0;font-size:clamp(1.08rem,4.3vw,1.28rem);font-weight:500;line-height:1.5}
.t-etat b{color:var(--encre);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8rem}
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
    <h1>Le Royaume, dans ta voix</h1>
    <p class="intro">Quarante-cinq secondes de ta voix suffisent : le reste se génère avec ton timbre. Et si tu veux enregistrer toi-même, tout est là aussi.</p>
    <div class="marche">
      <h2>Le plus court chemin</h2>
      <ol>
        <li><strong>Lis les 45 secondes de l’onglet « Ta voix, une fois ».</strong> Une pièce calme, ton posé.</li>
        <li><strong>Envoie-moi le fichier.</strong> Je génère les cent lignes et les neuf poésies avec ton timbre.</li>
        <li>Tu écoutes. Si un passage sonne mal, tu me le dis et on l’enregistre pour de vrai.</li>
      </ol>
      <p style="margin:.85rem 0 0;color:var(--encre-2);font-size:.92rem">Les deux onglets suivants restent là si tu préfères enregistrer toi-même — pour une poésie qui compte, une vraie lecture reste au-dessus de tout.</p>
    </div>

    <div class="marche">
      <h2>Si tu enregistres toi-même — les tables</h2>
      <ol>
        <li><strong>Une table = un enregistrement.</strong> Dix courtes prises de 40 secondes, pas une longue. Si une table se rate, tu ne refais que celle-là.</li>
        <li><strong>Ouvre Dictaphone</strong> (ou n’importe quel enregistreur), lance, et lis les dix lignes.</li>
        <li><strong>Marque une pause d’une seconde entre chaque ligne.</strong> C’est ce qui me permet de découper proprement — c’est le seul point vraiment important.</li>
        <li><strong>Envoie-moi le fichier</strong> en disant simplement « table 3 ». Coche la table ici pour t’y retrouver.</li>
      </ol>
      <p style="margin:.85rem 0 0;color:var(--encre-2);font-size:.92rem"><b>Les poésies, c’est plus simple encore :</b> pas de pause à respecter, tu lis d’un trait. Onglet « Les poésies ».</p>
    </div>
    <div class="note" style="margin-top:.9rem">
      <b>Pour que ça sonne bien :</b> pièce calme, téléphone à 20 cm de la bouche, ton posé et régulier — comme si tu récitais à côté d’eux. Pas besoin d’articuler exagérément.
    </div>
  </header>

  <nav class="onglets" role="tablist">
    <button role="tab" aria-selected="true"  aria-controls="vue-clone"   id="ong-clone">Ta voix, une fois</button>
    <button role="tab" aria-selected="false" aria-controls="vue-tables"  id="ong-tables">Les tables</button>
    <button role="tab" aria-selected="false" aria-controls="vue-poesies" id="ong-poesies">Les poésies</button>
  </nav>

  <div id="vue-clone" role="tabpanel" aria-labelledby="ong-clone">
    <section class="fiche" id="p-reference" style="--c:#B45309">
      <header class="t-tete">
        <span class="t-titre" style="padding-left:0">Lis ce texte une seule fois</span>
        <span class="t-etat" style="padding-left:0">87 mots · environ 45 secondes</span>
      </header>
      <div class="note" style="margin:0 0 1rem">
        <b>C’est tout ce que j’ai besoin d’entendre.</b> À partir de ces 45 secondes,
        le modèle génère les cent lignes des tables ET les neuf poésies avec ton
        timbre. Tu n’enregistres qu’une fois.
      </div>
      <div class="texte"><p class="vers">Judith, Joseph, écoutez-moi bien.</p><p class="vers">Aujourd'hui on va apprendre quelque chose d'important,</p><p class="vers">et je vais vous le dire tranquillement, sans se presser.</p><p class="vers">Une table de multiplication, ce n'est pas une liste à retenir par cœur :</p><p class="vers">c'est une suite de bonds.</p><p class="vers">Trois, six, neuf, douze, quinze.</p><p class="vers">Vous entendez le rythme ?</p><p class="vers">Quand on compte de trois en trois, on avance toujours du même pas.</p><p class="vers">Sept fois huit, égale cinquante-six.</p><p class="vers">Neuf fois quatre, égale trente-six.</p><p class="vers">On respire, on prend son temps,</p><p class="vers">et petit à petit, ça rentre tout seul.</p></div>
      <div class="note" style="margin-top:1rem">
        <b>Ce texte n’est pas choisi au hasard.</b> Il est dans le ton qu’on veut
        (posé, adressé à eux — le modèle imite l’intonation autant que le timbre),
        il couvre les sons du français, et il contient des <b>nombres</b> : la moitié
        de ce que je vais générer en est.
      </div>
      <div class="note" style="margin-top:.7rem;border-left-color:#0F766E">
        <b>Ce que ça donnera, honnêtement.</b> Ce sera ta voix, reconnaissable.
        L’intonation, elle, sera celle du modèle guidé par ton ton : très bien pour
        les tables, un peu moins vivant qu’une vraie lecture pour les poésies.
        Si une poésie compte pour toi, enregistre-la vraiment — onglet
        « Les poésies ». Les deux se mélangent sans problème.
      </div>
    </section>
  </div>

  <div id="vue-tables" role="tabpanel" aria-labelledby="ong-tables" hidden>
    <div class="avance">
      <span>Tables enregistrées</span>
      <span class="barre"><span class="plein" id="plein"></span></span>
      <span><b id="compte">0</b>/10</span>
    </div>
CORPS_ICI
  </div>

  <div id="vue-poesies" role="tabpanel" aria-labelledby="ong-poesies" hidden>
    <div class="avance">
      <span>Poésies enregistrées</span>
      <span class="barre"><span class="plein" id="pleinP"></span></span>
      <span><b id="compteP">0</b>/9</span>
    </div>
    <div class="note" style="margin:.9rem 0 1.2rem">
      <b>Rien à découper ici.</b> Une poésie se lit d'un trait, sans pause imposée :
      tu la dis comme tu la dirais à Judith et Joseph, avec tes respirations et
      tes silences à toi. C'est même tout l'intérêt. Un fichier par poésie,
      envoie-le en disant son nom court (en gras sous le titre).
    </div>
POESIES_ICI
  </div>

  <footer class="pied">
    <h2>Ensuite, je m’occupe de tout</h2>
    <p style="margin:0;color:var(--encre-2)"><b>Les tables :</b> je découpe chaque enregistrement en dix clips, je vérifie qu’il y en a bien dix, j’égalise le volume et je les range. Si une table n’en donne que neuf, je te le dis et tu refais celle-là seulement.<br><b>Les poésies :</b> rien à découper — j’égalise le volume et je les range telles quelles.</p>
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
  function brancher(selecteur, champ, bloc, idCompte, idBarre, total){
    var cases=[].slice.call(document.querySelectorAll(selecteur));
    function maj(){
      var n=cases.filter(function(c){return c.checked}).length;
      document.getElementById(idCompte).textContent=n;
      document.getElementById(idBarre).style.width=(n/total*100)+'%';
    }
    cases.forEach(function(c){
      var k=champ+':'+c.dataset[champ];
      c.checked=!!faites[k];
      c.closest(bloc).classList.toggle('faite', c.checked);
      c.addEventListener('change', function(){
        faites[k]=c.checked;
        c.closest(bloc).classList.toggle('faite', c.checked);
        try{ localStorage.setItem(CLE, JSON.stringify(faites)); }catch(e){}
        maj();
      });
    });
    maj();
  }
  brancher('input[data-table]','table','.table','compte','plein',10);
  brancher('input[data-poeme]','poeme','.poeme','compteP','pleinP',9);

  // Onglets : deux listes qui ne se lisent pas de la même façon.
  var onglets=[].slice.call(document.querySelectorAll('.onglets button'));
  onglets.forEach(function(b){
    b.addEventListener('click', function(){
      onglets.forEach(function(x){
        var actif = x===b;
        x.setAttribute('aria-selected', actif ? 'true' : 'false');
        document.getElementById(x.getAttribute('aria-controls')).hidden = !actif;
      });
      window.scrollTo(0,0);
    });
  });
})();
</script>
'''
out='/tmp/claude-0/-home-user-kangourou-maths/54893b74-d62e-546e-8b60-496f7bcf7d36/scratchpad/art/studio.html'
open(out,'w',encoding='utf-8').write(
    HTML.replace('CORPS_ICI', CORPS).replace('POESIES_ICI', POEMES_HTML))
print('page : %.0f Ko' % (os.path.getsize(out)/1024))
print('exemple de ligne :', g.phrase_table(7,8))
