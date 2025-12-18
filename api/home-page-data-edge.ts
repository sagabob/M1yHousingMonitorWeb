export const config = { runtime: 'edge' };
import { validateEnvironment } from './lib/database';
import { getHomePageSummaryByLga, getLatestListingTypes } from './lib/supabase-service';
import { createErrorResponse, createSuccessResponse, createInternalErrorResponse } from './lib/response-utils';

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const lgacode = url.searchParams.get('lgacode') ?? '';
  const bmcode = url.searchParams.get('bmcode') ?? '';

  if (!lgacode || !bmcode) {
    return createErrorResponse('Missing lgacode or bmcode');
  }

  try {
    // Validate environment variables
    validateEnvironment();

    console.log(`🔍 Fetching data for LGA: ${lgacode}, BM: ${bmcode}`);

    // Fetch data from both sources in parallel
    const [listingResult, summaryResult] = await Promise.all([
      getLatestListingTypes(bmcode),
      getHomePageSummaryByLga(lgacode)
    ]);

    return createSuccessResponse({
      listingtypes: listingResult.data,
      home_summary: summaryResult.data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in housing data edge function:', error);
    return createInternalErrorResponse(error);
  }
}