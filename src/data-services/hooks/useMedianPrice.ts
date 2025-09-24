import { useQuery } from "@tanstack/react-query";
import { getTotalMedianPriceById } from "../repos/medianPrice.repo";
import { QUERY_KEYS, CACHE_TIMES } from "../utils/constants";

export function useTotalMedianPrice(lgacode: string) {
  return useQuery({
    queryKey: QUERY_KEYS.MEDIAN_PRICE_BY_LGA(lgacode),
    queryFn: () => getTotalMedianPriceById(lgacode),
    enabled: !!lgacode,
    staleTime: CACHE_TIMES.MEDIAN_PRICE_STALE,
    gcTime: CACHE_TIMES.MEDIAN_PRICE_GC,
    retry: (failureCount, error) => {
      // Don't retry if document not found (404)
      if (error?.message?.includes('not found')) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}