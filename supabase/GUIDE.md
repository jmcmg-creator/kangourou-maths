# 🗄️ Activer Supabase (pseudos + base de données) — 5 minutes

Quand c'est fait : chaque enfant a un **pseudo unique au monde** (garanti par la
base) protégé par un **PIN**, son profil est stocké dans une vraie base
Postgres, et les battles/défis utilisent le pseudo (fini les collisions entre
deux « Léa »).

Tant que ce n'est **pas** fait : l'app fonctionne exactement comme avant
(système actuel). Rien ne casse.

## Étape 1 — Créer le projet (2 min)

1. Va sur **https://supabase.com** → Sign in (compte GitHub ou email)
2. **New project**
   - Name : `royaume-savoirs`
   - Database password : génère-le et garde-le dans un gestionnaire de mots de passe
   - Region : **Europe (Frankfurt) `eu-central-1`** ← important, RGPD enfants
3. Attends ~2 min que le projet démarre

## Étape 2 — Coller le schéma SQL (1 min)

1. Menu gauche → **SQL Editor** → **New query**
2. Ouvre le fichier `supabase/schema.sql` de ce repo, copie TOUT
3. Colle → **Run** → tu dois voir `Success. No rows returned`

C'est rejouable sans risque si besoin.

## Étape 3 — Récupérer les 2 clés (1 min)

Menu gauche → **Settings** → **API** :

- **Project URL** → ressemble à `https://abcdefghijk.supabase.co`
- **anon / public key** → longue chaîne commençant par `eyJ…`

⚠️ Ne copie JAMAIS la clé `service_role` (celle-là est secrète, elle ne doit
jamais aller dans le site).

## Étape 4 — Les coller dans l'app (1 min)

Ouvre `config.js` à la racine du repo et remplis :

```js
window.SUPABASE_CONFIG = {
  url: "https://abcdefghijk.supabase.co",   // ta Project URL
  anonKey: "eyJ..."                          // ta clé anon public
};
```

Commit + push → l'app détecte la config et active :

- l'écran « Choisis ton pseudo de battle » après la création de profil
- la connexion pseudo + PIN depuis n'importe quel appareil
- la sauvegarde du profil dans Postgres (en plus du système actuel)
- les défis entre pseudos (boîte à défis en base)

## Vérifier que ça marche

1. Ouvre l'app → crée/ouvre un profil → l'écran pseudo apparaît
2. Choisis un pseudo (3-16 caractères, lettres/chiffres/-/_) + un PIN 4 chiffres
3. Dans Supabase → **Table Editor** → table `players` → ta ligne est là,
   le PIN est illisible (haché bcrypt) ✅
4. Sur un 2ᵉ appareil : « J'ai déjà un pseudo » → pseudo + PIN → le profil arrive

## Sécurité (ce que le schéma garantit)

- Tables **verrouillées** : la clé anon ne peut ni lire ni écrire directement —
  uniquement appeler 7 fonctions contrôlées
- PIN haché en **bcrypt** (illisible même pour toi dans la console)
- Chaque joueur a un **jeton secret** : impossible de lire/écraser le profil
  d'un autre enfant, même en connaissant son pseudo
- Pseudo unique **insensible à la casse** (« Dragon » et « dragon » = pris)
- Réponse identique « pseudo inconnu » / « PIN faux » (pas d'énumération)
