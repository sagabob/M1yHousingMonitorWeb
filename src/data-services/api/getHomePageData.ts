import { z } from "zod";

const ListingTypeZ = z.object({
  code: z.string(),
  listingtype: z.enum(["Rentals", "Sales"]),
  propertytype: z.enum(["Unit", "House"]),
  median: z.number(),
  period_time: z.string()
}).strip();

export type ListingType = z.infer<typeof ListingTypeZ>;

const homeDataSummaryZ = z.object({
  LGA_CODE: z.string(),
  Household_type_need: z.string(),
  Household_type_need_number: z.number(),
  Population: z.number(),
  Population_growth_rate_annual: z.number(),
  Population_time_period: z.string(),
  Average_household_size: z.number(),
  Average_household_size_change: z.number(),
  Average_household_size_benchmark: z.number(),
  Average_household_size_benchmark_change: z.number(),
  Dominant_dwelling_type_name: z.string(),
  Dominant_dwelling_type_per: z.number(),
  Emerging_dwelling_type_name: z.string(),
  Emerging_dwelling_type_change: z.number(),
}).strip();

export type HomeDataSummary = z.infer<typeof homeDataSummaryZ>;

export interface HousingDataResponse {
  supabase_listingtypes: ListingType[];
  supabase_home_summary: HomeDataSummary[];
  timestamp: string;
  error?: string;
}

export interface HousingDataParams {
  lgacode: string;
  bmcode: string;
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

    console.log(`🔍 Fetching housing data via edge function: ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Edge function error: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const rawData = await response.json();
    console.log(`✅ Successfully fetched raw housing data for LGA ${lgacode}, BM ${bmcode}`);

    // Validate and transform data using Zod schemas
    const validatedData: HousingDataResponse = {
      supabase_listingtypes: z.array(ListingTypeZ).parse(rawData.supabase_listingtypes),
      supabase_home_summary: z.array(homeDataSummaryZ).parse(rawData.supabase_home_summary),
      timestamp: rawData.timestamp,
      error: rawData.error
    };

    console.log(`✅ Successfully validated housing data: ${validatedData.supabase_listingtypes.length} listing types, ${validatedData.supabase_home_summary.length}`);

    return validatedData;
  } catch (error) {
    console.error(`❌ Error fetching housing data via edge function for LGA ${lgacode}, BM ${bmcode}:`, error);
    throw error;
  }
}

