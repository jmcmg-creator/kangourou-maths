/**
 * Abstraction du stockage SQL. Deux implémentations :
 *  - `NativeSqliteDatabase` : plugin @capacitor-community/sqlite (iOS/Android).
 *  - `MemoryDatabase`       : miroir en mémoire pour tests unitaires (Vitest).
 *
 * Aucun code métier n'importe le plugin Capacitor directement.
 * Tout passe par l'interface `Database` ci-dessous.
 */

export interface Database {
  execute(sql: string, params?: unknown[]): Promise<void>;
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
  transaction<T>(fn: (tx: Database) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

/**
 * Implémentation Capacitor. Le vrai wrapper autour de
 * `@capacitor-community/sqlite`. Chargé dynamiquement pour que les tests
 * unitaires (qui utilisent la mémoire) n'aient jamais besoin du plugin natif.
 */
export async function openNativeDatabase(dbName: string): Promise<Database> {
  const { CapacitorSQLite, SQLiteConnection } = await import('@capacitor-community/sqlite');
  const sqlite = new SQLiteConnection(CapacitorSQLite);

  const isConn = (await sqlite.isConnection(dbName, false)).result;
  const dbConn = isConn
    ? await sqlite.retrieveConnection(dbName, false)
    : await sqlite.createConnection(dbName, false, 'no-encryption', 1, false);

  await dbConn.open();

  const impl: Database = {
    async execute(sql, params = []) {
      await dbConn.run(sql, params as never[]);
    },
    async query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
      const r = await dbConn.query(sql, params as never[]);
      return (r.values ?? []) as T[];
    },
    async transaction<T>(fn: (tx: Database) => Promise<T>): Promise<T> {
      await dbConn.execute('BEGIN;');
      try {
        const res = await fn(impl);
        await dbConn.execute('COMMIT;');
        return res;
      } catch (e) {
        await dbConn.execute('ROLLBACK;');
        throw e;
      }
    },
    async close() {
      await dbConn.close();
      await sqlite.closeConnection(dbName, false);
    }
  };

  return impl;
}

/**
 * Implémentation mémoire minimale pour tests unitaires.
 * Ne cherche pas à être un vrai moteur SQL : elle enregistre les rows sous
 * forme de dicts et supporte un petit sous-ensemble d'opérations
 * (SELECT * FROM table WHERE col = ?, INSERT, UPDATE, DELETE, etc.)
 * suffisant pour tester nos repositories.
 *
 * Pour des tests d'intégration réalistes on utilisera plutôt sql.js.
 */
export class MemoryDatabase implements Database {
  private tables = new Map<string, Record<string, unknown>[]>();
  private closed = false;

  private ensure(name: string) {
    if (!this.tables.has(name)) this.tables.set(name, []);
    return this.tables.get(name)!;
  }

  async execute(sql: string, params: unknown[] = []): Promise<void> {
    const trimmed = sql.trim().replace(/;$/, '');
    const upper = trimmed.toUpperCase();

    if (upper.startsWith('CREATE TABLE') || upper.startsWith('CREATE INDEX')) {
      const m = trimmed.match(/CREATE TABLE(?: IF NOT EXISTS)?\s+(\w+)/i);
      if (m && m[1]) this.ensure(m[1]);
      return;
    }
    if (upper.startsWith('BEGIN') || upper.startsWith('COMMIT') || upper.startsWith('ROLLBACK')) {
      return;
    }
    if (upper.startsWith('INSERT INTO')) return this.insert(trimmed, params);
    if (upper.startsWith('UPDATE ')) return this.update(trimmed, params);
    if (upper.startsWith('DELETE FROM')) return this.delete(trimmed, params);
    throw new Error('MemoryDatabase: SQL non supporté : ' + trimmed.slice(0, 80));
  }

  async query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
    const m = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?\s*;?$/is);
    if (!m) throw new Error('MemoryDatabase: SELECT non parsable : ' + sql);
    const table = m[2] as string;
    const whereClause = m[3];
    const limitStr = m[5];
    const rows = this.ensure(table).slice();
    let filtered = whereClause ? rows.filter(r => matchesWhere(r, whereClause, params)) : rows;
    if (limitStr) filtered = filtered.slice(0, parseInt(limitStr, 10));
    return filtered as T[];
  }

  async transaction<T>(fn: (tx: Database) => Promise<T>): Promise<T> {
    // Sauvegarde superficielle pour rollback en cas d'exception.
    const snapshot = new Map<string, Record<string, unknown>[]>();
    for (const [k, v] of this.tables) snapshot.set(k, v.map(r => ({ ...r })));
    try {
      return await fn(this);
    } catch (e) {
      this.tables = snapshot;
      throw e;
    }
  }

  async close(): Promise<void> {
    this.closed = true;
    this.tables.clear();
  }

  isClosed(): boolean {
    return this.closed;
  }

  private insert(sql: string, params: unknown[]) {
    const m = sql.match(/INSERT INTO\s+(\w+)\s*\(([^)]+)\)\s+VALUES\s*\(([^)]+)\)/i);
    if (!m) throw new Error('MemoryDatabase: INSERT non parsable : ' + sql);
    const table = m[1] as string;
    const cols = (m[2] as string).split(',').map(s => s.trim());
    const placeholders = (m[3] as string).split(',').map(s => s.trim());
    const row: Record<string, unknown> = {};
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i]!;
      const ph = placeholders[i]!;
      row[col] = ph === '?' ? params.shift() : parseLiteral(ph);
    }
    this.ensure(table).push(row);
  }

  private update(sql: string, params: unknown[]) {
    const m = sql.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i);
    if (!m) throw new Error('MemoryDatabase: UPDATE non parsable : ' + sql);
    const table = m[1] as string;
    const sets = (m[2] as string).split(',').map(s => s.trim());
    const whereClause = m[3];
    const remainingParams = params.slice();
    for (const row of this.ensure(table)) {
      if (whereClause && !matchesWhere(row, whereClause, remainingParams.slice(sets.filter(s => s.includes('?')).length))) continue;
      for (const s of sets) {
        const mm = s.match(/(\w+)\s*=\s*(\?|\S+)/);
        if (!mm) continue;
        row[mm[1]!] = mm[2] === '?' ? remainingParams.shift() : parseLiteral(mm[2]!);
      }
    }
  }

  private delete(sql: string, params: unknown[]) {
    const m = sql.match(/DELETE FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i);
    if (!m) throw new Error('MemoryDatabase: DELETE non parsable : ' + sql);
    const table = m[1] as string;
    const whereClause = m[2];
    const rows = this.ensure(table);
    const kept = whereClause ? rows.filter(r => !matchesWhere(r, whereClause, params)) : [];
    this.tables.set(table, kept);
  }
}

function parseLiteral(s: string): unknown {
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  if (/^\d+\.\d+$/.test(s)) return parseFloat(s);
  if (/^'.*'$/.test(s)) return s.slice(1, -1);
  if (s === 'NULL') return null;
  return s;
}

function matchesWhere(row: Record<string, unknown>, clause: string, params: unknown[]): boolean {
  // Support minimal : "col = ?" combinés par AND ; suffisant pour nos repos.
  const parts = clause.split(/\s+AND\s+/i);
  const p = params.slice();
  for (const part of parts) {
    const m = part.match(/(\w+)\s*(=|!=|<|>|<=|>=)\s*(\?|\S+)/);
    if (!m) return false;
    const col = m[1]!;
    const op = m[2]!;
    const rhs = m[3] === '?' ? p.shift() : parseLiteral(m[3]!);
    const lhs = row[col];
    switch (op) {
      case '=':  if (lhs !== rhs) return false; break;
      case '!=': if (lhs === rhs) return false; break;
      case '<':  if (!((lhs as number) < (rhs as number))) return false; break;
      case '>':  if (!((lhs as number) > (rhs as number))) return false; break;
      case '<=': if (!((lhs as number) <= (rhs as number))) return false; break;
      case '>=': if (!((lhs as number) >= (rhs as number))) return false; break;
    }
  }
  return true;
}
