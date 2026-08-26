#!/usr/bin/env python3
"""Enregistre, une fois pour toutes, ce que l'app dit à voix haute.

POURQUOI DES FICHIERS PLUTÔT QUE DE LA SYNTHÈSE
La synthèse vocale du navigateur a un plafond : même en qualité « premium »,
une voix Apple reste assemblée à partir de morceaux enregistrés, et cela
s'entend. Aucun réglage de débit ne fait franchir ce plafond.

Or tout ce que l'app prononce est CONNU D'AVANCE : les cent lignes des tables
de multiplication, les poèmes. On n'a donc pas besoin de synthétiser quoi que
ce soit sur le téléphone. On enregistre une fois avec un vrai modèle neuronal
et on livre les fichiers. Meilleure qualité disponible, hors connexion, sans
clé d'API, sans coût, et sans rien calculer sur l'appareil — donc sans toucher
à la batterie.

LE MODÈLE
Kokoro-82M, licence Apache 2.0 — librement utilisable, y compris ici. 82
millions de paramètres, tourne sur un simple processeur : environ une seconde
de calcul pour deux secondes de parole. Voix française « ff_siwis ».
Poids publiés en GitHub Release, pas seulement sur Hugging Face — ce qui les
rend récupérables même derrière un réseau filtré.

USAGE
    pip install kokoro-onnx soundfile lameenc
    python3 scripts/generer-voix.py            # tout
    python3 scripts/generer-voix.py --vitesse 0.88
Les poids se téléchargent tout seuls au premier lancement (338 Mo, hors dépôt).

LES NOMBRES SONT ÉCRITS EN TOUTES LETTRES
On ne laisse pas le modèle deviner comment lire « 12 » : on lui donne
« douze ». Cela garantit la prononciation ET les liaisons, et rend les pièges
du français explicites — « soixante et onze », « quatre-vingts ».
"""
import argparse, os, sys, urllib.request

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, 'audio', 'voix')
POIDS = os.path.join(RACINE, '.modeles')
BASE = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/'
FICHIERS = ['kokoro-v1.0.onnx', 'voices-v1.0.bin']

# ── Les nombres en toutes lettres ────────────────────────────────────
U = ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix',
     'onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf']
D = {20:'vingt',30:'trente',40:'quarante',50:'cinquante',60:'soixante'}

def mot(n):
    """Écrit n en toutes lettres. Couvre 0 à 100, ce dont les tables ont besoin."""
    if n < 20: return U[n]
    if n == 100: return 'cent'
    if 70 <= n < 80:
        r = n - 60
        return 'soixante' + (' et onze' if r == 11 else '-' + U[r])
    if 80 <= n < 100:
        r = n - 80
        if r == 0: return 'quatre-vingts'      # avec un s quand il est seul
        return 'quatre-vingt-' + U[r]
    d = (n // 10) * 10
    r = n - d
    if r == 0: return D[d]
    if r == 1: return D[d] + ' et un'
    return D[d] + '-' + U[r]

def phrase_table(a, b):
    # La virgule crée le temps d'arrêt qu'un maître laisse avant le résultat ;
    # le point fait redescendre la voix à la fin.
    return f"{mot(a)} fois {mot(b)}, égale {mot(a*b)}."

def telecharger():
    os.makedirs(POIDS, exist_ok=True)
    for f in FICHIERS:
        dest = os.path.join(POIDS, f)
        if os.path.exists(dest) and os.path.getsize(dest) > 1_000_000:
            continue
        print(f'  téléchargement de {f}…', flush=True)
        urllib.request.urlretrieve(BASE + f, dest)
    return [os.path.join(POIDS, f) for f in FICHIERS]

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--vitesse', type=float, default=0.95,
                   help='1.0 = débit naturel ; en dessous, plus posé pour un jeune enfant')
    p.add_argument('--voix', default='ff_siwis')
    p.add_argument('--force', action='store_true', help='réécrire les fichiers existants')
    args = p.parse_args()

    try:
        import numpy as np, lameenc
        from kokoro_onnx import Kokoro
    except ImportError as e:
        sys.exit(f'Dépendance manquante ({e}). Faites : pip install kokoro-onnx soundfile lameenc')

    modele, voix = telecharger()
    k = Kokoro(modele, voix)
    os.makedirs(SORTIE, exist_ok=True)

    def ecrire(nom, textes, silence=0.0):
        chemin = os.path.join(SORTIE, nom)
        if os.path.exists(chemin) and not args.force:
            return 0
        sr = 24000
        bouts = []
        for i, t in enumerate(textes):
            s, sr = k.create(t, voice=args.voix, speed=args.vitesse, lang='fr-fr')
            bouts.append(s)
            if silence and i < len(textes) - 1:
                bouts.append(np.zeros(int(sr * silence), dtype=s.dtype))
        audio = np.concatenate(bouts)
        pcm = (np.clip(audio, -1, 1) * 32767).astype(np.int16)
        enc = lameenc.Encoder()
        enc.set_bit_rate(64); enc.set_in_sample_rate(sr); enc.set_channels(1); enc.set_quality(2)
        data = enc.encode(pcm.tobytes()) + enc.flush()
        open(chemin, 'wb').write(data)
        return len(data)

    total = 0
    for a in range(1, 11):
        for b in range(1, 11):
            total += ecrire(f't-{a}-{b}.mp3', [phrase_table(a, b)])
        print(f'  table de {a}', flush=True)
    print(f'\n  ✅ {SORTIE} — {total/1024/1024:.2f} Mo écrits')

if __name__ == '__main__':
    main()
