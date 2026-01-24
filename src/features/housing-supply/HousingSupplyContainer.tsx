import { ErrorFallback } from "@/components/common/ErrorFallback";
import { QueryBoundary } from "@/components/common/QueryBoundary";
import { formatLgaCode } from "@/data-services/data-utils/core-utils";
import { useDwellingStructureData } from "@/data-services/hooks/useDwellingStructureData";
import { usePageContext } from "@/data-services/hooks/usePageContext";
import HousingTypesChart from "@/components/charts/HousingTypesChart";
import HousingTypesByBedroomsChart from "@/components/charts/HousingTypesByBedroomsChart";
import LoadingChart from "@/components/charts/LoadingChart";

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

    const lgaCode = formatLgaCode(lga);
    const dwellingStructureData = useDwellingStructureData(lgaCode, bmGCC.GCC_Code);

    return (<div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-3 mt-1">
            <div className="col-span-12 md:col-span-12">
                <h2 className="mb-2 pb-2 text-[28px] font-bold border-b border-[#a9aaab]">Dwelling Structure</h2>
                <div className="row">
                    <HousingTypesChart
                        data={dwellingStructureData.data.lga}
                        benchmarkData={dwellingStructureData.data.bm}
                        areaName={lga.name}
                        benchmarkName={bmGCC.GCC_Name}
                    />
                </div>
            </div>
            <div className="col-span-12 md:col-span-12">
                <div className="row">
                    <HousingTypesByBedroomsChart
                        data={dwellingStructureData.data.type_bedrooms}
                        areaName={lga.name}
                    />
                </div>
            </div>

        </div>
    </div>)
}
