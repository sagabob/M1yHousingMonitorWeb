import { validateEnvironment } from './database';
import { createInternalErrorResponse } from './response-utils';

export const withEdgeHandler = (handler: (req: Request) => Promise<Response>) => {
    return async (req: Request) => {
        try {
            validateEnvironment();
            return await handler(req);
        } catch (error) {
            console.error(error);
            return createInternalErrorResponse(error);
        }
    };
};
