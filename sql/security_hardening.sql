-- ═══════════════════════════════════════════════════════════════════════
-- STEP 1: Stop exposing pin_hash
-- ═══════════════════════════════════════════════════════════════════════

-- 1a. A safe view for anywhere the app just needs id/username/email.
-- Views run with the permissions of their owner by default in Postgres, so this
-- can still read the base table even after step 1c locks direct reads down.
create or replace view users_public as
  select id, username, email, created_at from users;

grant select on users_public to anon, authenticated;

-- 1b. Server-side login check. The client sends a username + pin_hash (it still
-- hashes the PIN locally before sending, same as before — this function just
-- moves the *comparison* server-side so pin_hash is never sent back to any
-- client, including on a successful match).
create or replace function verify_login(p_username text, p_pin_hash text)
returns table(id uuid, username text, email text)
language sql
security definer
set search_path = public
as $$
  select id, username, email
  from users
  where username = p_username and pin_hash = p_pin_hash
  limit 1;
$$;

grant execute on function verify_login(text, text) to anon, authenticated;

-- 1c. Lock down direct reads on the base table. Registration's INSERT policy is
-- untouched (accounts can still be created) but nobody can SELECT the table
-- directly any more, including via `select *` — with RLS enabled and no SELECT
-- policy left, every such query returns zero rows for anon/authenticated.
-- All legitimate reads now go through users_public (no pin_hash) or verify_login
-- (checks pin_hash server-side, never returns it).
drop policy if exists "Anyone can read users" on users;

-- ═══════════════════════════════════════════════════════════════════════
-- STEP 2: test_runs / test_saves currently have RLS switched off entirely —
-- turn it on and match the same open-but-at-least-nominal policy already used
-- on wc_runs / wc_saves, so every table has at least a real RLS layer.
-- ═══════════════════════════════════════════════════════════════════════

alter table test_runs enable row level security;
alter table test_saves enable row level security;

create policy "Allow all on test_runs" on test_runs for all using (true) with check (true);
create policy "Allow all on test_saves" on test_saves for all using (true) with check (true);

-- ═══════════════════════════════════════════════════════════════════════
-- STEP 3: users_public exposed email to anon — every registered user's email
-- was scrapeable via the REST API. The app only ever selects id/username from
-- this view (leaderboard + username-taken check), never email, so drop it.
-- ═══════════════════════════════════════════════════════════════════════

create or replace view users_public as
  select id, username, created_at from users;

-- ═══════════════════════════════════════════════════════════════════════
-- STEP 4: oddballs_entries has an "allow all" policy — any anon caller can
-- read every entrant's name/email, insert fake entries, or edit/delete other
-- people's entries. The app has no real Supabase Auth session (auth.uid() is
-- unavailable, same constraint noted in oddballs_entries.sql), so a client-
-- supplied user_id can't be trusted as an RLS filter either. Given that:
--   - INSERT stays open (with check (true)) — same trust model as before,
--     the unique(user_id) constraint still blocks duplicate entries and the
--     app already handles the resulting 23505 error.
--   - SELECT/UPDATE/DELETE are removed entirely — nobody can read entrant
--     PII or tamper with entries via the client. Pull the entrant list for
--     the actual draw from the Supabase dashboard/service role, not the app.
-- The one place the app used to SELECT (checking "have I already entered?")
-- is replaced by a security-definer RPC that returns a bare boolean, never
-- the row — same pattern as verify_login above.
-- ═══════════════════════════════════════════════════════════════════════

drop policy if exists "allow all" on oddballs_entries;

create policy "Insert own entry" on oddballs_entries for insert with check (true);

create or replace function has_oddballs_entry(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(select 1 from oddballs_entries where user_id = p_user_id);
$$;

grant execute on function has_oddballs_entry(uuid) to anon, authenticated;
