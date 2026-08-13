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
returns json language plpgsql security definer set search_path = public as $$
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
returns json language plpgsql security definer set search_path = public as $$
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
returns json language plpgsql security definer set search_path = public as $$
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
returns json language plpgsql security definer set search_path = public as $$
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
returns json language plpgsql security definer set search_path = public as $$
declare v players;
begin
  select * into v from players where id = p_id and token = p_token;
  if v.id is null then return json_build_object('error', 'auth'); end if;
  return json_build_object('pseudo', v.pseudo, 'profile', v.profile, 'updated_at', v.updated_at);
end $$;

-- Envoyer un défi à un pseudo (vérifié côté expéditeur par jeton).
create or replace function public.send_invite(
  p_id uuid, p_token uuid, p_to_pseudo text, p_code text, p_lv text, p_count int)
returns json language plpgsql security definer set search_path = public as $$
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
returns json language plpgsql security definer set search_path = public as $$
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
