# Battle entre amis — conception

Décisions prises et **implémentées** (lots 1 à 3). Le code vit dans
`supabase/schema.sql`, `supa.js` et `game.js`.

⚠️ **Une étape manuelle reste à faire** : coller le bloc « AMIS DÉCLARÉS »
de `supabase/schema.sql` dans Supabase → SQL Editor → Run. Tant que ce
n'est pas fait, l'app se comporte exactement comme avant — les fonctions
d'amis échouent en silence, rien ne casse.

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
5. **Plafonné.** 100 amis, 20 demandes en attente. Au-delà, ce n'est plus un
   cercle d'amis et ça devient un moyen d'arroser tous les pseudos.

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
| `send_friend_request(id, token, to_pseudo)` | Demande d'ami ; **acceptée d'office si l'autre a déjà demandé** | 100 amis, 20 demandes en attente ; silence si déjà bloqué |
| `respond_friend_request(id, token, from_pseudo, accept)` | Accepter / refuser | Le destinataire seul peut répondre ; plafond revérifié |
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

**Ajouter** — Battle des Amis → « ➕ Ajouter un ami » → saisie du pseudo
exact → « Demande envoyée à Léa ».
En cas de pseudo inconnu, message identique à « demande envoyée » : sinon
l'écran devient un testeur d'existence de pseudos.

**Accepter** — en haut de l'écran Battle : « 👋 Léa veut être ton amie »
→ Accepter / Non.

**Convertir** — les anciens adversaires deviennent amis sans que personne ne
voie d'écran : chaque enfant envoie une demande à ceux qu'il a déjà
affrontés, et comme l'autre fait de même, la demande croisée vaut accord
mutuel. C'est le même mécanisme que l'ajout normal, pas un chemin dérobé —
aucun client ne peut se déclarer ami unilatéralement.

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
| **5 — Direct** | Battle en temps réel | **abandonné** (voir §7) |

Lots 1, 2 et 3 faits. Le lot 4 (classement entre amis) reste ouvert.

---

## 7. Décisions prises

Tranchées par Julien le 24 août, et implémentées telles quelles.

| Question | Décision |
|---|---|
| Contrôle parental à l'ajout d'un ami ? | **Non.** L'accord mutuel suffit. |
| Que faire des amis existants ? | **Convertis sans rien demander.** Ils ont déjà joué ensemble. |
| Direct ou différé ? | **Différé.** Deux enfants jouent rarement à la même heure. |
| Plafond d'amis ? | **100.** |

Sur le premier point, ce qui protège reste en place sans le contrôle
parental : **aucune découverte** (ni annuaire, ni recherche partielle, ni
suggestion) et **accord mutuel obligatoire**. Pour entrer dans la liste d'un
enfant, il faut connaître son pseudo exact — donc l'avoir rencontré — et
qu'il accepte. Le contrôle parental était une ceinture par-dessus les
bretelles ; les bretelles tiennent.

Le plafond de 100 se vérifie **à l'envoi ET à l'acceptation**. Le contrôler
seulement à l'envoi laissait le dépasser en acceptant les demandes reçues —
100 envoyés + 1 accepté = 101. Trouvé en jouant le scénario sur une vraie
base Postgres.

## 8. Ce qu'on ne fera pas

- Pas de recherche d'utilisateurs ni d'annuaire.
- Pas de suggestions d'amis.
- Pas de messagerie libre entre enfants — un défi est un défi, pas un chat.
- Pas de photo de profil.
- Pas de notification push tant que le lot 1 n'a pas fait ses preuves.
