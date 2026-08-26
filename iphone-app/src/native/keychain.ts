/**
 * Stockage local de préférences — PAS le Keychain iOS.
 *
 * ⚠️ AVERTISSEMENT (audit sécurité) ⚠️
 * L'en-tête précédent annonçait « Wrapper autour du stockage sécurisé iOS
 * (Keychain) » et « Réservé aux secrets : PIN hashé + sel, jetons de sync ».
 * C'était faux. En natif, ce module utilise @capacitor/preferences, qui écrit
 * dans NSUserDefaults : un fichier .plist en clair dans le conteneur de l'app,
 * inclus dans les sauvegardes iTunes/iCloud non chiffrées et lisible sur un
 * appareil jailbreaké.
 *
 * Aucun secret ne doit donc transiter par ici : ni PIN parent (même hashé),
 * ni sel, ni jeton de synchronisation.
 *
 * Pour obtenir un vrai Keychain, il faut capacitor-secure-storage-plugin (ou
 * équivalent), qui exige @capacitor/core >= 8 — ce projet est en Capacitor 6.
 * C'est le même blocage que pour la biométrie (voir biometric.ts) : les deux se
 * débloquent avec la migration Capacitor 6 → 8.
 *
 * En attendant, storeSecret() lève une exception plutôt que d'écrire un secret
 * dans un stockage qui ne le protège pas.
 */

async function backend() {
  if (globalThis.Capacitor?.isNativePlatform?.()) {
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

/** Lecture d'une préférence NON sensible. */
export async function secureGet(key: string): Promise<string | null> {
  const b = await backend();
  const r = await b.get({ key });
  return r.value ?? null;
}

/** Écriture d'une préférence NON sensible. Ne jamais y mettre de secret. */
export async function secureSet(key: string, value: string): Promise<void> {
  const b = await backend();
  await b.set({ key, value });
}

export async function secureRemove(key: string): Promise<void> {
  const b = await backend();
  await b.remove({ key });
}

/**
 * Point d'entrée réservé aux vrais secrets (PIN parent, jetons).
 * Échoue volontairement tant qu'aucun backend Keychain n'est disponible :
 * mieux vaut une fonctionnalité bloquée qu'un secret exposé en clair.
 */
export async function storeSecret(_key: string, _value: string): Promise<never> {
  throw new Error(
    'storeSecret: aucun stockage chiffré disponible (Capacitor 6 sans plugin Keychain). ' +
    'Migrer en Capacitor 8 + capacitor-secure-storage-plugin avant de stocker un secret.'
  );
}
