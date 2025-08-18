import { z } from "zod";

// Optional: accept "1234" -> 1234, ""/null/undefined -> null
const numOrNull = z.preprocess((v) => {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/,/g, "")); // tolerate commas
    return Number.isFinite(n) ? n : null;
  }
  return null;
}, z.number().nullable());

export const SingleMedianPriceZ = z.object({
  Median_Unit: numOrNull,                 // or: z.number().nullable()
  Period_Name: z.string().default(""),
  Median_House: numOrNull,                // or: z.number().nullable()
}).strip();

export const MedianPricePeriodZ = z.object({
  Periods: z.array(SingleMedianPriceZ).default([]),
}).strip();

export const TotalMedianPriceZ = z.object({
  Rentals: MedianPricePeriodZ,
  Sales:   MedianPricePeriodZ,
}).strip();

// If you want to derive the TS type from Zod (recommended):
export type TotalMedianPriceZod = z.infer<typeof TotalMedianPriceZ>;
