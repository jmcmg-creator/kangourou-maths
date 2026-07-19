/**
 * Shim iOS : chargé après bootstrap.ts, avant game.js.
 *
 * Redirige les APIs navigateur utilisées par la web app existante vers
 * la couche native (SQLite via window.Bridge). Reste inerte hors iOS
 * (le mode dev navigateur continue d'utiliser localStorage classique).
 *
 * IMPORTANT : ne modifie JAMAIS game.js. Toute adaptation se fait ici.
 */
(function () {
  'use strict';

  var isNative = typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
  if (!isNative) {
    // Mode dev navigateur : rien à faire, localStorage classique suffit.
    return;
  }

  // ─── Cache mémoire pour éviter que chaque getItem attende SQLite (game.js
  //     est synchrone). On snapshot au boot puis on écrit derrière.
  var cache = {};
  var pendingWrites = [];
  var ready = false;

  function loadInitialCache() {
    var keys = [
      'royaume_v3',
      'royaume_profiles_v1',
      'royaume_active_v1',
      'royaume_aid'
    ];
    return Promise.all(keys.map(function (k) {
      return window.Bridge.storage.get(k).then(function (v) {
        if (v !== null) cache[k] = v;
      });
    }));
  }

  function flush() {
    if (!ready || pendingWrites.length === 0) return;
    var batch = pendingWrites.splice(0, pendingWrites.length);
    batch.forEach(function (op) {
      if (op.type === 'set') {
        window.Bridge.storage.set(op.key, op.value).catch(function () {});
      } else if (op.type === 'remove') {
        window.Bridge.storage.remove(op.key).catch(function () {});
      }
    });
  }

  // Écrit sur SQLite après chaque modif locale, sans bloquer.
  var flushTimer = null;
  function scheduleFlush() {
    if (flushTimer) return;
    flushTimer = setTimeout(function () {
      flushTimer = null;
      flush();
    }, 100);
  }

  // ─── Remplace localStorage par un proxy qui écrit en cache + SQLite.
  var originalLocalStorage = window.localStorage;
  var shimStorage = {
    getItem: function (k) { return cache[k] !== undefined ? cache[k] : null; },
    setItem: function (k, v) {
      cache[k] = String(v);
      pendingWrites.push({ type: 'set', key: k, value: String(v) });
      scheduleFlush();
    },
    removeItem: function (k) {
      delete cache[k];
      pendingWrites.push({ type: 'remove', key: k });
      scheduleFlush();
    },
    clear: function () {
      Object.keys(cache).forEach(function (k) {
        pendingWrites.push({ type: 'remove', key: k });
      });
      cache = {};
      scheduleFlush();
    },
    key: function (i) { return Object.keys(cache)[i] || null; },
    get length() { return Object.keys(cache).length; }
  };

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    get: function () { return shimStorage; }
  });

  // ─── Feedback haptique automatique sur les réponses.
  //     Repose sur les classes CSS existantes de la web app.
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!(t instanceof Element)) return;
    // Le CSS de game.js ajoute une classe .correct / .wrong sur le choix cliqué.
    // On observe après un léger délai pour laisser la classe être posée.
    setTimeout(function () {
      if (t.classList && t.classList.contains('choice')) {
        if (t.classList.contains('correct')) window.Bridge.haptic('success');
        else if (t.classList.contains('wrong')) window.Bridge.haptic('warning');
      }
    }, 20);
  }, true);

  // ─── Boot : charge le cache initial depuis SQLite, puis autorise les
  //     lectures immédiates par game.js.
  window.Bridge.ready.then(loadInitialCache).then(function () {
    ready = true;
    flush();
  });

  // Expose une méthode pour debug / migration :
  //   window.__IOS_SHIM__.forceReloadFromDb() force un rechargement du cache.
  window.__IOS_SHIM__ = {
    forceReloadFromDb: loadInitialCache,
    getCacheSnapshot: function () { return Object.assign({}, cache); },
    getPendingCount: function () { return pendingWrites.length; },
    originalLocalStorage: originalLocalStorage
  };
})();
