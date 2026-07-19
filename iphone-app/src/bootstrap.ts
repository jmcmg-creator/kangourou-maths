/**
 * Point d'entrée principal chargé par www/index.html AVANT game.js.
 *
 * Séquence :
 *  1. Ouvrir SQLite (natif ou mémoire selon plateforme)
 *  2. Appliquer les migrations
 *  3. Initialiser réseau, analytics, sync
 *  4. Exposer window.Bridge pour que le shim ios-shim.js redirige les
 *     appels de game.js (localStorage, fetch) vers cette couche.
 */

import { openNativeDatabase, MemoryDatabase, type Database } from './db/database.js';
import { runMigrations } from './db/migrations/index.js';
import { ProfileRepository } from './db/repositories/profile.js';
import { SyncQueueRepository } from './db/repositories/sync-queue.js';
import { NetworkService } from './network/network.js';
import { SyncEngine, HttpTransport } from './sync/engine.js';
import { Analytics, NoopProvider } from './analytics/analytics.js';
import { haptic, setHapticsEnabled } from './native/haptics.js';
import { secureGet, secureSet } from './native/keychain.js';
import { installIosShim } from './shim/ios-shim.js';

interface BridgeAPI {
  storage: {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
  };
  sync: {
    enqueue(profileId: string, actionType: string, payload: unknown): Promise<void>;
    now(): Promise<void>;
  };
  analytics: {
    track(name: string, props?: Record<string, string | number | boolean | null>): Promise<void>;
  };
  network: {
    isOnline(): boolean;
  };
  haptic: typeof haptic;
  secure: {
    get: typeof secureGet;
    set: typeof secureSet;
  };
  ready: Promise<void>;
}

declare global {
  interface Window {
    Bridge: BridgeAPI;
  }
}

async function openDb(): Promise<Database> {
  if (globalThis.Capacitor?.isNativePlatform?.()) {
    return openNativeDatabase('royaume_savoirs');
  }
  // Dev navigateur & tests : mémoire (les données ne survivent pas au rechargement,
  // mais on est en dev — un vrai sql.js pourrait être ajouté ici).
  return new MemoryDatabase();
}

const apiBase = import.meta.env.VITE_API_BASE ?? 'https://royaume-api.square-paris75.workers.dev';

let readyResolve!: () => void;
const ready = new Promise<void>(r => { readyResolve = r; });

(async () => {
  const db = await openDb();
  await runMigrations(db);

  const network = new NetworkService();
  await network.init();

  const analytics = new Analytics(db, new NoopProvider());
  // Consentement par défaut = false, activable dans l'Espace Parent.

  const syncEngine = new SyncEngine(db, {
    transport: new HttpTransport(apiBase),
    network,
    batchSize: 20,
    debounceMs: 500
  });
  syncEngine.start();

  const syncRepo = new SyncQueueRepository(db);
  const profileRepo = new ProfileRepository(db);

  // Storage bridge : redirige les appels localStorage vers SQLite.
  // Format : key → row unique dans une table dédiée (via parent_settings pour
  // les réglages, ou via profileRepo pour les profils). Ici on stocke tout
  // sous parent_settings pour rester compatible avec l'API localStorage
  // simpliste utilisée par game.js.
  const storage = {
    async get(key: string): Promise<string | null> {
      const rows = await db.query<{ value: string }>(
        'SELECT value FROM parent_settings WHERE key = ?',
        [key]
      );
      return rows[0]?.value ?? null;
    },
    async set(key: string, value: string): Promise<void> {
      const existing = await this.get(key);
      if (existing === null) {
        await db.execute(
          'INSERT INTO parent_settings (key, value) VALUES (?, ?)',
          [key, value]
        );
      } else {
        await db.execute(
          'UPDATE parent_settings SET value = ? WHERE key = ?',
          [value, key]
        );
      }
    },
    async remove(key: string): Promise<void> {
      await db.execute('DELETE FROM parent_settings WHERE key = ?', [key]);
    }
  };

  const bridge: BridgeAPI = {
    storage,
    sync: {
      async enqueue(profileId, actionType, payload) {
        await syncRepo.enqueue({
          id: crypto.randomUUID(),
          profileId,
          actionType: actionType as never,
          payload: JSON.stringify(payload),
          version: 1,
          createdAt: Date.now()
        });
        syncEngine.scheduleTick();
      },
      async now() { await syncEngine.forceTick(); }
    },
    analytics: {
      async track(name, props = {}) { await analytics.track(name, props); }
    },
    network: {
      isOnline() { return network.isOnline(); }
    },
    haptic,
    secure: { get: secureGet, set: secureSet },
    ready
  };

  window.Bridge = bridge;

  // Charge les préférences (ex. haptique désactivé)
  const hapticsPref = await storage.get('haptics_enabled');
  if (hapticsPref === '0') setHapticsEnabled(false);

  // Charge un consentement analytics enregistré
  const consent = await storage.get('analytics_consent');
  analytics.setConsent(consent === '1');

  // Installe le shim iOS AVANT de signaler ready. Sur iOS, il redirige
  // localStorage vers SQLite ; sur web, il est no-op.
  await installIosShim(bridge);

  // Force une première tentative de sync si en ligne
  if (network.isOnline()) syncEngine.scheduleTick();

  // Marque bridge prêt : le boot script de index.html peut maintenant charger
  // exercises.js + game.js en toute sécurité (le shim est en place).
  readyResolve();

  // Trace un événement de démarrage (no-op sans consentement)
  await analytics.track('app_opened', {
    network_state: network.getState(),
    profiles_local: (await profileRepo.list()).length
  });
})().catch(err => {
  // eslint-disable-next-line no-console
  console.error('[bootstrap] échec initialisation', err);
});
