# AGENTS.md

Consignes pour tout agent qui travaille sur ce dépôt (Codex, Claude Code, autre).

## Le projet

« Le Royaume des Nombres » / « Le Royaume des Savoirs » : jeu web éducatif en français,
inspiré du concours Kangourou. Un seul dépôt, deux cibles :

- le web, publié par GitHub Pages depuis ce dépôt ;
- l'app iOS, empaquetée avec Capacitor (`iphone-app/`), construite par Codemagic,
  distribuée sur TestFlight.

## Règles non négociables

1. **Zéro dépendance à l'exécution.** HTML, CSS et JavaScript vanilla. Le jeu doit
   fonctionner 100 % hors connexion. Aucun framework, aucun bundler, aucun appel à un
   CDN dans les pages servies. Les seules dépendances npm sont des outils de
   développement.
2. **Contenu en français.**
3. **Jamais de `push --force`, jamais de commit direct sur `main`.** On travaille sur une
   branche et on ouvre une pull request.
4. **Jamais de tag `v*`.** Un tag déclenche un build Codemagic et une livraison
   TestFlight. La livraison est une décision de Julien (voir « Livrer une version »).

## Carte du dépôt

| Chemin | Rôle |
|---|---|
| `index.html` | coquille de l'app, référence les scripts en `fichier.js?v=NN` |
| `game.js` | moteur du jeu |
| `exercises.js`, `exercises_extra.js`, `exercises_logic.js` | banque d'exercices |
| `qr.js`, `cartes-monde.js`, `supa.js`, `config.js` | modules annexes |
| `sw.js` | service worker, cache hors connexion |
| `scripts/` | outils et tests (Node `.mjs`, Python) |
| `docs/` | `LIVRER-UNE-VERSION.md`, `BATTLE-AMIS.md`, `EPINGLER-ACTIONS.md` |
| `iphone-app/` | projet Capacitor iOS, voir `iphone-app/SETUP.md` |
| `codemagic.yaml` | workflows de build iOS et envoi TestFlight |
| `.github/workflows/` | livraison, sécurité, vérification des questions, audio |
| `VERSION` | numéro de la version livrée aux testeurs |

## Le piège du cache, à lire avant de modifier un fichier servi

Deux numéros distincts, à ne jamais confondre :

- `VERSION` à la racine : la version livrée aux testeurs (`2.4` au moment d'écrire).
- Le numéro de cache : `?v=NN` derrière chaque script dans `index.html`, la **même**
  valeur dans la liste de pré-cache de `sw.js`, et `CACHE_VERSION` en tête de `sw.js`
  (`royaume-v44` au moment d'écrire).

Toute modification d'un fichier JS servi impose d'incrémenter son `?v=NN` **aux deux
endroits**. Un décalage ne se voit pas tant qu'il y a du réseau, puis empêche l'app de
démarrer hors connexion. `scripts/test-versions.mjs` vérifie cette concordance.

## Avant d'ouvrir une pull request

```bash
npm test                     # battle, échappement, versions, drapeaux, livraison, sujets, cartes
npm run verify:questions     # banque d'exercices (LIMIT=20 pour un échantillon)
```

Node 20 minimum.

## Livrer une version (à ne faire que sur instruction explicite)

Livrer, c'est changer le seul numéro du fichier `VERSION` à la racine et pousser sur
`main`. Le workflow « Livrer une version » lit le numéro, pose le tag `vX.Y`, et
Codemagic construit l'IPA puis l'envoie sur TestFlight. Environ quinze minutes.

Ne jamais poser le tag soi-même. Repousser un numéro déjà livré ne relivre rien.
Détails et garde-fous : `docs/LIVRER-UNE-VERSION.md`.

## Style

Messages de commit et titres de pull request en français, une phrase qui dit ce que le
changement apporte au joueur plutôt que le fichier touché. Exemple existant dans
l'historique : « Les capitales se placent sur le pays, et trois continents s'ouvrent l'un
après l'autre ».
