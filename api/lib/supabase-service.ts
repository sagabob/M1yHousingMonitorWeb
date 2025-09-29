import { getSupabaseClient } from './database';

export interface SupabaseQueryResult<T = any> {
  data: T[] | null;
  error: any;
  count?: number;
}


export const getHomePageDataSummary = async (lgacode: string, limit: number = 100): Promise<SupabaseQueryResult> => {
  try {
    const supabase = getSupabaseClient();
    
    console.log(`🔍 Fetching home data summary for LGA: ${lgacode}`);
    
    const { data, error, count } = await supabase
      .from('v_home_data_summary')
      .select('*')
      .eq('LGA_CODE', lgacode)
      .limit(limit);

    if (error) {
      console.error('❌ Supabase error:', error);
      return { data: null, error, count: 0 };
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} home data summary records`);
    
    return { data, error: null, count: data?.length || 0 };
  } catch (error) {
    console.error(`❌ Error fetching home data summary for LGA ${lgacode}:`, error);
    throw error;
  }
};

export const getLatestListingTypesV1 = async (code: string, limit: number = 50): Promise<SupabaseQueryResult> => {
  try {
    const supabase = getSupabaseClient();
    
    console.log(`🔍 Fetching latest listing types v1 for code: ${code}`);
    
    const { data, error, count } = await supabase
      .from('v_latest_listingtypes_v1')
      .select('*')
      .eq('code', code)
      .limit(limit);

    if (error) {
      console.error('❌ Supabase error:', error);
      return { data: null, error, count: 0 };
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} latest listing types v1`);
    
    return { data, error: null, count: data?.length || 0 };
  } catch (error) {
    console.error(`❌ Error fetching latest listing types v1 for code ${code}:`, error);
    throw error;
  }
};