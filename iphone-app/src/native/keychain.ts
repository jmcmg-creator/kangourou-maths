/**
 * Wrapper autour du stockage sécurisé iOS (Keychain).
 * Utilise @capacitor/preferences en fallback (moins sûr mais utile en dev).
 * Réservé aux secrets : PIN hashé + sel, jetons de sync.
 */

const g = globalThis as { Capacitor?: { isNativePlatform: () => boolean } };

async function backend() {
  if (g.Capacitor?.isNativePlatform?.()) {
    const { Preferences } = await import('@capacitor/preferences');
    return Preferences;
  }
  // Fallback dev/tests : localStorage cloisonné sous préfixe.
  const prefix = 'royaume-savoirs.secure.';
  return {
    async get({ key }: { key: string }) {
      return { value: window.localStorage.getItem(prefix + key) };
    },
    async set({ key, value }: { key: string; value: string }) {
      window.localStorage.setItem(prefix + key, value);
    },
    async remove({ key }: { key: string }) {
      window.localStorage.removeItem(prefix + key);
    }
  };
}

export async function secureGet(key: string): Promise<string | null> {
  const b = await backend();
  const r = await b.get({ key });
  return r.value ?? null;
}

export async function secureSet(key: string, value: string): Promise<void> {
  const b = await backend();
  await b.set({ key, value });
}

export async function secureRemove(key: string): Promise<void> {
  const b = await backend();
  await b.remove({ key });
}
