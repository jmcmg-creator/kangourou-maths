import type { AnalyticsProvider, EventProps } from './analytics.js';

/** Pour dev/staging : imprime les événements en console, aucune requête réseau. */
export class ConsoleProvider implements AnalyticsProvider {
  async identify(id: string, traits?: EventProps): Promise<void> {
    // eslint-disable-next-line no-console
    console.info('[analytics] identify', id, traits ?? {});
  }
  async track(name: string, props: EventProps): Promise<void> {
    // eslint-disable-next-line no-console
    console.info('[analytics]', name, props);
  }
  async reset(): Promise<void> {
    // eslint-disable-next-line no-console
    console.info('[analytics] reset');
  }
}

interface PostHogInit {
  apiKey: string;
  host?: string;
  fetchImpl?: typeof fetch;
}

/**
 * PostHog minimaliste : POST par lot vers /capture.
 * Zéro dep, pas de auto-tracking, respecte à la lettre notre taxonomie.
 */
export class PostHogProvider implements AnalyticsProvider {
  private queue: Array<{ event: string; properties: EventProps; distinct_id: string; timestamp: string }> = [];
  private distinctId = 'anonymous';
  private timer: ReturnType<typeof setTimeout> | null = null;
  private readonly apiKey: string;
  private readonly host: string;
  private readonly fetchImpl: typeof fetch;

  constructor(opts: PostHogInit) {
    this.apiKey = opts.apiKey;
    this.host = opts.host ?? 'https://eu.i.posthog.com';
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  async identify(id: string, traits?: EventProps): Promise<void> {
    this.distinctId = id;
    if (traits) {
      await this.track('$identify', { $set: JSON.stringify(traits) });
    }
  }

  async track(name: string, props: EventProps): Promise<void> {
    this.queue.push({
      event: name,
      properties: { ...props, $lib: 'royaume-savoirs-ios' },
      distinct_id: this.distinctId,
      timestamp: new Date().toISOString()
    });
    this.scheduleFlush();
  }

  async reset(): Promise<void> {
    this.queue = [];
    this.distinctId = 'anonymous';
  }

  private scheduleFlush() {
    if (this.timer) return;
    this.timer = setTimeout(() => { this.timer = null; void this.flush(); }, 2000);
  }

  private async flush() {
    if (this.queue.length === 0) return;
    const batch = this.queue.splice(0, 50);
    try {
      await this.fetchImpl(this.host + '/batch/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: this.apiKey, batch })
      });
    } catch {
      // Requeue en tête et on réessaie plus tard.
      this.queue.unshift(...batch);
      this.scheduleFlush();
    }
  }
}

/**
 * Sélectionne le provider selon l'env.
 * VITE_ANALYTICS_PROVIDER = 'posthog' | 'console' | 'none'.
 */
export function makeProvider(): AnalyticsProvider {
  const kind = import.meta.env.VITE_ANALYTICS_PROVIDER ?? 'none';
  const key = import.meta.env.VITE_ANALYTICS_KEY ?? '';
  if (kind === 'posthog' && key) return new PostHogProvider({ apiKey: key });
  if (kind === 'console' as string) return new ConsoleProvider();
  // NoopProvider est fourni par analytics.ts pour ne pas créer de dépendance circulaire.
  return {
    async identify() {},
    async track() {},
    async reset() {}
  };
}
