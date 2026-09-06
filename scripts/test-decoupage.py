#!/usr/bin/env python3
"""Vérifie, sur une table synthétique, que le découpage guidé par les mots
(decouper-voix.py : decouper_par_mots) tombe sur les dix bonnes lignes même
quand les horodatages sont approximatifs, et qu'il refuse quand le compte de
« fois » n'y est pas. Lancé avant chaque génération en CI."""
import importlib.util as u, os, sys
import numpy as np

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = u.spec_from_file_location('dv', os.path.join(RACINE, 'scripts', 'decouper-voix.py'))
dv = u.module_from_spec(s); s.loader.exec_module(dv)

sr = 24000; rng = np.random.default_rng(1)
audio, mots, attendu = [], [], []
t = 0.0
def ajoute(texte, dur):
    global t
    audio.append(rng.normal(0, 0.3, int(dur * sr)).astype('float32')); mots.append((texte, t, t + dur)); t += dur
def pause(dur):
    global t
    audio.append(rng.normal(0, 0.004, int(dur * sr)).astype('float32')); t += dur

pause(0.3); ajoute('Table', 0.3); pause(0.05); ajoute('de', 0.15); pause(0.05); ajoute('sept.', 0.35); pause(0.55)
for b in range(1, 11):
    d = t
    ajoute('sept', 0.3); pause(0.06); ajoute('fois', 0.25); pause(0.06); ajoute(f'{b},', 0.3); pause(0.25); ajoute(f'{7*b}.', 0.5)
    attendu.append((d, t)); pause(0.6)
a = np.concatenate(audio)

# Whisper se trompe d'un dixième de seconde : on bruite les horodatages.
bruites = [(x, s0 + rng.uniform(-0.08, 0.08), e0 + rng.uniform(-0.08, 0.08)) for x, s0, e0 in mots]
lignes = dv.decouper_par_mots(a, sr, bruites)
assert lignes and len(lignes) == 10, lignes
for k, ((d, f), (ad, af)) in enumerate(zip(lignes, attendu), 1):
    d /= sr; f /= sr
    # Une marge de 0,12 s autour de la parole, jamais dedans.
    assert ad - 0.13 <= d <= ad + 0.02 and af - 0.02 <= f <= af + 0.13, (k, d, f, ad, af)
assert dv.decouper_par_mots(a, sr, bruites[:-4]) is None, 'neuf « fois » doivent être refusés'
assert dv.decouper_par_mots(a, sr, [('fois', 0, 0.1)] + bruites) is None, 'onze « fois » doivent être refusés'
print('  découpage guidé par les mots : dix lignes aux bons endroits, refus sinon ✅')

# Par la structure : l'en-tête puis, par ligne, la virgule (0,25 s) et le point (0,6 s).
for sm, attendu_ok in ((0.12, True), (0.18, True), (0.25, True), (0.35, True), (0.7, False)):
    lignes = dv.decouper_par_structure(a, sr, silence_min=sm)
    if not attendu_ok:
        assert lignes is None, f'seuil {sm} : aucun creux, on attend un refus'
        continue
    assert lignes and len(lignes) == 10, (sm, lignes)
    for k, ((d, f), (ad, af)) in enumerate(zip(lignes, attendu), 1):
        d /= sr; f /= sr
        assert ad - 0.13 <= d <= ad + 0.02 and af - 0.02 <= f <= af + 0.13, (sm, k, d, f, ad, af)
print('  découpage par la structure : dix lignes aux bons endroits à quatre seuils, refus sinon ✅')
