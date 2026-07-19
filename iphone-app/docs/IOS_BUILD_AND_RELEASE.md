# Build iOS, signature, TestFlight, App Store

## Prérequis (une fois)

1. macOS récent
2. Xcode ≥ 15 depuis l'App Store
3. Command Line Tools : `xcode-select --install`
4. CocoaPods : `sudo gem install cocoapods`
5. Compte Apple Developer (99 $/an) — obligatoire pour TestFlight
6. Node 20+

## Étape 1 — Générer le projet iOS

Depuis `iphone-app/` :

```bash
npm install
npm run build                # produit dist/
npx cap add ios              # crée ios/App/App.xcworkspace
```

Le dossier `ios/` généré doit être committé (sauf les artefacts listés dans `.gitignore` : `Pods/`, `build/`, `xcuserdata/`).

## Étape 2 — Config Xcode

Ouvre le workspace :

```bash
npm run cap:open
```

Dans Xcode :

- **Signing & Capabilities** :
  - Team : ton équipe Apple Developer
  - Bundle Identifier : `com.royaumesavoirs.ios` (ou celui que tu as enregistré)
  - Automatic signing ON
- **Info.plist** : les descriptions de permissions suivantes sont **obligatoires** (déjà décrites dans les commentaires de `capacitor.config.ts`, à ajouter manuellement dans `Info.plist`) :

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Le micro sert à écouter tes poésies quand tu les récites. Rien n'est enregistré.</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>La reconnaissance vocale sert à vérifier ta récitation, uniquement sur ton iPhone.</string>
<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

- **Assets.xcassets** : remplacer `AppIcon` (icône, 1024x1024 requis) et `Splash` par les visuels finaux (à préparer dans `assets/icons/` et `assets/splash/`).
- **Deployment target** : iOS 15.0 minimum recommandé (couvre iPhone 6s et +).

## Étape 3 — Build local

```bash
npm run cap:sync             # copie dist/ dans ios/App/App/public
```

Dans Xcode : Product → Run (⌘R) sur un simulateur iPhone.

## Étape 4 — Archive pour TestFlight

Dans Xcode :

1. Sélectionner « Any iOS Device (arm64) » comme destination.
2. Product → Archive.
3. À la fin : Distribute App → App Store Connect → Upload.
4. Suivre les invites (Automatic signing, App Store Connect API Key ou identifiants).

## Étape 5 — App Store Connect

Sur https://appstoreconnect.apple.com :

1. Créer une app : « Royaume des Savoirs » (ou nom retenu).
2. Compléter :
   - Métadonnées (nom, sous-titre, description, mots-clés, catégorie « Éducation »)
   - Screenshots (6.7", 6.5", 5.5")
   - Icône (1024x1024, sans transparence, sans coins arrondis Apple les ajoute)
   - Age Rating : 4+
   - Section « App Privacy » : voir `PRIVACY_AND_CHILD_SAFETY.md`
   - Politique de confidentialité (URL obligatoire pour les apps enfants)
   - Aide en ligne (URL)
3. TestFlight : ajouter des testeurs internes (jusqu'à 100 sur ton équipe) puis externes (jusqu'à 10 000, revue Apple légère).

## Étape 6 — Soumission App Store

1. Attendre la fin d'un cycle TestFlight (au moins 1-2 semaines de retours).
2. Sélectionner la build dans App Store Connect.
3. Soumettre pour revue.
4. Délai typique : 24-48 h.

## Cycle de mise à jour

- Corrige / améliore
- `npm run cap:sync`
- Bump du build number dans Xcode
- Product → Archive → Upload
- Nouvelle build dans TestFlight puis App Store

## Certificats et signature

Automatic signing géré par Xcode. Si l'organisation exige des certificats explicites, procédure :

1. Apple Developer → Certificates : créer un « iOS Distribution ».
2. Apple Developer → Identifiers : App ID `com.royaumesavoirs.ios`.
3. Apple Developer → Profiles : Provisioning Profile lié.
4. Import dans Xcode → Preferences → Accounts → Manage Certificates.

## Environnements

- **Dev** : simulateur local, API pointant vers le Worker de dev éventuel.
- **Staging** : TestFlight interne, `.env.staging` distinct.
- **Prod** : App Store, `.env.production`.

Ces fichiers d'env ne sont **pas** committés. Un fichier `.env.example` sert de modèle.

## Ce qu'on n'a pas pu faire dans le dépôt actuel

- L'exécution effective de `npx cap add ios` : elle nécessite macOS + Xcode CLI.
- La génération de l'icône 1024x1024 et du splash aux formats iOS : à faire avec un outil (ex. `@capacitor/assets`).
- L'archive et l'upload TestFlight : nécessitent Xcode.

Ces étapes sont documentées ci-dessus et attendent un environnement macOS.
