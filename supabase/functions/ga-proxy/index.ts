// Proxies client-side event pings to the GA4 Measurement Protocol so the
// GA_API_SECRET never lives in browser-visible source (it was previously
// hardcoded in index.html — anyone could read it and inject arbitrary
// events into the GA property).
//
// Deploy with: supabase functions deploy ga-proxy --no-verify-jwt
// (--no-verify-jwt is required: the browser calls this with navigator.sendBeacon,
// which can't attach an Authorization header, so default JWT verification
// would reject every request.)
//
// Set the secret once: supabase secrets set GA_API_SECRET=<new_rotated_secret>
// Rotate the leaked secret in GA4 Admin > Data Streams > Measurement Protocol
// API secrets first — the old one embedded in index.html should be revoked,
// not reused here.

const GA_MEASUREMENT_ID = 'G-KZJJ63KTD7';
const GA_API_SECRET = Deno.env.get('GA_API_SECRET');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
  }
  if (!GA_API_SECRET) {
    console.error('GA_API_SECRET is not set');
    return new Response('Server misconfigured', { status: 500, headers: CORS_HEADERS });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400, headers: CORS_HEADERS });
  }
  if (!body?.client_id || !Array.isArray(body?.events)) {
    return new Response('Bad request', { status: 400, headers: CORS_HEADERS });
  }

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      { method: 'POST', body: JSON.stringify(body) }
    );
  } catch (e) {
    console.error('GA forward failed:', e);
    // Still return 204 — this is a fire-and-forget analytics ping, the
    // caller (sendBeacon) never reads the response either way.
  }

  return new Response(null, { status: 204, headers: CORS_HEADERS });
});
