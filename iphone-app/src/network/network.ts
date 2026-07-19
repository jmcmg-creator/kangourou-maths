/**
 * Détection de connectivité + machine à états simple.
 * Wrappe @capacitor/network en dev/prod, expose un fallback navigator.onLine
 * pour les tests unitaires et le mode dev navigateur.
 */

export type NetworkState = 'online' | 'offline' | 'limitedConnectivity';

type Listener = (state: NetworkState) => void;

export class NetworkService {
  private state: NetworkState = 'online';
  private listeners = new Set<Listener>();
  private detachNative: (() => void) | null = null;

  async init(): Promise<void> {
    const isNative = typeof (globalThis as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform === 'function' &&
      (globalThis as { Capacitor: { isNativePlatform: () => boolean } }).Capacitor.isNativePlatform();

    if (isNative) {
      const { Network } = await import('@capacitor/network');
      const status = await Network.getStatus();
      this.setState(status.connected ? 'online' : 'offline');
      const handle = await Network.addListener('networkStatusChange', s => {
        this.setState(s.connected ? 'online' : 'offline');
      });
      this.detachNative = () => { void handle.remove(); };
    } else {
      const update = () => this.setState(navigator.onLine ? 'online' : 'offline');
      update();
      window.addEventListener('online', update);
      window.addEventListener('offline', update);
      this.detachNative = () => {
        window.removeEventListener('online', update);
        window.removeEventListener('offline', update);
      };
    }
  }

  destroy(): void {
    this.detachNative?.();
    this.listeners.clear();
  }

  getState(): NetworkState {
    return this.state;
  }

  isOnline(): boolean {
    return this.state === 'online' || this.state === 'limitedConnectivity';
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  /** Marque explicitement le réseau comme dégradé (latence perçue trop haute). */
  markLimited(): void {
    if (this.state === 'online') this.setState('limitedConnectivity');
  }

  private setState(s: NetworkState) {
    if (this.state === s) return;
    this.state = s;
    for (const l of this.listeners) l(s);
  }
}
