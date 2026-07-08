import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

const sb = createClient(
  'https://uxlhzgigjwnsvjucwmrg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bGh6Z2lnanduc3ZqdWN3bXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjA5ODMsImV4cCI6MjA5Njc5Njk4M30.YrKFhau7BszHi4J62Ywv5HEVhA7k0KtUoQmpR9CYOUg'
);

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
