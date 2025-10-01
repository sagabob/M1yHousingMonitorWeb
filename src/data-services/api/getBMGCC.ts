import { z } from "zod";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!

const BmGCCZ = z.object({
  BM_GCC_Code: z.string(),
  BM_GCC_Name: z.string(),
}).strip();

export type BmGCC = z.infer<typeof BmGCCZ>;

export async function getBMGCC(lgacode: string) {

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/v_areas_2?LGA_CODE=eq.${lgacode}&limit=10`, {
      headers: {
        "apikey": SUPABASE_API_KEY,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch BM GCC data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    //data is array of BmGCC objects
    
    const typed: BmGCC = Array.isArray(data) ? BmGCCZ.parse(data[0]) : BmGCCZ.parse(data); // should compile if shapes match
    return typed;
  } catch (error) {
    console.error(`❌ Error fetching BM GCC data for LGA ${lgacode}:`, error);
    throw error;
  }

}

