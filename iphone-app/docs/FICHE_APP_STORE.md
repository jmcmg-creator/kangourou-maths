# Fiche App Store — Le Royaume des Savoirs

Tout est prêt à copier-coller dans App Store Connect dès que le compte Apple Developer est actif.

---

## Informations générales

| Champ | Valeur |
|---|---|
| **Nom de l'app** (30 car. max) | Le Royaume des Savoirs |
| **Sous-titre** (30 car. max) | Apprendre en s'amusant, du CP à la 5e |*
| **Bundle ID** | com.royaumesavoirs.ios |
| **SKU** | royaume-savoirs-ios-001 |
| **Catégorie principale** | Éducation |
| **Catégorie secondaire** | Jeux → Éducatif |
| **Classification d'âge** | 4+ |
| **Prix** | Gratuit |
| **Langue** | Français |

\* 38 caractères — trop long. Alternatives ≤ 30 : « Apprendre en s'amusant » (22) ou « Maths, sciences, poésie & + » (27).

## Sous-titre retenu (recommandation)

```
Apprendre en s'amusant
```

## Texte promotionnel (170 car. max — modifiable sans re-soumission)

```
9 royaumes magiques, 46 niveaux, 950 exercices : maths, sciences, poésie, langues… Une aventure éducative complète, sans pub et 100 % hors ligne.
```

## Description

```
Bienvenue au Royaume des Savoirs, une aventure magique où ton enfant apprend en s'amusant, du CP à la 5e.

NEUF ROYAUMES À EXPLORER
• Maths — calcul, logique et problèmes inspirés du concours Kangourou
• Sciences — 12 leçons interactives pour comprendre le monde
• Poésie — récite tes poésies et l'app t'écoute (Victor Hugo et bien d'autres)
• Langues, Culture, Informatique, Art, Logique, Géographie…

UNE VRAIE PROGRESSION
• 46 niveaux, 950 exercices originaux
• Des étages de progression : d'Apprenti Dragonneau à Maître Dragon
• XP, cristaux et dragonnets à débloquer
• Quêtes journalières et défis chrono

PENSÉE POUR LES ENFANTS, RESPECTUEUSE DES PARENTS
• Aucune publicité, aucun achat intégré
• Fonctionne 100 % hors ligne, partout
• Espace Parent protégé par PIN
• Aucune donnée personnelle collectée : pas de nom réel, pas de géolocalisation, rien
• Le micro sert uniquement à écouter les récitations de poésie — rien n'est enregistré ni transmis

PLUSIEURS ENFANTS, UN SEUL IPHONE
Chaque enfant a son profil, son avatar et sa progression. La synchronisation optionnelle permet de retrouver sa progression sur un autre appareil.

Rejoins le Royaume : les dragons t'attendent !
```

## Mots-clés (100 car. max, séparés par des virgules, sans espaces)

```
maths,enfant,kangourou,CP,CE1,CE2,CM1,CM2,6e,éducatif,poésie,sciences,calcul,jeu,école,réviser
```
(97 caractères)

## URLs

| Champ | Valeur |
|---|---|
| **Politique de confidentialité** (obligatoire) | https://jmcmg-creator.github.io/kangourou-maths/confidentialite.html |
| **URL d'assistance** (obligatoire) | https://jmcmg-creator.github.io/kangourou-maths/ |
| **URL marketing** (optionnel) | https://jmcmg-creator.github.io/kangourou-maths/ |

## Section « App Privacy » (questionnaire Apple)

Réponses à cocher :

1. **Do you collect data from this app?** → Yes (à cause de la sync optionnelle)
2. **Identifiers → User ID** : Collected, **linked to user**, **not used for tracking**, purpose: App Functionality (l'AID pseudonyme SHA-256)
3. **Usage Data → Product Interaction** : Collected, linked to user, not used for tracking, purpose: App Functionality (progression sync) — et Analytics **uniquement si** les stats opt-in sont activées
4. Tout le reste : **Not collected** (pas de nom, contact, localisation, photos, achats, historique navigation, IDFA…)
5. **Tracking** : No

## Age Rating (questionnaire)

Toutes les réponses à « None » (violence, contenu sexuel, jeux d'argent, etc.) → résultat **4+**.
« Made for Kids » : cocher la tranche **6–8 ans** (recommandé) — l'app entre alors dans la catégorie Enfants, cohérente avec la politique de confidentialité.

## Screenshots requis (à faire depuis le simulateur Xcode)

| Taille | Appareil simulateur | Nombre |
|---|---|---|
| 6,9" (1320 × 2868) | iPhone 16 Pro Max | 3 à 10 |
| 6,5" (1284 × 2778 ou 1242 × 2688) | iPhone 15 Plus / 11 Pro Max | 3 à 10 |

Suggestion de séquence : 1) écran d'accueil des 9 royaumes, 2) un exercice de maths, 3) la carte de progression/niveaux, 4) récitation de poésie, 5) l'écran de récompenses (dragonnets).
Dans le simulateur : **⌘S** sauvegarde un screenshot sur le Bureau, déjà à la bonne résolution.

## Notes pour la revue Apple (champ « Notes »)

```
Application éducative pour enfants, 100 % utilisable hors ligne, sans compte ni connexion requise.
Aucun achat intégré, aucune publicité. Le micro (permission optionnelle) sert uniquement à la
reconnaissance vocale locale pour l'exercice de récitation de poésies ; l'audio n'est ni stocké
ni transmis. La synchronisation de progression est optionnelle et pseudonymisée (aucune donnée
personnelle). L'Espace Parent est protégé par un PIN choisi à la première utilisation.
```

## Check-list avant soumission

- [ ] Compte Apple Developer actif (en attente de validation Apple)
- [x] Politique de confidentialité en ligne
- [x] Info.plist : permissions micro + speech + ITSAppUsesNonExemptEncryption
- [ ] `git push` des 2 commits locaux (à faire depuis le Mac)
- [ ] Team sélectionnée dans Xcode (Signing & Capabilities)
- [ ] Test sur simulateur (⌘R)
- [ ] Screenshots capturés
- [ ] Fiche créée dans App Store Connect (textes ci-dessus)
- [ ] Archive + Upload TestFlight (Product → Archive → Distribute App)
- [ ] Build sélectionnée + soumission à la revue
