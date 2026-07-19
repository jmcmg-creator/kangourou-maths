# Séparation web app / app iPhone

## Emplacements

| Projet | Chemin | Cycle de vie | Déploiement |
|---|---|---|---|
| Web app | racine du dépôt (`../`) | Continue en prod sur GitHub Pages | Push sur `main` |
| App iPhone | `iphone-app/` | Nouveau projet, indépendant | TestFlight + App Store |

## Règle absolue

**Aucun fichier situé hors de `iphone-app/` n'est modifié par ce projet.** Les scripts de build vérifient cette invariance.

## Ce qui est copié (jamais modifié)

Script `scripts/sync-www.mjs` copie **en lecture seule** vers `iphone-app/www/static/` :

- `index.html`
- `game.js`
- `exercises.js`
- `exercises_extra.js`
- `manifest.json`
- `sw.js`
- `lecons/` (récursif)
- `audio/` (récursif, MP3 uniquement quand présents)

Ces fichiers sont dans `.gitignore` de `iphone-app/` — la copie est générée à chaque build, jamais commitée.

## Ce qui est partagé

**Rien de fragile.** Aucun package npm partagé, aucun symlink. La seule chose partagée = le contenu de la web app, copié à la construction.

## Comment lancer chaque projet séparément

**Web app** (inchangée) :
```bash
# racine du dépôt
python3 -m http.server 8000
# ou : npx serve
```

**App iPhone** :
```bash
cd iphone-app
npm install
npm run dev              # dev navigateur
npm run cap:sync         # après cap:add:ios
npm run cap:open         # Xcode
```

Les deux commandes n'entrent en conflit sur aucun port, aucun fichier, aucune dépendance.

## Comment mettre à jour le contenu web depuis l'app iPhone

Quand la web app évolue (nouvel exercice, nouvelle leçon), rien à faire côté iPhone : `npm run build` relance `sync-www.mjs` qui reprend les fichiers à jour. Le CI iOS regénère.

## Comment supprimer l'app iPhone sans casser la web app

```bash
git checkout main
rm -rf iphone-app/
git commit -am "chore: retire projet iPhone"
```

La web app continue de fonctionner exactement comme avant. Aucun de ses fichiers n'a été modifié pendant l'existence du projet iPhone.

## Vérification automatisée

`scripts/verify-web-app.mjs` calcule les SHA-256 des fichiers clés de la web app **avant** et **après** un build iPhone. Différence non nulle = échec du build. Bloque le commit.
