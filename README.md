# Le Royaume des Nombres

Jeu web de mathematiques inspire du concours Kangourou, avec une direction artistique fantasy premium.

30 exercices originaux | 3 niveaux | 3 modes de jeu | 100% offline | Zero dependance

## Jouer

Ouvre `index.html` dans ton navigateur ou visite le site deploye sur GitHub Pages.

## Contenu

- **Apprenti Sorcier** (CE1-CE2) : 10 exercices
- **Chevalier du Savoir** (CM1-CM2) : 10 exercices
- **Maitre Dragon** (6e-5e) : 10 exercices

Modes : Entrainement libre, Defi chrono (60s), Quete du Dragon (difficulte croissante).

## Themes

Choisis ton ambiance dans `Accueil > Choisir un theme`. Toute l'app change (couleurs, fond, mascottes) et les enonces d'exercices sont legerement re-habilles selon le theme :

- Dragons & Sortileges (defaut)
- Animaux & Safari
- Monstrelins a Collectionner
- Ecole des Sorciers
- Royaume des Glaces

Tous les noms et visuels sont 100% originaux (publiables sur l'App Store).

## Reconnaissance vocale (poesie)

L'ecran poesie propose deux moteurs :

- **Whisper IA** (par defaut) : modele Whisper-tiny execute localement via `transformers.js`. ~40 Mo telecharges et caches a la 1re utilisation. L'audio enfant ne quitte jamais l'appareil.
- **Standard** : Web Speech API native du navigateur. Rapide mais moins precis.

Si Whisper echoue (vieux appareil, hors-ligne 1re fois), bascule automatique sur le mode standard.
