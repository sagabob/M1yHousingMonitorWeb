export const config = { runtime: 'edge' };
import { getHomePageSummaryByLga, getLatestListingTypes } from './_lib/supabase-service';
import { createErrorResponse, createSuccessResponse, createInternalErrorResponse } from './_lib/response-utils';

import { withEdgeHandler } from './_lib/with-edge-handler';

export default withEdgeHandler(async (req: Request) => {
  const url = new URL(req.url);
  const lgacode = url.searchParams.get('lgacode') ?? '';
  const bmcode = url.searchParams.get('bmcode') ?? '';

  if (!lgacode || !bmcode) {
    return createErrorResponse('Missing lgacode or bmcode');
  }

  console.log(`🔍 Fetching data for LGA: ${lgacode}, BM: ${bmcode}`);

  // Fetch data from both sources in parallel
  const [listingResult, summaryResult] = await Promise.all([
    getLatestListingTypes(bmcode),
    getHomePageSummaryByLga(lgacode)
  ]);

  if (listingResult.error || summaryResult.error) {
    return createInternalErrorResponse(
      listingResult.error?.message || summaryResult.error?.message || 'Failed to fetch data'
    );
  }

  return createSuccessResponse({
    listingtypes: listingResult.data,
    home_summary: summaryResult.data,
    timestamp: new Date().toISOString()
  });
});