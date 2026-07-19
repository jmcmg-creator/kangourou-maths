/**
 * Shim iOS : redirige les API navigateur utilisées par la web app existante
 * vers la couche native (SQLite via window.Bridge).
 *
 * Installé PAR bootstrap.ts, une fois que window.Bridge existe et est prêt.
 * Doit terminer avant que game.js soit chargé — sinon game.js verrait un
 * localStorage vide au premier accès.
 *
 * Sur navigateur (mode dev sans Capacitor), reste inerte.
 */

interface BridgeStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

interface Bridge {
  storage: BridgeStorage;
  haptic(style?: string): Promise<void>;
}

declare global {
  interface Window {
    __IOS_SHIM__?: {
      forceReloadFromDb: () => Promise<void>;
      getCacheSnapshot: () => Record<string, string>;
      getPendingCount: () => number;
    };
  }
}

const KEYS_TO_HYDRATE = [
  'royaume_v3',
  'royaume_profiles_v1',
  'royaume_active_v1',
  'royaume_aid'
];

/**
 * Installe le shim. Retourne une promesse résolue quand le cache est chargé
 * depuis SQLite (donc quand game.js peut safely appeler getItem).
 */
export async function installIosShim(bridge: Bridge): Promise<void> {
  if (!globalThis.Capacitor?.isNativePlatform?.()) return;

  const cache: Record<string, string> = {};
  const pending: Array<{ type: 'set' | 'remove'; key: string; value?: string }> = [];
  let flushTimer: ReturnType<typeof setTimeout> | null = null;

  const scheduleFlush = () => {
    if (flushTimer) return;
    flushTimer = setTimeout(() => {
      flushTimer = null;
      const batch = pending.splice(0, pending.length);
      for (const op of batch) {
        if (op.type === 'set') void bridge.storage.set(op.key, op.value ?? '').catch(() => {});
        else void bridge.storage.remove(op.key).catch(() => {});
      }
    }, 100);
  };

  const shimStorage: Storage = {
    getItem(k: string): string | null { return cache[k] ?? null; },
    setItem(k: string, v: string): void {
      cache[k] = String(v);
      pending.push({ type: 'set', key: k, value: String(v) });
      scheduleFlush();
    },
    removeItem(k: string): void {
      delete cache[k];
      pending.push({ type: 'remove', key: k });
      scheduleFlush();
    },
    clear(): void {
      for (const k of Object.keys(cache)) pending.push({ type: 'remove', key: k });
      for (const k of Object.keys(cache)) delete cache[k];
      scheduleFlush();
    },
    key(i: number): string | null { return Object.keys(cache)[i] ?? null; },
    get length(): number { return Object.keys(cache).length; }
  };

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    get() { return shimStorage; }
  });

  // Feedback haptique automatique sur les réponses aux exercices.
  document.addEventListener('click', (e: Event) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    setTimeout(() => {
      if (t.classList?.contains('choice')) {
        if (t.classList.contains('correct')) void bridge.haptic('success');
        else if (t.classList.contains('wrong')) void bridge.haptic('warning');
      }
    }, 20);
  }, true);

  // Hydrate le cache depuis SQLite AVANT de rendre la main.
  await Promise.all(
    KEYS_TO_HYDRATE.map(async k => {
      const v = await bridge.storage.get(k);
      if (v !== null) cache[k] = v;
    })
  );

  window.__IOS_SHIM__ = {
    async forceReloadFromDb() {
      await Promise.all(
        KEYS_TO_HYDRATE.map(async k => {
          const v = await bridge.storage.get(k);
          if (v !== null) cache[k] = v; else delete cache[k];
        })
      );
    },
    getCacheSnapshot() { return { ...cache }; },
    getPendingCount() { return pending.length; }
  };
}
