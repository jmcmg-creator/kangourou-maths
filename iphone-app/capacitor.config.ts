import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.royaumesavoirs.ios',
  appName: 'Royaume des Savoirs',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: false,
    scheme: 'RoyaumeDesSavoirs',
    backgroundColor: '#0f0a2e'
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'app',
    cleartext: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: '#0f0a2e',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      iosKeychainPrefix: 'royaume-savoirs'
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f0a2e',
      overlay: true
    }
  }
};

export default config;
