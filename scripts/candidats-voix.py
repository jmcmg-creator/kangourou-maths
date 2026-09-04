#!/usr/bin/env python3
"""Trouve la voix la plus naturelle pour les tables et les poésies — et le PROUVE
par des mesures, pas par une impression.

POURQUOI ENCORE UNE RECHERCHE
Neuf voix ont été écartées. Elles avaient toutes un point commun : soit un
petit modèle (plafond de naturel), soit Chatterbox SANS voix de référence — et
dans ce cas Chatterbox parle français avec sa voix par défaut, conditionnée sur
de l'anglais. Un modèle de clonage ne vaut que par ce qu'on lui donne à imiter.

L'IDÉE
On donne à Chatterbox de VRAIES voix françaises de narrateurs (livres audio du
domaine public, corpus MLS, licence CC BY 4.0), une dizaine de secondes
chacune, et on génère les mêmes quatre phrases avec chacune. Puis on NOTE :
  - DNSMOS (Microsoft) : un réseau entraîné à prédire la note qu'un jury humain
    donnerait à la qualité et au naturel d'un extrait — de 1 à 5 ;
  - l'intelligibilité : Whisper transcrit le résultat, on compare au texte
    attendu (taux d'erreur de mots). Une voix « naturelle » qui mange les
    chiffres est pire qu'une voix moyenne qui les dit tous.

Le classement croise les deux. On ne peut pas écouter d'ici ; on peut mesurer.

CE QU'IL PRODUIT
  audio/references/<nom>.wav      les extraits de référence retenus (10 s)
  echantillons/cb-<nom>.mp3       les quatre phrases avec cette voix
  echantillons/candidats.json     notes et classement
"""
import json, os, re, sys, traceback, unicodedata

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECH = os.path.join(RACINE, 'echantillons')
REFS = os.path.join(RACINE, 'audio', 'references')
os.makedirs(ECH, exist_ok=True); os.makedirs(REFS, exist_ok=True)

PHRASES = [
    "Sept fois huit, égale cinquante-six.",
    "Neuf fois sept, égale soixante-trois.",
    "Tu dis sable, et déjà, la mer est à tes pieds.",
    "Bravo Judith, aucune erreur !",
]
NB_VOIX = int(os.environ.get('NB_VOIX', '8'))

def log(*a): print(*a, flush=True)

# ── 1. Des vraies voix françaises comme références ───────────────────
def references():
    """Livres audio du domaine public lus par des francophones (MLS, CC BY 4.0).
    On prend des extraits de 7 à 13 s, un par locuteur, et on s'arrête à NB_VOIX.
    Si MLS ne se charge pas, on retombe sur FLEURS (Google, CC BY 4.0)."""
    import io, numpy as np, soundfile as sf
    from datasets import load_dataset, Audio
    retenues = []

    def decoder(a):
        """datasets ne décode plus l'audio sans torchcodec — une dépendance lourde,
        liée à une version précise de torch et de ffmpeg. On lui demande les
        octets bruts (decode=False) et on décode nous-mêmes avec libsndfile, qui
        lit flac, wav et mp3 sans rien d'autre."""
        if isinstance(a, dict) and a.get('array') is not None:
            return np.asarray(a['array'], dtype='float32'), int(a['sampling_rate'])
        octets = a.get('bytes') if isinstance(a, dict) else None
        if octets is None and isinstance(a, dict) and a.get('path'):
            octets = open(a['path'], 'rb').read()
        arr, sr = sf.read(io.BytesIO(octets), dtype='float32', always_2d=False)
        if getattr(arr, 'ndim', 1) == 2: arr = arr.mean(axis=1)
        return arr, int(sr)
    sources = [
        ('facebook/multilingual_librispeech', 'french', 'train', 'speaker_id', 'transcript', 'MLS (livres audio LibriVox), CC BY 4.0'),
        ('google/fleurs', 'fr_fr', 'train', 'id', 'transcription', 'FLEURS (Google), CC BY 4.0'),
    ]
    for nom, cfg, split, cle_loc, cle_txt, licence in sources:
        try:
            log(f'  source : {nom} / {cfg}')
            ds = load_dataset(nom, cfg, split=split, streaming=True)
            ds = ds.cast_column('audio', Audio(decode=False))
            vus = set()
            for ex in ds:
                try:
                    arr, sr = decoder(ex['audio'])
                except Exception as e:
                    log(f'    (extrait illisible : {type(e).__name__})'); continue
                dur = len(arr) / sr
                if not (7.0 <= dur <= 13.0): continue
                loc = str(ex.get(cle_loc, len(vus)))
                if loc in vus: continue
                # Un extrait trop faible ou saturé ferait une mauvaise référence.
                crete = float(np.max(np.abs(arr))) if len(arr) else 0
                if crete < 0.05 or crete > 0.99: continue
                vus.add(loc)
                tag = re.sub(r'[^a-z0-9]+', '', f'{nom.split("/")[-1]}{loc}'.lower())[:24]
                chemin = os.path.join(REFS, tag + '.wav')
                sf.write(chemin, arr, sr)
                retenues.append({'nom': tag, 'wav': chemin, 'texte': str(ex.get(cle_txt, '')), 'duree': round(dur, 1), 'source': licence})
                log(f'    ✅ {tag}  {dur:.1f}s')
                if len(retenues) >= NB_VOIX: break
        except Exception as e:
            log(f'  ❌ {nom} : {type(e).__name__}: {e}'); traceback.print_exc()
        if len(retenues) >= NB_VOIX: break
    with open(os.path.join(REFS, 'LICENCE.txt'), 'w') as f:
        f.write("Extraits de référence pour le clonage vocal.\n"
                "Sources : Multilingual LibriSpeech (Pratap et al., 2020), licence CC BY 4.0,\n"
                "lectures LibriVox du domaine public ; à défaut FLEURS (Google), CC BY 4.0.\n"
                "Chaque fichier est nommé d'après la source et l'identifiant du locuteur.\n")
    return retenues

# ── 2. Générer les quatre phrases avec chaque référence ──────────────
def charger_chatterbox():
    import importlib
    for mod in ('chatterbox.mtl_tts', 'chatterbox.tts', 'chatterbox'):
        try:
            M = getattr(importlib.import_module(mod), 'ChatterboxMultilingualTTS')
            log(f'  modèle : {mod}.ChatterboxMultilingualTTS'); return M.from_pretrained(device='cpu')
        except (ImportError, AttributeError): continue
    raise ImportError('ChatterboxMultilingualTTS introuvable')

def generer(m, ref_wav):
    import numpy as np
    bouts = []
    for p in PHRASES:
        kw = {'language_id': 'fr'}
        if ref_wav: kw['audio_prompt_path'] = ref_wav
        w = m.generate(p, **kw)
        a = w.detach().cpu().numpy() if hasattr(w, 'detach') else np.asarray(w)
        bouts.append(np.asarray(a, dtype='float32').reshape(-1))
        bouts.append(np.zeros(int(m.sr * 0.32), dtype='float32'))
    return np.concatenate(bouts), m.sr

def mp3(chemin, a, sr):
    import numpy as np, lameenc
    crete = float(np.max(np.abs(a))) or 1.0
    pcm = (np.clip(a * (0.89 / crete), -1, 1) * 32767).astype('int16')
    e = lameenc.Encoder(); e.set_bit_rate(64); e.set_in_sample_rate(int(sr)); e.set_channels(1); e.set_quality(2)
    open(chemin, 'wb').write(e.encode(pcm.tobytes()) + e.flush())

# ── 3. Noter ─────────────────────────────────────────────────────────
def a_16k(a, sr):
    import numpy as np
    if sr == 16000: return a
    n = int(len(a) * 16000 / sr)
    return np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a).astype('float32')

def note_dnsmos(a16):
    from speechmos import dnsmos
    r = dnsmos.run(a16, sr=16000)
    return {k: round(float(r[k]), 3) for k in ('ovrl_mos', 'sig_mos', 'bak_mos', 'p808_mos') if k in r}

_whisper = None
def normaliser(t):
    t = unicodedata.normalize('NFKD', t.lower())
    t = ''.join(c for c in t if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9 ]+', ' ', t).split()

def note_wer(a16):
    global _whisper
    import soundfile as sf, jiwer, tempfile
    from faster_whisper import WhisperModel
    if _whisper is None: _whisper = WhisperModel('small', device='cpu', compute_type='int8')
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        sf.write(f.name, a16, 16000); chemin = f.name
    segs, _ = _whisper.transcribe(chemin, language='fr', beam_size=3)
    entendu = ' '.join(s.text for s in segs)
    attendu = ' '.join(PHRASES)
    w = jiwer.wer(' '.join(normaliser(attendu)), ' '.join(normaliser(entendu)))
    return round(float(w), 3), entendu.strip()

def main():
    refs = references()
    if not refs: sys.exit('Aucune référence obtenue — impossible de comparer.')
    m = charger_chatterbox()
    candidats = []
    # La voix par défaut d'abord : c'est celle qui a déjà été écoutée. Elle sert
    # de point zéro dans le classement.
    for c in [{'nom': 'defaut', 'wav': None, 'texte': '', 'duree': 0, 'source': 'voix par défaut de Chatterbox'}] + refs:
        try:
            a, sr = generer(m, c['wav'])
            mp3(os.path.join(ECH, f"cb-{c['nom']}.mp3"), a, sr)
            a16 = a_16k(a, sr)
            notes = note_dnsmos(a16)
            wer, entendu = note_wer(a16)
            # Naturel (DNSMOS global, /5) moins une pénalité d'intelligibilité :
            # 10 % de mots faux coûtent 0,2 point. Une voix qui mange un chiffre
            # sur dix ne peut pas gagner sur son seul timbre.
            score = round(notes.get('ovrl_mos', 0) - 2.0 * wer, 3)
            candidats.append({**c, 'wav': os.path.relpath(c['wav'], RACINE) if c['wav'] else None,
                              **notes, 'wer': wer, 'entendu': entendu, 'score': score})
            log(f"  ✅ {c['nom']:22s} naturel {notes.get('ovrl_mos',0):.2f}  erreurs {wer*100:4.0f}%  → {score:.2f}")
        except Exception as e:
            log(f"  ❌ {c['nom']} : {type(e).__name__}: {e}"); traceback.print_exc()
    if not candidats: sys.exit('Aucun candidat noté.')
    candidats.sort(key=lambda c: c['score'], reverse=True)
    json.dump(candidats, open(os.path.join(ECH, 'candidats.json'), 'w'), ensure_ascii=False, indent=2)
    log('\n  classement :')
    for i, c in enumerate(candidats, 1): log(f"   {i}. {c['nom']:22s} {c['score']:.2f}")

if __name__ == '__main__':
    main()
