# Progression Memory et géométrie

## Memory

L’ancien écran filtrait les identifiants « training / challenge », inexistants dans MEMORY_MODES : les parcours principaux étaient invisibles. Le meilleur score seul ne constituait pas une progression.

Deux parcours comportent chacun quatre paliers :
- mémoire visuelle : 6, 8, 10 puis 12 paires, avec 12, 12, 10 puis 8 secondes d’observation ;
- calcul : tables de 2 à 5, 3 à 7, 6 à 9 puis toutes les tables ; 6, 8, 8 puis 10 paires.

Un palier exige deux plateaux différents terminés avec au plus deux erreurs. Le chrono n’est pas éliminatoire. Le palier suivant est contrôlé dans le moteur, pas seulement grisé dans l’interface. Une partie imparfaite conserve ses résultats et propose une stratégie de mémorisation. Les anciens bons records apportent une validation, sans inventer deux victoires à partir d’un seul score.

Chaque association réussie ou ratée, et le bilan terminé ou interrompu, sont enregistrés dans le journal parent commun. La progression est reconstruite depuis ce journal, fusionné sans doublons et synchronisé en base. Les bilans sont distingués par `memory.kind=session` ; les associations par `memory.kind=move`. Les bilans qualifiés comptent comme des réussites de l’objectif, même avec une ou deux erreurs : le détail de ces erreurs reste conservé.

La répétition de symboles ou de tables est intentionnelle dans cet exercice de mémoire. Les plateaux de validation diffèrent ; cela ne modifie pas l’exclusion des questions de quiz déjà réussies. Les tables isolées restent accessibles en entraînement libre. Les battles gardent leur fonctionnement.

## Géométrie

42 nouvelles questions, six par classe, avec trois paliers : reconnaître, appliquer, raisonner. Chaque classe possède sa section, sa leçon et ses manipulations. Les questions déjà présentes restent disponibles dans les sections complémentaires existantes. L’entrée CP de mathématiques n’est plus réservée à un prénom.

| Classe | Principaux objectifs |
| --- | --- |
| CP | Côtés, sommets, figures usuelles, rotation, règle |
| CE1 | Polygones et cube, mesure de segments, angle droit, carré et rectangle |
| CE2 | Parallèles et perpendiculaires, périmètre, symétrie, contrôle d’un tracé |
| CM1 | Angles, propriétés du rectangle, aire et périmètre, symétrie |
| CM2 | Unités d’aire, rayon et diamètre, problèmes à étapes, justification |
| 6e | Milieu, médiatrice, cercle, aire du triangle, constructions au compas |
| 5e | Angles du triangle, parallélogramme, hauteur, raisonnement sur les propriétés |

La classe précise est stockée dans `schoolGrade`, car les anciens niveaux regroupent CE1–CE2, CM1–CM2 et 6e–5e. Le filtrage s’applique aux sections et aux modes de quiz. Les classes supérieures restent accessibles après le déblocage prévu par le moteur de progression.

Les manipulations servent à comprendre ; elles ne prétendent pas noter automatiquement la précision d’un tracé sur papier. Les leçons demandent aussi l’usage de la règle, de l’équerre et du compas et une réponse justifiée avec l’unité correcte. Les schémas des questions ne servent pas à deviner une mesure à l’écran.

Références pédagogiques : [ressources officielles du cycle 2](https://eduscol.education.gouv.fr/4746/ressources-d-accompagnement-du-programme-de-mathematiques-au-cycle-2), [ressources officielles du cycle 3](https://eduscol.education.gouv.fr/5712/ressources-d-accompagnement-du-programme-de-mathematiques-au-cycle-3). Le parcours proposé est une sélection progressive et ne prétend pas couvrir l’intégralité du programme.

## Validation

Tests Node : verrous, seuils, plateaux distincts, anciennes données, doublons, interruptions, isolation des profils ; banque de géométrie, classes autorisées et filtrage des modes. Tests Chromium sur GitHub : deux victoires réelles au Memory, persistance, déblocage, manipulation géométrique et questions du bon palier. Captures dans les artefacts du workflow.

Aucun déploiement. L’historique en production dépend toujours de l’application de la migration Supabase livrée précédemment.
