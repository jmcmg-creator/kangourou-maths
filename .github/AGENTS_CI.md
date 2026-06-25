# 🤖 Agents CI — Guide

5 agents tournent automatiquement sur ce repo pour garantir la qualité éducative et la sécurité du code.

## Vue d'ensemble

| Agent | Fichier | Déclenchement | Coût |
|---|---|---|---|
| **Vérif questions Claude** | `verify-questions.yml` | PR sur exercises*.js + lundi 4h | ~1 ¢/question |
| **Liens cassés (lychee)** | `check-links.yml` | Push main + PR + lundi 5h | gratuit |
| **Secrets (gitleaks)** | `security.yml` job `secrets` | Push + PR + lundi 6h | gratuit |
| **Semgrep OWASP** | `security.yml` job `semgrep` | Push + PR + lundi 6h | gratuit (CE) |
| **OSV-Scanner deps** | `security.yml` job `osv` | Push + PR + lundi 6h | gratuit |
| **CodeQL statique** | `security.yml` job `codeql` | Push + PR + lundi 6h | gratuit (repo public) |
| **Dependabot** | `dependabot.yml` | hebdomadaire | gratuit |

## Setup requis (1 fois)

### 1. Secret `ANTHROPIC_API_KEY`

Pour l'agent de vérif des questions :

1. Aller sur https://console.anthropic.com → API Keys → Create Key
2. Sur GitHub : Settings → Secrets and variables → Actions → New repository secret
3. Name : `ANTHROPIC_API_KEY`, Value : la clé `sk-ant-…`

⚠️ Si le secret manque, le job échoue proprement sans rien casser.

### 2. Activer CodeQL

Settings → Code security and analysis → CodeQL analysis → **Enable**.

Pour les repos privés, CodeQL est payant (GitHub Advanced Security). Pour les repos publics, c'est gratuit.

### 3. Activer Dependabot

Settings → Code security and analysis → Dependabot alerts + Dependabot security updates → **Enable**.

## Exécution manuelle

Le workflow `verify-questions` accepte un input `limit` pour ne tester que N questions :

```
Actions → Vérif factuelle des questions → Run workflow → limit: 20
```

Pratique pour smoke-tester rapidement sans cramer 7 € de tokens.

## Que faire quand un agent échoue ?

| Échec | Action |
|---|---|
| **Vérif questions** : 1+ questions marquées fausses | Lire `verify-report.md` dans les artifacts, corriger les `ans` ou reformuler la question |
| **Lychee** : lien 404 | Soit corriger le lien, soit ajouter une exception dans `--exclude` |
| **gitleaks** : secret détecté | Révoquer la clé immédiatement, retirer du commit (`git filter-repo`) |
| **Semgrep** : pattern OWASP | Lire le rapport, refactorer ou ajouter `// nosemgrep: rule-id` avec justification |
| **OSV** : CVE dans dep | Dependabot va créer une PR de MAJ → la merger |
| **CodeQL** : alerte | Tab Security du repo, trier par sévérité, fixer les Critical/High |

## Coûts annuels estimés

| Poste | Estimation |
|---|---|
| Anthropic (vérif hebdo de 720 q) | 52 × 7 € = **~360 €/an** |
| Tout le reste | **0 €** |

💡 Pour réduire la facture Anthropic :
- Le cron hebdo peut passer à mensuel : `0 4 1 * *`
- Le job sur PR ne vérifie que les questions **modifiées** (`ONLY_CHANGED=true`) → quasi-gratuit
- En settings, mettre `LIMIT=100` par défaut pour un échantillonnage statistique
