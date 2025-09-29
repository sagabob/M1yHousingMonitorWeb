import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "../api/homePageDataService";
import { QUERY_KEYS, CACHE_TIMES } from "../config/constants";



// Hook for fetching listing types by specific code
export function useHomePageData(lgacode: string, bmcode: string) {
  const code = lgacode.startsWith("LGA") ? lgacode : `LGA${lgacode}`;
  return useQuery({
    queryKey: QUERY_KEYS.HOUSING_DATA_BY_CODE(lgacode),
    queryFn: () => getHomePageData(lgacode, bmcode),
    enabled: !!code,
    staleTime: CACHE_TIMES.DEFAULT_STALE,
    gcTime: CACHE_TIMES.DEFAULT_GC,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 3;
    }, retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

