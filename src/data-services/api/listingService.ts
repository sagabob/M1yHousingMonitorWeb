import { z } from "zod";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
console.log(API_KEY)

// Define the schema for the listing data
const ListingTypeZ = z.object({
    code: z.string(),
    listingtype: z.enum(["Rentals", "Sales"]),
    propertytype: z.enum(["Unit", "House"]),
    median: z.number(),
    period: z.string()
}).strip();

// Derive TypeScript type from Zod schema
export type ListingType = z.infer<typeof ListingTypeZ>;


// API service functions
export async function getListingTypesByCode(code: string) {
    try {
        const url = new URL(`${SUPABASE_URL}/v_latest_listingtypes`);

        // Add query parameters
        url.searchParams.set('code', `eq.${code}`);

        console.log(`🔍 Fetching listing types from: ${url.toString()}`);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'apikey': API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ Successfully fetched ${data.length} listing types`);

        // Validate and transform data using Zod
        const validatedData = z.array(ListingTypeZ).parse(data);
        return validatedData;
    } catch (error) {
        console.error(`❌ Error fetching listing types:`, error);
        throw error;
    }
}


