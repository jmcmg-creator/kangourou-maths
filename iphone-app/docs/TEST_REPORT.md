# Rapport de tests

Cet état est mis à jour à chaque livraison. Il distingue :

- **Implémenté et testé** ✅
- **Implémenté, test à écrire** 🚧
- **À faire (nécessite macOS/Xcode)** ⏳

## v0.1.0 — Scaffold initial

### Socle TypeScript

| Composant | Statut |
|---|---|
| Config Vite + TS strict | ✅ `npm run typecheck` passe |
| Wrapper SQLite (interface + implémentation mémoire pour tests) | ✅ tests unitaires |
| Migrations 001_initial | ✅ créée + testée en mémoire |
| Repository Profile | ✅ CRUD testé |
| Repository Progress | ✅ CRUD testé |
| Repository SyncQueue | ✅ enqueue + fetch pending testés |
| SyncEngine (queue → HTTP → done/failed) | ✅ scénarios online/offline/failure testés (fetch mocké) |
| Analytics abstraction + Noop provider | ✅ testé |
| Network state machine | 🚧 tests à écrire |
| DownloadManager | 🚧 scaffold uniquement |
| Native/Keychain wrapper | 🚧 scaffold, non testé |
| Bootstrap.ts | 🚧 vérif manuelle uniquement |

### Web app (`www/`)

| Composant | Statut |
|---|---|
| Shim iOS (`ios-shim.js`) | ✅ redirige localStorage vers Bridge |
| Copie contenus (`sync-www.mjs`) | ✅ testé, contenu bien répliqué |
| Vérif non-régression (`verify-web-app.mjs`) | ✅ retourne code 0 quand la web app est intacte |

### Non-régression web app

`scripts/verify-web-app.mjs` : ✅ passe. Aucun fichier de la web app n'a été modifié.

### iOS natif

⏳ Tout ce qui suit nécessite macOS + Xcode :

- `npx cap add ios` → génération du projet Xcode
- Build du projet Xcode
- Test sur simulateur
- Test sur device
- Archive
- Upload TestFlight
- Test QA UX complet

## Comment lancer les tests

```bash
cd iphone-app
npm install                # (nécessaire une fois)
npm run typecheck          # vérification TypeScript stricte
npm run test               # tests unitaires (vitest)
npm run test:watch         # mode watch
npm run verify:web-app-intact
```

## Simulations réseau

Le harness de test (`tests/unit/sync-engine.test.ts`) inclut des mocks pour simuler :

- Absence totale de réseau
- Réponse 429 (rate limit)
- Réponse 500 (erreur serveur)
- Réponse 401 (auth expirée)
- Timeout
- Retour de connexion en cours de sync

## Non-régression

Le script `verify-web-app.mjs` compare les SHA-256 des fichiers critiques de la web app à des empreintes de référence figées dans le script. En cas de différence, il faut soit :
- corriger le build iOS qui a altéré un fichier (bug à corriger),
- soit mettre à jour la référence si la modif de la web app est légitime (commit séparé, à valider hors PR iOS).

## Prochaines vagues de tests

**v0.2 (après premier build iOS macOS)** : ajouter tests E2E avec Detox ou Maestro sur simulateur.

**v0.3** : passer la QA UX du checklist sur les 3 tailles d'écran.
