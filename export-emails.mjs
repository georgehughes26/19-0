import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://uxlhzgigjwnsvjucwmrg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bGh6Z2lnanduc3ZqdWN3bXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjA5ODMsImV4cCI6MjA5Njc5Njk4M30.YrKFhau7BszHi4J62Ywv5HEVhA7k0KtUoQmpR9CYOUg'
);

const BATCH_SIZE = 50;

const { data: users, error } = await sb
  .from('users')
  .select('email, username')
  .not('email', 'is', null)
  .neq('email', '');

if (error) { console.error('Error:', error); process.exit(1); }

const emails = users.filter(u => u.email?.includes('@')).map(u => u.email);
console.log(`Total: ${emails.length} emails\n`);

console.log(emails.join(',\n'));
