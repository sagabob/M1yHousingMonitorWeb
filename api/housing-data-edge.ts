export const config = { runtime: 'edge' };
import { validateEnvironment } from './lib/database';
import { getLgaData } from './lib/firebase-service';
import { getListingTypes, getHomeDataSummary } from './lib/supabase-service';
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
    const [firebaseResult, listingResult, summaryResult] = await Promise.all([
      getLgaData(lgacode, 'PricesIncomesMedians'),
      getListingTypes(bmcode, 50),
      getHomeDataSummary(lgacode, 100)
    ]);

    return createSuccessResponse({
      firebase_data: firebaseResult.data,
      firebase_exists: firebaseResult.exists,
      supabase_listingtypes: listingResult.data,
      supabase_home_summary: summaryResult.data,
      lgacode,
      bmcode,
      documentId: firebaseResult.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in housing data edge function:', error);
    return createInternalErrorResponse(error);
  }
}