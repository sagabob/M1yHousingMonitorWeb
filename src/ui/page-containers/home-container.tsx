import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRentalValue, formatSaleValue } from "@/data-services/data-utils/core-utils";
import { getLatestDataRentals, getLatestDataSales } from "@/data-services/data-utils/home-page-data";
import { useTotalMedianPrice } from "@/data-services/hooks/useMedianPrice";
import { useLga } from "@/hooks/use-lga";



const HomeContainer = () => {

    const lga = useLga()
    //need to call the data service to get data from fire store
    const { data: medianPriceData, isLoading, error } = useTotalMedianPrice(lga?.id || "")


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!medianPriceData) {
        return <div>No data available</div>;
    }

    const latestDataRentals = getLatestDataRentals(medianPriceData);
    const latestDataSales = getLatestDataSales(medianPriceData);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-1">
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none">
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-[#7513b8] py-2 mb-1 border-b-2 border-b-[#7513b8]">Median Price ({latestDataSales?.Period_Name})</CardTitle>
                            <CardDescription className="text-black">
                                <div className="flex justify-between space-y-1"><span >Median Unit Price:</span><span>{formatSaleValue(latestDataSales?.Median_Unit)}</span></div>
                                <div className="flex justify-between space-y-1"><span >Median House Price:</span><span>{formatSaleValue(latestDataSales?.Median_House)}</span></div>
                            </CardDescription>
                        </CardHeader>

                    </Card>
                </div>
                <div className="col-span-1 md:col-span-6">
                    <Card className="p-0 bg-gray-100 shadow-none rounded-none" >
                        <CardHeader className="px-3 py-2">
                            <CardTitle className="text-[#7513b8] py-2 mb-1 border-b-2 border-b-[#7513b8]">Median Rental ({latestDataRentals?.Period_Name})</CardTitle>
                            <CardDescription className="text-black ">
                                <div className="flex justify-between space-y-1"><span >Median Unit Rental:</span><span>{formatRentalValue(latestDataRentals?.Median_Unit, "week")}</span></div>
                                <div className="flex justify-between space-y-1"><span >Median House Rental:</span><span>{formatRentalValue(latestDataRentals?.Median_House, "week")}</span></div>
                            </CardDescription>
                        </CardHeader>

                    </Card>
                </div>
            </div>
        </div>
    );
}

export default HomeContainer;