-- security_hardening.sql was applied unevenly — some statements took effect,
-- two important ones didn't. Confirmed live (not just from reading the file):
--   - has_oddballs_entry RPC: missing entirely (PGRST202 "could not find the
--     function"). maybeShowOddBallsGiveaway() calls this first and silently
--     bails out on any error, so the giveaway modal has likely never actually
--     shown for a real user despite ODDBALLS_GIVEAWAY_LIVE being true.
--   - users_public view: still returns email to anon. STEP 3 of
--     security_hardening.sql (meant to drop it) didn't take effect.
-- Both are safe to (re-)run — create-or-replace is idempotent either way.

create or replace function has_oddballs_entry(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(select 1 from oddballs_entries where user_id = p_user_id);
$$;

grant execute on function has_oddballs_entry(uuid) to anon, authenticated;

-- create-or-replace can't drop a column from an existing view (42P16) — the
-- current live view has an extra `email` column this needs to remove, so it
-- has to be dropped and recreated instead. Re-grants select afterward since
-- dropping the view also drops the grant that came with it.
drop view if exists users_public;

create view users_public as
  select id, username, created_at from users;

grant select on users_public to anon, authenticated;
