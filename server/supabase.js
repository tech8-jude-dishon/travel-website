const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
// Server-side uploads use the SERVICE ROLE key so they bypass Storage RLS.
// Never expose this key to the frontend.
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  SUPABASE_URL / SUPABASE_SERVICE_KEY missing in .env — image uploads will fail.');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: { persistSession: false, autoRefreshToken: false },
  // Node < 22 has no built-in WebSocket and supabase-js throws at startup without one
  // (the live server runs Node 20). Realtime isn't used, but the client still needs it.
  realtime: { transport: require('ws') },
});

module.exports = supabase;
