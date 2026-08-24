-- ════════════════════════════════════════════════════════════════════
-- LE ROYAUME DES SAVOIRS — Schéma Supabase
-- Pseudos uniques + PIN pour les battles entre enfants.
--
-- À COLLER TEL QUEL dans Supabase : SQL Editor → New query → Run.
-- Rejouable sans danger (idempotent).
--
-- Sécurité : les tables sont VERROUILLÉES (RLS sans policy = aucun accès
-- direct avec la clé anon). Tout passe par des fonctions RPC "security
-- definer" qui vérifient un jeton secret par joueur. Le PIN est haché
-- (bcrypt). Résultat : pseudo unique garanti par la base, et personne ne
-- peut lire/écraser le profil d'un autre enfant.
-- ════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ── Joueurs ──────────────────────────────────────────────────────────
create table if not exists public.players (
  id           uuid primary key default gen_random_uuid(),
  pseudo       text not null,
  pseudo_lower text generated always as (lower(pseudo)) stored,
  pin_hash     text not null,
  token        uuid not null default gen_random_uuid(),
  profile      jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint pseudo_format check (pseudo ~ '^[A-Za-z0-9_-]{3,16}$')
);
create unique index if not exists players_pseudo_unique
  on public.players (pseudo_lower);

-- ── Invitations de battle (boîte à défis) ────────────────────────────
create table if not exists public.invites (
  id              bigint generated always as identity primary key,
  to_pseudo_lower text not null,
  from_pseudo     text not null,
  code            text not null,
  lv_name         text,
  qcount          int,
  created_at      timestamptz not null default now()
);
create index if not exists invites_to_idx
  on public.invites (to_pseudo_lower, created_at desc);

-- ── Verrouillage total des tables pour la clé anon ───────────────────
alter table public.players enable row level security;
alter table public.invites enable row level security;
revoke all on public.players from anon, authenticated;
revoke all on public.invites from anon, authenticated;

-- ════════════════════════════════════════════════════════════════════
-- RPC — seules portes d'entrée autorisées
-- ════════════════════════════════════════════════════════════════════

-- Un pseudo est-il libre ? (pour le feedback en direct pendant la saisie)
create or replace function public.check_pseudo(p_pseudo text)
returns json language plpgsql security definer set search_path = public, extensions as $$
begin
  if p_pseudo !~ '^[A-Za-z0-9_-]{3,16}$' then
    return json_build_object('available', false, 'reason', 'format');
  end if;
  return json_build_object(
    'available', not exists (select 1 from players where pseudo_lower = lower(p_pseudo))
  );
end $$;

-- Créer son pseudo (une seule fois). Retourne id + jeton secret.
create or replace function public.register_player(p_pseudo text, p_pin text)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare v players;
begin
  if p_pseudo !~ '^[A-Za-z0-9_-]{3,16}$' then
    return json_build_object('error', 'pseudo_invalide');
  end if;
  if p_pin !~ '^[0-9]{4,6}$' then
    return json_build_object('error', 'pin_invalide');
  end if;
  if exists (select 1 from players where pseudo_lower = lower(p_pseudo)) then
    return json_build_object('error', 'pseudo_pris');
  end if;
  insert into players (pseudo, pin_hash)
    values (p_pseudo, crypt(p_pin, gen_salt('bf')))
    returning * into v;
  return json_build_object('id', v.id, 'token', v.token, 'pseudo', v.pseudo);
end $$;

-- Se connecter depuis un autre appareil : pseudo + PIN → id + jeton.
create or replace function public.login_player(p_pseudo text, p_pin text)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare v players;
begin
  select * into v from players where pseudo_lower = lower(p_pseudo);
  if v.id is null or v.pin_hash <> crypt(p_pin, v.pin_hash) then
    -- Réponse identique pseudo inconnu / PIN faux : pas d'énumération.
    return json_build_object('error', 'identifiants');
  end if;
  return json_build_object('id', v.id, 'token', v.token, 'pseudo', v.pseudo, 'profile', v.profile);
end $$;

-- Sauvegarder son profil (vérifié par jeton).
create or replace function public.save_profile(p_id uuid, p_token uuid, p_profile jsonb)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare n int;
begin
  if pg_column_size(p_profile) > 400000 then
    return json_build_object('error', 'profil_trop_gros');
  end if;
  update players set profile = p_profile, updated_at = now()
    where id = p_id and token = p_token;
  get diagnostics n = row_count;
  if n = 0 then return json_build_object('error', 'auth'); end if;
  return json_build_object('ok', true);
end $$;

-- Recharger son profil (vérifié par jeton).
create or replace function public.load_profile(p_id uuid, p_token uuid)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare v players;
begin
  select * into v from players where id = p_id and token = p_token;
  if v.id is null then return json_build_object('error', 'auth'); end if;
  return json_build_object('pseudo', v.pseudo, 'profile', v.profile, 'updated_at', v.updated_at);
end $$;

-- Envoyer un défi à un pseudo (vérifié côté expéditeur par jeton).
create or replace function public.send_invite(
  p_id uuid, p_token uuid, p_to_pseudo text, p_code text, p_lv text, p_count int)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare sender players;
begin
  select * into sender from players where id = p_id and token = p_token;
  if sender.id is null then return json_build_object('error', 'auth'); end if;
  if not exists (select 1 from players where pseudo_lower = lower(p_to_pseudo)) then
    return json_build_object('error', 'destinataire_inconnu');
  end if;
  if p_code !~ '^[A-Z-]{3,12}[0-9]{0,3}$' and p_code !~ '^[A-Z]+-[0-9]{2}$' then
    return json_build_object('error', 'code_invalide');
  end if;
  insert into invites (to_pseudo_lower, from_pseudo, code, lv_name, qcount)
    values (lower(p_to_pseudo), sender.pseudo, p_code, left(coalesce(p_lv,''), 80), p_count);
  -- Garde au plus 20 invitations par destinataire (les plus récentes).
  delete from invites where id in (
    select id from invites where to_pseudo_lower = lower(p_to_pseudo)
    order by created_at desc offset 20
  );
  return json_build_object('ok', true);
end $$;

-- Relever sa boîte à défis (7 derniers jours, vérifié par jeton).
create or replace function public.fetch_invites(p_id uuid, p_token uuid)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare v players;
begin
  select * into v from players where id = p_id and token = p_token;
  if v.id is null then return json_build_object('error', 'auth'); end if;
  return coalesce((
    select json_agg(json_build_object(
      'code', i.code, 'from', i.from_pseudo,
      'lvName', i.lv_name, 'count', i.qcount, 'at', i.created_at))
    from invites i
    where i.to_pseudo_lower = v.pseudo_lower
      and i.created_at > now() - interval '7 days'
  ), '[]'::json);
end $$;

-- Droits : anon ne peut QUE exécuter ces fonctions.
grant execute on function public.check_pseudo(text)                             to anon;
grant execute on function public.register_player(text, text)                    to anon;
grant execute on function public.login_player(text, text)                       to anon;
grant execute on function public.save_profile(uuid, uuid, jsonb)                to anon;
grant execute on function public.load_profile(uuid, uuid)                       to anon;
grant execute on function public.send_invite(uuid, uuid, text, text, text, int) to anon;
grant execute on function public.fetch_invites(uuid, uuid)                      to anon;

-- ════════════════════════════════════════════════════════════════════
-- AMIS DÉCLARÉS (lot 1) — à coller après le bloc ci-dessus.
-- Rejouable sans danger.
--
-- Décisions prises (voir docs/BATTLE-AMIS.md) :
--   · pas de contrôle parental à l'ajout — l'accord mutuel suffit
--   · les anciens adversaires deviennent amis sans qu'on demande rien
--   · battles en différé uniquement
--   · 100 amis au maximum
--
-- La garantie qui compte : on ne reçoit de défi que de quelqu'un qu'on a
-- accepté. Jusqu'ici send_invite acceptait n'importe quel pseudo.
-- ════════════════════════════════════════════════════════════════════

create table if not exists public.friendships (
  id           bigint generated always as identity primary key,
  a_id         uuid not null references players(id) on delete cascade,
  b_id         uuid not null references players(id) on delete cascade,
  status       text not null check (status in ('pending','accepted','blocked')),
  requested_by uuid not null,
  created_at   timestamptz not null default now(),
  responded_at timestamptz,
  -- a_id toujours le plus petit des deux : UNE seule ligne par paire, quel
  -- que soit celui qui a demandé. Sans ce tri, Judith→Léa et Léa→Judith
  -- créent deux lignes qui finissent par diverger.
  constraint pair_sorted check (a_id < b_id),
  constraint pair_unique unique (a_id, b_id)
);
create index if not exists friendships_a_idx on public.friendships (a_id, status);
create index if not exists friendships_b_idx on public.friendships (b_id, status);

alter table public.friendships enable row level security;
revoke all on public.friendships from anon, authenticated;

-- Plafonds. 100 amis : au-delà ce n'est plus un cercle d'amis.
-- 20 demandes en attente : empêche d'arroser tous les pseudos du monde.
create or replace function public.friend_limits()
returns table(max_friends int, max_pending int)
language sql immutable as $$ select 100, 20 $$;

-- Envoyer une demande d'ami.
-- Si la personne visée a DÉJÀ demandé de notre côté, les deux se sont
-- choisies : l'amitié devient acceptée sans que personne n'ait à répondre.
-- C'est ce qui convertit les anciens adversaires en amis tout seul — les
-- deux enfants ont chacun l'autre dans leur liste locale.
create or replace function public.send_friend_request(
  p_id uuid, p_token uuid, p_to_pseudo text)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare
  me players; other players;
  v_a uuid; v_b uuid; existing friendships;
  n int; lim record;
begin
  select * into me from players where id = p_id and token = p_token;
  if me.id is null then return json_build_object('error','auth'); end if;
  select * into other from players where pseudo_lower = lower(p_to_pseudo);
  -- Réponse identique si le pseudo n'existe pas : sinon l'écran d'ajout
  -- devient un testeur d'existence de pseudos.
  if other.id is null then return json_build_object('ok', true, 'status', 'pending'); end if;
  if other.id = me.id then return json_build_object('error','soi_meme'); end if;

  select * into lim from friend_limits();
  select count(*) into n from friendships
    where status = 'accepted' and (a_id = me.id or b_id = me.id);
  if n >= lim.max_friends then return json_build_object('error','trop_d_amis'); end if;
  select count(*) into n from friendships
    where status = 'pending' and requested_by = me.id;
  if n >= lim.max_pending then return json_build_object('error','trop_de_demandes'); end if;

  v_a := least(me.id, other.id); v_b := greatest(me.id, other.id);
  select * into existing from friendships where a_id = v_a and b_id = v_b;

  if existing.id is null then
    insert into friendships (a_id, b_id, status, requested_by)
      values (v_a, v_b, 'pending', me.id);
    return json_build_object('ok', true, 'status', 'pending');
  end if;

  if existing.status = 'blocked' then
    -- Silence volontaire : la personne bloquée ne doit pas l'apprendre.
    return json_build_object('ok', true, 'status', 'pending');
  end if;
  if existing.status = 'accepted' then
    return json_build_object('ok', true, 'status', 'accepted');
  end if;
  -- 'pending' : si c'est l'AUTRE qui avait demandé, l'accord est mutuel.
  if existing.requested_by <> me.id then
    update friendships set status = 'accepted', responded_at = now()
      where id = existing.id;
    return json_build_object('ok', true, 'status', 'accepted');
  end if;
  return json_build_object('ok', true, 'status', 'pending');
end $$;

-- Accepter ou refuser une demande reçue. Seul le destinataire peut répondre.
create or replace function public.respond_friend_request(
  p_id uuid, p_token uuid, p_from_pseudo text, p_accept boolean)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare me players; other players; v_a uuid; v_b uuid; n int; lim record;
begin
  select * into me from players where id = p_id and token = p_token;
  if me.id is null then return json_build_object('error','auth'); end if;
  select * into other from players where pseudo_lower = lower(p_from_pseudo);
  if other.id is null then return json_build_object('error','inconnu'); end if;
  v_a := least(me.id, other.id); v_b := greatest(me.id, other.id);

  if p_accept then
    -- Le plafond se vérifie AUSSI ici. Le contrôler seulement à l'envoi
    -- laissait le dépasser en acceptant les demandes reçues : 100 amis
    -- envoyés + 1 accepté = 101.
    select * into lim from friend_limits();
    select count(*) into n from friendships
      where status = 'accepted' and (a_id = me.id or b_id = me.id);
    if n >= lim.max_friends then return json_build_object('error','trop_d_amis'); end if;
  end if;

  if p_accept then
    update friendships set status = 'accepted', responded_at = now()
      where a_id = v_a and b_id = v_b and status = 'pending'
        and requested_by = other.id;   -- on ne peut pas accepter sa propre demande
  else
    delete from friendships
      where a_id = v_a and b_id = v_b and status = 'pending'
        and requested_by = other.id;
  end if;
  get diagnostics n = row_count;
  if n = 0 then return json_build_object('error','aucune_demande'); end if;
  return json_build_object('ok', true);
end $$;

-- Amis acceptés, demandes reçues, demandes envoyées. Rien que des pseudos.
create or replace function public.list_friends(p_id uuid, p_token uuid)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare me players;
begin
  select * into me from players where id = p_id and token = p_token;
  if me.id is null then return json_build_object('error','auth'); end if;
  return json_build_object(
    'friends', coalesce((
      select json_agg(p.pseudo order by p.pseudo)
      from friendships f
      join players p on p.id = case when f.a_id = me.id then f.b_id else f.a_id end
      where f.status = 'accepted' and (f.a_id = me.id or f.b_id = me.id)), '[]'::json),
    'incoming', coalesce((
      select json_agg(p.pseudo order by p.pseudo)
      from friendships f
      join players p on p.id = f.requested_by
      where f.status = 'pending' and f.requested_by <> me.id
        and (f.a_id = me.id or f.b_id = me.id)), '[]'::json),
    'outgoing', coalesce((
      select json_agg(p.pseudo order by p.pseudo)
      from friendships f
      join players p on p.id = case when f.a_id = me.id then f.b_id else f.a_id end
      where f.status = 'pending' and f.requested_by = me.id), '[]'::json)
  );
end $$;

-- Retirer un ami, ou le bloquer. Immédiat, et l'autre n'en est pas averti.
create or replace function public.remove_friend(
  p_id uuid, p_token uuid, p_pseudo text, p_block boolean default false)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare me players; other players; v_a uuid; v_b uuid;
begin
  select * into me from players where id = p_id and token = p_token;
  if me.id is null then return json_build_object('error','auth'); end if;
  select * into other from players where pseudo_lower = lower(p_pseudo);
  if other.id is null then return json_build_object('error','inconnu'); end if;
  v_a := least(me.id, other.id); v_b := greatest(me.id, other.id);
  if p_block then
    insert into friendships (a_id, b_id, status, requested_by, responded_at)
      values (v_a, v_b, 'blocked', me.id, now())
      on conflict (a_id, b_id) do update
        set status = 'blocked', requested_by = me.id, responded_at = now();
  else
    delete from friendships where a_id = v_a and b_id = v_b and status <> 'blocked';
  end if;
  return json_build_object('ok', true);
end $$;

-- ── send_invite : réservé aux amis acceptés ──────────────────────────
-- C'est la ligne qui ferme le trou. Avant, qui connaissait le pseudo d'un
-- enfant pouvait lui déposer des défis à volonté.
create or replace function public.send_invite(
  p_id uuid, p_token uuid, p_to_pseudo text, p_code text, p_lv text, p_count int)
returns json language plpgsql security definer set search_path = public, extensions as $$
declare sender players; target players; v_a uuid; v_b uuid;
begin
  select * into sender from players where id = p_id and token = p_token;
  if sender.id is null then return json_build_object('error', 'auth'); end if;
  select * into target from players where pseudo_lower = lower(p_to_pseudo);
  if target.id is null then
    return json_build_object('error', 'destinataire_inconnu');
  end if;
  v_a := least(sender.id, target.id); v_b := greatest(sender.id, target.id);
  if not exists (select 1 from friendships
                 where a_id = v_a and b_id = v_b and status = 'accepted') then
    return json_build_object('error', 'pas_ami');
  end if;
  if p_code !~ '^[A-Z-]{3,12}[0-9]{0,3}$' and p_code !~ '^[A-Z]+-[0-9]{2}$' then
    return json_build_object('error', 'code_invalide');
  end if;
  insert into invites (to_pseudo_lower, from_pseudo, code, lv_name, qcount)
    values (lower(p_to_pseudo), sender.pseudo, p_code, left(coalesce(p_lv,''), 80), p_count);
  delete from invites where id in (
    select id from invites where to_pseudo_lower = lower(p_to_pseudo)
    order by created_at desc offset 20
  );
  return json_build_object('ok', true);
end $$;

grant execute on function public.friend_limits()                                to anon;
grant execute on function public.send_friend_request(uuid, uuid, text)          to anon;
grant execute on function public.respond_friend_request(uuid, uuid, text, boolean) to anon;
grant execute on function public.list_friends(uuid, uuid)                       to anon;
grant execute on function public.remove_friend(uuid, uuid, text, boolean)       to anon;
