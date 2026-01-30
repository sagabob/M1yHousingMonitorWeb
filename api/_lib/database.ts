
import { createClient } from '@supabase/supabase-js';
import { validateEnvironment } from './env';

// Supabase client (singleton pattern)
let supabaseClient: any = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    const env = validateEnvironment();
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_ANON_KEY;

    console.log(`🔧 Initializing Supabase client`);
    console.log(`🔧 URL: ${supabaseUrl.substring(0, 20)}...`);
    console.log(`🔧 Key exists: ${!!supabaseKey}`);

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: (url: string | Request | URL, options: RequestInit = {}) => {
          // Convert headers to a plain object if it's a Headers instance
          const headers = new Headers(options.headers);
          headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          headers.set('Pragma', 'no-cache');
          headers.set('Expires', '0');

          return fetch(url, {
            ...options,
            cache: 'no-store',
            headers: headers,
          });
        },
      },
    });
  }
  return supabaseClient;
};