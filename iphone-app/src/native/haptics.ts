/**
 * Feedback haptique. Utilise le plugin Capacitor Haptics quand dispo,
 * no-op sinon. Coupable au niveau du parent (`parent_settings.haptics_enabled`).
 */

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

let enabled = true;

export function setHapticsEnabled(v: boolean): void {
  enabled = v;
}

export async function haptic(style: HapticStyle = 'light'): Promise<void> {
  if (!enabled) return;
  if (!globalThis.Capacitor?.isNativePlatform?.()) return;
  try {
    const { Haptics, ImpactStyle, NotificationType } = await import('@capacitor/haptics');
    switch (style) {
      case 'light':     await Haptics.impact({ style: ImpactStyle.Light }); return;
      case 'medium':    await Haptics.impact({ style: ImpactStyle.Medium }); return;
      case 'heavy':     await Haptics.impact({ style: ImpactStyle.Heavy }); return;
      case 'selection': await Haptics.selectionStart(); return;
      case 'success':   await Haptics.notification({ type: NotificationType.Success }); return;
      case 'warning':   await Haptics.notification({ type: NotificationType.Warning }); return;
      case 'error':     await Haptics.notification({ type: NotificationType.Error }); return;
    }
  } catch {
    // pas d'erreur remontée : haptique = confort, jamais bloquant
  }
}
