/**
 * Face ID / Touch ID pour l'Espace Parent — DÉSACTIVÉ.
 *
 * Historique (audit sécurité) :
 *   @capgo/capacitor-native-biometric 6.0.4 était installé et porte l'advisory
 *   GHSA-vx5f-vmr6-32wf — « Authentication Bypass ». Toutes les versions
 *   corrigées (>= 8.3.6) exigent @capacitor/core >= 8 ; ce projet est en
 *   Capacitor 6. Il n'existe donc aucun correctif en place.
 *
 *   Comme biometricPrompt() n'était appelé nulle part (l'Espace Parent n'est
 *   pas encore branché), la dépendance a été retirée plutôt que conservée
 *   vulnérable.
 *
 * Pour réactiver : migrer le projet en Capacitor 8, réinstaller le plugin en
 * >= 8.6.7, restaurer les appels ci-dessous, puis repasser
 * VITE_FEATURE_PARENT_BIOMETRIC à true dans .env.
 *
 * IMPORTANT : ces stubs échouent en position FERMÉE. La version précédente
 * renvoyait `true` hors natif (web/dev), ce qui ouvrait l'Espace Parent sans
 * aucune authentification dès que Capacitor n'était pas détecté.
 * Le PIN parent reste le seul garde-fou tant que la biométrie est absente.
 */

export type BiometricResult =
  | { available: false; reason: 'not_native' | 'not_available' | 'not_enrolled' | 'disabled' }
  | { available: true; type: 'faceId' | 'touchId' | 'unknown' };

export async function biometricAvailable(): Promise<BiometricResult> {
  return { available: false, reason: 'disabled' };
}

/**
 * Renvoie toujours false : aucune authentification biométrique n'est possible.
 * L'appelant DOIT retomber sur le PIN parent, jamais laisser passer.
 */
export async function biometricPrompt(_reason: string): Promise<boolean> {
  return false;
}
