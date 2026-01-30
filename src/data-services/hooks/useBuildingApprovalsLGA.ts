
import { getBuildingApprovalLGAById } from "@/data-services/repos/buildingApprovalsLGA.repo";
import { CACHE_TIMES, QUERY_KEYS } from "@/data-services/config/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useBuildingApprovalsLGA(lgacode: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.BUILDING_APPROVALS_LGA(lgacode),
    queryFn: () => getBuildingApprovalLGAById(lgacode),
    staleTime: CACHE_TIMES.FIVE_MINUTES,
  });
}