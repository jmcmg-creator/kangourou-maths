import type { Database } from '../database.js';
import type { ProgressRow } from '../types.js';

interface Row {
  profile_id: string;
  royaume_id: string;
  xp: number;
  cristaux: number;
  stage: number;
  total_games: number;
  total_questions: number;
  total_correct: number;
  best_streak: number;
  updated_at: number;
}

const map = (r: Row): ProgressRow => ({
  profileId: r.profile_id,
  royaumeId: r.royaume_id,
  xp: r.xp,
  cristaux: r.cristaux,
  stage: r.stage,
  totalGames: r.total_games,
  totalQuestions: r.total_questions,
  totalCorrect: r.total_correct,
  bestStreak: r.best_streak,
  updatedAt: r.updated_at
});

export class ProgressRepository {
  constructor(private readonly db: Database) {}

  async get(profileId: string, royaumeId: string): Promise<ProgressRow | null> {
    const rows = await this.db.query<Row>(
      'SELECT * FROM progress WHERE profile_id = ? AND royaume_id = ?',
      [profileId, royaumeId]
    );
    return rows[0] ? map(rows[0]) : null;
  }

  async listForProfile(profileId: string): Promise<ProgressRow[]> {
    const rows = await this.db.query<Row>(
      'SELECT * FROM progress WHERE profile_id = ?',
      [profileId]
    );
    return rows.map(map);
  }

  async upsert(p: ProgressRow): Promise<void> {
    const existing = await this.get(p.profileId, p.royaumeId);
    if (existing) {
      await this.db.execute(
        'UPDATE progress SET xp = ?, cristaux = ?, stage = ?, total_games = ?, total_questions = ?, total_correct = ?, best_streak = ?, updated_at = ? WHERE profile_id = ? AND royaume_id = ?',
        [p.xp, p.cristaux, p.stage, p.totalGames, p.totalQuestions, p.totalCorrect, p.bestStreak, p.updatedAt, p.profileId, p.royaumeId]
      );
    } else {
      await this.db.execute(
        'INSERT INTO progress (profile_id, royaume_id, xp, cristaux, stage, total_games, total_questions, total_correct, best_streak, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.profileId, p.royaumeId, p.xp, p.cristaux, p.stage, p.totalGames, p.totalQuestions, p.totalCorrect, p.bestStreak, p.updatedAt]
      );
    }
  }

  /** Additions atomiques (utilisé après chaque bonne réponse). */
  async incrementXpAndCristaux(
    profileId: string, royaumeId: string, xpDelta: number, cristauxDelta: number
  ): Promise<void> {
    const now = Date.now();
    const cur = await this.get(profileId, royaumeId);
    if (!cur) {
      await this.upsert({
        profileId, royaumeId,
        xp: xpDelta, cristaux: cristauxDelta,
        stage: 0, totalGames: 0, totalQuestions: 0, totalCorrect: 0, bestStreak: 0,
        updatedAt: now
      });
    } else {
      await this.upsert({
        ...cur,
        xp: cur.xp + xpDelta,
        cristaux: cur.cristaux + cristauxDelta,
        updatedAt: now
      });
    }
  }
}
