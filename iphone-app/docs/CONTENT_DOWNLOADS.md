# Gestion des contenus téléchargeables

## Trois catégories de contenus

**Embarqués (bundle initial)** : tout ce qui permet à l'app d'être utile dès la première ouverture, sans réseau :
- Interface, icônes, splash, polices
- Les 950 exercices statiques (`exercises.js` + `exercises_extra.js`)
- Les 12 leçons interactives Sciences (`lecons/*.html`)
- Les 20 fiches Royaume de l'Ingénieur
- Sons UI courts (clics, succès, erreur)

Taille cible : < 25 Mo.

**Téléchargeables (packs optionnels)** :
- `poesies_mp3_studio` (~15 Mo, 9 MP3 générés par OpenAI TTS)
- `pack_geo_avance` (à venir : cartes, drapeaux HD, ~10 Mo)
- `pack_histoire_frise` (à venir : illustrations, ~8 Mo)

**En ligne uniquement** : rare, à documenter cas par cas. Actuellement rien.

## Interface parent

Écran « Contenus » dans l'Espace Parent :

- Liste des packs, avec taille et statut (disponible / téléchargé / à mettre à jour).
- Bouton télécharger, pause, reprendre, supprimer.
- Estimateur d'espace disque restant.
- Option globale « Télécharger seulement en Wi-Fi ».

## Flux technique

1. Le parent tape « Télécharger » sur un pack.
2. `DownloadManager.enqueue(packId)` crée un job en SQLite (`download_packs.status = 'in_progress'`).
3. Requête HTTP vers un CDN (à définir ; GitHub Pages en dépannage) avec support HTTP Range pour la reprise.
4. Fichier écrit dans `Documents/packs/<packId>/`.
5. Fin : vérif SHA-256 (checksum fourni dans le manifest du pack) → si OK, `status = 'downloaded'`. Sinon → réessaie une fois, puis `failed`.
6. Le contenu du pack devient disponible pour le moteur de jeu via `PackRegistry.resolve('audio', 'corbeau-renard')` qui renvoie soit une URL bundlée soit un chemin de fichier local.

## Reprise et intégrité

- Reprise : HTTP `Range: bytes=<déjà téléchargé>-` si le serveur le supporte, sinon reprise du fichier à zéro.
- Intégrité : SHA-256 comparé au manifest. Un fichier incomplet ou corrompu ne peut jamais être servi à l'enfant.
- Espace : avant démarrage, on estime la taille + marge de 20 %. Si insuffisant, l'utilisateur est informé.

## Suppression

Supprime les fichiers + met `status = 'available'` (pas de trace de téléchargement précédent). L'enfant peut retélécharger si besoin.

## Restriction Wi-Fi

Si `parent_settings.wifi_only_downloads = '1'`, `DownloadManager` refuse de démarrer un job si `network.connectionType === 'cellular'`. Le job reste en attente jusqu'au retour du Wi-Fi.

## Manifest des packs

Servi par le Worker : `GET /packs/manifest.json`
```json
{
  "packs": [
    { "id": "poesies_mp3_studio", "version": "1.0.0", "size": 15234567, "url": "https://.../poesies_v1.zip", "sha256": "abc...", "items": ["audio/corbeau-renard.mp3", ...] }
  ]
}
```
