# Confidentialité et sécurité enfant

## Cadres visés

- **RGPD** (Europe) : minimisation, consentement éclairé, droits d'accès et d'effacement.
- **COPPA** (États-Unis) : pour les < 13 ans, consentement parental vérifiable pour toute collecte identifiante.
- **Guidelines App Store** : sections 1.3 (contenu enfant), 5.1.4 (apps pour enfants).
- **CNIL** : recommandations 2021 sur les apps pour mineurs.

## Principes

- Minimisation : on ne collecte que ce qui sert directement le produit.
- Séparation identité parentale / données d'usage : l'enfant est identifié par un pseudo local ; le compte cloud (si sync activée) n'utilise que le hash AID.
- Refus par défaut : analytics et notifications sont **désactivés** à la première ouverture.
- Consentement éclairé : chaque activation présente en clair ce qui est collecté et pourquoi.
- Retrait à tout moment : sans dégrader le service local.
- Droit d'accès et d'effacement : export JSON + « tout supprimer » depuis l'Espace Parent.

## Données jamais collectées

- Nom, prénom réel de l'enfant (seul un pseudo local est utilisé, non transmis)
- Date de naissance complète (uniquement tranche d'âge, optionnelle)
- Adresse, école, géolocalisation
- Photos, vidéos, contacts
- Identifiant publicitaire Apple (IDFA)
- Enregistrement micro (le micro sert à la reconnaissance vocale à la volée, jamais stocké ni transmis)
- Texte libre saisi par l'enfant
- Contenu des poésies personnalisées ajoutées par le parent

## Données stockées **localement seulement**

Nom du profil (pseudo), avatar choisi, progression, scores, sessions, réponses aux exercices, quêtes journalières, poésies persos, réglages parent, PIN hashé.

## Données transmises **si sync activée**

- Le profil complet (identifié par AID = SHA-256 du pseudo normalisé).
- Fusionné avec la version cloud (résolution de conflit — voir `SYNC_ENGINE.md`).
- Chiffré en transit (HTTPS obligatoire).
- Aucune donnée transmise si sync désactivée (par défaut : activée si le parent tape son PIN une fois ; le premier onboarding demande explicitement).

## Données transmises **si analytics activés**

Événements listés dans `ANALYTICS_EVENT_TAXONOMY.md`. **Toutes anonymisées et bucketisées.** Aucune permet d'identifier un enfant précis.

## Micro

- Utilisé uniquement pour la récitation de poésies.
- La reconnaissance vocale se fait via le framework Speech d'Apple (traitement local sur l'appareil quand `SFSpeechRecognizer.supportsOnDeviceRecognition == true`, sinon Apple).
- L'audio brut n'est jamais stocké ni transmis à notre serveur.
- Description dans `Info.plist` : `NSMicrophoneUsageDescription = "Le micro sert à écouter tes poésies quand tu les récites. Rien n'est enregistré."`

## PIN parent

- 4 à 6 chiffres, choisi à la première ouverture de l'Espace Parent.
- Stocké hashé (Argon2id, ou PBKDF2 100 000 itérations à défaut) + sel dans SQLite ET dans la Keychain iOS.
- Après 5 échecs consécutifs : verrouillage 30 s ; après 10, 5 min ; etc.
- Récupération : depuis l'Espace Parent si connecté ; sinon réinitialisation de l'app (avec avertissement clair sur la perte des données locales).
- Face ID / Touch ID en option (activable dans les réglages), ne remplace jamais le PIN mais accélère l'accès.

## Rétention

- **Local** : tant que l'app est installée, ou jusqu'à ce que le parent supprime.
- **Cloud (Worker Cloudflare KV)** : indéfini pour les profils actifs, purgé après 2 ans d'inactivité (job à ajouter).
- **Analytics** : 90 jours de brut chez le fournisseur, agrégats anonymes au-delà.

## Droits de l'utilisateur (RGPD)

Accessibles depuis Espace Parent → Confidentialité :

- **Consulter** : export JSON complet du profil et de son historique.
- **Rectifier** : modification du pseudo, avatar, âge.
- **Supprimer** : suppression totale locale + demande de suppression cloud (via `DELETE /profile/:aid`).
- **Retirer le consentement** : toggle immédiat, purge des files analytics en attente.
- **Portabilité** : l'export JSON est standard, réutilisable par la web app.

## Politique de confidentialité

À rédiger et publier avant TestFlight, hébergée sur `royaumesavoirs.fr/privacy` (ou équivalent). Doit couvrir :

- Éditeur, contact
- Données collectées et finalités
- Bases légales
- Destinataires (aucun tiers commercial)
- Durées de rétention
- Droits et leur exercice
- Cookies (aucun)
- Contact DPO ou responsable

## App Store Connect

- Section « App Privacy » : à remplir. Réponse type : « Données collectées : identifiants d'utilisation liés (AID pseudonyme), utilisation liée (progression). Aucune traçabilité inter-apps. »
- « Guided Access » (Accès Guidé) recommandé aux parents dans le README enfant.
- Age Rating : 4+ (contenu éducatif, aucun contenu sensible).
