
import { getApprovalsPerQuarterByIds } from "@/data-services/repos/approvalsPerQuarter.repo";
import { CACHE_TIMES, QUERY_KEYS } from "@/data-services/config/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useApprovalsPerQuarter(ids: string[]) {
    return useSuspenseQuery({
        queryKey: QUERY_KEYS.APPROVALS_PER_QUARTER(ids),
        queryFn: () => getApprovalsPerQuarterByIds(ids),
        staleTime: CACHE_TIMES.FIVE_MINUTES,
    });
}
