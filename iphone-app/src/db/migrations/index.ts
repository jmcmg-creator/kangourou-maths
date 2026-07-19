import type { Database } from '../database.js';
import initialSql from './001_initial.sql?raw';

interface Migration {
  version: number;
  sql: string;
}

const MIGRATIONS: Migration[] = [
  { version: 1, sql: initialSql }
];

async function currentVersion(db: Database): Promise<number> {
  try {
    const rows = await db.query<{ version: number }>(
      'SELECT version FROM _schema_version ORDER BY version DESC LIMIT 1'
    );
    return rows[0]?.version ?? 0;
  } catch {
    return 0;
  }
}

/** Applique toutes les migrations en attente. Idempotent. */
export async function runMigrations(db: Database): Promise<void> {
  const current = await currentVersion(db);
  const pending = MIGRATIONS.filter(m => m.version > current);
  for (const m of pending) {
    await db.transaction(async tx => {
      const statements = m.sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));
      for (const s of statements) {
        await tx.execute(s);
      }
      await tx.execute(
        'INSERT INTO _schema_version (version, applied_at) VALUES (?, ?)',
        [m.version, Date.now()]
      );
    });
  }
}
