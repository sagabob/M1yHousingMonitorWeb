import type { Benchmark } from "@/page-data/types/Lga";
import type { TotalMedianPrice } from "../schemas/medianPriceSchema";
import { getLatestPeriod } from "./core-utils";
import type { ListingType } from "../api/listingService";

export function getLatestDataRentals(data: TotalMedianPrice) {
    return getLatestPeriod(data.Rentals.Periods);
}

export function getLatestDataSales(data: TotalMedianPrice) {
    return getLatestPeriod(data.Sales.Periods);
}
// Assuming periods are ordered chronologically (latest first)
const melbourne: Benchmark = {
    code: "2GMEL",
    name: "Greater Melbourne",
}
export function getBenchMark() {
    return melbourne;
}


export function getLatestRentalData(data: ListingType[]) 
{
    return data.filter(item => item.listingtype === "Rentals");
}

export function getLatestSalesData(data: ListingType[]) 
{
    return data.filter(item => item.listingtype === "Sales");
}