create table oddballs_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  first_name text not null,
  last_name text not null,
  contact_email text not null,
  created_at timestamptz not null default now(),
  unique(user_id)  -- enforces one entry per user at the DB level
);

alter table oddballs_entries enable row level security;

-- Matches the permissive policy used on wc_saves/wc_runs — app uses its own
-- custom users table for auth, not Supabase Auth, so auth.uid() isn't available.
create policy "allow all" on oddballs_entries for all using (true) with check (true);
