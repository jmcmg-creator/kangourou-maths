# Moteur de synchronisation

## Objectifs

- Aucun événement local perdu.
- Pas de doublons côté serveur.
- Retour d'un profil sur autre appareil = fusion, pas écrasement.
- Retry résilient (backoff exponentiel, plafonné).
- Zéro impact UX en cas de panne réseau.

## Éléments

- File `sync_queue` (SQLite).
- Worker `SyncEngine` en TS (`src/sync/engine.ts`), démarré au boot.
- Détection réseau via `@capacitor/network` (`src/network/network.ts`).
- API Worker Cloudflare (déjà existante) : `PUT /profile/:aid`, `GET /profile/:aid`.

## Types d'actions synchronisables (v1)

| type | payload | idempotence |
|---|---|---|
| `profile_upsert` | profil complet (JSON) | oui, remplacement total avec version |
| `session_completed` | id session, score, exos | oui, id unique |
| `reward_unlocked` | reward_id, ts | oui, PK composée |
| `custom_poem_upsert` | poème complet | oui, id unique |
| `daily_quest_progress` | date, progress | oui, PK composée |

Chaque action porte un `id` UUID v4 unique. Le serveur déduplique côté sien avec cette clé si nécessaire.

## Cycle d'une action

1. Une écriture locale s'accompagne d'un `INSERT INTO sync_queue(...)` dans la même transaction.
2. Si `network.state === 'online'`, `SyncEngine.tick()` est déclenché (debounced 500 ms).
3. `tick()` prend les 20 premières entrées `pending`, les groupe par type.
4. Pour chaque groupe, appel HTTP au Worker.
5. Réponse OK → `UPDATE status = 'done'` puis `DELETE` après 24 h.
6. Réponse 4xx non retryable → `status = 'failed'` + log dans `parent_settings.last_sync_error`.
7. Réponse 5xx ou réseau → `attempts++`, `status = 'pending'`, backoff avant prochaine tentative.

## Backoff

`delay = min(2^attempts * 1000 ms, 5 min)`. Après 12 tentatives échouées, l'action passe en `failed` et attend intervention parentale (bouton « Forcer la sync » dans l'Espace Parent).

## Résolution de conflit

Au démarrage, on GET le profil distant. Stratégie de fusion :

- `xp`, `cristaux`, `total_games`, `total_questions`, `total_correct` : max(local, remote).
- `best_streak` : max.
- `stage` : max.
- `rewards` : union.
- `sessions` : union par id.
- `custom_poems` : union par id, `updated_at` le plus récent gagne.
- `parent_settings.avatar` : le plus récent (`updated_at`).

**Ce sont exactement les mêmes règles que la fonction `mergeProfiles` de la web app (PR #18)**, portées ici et testées unitairement.

## Détection réseau

État machine :

```
online ─── mise en veille sync stopped ──▶ suspended
   │                                        │
   │◀── retour au premier plan ─────────────┘
   │
   ├── perte connectivité ──▶ offline
   │◀── retour ──┘
   │
   └── flag limitedConnectivity si latence > 3 s (backoff plus long)
```

Un listener `Network.addListener('networkStatusChange')` déclenche `SyncEngine.tick()` au retour du réseau.

## Sync manuelle

Bouton dans l'Espace Parent : « Synchroniser maintenant ». Force un `tick()` immédiat, ignore le debounce et le backoff pour un cycle.

## Journalisation

Erreurs stockées dans `parent_settings.last_sync_error` (JSON avec timestamp + code + court résumé). Consultable dans l'Espace Parent. Ne remonte jamais à l'écran enfant.

## Test

Fichier `tests/unit/sync-engine.test.ts` — mock du client HTTP et de SQLite, vérifie :

- une action reste `pending` en offline ;
- passe à `done` après un push OK ;
- passe à `failed` après 12 échecs consécutifs ;
- ne crée pas de doublon si on rejoue la même action ;
- la fusion sur conflit garde le max XP.
