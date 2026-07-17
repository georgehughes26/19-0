-- 1. Remove the two throwaway test accounts created while verifying the
--    giveaway end-to-end flow. Their oddballs_entries rows are already deleted.
delete from users where username in ('zztest_e2e_verify', 'zztest_giveaway_1784304869785');

-- 2. The last unapplied piece of security_hardening.sql (STEP 4): oddballs_entries
--    still has the original "allow all" policy live (confirmed via pg_policies),
--    meaning anyone with the anon key can currently read every entrant's name/email,
--    or edit/delete any entry directly. has_oddballs_entry and mark_oddballs_shared
--    (both already live) cover every legitimate client need, so this only removes
--    direct table access — nothing in the app depends on it.
drop policy if exists "allow all" on oddballs_entries;

create policy "Insert own entry" on oddballs_entries for insert with check (true);
