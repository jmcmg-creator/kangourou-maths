/// <reference types="vite/client" />

// Types manquants pour les globals injectés par Capacitor et les imports Vite.
declare module '*.sql?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_ANALYTICS_PROVIDER?: 'posthog' | 'amplitude' | 'none';
  readonly VITE_ANALYTICS_KEY?: string;
  readonly VITE_LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error' | 'silent';
  readonly VITE_FEATURE_DOWNLOAD_PACKS?: string;
  readonly VITE_FEATURE_PARENT_BIOMETRIC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface CapacitorGlobal {
  isNativePlatform(): boolean;
  getPlatform(): 'ios' | 'android' | 'web';
}

declare global {
  interface Window {
    Capacitor?: CapacitorGlobal;
  }
  var Capacitor: CapacitorGlobal | undefined;
}

export {};
