import type { Database } from '../db/database.js';
import { SyncQueueRepository } from '../db/repositories/sync-queue.js';
import type { NetworkService } from '../network/network.js';
import type { SyncQueueEntry } from '../db/types.js';

export interface SyncTransport {
  push(entry: SyncQueueEntry): Promise<{ ok: boolean; retryable: boolean; error?: string }>;
}

/**
 * Transport HTTP par défaut, tape le Worker Cloudflare (route dépendante
 * du type d'action). Les erreurs 4xx (hors 429) sont non-retryables.
 */
export class HttpTransport implements SyncTransport {
  constructor(
    private readonly apiBase: string,
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  async push(entry: SyncQueueEntry): Promise<{ ok: boolean; retryable: boolean; error?: string }> {
    const url = this.urlFor(entry);
    try {
      const res = await this.fetchImpl(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: entry.payload
      });
      if (res.ok) return { ok: true, retryable: false };
      if (res.status === 429 || res.status >= 500) {
        return { ok: false, retryable: true, error: `HTTP ${res.status}` };
      }
      return { ok: false, retryable: false, error: `HTTP ${res.status}` };
    } catch (e) {
      return { ok: false, retryable: true, error: (e as Error).message };
    }
  }

  private urlFor(entry: SyncQueueEntry): string {
    switch (entry.actionType) {
      case 'profile_upsert':
        return `${this.apiBase}/profile/${encodeURIComponent(this.aidFromPayload(entry))}`;
      default:
        return `${this.apiBase}/profile/${encodeURIComponent(this.aidFromPayload(entry))}`;
    }
  }

  private aidFromPayload(entry: SyncQueueEntry): string {
    try {
      const p = JSON.parse(entry.payload) as { aid?: string };
      return p.aid ?? entry.profileId;
    } catch {
      return entry.profileId;
    }
  }
}

interface SyncEngineOptions {
  transport: SyncTransport;
  network: NetworkService;
  batchSize?: number;
  debounceMs?: number;
}

/**
 * Moteur de sync. Drain la file en réponse aux triggers (retour réseau, tick
 * manuel, écriture locale). Retry avec backoff dans la repo elle-même.
 */
export class SyncEngine {
  private repo: SyncQueueRepository;
  private transport: SyncTransport;
  private network: NetworkService;
  private batchSize: number;
  private debounceMs: number;
  private ticking = false;
  private pendingTick: ReturnType<typeof setTimeout> | null = null;
  private unsubscribeNetwork: (() => void) | null = null;

  constructor(db: Database, opts: SyncEngineOptions) {
    this.repo = new SyncQueueRepository(db);
    this.transport = opts.transport;
    this.network = opts.network;
    this.batchSize = opts.batchSize ?? 20;
    this.debounceMs = opts.debounceMs ?? 500;
  }

  start(): void {
    this.unsubscribeNetwork = this.network.subscribe(state => {
      if (state === 'online') this.scheduleTick();
    });
  }

  stop(): void {
    this.unsubscribeNetwork?.();
    if (this.pendingTick) clearTimeout(this.pendingTick);
  }

  scheduleTick(): void {
    if (this.pendingTick) clearTimeout(this.pendingTick);
    this.pendingTick = setTimeout(() => { void this.tick(); }, this.debounceMs);
  }

  /** Force un cycle immédiat (bouton parent « Synchroniser maintenant »). */
  async forceTick(): Promise<void> {
    if (this.pendingTick) { clearTimeout(this.pendingTick); this.pendingTick = null; }
    await this.tick();
  }

  private async tick(): Promise<void> {
    if (this.ticking) return;
    if (!this.network.isOnline()) return;
    this.ticking = true;
    try {
      const batch = await this.repo.takePending(this.batchSize);
      for (const entry of batch) {
        await this.repo.markInFlight(entry.id);
        const res = await this.transport.push(entry);
        if (res.ok) {
          await this.repo.markDone(entry.id);
        } else {
          if (!res.retryable) {
            // Erreur non-retryable → on marque directement failed via attempts=12
            for (let i = 0; i < 12; i++) {
              await this.repo.markFailure(entry.id, res.error ?? 'non-retryable');
            }
          } else {
            await this.repo.markFailure(entry.id, res.error ?? 'network');
          }
        }
      }
      await this.repo.purgeDone(24 * 60 * 60 * 1000);
    } finally {
      this.ticking = false;
    }
  }
}
