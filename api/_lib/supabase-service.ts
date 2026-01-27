import { getSupabaseClient } from './database';

export interface SupabaseQueryResult<T = any> {
  data: T[] | null;
  error: any;
  count?: number;
}

/**
 * Generic helper to call a Supabase RPC function with standard logging and error handling
 */
const callSupabaseRpc = async <T = any>(
  rpcName: string,
  params: Record<string, any>,
  description: string,
  schemaName: string = 'public'
): Promise<SupabaseQueryResult<T>> => {
  try {
    const supabase = getSupabaseClient();

    console.log(`🔍 Fetching ${description}`);
    console.log(`📋 RPC Function: ${rpcName} (Schema: ${schemaName})`);
    console.log(`📋 Parameters:`, JSON.stringify(params, null, 2));
    console.log(`⏳ Calling Supabase RPC...`);
    // Use the specified schema
    const { data, error } = await supabase.schema(schemaName).rpc(rpcName, params);
    console.log(`⏸️ RPC call completed`);

    if (error) {
      console.error('❌ Supabase RPC error:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      console.error('❌ Function:', rpcName);
      console.error('❌ Schema:', schemaName);
      console.error('❌ Parameters:', JSON.stringify(params, null, 2));
      return { data: null, error, count: 0 };
    }

    // Ensure data is treated as an array for the return type structure
    const dataArray = Array.isArray(data) ? data : (data ? [data] : []);

    if (dataArray.length === 0) {
      console.warn(`⚠️ Warning: ${description} returned empty result`);
      console.warn(`⚠️ Function: ${rpcName}, Schema: ${schemaName}, Parameters:`, JSON.stringify(params, null, 2));
    } else {
      console.log(`✅ Successfully fetched ${description} (${dataArray.length} items)`);
    }

    return { data: dataArray, error: null, count: dataArray.length };
  } catch (error) {
    console.error(`❌ Error fetching ${description}:`, error);
    console.error(`❌ Function: ${rpcName}, Schema: ${schemaName}, Parameters:`, JSON.stringify(params, null, 2));
    throw error;
  }
};

export const getHomePageSummaryByLga = async (lgaCode: string): Promise<SupabaseQueryResult> => {
  return callSupabaseRpc(
    'get_home_page_summary_by_lga',
    { p_lga_code: lgaCode },
    `home page summary via RPC for LGA: ${lgaCode}`,
    'id_housing'
  );
};

export const getLatestListingTypes = async (lgaCode: string): Promise<SupabaseQueryResult> => {
  return callSupabaseRpc(
    'get_latest_rental_and_sales_by_gccsa',
    { p_gccsa_code: lgaCode },
    `latest listing types via RPC for GCCSA: ${lgaCode}`,
    'id_housing'
  );
};

export const getBenchMarkforLga = async (lgaCode: string): Promise<SupabaseQueryResult> => {
  return callSupabaseRpc(
    'get_areas_by_lga_code',
    { p_lga_code: lgaCode },
    `areas by LGA code via RPC: ${lgaCode}`,
    'id_housing'
  );
};


export const getDwellingStructureforLga = async (lgaCode: string): Promise<SupabaseQueryResult> => {
  return callSupabaseRpc(
    'get_dwelling_structure_by_area',
    { p_area_id: lgaCode },
    `dwellings by area via RPC: ${lgaCode}`,
    'id_housing'
  );
};


export const getDwellingTypeBedroomsforLga = async (lgaCode: string): Promise<SupabaseQueryResult> => {
  return callSupabaseRpc(
    'get_dwelling_type_bedrooms_by_area',
    { p_area_id: lgaCode },
    `dwelling type bedrooms by area via RPC: ${lgaCode}`,
    'id_housing'
  );
};

export const getSa1byarea = async (lgaCodeInt: number): Promise<SupabaseQueryResult> => {
  return callSupabaseRpc(
    'get_sa1_by_area',
    { p_area_id: lgaCodeInt },
    `sa1 by area via RPC: ${lgaCodeInt}`,
    'id_housing'
  );
};