/**
 * Types entités persistés en SQLite.
 * Miroir strict des tables décrites dans docs/DATA_MODEL.md.
 */

export interface Profile {
  id: string;
  name: string;
  aid: string;
  avatar: string;              // JSON stringifié
  ageRange: string | null;
  mainDragon: string;
  createdAt: number;
  updatedAt: number;
  lastActive: number | null;
}

export interface ProgressRow {
  profileId: string;
  royaumeId: string;
  xp: number;
  cristaux: number;
  stage: number;
  totalGames: number;
  totalQuestions: number;
  totalCorrect: number;
  bestStreak: number;
  updatedAt: number;
}

export interface ExerciseStat {
  profileId: string;
  exerciseId: string;
  attempts: number;
  correct: number;
  lastSeen: number | null;
}

export interface Session {
  id: string;
  profileId: string;
  royaumeId: string;
  levelId: string;
  mode: 'training' | 'challenge' | 'adaptive' | 'progression';
  score: number;
  total: number;
  durationMs: number;
  startedAt: number;
  finishedAt: number;
}

export interface Reward {
  profileId: string;
  rewardId: string;
  rewardType: 'badge' | 'trophy' | 'outfit' | 'dragon';
  unlockedAt: number;
}

export type SyncActionType =
  | 'profile_upsert'
  | 'session_completed'
  | 'reward_unlocked'
  | 'custom_poem_upsert'
  | 'daily_quest_progress';

export type SyncStatus = 'pending' | 'in_flight' | 'done' | 'failed';

export interface SyncQueueEntry {
  id: string;
  profileId: string;
  actionType: SyncActionType;
  payload: string;             // JSON stringifié
  version: number;
  status: SyncStatus;
  attempts: number;
  lastError: string | null;
  lastAttempt: number | null;
  createdAt: number;
}

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  props: string;               // JSON stringifié
  ts: number;
  sent: 0 | 1;
}
