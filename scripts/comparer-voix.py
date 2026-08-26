#!/usr/bin/env python3
"""Génère les MÊMES phrases avec plusieurs modèles de synthèse vocale française.

POURQUOI CE SCRIPT TOURNE DANS GITHUB ACTIONS ET PAS EN LOCAL
Les poids de ces modèles vivent sur Hugging Face, que le réseau de la session
Claude Code ne peut pas joindre (403 au proxy). Le runner GitHub, lui, sort
librement. Le script est donc écrit pour tourner là-bas, et dépose ses
échantillons dans le dépôt pour qu'on puisse les écouter.

CE QU'IL PRODUIT
echantillons/<moteur>-<voix>.mp3 — la même série de phrases pour chacun, afin
que la comparaison porte sur la voix et rien d'autre.

TOLÉRANT AUX PANNES, VOLONTAIREMENT
Chaque moteur est tenté séparément et son échec est signalé sans arrêter les
autres. Un modèle qui ne s'installe pas ne doit pas emporter toute la
comparaison : mieux vaut quatre voix sur six que rien du tout.
"""
import os, sys, traceback, json

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, 'echantillons')
os.makedirs(SORTIE, exist_ok=True)

# Les mêmes phrases pour tout le monde : deux lignes de table, un vers, une
# phrase d'encouragement. Les nombres sont écrits en toutes lettres pour ne pas
# laisser chaque modèle inventer sa propre lecture de « 56 ».
PHRASES = [
    "Sept fois huit, égale cinquante-six.",
    "Neuf fois sept, égale soixante-trois.",
    "Tu dis sable, et déjà, la mer est à tes pieds.",
    "Bravo Judith, aucune erreur !",
]

resultats = []

def encoder(chemin, audio, sr):
    """PCM flottant → MP3 mono 64 kbit/s."""
    import numpy as np, lameenc
    pcm = (np.clip(np.asarray(audio, dtype='float32'), -1, 1) * 32767).astype('int16')
    e = lameenc.Encoder()
    e.set_bit_rate(64); e.set_in_sample_rate(int(sr)); e.set_channels(1); e.set_quality(2)
    open(chemin, 'wb').write(e.encode(pcm.tobytes()) + e.flush())
    return os.path.getsize(chemin)

def silence(sr, secondes=0.32):
    import numpy as np
    return np.zeros(int(sr * secondes), dtype='float32')

def enregistrer(nom, etiquette, licence, morceaux, sr):
    import numpy as np
    bouts = []
    for i, m in enumerate(morceaux):
        bouts.append(np.asarray(m, dtype='float32'))
        if i < len(morceaux) - 1:
            bouts.append(silence(sr))
    chemin = os.path.join(SORTIE, nom + '.mp3')
    taille = encoder(chemin, np.concatenate(bouts), sr)
    resultats.append({'fichier': nom + '.mp3', 'nom': etiquette, 'licence': licence,
                      'octets': taille})
    print(f'  ✅ {etiquette:38s} {taille/1024:6.0f} Ko', flush=True)

def essayer(etiquette, fn):
    try:
        fn()
    except Exception as e:
        print(f'  ❌ {etiquette:38s} {type(e).__name__}: {e}', flush=True)
        traceback.print_exc(limit=3)

# ── Piper : MIT, plusieurs voix françaises dont deux masculines ───────
PIPER = [
    ('fr_FR-tom-medium',   'fr/fr_FR/tom/medium',   'Piper · Tom (homme)',      None),
    ('fr_FR-siwis-medium', 'fr/fr_FR/siwis/medium', 'Piper · Siwis (femme)',    None),
    ('fr_FR-upmc-medium',  'fr/fr_FR/upmc/medium',  'Piper · UPMC Jessica (femme)', 0),
    ('fr_FR-upmc-medium',  'fr/fr_FR/upmc/medium',  'Piper · UPMC Pierre (homme)',  1),
    ('fr_FR-gilles-low',   'fr/fr_FR/gilles/low',   'Piper · Gilles (homme)',   None),
]
def piper():
    import urllib.request, wave, numpy as np, io
    from piper.voice import PiperVoice
    dossier = os.path.join(RACINE, '.modeles')
    os.makedirs(dossier, exist_ok=True)
    base = 'https://huggingface.co/rhasspy/piper-voices/resolve/main/'
    for cle, chemin, etiquette, locuteur in PIPER:
        def un(cle=cle, chemin=chemin, etiquette=etiquette, locuteur=locuteur):
            onnx = os.path.join(dossier, cle + '.onnx')
            conf = onnx + '.json'
            for url, dest in ((f'{base}{chemin}/{cle}.onnx', onnx),
                              (f'{base}{chemin}/{cle}.onnx.json', conf)):
                if not os.path.exists(dest):
                    urllib.request.urlretrieve(url, dest)
            v = PiperVoice.load(onnx, config_path=conf)
            sr = v.config.sample_rate
            morceaux = []
            for p in PHRASES:
                tampon = io.BytesIO()
                with wave.open(tampon, 'wb') as w:
                    kw = {'speaker_id': locuteur} if locuteur is not None else {}
                    v.synthesize(p, w, **kw)
                tampon.seek(0)
                with wave.open(tampon, 'rb') as w:
                    brut = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2')
                morceaux.append(brut.astype('float32') / 32768.0)
            suffixe = '' if locuteur is None else f'-{locuteur}'
            enregistrer(f'piper-{cle}{suffixe}', etiquette, 'MIT', morceaux, sr)
        essayer(etiquette, un)

# ── MMS de Meta : VITS entraîné sur beaucoup de français ─────────────
def mms():
    import numpy as np, torch
    from transformers import VitsModel, AutoTokenizer
    m = VitsModel.from_pretrained('facebook/mms-tts-fra')
    tok = AutoTokenizer.from_pretrained('facebook/mms-tts-fra')
    morceaux = []
    for p in PHRASES:
        e = tok(p, return_tensors='pt')
        with torch.no_grad():
            morceaux.append(m(**e).waveform[0].cpu().numpy())
    enregistrer('mms-fra', 'MMS · Meta (femme)', 'CC-BY-NC 4.0', morceaux,
                m.config.sampling_rate)

# ── MeloTTS : MIT, réputé plus naturel que VITS nu ───────────────────
def melo():
    import numpy as np
    from melo.api import TTS
    t = TTS(language='FR', device='cpu')
    ident = t.hps.data.spk2id
    cle = list(ident.keys())[0]
    morceaux = []
    for p in PHRASES:
        morceaux.append(t.tts_to_file(p, ident[cle], None, speed=1.0))
    enregistrer('melo-fr', 'MeloTTS · Français', 'MIT', morceaux,
                t.hps.data.sampling_rate)

if __name__ == '__main__':
    quoi = sys.argv[1] if len(sys.argv) > 1 else 'tous'
    print(f'\n── Génération des échantillons ({quoi}) ──', flush=True)
    if quoi in ('tous', 'piper'): piper()
    if quoi in ('tous', 'mms'):   essayer('MMS · Meta', mms)
    if quoi in ('tous', 'melo'):  essayer('MeloTTS', melo)

    # On FUSIONNE avec ce qui existe déjà : chaque moteur tourne dans son
    # propre job, et un manifeste écrasé perdrait les voix des autres.
    fiche = os.path.join(SORTIE, 'index.json')
    anciens = []
    if os.path.exists(fiche):
        try: anciens = json.load(open(fiche))
        except Exception: pass
    par_fichier = {r['fichier']: r for r in anciens}
    for r in resultats: par_fichier[r['fichier']] = r
    tout = sorted(par_fichier.values(), key=lambda r: r['fichier'])
    json.dump(tout, open(fiche, 'w'), ensure_ascii=False, indent=2)
    print(f'\n  {len(resultats)} voix générées · {len(tout)} au total dans {SORTIE}')
    if not tout:
        sys.exit('Aucune voix générée — rien à comparer.')
