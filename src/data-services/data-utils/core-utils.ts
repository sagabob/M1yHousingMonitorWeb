import type { SingleMedianPrice } from "../schemas/medianPriceSchema";
import dayjs from "dayjs";

export function getLatestPeriod(periods: SingleMedianPrice[]) {
    if (!periods || periods.length === 0) return null;

    //sort the periods by date
    //field Period_Name has format "Dec 2020"
    const sortedDesc = [...periods].sort(
        (a, b) =>
            dayjs(b.Period_Name, "MMM YYYY").toDate().getTime() -
            dayjs(a.Period_Name, "MMM YYYY").toDate().getTime()
    );
    sortedDesc.map(d => d.Period_Name)
    return sortedDesc[0];
}


export function formatRentalValue(value: number|null|undefined, cycle: string) {
    if (value === null || value === undefined) return 'N/A';
    return '$' + value.toFixed(0) + "/" + cycle;
}

export function formatSaleValue(value: number|null|undefined) {
    if (value === null || value === undefined) return 'N/A';
    //format with comma after 3 digits such as 300000 -> $300,000
    return '$' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
