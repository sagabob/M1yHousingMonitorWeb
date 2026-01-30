import { createInternalErrorResponse } from './response-utils';

export const withEdgeHandler = (handler: (req: Request) => Promise<Response>) => {
    return async (req: Request) => {
        try {
            // Environment validation happens automatically when getSupabaseClient() is first called
            return await handler(req);
        } catch (error) {
            console.error(error);
            return createInternalErrorResponse(error);
        }
    };
};
