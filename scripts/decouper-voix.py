#!/usr/bin/env python3
"""Découpe un enregistrement de la voix de Julien en dix clips nommés.

L'IDÉE
Une table = un enregistrement de quarante secondes, dix lignes séparées par
une seconde de silence. Ce script retrouve les silences, coupe, égalise le
volume et écrit t-<table>-1.mp3 … t-<table>-10.mp3 dans audio/voix/.

IL REFUSE PLUTÔT QUE DE DEVINER
Si le découpage ne donne pas exactement dix morceaux, rien n'est écrit et le
script dit ce qu'il a trouvé. Un décalage passerait inaperçu et mettrait « sept
fois trois » sur la ligne de « sept fois quatre » — une erreur qu'un enfant
apprendrait par cœur sans que personne ne s'en aperçoive. Mieux vaut redemander
une prise.

USAGE
    python3 scripts/decouper-voix.py enregistrement.m4a 7
    python3 scripts/decouper-voix.py enregistrement.m4a 7 --essai   # sans écrire
"""
import argparse, os, subprocess, sys, wave, math

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, 'audio', 'voix')


def lire_en_wav(chemin):
    """Passe par ffmpeg si besoin : l'iPhone enregistre en m4a, pas en wav."""
    if chemin.lower().endswith('.wav'):
        w = wave.open(chemin, 'rb')
        sr, n, largeur, canaux = w.getframerate(), w.getnframes(), w.getsampwidth(), w.getnchannels()
        brut = w.readframes(n); w.close()
    else:
        try:
            brut = subprocess.run(
                ['ffmpeg', '-v', 'error', '-i', chemin, '-f', 's16le',
                 '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '24000', '-'],
                check=True, capture_output=True).stdout
        except FileNotFoundError:
            sys.exit("ffmpeg est nécessaire pour lire ce format. Convertissez d'abord en .wav.")
        except subprocess.CalledProcessError as e:
            sys.exit('ffmpeg a refusé le fichier :\n' + e.stderr.decode('utf8', 'replace')[:800])
        sr, largeur, canaux = 24000, 2, 1
    import numpy as np
    a = np.frombuffer(brut, dtype='<i2').astype('float32') / 32768.0
    if canaux == 2:
        a = a.reshape(-1, 2).mean(axis=1)
    return a, sr


def enveloppe(a, sr, fenetre=0.02):
    """Volume perçu, fenêtre par fenêtre — c'est là-dessus qu'on juge le silence."""
    import numpy as np
    n = max(1, int(sr * fenetre))
    reste = len(a) % n
    if reste:
        a = a[:-reste]
    return np.sqrt((a.reshape(-1, n) ** 2).mean(axis=1) + 1e-12), n


def decouper(a, sr, attendus=10, silence_min=0.35, marge=0.12):
    """Retrouve les passages parlés. Le seuil est calculé SUR L'ENREGISTREMENT,
    pas fixé d'avance : le bruit de fond d'une cuisine et celui d'un bureau
    n'ont rien à voir, et un seuil absolu marcherait chez l'un, pas chez l'autre."""
    import numpy as np
    env, n = enveloppe(a, sr)
    fond = np.percentile(env, 20)      # le calme typique
    voix = np.percentile(env, 95)      # les pointes de parole
    seuil = max(fond * 3.0, fond + (voix - fond) * 0.10)
    parle = env > seuil

    zones, debut = [], None
    creux_max = int(silence_min / 0.02)
    creux = 0
    for i, p in enumerate(parle):
        if p:
            if debut is None:
                debut = i
            creux = 0
        elif debut is not None:
            creux += 1
            if creux >= creux_max:
                zones.append((debut, i - creux))
                debut = None
    if debut is not None:
        zones.append((debut, len(parle)))

    # On écarte les miettes : une respiration, un claquement de langue.
    zones = [(d, f) for d, f in zones if (f - d) * 0.02 >= 0.25]
    m = int(marge / 0.02)
    return [(max(0, d - m) * n, min(len(a), (f + m) * n)) for d, f in zones], seuil, fond


def ecrire_mp3(chemin, a, sr):
    import numpy as np, lameenc
    crete = float(np.max(np.abs(a))) or 1.0
    a = a * (0.89 / crete)             # même niveau d'une ligne à l'autre
    pcm = (np.clip(a, -1, 1) * 32767).astype('int16')
    e = lameenc.Encoder()
    e.set_bit_rate(64); e.set_in_sample_rate(sr); e.set_channels(1); e.set_quality(2)
    open(chemin, 'wb').write(e.encode(pcm.tobytes()) + e.flush())
    return os.path.getsize(chemin)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('fichier')
    p.add_argument('table', type=int, choices=range(1, 11))
    p.add_argument('--essai', action='store_true', help='analyse sans rien écrire')
    args = p.parse_args()

    a, sr = lire_en_wav(args.fichier)
    print(f'\n  {args.fichier} · {len(a)/sr:.1f}s · {sr} Hz')
    zones, seuil, fond = decouper(a, sr)
    print(f'  seuil de silence calculé : {seuil:.4f} (fond {fond:.4f})')
    print(f'  {len(zones)} passages parlés trouvés :')
    for i, (d, f) in enumerate(zones, 1):
        print(f'     {i:2d}. {d/sr:6.2f}s → {f/sr:6.2f}s   ({(f-d)/sr:.2f}s)')

    if len(zones) != 10:
        print(f'\n  ❌ {len(zones)} morceaux au lieu de 10 — rien n\'a été écrit.')
        print('     Refaites la prise en marquant bien une seconde de silence')
        print('     entre chaque ligne, ou envoyez le fichier tel quel : je peux')
        print('     ajuster le seuil à la main.')
        sys.exit(1)

    if args.essai:
        print('\n  ✅ dix morceaux nets. (essai : rien écrit)')
        return

    os.makedirs(SORTIE, exist_ok=True)
    total = 0
    for k, (d, f) in enumerate(zones, 1):
        total += ecrire_mp3(os.path.join(SORTIE, f't-{args.table}-{k}.mp3'), a[d:f], sr)
    print(f'\n  ✅ table de {args.table} : 10 clips · {total/1024:.0f} Ko dans {SORTIE}')


if __name__ == '__main__':
    main()
