-- Migration initiale (schéma v1)
-- Voir docs/DATA_MODEL.md pour la description en langage humain.

CREATE TABLE IF NOT EXISTS _schema_version (
  version     INTEGER PRIMARY KEY,
  applied_at  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  aid           TEXT UNIQUE NOT NULL,
  avatar        TEXT NOT NULL DEFAULT '{}',
  age_range     TEXT,
  main_dragon   TEXT NOT NULL DEFAULT 'main',
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL,
  last_active   INTEGER
);

CREATE TABLE IF NOT EXISTS progress (
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
  PRIMARY KEY (profile_id, royaume_id)
);

CREATE TABLE IF NOT EXISTS exercise_stats (
  profile_id   TEXT NOT NULL,
  exercise_id  TEXT NOT NULL,
  attempts     INTEGER NOT NULL DEFAULT 0,
  correct      INTEGER NOT NULL DEFAULT 0,
  last_seen    INTEGER,
  PRIMARY KEY (profile_id, exercise_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id            TEXT PRIMARY KEY,
  profile_id    TEXT NOT NULL,
  royaume_id    TEXT NOT NULL,
  level_id      TEXT NOT NULL,
  mode          TEXT NOT NULL,
  score         INTEGER NOT NULL,
  total         INTEGER NOT NULL,
  duration_ms   INTEGER NOT NULL,
  started_at    INTEGER NOT NULL,
  finished_at   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS session_answers (
  session_id     TEXT NOT NULL,
  question_idx   INTEGER NOT NULL,
  exercise_id    TEXT NOT NULL,
  chosen_answer  INTEGER NOT NULL,
  correct        INTEGER NOT NULL,
  time_ms        INTEGER NOT NULL,
  PRIMARY KEY (session_id, question_idx)
);

CREATE TABLE IF NOT EXISTS rewards (
  profile_id  TEXT NOT NULL,
  reward_id   TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  unlocked_at INTEGER NOT NULL,
  PRIMARY KEY (profile_id, reward_id)
);

CREATE TABLE IF NOT EXISTS daily_quests (
  profile_id   TEXT NOT NULL,
  date         TEXT NOT NULL,
  quest_type   TEXT NOT NULL,
  target       INTEGER NOT NULL,
  progress     INTEGER NOT NULL DEFAULT 0,
  reward_xp    INTEGER NOT NULL,
  done         INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (profile_id, date)
);

CREATE TABLE IF NOT EXISTS custom_poems (
  id          TEXT PRIMARY KEY,
  profile_id  TEXT NOT NULL,
  title       TEXT NOT NULL,
  author      TEXT,
  text        TEXT NOT NULL,
  duration_s  INTEGER,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sync_queue (
  id             TEXT PRIMARY KEY,
  profile_id     TEXT NOT NULL,
  action_type    TEXT NOT NULL,
  payload        TEXT NOT NULL,
  version        INTEGER NOT NULL DEFAULT 1,
  status         TEXT NOT NULL DEFAULT 'pending',
  attempts       INTEGER NOT NULL DEFAULT 0,
  last_error     TEXT,
  last_attempt   INTEGER,
  created_at     INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_queue (
  id            TEXT PRIMARY KEY,
  event_name    TEXT NOT NULL,
  props         TEXT NOT NULL,
  ts            INTEGER NOT NULL,
  sent          INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS download_packs (
  pack_id       TEXT PRIMARY KEY,
  version       TEXT NOT NULL,
  total_bytes   INTEGER NOT NULL,
  local_path    TEXT NOT NULL,
  checksum      TEXT NOT NULL,
  status        TEXT NOT NULL,
  downloaded_at INTEGER
);

CREATE TABLE IF NOT EXISTS parent_settings (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);
