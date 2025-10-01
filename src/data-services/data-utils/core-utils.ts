import type { Lga } from "@/page-data/types/Lga";
import type { SingleMedianPrice } from "../schemas/medianPriceSchema";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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


export function formatRentalValue(value: number | null | undefined, cycle: string) {
    if (value === null || value === undefined) return 'N/A';
    return '$' + value.toFixed(0) + "/" + cycle;
}

export function formatSaleValue(value: number | null | undefined) {
    if (value === null || value === undefined) return 'N/A';
    //format with comma after 3 digits such as 300000 -> $300,000
    return '$' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function formatLgaCode(lga: Lga | null | undefined) {
    if (!lga?.id) return 'N/A';
    return lga.id.startsWith("LGA") ? lga.id : `LGA${lga.id}`;
}
export function formatNumber(value: number | null | undefined, digits: number = 0) {
    if (value === null || value === undefined) return 'N/A';
    return value.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumberWithSign(value: number | null | undefined, digits: number = 0) {
    if (value === null || value === undefined) return '+' + '0'.repeat(digits);

    if (value >= 0) {
        return "+" + value.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return value.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


//format date such as Dec-24 to Dec 2024
export function formatDate(date: string | null | undefined) {
    if (date === null || date === undefined) return 'N/A';
    // Handle short year like "Dec-24" → "Dec 2024"
    const shortYearMatch = /^([A-Za-z]{3})-(\d{2})$/;
    const m = typeof date === 'string' ? date.match(shortYearMatch) : null;
    if (m) {
        const mon = m[1];
        const yy = parseInt(m[2], 10);
        // Assume 2000-based two‑digit years
        const yyyy = 2000 + yy;
        return `${dayjs(`${mon} ${yyyy}`, ["MMM YYYY"], true).format("MMM YYYY")}`;
    }
    // Support multiple incoming formats, e.g. "Jun 2024", "Jun-2024", "2024-06"
    const knownFormats = ["MMM YYYY", "MMM-YYYY", "MMM-YY", "YYYY-MM", "YYYY/MM", "YYYY"] as const;
    const parsed = dayjs(date, knownFormats as unknown as string[], true);
    if (!parsed.isValid()) return date; // fallback to raw string if unparseable
    return parsed.format("MMM YYYY");
}

export function formatPercentage(value: number | null | undefined, digits: number = 2) {
    if (value === null || value === undefined) return 'N/A';
    return value.toFixed(digits) + "%";
}


