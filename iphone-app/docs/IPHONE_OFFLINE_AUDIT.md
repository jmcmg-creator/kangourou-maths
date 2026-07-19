# Audit initial et décision d'architecture — App iPhone offline-first

## 1. Architecture existante (web app)

- **Frontend** : HTML/CSS/JS vanilla, 1 fichier monolithique `game.js` (~3000 lignes), interface unique dans `index.html`.
- **Stockage** : `localStorage` (clés `royaume_v3`, `royaume_profiles_v1`, `royaume_active_v1`, `royaume_aid`).
- **Sync cloud** : Worker Cloudflare `royaume-api.square-paris75.workers.dev`. AID dérivé du prénom (SHA-256) sert de clé.
- **Backend** : Worker Cloudflare (KV) pour profils + endpoint `/generate` OpenAI (exercices IA).
- **Contenu** : ~950 exercices statiques (`exercises.js` + `exercises_extra.js`), 12 leçons interactives (`lecons/*.html`), 8+ fables + 1 poésie (audio MP3 générés par workflow GitHub Actions).
- **Hébergement** : GitHub Pages depuis `main`.
- **PWA** : `manifest.json` + `sw.js` (installable, offline via service worker).
- **Pas de framework** : ni React, ni Vue, ni Svelte. Vanilla JS.

## 2. Fonctionnalités identifiées

Profils multiples, sélecteur, quiz par niveau (CP → 6e), 9 royaumes (Maths, Culture, Sciences, Poésies, Langues, Informatique, Art, Logique, Géographie), leçons interactives, poésies (écoute + récitation micro), Espace Parent, sync cross-device, génération IA d'exercices, fiches bilan, PWA.

## 3. Éléments réutilisables

| Élément | Réutilisation |
|---|---|
| `exercises.js` + `exercises_extra.js` | **Copie** vers `www/static/` (contenu figé, on ne le retouche pas) |
| `lecons/*.html` | **Copie** telle quelle |
| `audio/*.mp3` (quand générés) | **Copie** ou téléchargement à la demande |
| `game.js` | **Copie + shim iOS** : on ne le réécrit pas, on l'enveloppe |
| Design tokens | **Extrait** de `index.html` vers `src/ui/tokens` |
| Logique de scoring / rotation d'exercices | Réutilisée depuis `game.js` via shim |
| Sync AID (SHA-256 du nom) | Réutilisée telle quelle |

## 4. Dépendances réseau — classification

| Dépendance | Rôle | Catégorie | Comportement hors ligne prévu |
|---|---|---|---|
| Worker `/profile/:aid` GET/PUT | Sync profil cross-device | Utile mais facultative | File d'attente locale, retry au retour du réseau |
| Worker `/generate` | Génération IA d'exercices | Utile mais facultative | Silencieux ; l'app tourne avec les 950 exos statiques |
| Google Fonts (Fredoka, Quicksand) | Typographie | **Inutile embarquée** | Polices bundlées dans l'app iOS |
| GitHub Pages | Hébergement | N/A (l'app iOS est autonome) | — |
| Audio MP3 des poésies | Récitation | Téléchargeable | Voix Web Speech de secours (déjà en place) |

## 5. Risques techniques

- **localStorage → SQLite** : le shim iOS doit intercepter `localStorage.getItem/setItem` pour rediriger vers SQLite. Sinon les données ne survivent pas aux mises à jour d'app iOS.
- **Web Speech API** : Safari WebView iOS supporte la synthèse mais **pas** la reconnaissance (`SpeechRecognition` absente). La récitation micro nécessite un plugin natif (Speech framework Apple) ou Whisper local.
- **CORS** : le Worker Cloudflare doit accepter l'origine `capacitor://localhost` (à valider côté worker).
- **Espace disque** : les MP3 des poésies + packs de contenu peuvent gonfler ; gestionnaire d'espace obligatoire.

## 6. Décision : Capacitor + TypeScript (pas de réécriture SwiftUI)

**Choix : Capacitor 6 + TypeScript + Vite**. Justifications :

1. La web app est déjà 100 % HTML/JS vanilla, pas de framework à porter.
2. ~15 000 lignes de contenu pédagogique + 8 000 lignes de logique de jeu déjà éprouvées en prod.
3. Une réécriture SwiftUI = 2-3 mois pour dupliquer ce qui marche déjà.
4. Capacitor permet d'accéder à SQLite, Keychain, Haptics, Network, StatusBar via plugins officiels.
5. Le seul vrai risque (reconnaissance vocale native) se gère par un plugin dédié, pas besoin de tout réécrire.

Une **réévaluation** est prévue dans le doc `IPHONE_ARCHITECTURE.md` si la WebView pose des soucis de perf inacceptables sur iPhone SE / 8 (les cibles bas de gamme).

## 7. Séparation web app / iPhone

- La web app **reste à la racine** du dépôt, servie par GitHub Pages.
- L'app iOS vit **entièrement** dans `iphone-app/`.
- Passerelle : script `scripts/sync-www.mjs` qui **copie** (ne symlink pas) les fichiers de la web app vers `iphone-app/www/static/` avant chaque build.
- La copie est unidirectionnelle. On ne modifie jamais les fichiers de la web app depuis `iphone-app/`.
- Contrôle CI : `scripts/verify-web-app.mjs` compare les hashes des fichiers clés de la web app avant et après build de l'app iOS.

## 8. Fonctionnalités prévues hors ligne (v1)

- Sélection de profil
- Toutes les activités des 950 exercices statiques
- Les 12 leçons interactives
- Le Royaume de l'Ingénieur (20 machines)
- Récitation de poésies (avec voix synthétique iOS ; MP3 studio si téléchargés)
- Espace Parent (consultation, stats, réglages)
- Personnalisation d'avatar (via des accessoires embarqués)
- Suivi de progression, cristaux, XP, dragonnets

## 9. Fonctionnalités qui restent en ligne

- Sync cross-device
- Génération IA d'exercices supplémentaires
- Téléchargement de packs de contenus (audio MP3, packs à venir)
- Envoi des événements analytics (mais collectés hors ligne d'abord)

## 10. Plan de migration en 3 phases

**Phase 1 — Cette PR** : scaffolding complet (arborescence, config Capacitor, docs, socle TS pour DB/sync/analytics/network, shim iOS, tests unitaires du socle). **Aucun code natif iOS n'est encore compilé** (Xcode requis).

**Phase 2** : `npx cap add ios` sur macOS, adaptation des icônes/splash, plugins natifs installés, premier build local, premières UI iPhone (safe areas, haptics, StatusBar).

**Phase 3** : TestFlight interne, correctifs UX, gestionnaire de téléchargement, migration `localStorage` → SQLite via shim, refonte visuelle sélective des écrans clés (accueil, sélection profil, résultats, récompenses).

## 11. Limites connues

- L'App Store impose une revue humaine ; certaines mécaniques (analytics par ex.) doivent être opt-in explicites côté parent, pas activées par défaut.
- Le pool d'exercices dépasse largement le seuil des 4 Mo de bundle initial d'App Store, mais reste bien en dessous des limites (limite pratique ≈ 200 Mo pour l'App Store, notre bundle initial ≈ 15-20 Mo).
- La reconnaissance vocale via Speech framework Apple nécessite déclaration explicite d'usage (`NSSpeechRecognitionUsageDescription`) + `NSMicrophoneUsageDescription` dans `Info.plist`.
