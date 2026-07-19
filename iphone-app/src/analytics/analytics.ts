/**
 * Abstraction analytics. Aucun composant UI n'importe un fournisseur
 * spécifique — tout passe par cette interface. Le fournisseur est choisi
 * via l'env `VITE_ANALYTICS_PROVIDER`.
 *
 * Événements et propriétés doivent respecter docs/ANALYTICS_EVENT_TAXONOMY.md
 * (bucketisation, anonymisation, opt-in).
 */

import type { Database } from '../db/database.js';

export type EventProps = Record<string, string | number | boolean | null>;

export interface AnalyticsProvider {
  identify(pseudonymousId: string, traits?: EventProps): Promise<void>;
  track(name: string, props: EventProps): Promise<void>;
  reset(): Promise<void>;
}

/** Provider par défaut : ne fait rien (utile en dev, en test, ou quand le
 *  parent a refusé les analytics). */
export class NoopProvider implements AnalyticsProvider {
  async identify(): Promise<void> {}
  async track(): Promise<void> {}
  async reset(): Promise<void> {}
}

interface AnalyticsRow {
  id: string;
  event_name: string;
  props: string;
  ts: number;
  sent: 0 | 1;
}

/**
 * Analytics avec file locale : écrit en SQLite d'abord, envoie ensuite
 * en lot. Un refus du consentement purge la file et met le provider en Noop.
 */
export class Analytics {
  private consent = false;

  constructor(
    private readonly db: Database,
    private provider: AnalyticsProvider
  ) {}

  setConsent(consent: boolean): void {
    this.consent = consent;
    if (!consent) {
      void this.db.execute('DELETE FROM analytics_queue');
    }
  }

  setProvider(p: AnalyticsProvider): void {
    this.provider = p;
  }

  async track(name: string, props: EventProps = {}): Promise<void> {
    if (!this.consent) return;
    const id = cryptoRandomId();
    await this.db.execute(
      'INSERT INTO analytics_queue (id, event_name, props, ts, sent) VALUES (?, ?, ?, ?, ?)',
      [id, name, JSON.stringify(props), Date.now(), 0]
    );
  }

  async flush(): Promise<{ sent: number; failed: number }> {
    if (!this.consent) return { sent: 0, failed: 0 };
    const rows = await this.db.query<AnalyticsRow>(
      'SELECT * FROM analytics_queue WHERE sent = ? LIMIT 50',
      [0]
    );
    let sent = 0;
    let failed = 0;
    for (const r of rows) {
      try {
        await this.provider.track(r.event_name, JSON.parse(r.props) as EventProps);
        await this.db.execute('UPDATE analytics_queue SET sent = ? WHERE id = ?', [1, r.id]);
        sent++;
      } catch {
        failed++;
      }
    }
    // Purge des événements envoyés il y a plus de 24 h
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    await this.db.execute('DELETE FROM analytics_queue WHERE sent = ? AND ts < ?', [1, cutoff]);
    return { sent, failed };
  }
}

function cryptoRandomId(): string {
  const g = globalThis as { crypto?: { randomUUID?: () => string } };
  if (g.crypto?.randomUUID) return g.crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
