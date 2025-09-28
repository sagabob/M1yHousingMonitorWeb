// Utility functions for creating consistent API responses

export const createErrorResponse = (error: string, status: number = 400) => {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { 'content-type': 'application/json' }
  });
};

export const createSuccessResponse = (data: any, additionalHeaders: Record<string, string> = {}) => {
  const headers = {
    'content-type': 'application/json',
    'cache-control': 's-maxage=60, stale-while-revalidate=300',
    ...additionalHeaders
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers
  });
};

export const createNotFoundResponse = (message: string, details?: any) => {
  return new Response(JSON.stringify({ 
    error: message,
    ...details
  }), {
    status: 404,
    headers: { 'content-type': 'application/json' }
  });
};

export const createInternalErrorResponse = (error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  
  return new Response(JSON.stringify({ 
    error: 'Internal server error',
    message
  }), {
    status: 500,
    headers: { 'content-type': 'application/json' }
  });
};