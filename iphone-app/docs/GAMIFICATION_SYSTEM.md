# Système de gamification

## Boucle principale

Objectif court → activité → feedback immédiat → progression visible → récompense → prochaine activité proposée → point d'arrêt naturel.

Durée cible d'une activité : 3 à 6 minutes. Après 20-30 minutes cumulées (réglable par le parent), l'app propose spontanément une pause positive (pas un blocage).

## Mécaniques héritées de la web app

- **9 royaumes** avec mascotte, palette et niveaux d'apprentissage propres
- **XP** par royaume + total cumulé
- **Cristaux** (monnaie visuelle)
- **Étages** de progression (« Apprenti Dragonneau » → « Maître Dragon » etc.)
- **Dragonnets** débloqués à des seuils d'XP
- **Quêtes journalières** (une par jour, renouvelée à minuit local)
- **Badges** (série de bonnes réponses, exploration de royaumes, régularité)
- **Streaks** (jours consécutifs)

## Nouveautés iOS

- **Feedback haptique** à chaque réponse (light impact = correct, soft warning = mauvais). Non intrusif, coupable dans l'Espace Parent.
- **Animations de célébration** natives (confettis via Canvas, plus fluides que sur mobile web).
- **Avatar personnalisable** avec accessoires débloqués selon les XP par royaume (bandeau du Chevalier au CM1-CM2 en Maths, casque de l'Ingénieur…).
- **Carte du parcours** : au lieu d'une liste de royaumes, une carte visuelle où chaque royaume est une île qui s'illumine au fil de la progression.

## Règles éthiques (imposées)

**Interdit :**
- Publicité
- Classement public (ni entre enfants, ni contre des inconnus)
- Perte de progression, de récompense ou d'accessoires
- Notifications culpabilisantes (« tu n'as pas joué depuis 3 jours »)
- Fausse urgence, faux compte à rebours anxiogène
- Loot boxes, récompenses aléatoires monétisées
- Achats intégrés adressés à l'enfant
- Session qui ne finit jamais

**Autorisé :**
- Notifications planifiées par le parent (« C'est l'heure d'apprendre ! »)
- Nouveautés éditoriales (déterministes, jamais aléatoires)
- Défis parent-enfant (mode collaboratif)

## Adaptation locale de la difficulté

Le moteur `pickExercises` de `game.js` fait déjà : progression par difficulté croissante, priorité aux exercices ratés, rotation intelligente. Le port iOS **conserve exactement** cette logique. Le stockage passe de `localStorage` à SQLite mais le calcul reste identique.

Signaux utilisés (tous locaux, jamais transmis) :
- taux de réussite par catégorie
- temps de réponse moyen
- utilisation des aides
- exercices récemment vus vs jamais vus

Aucun profil psychologique de l'enfant n'est construit. Aucun signal n'est envoyé à un tiers.

## Points d'arrêt naturels

- Fin d'une activité (résultats + récompense) : bouton « J'arrête » proposé en même temps que « Autre défi ».
- Après 3 activités consécutives : suggestion douce (« Bravo pour ces 3 défis ! Envie d'une pause ? »).
- Au-delà de la limite parent : petit personnage qui dit « Repose tes yeux, on continue demain ! » avec bouton « Bonne journée » et bouton « Encore 5 min » (choix du parent d'activer ce dernier).

## Récompenses cohérentes

Chaque récompense est **cohérente** avec l'action :

| Action | Récompense |
|---|---|
| Terminer une activité | XP + cristaux proportionnels au score |
| 10 bonnes réponses d'affilée | Badge « Streak x10 » |
| Finir une leçon interactive | Accessoire lié au thème (loupe pour Sciences, plume pour Poésies) |
| Débloquer un étage de royaume | Nouveau dragonnet, animation dédiée |

Pas d'inflation. Pas de « +1 XP » toutes les 5 secondes.
