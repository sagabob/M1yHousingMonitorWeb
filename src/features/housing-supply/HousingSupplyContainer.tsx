import { Suspense, lazy } from 'react';
import { ErrorFallback } from "@/components/common/ErrorFallback";
import { QueryBoundary } from "@/components/common/QueryBoundary";
import { formatLgaCode } from "@/data-services/data-utils/core-utils";
import { useDwellingStructureData } from "@/data-services/hooks/useDwellingStructureData";
import { usePageContext } from "@/data-services/hooks/usePageContext";
import HousingTypesChart from "@/components/charts/HousingTypesChart";
import HousingTypesByBedroomsChart from "@/components/charts/HousingTypesByBedroomsChart";
import LoadingChart from "@/components/charts/LoadingChart";
import { useApprovalsPerQuarter } from "@/data-services/hooks/useApprovalsPerQuarter";
import { useBuildingApprovalsLGA } from "@/data-services/hooks/useBuildingApprovalsLGA";
import HousingApprovalsChart from "@/components/charts/HousingApprovalsChart";

// Lazy load the ApprovalsMap
const ApprovalsMap = lazy(() => import("@/components/maps/ApprovalsMap").then(module => ({ default: module.ApprovalsMap })));

// Main component with Suspense wrapper
export default function HousingSupplyContainer() {

    return (
        <QueryBoundary
            loading={<LoadingChart />}
            errorFallback={(props) => <ErrorFallback {...props} />}
        >
            <HousingSupplyContent />
        </QueryBoundary>

    );
}


const HousingSupplyContent = () => {
    const pageContext = usePageContext()
    const lga = pageContext.lga;
    const bmGCC = pageContext.bmGCCData;

    if (!lga || !bmGCC) {
        return null; // or a suitable fallback UI
    }

    const lgaCode = formatLgaCode(lga);
    const dwellingStructureData = useDwellingStructureData(lgaCode, bmGCC.GCC_Code);
    const sa1_list = dwellingStructureData.data.sa1_list.map((item) => item.SA1_Code);
    const approvalData = useApprovalsPerQuarter(sa1_list);
    const buildingApprovalsLGA = useBuildingApprovalsLGA(lgaCode);

    return (<div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-3 mt-1">
            <div className="col-span-12 md:col-span-12">
                <h2 className="mb-2 pb-2 text-[28px] font-bold border-b border-[#a9aaab]">Dwelling Structure</h2>
                <div className="row" id="what-is-the-dominant-housing-type">
                    <HousingTypesChart
                        data={dwellingStructureData.data.lga}
                        benchmarkData={dwellingStructureData.data.bm}
                        areaName={lga.name}
                        benchmarkName={bmGCC.GCC_Name}
                    />
                </div>
            </div>
            <div className="col-span-12 md:col-span-12">
                <div className="row" id="what-is-the-mix-of-housing">
                    <HousingTypesByBedroomsChart
                        data={dwellingStructureData.data.type_bedrooms}
                        areaName={lga.name}
                        benchmarkName={bmGCC.GCC_Name}
                    />
                </div>
            </div>
            <div className="col-span-12 md:col-span-12">
                <div className="row" id="how-are-residential-building-approvals-tracking">
                    <HousingApprovalsChart
                        data={buildingApprovalsLGA.data}
                    />
                </div>
            </div>
            <div className="col-span-12 md:col-span-12">
                <div className="row" id="where-is-new-building-happening">
                    <Suspense fallback={<div className="h-[500px] flex items-center justify-center bg-gray-50 text-gray-400">Loading Map...</div>}>
                        <ApprovalsMap
                            data={approvalData.data}
                            pageContext={{
                                geocode: lgaCode,
                                alias: lga.alias
                            }}
                            title="Where are building approvals located?"
                        />
                    </Suspense>
                </div>
            </div>

        </div>
    </div>)
}
