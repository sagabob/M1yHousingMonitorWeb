export const config = { runtime: 'edge' };
import { getDwellingStructureforLga } from './lib/supabase-service';
import { createErrorResponse, createSuccessResponse, createInternalErrorResponse } from './lib/response-utils';

export default async function handler(req: Request) {
    const url = new URL(req.url);
    const lgacode = url.searchParams.get('lgacode') ?? '';
    const bmcode = url.searchParams.get('bmcode') ?? '';

    if (!lgacode || !bmcode) {
        return createErrorResponse('Missing lgacode or bmcode');
    }

    try {

        console.log(`🔍 Fetching data for LGA: ${lgacode}, BM: ${bmcode}`);

        // Fetch data from both sources in parallel
        const [dwellingLgaResult, dwellingBmResult] = await Promise.all([
            getDwellingStructureforLga(lgacode),
            getDwellingStructureforLga(bmcode)
        ]);

        return createSuccessResponse({
            lga: dwellingLgaResult.data,
            bm: dwellingBmResult.data,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error in housing data edge function:', error);
        return createInternalErrorResponse(error);
    }
}