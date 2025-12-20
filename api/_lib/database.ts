
import { createClient } from '@supabase/supabase-js';

// Supabase client (singleton pattern)
let supabaseClient: any = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    console.log(`🔧 Initializing Supabase client`);
    console.log(`🔧 URL: ${supabaseUrl.substring(0, 30)}...`);
    console.log(`🔧 Key exists: ${!!supabaseKey}`);

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: (url, options: RequestInit = {}) => {
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

// Utility function to validate environment variables
export const validateEnvironment = () => {
  const required = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  return true;
};