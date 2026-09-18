# Leçons et entraînements par section

## Audit du parcours précédent

- L’écran matière ouvrait d’abord les niveaux, puis un tirage de questions.
- Les thèmes étaient des raccourcis vers des questions mélangées aléatoirement, sans leçon associée.
- Les sections terminées disparaissaient de ces raccourcis.
- `buildLesson` présentait quatre exemples du niveau, même s’ils portaient sur des notions différentes.
- La bibliothèque interactive regroupait douze expériences de sciences, à l’écart des exercices.
- Les fractions disposaient de questions, mais sans manipulation dédiée.

## Parcours livré

L’entrée principale devient matière → section → leçon → entraînement. Les anciens entraînements par niveau restent dans un panneau secondaire. Une section terminée reste visible pour consulter sa leçon. Culture, sciences et langues conservent leurs disciplines : les catégories homonymes de deux langues ne sont pas fusionnées.

Les questions sont limitées aux niveaux ouverts et à la notion choisie. Les séances comportent au maximum cinq questions du premier palier encore incomplet. Un palier supérieur ne s’ouvre qu’après réussite des précédents. Les exercices ratés peuvent être repris, les exercices réussis sont exclus immédiatement, y compris après rechargement ou fusion des profils. Le stock épuisé est annoncé sans recycler les réussites.

Le parcours d’apprentissage n’applique pas de malus XP en cas d’erreur. Après une réponse correcte, il attend une action de l’élève pour que celui-ci ait le temps de lire l’explication. Chaque réponse utilise l’historique parent et la synchronisation en base de la PR.

## Leçons

- **Fractions** : tablette à partager en parts égales ; passage à une bande puis à l’écriture fractionnaire ; découpage des moitiés en fractions équivalentes ; comparaison sur un même entier ; partage de 12 pièces ; opérations avec des parts de même taille ; problèmes en plusieurs étapes. Vingt nouvelles questions accompagnent cinq paliers pédagogiques. Les questions existantes ont un ordre pédagogique explicite sans changer leur identité.
- **Calcul / comptage** : dizaines et unités manipulables.
- **Géométrie / aire et périmètre** : rectangle redimensionnable, unités et distinction surface/contour.
- **Autres notions** : exemple expliqué, recherche avec explication masquable, méthode dévoilée étape par étape. Le contenu s’appuie sur les explications existantes ; ces sections ne prétendent pas toutes disposer d’une simulation spécialisée.
- **Sciences** : les expériences existantes sont reliées aux sections pertinentes. Un retour ramène à la même section et au même élève.

Les manipulations libres servent à explorer : elles ne sont pas comptées comme des réponses évaluées. Les questions d’entraînement, elles, sont enregistrées comme réussies ou ratées.

## Fondement pédagogique

La progression objets → représentations → symboles s’inspire de l’approche concrète, imagée, abstraite décrite par le ministère de l’Éducation de Singapour. La représentation numérique de la tablette est une simulation ; l’enfant peut aussi partager une feuille ou de vrais objets avec un adulte. Le modèle en barres et la référence à un même entier servent à comprendre les fractions, pas seulement à appliquer une recette.

Sources primaires :
- [Présentation de l’approche concrète, imagée, abstraite, école Angsana du ministère](https://www.angsanapri.moe.edu.sg/teaching-n-learning/mathematics/).

Il s’agit d’une adaptation, sans affiliation ni affirmation que cette méthode serait universellement la meilleure. Les paliers sont un choix produit : ils ne remplacent pas l’évaluation d’un enseignant.

## Validation et limites

Tests Node : classement, disciplines, niveaux fermés, progression, conservation des tentatives, stock épuisé, manipulations et retours. Tests Chromium sur GitHub : parcours mobile et bureau, persistance, code parental, retour d’expérience et lecture hors connexion. Captures jointes au workflow.

Les tests de l’application et de PostgreSQL sont conservés. La vérification IA de la banque dépend toujours de la présence de la clé prévue par le dépôt. La migration Supabase de l’historique parent reste nécessaire avant déploiement. Aucun changement de VERSION, aucun tag et aucune publication sur main.
