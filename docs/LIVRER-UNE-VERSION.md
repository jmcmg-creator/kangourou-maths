# Livrer une version aux testeurs

Livrer, c'est poser un **tag** sur `main`. Le tag déclenche Codemagic, qui
construit l'app iOS et l'envoie sur TestFlight (voir `codemagic.yaml`).

Compter **~15 minutes** entre le tag et l'apparition de la version chez les
testeurs, groupe « Amis WhatsApp » compris.

---

## Deux façons de le faire

### 1. Changer le fichier `VERSION` — la voie de Claude Code

À la racine du dépôt, le fichier `VERSION` contient un seul numéro :

```
1.9
```

Le changer et pousser sur `main` suffit : le workflow lit le numéro et pose le
tag `v1.9`.

**Pourquoi passer par un fichier plutôt que par le bouton ?** Parce que le
jeton GitHub de Claude Code peut fusionner une pull request et pousser une
branche, mais il ne peut **ni** pousser un tag (`403`) **ni** déclencher un
workflow à la main (`403 Resource not accessible by integration`). Un fichier
poussé sur `main`, en revanche, il sait le faire. Le fichier `VERSION` est donc
la porte qui rend la livraison possible depuis Claude Code, sans élargir aucun
droit.

### 2. Le bouton — la voie du téléphone

Onglet **Actions** → **« Livrer une version »** → **« Run workflow »** →
taper `1.9` → bouton vert.

Aucun ordinateur nécessaire. Le fichier `VERSION` n'est alors pas consulté.

---

## Ce qui ne peut pas arriver

- **Un numéro mal écrit ne part pas.** `v1.9`, `1.9-beta`, deux lignes : refusés,
  d'abord en local par `npm test`, ensuite par le workflow.
- **Une version qui recule ne part pas.** `npm test` compare le fichier au plus
  haut tag existant. Sans ce contrôle, un numéro plus bas serait simplement
  refusé comme « déjà existant » et on croirait avoir livré.
- **Un tag existant n'est jamais réécrit.** Repousser le même `VERSION` ne
  relivre rien : le workflow dit « rien à livrer » et s'arrête. C'est ce qui
  rend la voie n°1 sans danger — pousser sur `main` sans changer le numéro ne
  déclenche aucune livraison.
- **Le tag est toujours posé sur `main`**, jamais sur une branche.

---

## Le piège à connaître

Un tag posé **avant** que la fusion soit visible sur `main` pointe sur l'ancien
commit. C'est arrivé à `v1.7`, qui désignait le commit précédent : la version
partie chez les testeurs ne contenait pas les correctifs annoncés.

La voie n°1 est immunisée : le tag est posé par le workflow déclenché **par**
la fusion, donc forcément après elle.

Avec le bouton, vérifier que `main` porte bien le commit attendu avant de
lancer.

---

## Si Codemagic ne démarre pas

Un tag poussé par un workflow avec le `GITHUB_TOKEN` par défaut ne redéclenche
aucun **workflow GitHub Actions** — c'est la règle anti-boucle de GitHub. Les
webhooks vers les services tiers comme Codemagic partent normalement, mais si
jamais le build ne démarrait pas :

1. Créer un jeton personnel GitHub (portée `repo`)
2. L'ajouter en secret sous le nom **`TAG_PAT`**
   (Settings → Secrets and variables → Actions → New repository secret)

Le workflow s'en sert dès qu'il existe, sans qu'on ait à le modifier.

En dépannage immédiat, un build peut aussi être lancé à la main depuis
l'interface Codemagic.

---

## Numéro de version, numéro de cache : ce ne sont pas les mêmes

| | Où | À quoi ça sert |
|---|---|---|
| `1.9` | `VERSION` | La version livrée aux testeurs, celle du tag |
| `v38` | `sw.js`, `index.html`, `APP_VERSION` | Le cache hors connexion — à monter à **chaque** changement de fichier, livraison ou pas |

`scripts/test-versions.mjs` vérifie la concordance des seconds ;
`scripts/test-livraison.mjs` vérifie le premier.
