# 📱 App iOS — Build TestFlight via Codemagic (sans Mac)

Le dossier `iphone-app/` contient le wrapper Capacitor : il embarque l'app web
complète (exercices, leçons, inventions, memory, poésies) dans une vraie app
iOS **100% offline dès le premier lancement**.

Le build se fait **dans le cloud** sur les Mac de Codemagic — pas besoin de
posséder un Mac.

## Pré-requis (une seule fois)

### 1. Compte Apple Developer — 99 $/an
https://developer.apple.com → Enroll. Validation : 24-48 h.

### 2. Créer l'app dans App Store Connect
1. https://appstoreconnect.apple.com → Apps → ➕ → New App
2. Platform **iOS** · Name **Royaume des Savoirs** · Language **French**
3. Bundle ID : **com.royaumesavoirs.ios**
   (à créer d'abord dans https://developer.apple.com/account/resources/identifiers
   → Identifiers ➕ → App IDs → App → explicit `com.royaumesavoirs.ios`)
4. SKU : `royaume-savoirs-1`

### 3. Clé API App Store Connect
1. App Store Connect → Users and Access → **Integrations** → App Store Connect API
2. ➕ Generate API Key · Name `Codemagic` · Access **App Manager**
3. Télécharge le fichier `.p8` (⚠️ téléchargeable UNE seule fois),
   note **Issuer ID** et **Key ID**

### 4. Codemagic
1. https://codemagic.io → Sign up (avec ton compte GitHub)
2. Add application → ce repo → type **Other** (le `codemagic.yaml` à la racine
   sera détecté automatiquement)
3. Teams → Personal Account → **Integrations** → Developer Portal → App Store
   Connect → ➕ : nom **`RoyaumeKey`** (exactement — le yaml y fait référence),
   colle Issuer ID, Key ID et le fichier .p8

## Lancer un build

Codemagic → ton app → **Start new build** → workflow *Royaume des Savoirs to
TestFlight* → Start. ~15-25 min plus tard, le build apparaît dans App Store
Connect → TestFlight.

Le numéro de build est auto-incrémenté (compteur Codemagic) : tu peux
enchaîner les builds sans conflit TestFlight.

## Tester sur ton iPhone

1. Installe **TestFlight** depuis l'App Store sur l'iPhone
2. App Store Connect → TestFlight → Internal Testing → ➕ ajoute ton Apple ID
3. Tu reçois un mail/notification → installe → l'app est sur ton écran d'accueil

## Ce qui est déjà configuré dans ce dossier

- `capacitor.config.json` — appId `com.royaumesavoirs.ios`, nom, fond sombre
- `scripts/build-www.mjs` — copie l'app web dans `www/` (tout embarqué)
- `ios/App/App/Info.plist` — déjà patché :
  - `NSMicrophoneUsageDescription` (poésies/récitation — obligatoire sinon
    crash au premier accès micro)
  - `NSSpeechRecognitionUsageDescription`
  - `ITSAppUsesNonExemptEncryption=false` (évite la question chiffrement à
    chaque upload TestFlight)
  - Localisation `fr`
- Signing : géré automatiquement par Codemagic (`xcode-project use-profiles`)
  via l'intégration `RoyaumeKey` — aucun certificat à manipuler à la main

## Mettre à jour l'app après des changements web

L'app embarque une copie du site : après chaque évolution de `game.js` &co,
relance simplement un build Codemagic → nouveau build TestFlight.
(Plus tard on pourra pointer le wrapper vers le site en ligne pour des mises
à jour instantanées, mais l'embarqué = App Store review plus simple + offline
garanti.)

## Prochaine étape après TestFlight : soumission App Store

- Screenshots iPhone 6,7" + 6,1" (captures depuis TestFlight)
- Politique de confidentialité : `confidentialite.html` est déjà dans le repo →
  URL GitHub Pages à renseigner dans App Store Connect
- Catégorie **Éducation** (la catégorie *Made for Kids* impose des règles
  supplémentaires — à décider ensemble)

## Deux workflows disponibles (Start new build)

| Workflow | Signature | Configuration en plus |
|---|---|---|
| **Royaume des Savoirs to TestFlight** (recommandé) | Automatique (`ios_signing`) — Codemagic crée et stocke le certificat via l'intégration RoyaumeKey | Aucune |
| Royaume des Savoirs to TestFlight (signature manuelle CLI) | `app-store-connect fetch-signing-files --create` | Variable secrète `CERTIFICATE_PRIVATE_KEY` obligatoire |

### Si tu choisis le workflow « signature manuelle CLI »

1. Génère UNE clé RSA (une seule fois, n'importe où : Mac/Linux/Git Bash Windows) :
   `openssl genrsa 2048`
2. Copie tout le bloc `-----BEGIN RSA PRIVATE KEY----- … -----END RSA PRIVATE KEY-----`
3. Codemagic → ton app → Environment variables :
   - Name : `CERTIFICATE_PRIVATE_KEY` · Value : la clé · Group : `signing` · ✅ Secret
4. ⚠️ Garde TOUJOURS la même clé : une clé neuve à chaque build créerait un
   nouveau certificat à chaque fois, et Apple limite à 2 certificats de
   distribution — le 3ᵉ build échouerait.

Sans cette variable, l'étape « Set up code signing » échoue avec
« certificate private key not provided ». Le workflow automatique n'a pas
ce problème.
