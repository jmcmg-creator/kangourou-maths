-- Historique permanent des réponses, indépendant de players.profile (400 Ko).
-- Migration idempotente à appliquer après schema.sql.
create table if not exists public.question_answers (
  player_id uuid not null references public.players(id) on delete cascade,
  attempt_id text not null,
  seq bigint generated always as identity,
  answer jsonb not null,
  created_at timestamptz not null default now(),
  primary key (player_id, attempt_id)
);
create index if not exists question_answers_player_seq on public.question_answers(player_id,seq);
alter table public.question_answers enable row level security;
revoke all on public.question_answers from public, anon, authenticated;

create or replace function public.save_question_answers(p_id uuid,p_token uuid,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path=public,extensions as $$
begin
  if not exists(select 1 from players where id=p_id and token=p_token) then
    return jsonb_build_object('error','auth');
  end if;
  if jsonb_typeof(p_answers) is distinct from 'array' then
    return jsonb_build_object('error','format');
  end if;
  if jsonb_array_length(p_answers)>100 then return jsonb_build_object('error','lot_trop_gros'); end if;
  if exists(
    select 1 from jsonb_array_elements(p_answers) a where
      jsonb_typeof(a) is distinct from 'object' or
      jsonb_typeof(a->'id') is distinct from 'string' or
      length(coalesce(a->>'id','')) not between 1 and 512 or
      jsonb_typeof(a->'correct') is distinct from 'boolean' or
      jsonb_typeof(a->'q') is distinct from 'string' or
      jsonb_typeof(a->'given') is distinct from 'string' or
      jsonb_typeof(a->'answer') is distinct from 'string' or
      jsonb_typeof(a->'date') is distinct from 'string' or
      pg_column_size(a)>32000
  ) then return jsonb_build_object('error','format'); end if;
  insert into question_answers(player_id,attempt_id,answer)
    select p_id,a->>'id',a from jsonb_array_elements(p_answers) a
    on conflict(player_id,attempt_id) do nothing;
  return jsonb_build_object('ok',true);
end $$;

create or replace function public.load_question_answers(p_id uuid,p_token uuid,p_after bigint default 0)
returns jsonb language plpgsql security definer set search_path=public,extensions as $$
declare result jsonb;
begin
  if not exists(select 1 from players where id=p_id and token=p_token) then
    return jsonb_build_object('error','auth');
  end if;
  select jsonb_build_object('answers',coalesce(jsonb_agg(answer order by seq),'[]'::jsonb),
    'next',coalesce(max(seq),p_after)) into result
  from (select answer,seq from question_answers where player_id=p_id and seq>p_after order by seq limit 100) batch;
  return result;
end $$;
revoke all on function public.save_question_answers(uuid,uuid,jsonb) from public;
revoke all on function public.load_question_answers(uuid,uuid,bigint) from public;
grant execute on function public.save_question_answers(uuid,uuid,jsonb) to anon;
grant execute on function public.load_question_answers(uuid,uuid,bigint) to anon;
