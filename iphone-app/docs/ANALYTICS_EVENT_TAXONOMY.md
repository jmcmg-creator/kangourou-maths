# Taxonomie des événements analytics

## Principes

- Opt-in explicite dans l'Espace Parent. **Rien n'est envoyé sans consentement.**
- Événements générés localement d'abord, envoyés ensuite en lot.
- Zéro donnée personnelle identifiable de l'enfant (pas de nom, pas d'âge exact, pas de géoloc, pas d'identifiant publicitaire).
- Rétention distante : 90 jours max, agrégats seulement au-delà.
- Le parent peut à tout moment : refuser, retirer, exporter, tout supprimer.

## Événements v1

| Nom | Déclencheur | Propriétés | Essentiel |
|---|---|---|---|
| `app_opened` | Bootstrap terminé | `network_state`, `is_first_open` | non |
| `profile_selected` | Choix d'un profil | `age_range`, `profile_index` | non |
| `activity_started` | `startGame()` | `royaume_id`, `level_id`, `mode` | non |
| `activity_completed` | `finishGame()` | `royaume_id`, `level_id`, `mode`, `score`, `total`, `duration_ms_bucket` | non |
| `activity_abandoned` | Sortie mi-partie | `royaume_id`, `question_idx`, `duration_ms_bucket` | non |
| `answer_recorded` | Réponse à une question | `royaume_id`, `category`, `is_correct`, `time_ms_bucket`, `difficulty` | non |
| `reward_unlocked` | Débloquage badge/dragonnet | `reward_type`, `reward_id` | non |
| `stage_reached` | Nouvel étage de royaume | `royaume_id`, `stage_index` | non |
| `lesson_opened` | Ouverture d'une leçon interactive | `lesson_id` | non |
| `poem_recited` | Fin de récitation poésie | `poem_id`, `score_bucket` | non |
| `download_started` / `download_completed` / `download_failed` | Gestionnaire de packs | `pack_id`, `size_bytes_bucket`, `error_class` | non |
| `sync_success` / `sync_failure` | Cycle sync | `attempts`, `error_class` | non |
| `parent_opened` | Entrée dans l'Espace Parent | — | non |
| `settings_changed` | Toute modif de réglage | `setting_key`, `new_value_bucket` | non |
| `analytics_consent_changed` | Modif du consentement | `enabled` | oui (obligatoire pour tracer le retrait) |
| `error_technical` | Exception non fatale | `code`, `class`, `screen` | non |

## Propriétés systématiquement anonymisées

- Aucun `profile_name`. Uniquement un `profile_id_hash` (SHA-256 tronqué, non réversible).
- `duration_ms_bucket` : `< 30s`, `30-90s`, `90-180s`, `3-5min`, `5-10min`, `> 10min`.
- `time_ms_bucket` (temps de réponse) : `< 3s`, `3-10s`, `10-30s`, `> 30s`.
- `age_range` : `6-8`, `8-10`, `10-12`, `unknown`. Jamais date de naissance.
- Aucun texte libre transmis.

## Événements interdits

- Contenu du micro
- Nom, prénom
- Adresse, géoloc
- IDFA (Apple Advertising Identifier)
- Contacts, photos, calendrier
- Texte libre saisi par l'enfant ou le parent
- Contenu des poésies personnalisées ajoutées

## Cycle de vie d'un événement

1. `analytics.track('activity_completed', { ... })` (sync, local).
2. Insert dans `analytics_queue` (SQLite).
3. Bootstrap ou event listener `network.online` déclenche `AnalyticsSender.flush()`.
4. POST par lot (max 50) au fournisseur configuré.
5. En cas de 200 OK : `UPDATE sent = 1`.
6. En cas d'erreur : reste `sent = 0`, retry différé.
7. Événements marqués `sent = 1` supprimés après 24 h.

## Refus / retrait

- Toggle dans l'Espace Parent : « Analytics anonymes ».
- Refus par défaut à la première ouverture (COPPA / RGPD conformes).
- En cas de retrait : purge immédiate de `analytics_queue`, appel `POST /analytics/forget/:profile_id_hash` au serveur.

## Documentation du fournisseur

Aucun fournisseur activé par défaut (`VITE_ANALYTICS_PROVIDER=none`). Le parent (au sens produit) peut activer PostHog ou Amplitude en changeant l'env. L'abstraction TS (`src/analytics/analytics.ts`) permet de brancher un autre fournisseur en implémentant `AnalyticsProvider`.
