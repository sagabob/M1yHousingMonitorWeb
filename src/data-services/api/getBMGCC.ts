import { z } from "zod";

const BmGCCZ = z.object({
  GCC_Code: z.string(),
  GCC_Name: z.string(),
}).strip();

export type BmGCC = z.infer<typeof BmGCCZ>;

export async function getBMGCC(lgacode: string) {

  try {
    const response = await fetch(`/api/client-info?lgacode=${lgacode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch BM GCC data: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);

    // Extract data array from response
    const data = responseData.data;

    // Check if data is an array and not empty
    if (!Array.isArray(data)) {
      throw new Error(`getBMGCC: API returned non-array data for LGA_CODE ${lgacode}`);
    }

    if (data.length === 0) {
      throw new Error(`getBMGCC: API returned empty array for given LGA_CODE ${lgacode}`);
    }

    // Parse the first element
    const typed: BmGCC = BmGCCZ.parse(data[0]);
    return typed;
  } catch (error) {
    console.error(`❌ Error fetching BM GCC data for LGA ${lgacode}:`, error);
    throw error;
  }

}


