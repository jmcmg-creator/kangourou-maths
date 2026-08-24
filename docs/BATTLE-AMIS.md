# Battle entre amis — conception

Document de travail. Décrit ce qui existe, ce qui manque, et le découpage
proposé. Rien n'est implémenté à ce stade : à valider avant de coder.

---

## 1. Ce qui marche déjà

Il ne faut rien reconstruire. Le socle est là et il est bon.

| Brique | Où | État |
|---|---|---|
| Pseudo unique + PIN | `supabase/schema.sql`, `supa.js` | ✅ solide (bcrypt, RLS, jeton par joueur) |
| Création de battle | `createBattle()` | ✅ code `TONNERRE-80`, mêmes questions des deux côtés |
| Partage | QR, lien `?battle=CODE`, WhatsApp | ✅ |
| Boîte à défis | RPC `send_invite` / `fetch_invites` | ✅ |
| Bannière « X te défie ! » | `checkBattleInvites()` | ✅ |
| Liste d'amis | `profile.friends` | ⚠️ voir §2 |
| Ligue des amis | `renderBattleHome()` | ✅ classement local |

Deux disciplines (`éclair`, `observation`) génèrent leurs questions de façon
**déterministe à partir du code** : les deux téléphones tombent sur les mêmes
énoncés sans que rien ne soit stocké. C'est élégant et ça restera.

---

## 2. Le vrai manque

`profile.friends` n'est pas une liste d'amis. C'est un **journal d'anciens
adversaires**, rempli après coup :

```js
// game.js — à la fin d'une battle
profile.friends[p.name] = {name:p.name, lastBattle:battle.createdAt};
```

D'où le blocage que tu décris : **pour défier un ami, il faut déjà l'avoir
défié.** La première rencontre passe forcément par un code lu à voix haute,
un QR scanné, ou un lien WhatsApp — donc par un adulte, ou par le hasard.

Il manque la brique du milieu : **se déclarer amis dans l'app, une fois pour
toutes.** Ensuite seulement, « défier » devient un bouton.

### Deux points de sécurité relevés en chemin

Ils ne sont pas urgents, mais ils orientent la conception :

1. **`send_invite` accepte n'importe quel pseudo.** Aujourd'hui, qui connaît
   le pseudo d'un enfant peut lui déposer des défis à volonté. Le système
   d'amis est précisément l'occasion de fermer ça : *on ne reçoit de défi que
   de quelqu'un qu'on a accepté.*

2. **La boîte de secours est devinable.** Le repli hors-Supabase (`mailboxAid`)
   dérive sa clé de `sha256('royaume-mailbox:' + prénom)`. Qui connaît le
   prénom peut lire et écrire la boîte. À retirer une fois Supabase la norme.

---

## 3. Principes

L'app est utilisée par des enfants. Ces règles priment sur le confort.

1. **Aucune découverte.** Pas d'annuaire, pas de recherche partielle, pas de
   « tu connais peut-être ». On ajoute un ami dont on connaît déjà le pseudo
   exact — donc quelqu'un rencontré dans la vraie vie.
2. **Consentement mutuel.** Une demande, une réponse. Tant qu'elle n'est pas
   acceptée, aucun défi ne passe.
3. **Pseudo et rien d'autre.** Jamais le prénom réel, la classe, l'âge, ni les
   XP détaillés. Un ami voit un pseudo et un score de battle.
4. **Réversible.** Retirer un ami, bloquer, et ne plus jamais rien recevoir.
5. **Le parent garde la main.** L'ajout d'un ami passe par le contrôle parental
   existant (`parentalGate()`). Défier un ami déjà accepté, non — sinon on tue
   le plaisir.

---

## 4. Modèle de données

Une table, une ligne par paire.

```sql
create table public.friendships (
  id           bigint generated always as identity primary key,
  a_id         uuid not null references players(id) on delete cascade,
  b_id         uuid not null references players(id) on delete cascade,
  status       text not null check (status in ('pending','accepted','blocked')),
  requested_by uuid not null,
  created_at   timestamptz not null default now(),
  responded_at timestamptz,
  -- a_id toujours le plus petit des deux : garantit UNE seule ligne par
  -- paire, quel que soit celui qui a demandé. Pas de doublon miroir.
  constraint pair_ordered unique (a_id, b_id),
  constraint pair_sorted  check  (a_id < b_id)
);
```

Le tri `a_id < b_id` est le point important : sans lui, Judith→Léa et
Léa→Judith créent deux lignes qui divergent.

### RPC à ajouter

| Fonction | Rôle | Garde-fou |
|---|---|---|
| `send_friend_request(id, token, to_pseudo)` | Demande d'ami | Max 10 demandes en attente ; refus silencieux si déjà bloqué |
| `respond_friend_request(id, token, from_pseudo, accept)` | Accepter / refuser | Le destinataire seul peut répondre |
| `list_friends(id, token)` | Amis + demandes reçues + envoyées | Ne renvoie que des pseudos |
| `remove_friend(id, token, pseudo)` | Retirer ou bloquer | Immédiat, sans notification |

### Une modification, pas une addition

`send_invite` doit exiger une amitié `accepted`. C'est la ligne qui ferme le
point de sécurité n°1 :

```sql
if not exists (
  select 1 from friendships
  where status = 'accepted'
    and (a_id, b_id) = (least(sender.id, target.id), greatest(sender.id, target.id))
) then
  return json_build_object('error', 'pas_ami');
end if;
```

Le code/QR reste ouvert à tous : c'est le chemin des enfants non inscrits, et
il ne dépose rien dans la boîte de personne.

---

## 5. Parcours

**Ajouter** — Battle des Amis → « ➕ Ajouter un ami » → contrôle parental →
saisie du pseudo exact → « Demande envoyée à Léa ».
En cas de pseudo inconnu, message identique à « demande envoyée » : sinon
l'écran devient un testeur d'existence de pseudos.

**Accepter** — bannière d'accueil, comme les défis :
« 👋 Léa veut être ton amie » → Accepter / Refuser.

**Défier** — la liste d'amis existe déjà dans `renderBattleHome()`. Elle se
remplit désormais d'amis déclarés, pas d'anciens adversaires. Le bouton
« ⚔️ Défier » ne change pas.

**Reprendre** — `checkFinishedBattles()` existe déjà : « 🏁 Léa a fini ! ».

---

## 6. Découpage

| Lot | Contenu | Dépend de |
|---|---|---|
| **1 — Amis** | Table, 4 RPC, écran d'ajout, bannière d'acceptation | — |
| **2 — Fermeture** | `send_invite` réservé aux amis ; retrait de la boîte devinable | Lot 1 |
| **3 — Reprise** | Migration silencieuse des anciens adversaires en amis acceptés | Lot 1 |
| **4 — Ligue** | Classement entre amis, série de victoires | Lot 1 |
| **5 — Direct** | Battle en temps réel | à décider, voir §7 |

Le lot 1 seul débloque déjà ce que tu demandes. Les lots 2 et 3 le rendent
propre. Le 4 le rend amusant.

---

## 7. Décisions à prendre

1. **Contrôle parental à l'ajout d'un ami ?**
   Recommandé : oui à l'acceptation, non pour défier un ami déjà accepté.

2. **Que faire des amis existants ?**
   `profile.friends` contient déjà d'anciens adversaires. Recommandé : les
   convertir en amitiés acceptées sans rien demander — ils ont déjà joué
   ensemble, le consentement a de fait eu lieu.

3. **Battle en direct, ou en différé ?**
   Recommandé : rester en différé. Le direct veut dire websockets ouverts,
   c'est-à-dire exactement le motif de consommation qu'on vient de corriger
   sur la batterie. Et le différé marche entre deux enfants qui ne jouent pas
   à la même heure — ce qui est le cas le plus fréquent.

4. **Plafond d'amis ?** Recommandé : 30. Au-delà, ce n'est plus un cercle
   d'amis, c'est un réseau social.

---

## 8. Ce qu'on ne fera pas

- Pas de recherche d'utilisateurs ni d'annuaire.
- Pas de suggestions d'amis.
- Pas de messagerie libre entre enfants — un défi est un défi, pas un chat.
- Pas de photo de profil.
- Pas de notification push tant que le lot 1 n'a pas fait ses preuves.
