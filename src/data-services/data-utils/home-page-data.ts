import type { TotalMedianPrice } from "../schemas/medianPriceSchema";
import { getLatestPeriod } from "./core-utils";
import type { ListingType } from "../api/getHomePageData";

export function getLatestDataRentals(data: TotalMedianPrice) {
    return getLatestPeriod(data.Rentals.Periods);
}

export function getLatestDataSales(data: TotalMedianPrice) {
    return getLatestPeriod(data.Sales.Periods);
}
// Assuming periods are ordered chronologically (latest first)

export function getLatestRentalData(data: ListingType[]) 
{
    return data.filter(item => item.listingtype === "Rentals");
}

export function getLatestSalesData(data: ListingType[]) 
{
    return data.filter(item => item.listingtype === "Sales");
}