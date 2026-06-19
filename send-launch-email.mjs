import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL = 'https://uxlhzgigjwnsvjucwmrg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4bGh6Z2lnanduc3ZqdWN3bXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjA5ODMsImV4cCI6MjA5Njc5Njk4M30.YrKFhau7BszHi4J62Ywv5HEVhA7k0KtUoQmpR9CYOUg';
const RESEND_API_KEY = 're_HMcLJh5t_EDGRvhx3DXzokZcEGbbBBZMP'; // ← paste your Resend API key here
const FROM_EMAIL = 'george@19-0.co.uk';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
const resend = new Resend(RESEND_API_KEY);

const HTML = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  body, table, td, p, div { margin:0; padding:0; }
  body { background-color:#06060f !important; }
</style>
<!--[if mso]><style type="text/css">
  body, #body-table, #outer-td { background-color:#06060f !important; }
  table { border-collapse:collapse; }
</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#06060f;mso-line-height-rule:exactly" bgcolor="#06060f">

<table id="body-table" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#06060f" style="background-color:#06060f;border-collapse:collapse">
<tr><td id="outer-td" align="center" bgcolor="#06060f" style="padding:20px 10px;background-color:#06060f">

  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">

    <!-- HEADER -->
    <tr>
      <!--[if mso]><td bgcolor="#080810" style="padding:36px 32px 28px;text-align:center"><![endif]-->
      <!--[if !mso]><!--><td bgcolor="#080810" style="padding:36px 32px 28px;text-align:center;border-radius:14px 14px 0 0"><!--<![endif]-->
      <div class="gradient-text" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:64px;font-weight:700;color:#f97316;letter-spacing:-2px;line-height:1">19-0</div>
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;color:#5050a0;letter-spacing:3px;text-transform:uppercase;margin-top:8px">The cricket management game</div>
    </td></tr>

    <!-- HERO ANNOUNCE -->
    <tr><td bgcolor="#0d0d1a" style="padding:28px 32px 0;background-color:#0d0d1a">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td bgcolor="#060e1a" style="padding:22px 24px;text-align:center;background-color:#060e1a">
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#4ade80;margin-bottom:10px">Just dropped</div>
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;margin-bottom:8px">Test Cricket mode<br>is <span style="color:#60a5fa">now live</span> on 19-0</div>
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#7070b0;line-height:1.6">Take England through a full World Test Championship cycle — face every nation, win the Ashes, and claim the mace at Lord's.</div>
        </td></tr>
      </table>
    </td></tr>

    <!-- BODY COPY -->
    <tr><td bgcolor="#0d0d1a" style="padding:20px 32px 0;background-color:#0d0d1a">
      <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.75;color:#c0c0e0;margin:0">You already know <strong style="color:#ffffff">19-0</strong> from the T20 Blast. Now there's a second way to play — and it's bigger.</p>
    </td></tr>

    <!-- MODE CARDS -->
    <tr><td bgcolor="#0d0d1a" style="padding:16px 32px 0;background-color:#0d0d1a">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr valign="top">
          <td width="49%" bgcolor="#080e1e" style="padding:18px;background-color:#080e1e;border-top:3px solid #60a5fa">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#60a5fa;margin-bottom:8px">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Test Cricket &nbsp;<span style="font-size:9px;background:#1a3a2a;color:#4ade80;padding:2px 7px">NEW</span></div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#8080b0;line-height:1.6;margin-bottom:10px">Take England through a full WTC cycle. Build your squad for the long game.</div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#6060a0;line-height:2">→ Face all 8 Test nations<br>→ Five-match Ashes series<br>→ Qualify for the WTC Final<br>→ Win Lord's — claim the mace</div>
          </td>
          <td width="2%" bgcolor="#0d0d1a" style="background-color:#0d0d1a">&nbsp;</td>
          <td width="49%" bgcolor="#0f0f22" style="padding:18px;background-color:#0f0f22;border-top:3px solid #f97316">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#f97316;margin-bottom:8px">⚡ T20 Blast</div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#8080b0;line-height:1.6;margin-bottom:10px">Draft your all-time county XI and run the gauntlet.</div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#6060a0;line-height:2">→ 16-game group stage<br>→ Quarter-Final knockout<br>→ Semi-Final at Edgbaston<br>→ Finals Day — glory or bust</div>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- FEATURE CARDS -->
    <tr><td bgcolor="#0d0d1a" style="padding:12px 32px 0;background-color:#0d0d1a">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr valign="top">
          <td width="49%" bgcolor="#0f0f22" style="padding:14px 16px;background-color:#0f0f22">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:500;color:#fbbf24;margin-bottom:3px">🏆 Global leaderboard</div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#6060a0;line-height:1.5">Top 100 winners across T20 &amp; Test. Podium spots up for grabs.</div>
          </td>
          <td width="2%" bgcolor="#0d0d1a" style="background-color:#0d0d1a">&nbsp;</td>
          <td width="49%" bgcolor="#0f0f22" style="padding:14px 16px;background-color:#0f0f22">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:500;color:#a78bfa;margin-bottom:3px">📊 Your stats</div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#6060a0;line-height:1.5">Every run tracked. Best squad, best cycle, best finish.</div>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td bgcolor="#0d0d1a" style="padding:28px 32px;text-align:center;background-color:#0d0d1a">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://19-0.co.uk" style="height:48px;v-text-anchor:middle;width:220px" arcsize="12%" fillcolor="#c2410c" stroke="f"><w:anchorlock/><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold">Play Test Cricket now</center></v:roundrect><![endif]-->
      <!--[if !mso]><!--><a href="https://19-0.co.uk" style="display:inline-block;background-color:#c2410c;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:600;padding:14px 40px;border-radius:10px;text-decoration:none;letter-spacing:0.5px">Play Test Cricket now</a><!--<![endif]-->
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#505080;margin-top:10px">Free to play · No download · 19-0.co.uk</div>
    </td></tr>

    <!-- DIVIDER -->
    <tr><td bgcolor="#0d0d1a" style="padding:0 32px;background-color:#0d0d1a">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" bgcolor="#1a1a30" style="background-color:#1a1a30"></td></tr></table>
    </td></tr>

    <!-- CLOSING COPY -->
    <tr><td bgcolor="#0d0d1a" style="padding:20px 32px 28px;background-color:#0d0d1a">
      <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:14px;color:#606090;line-height:1.75;margin:0 0 12px">You've been part of this from early doors — now we want to see your name on that Test leaderboard. Give it a go and let us know what you think.</p>
      <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:14px;color:#606090;line-height:1.75;margin:0">Tell a mate. Challenge them to beat your record. Let's go <strong style="color:#c0c0e0">19-0</strong>.</p>
    </td></tr>

    <!-- FOOTER -->
    <tr><td bgcolor="#080810" style="padding:20px 32px;text-align:center;background-color:#080810;border-top:1px solid #1a1a30">
      <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#404070;line-height:1.8;margin:0">You're receiving this because you tested 19-0 early.<br>
      <a href="https://19-0.co.uk" style="color:#5050a0;text-decoration:none">19-0.co.uk</a></p>
    </td></tr>

  </table>
</td></tr>
</table>

</body>
</html>`;

async function main() {
  console.log('Fetching users from Supabase...');
  const { data: users, error } = await sb
    .from('users')
    .select('email, username')
    .not('email', 'is', null)
    .neq('email', '');

  if (error) { console.error('Supabase error:', error); process.exit(1); }

  const emails = users.filter(u => u.email?.includes('@'));
  console.log(`Found ${emails.length} users with email addresses.`);

  // Send a test to yourself first — comment out the early return when ready to send to all
  const TEST_MODE = true; // sends to georgehughesy@outlook.com
  const targets = TEST_MODE
    ? [{ email: 'georgehughesy@outlook.com', username: 'George (test)' }]
    : emails;

  if (TEST_MODE) console.log('TEST MODE — sending only to yourself. Set TEST_MODE = false to send to all.');

  let sent = 0, failed = 0;
  for (const user of targets) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: user.email,
        subject: 'Test Cricket is here. Take England all the way.',
        html: HTML,
      });
      console.log(`✓ ${user.email}`);
      sent++;
      // Small delay to stay within rate limits
      await new Promise(r => setTimeout(r, 100));
    } catch (e) {
      console.error(`✗ ${user.email}:`, e.message);
      failed++;
    }
  }

  console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
}

main();
