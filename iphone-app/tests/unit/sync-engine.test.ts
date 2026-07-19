import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryDatabase } from '../../src/db/database.js';
import { runMigrations } from '../../src/db/migrations/index.js';
import { SyncQueueRepository } from '../../src/db/repositories/sync-queue.js';
import { SyncEngine, type SyncTransport } from '../../src/sync/engine.js';
import { NetworkService } from '../../src/network/network.js';

class FakeTransport implements SyncTransport {
  public calls: unknown[] = [];
  constructor(private nextResults: Array<{ ok: boolean; retryable: boolean; error?: string }>) {}
  async push(entry: unknown) {
    this.calls.push(entry);
    return this.nextResults.shift() ?? { ok: true, retryable: false };
  }
}

async function setup() {
  const db = new MemoryDatabase();
  await runMigrations(db);
  const repo = new SyncQueueRepository(db);
  const network = new NetworkService();
  // Force online sans plugin capacitor
  (network as unknown as { state: string }).state = 'online';
  return { db, repo, network };
}

describe('SyncEngine', () => {
  beforeEach(() => vi.useRealTimers());

  it('marque done les actions poussées avec succès', async () => {
    const { db, repo, network } = await setup();
    const transport = new FakeTransport([{ ok: true, retryable: false }]);
    const engine = new SyncEngine(db, { transport, network, debounceMs: 0 });

    await repo.enqueue({
      id: 'a1',
      profileId: 'p1',
      actionType: 'profile_upsert',
      payload: '{"aid":"abc"}',
      version: 1,
      createdAt: Date.now()
    });

    await engine.forceTick();
    const pending = await repo.takePending();
    expect(pending).toHaveLength(0);
    expect(transport.calls).toHaveLength(1);
  });

  it('laisse pending et incrémente attempts en cas d’erreur retryable', async () => {
    const { db, repo, network } = await setup();
    const transport = new FakeTransport([{ ok: false, retryable: true, error: 'HTTP 500' }]);
    const engine = new SyncEngine(db, { transport, network, debounceMs: 0 });

    await repo.enqueue({
      id: 'a2',
      profileId: 'p1',
      actionType: 'profile_upsert',
      payload: '{"aid":"abc"}',
      version: 1,
      createdAt: Date.now()
    });

    await engine.forceTick();
    const rows = await repo.listByStatus('pending');
    expect(rows).toHaveLength(1);
    expect(rows[0]!.attempts).toBe(1);
    expect(rows[0]!.lastError).toBe('HTTP 500');
  });

  it('passe en failed après 12 tentatives ou erreur non-retryable', async () => {
    const { db, repo, network } = await setup();
    const transport = new FakeTransport([{ ok: false, retryable: false, error: 'HTTP 400' }]);
    const engine = new SyncEngine(db, { transport, network, debounceMs: 0 });

    await repo.enqueue({
      id: 'a3',
      profileId: 'p1',
      actionType: 'profile_upsert',
      payload: '{"aid":"abc"}',
      version: 1,
      createdAt: Date.now()
    });

    await engine.forceTick();
    const failed = await repo.listByStatus('failed');
    expect(failed).toHaveLength(1);
  });

  it('ne tick pas si offline', async () => {
    const { db, repo, network } = await setup();
    (network as unknown as { state: string }).state = 'offline';
    const transport = new FakeTransport([{ ok: true, retryable: false }]);
    const engine = new SyncEngine(db, { transport, network, debounceMs: 0 });

    await repo.enqueue({
      id: 'a4',
      profileId: 'p1',
      actionType: 'profile_upsert',
      payload: '{}',
      version: 1,
      createdAt: Date.now()
    });

    await engine.forceTick();
    const pending = await repo.takePending();
    expect(pending).toHaveLength(1);
    expect(transport.calls).toHaveLength(0);
  });
});
