# Historique des réponses pour l’espace parent

Chaque réponse évaluée est conservée immédiatement, qu’elle soit juste ou fausse :
identifiant unique de tentative, date, question entière, choix proposés, réponse
de l’élève, réponse attendue, résultat, matière, catégorie, niveau, mode et explication.
Le journal couvre QCM, cartes, saisies, tables et mini-quiz des fiches.

Une erreur suivie d’une réussite donne deux lignes. Le registre qui empêche de
reposer les questions réussies reste indépendant. Les filtres Toutes/Réussies/Ratées
et la pagination de 25 lignes ne suppriment aucune donnée.

Les anciennes sessions et erreurs encore présentes sont importées avec des
identifiants déterministes. Les réponses déjà supprimées par l’ancienne limite
de 50 erreurs/100 sessions ne peuvent pas être reconstruites. Les dates historiques
correspondent à la date de session conservée, faute d’horodatage par réponse.

## Base Supabase

Appliquer **supabase/answer-history.sql** après **supabase/schema.sql** avant de
déployer cette version de l’application. Cette migration est livrée dans la PR ;
elle n’est pas appliquée automatiquement à la base de production par GitHub.

La table question_answers conserve les tentatives indépendamment du JSON du profil
(plafonné à 400 Ko). Le couple élève/identifiant de tentative est unique, et une
nouvelle transmission du même identifiant ne modifie pas le résultat original.
Aucune suppression automatique n’est programmée.

Les fonctions save_question_answers et load_question_answers vérifient le jeton
du joueur. Les tables sont inaccessibles directement aux rôles anon/authenticated.
Les réponses sont transmises par lots de 100 et lues par curseur. Une erreur réseau
ou une migration absente conserve les réponses sur l’appareil et signale que la
synchronisation n’est pas confirmée. La prochaine connexion relance l’envoi.

L’adaptateur historique Worker continue à transporter l’historique dans le profil.
La garantie SQL d’écriture concurrente sans écrasement concerne Supabase.
Le serveur Worker n’est pas présent dans ce dépôt et n’a pas été modifié.

## Validation

GitHub Actions exécute npm test et des tests sur PostgreSQL 16 : migration rejouable,
échec puis réussite conservés, répétition d’envoi sans doublon, absence d’accès
entre élèves, format des réponses, pagination et droits sur la table.
Les tests JavaScript couvrent aussi le rechargement local, la fusion, la migration
des anciens journaux, les filtres et l’échappement HTML.

La base réelle des élèves n’est jamais utilisée pour les tests. Tant que la
migration et la PR ne sont pas déployées, les données de production ne changent pas.
