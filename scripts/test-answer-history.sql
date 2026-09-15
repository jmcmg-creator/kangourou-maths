begin;
insert into public.players(id,pseudo,pin_hash,token) values
 ('00000000-0000-0000-0000-000000000001','JournalTest','fixture','10000000-0000-0000-0000-000000000001'),
 ('00000000-0000-0000-0000-000000000002','AutreTest','fixture','10000000-0000-0000-0000-000000000002');
do $$
declare me uuid:='00000000-0000-0000-0000-000000000001';
 tok uuid:='10000000-0000-0000-0000-000000000001';
 other uuid:='00000000-0000-0000-0000-000000000002';
 other_tok uuid:='10000000-0000-0000-0000-000000000002';
 res jsonb; batch jsonb; cursor bigint; n int;
begin
 batch:='[{"id":"one","q":"2 + 2 ?","given":"3","answer":"4","correct":false,"date":"2026-09-13T12:00:00Z"},
           {"id":"two","q":"2 + 2 ?","given":"4","answer":"4","correct":true,"date":"2026-09-13T12:01:00Z"}]';
 res:=save_question_answers(me,tok,batch);
 if not (res->>'ok')::boolean then raise exception 'Écriture refusée'; end if;
 perform save_question_answers(me,tok,batch);
 select count(*) into n from question_answers where player_id=me;
 if n<>2 then raise exception 'Doublons de tentatives'; end if;
 perform save_question_answers(me,tok,jsonb_set(batch,'{0,correct}','true'::jsonb));
 if (select (answer->>'correct')::boolean from question_answers where attempt_id='one' and player_id=me) then
   raise exception 'Une erreur a été effacée par une réussite'; end if;
 res:=save_question_answers(other,tok,batch);
 if res->>'error'<>'auth' then raise exception 'Écriture dans un autre élève'; end if;
 res:=load_question_answers(me,other_tok,0);
 if res->>'error'<>'auth' then raise exception 'Lecture sans bon jeton'; end if;
 res:=load_question_answers(other,other_tok,0);
 if jsonb_array_length(res->'answers')<>0 then raise exception 'Fuite entre élèves'; end if;
 res:=save_question_answers(me,tok,'[{"id":"bad","correct":"false"}]');
 if res->>'error'<>'format' then raise exception 'Format invalide accepté'; end if;
 select jsonb_agg(jsonb_build_object('id','bulk-'||i,'q','Question','given','faux','answer','vrai','correct',false,'date','2026-09-13'))
   into batch from generate_series(1,100) i;
 perform save_question_answers(me,tok,batch);
 res:=load_question_answers(me,tok,0);
 if jsonb_array_length(res->'answers')<>100 then raise exception 'Pagination première page'; end if;
 cursor:=(res->>'next')::bigint;
 res:=load_question_answers(me,tok,cursor);
 if jsonb_array_length(res->'answers')<>2 then raise exception 'Pagination deuxième page'; end if;
 if has_table_privilege('anon','public.question_answers','select') then raise exception 'Table lisible directement'; end if;
 if has_table_privilege('anon','public.question_answers','insert') then raise exception 'Table modifiable directement'; end if;
end $$;
rollback;
