# Épingler les actions GitHub — mode d'emploi

**Temps : 20 à 30 minutes. À faire une fois, puis une ou deux fois par an.**

---

## Pourquoi

Les workflows utilisent des outils écrits par d'autres :

```yaml
uses: actions/checkout@v4
```

`v4` n'est pas une version figée — c'est une **étiquette**, comme un post-it
collé sur une boîte. Le propriétaire peut le décoller et le remettre sur une
autre boîte, quand il veut, sans prévenir. Vous demandez toujours « la boîte
v4 » et vous recevez ce qu'il y a dessous ce jour-là.

Si le compte de l'auteur est piraté, l'attaquant déplace l'étiquette vers son
code. Au passage suivant, **ce code s'exécute dans vos workflows**. Ce n'est
pas théorique : `trivy-action` et `kics-github-action` ont été compromis
exactement comme ça.

Ici, la surface est de **20 utilisations réparties sur 9 outils extérieurs**,
dont un qui peut **écrire dans le dépôt** (celui qui pose les tags). Et un tag
déclenche Codemagic, qui envoie l'app sur TestFlight — donc sur les iPhones
des enfants.

Une **empreinte de commit** (40 caractères) ne peut pas être déplacée. Si le
contenu change, l'empreinte change, et le workflow refuse de démarrer.

---

## Comment trouver une empreinte

Pour chaque outil, ouvrez le lien, repérez la version indiquée dans la
colonne « version actuelle », et copiez l'empreinte de 40 caractères.

**Deux chemins possibles :**

- **Le plus simple** — la page des tags. Cliquez sur le tag, puis sur le
  commit en haut : l'empreinte complète s'affiche, avec un bouton pour la
  copier.
- **Le plus sûr** — la page des releases : chaque release affiche le commit
  exact sur lequel elle pointe.

| Outil | Version actuelle | Où chercher |
|---|---|---|
| `actions/checkout` | `v4` | https://github.com/actions/checkout/tags |
| `actions/setup-node` | `v4` | https://github.com/actions/setup-node/tags |
| `actions/upload-artifact` | `v4` | https://github.com/actions/upload-artifact/tags |
| `github/codeql-action/init` | `v3` | https://github.com/github/codeql-action/tags |
| `github/codeql-action/analyze` | `v3` | https://github.com/github/codeql-action/tags |
| `gitleaks/gitleaks-action` | `v2` | https://github.com/gitleaks/gitleaks-action/tags |
| `google/osv-scanner-action` | `v2.0.2` | https://github.com/google/osv-scanner-action/tags |
| `lycheeverse/lychee-action` | `v2` | https://github.com/lycheeverse/lychee-action/tags |
| `marocchino/sticky-pull-request-comment` | `v2` | https://github.com/marocchino/sticky-pull-request-comment/tags |

> ⚠️ `codeql-action/init` et `codeql-action/analyze` viennent du **même
> dépôt** : c'est la même empreinte pour les deux lignes.

**Prenez l'empreinte du tag exact indiqué**, pas celle du dernier commit de
la branche principale : `v4` peut être en retard sur `main`, et vous
épingleriez alors une version que personne n'a testée.

---

## Les trois étapes

**1.** Ouvrez `scripts/actions-epinglees.json` et remplissez les `"sha"` :

```json
"actions/checkout": { "tag": "v4", "sha": "08c6903cd8c0fde910a37f88322edcfb5dd907a8" },
```

**2.** Lancez :

```
node scripts/epingler-actions.mjs
```

**3.** Vérifiez, puis poussez :

```
node scripts/epingler-actions.mjs --verifier
```

Le script **ne réécrit rien** tant qu'une empreinte manque ou est malformée :
un workflow à moitié épinglé casserait toutes les livraisons. Il refuse tout
ce qui n'est pas 40 caractères `0-9 a-f`.

Le résultat garde l'étiquette en commentaire, pour qu'on sache encore quelle
version tourne :

```yaml
- uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8 # v4
```

---

## Et après

Une empreinte figée ne reçoit plus les corrections de l'outil. Deux façons de
rester à jour :

- **Dependabot**, déjà actif sur le dépôt, sait mettre à jour des actions
  épinglées : il ouvrira une PR quand une nouvelle version sort, en changeant
  l'empreinte et le commentaire. C'est le mode recommandé.
- **À la main**, une ou deux fois par an : refaire les trois étapes ci-dessus.

Dans les deux cas, la mise à jour devient un **choix**, avec une PR qu'on
peut lire — au lieu d'un changement silencieux dans votre dos.
