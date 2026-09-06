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

echecs = []

def essayer(etiquette, fn):
    """Tolère l'échec d'un moteur sans emporter les autres — mais ne le CACHE
    pas. La version précédente coupait la trace à trois lignes et le script
    sortait en succès dès que le manifeste global contenait quelque chose : un
    moteur pouvait planter à l'import, en zéro seconde, et le job passait au
    vert. C'est exactement ce qui est arrivé à Chatterbox."""
    try:
        fn()
    except Exception as e:
        echecs.append(f'{etiquette} → {type(e).__name__}: {e}')
        print(f'  ❌ {etiquette:38s} {type(e).__name__}: {e}', flush=True)
        traceback.print_exc()

# ── Piper : MIT, plusieurs voix françaises dont deux masculines ───────
PIPER = [
    ('fr_FR-tom-medium',   'fr/fr_FR/tom/medium',   'Piper · Tom (homme)',      None),
    ('fr_FR-siwis-medium', 'fr/fr_FR/siwis/medium', 'Piper · Siwis (femme)',    None),
    ('fr_FR-upmc-medium',  'fr/fr_FR/upmc/medium',  'Piper · UPMC Jessica (femme)', 0),
    ('fr_FR-upmc-medium',  'fr/fr_FR/upmc/medium',  'Piper · UPMC Pierre (homme)',  1),
    ('fr_FR-gilles-low',   'fr/fr_FR/gilles/low',   'Piper · Gilles (homme)',   None),
]
def piper():
    import urllib.request, numpy as np
    from piper.voice import PiperVoice
    dossier = os.path.join(RACINE, '.modeles')
    os.makedirs(dossier, exist_ok=True)
    base = 'https://huggingface.co/rhasspy/piper-voices/resolve/main/'

    # On détecte la forme de l'API UNE FOIS, sur la signature. La version
    # actuelle (piper-tts 1.3+) a fait de synthesize() un générateur et déplacé
    # le numéro de locuteur dans un objet de configuration. L'appeler à
    # l'ancienne ne lève rien sur le moment : on récupère un générateur qu'on
    # n'itère jamais, donc aucun son, et l'erreur ne surgit que bien plus loin.
    #
    # Surtout : on n'enveloppe PAS la boucle dans un try/except TypeError.
    # Un tel filet attrape aussi les erreurs venant de l'INTÉRIEUR du
    # générateur — qui n'est évalué qu'à l'itération — et bascule en silence
    # sur un chemin de secours, en masquant la vraie cause.
    import inspect
    recente = 'syn_config' in inspect.signature(PiperVoice.synthesize).parameters

    def parler(v, texte, locuteur):
        if recente:
            from piper.config import SynthesisConfig
            cfg = SynthesisConfig(speaker_id=locuteur) if locuteur is not None else None
            bouts, sr = [], None
            for ch in v.synthesize(texte, cfg):
                a = getattr(ch, 'audio_float_array', None)
                if a is None:
                    a = np.frombuffer(ch.audio_int16_bytes, dtype='<i2').astype('float32') / 32768.0
                bouts.append(np.asarray(a, dtype='float32'))
                sr = ch.sample_rate
            if not bouts:
                raise RuntimeError('synthesize() n\'a produit aucun morceau')
            return np.concatenate(bouts), sr
        # Versions antérieures : flux d'octets bruts.
        kw = {'speaker_id': locuteur} if locuteur is not None else {}
        brut = b''.join(v.synthesize_stream_raw(texte, **kw))
        return np.frombuffer(brut, dtype='<i2').astype('float32') / 32768.0, v.config.sample_rate

    for cle, chemin, etiquette, locuteur in PIPER:
        def un(cle=cle, chemin=chemin, etiquette=etiquette, locuteur=locuteur):
            onnx = os.path.join(dossier, cle + '.onnx')
            conf = onnx + '.json'
            for url, dest in ((f'{base}{chemin}/{cle}.onnx', onnx),
                              (f'{base}{chemin}/{cle}.onnx.json', conf)):
                if not os.path.exists(dest):
                    urllib.request.urlretrieve(url, dest)
            v = PiperVoice.load(onnx, config_path=conf)
            morceaux, sr = [], None
            for p in PHRASES:
                a, sr = parler(v, p, locuteur)
                if a is None or len(a) == 0:
                    raise RuntimeError(f'aucun son produit pour « {p} »')
                morceaux.append(a)
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


# ── Les gros modèles ─────────────────────────────────────────────────
# Piper, MeloTTS, MMS et Kokoro appartiennent tous à la même famille : de
# petits modèles rapides, qui prédisent le son d'un bloc. Ils partagent le même
# plafond de naturel. Les modèles ci-dessous sont autorégressifs — ils
# construisent la parole morceau par morceau, comme un modèle de langue écrit
# un texte — et c'est ce qui leur donne des intonations et des respirations que
# les précédents ne peuvent pas produire. En échange ils sont cent fois plus
# lourds : hors de question de les faire tourner sur un téléphone, mais très
# bien pour enregistrer une fois pour toutes.

def xtts():
    """XTTS-v2 de Coqui. ATTENTION à la licence : Coqui Public Model License,
    NON COMMERCIALE. À trancher avant de livrer, pas après."""
    import numpy as np
    os.environ['COQUI_TOS_AGREED'] = '1'   # sans ça, il attend une réponse au clavier
    from TTS.api import TTS
    t = TTS('tts_models/multilingual/multi-dataset/xtts_v2', progress_bar=False)
    sr = t.synthesizer.output_sample_rate
    locuteurs = list(getattr(t, 'speakers', None) or [])
    # Trois timbres suffisent à juger ; au-delà on encombre la page d'écoute.
    for nom in (locuteurs[:3] or [None]):
        def un(nom=nom):
            morceaux = [np.asarray(t.tts(text=p, speaker=nom, language='fr'), dtype='float32')
                        for p in PHRASES]
            etiq = f'XTTS-v2 · {nom}' if nom else 'XTTS-v2'
            cle = 'xtts-' + (str(nom).replace(' ', '_') if nom else 'defaut')
            enregistrer(cle, etiq, 'Coqui CPML — NON COMMERCIALE', morceaux, sr)
        essayer(f'XTTS · {nom}', un)

def chatterbox():
    """Chatterbox multilingue de Resemble AI. Licence MIT : utilisable sans
    réserve, contrairement à XTTS."""
    import numpy as np, torch, importlib
    # Le chemin du module a changé d'une version à l'autre. On essaie les
    # formes connues et on annonce celle qui répond, au lieu de tomber sur un
    # ImportError opaque.
    M = None
    for mod, cls in (('chatterbox.mtl_tts', 'ChatterboxMultilingualTTS'),
                     ('chatterbox.tts', 'ChatterboxMultilingualTTS'),
                     ('chatterbox', 'ChatterboxMultilingualTTS')):
        try:
            M = getattr(importlib.import_module(mod), cls)
            print(f'     module trouvé : {mod}.{cls}', flush=True)
            break
        except (ImportError, AttributeError):
            continue
    if M is None:
        import chatterbox
        raise ImportError('ChatterboxMultilingualTTS introuvable ; contenu de chatterbox : '
                          + ', '.join(a for a in dir(chatterbox) if not a.startswith('_')))
    m = M.from_pretrained(device='cpu')
    morceaux = []
    for p in PHRASES:
        w = m.generate(p, language_id='fr')
        a = w.detach().cpu().numpy() if hasattr(w, 'detach') else np.asarray(w)
        morceaux.append(np.asarray(a, dtype='float32').reshape(-1))
    enregistrer('chatterbox-fr', 'Chatterbox · Resemble AI', 'MIT', morceaux, m.sr)

if __name__ == '__main__':
    quoi = sys.argv[1] if len(sys.argv) > 1 else 'tous'
    print(f'\n── Génération des échantillons ({quoi}) ──', flush=True)
    if quoi in ('tous', 'piper'): piper()
    if quoi in ('tous', 'mms'):   essayer('MMS · Meta', mms)
    if quoi in ('tous', 'melo'):  essayer('MeloTTS', melo)
    if quoi in ('tous', 'xtts'):  xtts()
    if quoi in ('tous', 'chatterbox'): essayer('Chatterbox', chatterbox)

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
    # On juge sur CE passage, pas sur le manifeste global : celui-ci contient
    # déjà les voix des passages précédents, et sortir en succès parce qu'elles
    # sont là reviendrait à déclarer bon un moteur qui n'a rien produit.
    if not resultats:
        for e in echecs:
            print(f'  · {e}')
        sys.exit(f'Aucune voix produite par « {quoi} » lors de ce passage.')
