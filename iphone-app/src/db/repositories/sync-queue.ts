import type { Database } from '../database.js';
import type { SyncQueueEntry, SyncActionType, SyncStatus } from '../types.js';

interface SyncRow {
  id: string;
  profile_id: string;
  action_type: SyncActionType;
  payload: string;
  version: number;
  status: SyncStatus;
  attempts: number;
  last_error: string | null;
  last_attempt: number | null;
  created_at: number;
}

const rowToEntry = (r: SyncRow): SyncQueueEntry => ({
  id: r.id,
  profileId: r.profile_id,
  actionType: r.action_type,
  payload: r.payload,
  version: r.version,
  status: r.status,
  attempts: r.attempts,
  lastError: r.last_error,
  lastAttempt: r.last_attempt,
  createdAt: r.created_at
});

export class SyncQueueRepository {
  constructor(private readonly db: Database) {}

  async enqueue(entry: Omit<SyncQueueEntry, 'attempts' | 'lastError' | 'lastAttempt' | 'status'>): Promise<void> {
    await this.db.execute(
      'INSERT INTO sync_queue (id, profile_id, action_type, payload, version, status, attempts, last_error, last_attempt, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        entry.id,
        entry.profileId,
        entry.actionType,
        entry.payload,
        entry.version,
        'pending',
        0,
        null,
        null,
        entry.createdAt
      ]
    );
  }

  async takePending(limit = 20): Promise<SyncQueueEntry[]> {
    const rows = await this.db.query<SyncRow>(
      'SELECT * FROM sync_queue WHERE status = ? ORDER BY created_at LIMIT ' + Math.max(1, Math.min(limit, 100)),
      ['pending']
    );
    return rows.map(rowToEntry);
  }

  async markInFlight(id: string): Promise<void> {
    await this.db.execute(
      'UPDATE sync_queue SET status = ?, last_attempt = ? WHERE id = ?',
      ['in_flight', Date.now(), id]
    );
  }

  async markDone(id: string): Promise<void> {
    await this.db.execute(
      'UPDATE sync_queue SET status = ? WHERE id = ?',
      ['done', id]
    );
  }

  async markFailure(id: string, error: string): Promise<void> {
    const rows = await this.db.query<{ attempts: number }>(
      'SELECT attempts FROM sync_queue WHERE id = ?',
      [id]
    );
    const attempts = (rows[0]?.attempts ?? 0) + 1;
    const status: SyncStatus = attempts >= 12 ? 'failed' : 'pending';
    await this.db.execute(
      'UPDATE sync_queue SET status = ?, attempts = ?, last_error = ?, last_attempt = ? WHERE id = ?',
      [status, attempts, error, Date.now(), id]
    );
  }

  async purgeDone(olderThanMs: number): Promise<void> {
    const cutoff = Date.now() - olderThanMs;
    await this.db.execute(
      'DELETE FROM sync_queue WHERE status = ? AND last_attempt < ?',
      ['done', cutoff]
    );
  }

  async listByStatus(status: SyncStatus): Promise<SyncQueueEntry[]> {
    const rows = await this.db.query<SyncRow>(
      'SELECT * FROM sync_queue WHERE status = ?',
      [status]
    );
    return rows.map(rowToEntry);
  }
}
