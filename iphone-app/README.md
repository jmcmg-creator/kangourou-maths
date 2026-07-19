# Royaume des Savoirs — Application iPhone

**Projet séparé** de la web app (à la racine du dépôt). Ne modifie **jamais** les fichiers de la web app depuis ce projet.

## Où on est

- **Web app** (production, GitHub Pages) → racine du dépôt : `index.html`, `game.js`, `exercises.js`, `exercises_extra.js`, `lecons/`, `audio/`. Continue de fonctionner sans dépendre de ce projet.
- **App iPhone** (nouveau) → ce dossier `iphone-app/`. Wrapping Capacitor + TypeScript + SQLite + moteur de sync. Ne peut pas casser la web app.

## Prérequis pour builder l'app iOS

- Node ≥ 20
- macOS + Xcode ≥ 15 (obligatoire pour toute étape iOS)
- CocoaPods (`sudo gem install cocoapods`)
- Compte Apple Developer (pour TestFlight)

## Installation

```bash
cd iphone-app
npm install
cp .env.example .env.local     # ajuste les variables si besoin
npm run cap:add:ios            # à faire UNE seule fois, sur macOS
```

## Cycle de dev

```bash
npm run dev                    # dev serveur (navigateur, WebView-like)
npm run test                   # tests unitaires
npm run typecheck              # vérif TypeScript stricte
npm run build                  # bundle prod dans dist/
npm run cap:sync               # copie dist/ vers ios/App/App/public
npm run cap:open               # ouvre Xcode
```

## Garantie de non-régression web app

À chaque build, `scripts/verify-web-app.mjs` vérifie que les fichiers clés de la web app sont intacts. Fait aussi partie de CI.

```bash
npm run verify:web-app-intact
```

## Documentation

Tout est dans `docs/` :

| Fichier | Sujet |
|---|---|
| `IPHONE_OFFLINE_AUDIT.md` | Audit initial + décision d'archi |
| `IPHONE_ARCHITECTURE.md` | Structure du code + couches |
| `WEB_APP_SEPARATION.md` | Comment web app et iOS restent indépendantes |
| `OFFLINE_MODE.md` | Ce qui marche hors ligne (et ce qui ne marche pas) |
| `DATA_MODEL.md` | Schéma SQLite + migrations |
| `SYNC_ENGINE.md` | Moteur de synchronisation |
| `CONTENT_DOWNLOADS.md` | Packs de contenus téléchargeables |
| `GAMIFICATION_SYSTEM.md` | Boucles de gamification |
| `ANALYTICS_EVENT_TAXONOMY.md` | Événements collectés |
| `PRIVACY_AND_CHILD_SAFETY.md` | RGPD, COPPA, minimisation |
| `IOS_BUILD_AND_RELEASE.md` | Xcode, signature, TestFlight, App Store |
| `UX_QA_CHECKLIST.md` | Checklist QA visuelle |
| `TEST_REPORT.md` | État des tests |
| `WEB_APP_NON_REGRESSION_REPORT.md` | Preuve de non-régression |

## Bundle ID par défaut

`com.royaumesavoirs.ios` — **à personnaliser** dans `capacitor.config.ts` avant TestFlight (doit correspondre à un App ID enregistré sur Apple Developer).
