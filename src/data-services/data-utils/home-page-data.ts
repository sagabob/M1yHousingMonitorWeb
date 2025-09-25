import type { TotalMedianPrice } from "../schemas/medianPriceSchema";
import { getLatestPeriod } from "./core-utils";

export function getLatestDataRentals(data: TotalMedianPrice) {
    return getLatestPeriod(data.Rentals.Periods);
}

export function getLatestDataSales(data: TotalMedianPrice) {
    return getLatestPeriod(data.Sales.Periods);
}
// Assuming periods are ordered chronologically (latest first)


