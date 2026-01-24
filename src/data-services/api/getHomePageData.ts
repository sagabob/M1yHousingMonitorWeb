import { z } from "zod";
import { fetchAPI } from "../utils/api-client";

const ListingTypeZ = z.object({
  GCCSA_Code: z.string(),
  Listing_Type: z.enum(["Rentals", "Sales"]),
  Property_Type: z.enum(["Unit", "House", "Dwelling"]),
  Median: z.number(),
  Period: z.string()
}).strip();

export type ListingType = z.infer<typeof ListingTypeZ>;

const homeDataSummaryZ = z.object({
  LGA_Code: z.string(),
  Household_type_need: z.string(),
  Household_type_need_number: z.number(),
  Population: z.number(),
  Population_growth_rate_annual: z.number(),
  Population_time_period: z.string(),
  Average_household_size: z.number(),
  Average_household_size_change: z.number().nullable(),
  Average_household_size_benchmark: z.number(),
  Average_household_size_benchmark_change: z.number().nullable(),
  Dominant_dwelling_type_name: z.string(),
  Dominant_dwelling_type_per: z.number().nullable(),
  Emerging_dwelling_type_name: z.string(),
  Emerging_dwelling_type_change: z.number().nullable(),
}).strip();

export type HomeDataSummary = z.infer<typeof homeDataSummaryZ>;

export interface HousingDataResponse {
  listing_types: ListingType[];
  home_summary: HomeDataSummary[];
  timestamp: string;
  error?: string;
}

// Fetch housing data from edge function
export async function getHomePageData(
  lgacode: string,
  bmcode: string
): Promise<HousingDataResponse> {
  try {
    const url = new URL("/api/home-page-data-edge", window.location.origin);
    url.searchParams.set("lgacode", lgacode);
    url.searchParams.set("bmcode", bmcode);

    const rawData = await fetchAPI<{
      listingtypes: unknown[];
      home_summary: unknown[];
      timestamp: string;
      error?: string;
    }>(url.toString());

    // Validate and transform data using Zod schemas
    const validatedData: HousingDataResponse = {
      listing_types: z.array(ListingTypeZ).parse(rawData.listingtypes),
      home_summary: z.array(homeDataSummaryZ).parse(rawData.home_summary),
      timestamp: rawData.timestamp,
      error: rawData.error
    };

    return validatedData;
  } catch (error) {
    console.error(`❌ Error fetching housing data for LGA ${lgacode}, BM ${bmcode}:`, error);
    throw error;
  }
}

