import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// La build Vite produit `dist/` que Capacitor emballe dans l'app iOS.
// Le script sync-www copie d'abord la web app dans www/static ; Vite fusionne
// ensuite tout dans dist/.
export default defineConfig({
  root: 'www',
  publicDir: 'static',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'www/index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5174,
    strictPort: false
  }
});
