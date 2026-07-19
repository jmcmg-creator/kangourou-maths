import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Structure Capacitor-friendly :
//  - root = www/  (l'entrée est www/index.html)
//  - publicDir = static (résolu www/static/, copié tel quel à la build)
//  - build sort dans ../dist (à la racine de iphone-app), attendu par
//    capacitor.config.ts (webDir: 'dist')
//  - fs.allow permet d'importer ../src/bootstrap.ts depuis www/index.html
export default defineConfig({
  root: 'www',
  publicDir: 'static',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5174,
    strictPort: false,
    fs: {
      allow: ['..']
    }
  }
});
