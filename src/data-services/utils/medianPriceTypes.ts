interface SingleMedianPrice {
    Median_Unit: number | null;
    Period_Name: string;
    Median_House: number | null;

}

interface MedianPricePeriod {
    Periods: Array<SingleMedianPrice>;
}

interface TotalMedianPrice {
    Rentals: MedianPricePeriod;
    Sales: MedianPricePeriod;
}

export type { SingleMedianPrice, MedianPricePeriod, TotalMedianPrice };