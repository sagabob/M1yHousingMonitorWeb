import { useSuspenseQuery } from "@tanstack/react-query";
import { getHomePageData } from "@/data-services/api/getHomePageData";
import { QUERY_KEYS,CACHE_TIMES } from "@/data-services/config/constants";


// Hook for fetching listing types by specific code
export function useHomePageData(lgacode: string, bmcode: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.HOUSING_DATA_BY_CODE(lgacode, bmcode), queryFn: () => getHomePageData(lgacode, bmcode),
    staleTime: CACHE_TIMES.FIVE_MINUTES,
  });
}
