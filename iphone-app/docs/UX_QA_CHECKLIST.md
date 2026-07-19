# Checklist QA UX/UI

À passer avant chaque candidate TestFlight.

## Structure iOS

- [ ] Safe areas respectées (barre d'état, indicateur home, encoche, Dynamic Island)
- [ ] StatusBar en dark mode (fond `#0f0a2e`)
- [ ] Splash screen : couleur cohérente, pas de flash blanc
- [ ] Retour à l'app depuis background : session en cours restaurée
- [ ] Rotation : verrouillée en portrait (sauf activités où le paysage a du sens)

## Enfance

- [ ] Zones tactiles ≥ 44×44 pt
- [ ] Textes lisibles à distance de bras (16 pt min pour le corps, 20 pt+ pour les questions)
- [ ] Aucun mot compliqué non expliqué dans les instructions
- [ ] Aucun formulaire long ; jamais plus de 3 saisies clavier successives
- [ ] Retour toujours visible (haut-gauche ou barre en bas)
- [ ] Animations douces (< 350 ms), pas de flash violent

## Accessibilité

- [ ] VoiceOver énonce chaque bouton, chaque score, chaque récompense
- [ ] Ordre de focus logique (haut → bas, gauche → droite)
- [ ] Contrastes ≥ 4.5:1 sur les textes normaux, 3:1 sur les titres > 18 pt
- [ ] Dynamic Type respecté : l'app s'agrandit si le parent a mis la police iOS en grand
- [ ] Toggle « Réduire les animations » respecté (`prefers-reduced-motion`)
- [ ] Aucune information passée uniquement par la couleur (badge « bonne réponse » = icône ✓ + couleur)
- [ ] Sons désactivables (toggle global + toggles séparés musique/effets)

## Performance

- [ ] Lancement à froid < 2 s sur iPhone SE (2020)
- [ ] Passage entre écrans < 300 ms
- [ ] Aucune anim qui saccade (60 fps constants sur les transitions)
- [ ] Mémoire < 150 Mo en usage normal
- [ ] Batterie : < 5 % de conso pour 30 min de session

## Offline

- [ ] Mode avion → toutes les activités jouables
- [ ] Réponses enregistrées visibles au retour du réseau (pastille verte)
- [ ] Fermeture forcée en pleine activité → reprise à la même question
- [ ] Interruption d'appel → pause, reprise fluide
- [ ] Retour au wifi après une longue offline → sync progresse, aucun doublon

## Gamification

- [ ] Feedback haptique à chaque réponse (désactivable)
- [ ] Récompenses cohérentes avec l'action (pas d'inflation)
- [ ] Aucun compte à rebours anxiogène
- [ ] Pause proposée après 20 min cumulées
- [ ] Bouton « J'arrête » visible en fin d'activité
- [ ] Impossibilité pour l'enfant d'entrer dans l'Espace Parent sans PIN

## Espace Parent

- [ ] PIN à 4-6 chiffres exigé
- [ ] Face ID / Touch ID optionnel, jamais obligatoire
- [ ] Verrouillage progressif après échecs répétés
- [ ] Consentement analytics clair et retirable
- [ ] Export JSON complet
- [ ] Bouton « Tout supprimer » avec double confirmation

## Contenus

- [ ] 950 exercices atteignables (tous royaumes déclarés)
- [ ] 12 leçons Sciences interactives
- [ ] 20 fiches Royaume de l'Ingénieur
- [ ] Poésies avec récitation (audio + micro)
- [ ] Ajouter une poésie (Espace Parent) → apparaît dans la liste enfant

## Erreurs

- [ ] Aucun message technique visible pour l'enfant
- [ ] « Pas de connexion » présenté simplement, sans culpabilisation
- [ ] Manque d'espace disque → suggestion de supprimer un pack

## Multi-profils

- [ ] 3 profils sur le même iPhone : progressions bien isolées
- [ ] Bascule d'un profil à l'autre en < 3 taps
- [ ] Suppression d'un profil n'affecte pas les autres
- [ ] Un enfant ne peut pas supprimer un profil sans passer par le PIN parent

## Test réel

- [ ] Tester sur au moins 3 tailles d'écran : iPhone SE (petit), iPhone 15 (moyen), iPhone 15 Pro Max (grand)
- [ ] Tester sur au moins un iPhone d'entrée de gamme récent (iPhone 12 par ex.)
- [ ] Tester avec un enfant réel de la tranche d'âge cible
