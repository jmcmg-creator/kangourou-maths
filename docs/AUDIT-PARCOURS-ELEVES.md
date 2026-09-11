# Audit des parcours élèves — 11 septembre 2026

Base auditée : `origin/main`, commit `021e97b`. Branche de correction : `fix/parcours-eleves-questions-navigation`.

Les consignes AGENTS.md et CLAUDE.md ont été lues sur `origin/docs/agents-md` : elles ne sont pas encore présentes sur main. Le clone de travail est isolé du clone local, dont les deux modifications iOS sont restées intactes. Aucun tag, aucune modification de VERSION, aucune livraison.

## Constats avant correction

- 1 538 exercices chargés, y compris les cartes générées au démarrage. 1 398 ont un niveau déclaré dans les sections affichées.
- 140 exercices hors menu : 40 exercices d’anglais oral et 100 exercices adultes. Ils ne doivent pas entrer par un tirage de repli. Leur réactivation serait un choix produit distinct.
- Dans `pickExercises`, la Quête revenait à toutes les matières dès que le royaume contenait moins de six exercices. Cela contredisait son commentaire et expliquait une fuite de maths dans l’exploration.
- Le filtre de contenu des exercices IA ne couvrait pas les exercices personnalisés ni tous les chemins de sélection.
- `lg57` (araignée), `lg58` (Mercure), `lg59` (continents), `lg60` (guépard) étaient classés en Logique, catégorie Culture : ce sont des connaissances, pas des raisonnements.
- Libellés dispersés : Analogie/Analogies, Monde/Mondes, Landmarks ; fautes sur Impressionnisme ; catégorie Chefs d’État contenant aussi des chefs de gouvernement.
- Les compteurs de réussite étaient persistés en fin de partie seulement. Le cooldown des 150 derniers identifiants réadmettait les anciennes questions ; le mode adaptatif le contournait.
- Le pied de page ouvrait directement le sélecteur. Le démarrage ouvrait également les profils, au lieu de reprendre le dernier élève. Le portail adulte était un QCM de multiplication valable quinze minutes.
- Le retour principal ignorait de nombreux écrans et ne traitait pas le retour navigateur ; quitter depuis le titre pouvait perdre le bilan de partie.
- Les 14 pages de leçons imposaient maximum-scale=1 et user-scalable=no ; les champs de petite taille pouvaient déclencher le zoom automatique iOS. Aucun retour explicite à 100 %.

## Inventaire de toutes les sections avant correction

| Section | Exercices |
|---|---:|
| maths | 180 |
| culture | 240 |
| poesie | 0 |
| langues | 140 |
| sciences | 189 |
| informatique | 32 |
| art | 32 |
| logique | 88 |
| geographie | 497 |

### Niveaux et catégories

- `cp` — 10 : Calcul, Comptage, Équation, Soustraction, Géométrie, Comparaison, Dénombrement, Logique, Suite.
- `ce1-ce2` — 50 : Calcul mental, Suites logiques, Problème à piège, Dénombrement, Géométrie, Logique, Parité, Repérage, Stratégie, Problème, Temps, Divisibilité, Équation, Fractions, Périmètre et aire, Symétrie.
- `cm1-cm2` — 73 : Calcul mental, Divisibilité, Problème à piège, Géométrie, Suites, Combinatoire, Logique, Dénombrement, Stratégie, Fractions, Problème, Proportion, Temps, Mesures, Équation, Nombres décimaux, Périmètre et aire, Symétrie.
- `6e-5e` — 47 : Fractions, Divisibilité, Vitesse, Géométrie, Logique, Combinatoire, Suites, Probabilités, Calcul astucieux, Invariants, Calcul mental, Pourcentages, Problème, Proportion, Pythagore, Puissances, Algèbre, Mesures, Calcul, Équation, Dénombrement, Périmètre et aire.
- `histoire-ce2` — 20 : Préhistoire, Antiquité.
- `histoire-cm1` — 20 : Moyen Âge, Renaissance.
- `histoire-cm2` — 20 : Révolution, XIXe siècle, XXe siècle.
- `geographie-ce2` — 20 : France.
- `geographie-cm1` — 20 : Régions.
- `geographie-cm2` — 20 : Europe, Monde.
- `francais-ce2` — 20 : Grammaire, Conjugaison, Orthographe.
- `francais-cm1` — 20 : Conjugaison, Accords, Grammaire, Orthographe.
- `francais-cm2` — 20 : Conjugaison, Figures, Grammaire, Orthographe.
- `emc-ce2` — 20 : Citoyenneté.
- `emc-cm1` — 20 : Démocratie.
- `emc-cm2` — 20 : Institutions.
- `espagnol-debutant` — 30 : Salutations, Politesse, Nombres, Couleurs, Animaux, Famille, Nourriture, Phrases utiles, Vie quotidienne, Culture.
- `italien-debutant` — 30 : Salutations, Politesse, Nombres, Couleurs, Animaux, Famille, Nourriture, Phrases utiles, Vie quotidienne, Culture.
- `hebreu-alphabet` — 20 : Alphabet.
- `hebreu-vocabulaire` — 20 : Vocabulaire.
- `hebreu-expressions` — 20 : Expressions.
- `hebreu-lecture` — 20 : Lecture.
- `physique-ce2` — 20 : États de la matière, Lumière.
- `physique-cm1` — 20 : Énergie, Électricité.
- `physique-cm2` — 20 : Forces, Circuits.
- `chimie-ce2` — 20 : États.
- `chimie-cm1` — 20 : Mélanges.
- `chimie-cm2` — 20 : Transformations.
- `biologie-ce2` — 25 : Corps humain, Animaux.
- `biologie-cm1` — 24 : Nutrition, Reproduction, Corps humain.
- `biologie-cm2` — 20 : Écosystèmes.
- `info-cp` — 8 : Séquences, Instructions, Programmes, Déduction, Logique.
- `info-ce1-ce2` — 8 : Algorithmes, Boucles, Conditions, Déduction, Debugging, Instructions.
- `info-cm1` — 8 : Variables, Scratch, Programmation, Debugging.
- `info-cm2` — 8 : Binaire, HTML, Types de données, Données, Programmation, Logique.
- `art-cp-ce1` — 8 : Couleurs, Formes, Peinture célèbre, Formes en art, Couleurs chaudes/froides, Composition.
- `art-ce2` — 8 : Art préhistorique, Art égyptien, Art médiéval.
- `art-cm1` — 8 : Renaissance, Maîtres, Peintre, Perspective, Composition, Technique.
- `art-cm2` — 8 : Impressionisme, Post-impressionisme, Modernisme, Colorisme, Surréalisme, Art moderne, Mouvements.
- `logique` — 60 : Suites, Intrus, Analogies, Énigmes, Observation, Attention, Culture.
- `logique-cp` — 8 : Motifs, Déduction, Formes, Logique, Mémoire.
- `logique-ce1-ce2` — 8 : Déduction, Puzzles, Analogie, Analogies, Repérage.
- `logique-cm1` — 6 : Raisonnement spatial, Déduction, Puzzles, Raisonnement.
- `logique-cm2` — 6 : Déduction complexe, Raisonnement spatial, Énigme, Probabilité, Raisonnement logique, Jeux.
- `geo-cp-ce1` — 15 : Continents, Océans, France, Drapeaux, Capitales.
- `geo-ce2` — 31 : Régions françaises, Villes, Fleuves, Montagnes, Régions, Géographie, Drapeaux, Capitales, Habitants.
- `geo-cm1` — 38 : Pays européens, Union Européenne, Drapeaux, Continents, Géographie, Capitales, Habitants, Chefs d'État.
- `geo-cm2` — 65 : Monde, Continents, Landmarks, Mondes, Cultures, Géographie, Drapeaux, Capitales, Habitants, Chefs d'État, Capitales du monde, Langues, Monnaies, Cuisine du monde.
- `geo-drapeaux` — 48 : Drapeaux d'Europe, Drapeaux du monde, Pays → Drapeau, Pays du monde.
- `geo-carte-drapeaux` — 35 : Drapeaux sur la carte.
- `geo-carte-france` — 12 : Villes de France.
- `geo-carte-europe` — 18 : Capitales d'Europe.
- `geo-carte-payseu` — 35 : Pays d'Europe.
- `geo-carte-asie` — 70 : Pays — Asie, Capitales — Asie.
- `geo-carte-afrique` — 86 : Pays — Afrique, Capitales — Afrique.
- `geo-carte-amerique` — 44 : Pays — Amérique, Capitales — Amérique.

## Corrections et choix de fonctionnement

- Les quatre questions de culture ont été déplacées : lg57 et lg60 vers biologie-ce2/Animaux, lg58 vers physique-ce2/Astronomie, lg59 vers geo-cp-ce1/Continents. Identifiants conservés, donc acquis conservés. Libellés harmonisés.
- La Quête reste strictement dans le royaume. Aucun repli vers une autre matière. Le filtre des exercices hors sujet est également appliqué au pool personnalisé et aux révisions par thème.
- Registre `successfulQuestions` dans chaque profil : union monotone des identifiants et des empreintes de contenu, sans limite glissante. Les choix réordonnés et les nouveaux identifiants ne permettent pas de reproposer un doublon. Les opérateurs, visuels et cibles des cartes participent à l’identité.
- Migration depuis les compteurs historiques et les réponses des anciennes sessions. La sauvegarde locale intervient dès la bonne réponse pour les QCM, saisies et cartes. Fusion du registre lors de la synchronisation. La progression de niveau utilise aussi le registre immédiat.
- Questions ratées : peuvent être reposées. Questions réussies : exclues de tous les modes de quiz, révisions et créations de battles statiques. Une battle reçue contenant déjà une réussite est refusée intégralement : réduire sa liste fausserait la comparaison des scores.
- Stock court : partie de 1 à 10 questions. Stock vide/terminé : écran explicite proposant un autre parcours ; pas de génération imposée ni de recyclage. Les thèmes terminés disparaissent. Les tables suivent la même règle et les anciens sans-faute restent acquis.
- Leçons, consultation volontaire des corrigés, récitation de poésie et jeux de paires restent des activités consultables/rejouables ; le registre concerne les questions évaluées des quiz, pas une interdiction de revoir un contenu pédagogique.
- Code parental local à six chiffres, stocké sous forme de condensat salé, requis à chaque accès aux profils. Pas de grâce de quinze minutes. Après cinq erreurs : attente d’une minute, conservée au rechargement. Le code reste propre à l’appareil et ne part pas dans les profils cloud.
- Installation/migration : un parent configure le code avant de confier le jeu. Le défi adulte antérieur sert uniquement à ce premier paramétrage, qui demande deux saisies identiques. Aucun code universel ni réinitialisation enfant. Un stockage indisponible bloque la validation du code.
- Reprise du dernier élève au démarrage ; accès à un autre profil via lien de synchronisation également protégé. Une réponse cloud arrivée après un changement de profil ne peut plus fusionner dans le nouvel élève.
- Retours vers le parent logique (niveau, matière, thèmes, tables, poésie, battle), sauvegarde unique des parties quittées et gestion du retour navigateur. Les leçons scientifiques reviennent à la liste des leçons.
- Pincement autorisé jusqu’à 5× dans l’app et les leçons ; bouton 100 % placé dans le viewport visible et compensé selon son échelle. Les champs de l’app ont au moins 16 px. Scripts et leçons précachés ; versions synchronisées (cache 45, game 65).

## Simplification UX

Deux modes visibles : **Jouer à mon rythme** (sans chrono, adaptation existante par matière) et **Défi chrono**. La leçon reste une ressource et les thèmes sont proposés dans la matière. Les contrôles techniques de génération IA sont retirés de l’écran enfant. Les anciens identifiants adaptive/progression restent interprétables dans l’historique et couverts par les tests.

## Validation et limites

- `npm test` : suite existante et nouveaux tests parcours/zoom, tous réussis. Vérification de toutes les combinaisons niveau × mode pour exclure les réussites, migration, fusion, isolation, stock minimal/vide, battle, tables, navigation et autorisation parentale.
- `node --check game.js`, `node --check zoom.js`, `git diff --check` : réussis.
- Test réel dans le navigateur intégré, avec deux profils fictifs et connexions externes bloquées : mauvais code refusé, bon code accepté, second changement soumis au code, annulation, retour navigateur, deux modes, question de parité réussie puis absente des thèmes après rechargement ; élève actif et 1/50 conservés.
- `npm run verify:questions` exécuté : bloqué par `ANTHROPIC_API_KEY manquant`. Le classement de toutes les catégories et les signaux de maths ont été audités ; cela ne vaut pas certification factuelle exhaustive de chaque énoncé.
- Le bouton de zoom est testé pour la compensation à 3× et la restauration du viewport. Le pincement physique et la remise à 100 % dans WKWebView doivent encore être vérifiés sur iPhone/iPad ; aucun appareil ni build TestFlight n’a été utilisé.
- Les validations cloud sont locales (fusion et prévention des changements de profil pendant une requête), sans test sur les données réelles des élèves. La disponibilité sur un autre appareil dépend d’une synchronisation réussie.
- L’effacement du stockage navigateur supprime le verrou local et les acquis non synchronisés. Le dispositif protège la navigation enfant habituelle ; ce n’est pas une authentification serveur contre la modification du stockage local.

## Vérification reproductible

```sh
npm test
npm run audit:categories
npm run verify:questions # nécessite ANTHROPIC_API_KEY
```
