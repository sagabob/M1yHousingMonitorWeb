import { useQuery } from "@tanstack/react-query";
import { getTotalMedianPriceById } from "../repos/medianPrice.repo";

export function useTotalMedianPrice(lgacode: string) {
  return useQuery({
    queryKey: ["medianPriceClientHomePage", lgacode],
    queryFn: () => getTotalMedianPriceById(lgacode),
    enabled: !!lgacode,
    staleTime: 60_000,
  });
}