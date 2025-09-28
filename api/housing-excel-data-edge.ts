export const config = { runtime: 'edge' };
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const lgacode = url.searchParams.get('lgacode') ?? '';
  const bmcode  = url.searchParams.get('bmcode') ?? '';
  if (!lgacode || !bmcode) {
    return new Response(JSON.stringify({ error: 'Missing lgacode or bmcode' }), {
      status: 400, headers: { 'content-type': 'application/json' }
    });
  }

  // Forward the caller’s JWT so RLS applies (user-scoped)
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
  );

  const [listing, summary] = await Promise.all([
    supabase.from('v_latest_listingtypes_v1')
      .select('*')
      .eq('code', bmcode)     
      .limit(50),
    supabase.from('v_home_data_summary')
      .select('*')
      .eq('LGA_CODE', lgacode)
      .limit(50),
  ]);

  if (listing.error || summary.error) {
    return new Response(JSON.stringify({ error: listing.error?.message ?? summary.error?.message }), {
      status: 400, headers: { 'content-type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({
    bm_listingtypes: listing.data,
    home_summary: summary.data
  }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 's-maxage=60, stale-while-revalidate=300'
    },
  });
}
