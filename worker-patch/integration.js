/**
 * À intégrer dans le fetch() du Worker royaume-api.
 * Place ce bloc AVANT toute lecture/écriture de profil.
 */
import { checkRateLimit, tooManyRequests } from './rate-limit.js';

// Limites par IP et par heure.
//   GET  = vecteur d'énumération des codes parents → strict.
//   PUT  = synchro légitime de l'app (un enfant qui joue sauvegarde souvent,
//          débounce 1 s côté client) → généreux, sinon la synchro casse.
const LIMITS = {
  'profile-get': 10,
  'profile-put': 120
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    if (url.pathname.startsWith('/profile/')) {
      const bucket = request.method === 'GET' ? 'profile-get' : 'profile-put';

      // OPTIONS (préflight CORS) n'est pas une tentative : ne pas décompter.
      if (request.method !== 'OPTIONS') {
        const rl = await checkRateLimit(ip, bucket, LIMITS[bucket], env.RATE_LIMIT_KV);
        if (!rl.allowed) return tooManyRequests(rl.resetIn);
      }
    }

    // … le reste de ton routage existant …
  }
};

/**
 * ⚠️ DEUX RÈGLES À NE PAS OUBLIER dans le handler de profil lui-même :
 *
 * 1. Réponse IDENTIQUE pour « profil inexistant » et « mauvais code ».
 *    Si les deux diffèrent (404 vs 200-null, ou temps de réponse différent),
 *    l'attaquant sait quand il a trouvé le bon pseudo et n'a plus qu'à
 *    chercher le code. Renvoie `null` avec un 200 dans les deux cas.
 *
 * 2. PURGER LES ANCIENS PROFILS.
 *    Tous ceux créés avant la correction sont stockés sous
 *    aid = SHA-256('royaume:' + prénom), sans code parent. Ils restent
 *    lisibles ET modifiables par quiconque devine le prénom, quel que soit
 *    le rate limiting — 10 tentatives suffisent pour 10 prénoms courants.
 *    Le rate limiting ne protège QUE les nouveaux profils.
 */
