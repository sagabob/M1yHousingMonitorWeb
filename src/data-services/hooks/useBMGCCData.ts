import { useSuspenseQuery } from "@tanstack/react-query";
import { getBMGCC } from "@/data-services/client-api/getBMGCC";
import { QUERY_KEYS } from "@/data-services/config/constants";


export function useBMGCCData(lgacode: string) {
    return useSuspenseQuery({
        queryKey: QUERY_KEYS.BMGCC_BY_CODE(lgacode),
        queryFn: () => getBMGCC(lgacode),
    });
}
