
import { getTotalMedianPriceById } from "@/data-services/repos/medianPrice.repo";
import { QUERY_KEYS } from "@/data-services/config/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useTotalMedianPrice(lgacode: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MEDIAN_PRICE_BY_LGA(lgacode),
    queryFn: () => getTotalMedianPriceById(lgacode),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}