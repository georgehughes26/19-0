-- Corrected fix for the broken-registration bug (see earlier version of this file).
-- The real cause wasn't a missing INSERT policy — "Anyone can insert users" already
-- covers that. It's that authSubmit()'s registration path does
-- `.insert({...}).select('id,username,email').single()`, which needs Postgres to
-- read the new row back (RETURNING), and RETURNING is gated by a SELECT policy.
-- security_hardening.sql (STEP 1c) intentionally removed the only SELECT policy on
-- `users` to stop emails being scrapeable, without leaving a safe path for this one
-- legitimate case. Confirmed directly: the same insert succeeds with
-- `Prefer: return=minimal` and fails with `return=representation`.
--
-- Fix: a security-definer RPC that inserts and returns the new row itself — same
-- pattern as verify_login/has_oddballs_entry — so registration never needs a public
-- SELECT policy on the base table at all.

create or replace function register_user(p_username text, p_email text, p_pin_hash text)
returns table(id uuid, username text, email text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    insert into users (username, email, pin_hash)
    values (p_username, p_email, p_pin_hash)
    returning users.id, users.username, users.email;
end;
$$;

grant execute on function register_user(text, text, text) to anon, authenticated;

-- The redundant INSERT policy added by the first pass at this fix can be dropped —
-- "Anyone can insert users" already covers it and this was never the actual problem.
drop policy if exists "Allow account creation" on users;
