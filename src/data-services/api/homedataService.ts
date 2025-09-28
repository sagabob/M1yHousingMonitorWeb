import z from "zod";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

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
})

export type HomeDataSummary = z.infer<typeof homeDataSummaryZ>;

export async function getHomeDataSummary(lgaCode: string) {
    try {
        const url = new URL(`${SUPABASE_URL}/v_latest_homedata_v1`);
        url.searchParams.set('lga_code', lgaCode);

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

        const validatedData = z.array(homeDataSummaryZ).parse(data);
        return validatedData;
    } catch (error) {
        console.error(`❌ Error fetching listing types:`, error);
        throw error;
    }
}