#!/usr/bin/env python3
"""Vérifie que chaque fichier de voix généré dit bien TOUT son texte.

Deux durées de poème ont éveillé le doute : « Le Chêne et le Roseau » en 20 s
pour 71 mots (attendu ≈ 32 s), « Le Renard et les Raisins » en 42 s pour 58
mots. Un modèle autorégressif peut s'arrêter avant la fin, ou repartir en
boucle. On ne peut pas écouter d'ici ; on peut faire écouter Whisper et
comparer au texte attendu, mot pour mot.

Écrit echantillons/verification.json et échoue si un poème perd plus d'un mot
sur quatre, ou si une ligne de table sur les vingt tirées au sort est fausse.
"""
import json, os, random, re, subprocess, sys, unicodedata

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOIX = os.path.join(RACINE, 'audio', 'voix')
import importlib.util as _u
_s = _u.spec_from_file_location('gv', os.path.join(RACINE, 'scripts', 'generer-voix.py'))
_gv = _u.module_from_spec(_s); _s.loader.exec_module(_gv)

_U = {'zero':0,'un':1,'une':1,'deux':2,'trois':3,'quatre':4,'cinq':5,'six':6,'sept':7,'huit':8,'neuf':9,'dix':10,
      'onze':11,'douze':12,'treize':13,'quatorze':14,'quinze':15,'seize':16,'vingt':20,'trente':30,'quarante':40,
      'cinquante':50,'soixante':60,'cent':100}
def _chiffres(mots):
    out, acc, en = [], 0, False
    for m in mots + ['\x00']:
        if m in _U:
            v = _U[m]
            if v == 100 and en: acc = (acc or 1) * 100
            elif v == 20 and en and acc % 100 == 4: acc = acc - 4 + 80
            else: acc += v
            en = True
        elif m in ('et', 'vingts') and en:
            if m == 'vingts' and acc % 100 == 4: acc = acc - 4 + 80
            continue
        else:
            if en: out.append(str(acc)); acc, en = 0, False
            if m != '\x00': out.append(m)
    return out
def normaliser(t):
    t = unicodedata.normalize('NFKD', t.lower()); t = ''.join(c for c in t if not unicodedata.combining(c))
    mots = re.sub(r'[^a-z0-9 ]+', ' ', t).split()
    return _chiffres(['fois' if m == 'x' else m for m in mots])

def main():
    import jiwer
    from faster_whisper import WhisperModel
    w = WhisperModel('small', device='cpu', compute_type='int8')
    def entendre(chemin):
        segs, _ = w.transcribe(chemin, language='fr', beam_size=3)
        return ' '.join(s.text for s in segs).strip()
    def wer(attendu, entendu):
        return float(jiwer.wer(' '.join(normaliser(attendu)), ' '.join(normaliser(entendu))))

    rapport = {'poemes': [], 'tables': []}
    poemes = json.loads(subprocess.run(['node', os.path.join(RACINE, 'scripts', 'extraire-poemes.js')], capture_output=True, text=True, check=True).stdout)
    pire = 0
    print('\n── Poèmes ──', flush=True)
    for po in poemes:
        f = os.path.join(VOIX, f"p-{po['id']}.mp3")
        if not os.path.exists(f): print(f"  ❌ {po['id']} : fichier absent"); pire = 1; continue
        ent = entendre(f); e = wer(po['texte'], ent)
        mots_att = len(po['texte'].split()); mots_ent = len(ent.split())
        drapeau = '✅' if e <= 0.25 else '❌'
        print(f"  {drapeau} {po['id']:20s} erreurs {e*100:4.0f}%  ({mots_ent}/{mots_att} mots entendus)  {os.path.getsize(f)/8000:.0f}s", flush=True)
        rapport['poemes'].append({'id': po['id'], 'wer': round(e, 3), 'mots_attendus': mots_att, 'mots_entendus': mots_ent, 'entendu': ent})
        pire = max(pire, e)
    print('\n── Tables (20 lignes tirées au sort) ──', flush=True)
    random.seed(7); faux = 0
    for a, b in random.sample([(a, b) for a in range(1, 11) for b in range(1, 11)], 20):
        f = os.path.join(VOIX, f't-{a}-{b}.mp3'); att = _gv.phrase_table(a, b); ent = entendre(f); e = wer(att, ent)
        ok = e <= 0.34   # une ligne fait 6 mots : deux mots faux, c'est une ligne fausse
        faux += 0 if ok else 1
        print(f"  {'✅' if ok else '❌'} {a}×{b}  «{ent.strip()}»", flush=True)
        rapport['tables'].append({'ligne': f'{a}x{b}', 'wer': round(e, 3), 'entendu': ent})
    json.dump(rapport, open(os.path.join(RACINE, 'echantillons', 'verification.json'), 'w'), ensure_ascii=False, indent=2)
    if pire > 0.25 or faux:
        sys.exit(f'Voix à revoir : pire poème {pire*100:.0f}% d\'erreurs, {faux} ligne(s) de table fausse(s).')
    print('\n  ✅ tout le texte est dit.')

if __name__ == '__main__':
    main()
