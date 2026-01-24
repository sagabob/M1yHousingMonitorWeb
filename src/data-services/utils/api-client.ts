/**
 * Shared utility functions for API client operations
 */

/**
 * Handles fetch errors with proper content-type checking
 * Prevents JSON parsing errors when the response is HTML or other non-JSON content
 */
export async function handleFetchError(response: Response): Promise<Error> {
  const contentType = response.headers.get('content-type');
  let errorMessage = `API error: ${response.status} - ${response.statusText}`;
  
  if (contentType?.includes('application/json')) {
    try {
      const errorData = await response.json();
      errorMessage = `API error: ${response.status} - ${errorData.error || response.statusText}`;
    } catch (e) {
      // If JSON parsing fails, use default error message
    }
  } else {
    // If response is not JSON (e.g., HTML error page), read as text
    const text = await response.text();
    errorMessage = `API error: ${response.status} - ${response.statusText}. Response: ${text.substring(0, 200)}`;
  }
  
  return new Error(errorMessage);
}

/**
 * Creates a standardized fetch request with common headers
 */
export async function fetchAPI<T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = new URL(endpoint, window.location.origin);
  
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw await handleFetchError(response);
  }

  return response.json();
}
