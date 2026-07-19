import { describe, it, expect } from 'vitest';
import { xpForAnswer, stageForXp, stageProgressPct, shouldSuggestBreak, streakBadgeUnlocked } from '../../src/gamification/rules.js';

describe('xpForAnswer', () => {
  it('donne 0 XP pour une mauvaise réponse', () => {
    expect(xpForAnswer(false, 5, 3)).toEqual({ baseXp: 0, streakBonus: 0, cristaux: 0 });
  });

  it('donne baseXp = 5 + 2*diff pour une bonne réponse sans streak', () => {
    expect(xpForAnswer(true, 0, 1).baseXp).toBe(7);
    expect(xpForAnswer(true, 0, 5).baseXp).toBe(15);
  });

  it('applique un bonus de série à partir de 5', () => {
    expect(xpForAnswer(true, 4, 3).streakBonus).toBe(0);
    expect(xpForAnswer(true, 5, 3).streakBonus).toBe(5);
    expect(xpForAnswer(true, 12, 3).streakBonus).toBe(10);
  });

  it('clamp la difficulté [1..5]', () => {
    expect(xpForAnswer(true, 0, 99).baseXp).toBe(15);
    expect(xpForAnswer(true, 0, -3).baseXp).toBe(7);
  });
});

describe('stageForXp', () => {
  it('retourne 0 pour un débutant', () => {
    expect(stageForXp(0)).toBe(0);
  });

  it('avance d’étage quand on franchit un seuil', () => {
    expect(stageForXp(49)).toBe(0);
    expect(stageForXp(50)).toBe(1);
    expect(stageForXp(300)).toBe(3);
    expect(stageForXp(9999)).toBe(8);
  });
});

describe('stageProgressPct', () => {
  it('donne 0 % à un pallier, 100 % au max', () => {
    expect(stageProgressPct(0)).toBe(0);
    expect(stageProgressPct(50)).toBe(0);
    expect(stageProgressPct(9999)).toBe(100);
  });

  it('interpole entre les paliers', () => {
    const p = stageProgressPct(200); // entre 150 (stage 2) et 300 (stage 3)
    expect(p).toBeGreaterThanOrEqual(30);
    expect(p).toBeLessThanOrEqual(40);
  });
});

describe('shouldSuggestBreak', () => {
  it('ok tant qu’en dessous de 75 %', () => {
    expect(shouldSuggestBreak(10, 30)).toBe('ok');
  });

  it('gentle entre 75 % et 100 %', () => {
    expect(shouldSuggestBreak(25, 30)).toBe('gentle');
  });

  it('firm au-delà de la limite', () => {
    expect(shouldSuggestBreak(31, 30)).toBe('firm');
  });
});

describe('streakBadgeUnlocked', () => {
  it('débloque un badge aux paliers 5, 10, 20, 50', () => {
    expect(streakBadgeUnlocked(5)).toBe('streak_5');
    expect(streakBadgeUnlocked(10)).toBe('streak_10');
    expect(streakBadgeUnlocked(20)).toBe('streak_20');
    expect(streakBadgeUnlocked(50)).toBe('streak_50');
  });

  it('renvoie null hors palier', () => {
    expect(streakBadgeUnlocked(3)).toBeNull();
    expect(streakBadgeUnlocked(11)).toBeNull();
  });
});
