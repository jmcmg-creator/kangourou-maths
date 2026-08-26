/* Service Worker — Le Royaume des Savoirs
 * Stratégie :
 *  - App shell (HTML, JS, manifest, fonts) en cache-first → ouverture instantanée hors-ligne.
 *  - Appels API Worker (royaume-api) en network-only → toujours frais quand en ligne, échec
 *    clean quand offline (l'app intercepte pour afficher un message).
 *  - Modèle Whisper / MP3 poésies en stale-while-revalidate → joue ce qu'on a, met à jour
 *    en arrière-plan.
 *
 * Bump CACHE_VERSION pour forcer une mise à jour du shell.
 */
const CACHE_VERSION = 'royaume-v40';
const SHELL_CACHE = CACHE_VERSION + '-shell';
const RUNTIME_CACHE = CACHE_VERSION + '-runtime';

const SHELL_URLS = [
  './',
  './index.html',
  './manifest.json',
  './exercises.js?v=15',
  './exercises_extra.js?v=9',
  './exercises_logic.js?v=1',
  './config.js?v=2',
  './supa.js?v=2',
  './qr.js?v=1',
  './game.js?v=60',
  // Schémas du corps humain : 44 Ko au total, mis en cache avec le shell pour
  // que les questions de SVT restent illustrées hors connexion.
  // Les 29 drapeaux dessinés : 124 Ko, mis en cache pour que le quiz de
  // géographie reste jouable hors connexion.
  './images/flags/ar.svg',
  './images/flags/au.svg',
  './images/flags/be.svg',
  './images/flags/br.svg',
  './images/flags/ca.svg',
  './images/flags/ch.svg',
  './images/flags/cn.svg',
  './images/flags/de.svg',
  './images/flags/eg.svg',
  './images/flags/es.svg',
  './images/flags/fr.svg',
  './images/flags/gb.svg',
  './images/flags/gr.svg',
  './images/flags/ie.svg',
  './images/flags/in.svg',
  './images/flags/it.svg',
  './images/flags/jp.svg',
  './images/flags/kr.svg',
  './images/flags/ma.svg',
  './images/flags/mx.svg',
  './images/flags/nl.svg',
  './images/flags/pl.svg',
  './images/flags/pt.svg',
  './images/flags/ru.svg',
  './images/flags/se.svg',
  './images/flags/sn.svg',
  './images/flags/tr.svg',
  './images/flags/us.svg',
  './images/flags/za.svg',
  './images/flags/at.svg',
  './images/flags/ci.svg',
  './images/flags/co.svg',
  './images/flags/dk.svg',
  './images/flags/dz.svg',
  './images/flags/fi.svg',
  './images/flags/hu.svg',
  './images/flags/il.svg',
  './images/flags/kp.svg',
  './images/flags/ne.svg',
  './images/flags/no.svg',
  './images/flags/nz.svg',
  './images/flags/pk.svg',
  './images/flags/th.svg',
  './images/flags/tn.svg',
  './images/flags/uy.svg',
  './images/flags/vn.svg',
  './images/anatomy/heart.svg',
  './images/anatomy/brain.svg',
  './images/anatomy/lungs.svg',
  './images/anatomy/kidneys.svg',
  './images/anatomy/skeleton.svg',
  './images/anatomy/muscle.svg',
  './images/anatomy/digestion.svg',
  './images/anatomy/blood.svg',
  './images/anatomy/senses.svg',
  './images/anatomy/nutrients.svg',
];

// Domaines à laisser passer en network-only (jamais cacher).
const NETWORK_ONLY_HOSTS = [
  'royaume-api.square-paris75.workers.dev',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      // addAll échoue tout entier si une URL plante. On utilise add(...) en parallèle pour
      // tolérer les requêtes qui ne répondent pas (ex. fichiers déjà supprimés).
      Promise.all(SHELL_URLS.map((u) => cache.add(u).catch((e) => console.warn('[sw] skip cache', u, e))))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('royaume-') && !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // POST/PUT vers Worker — pas de cache, pas d'intervention.

  const url = new URL(req.url);

  // Network-only pour le Worker API : on ne cache jamais de réponse signée.
  if (NETWORK_ONLY_HOSTS.includes(url.host)) {
    return; // laisse passer au navigateur
  }

  // App shell + assets du même origine : cache-first, fallback réseau, fallback shell.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached ||
        fetch(req).then((res) => {
          // Met en cache les réponses 200 OK pour les prochains chargements offline.
          // 'audio' fait partie de la liste : sans lui, les enregistrements des
          // tables et des poèmes n'étaient jamais mis en cache et l'app
          // redevenait muette hors connexion — un défaut qu'on ne découvre
          // qu'en voiture ou dans le métro. On ne les PRÉ-charge pas pour
          // autant (1,5 Mo au premier démarrage) : ils se gardent au fur et à
          // mesure qu'on les écoute, ce qui est exactement l'usage.
          if (res && res.status === 200 && (req.destination === 'script' || req.destination === 'document' || req.destination === 'manifest' || req.destination === 'style' || req.destination === 'image' || req.destination === 'audio')) {
            const clone = res.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, clone));
          }
          return res;
        }).catch(() =>
          // Offline et pas en cache : on retombe sur l'index pour les requêtes de navigation.
          req.mode === 'navigation' ? caches.match('./index.html') : Response.error()
        )
      )
    );
    return;
  }

  // Polices Google + autres CDN : stale-while-revalidate (HF Whisper, jsdelivr, fonts).
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, clone));
        }
        return res;
      }).catch(() => cached); // offline → ce qu'on a
      return cached || network;
    })
  );
});

// Message d'invalidation manuelle si besoin (depuis l'app : sw.postMessage({type:'PURGE'}))
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PURGE') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});
