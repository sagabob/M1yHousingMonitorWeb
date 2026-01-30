import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingGrid from "@/components/common/LoadingGrid";
import { formatRentalValue, formatSaleValue, formatLgaCode, formatNumber, formatDate, formatPercentage, formatNumberWithSign } from "@/data-services/data-utils/core-utils";
import { getLatestDataRentals, getLatestDataSales, getLatestRentalData, getLatestSalesData } from "@/data-services/data-utils/home-page-data";
import { useHomePageData } from "@/data-services/hooks/useHomePageData";
import { useTotalMedianPrice } from "@/data-services/hooks/useMedianPrice";
import { usePageContext } from "@/data-services/hooks/usePageContext";
import { ErrorFallback } from "@/components/common/ErrorFallback";
import { HouseholdTypeIcon } from "@/ui/icons/household_type";
import PopulationIcon from "@/ui/icons/population";
import { QueryBoundary } from "@/components/common/QueryBoundary";



// Data loading component that will be wrapped in Suspense
const HomeContainerContent = () => {
    const pageContext = usePageContext()
    const lga = pageContext.lga;
    const bmGCC = pageContext.bmGCCData;

    const lgaCode = formatLgaCode(lga);
    const lgaMedianPrice = useTotalMedianPrice(lgaCode)
    const homePageData = useHomePageData(lgaCode, bmGCC.GCC_Code)

    // With ErrorBoundary wrapping this component, throw on missing data
    if (!lgaMedianPrice.data) {
        throw new Error('No median price data available for this LGA');
    }

    if (!homePageData.data) {
        throw new Error('No home page data available');
    }

    if (homePageData.data.home_summary.length === 0) {
        throw new Error('No home data summary available');
    }

    // Extract data - no defensive checks needed, ErrorBoundary handles errors
    const latestDataRentals = getLatestDataRentals(lgaMedianPrice.data);
    const latestDataSales = getLatestDataSales(lgaMedianPrice.data);

    if (!latestDataRentals) {
        throw new Error('No rental data available');
    }

    if (!latestDataSales) {
        throw new Error('No sales data available');
    }

    const homePageDataSummary = homePageData.data.home_summary[0];

    const bmLatestRentalData = getLatestRentalData(homePageData.data.listing_types);
    const bmLatestSalesData = getLatestSalesData(homePageData.data.listing_types);

    const bmUnitPrice = bmLatestSalesData.find(d => d.Property_Type === "Unit")?.Median;
    const bmHousePrice = bmLatestSalesData.find(d => d.Property_Type === "House")?.Median;
    const bmRentalUnitPrice = bmLatestRentalData.find(d => d.Property_Type === "Unit")?.Median;
    const bmRentalHousePrice = bmLatestRentalData.find(d => d.Property_Type === "House")?.Median;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-3 mt-1">
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none">
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-housing py-2 mb-1 border-b-2 border-b-housing">Median Price ({latestDataSales.Period_Name})</CardTitle>
                            <CardDescription className="text-black">
                                <h3 className="text-sm text-housing font-bold mb-1">Median Unit Price ({latestDataSales.Period_Name})</h3>
                                <div className="flex justify-between space-y-1"><span>{lga.name}</span><span>{formatSaleValue(latestDataSales.Median_Unit)}</span></div>
                                <div className="flex justify-between space-y-1"><span>{bmGCC.GCC_Name}</span><span>{formatSaleValue(bmUnitPrice)}</span></div>
                            </CardDescription>
                            <CardDescription className="text-black">
                                <h3 className="text-sm text-housing font-bold mb-1">Median House Price ({latestDataSales.Period_Name})</h3>
                                <div className="flex justify-between space-y-1"><span>{lga.name}</span><span>{formatSaleValue(latestDataSales.Median_House)}</span></div>
                                <div className="flex justify-between space-y-1"><span>{bmGCC.GCC_Name}</span><span>{formatSaleValue(bmHousePrice)}</span></div>
                            </CardDescription>
                        </CardHeader>

                    </Card>
                </div>
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-housing py-2 mb-1 border-b-2 border-b-housing">Median Rental ({latestDataRentals.Period_Name})</CardTitle>
                            <CardDescription className="text-black ">
                                <h3 className="text-sm text-housing font-bold mb-1">
                                    Median Unit Rental ({latestDataRentals.Period_Name})
                                </h3>
                                <div className="flex justify-between space-y-1">
                                    <span>{lga.name}</span>
                                    <span>{formatRentalValue(latestDataRentals.Median_Unit, "week")}</span>
                                </div>
                                <div className="flex justify-between space-y-1">
                                    <span>{bmGCC.GCC_Name}</span>
                                    <span>{formatRentalValue(bmRentalUnitPrice, "week")}</span>
                                </div>
                            </CardDescription>
                            <CardDescription className="text-black ">
                                <h3 className="text-sm text-housing font-bold mb-1">
                                    Median House Rental ({latestDataRentals.Period_Name})
                                </h3>
                                <div className="flex justify-between space-y-1">
                                    <span>{lga.name}</span>
                                    <span>{formatRentalValue(latestDataRentals.Median_House, "week")}</span>
                                </div>
                                <div className="flex justify-between space-y-1">
                                    <span>{bmGCC.GCC_Name}</span>
                                    <span>{formatRentalValue(bmRentalHousePrice, "week")}</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-3">
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-housing py-2 mb-1 border-b-2 border-b-housing">Household type is the most affordable </CardTitle>
                            <CardDescription className="text-black ">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <span className="block mb-1 text-xl">{homePageDataSummary.Household_type_need}</span>
                                        <span className="block mb-1">({formatNumber(homePageDataSummary.Household_type_need_number)} households)</span>
                                    </div>
                                    <div className="shrink-0">
                                        <HouseholdTypeIcon className="h-16 w-16 text-housing" />
                                    </div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-housing py-2 mb-1 border-b-2 border-b-housing">Population {formatDate(homePageDataSummary.Population_time_period)} (and annual change)</CardTitle>
                            <CardDescription className="text-black ">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <span className="block mb-1 text-xl">{formatNumber(homePageDataSummary.Population)}</span>
                                        <span className="block mb-1">({formatPercentage(homePageDataSummary.Population_growth_rate_annual, 1)} p.a)</span>
                                    </div>
                                    <div className="shrink-0">
                                        <PopulationIcon className="h-16 w-24 text-housing" />
                                    </div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-3">
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none h-36" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-housing py-2 mb-1 border-b-2 border-b-housing">Average household size (2016-2021)</CardTitle>
                            <CardDescription className="text-black ">
                                <div className="flex justify-between space-y-1"><span>{lga.name}</span><span>{formatNumber(homePageDataSummary.Average_household_size, 2)} ({formatNumberWithSign(homePageDataSummary.Average_household_size_change, 2)})</span></div>
                                <div className="flex justify-between space-y-1"><span>{bmGCC.GCC_Name}</span><span>{formatNumber(homePageDataSummary.Average_household_size_benchmark, 2)} ({formatNumberWithSign(homePageDataSummary.Average_household_size_benchmark_change, 2)})</span></div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none h-36" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-housing py-2 mb-1 border-b-2 border-b-housing">{`Dominant dwelling type (2021 Census)`}</CardTitle>
                            <CardDescription className="text-black ">
                                <div className="flex justify-between space-y-1">
                                    <span>{homePageDataSummary.Dominant_dwelling_type_name}</span>
                                    {homePageDataSummary.Dominant_dwelling_type_per !== null && homePageDataSummary.Dominant_dwelling_type_per !== undefined && (
                                        <span>({formatPercentage(homePageDataSummary.Dominant_dwelling_type_per, 1)})</span>
                                    )}
                                </div>
                            </CardDescription>
                            <CardDescription className="text-black ">
                                <h3 className="text-sm text-housing font-bold mb-1">
                                    Emerging dwelling type
                                </h3>
                                <div className="flex justify-between space-y-1">
                                    <span>{homePageDataSummary.Emerging_dwelling_type_name}</span>
                                    <span>({formatNumberWithSign(homePageDataSummary.Emerging_dwelling_type_change)})</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Main component with Suspense wrapper
export default function HomeContainer() {

    return (
        <QueryBoundary
            loading={<LoadingGrid cardCount={6} staggerDelay={300} cardType="compact" />}
            errorFallback={(props) => <ErrorFallback {...props} />}
        >
            <HomeContainerContent />
        </QueryBoundary>

    );
}


