-- career_saves: one row per user, holds the serialized CAREER state blob.
-- Mirrors test_saves/wc_saves exactly (see security_hardening.sql STEP 2,
-- which is the current live policy on those tables — NOT oddballs_entries.sql's
-- policy, which was later narrowed because that table holds direct PII; this
-- table only ever holds a JSON game-state blob keyed by user_id).
create table career_saves (
  user_id uuid primary key references users(id),
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table career_saves enable row level security;

-- App uses its own custom users table, not Supabase Auth, so auth.uid() isn't
-- available — same permissive-but-RLS-on policy as test_saves/wc_saves.
create policy "Allow all on career_saves" on career_saves for all using (true) with check (true);
