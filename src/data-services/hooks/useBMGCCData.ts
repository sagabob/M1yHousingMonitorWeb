import { useSuspenseQuery } from "@tanstack/react-query";
import { getBMGCC } from "@/data-services/api/getBMGCC";


export function useBMGCCData(lgacode: string) {
    return useSuspenseQuery({
        queryKey: ['bm-gcc', lgacode],
        queryFn: () => getBMGCC(lgacode),
    });
}
