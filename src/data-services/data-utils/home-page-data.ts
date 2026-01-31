import type { TotalMedianPrice } from "@/data-services/schemas/medianPriceSchema";
import { getLatestPeriod } from "@/data-services/data-utils/core-utils";
import type { ListingType } from "@/data-services/client-api/getHomePageData";

export function getLatestDataRentals(data: TotalMedianPrice) {
    return getLatestPeriod(data.Rentals.Periods);
}

export function getLatestDataSales(data: TotalMedianPrice) {
    return getLatestPeriod(data.Sales.Periods);
}
// Assuming periods are ordered chronologically (latest first)

export function getLatestRentalData(data: ListingType[]) {
    return data.filter(item => item.Listing_Type === "Rentals");
}

export function getLatestSalesData(data: ListingType[]) {
    return data.filter(item => item.Listing_Type === "Sales");
}