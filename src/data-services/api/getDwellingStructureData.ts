import { z } from "zod";

const DwellingTypeBedroomsZ = z.object({
    Area_Id: z.string(),
    Area_Name: z.string(),
    Dwelling_Structure: z.string(),
    Bedroom_Number: z.string(),
    Num_2021: z.coerce.number().optional(),
    Per_2021: z.coerce.number().optional(),
    Benchmark_Name: z.string(),
    bNum_2021: z.coerce.number().optional(),
    bPer_2021: z.coerce.number().optional(),
}).passthrough();
export type DwellingTypeBedrooms = z.infer<typeof DwellingTypeBedroomsZ>;

const DwellingStructureZ = z.object({
    Area_Id: z.string().optional(),
    Dwelling_Structure: z.string(),
    Num_2021: z.coerce.number().optional(),
    Per_2021: z.coerce.number().optional(),
    Num_2016: z.coerce.number().optional(),
    Per_2016: z.coerce.number().optional(),
    Num_2011: z.coerce.number().optional(),
    Per_2011: z.coerce.number().optional(),
    Num_2006: z.coerce.number().optional(),
    Per_2006: z.coerce.number().optional()
}).passthrough();

export type DwellingStructure = z.infer<typeof DwellingStructureZ>;

export interface DwellingStructureResponse {
    lga: DwellingStructure[];
    bm: DwellingStructure[];
    type_bedrooms: DwellingTypeBedrooms[];
    timestamp: string;
    error?: string;
}


// Fetch housing data from edge function
export async function getDwellingStructureData(
    lgacode: string,
    bmcode: string
): Promise<DwellingStructureResponse> {
    try {
        const url = new URL("/api/dwelling-structure-data-edge", window.location.origin);

        url.searchParams.set("lgacode", lgacode);
        url.searchParams.set("bmcode", bmcode);

        console.log(`🔍 Fetching housing data via edge function: ${url.toString()}`);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Edge function error: ${response.status} - ${errorData.error || response.statusText}`);
        }

        const rawData = await response.json();
        console.log("DEBUG RAW DATA LGA:", rawData.lga[0]);
        console.log(rawData);
        console.log(`✅ Successfully fetched raw housing data for LGA ${lgacode}, BM ${bmcode}`);

        // Validate and transform data using Zod schemas
        const validatedData: DwellingStructureResponse = {
            lga: z.array(DwellingStructureZ).parse(rawData.lga),
            bm: z.array(DwellingStructureZ).parse(rawData.bm),
            type_bedrooms: z.array(DwellingTypeBedroomsZ).parse(rawData.type_bedrooms),
            timestamp: rawData.timestamp,
            error: rawData.error
        };

        console.log(`✅ Successfully validated housing data: ${validatedData.lga.length} LGA items, ${validatedData.bm.length} BM items`);
        return validatedData;
    } catch (error) {
        console.error(`❌ Error fetching housing data via edge function for LGA ${lgacode}, BM ${bmcode}:`, error);
        throw error;
    }
}
