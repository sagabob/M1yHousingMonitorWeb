import { useQuery } from "@tanstack/react-query";
import { getListingTypesByCode  } from "../api/listingService";
import { QUERY_KEYS, CACHE_TIMES } from "../config/constants";

// Hook for fetching all listing types


// Hook for fetching listing types by specific code
export function useListingTypesByCode(code: string ) {
  return useQuery({
    queryKey: QUERY_KEYS.LISTING_TYPES_BY_CODE(code),
    queryFn: () => getListingTypesByCode(code),
    enabled: !!code,
    staleTime: CACHE_TIMES.LISTING_TYPES_STALE,
    gcTime: CACHE_TIMES.LISTING_TYPES_GC,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 3;
    },    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

