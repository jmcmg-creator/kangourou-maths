# Architecture — App iPhone

## Vue d'ensemble en couches

```
┌───────────────────────────────────────────────────────────────┐
│                    UI (WebView Capacitor)                     │
│   www/index.html + game.js (web app)  +  shim/ios-shim.js     │
└──────────────┬────────────────────────────────────────────────┘
               │  window.Bridge (API exposée par le shim)
┌──────────────┴────────────────────────────────────────────────┐
│                 Couche adapters (TypeScript)                  │
│  src/native/*, src/db/*, src/sync/*, src/analytics/*,         │
│  src/network/*, src/downloads/*                               │
└──────────────┬────────────────────────────────────────────────┘
               │  Plugins Capacitor
┌──────────────┴────────────────────────────────────────────────┐
│    Natif iOS : SQLite • Keychain • Haptics • Network •        │
│                StatusBar • Preferences • Splash               │
└───────────────────────────────────────────────────────────────┘
```

## Couches TypeScript (src/)

- **`src/db/`** — Wrapper `@capacitor-community/sqlite`, schéma versionné, migrations, repositories (Profile, Progress, Session, Reward, SyncQueue, AnalyticsQueue, DownloadPack).
- **`src/sync/`** — Moteur de synchronisation : file locale, batching, retry avec backoff, résolution de conflits, événements online/offline.
- **`src/analytics/`** — Abstraction fournisseur. Une seule interface `Analytics`, implémentations `PostHogProvider`, `AmplitudeProvider`, `NoopProvider`. Choix par env.
- **`src/network/`** — Détection connectivité (via `@capacitor/network`), machine à états `online | offline | limited | syncing | syncError`.
- **`src/downloads/`** — Gestionnaire de packs de contenus (audio, illustrations lourdes), progression, pause, reprise, vérif d'intégrité.
- **`src/native/`** — Petits wrappers autour de plugins Capacitor : haptics, keychain (via SecureStorage), status bar, biometric.
- **`src/gamification/`** — Règles pures de gamification : calcul XP, seuils de niveau, quêtes journalières. Testable sans DOM.
- **`src/bootstrap.ts`** — Point d'entrée qui initialise DB → analytics → network → sync → expose `window.Bridge`.

## Bridge Web ↔ Natif

Le shim `www/shim/ios-shim.js` détecte `Capacitor.isNativePlatform()` et remplace :

- `localStorage.setItem(k, v)` → `Bridge.storage.set(k, v)` (SQLite)
- `localStorage.getItem(k)` → `Bridge.storage.get(k)` (SQLite)
- `fetch()` vers l'API → passe par la couche réseau centralisée avec retry
- `speechSynthesis` (fallback) → voix iOS de meilleure qualité si disponible
- `SpeechRecognition` → plugin Speech framework Apple

Le shim est chargé **avant** `game.js` dans `www/index.html`. Le reste de `game.js` continue de fonctionner sans modification, y compris en mode dev navigateur (le shim se met en no-op si `Capacitor` n'est pas disponible).

## Séparation des responsabilités

- Aucun composant UI n'accède directement à `fetch`, `localStorage` ou aux plugins Capacitor. Tout passe par `window.Bridge` ou par les adapters TS.
- Les adapters TS ne connaissent pas le DOM. Ils sont testables en isolation avec vitest.
- Les repositories retournent des types stricts (pas de `any`).

## Bundle

- Vite bundle `src/bootstrap.ts` → un seul JS chargé en premier dans `www/index.html`.
- Les fichiers copiés depuis la web app (game.js, exercises*.js, lecons/) ne sont pas retraités par Vite : ils sont servis tels quels par WebView, comme sur GitHub Pages.
- Résultat : le comportement en dev iOS est très proche du comportement en prod web.

## Point d'entrée iOS natif

Après `npx cap add ios`, le projet Xcode `ios/App/App.xcworkspace` est créé. On ne touche PAS aux Swift générés par Capacitor sauf pour :

- `Info.plist` : descriptions de permissions (micro, notifications), URL schemes, `UILaunchStoryboardName`.
- `App/App/Assets.xcassets` : icônes, splash.
- `Podfile` : ajouter les plugins Capacitor.

Toutes ces modifications sont documentées dans `IOS_BUILD_AND_RELEASE.md`.
