-- Adds bonus-entry support to the OddBalls giveaway: sharing on X or Instagram
-- bumps a player's entry count from 1 to 2. Run this once in the Supabase SQL editor.

alter table oddballs_entries add column if not exists entries integer not null default 1;
alter table oddballs_entries add column if not exists shared_platform text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'oddballs_entries_entries_check') then
    alter table oddballs_entries add constraint oddballs_entries_entries_check check (entries in (1, 2));
  end if;
end $$;

-- security_hardening.sql (STEP 4) removed SELECT/UPDATE/DELETE from oddballs_entries
-- entirely, leaving only INSERT. A direct client-side `.update()` (what the first
-- version of the double-entry feature used) therefore silently matches zero rows —
-- no error, just a no-op 204 — so it would confirm "bonus entry unlocked" in the UI
-- while never actually touching the database. Same security-definer RPC pattern as
-- has_oddballs_entry fixes it without reopening SELECT/UPDATE to the client.
create or replace function mark_oddballs_shared(p_user_id uuid, p_platform text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count int;
begin
  update oddballs_entries
    set entries = 2, shared_platform = p_platform
    where user_id = p_user_id and entries = 1;
  get diagnostics updated_count = row_count;
  return updated_count > 0;
end;
$$;

grant execute on function mark_oddballs_shared(uuid, text) to anon, authenticated;
