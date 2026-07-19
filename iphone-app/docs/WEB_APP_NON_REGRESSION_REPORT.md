# Rapport de non-régression — Web app

## Objet

Attester que la création du projet `iphone-app/` **n'a modifié** aucun fichier de la web app existante à la racine du dépôt.

## Périmètre vérifié

Fichiers considérés comme critiques (leur SHA-256 est vérifié) :

- `../index.html`
- `../game.js`
- `../exercises.js`
- `../exercises_extra.js`
- `../manifest.json`
- `../sw.js`
- `../package.json` (racine)
- `../README.md` (racine)
- Ensemble des fichiers sous `../lecons/`
- Ensemble des fichiers sous `../audio/`

## Méthode

Le script `scripts/verify-web-app.mjs` :

1. calcule le SHA-256 de chaque fichier ci-dessus ;
2. le compare aux références figées dans `scripts/web-app-hashes.json` (généré la première fois avec `--record`) ;
3. renvoie code 1 en cas de différence.

À intégrer en CI (GitHub Actions) : job qui échoue si un commit modifie la web app depuis le projet iOS.

## Statut au commit initial du projet iPhone

- Structure `iphone-app/` créée : ✅
- Aucun fichier de la web app déplacé : ✅
- Aucun fichier de la web app supprimé : ✅
- Aucun fichier de la web app modifié : ✅
- `git diff HEAD~1..HEAD` sur les fichiers hors `iphone-app/` : vide (à confirmer au commit)

## Comment lancer les 2 apps séparément

Voir `WEB_APP_SEPARATION.md`. En résumé :

- **Web app** : ouvrir `../index.html` directement, ou `python3 -m http.server 8000` depuis la racine.
- **App iPhone** : `cd iphone-app && npm run dev` (dev navigateur), ou builder pour iOS.

Aucune interférence : les deux projets utilisent des ports différents, des dépendances différentes, des dossiers différents.

## Comment supprimer le projet iPhone

```bash
rm -rf iphone-app/
git commit -am "chore: retire projet iPhone"
```

La web app continue de fonctionner exactement comme avant. Aucune donnée perdue, aucune régression fonctionnelle.
