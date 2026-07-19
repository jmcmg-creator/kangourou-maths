# Mode hors ligne

L'app est **offline-first** : toute action essentielle se valide localement en premier, la synchronisation vient après.

## Ce qui marche sans réseau

- Lancement de l'app
- Sélection et création de profil
- Toutes les activités des 950 exercices statiques (9 royaumes)
- Les 12 leçons interactives Sciences
- Les 20 fiches du Royaume de l'Ingénieur
- Lecture et récitation des poésies (voix synthétique iOS ; MP3 studio si téléchargés)
- Attribution des cristaux, XP, badges, dragonnets
- Progression sauvegardée localement (SQLite)
- Consultation de la collection, du parcours, des stats
- Espace Parent : consultation complète, réglages
- Personnalisation de l'avatar avec les accessoires embarqués
- Quêtes journalières (générées localement)
- Reprise après fermeture forcée : état restauré depuis SQLite

## Ce qui nécessite le réseau (mais ne bloque rien)

- Sync cross-device (autre iPhone, iPad ou navigateur du même prénom)
- Génération d'exercices IA supplémentaires
- Téléchargement de packs (audio MP3 des poésies, packs à venir)
- Envoi différé des événements analytics
- Mises à jour de contenu éditorial

## Flux d'une réponse à un exercice

1. L'enfant clique la bonne réponse.
2. UI confirme immédiatement (haptique + animation).
3. Le score, l'XP, les cristaux sont mis à jour en mémoire.
4. Un enregistrement `ProgressEvent` est écrit dans SQLite (transaction).
5. Un event `analytics.exercise_answered` est mis dans la file locale.
6. Un ordre de sync `profile_updated` est mis dans la file de sync.
7. Si `network.state === 'online'` → tentative de push en tâche de fond.
8. Sinon, tout reste en attente et repartira dès le retour du réseau.

**Aucune étape ne bloque l'UI. Aucune étape ne peut échouer côté enfant.**

## Feedback à l'enfant

L'état réseau ne pollue jamais l'écran de jeu. Un petit indicateur discret en haut à droite montre :

- rien = tout va bien (online, sync à jour)
- petit nuage barré = hors ligne (sync mise en pause, jeu continue)
- pastille orange = sync en cours
- pastille rouge = erreur de sync — visible seulement dans l'Espace Parent

## Reprise après fermeture

Au démarrage, `bootstrap.ts` :

1. Ouvre SQLite
2. Charge le dernier profil actif (`ActiveProfileRepo`)
3. Reprend la dernière activité en cours (`SessionRepo.getResumable()`)
4. Déclenche la sync en arrière-plan (n'attend pas)
5. Rend la main à l'UI

Ordre garanti : rien n'attend le réseau pour afficher l'écran d'accueil.

## Mode avion — comportement observable

- Icône WiFi barrée en haut de l'écran (indicateur système iOS)
- L'app démarre en < 2 s
- Toutes les activités disponibles
- Après une réponse : la petite pastille de sync reste orange (en attente)
- Au retour du réseau : la pastille disparaît en quelques secondes, tout est monté au cloud

## Interruptions

- **Appel téléphonique** : `App.addListener('appStateChange')` sauvegarde la session en cours dans SQLite. Au retour, l'activité reprend.
- **Fermeture forcée (swipe up)** : dernière écriture SQLite date de la dernière réponse, donc rien de perdu (les données sont écrites à chaque étape, pas seulement à la fin).
- **Batterie qui coupe l'iPhone** : idem, SQLite est fsync-safe.
