/**
 * Rate limiting par IP pour royaume-api.
 *
 * POURQUOI : /profile/<aid> ne demande aucune authentification. L'aid est
 * dérivé de SHA-256(pseudo + code parent à 6 chiffres), soit 10^6 possibilités.
 * Sans limite de débit, un attaquant qui connaît un pseudo (visible en battle)
 * épuise l'espace des codes en 1 à 2 heures. Avec 10 tentatives/heure, il lui
 * faut plus de 11 ans.
 *
 * Stockage : Cloudflare KV. La cohérence de KV est *éventuelle*, donc le
 * compteur est approximatif à la marge (quelques requêtes peuvent passer en
 * plus lors d'un pic simultané). C'est sans importance ici : on cherche à
 * casser une attaque de 10^6 requêtes, pas à compter au près.
 * Pour un comptage exact, passer à un Durable Object.
 */

/** Fenêtre d'une heure, alignée sur l'horloge (bucket = timestamp / 3600). */
const WINDOW_SECONDS = 3600;

/**
 * @param {string} ip        adresse client (en-tête CF-Connecting-IP)
 * @param {string} bucket    nom du compteur, ex. 'profile-get'
 * @param {number} max       nombre de requêtes autorisées par fenêtre
 * @param {KVNamespace} kv   binding KV (voir wrangler.toml)
 * @returns {Promise<{allowed: boolean, remaining: number, resetIn: number}>}
 */
export async function checkRateLimit(ip, bucket, max, kv) {
  const window = Math.floor(Date.now() / 1000 / WINDOW_SECONDS);
  const key = `rl:${bucket}:${ip}:${window}`;

  const current = parseInt((await kv.get(key)) || '0', 10);
  const resetIn = (window + 1) * WINDOW_SECONDS - Math.floor(Date.now() / 1000);

  if (current >= max) {
    return { allowed: false, remaining: 0, resetIn };
  }

  // expirationTtl purge la clé toute seule : pas de ménage à faire.
  await kv.put(key, String(current + 1), { expirationTtl: WINDOW_SECONDS + 60 });
  return { allowed: true, remaining: max - current - 1, resetIn };
}

/** Réponse 429 standard, avec Retry-After pour les clients bien élevés. */
export function tooManyRequests(resetIn) {
  return new Response(
    JSON.stringify({ error: { message: 'Trop de requêtes. Réessaie plus tard.' } }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(resetIn),
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}
