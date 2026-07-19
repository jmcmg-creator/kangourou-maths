/**
 * Face ID / Touch ID pour l'Espace Parent.
 * Ne remplace jamais le PIN : il l'accélère uniquement.
 *
 * Utilise @capgo/capacitor-native-biometric. No-op sur le web (dev).
 */

export type BiometricResult =
  | { available: false; reason: 'not_native' | 'not_available' | 'not_enrolled' }
  | { available: true; type: 'faceId' | 'touchId' | 'unknown' };

export async function biometricAvailable(): Promise<BiometricResult> {
  if (!globalThis.Capacitor?.isNativePlatform?.()) {
    return { available: false, reason: 'not_native' };
  }
  try {
    const { NativeBiometric, BiometryType } = await import('@capgo/capacitor-native-biometric');
    const info = await NativeBiometric.isAvailable();
    if (!info.isAvailable) {
      return { available: false, reason: 'not_available' };
    }
    const type = info.biometryType === BiometryType.FACE_ID
      ? 'faceId'
      : info.biometryType === BiometryType.TOUCH_ID
        ? 'touchId'
        : 'unknown';
    return { available: true, type };
  } catch {
    return { available: false, reason: 'not_available' };
  }
}

/** Demande l'auth biométrique avant d'exposer l'Espace Parent. */
export async function biometricPrompt(reason: string): Promise<boolean> {
  if (!globalThis.Capacitor?.isNativePlatform?.()) return true;
  try {
    const { NativeBiometric } = await import('@capgo/capacitor-native-biometric');
    await NativeBiometric.verifyIdentity({
      reason,
      title: 'Espace Parent',
      subtitle: 'Authentifie-toi pour continuer',
      description: reason
    });
    return true;
  } catch {
    return false;
  }
}
