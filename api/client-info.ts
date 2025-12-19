export const config = { runtime: 'edge' };
import { withEdgeHandler } from './_lib/with-edge-handler';
import { getBenchMarkforLga } from './_lib/supabase-service';
import { createErrorResponse, createSuccessResponse } from './_lib/response-utils';

export default withEdgeHandler(async (req: Request) => {
    const url = new URL(req.url);
    const lgaCode = url.searchParams.get('lgacode');

    if (!lgaCode) {
        return createErrorResponse('Missing lgacode');
    }

    console.log(`🔍 Fetching client info for LGA: ${lgaCode}`);

    const clientInfoResult = await getBenchMarkforLga(lgaCode);

    // Check for Supabase errors
    if (clientInfoResult.error) {
        console.error('❌ Supabase RPC error in client-info:', clientInfoResult.error);
        console.error('❌ Error details:', JSON.stringify(clientInfoResult.error, null, 2));
    }

    // Log result details
    console.log(`📊 Result count: ${clientInfoResult.count ?? 0}`);
    console.log(`📊 Has data: ${!!clientInfoResult.data}`);
    console.log(`📊 Data length: ${clientInfoResult.data?.length ?? 0}`);

    return createSuccessResponse({
        data: clientInfoResult.data,
        timestamp: new Date().toISOString()
    });
});