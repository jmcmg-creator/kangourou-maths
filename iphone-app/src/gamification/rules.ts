/**
 * Règles pures de gamification. Aucune dépendance au DOM ou à la DB.
 * 100 % testables en isolation.
 */

export interface XpForAnswer {
  baseXp: number;
  streakBonus: number;
  cristaux: number;
}

/** XP et cristaux gagnés pour une réponse. Pénalise la mauvaise réponse. */
export function xpForAnswer(
  correct: boolean,
  streak: number,
  difficulty: number
): XpForAnswer {
  if (!correct) return { baseXp: 0, streakBonus: 0, cristaux: 0 };
  const clampedDiff = Math.max(1, Math.min(5, difficulty));
  const baseXp = 5 + clampedDiff * 2;                         // 7..15
  const streakBonus = streak >= 5 ? Math.min(streak, 10) : 0; // jusqu'à +10 XP
  const cristaux = 1 + Math.floor(clampedDiff / 2);           // 1..3
  return { baseXp, streakBonus, cristaux };
}

/** Table des seuils d'étage par royaume (identique à la web app). */
const STAGE_THRESHOLDS = [0, 50, 150, 300, 600, 1000, 1500, 2200, 3000] as const;

export function stageForXp(xp: number): number {
  let s = 0;
  for (let i = 0; i < STAGE_THRESHOLDS.length; i++) {
    const threshold = STAGE_THRESHOLDS[i];
    if (typeof threshold === 'number' && xp >= threshold) s = i;
  }
  return s;
}

export function stageProgressPct(xp: number): number {
  const s = stageForXp(xp);
  if (s >= STAGE_THRESHOLDS.length - 1) return 100;
  const lo = STAGE_THRESHOLDS[s];
  const hi = STAGE_THRESHOLDS[s + 1];
  if (typeof lo !== 'number' || typeof hi !== 'number') return 100;
  return Math.round(((xp - lo) / (hi - lo)) * 100);
}

/** Décide si une pause est à proposer, en respectant la limite parent. */
export function shouldSuggestBreak(
  cumulativeMinutes: number,
  maxMinutes: number
): 'ok' | 'gentle' | 'firm' {
  if (cumulativeMinutes >= maxMinutes) return 'firm';
  if (cumulativeMinutes >= maxMinutes * 0.75) return 'gentle';
  return 'ok';
}

/** Détermine si un badge de série est débloqué. */
export function streakBadgeUnlocked(streak: number): string | null {
  if (streak === 5)  return 'streak_5';
  if (streak === 10) return 'streak_10';
  if (streak === 20) return 'streak_20';
  if (streak === 50) return 'streak_50';
  return null;
}
