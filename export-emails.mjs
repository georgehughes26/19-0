import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

// Needs the service-role key (Supabase dashboard > Settings > API), not the
// public anon key — RLS now blocks anon reads of `users` entirely, and this
// script is a trusted admin tool run locally, not client-facing code.
// Run as: SUPABASE_SERVICE_ROLE_KEY=... node export-emails.mjs
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY in the environment before running this script.');
  process.exit(1);
}

const sb = createClient('https://uxlhzgigjwnsvjucwmrg.supabase.co', serviceRoleKey);

// Supabase caps a single select at 1000 rows by default — page through in batches
// of 1000 so this still gets everyone once the users table grows past that.
const PAGE_SIZE = 1000;
const OUTPUT_FILE = 'supabase-emails-export.csv';

let all = [];
for (let from = 0; ; from += PAGE_SIZE) {
  const to = from + PAGE_SIZE - 1;
  const { data, error } = await sb
    .from('users')
    .select('email, username')
    .not('email', 'is', null)
    .neq('email', '')
    .range(from, to);

  if (error) { console.error('Supabase error:', error); process.exit(1); }
  all = all.concat(data);
  console.log(`Fetched rows ${from}-${from + data.length - 1}`);
  if (data.length < PAGE_SIZE) break;
}

const withValidEmail = all.filter(u => u.email?.includes('@'));

const seen = new Set();
const deduped = withValidEmail.filter(u => {
  const key = u.email.toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

const esc = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
const csv = 'Email Address,First Name\n' + deduped.map(u => `${esc(u.email)},${esc(u.username || '')}`).join('\n');
writeFileSync(OUTPUT_FILE, csv);

console.log(`\nTotal fetched: ${all.length} | valid email: ${withValidEmail.length} | after de-dupe: ${deduped.length}`);
console.log(`Wrote ${deduped.length} rows to ${OUTPUT_FILE}`);
