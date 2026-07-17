-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor) and paste the
-- results back. This shows every RLS policy on your tables, plus whether RLS
-- is actually enabled at all (a table can have policies defined but RLS
-- turned off, which makes the policies meaningless and the table fully open).

select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as applies_to,
  qual as using_expression,
  with_check as check_expression
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- Separately, confirm RLS is actually enabled on each table:
select
  relname as table_name,
  relrowsecurity as rls_enabled,
  relforcerowsecurity as rls_forced
from pg_class
where relnamespace = 'public'::regnamespace
  and relkind = 'r'
order by relname;
