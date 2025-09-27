import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRentalValue, formatSaleValue } from "@/data-services/data-utils/core-utils";
import { getBenchMark, getLatestDataRentals, getLatestDataSales, getLatestRentalData, getLatestSalesData } from "@/data-services/data-utils/home-page-data";
import { useListingTypesByCode } from "@/data-services/hooks/useListingTypes";
import { useTotalMedianPrice } from "@/data-services/hooks/useMedianPrice";
import { useLga } from "@/hooks/use-lga";



const HomeContainer = () => {

    const lga = useLga()
    //need to call the data service to get data from fire store
    const lgaMedianPrice = useTotalMedianPrice(lga?.id || "")

    const bm = getBenchMark()
    const bmMedianPrice = useListingTypesByCode(bm.code)

    if (lgaMedianPrice.isLoading || bmMedianPrice.isLoading) {
        return <div>Loading...</div>
    }
    if (lgaMedianPrice.error || bmMedianPrice.error) {
        return <div>Error: {lgaMedianPrice.error?.message || bmMedianPrice.error?.message}</div>
    }

    if (!lgaMedianPrice.data && !bmMedianPrice.data) {
        return <div>No data available</div>;
    }

    const latestDataRentals = getLatestDataRentals(lgaMedianPrice.data);
    const latestDataSales = getLatestDataSales(lgaMedianPrice.data);

    const bmLatestRentalData = getLatestRentalData(bmMedianPrice.data);
    const bmLatestSalesData = getLatestSalesData(bmMedianPrice.data);

    const bmUnitPrice = bmLatestSalesData.find(d => d.propertytype === "Unit")?.median;
    const bmHousePrice = bmLatestSalesData.find(d => d.propertytype === "House")?.median;

    const lgaRentalUnitPrice = bmLatestRentalData.find(d => d.propertytype === "Unit")?.median;
    const lgaRentalHousePrice = bmLatestRentalData.find(d => d.propertytype === "House")?.median;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1">
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none">
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-[#7513b8] py-2 mb-1 border-b-2 border-b-[#7513b8]">Median Price ({latestDataSales?.Period_Name})</CardTitle>
                            <CardDescription className="text-black">
                                <h3 className="text-sm text-[#7513b8] font-bold mb-1">Median Unit Price ({latestDataSales?.Period_Name})</h3>
                                <div className="flex justify-between space-y-1"><span >{lga.name}</span><span>{formatSaleValue(latestDataSales?.Median_Unit)}</span></div>
                                <div className="flex justify-between space-y-1"><span >{bm.name}</span><span>{formatSaleValue(bmUnitPrice)}</span></div>
                            </CardDescription>
                            <CardDescription className="text-black">
                                <h3 className="text-sm text-[#7513b8] font-bold mb-1">Median House Price {latestDataSales?.Period_Name}</h3>
                                <div className="flex justify-between space-y-1"><span >{lga.name}</span><span>{formatSaleValue(latestDataSales?.Median_House)}</span></div>
                                <div className="flex justify-between space-y-1"><span >{bm.name}</span><span>{formatSaleValue(bmHousePrice)}</span></div>
                            </CardDescription>
                        </CardHeader>

                    </Card>
                </div>
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-[#7513b8] py-2 mb-1 border-b-2 border-b-[#7513b8]">Median Rental ({latestDataRentals?.Period_Name})</CardTitle>
                            <CardDescription className="text-black ">
                                <h3 className="text-sm text-[#7513b8] font-bold mb-1">Median Unit Rental ({latestDataSales?.Period_Name})</h3>
                                <div className="flex justify-between space-y-1"><span >{lga.name}</span><span>{formatRentalValue(latestDataRentals?.Median_Unit, "week")}</span></div>
                                <div className="flex justify-between space-y-1"><span >{bm.name}</span><span>{formatRentalValue(lgaRentalUnitPrice, "week")}</span></div>
                            </CardDescription>
                            <CardDescription className="text-black ">
                                <h3 className="text-sm text-[#7513b8] font-bold mb-1">Median House Rental ({latestDataSales?.Period_Name})</h3>
                                <div className="flex justify-between space-y-1"><span >{lga.name}</span><span>{formatRentalValue(latestDataRentals?.Median_House, "week")}</span></div>
                                <div className="flex justify-between space-y-1"><span >{bm.name}</span><span>{formatRentalValue(lgaRentalHousePrice, "week")}</span></div>
                            </CardDescription>
                        </CardHeader>

                    </Card>
                </div>
            </div>
        </div>
    );
}

export default HomeContainer;