export const config = { runtime: 'edge' };
import { getDwellingStructureforLga, getDwellingTypeBedroomsforLga } from './_lib/supabase-service';
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
    const [dwellingLgaResult, dwellingBmResult, dwellingTypeBedroomsResult] = await Promise.all([
        getDwellingStructureforLga(lgacode),
        getDwellingStructureforLga(bmcode),
        getDwellingTypeBedroomsforLga(lgacode),
    ]);

    return createSuccessResponse({
        lga: dwellingLgaResult.data,
        bm: dwellingBmResult.data,
        type_bedrooms: dwellingTypeBedroomsResult.data,
        timestamp: new Date().toISOString()
    });
});