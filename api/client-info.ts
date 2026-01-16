export const config = { runtime: 'edge' };
import { getBenchMarkforLga } from './lib/supabase-service';
import { createErrorResponse, createSuccessResponse, createInternalErrorResponse } from './lib/response-utils';

export default withEdgeHandler(async (req: Request) => {
    const url = new URL(req.url);
    const lgaCode = url.searchParams.get('lgacode');

    if (!lgaCode) {
        return createErrorResponse('Missing lgacode');
    }

    try {

    const clientInfoResult = await getBenchMarkforLga(lgaCode);

    // Check for Supabase errors
    if (clientInfoResult.error) {
        console.error('❌ Supabase RPC error in client-info:', clientInfoResult.error);
        console.error('❌ Error details:', JSON.stringify(clientInfoResult.error, null, 2));
    }

        // Check for Supabase errors
        if (clientInfoResult.error) {
            console.error('❌ Supabase RPC error in client-info:', clientInfoResult.error);
            console.error('❌ Error details:', JSON.stringify(clientInfoResult.error, null, 2));
            return createInternalErrorResponse(clientInfoResult.error);
        }

    return createSuccessResponse({
        data: clientInfoResult.data,
        timestamp: new Date().toISOString()
    });
});