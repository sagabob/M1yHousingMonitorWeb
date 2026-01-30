import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS, CACHE_TIMES } from "@/data-services/config/constants";
import { getDwellingStructureData } from "@/data-services/api/getDwellingStructureData";


// Hook for fetching listing types by specific code
export function useDwellingStructureData(lgacode: string, bmcode: string) {
    return useSuspenseQuery({
        queryKey: QUERY_KEYS.DWELLING_STRUCTURE_BY_LGA(lgacode, bmcode), queryFn: () => getDwellingStructureData(lgacode, bmcode),
        staleTime: CACHE_TIMES.FIVE_MINUTES,
    });
}
