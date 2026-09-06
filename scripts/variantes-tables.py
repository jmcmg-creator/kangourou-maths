#!/usr/bin/env python3
"""Trois façons de dire une table, pour choisir à l'oreille.

Julien : « très bien pour les poésies, mais pas pour les tables ». Les fables
sont générées phrase par phrase avec du contexte ; une ligne de table est un
énoncé de six mots — trop court pour qu'un modèle autorégressif trouve un
rythme, et l'attaque est parfois coupée. On génère donc la table de 7 selon
trois recettes, avec la même voix de référence, et on dépose le tout dans
echantillons/ pour écoute :

  A. ligne par ligne, « sept fois huit, égale cinquante-six. »     (l'actuelle)
  B. la table ENTIÈRE en une prise, mêmes mots, puis découpée      (contexte)
  C. la table entière en une prise, « sept fois huit, cinquante-six. »
     — la scansion d'un maître, sans « égale »

Pour B et C, la prise entière est conservée telle quelle (tables-B-entiere.mp3)
ET découpée ligne par ligne par les silences (decouper-voix.py) ; on vérifie
qu'on retrouve bien dix morceaux, sinon la recette n'est pas retenue.
"""
import os, sys, subprocess, json
RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECH = os.path.join(RACINE, 'echantillons'); os.makedirs(ECH, exist_ok=True)
import importlib.util as _u
def _charger(nom):
    s = _u.spec_from_file_location(nom, os.path.join(RACINE, 'scripts', nom + '.py')); m = _u.module_from_spec(s); s.loader.exec_module(m); return m
gv = _charger('generer-voix'); dv = _charger('decouper-voix')
mot = gv.mot

def mp3(chemin, a, sr):
    import numpy as np, lameenc
    a = np.asarray(a, dtype='float32').reshape(-1); crete = float(np.max(np.abs(a))) or 1.0
    pcm = (np.clip(a * (0.89 / crete), -1, 1) * 32767).astype('int16')
    e = lameenc.Encoder(); e.set_bit_rate(64); e.set_in_sample_rate(int(sr)); e.set_channels(1); e.set_quality(2)
    open(chemin, 'wb').write(e.encode(pcm.tobytes()) + e.flush())

def main():
    import numpy as np, importlib
    ref = os.path.join(RACINE, 'audio', 'references', open(os.path.join(RACINE, 'audio', 'references', 'CHOIX.txt')).read().strip())
    M = None
    for mod in ('chatterbox.mtl_tts', 'chatterbox.tts', 'chatterbox'):
        try: M = getattr(importlib.import_module(mod), 'ChatterboxMultilingualTTS'); break
        except (ImportError, AttributeError): continue
    m = M.from_pretrained(device='cpu')
    T = 7
    def gen(texte):
        w = m.generate(texte, language_id='fr', audio_prompt_path=ref)
        return (w.detach().cpu().numpy() if hasattr(w, 'detach') else np.asarray(w)).astype('float32').reshape(-1), m.sr

    # A — ligne par ligne, recollée avec une seconde de silence pour l'écoute.
    bouts = []
    for b in range(1, 11):
        a, sr = gen(f"{mot(T)} fois {mot(b)}, égale {mot(T*b)}.")
        bouts += [a, np.zeros(int(sr * 0.9), dtype='float32')]
    mp3(os.path.join(ECH, 'tables-A-ligne-par-ligne.mp3'), np.concatenate(bouts), sr)
    print('  ✅ A ligne par ligne', flush=True)

    rapport = {}
    for lettre, forme in (('B', lambda b: f"{mot(T)} fois {mot(b)}, égale {mot(T*b)}."),
                          ('C', lambda b: f"{mot(T)} fois {mot(b)}, {mot(T*b)}.")):
        # « Table de sept. » en tête : l'attaque coupée, si elle survient,
        # tombe sur ces trois mots qu'on jette au découpage.
        texte = f"Table de {mot(T)}. " + ' '.join(forme(b) for b in range(1, 11))
        a, sr = gen(texte)
        mp3(os.path.join(ECH, f'tables-{lettre}-entiere.mp3'), a, sr)
        zones, seuil, fond = dv.decouper(a, sr, silence_min=0.25)
        # On attend 11 morceaux (l'en-tête + dix lignes) ; à défaut on le dit.
        n = len(zones); rapport[lettre] = {'morceaux': n, 'duree': round(len(a)/sr, 1)}
        print(f"  {'✅' if n == 11 else '⚠️ '} {lettre} prise entière : {len(a)/sr:.1f}s, {n} morceaux trouvés (11 attendus)", flush=True)
        if n == 11:
            bouts = []
            for d, f in zones[1:]:
                bouts += [a[d:f], np.zeros(int(sr * 0.9), dtype='float32')]
            mp3(os.path.join(ECH, f'tables-{lettre}-decoupee.mp3'), np.concatenate(bouts), sr)
    json.dump(rapport, open(os.path.join(ECH, 'variantes-tables.json'), 'w'), indent=2)

if __name__ == '__main__':
    main()
