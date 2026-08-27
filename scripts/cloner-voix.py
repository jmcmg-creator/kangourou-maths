#!/usr/bin/env python3
"""Génère TOUT le contenu parlé de l'app avec la voix de Julien, à partir d'un
seul échantillon de quarante-cinq secondes.

L'IDÉE
Chatterbox (Resemble AI, licence MIT) fait du clonage « zero-shot » : on lui
donne un extrait de voix en référence, et il prononce n'importe quel texte avec
ce timbre. Une seule prise remplace les cent neuf enregistrements.

CE QU'IL FAUT SAVOIR, ET QUE LE RÉSULTAT NE DIRA PAS TOUT SEUL
Le timbre sera le sien, reconnaissable. L'INTONATION, elle, reste celle du
modèle, seulement colorée par le ton de l'échantillon — d'où le texte de
référence choisi dans le registre visé (posé, adressé à des enfants) plutôt que
n'importe quel paragraphe. C'est très bien pour les tables, qui sont répétitives
par nature ; c'est en dessous d'une vraie lecture pour une poésie qu'on aime.
Les deux se mélangent : un fichier enregistré pour de vrai écrase simplement le
fichier généré, sans rien changer d'autre.

USAGE
    python3 scripts/cloner-voix.py voix-julien.m4a --quoi tables
    python3 scripts/cloner-voix.py voix-julien.m4a --quoi poemes
    python3 scripts/cloner-voix.py voix-julien.m4a --quoi tables --tables 7 8
"""
import argparse, json, os, subprocess, sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, 'audio', 'voix')

# Les mêmes phrases que le reste de la chaîne, écrites en toutes lettres.
sys.path.insert(0, os.path.join(RACINE, 'scripts'))
import importlib.util as _u
_s = _u.spec_from_file_location('gv', os.path.join(RACINE, 'scripts', 'generer-voix.py'))
_gv = _u.module_from_spec(_s); _s.loader.exec_module(_gv)
phrase_table = _gv.phrase_table


def poemes():
    """Le texte vient de game.js, jamais d'une copie : une copie finirait par
    diverger de ce que l'app affiche sans que rien ne le signale."""
    sortie = subprocess.run(['node', os.path.join(RACINE, 'scripts', 'extraire-poemes.js')],
                            capture_output=True, text=True, check=True).stdout
    return json.loads(sortie)


def preparer_reference(chemin):
    """Chatterbox veut un wav mono. L'iPhone enregistre en m4a."""
    if chemin.lower().endswith('.wav'):
        return chemin
    dest = os.path.join(RACINE, '.modeles', 'reference.wav')
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', chemin,
                    '-ac', '1', '-ar', '24000', dest], check=True)
    return dest


def encoder(chemin, audio, sr):
    import numpy as np, lameenc
    a = np.asarray(audio, dtype='float32').reshape(-1)
    crete = float(np.max(np.abs(a))) or 1.0
    a = a * (0.89 / crete)              # même niveau d'un clip à l'autre
    pcm = (np.clip(a, -1, 1) * 32767).astype('int16')
    e = lameenc.Encoder()
    e.set_bit_rate(64); e.set_in_sample_rate(int(sr)); e.set_channels(1); e.set_quality(2)
    open(chemin, 'wb').write(e.encode(pcm.tobytes()) + e.flush())
    return os.path.getsize(chemin)


def charger_modele():
    import importlib
    for mod, cls in (('chatterbox.mtl_tts', 'ChatterboxMultilingualTTS'),
                     ('chatterbox.tts', 'ChatterboxMultilingualTTS'),
                     ('chatterbox', 'ChatterboxMultilingualTTS')):
        try:
            M = getattr(importlib.import_module(mod), cls)
            print(f'  modèle : {mod}.{cls}', flush=True)
            return M.from_pretrained(device='cpu')
        except (ImportError, AttributeError):
            continue
    import chatterbox
    raise ImportError('ChatterboxMultilingualTTS introuvable ; chatterbox expose : '
                      + ', '.join(a for a in dir(chatterbox) if not a.startswith('_')))


def main():
    p = argparse.ArgumentParser()
    p.add_argument('reference', help='échantillon de voix (45 s environ)')
    p.add_argument('--quoi', choices=['tables', 'poemes', 'tout'], default='tout')
    p.add_argument('--tables', type=int, nargs='*', help='ne refaire que ces tables')
    p.add_argument('--force', action='store_true', help='réécrire les fichiers existants')
    args = p.parse_args()

    if not os.path.exists(args.reference):
        sys.exit(f'Échantillon introuvable : {args.reference}')

    ref = preparer_reference(args.reference)
    m = charger_modele()
    os.makedirs(SORTIE, exist_ok=True)
    total = n = 0

    def faire(nom, texte):
        nonlocal total, n
        chemin = os.path.join(SORTIE, nom)
        if os.path.exists(chemin) and not args.force:
            return
        w = m.generate(texte, language_id='fr', audio_prompt_path=ref)
        a = w.detach().cpu().numpy() if hasattr(w, 'detach') else w
        total += encoder(chemin, a, m.sr); n += 1
        print(f'  ✅ {nom}', flush=True)

    if args.quoi in ('tables', 'tout'):
        for a in (args.tables or range(1, 11)):
            for b in range(1, 11):
                faire(f't-{a}-{b}.mp3', phrase_table(a, b))
            print(f'  ── table de {a} terminée', flush=True)

    if args.quoi in ('poemes', 'tout'):
        for po in poemes():
            # Un poème d'une minute d'un seul tenant dérive : le modèle perd le
            # fil et la voix change en route. On génère phrase par phrase et on
            # recolle, avec un souffle entre les phrases.
            import numpy as np
            bouts = []
            for ph in [x.strip() for x in po['texte'].replace('\n', ' ').split('.') if x.strip()]:
                w = m.generate(ph + '.', language_id='fr', audio_prompt_path=ref)
                a = w.detach().cpu().numpy() if hasattr(w, 'detach') else w
                bouts.append(np.asarray(a, dtype='float32').reshape(-1))
                bouts.append(np.zeros(int(m.sr * 0.28), dtype='float32'))
            chemin = os.path.join(SORTIE, f"p-{po['id']}.mp3")
            if os.path.exists(chemin) and not args.force:
                continue
            total += encoder(chemin, np.concatenate(bouts), m.sr); n += 1
            print(f"  ✅ p-{po['id']}.mp3   {po['titre']}", flush=True)

    if n == 0:
        sys.exit('Aucun fichier écrit. Utilisez --force pour réécrire ceux qui existent.')
    print(f'\n  {n} fichiers · {total/1024/1024:.2f} Mo dans {SORTIE}')


if __name__ == '__main__':
    main()
