import {  useSuspenseQuery } from "@tanstack/react-query";
import { getHomePageData } from "../api/homePageDataService";
import { QUERY_KEYS } from "../config/constants";



// Hook for fetching listing types by specific code
export function useHomePageData(lgacode: string, bmcode: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.HOUSING_DATA_BY_CODE(lgacode),
    queryFn: () => getHomePageData(lgacode, bmcode),

  });
}
