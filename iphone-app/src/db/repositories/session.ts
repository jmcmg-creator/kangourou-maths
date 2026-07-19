import type { Database } from '../database.js';
import type { Session } from '../types.js';

interface Row {
  id: string;
  profile_id: string;
  royaume_id: string;
  level_id: string;
  mode: Session['mode'];
  score: number;
  total: number;
  duration_ms: number;
  started_at: number;
  finished_at: number;
}

const map = (r: Row): Session => ({
  id: r.id,
  profileId: r.profile_id,
  royaumeId: r.royaume_id,
  levelId: r.level_id,
  mode: r.mode,
  score: r.score,
  total: r.total,
  durationMs: r.duration_ms,
  startedAt: r.started_at,
  finishedAt: r.finished_at
});

export class SessionRepository {
  constructor(private readonly db: Database) {}

  async insert(s: Session): Promise<void> {
    await this.db.execute(
      'INSERT INTO sessions (id, profile_id, royaume_id, level_id, mode, score, total, duration_ms, started_at, finished_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [s.id, s.profileId, s.royaumeId, s.levelId, s.mode, s.score, s.total, s.durationMs, s.startedAt, s.finishedAt]
    );
  }

  async saveAnswer(
    sessionId: string, questionIdx: number, exerciseId: string,
    chosenAnswer: number, correct: boolean, timeMs: number
  ): Promise<void> {
    await this.db.execute(
      'INSERT INTO session_answers (session_id, question_idx, exercise_id, chosen_answer, correct, time_ms) VALUES (?, ?, ?, ?, ?, ?)',
      [sessionId, questionIdx, exerciseId, chosenAnswer, correct ? 1 : 0, timeMs]
    );
  }

  async recentForProfile(profileId: string, limit = 10): Promise<Session[]> {
    const clampedLimit = Math.max(1, Math.min(limit, 100));
    const rows = await this.db.query<Row>(
      'SELECT * FROM sessions WHERE profile_id = ? ORDER BY started_at DESC LIMIT ' + clampedLimit,
      [profileId]
    );
    return rows.map(map);
  }

  async findById(id: string): Promise<Session | null> {
    const rows = await this.db.query<Row>('SELECT * FROM sessions WHERE id = ?', [id]);
    return rows[0] ? map(rows[0]) : null;
  }
}
