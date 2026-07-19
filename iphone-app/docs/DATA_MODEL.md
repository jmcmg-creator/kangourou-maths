# Modèle de données SQLite

Base : `royaume_savoirs.db`, stockée dans `Library/CapacitorDatabase/` (sauvegardée iCloud si activé).

## Version du schéma

Table `_schema_version` (un seul row). La migration se fait via `src/db/migrations/`. Version actuelle : **1**.

## Tables

### `profiles`
Un profil enfant. Isolés logiquement.

```sql
CREATE TABLE profiles (
  id            TEXT PRIMARY KEY,                -- UUID v4
  name          TEXT NOT NULL,
  aid           TEXT UNIQUE NOT NULL,             -- SHA-256(nom normalisé), pour sync cross-device
  avatar        TEXT NOT NULL DEFAULT '{}',       -- JSON : couleurs, accessoires
  age_range     TEXT,                              -- '6-8' | '8-10' | '10-12'
  main_dragon   TEXT NOT NULL DEFAULT 'main',
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL,
  last_active   INTEGER
);
CREATE INDEX idx_profiles_aid ON profiles(aid);
CREATE INDEX idx_profiles_last_active ON profiles(last_active DESC);
```

### `progress`
XP + cristaux + stats par royaume, par profil.

```sql
CREATE TABLE progress (
  profile_id       TEXT NOT NULL,
  royaume_id       TEXT NOT NULL,
  xp               INTEGER NOT NULL DEFAULT 0,
  cristaux         INTEGER NOT NULL DEFAULT 0,
  stage            INTEGER NOT NULL DEFAULT 0,
  total_games      INTEGER NOT NULL DEFAULT 0,
  total_questions  INTEGER NOT NULL DEFAULT 0,
  total_correct    INTEGER NOT NULL DEFAULT 0,
  best_streak      INTEGER NOT NULL DEFAULT 0,
  updated_at       INTEGER NOT NULL,
  PRIMARY KEY (profile_id, royaume_id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
```

### `exercise_stats`
Historique par exercice (pour rotation intelligente).

```sql
CREATE TABLE exercise_stats (
  profile_id   TEXT NOT NULL,
  exercise_id  TEXT NOT NULL,
  attempts     INTEGER NOT NULL DEFAULT 0,
  correct      INTEGER NOT NULL DEFAULT 0,
  last_seen    INTEGER,
  PRIMARY KEY (profile_id, exercise_id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
CREATE INDEX idx_exstats_lastseen ON exercise_stats(profile_id, last_seen DESC);
```

### `sessions`
Historique des sessions (une = une partie terminée).

```sql
CREATE TABLE sessions (
  id            TEXT PRIMARY KEY,                 -- UUID v4
  profile_id    TEXT NOT NULL,
  royaume_id    TEXT NOT NULL,
  level_id      TEXT NOT NULL,
  mode          TEXT NOT NULL,                     -- training | challenge | adaptive | progression
  score         INTEGER NOT NULL,
  total         INTEGER NOT NULL,
  duration_ms   INTEGER NOT NULL,
  started_at    INTEGER NOT NULL,
  finished_at   INTEGER NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
CREATE INDEX idx_sessions_profile_date ON sessions(profile_id, started_at DESC);
```

### `session_answers`
Réponse à chaque question d'une session (utile pour espace parent + adaptation locale).

```sql
CREATE TABLE session_answers (
  session_id     TEXT NOT NULL,
  question_idx   INTEGER NOT NULL,
  exercise_id    TEXT NOT NULL,
  chosen_answer  INTEGER NOT NULL,
  correct        INTEGER NOT NULL,                 -- 0 | 1
  time_ms        INTEGER NOT NULL,
  PRIMARY KEY (session_id, question_idx),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);
```

### `rewards`
Badges, trophées, accessoires débloqués.

```sql
CREATE TABLE rewards (
  profile_id  TEXT NOT NULL,
  reward_id   TEXT NOT NULL,                       -- ex: 'badge_10_streaks'
  reward_type TEXT NOT NULL,                       -- badge | trophy | outfit | dragon
  unlocked_at INTEGER NOT NULL,
  PRIMARY KEY (profile_id, reward_id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
```

### `daily_quests`
Une quête par jour, par profil.

```sql
CREATE TABLE daily_quests (
  profile_id   TEXT NOT NULL,
  date         TEXT NOT NULL,                      -- YYYY-MM-DD
  quest_type   TEXT NOT NULL,
  target       INTEGER NOT NULL,
  progress     INTEGER NOT NULL DEFAULT 0,
  reward_xp    INTEGER NOT NULL,
  done         INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (profile_id, date),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
```

### `custom_poems`
Poésies personnalisées ajoutées par le parent.

```sql
CREATE TABLE custom_poems (
  id          TEXT PRIMARY KEY,
  profile_id  TEXT NOT NULL,
  title       TEXT NOT NULL,
  author      TEXT,
  text        TEXT NOT NULL,
  duration_s  INTEGER,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
```

### `sync_queue`
File d'attente de la synchronisation vers le Worker.

```sql
CREATE TABLE sync_queue (
  id             TEXT PRIMARY KEY,                 -- UUID v4
  profile_id     TEXT NOT NULL,
  action_type    TEXT NOT NULL,                    -- profile_upsert | rewards_add | ...
  payload        TEXT NOT NULL,                    -- JSON
  version        INTEGER NOT NULL DEFAULT 1,
  status         TEXT NOT NULL DEFAULT 'pending',  -- pending | in_flight | done | failed
  attempts       INTEGER NOT NULL DEFAULT 0,
  last_error     TEXT,
  last_attempt   INTEGER,
  created_at     INTEGER NOT NULL
);
CREATE INDEX idx_syncq_pending ON sync_queue(status, created_at) WHERE status = 'pending';
```

### `analytics_queue`
File d'attente des événements analytics.

```sql
CREATE TABLE analytics_queue (
  id            TEXT PRIMARY KEY,                  -- UUID v4
  event_name    TEXT NOT NULL,
  props         TEXT NOT NULL,                     -- JSON minimisé
  ts            INTEGER NOT NULL,
  sent          INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_aq_unsent ON analytics_queue(sent, ts) WHERE sent = 0;
```

### `download_packs`
Suivi des packs de contenus téléchargés.

```sql
CREATE TABLE download_packs (
  pack_id       TEXT PRIMARY KEY,                  -- ex: 'poesies_mp3_v1'
  version       TEXT NOT NULL,
  total_bytes   INTEGER NOT NULL,
  local_path    TEXT NOT NULL,
  checksum      TEXT NOT NULL,
  status        TEXT NOT NULL,                     -- downloaded | in_progress | failed
  downloaded_at INTEGER
);
```

### `parent_settings`
Réglages parentaux locaux.

```sql
CREATE TABLE parent_settings (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);
```

Clés utilisées : `pin_hash`, `pin_salt`, `pin_last_fail_at`, `pin_fail_count`, `analytics_consent`, `session_max_minutes`, `wifi_only_downloads`, `notifications_enabled`.

Le PIN hash est stocké aussi dans la **Keychain iOS** ; SQLite garde une copie pour lecture rapide, mais la Keychain est autoritative en cas de conflit.

## Règles d'intégrité

- Toutes les tables `profile_id` référentielles ont `ON DELETE CASCADE`. Supprimer un profil supprime toute sa progression, ses sessions, ses récompenses.
- Les modifications passent par des transactions (`BEGIN; ... COMMIT;`).
- L'écriture d'une réponse à un exercice met à jour `exercise_stats`, `progress`, `sessions/session_answers` dans une seule transaction.
- Chaque écriture met aussi un event dans `sync_queue` (dans la même transaction). Impossible d'avoir une écriture locale sans son ordre de sync.

## Migrations

`src/db/migrations/001_initial.sql` (ci-dessus). Format : suite de scripts SQL numérotés, exécutés en ordre. La version courante est lue depuis `_schema_version`. En cas d'échec, rollback + log + tentative au prochain démarrage.

## Sauvegarde

- La base est stockée dans `Library/CapacitorDatabase/` : incluse dans les sauvegardes iCloud/iTunes.
- Export manuel possible depuis l'Espace Parent → JSON exhaustif (identique au bouton « Exporter » de la web app).
- Import : accepte les JSON exportés par la web app **et** par cette app.
