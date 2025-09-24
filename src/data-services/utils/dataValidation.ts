import type { TotalMedianPrice } from "./medianPriceSchema";

/**
 * Validates if the median price data has meaningful content
 */
export function hasValidData(data: TotalMedianPrice | null | undefined): boolean {
  if (!data) return false;
  
  const hasRentals = data.Rentals?.Periods?.length > 0;
  const hasSales = data.Sales?.Periods?.length > 0;
  
  return hasRentals || hasSales;
}

/**
 * Gets the latest period data for rentals or sales
 */
export function getLatestPeriod(
  data: TotalMedianPrice | null | undefined,
  type: 'rentals' | 'sales'
) {
  if (!data) return null;
  
  const periods = type === 'rentals' 
    ? data.Rentals?.Periods 
    : data.Sales?.Periods;
    
  if (!periods || periods.length === 0) return null;
  
  // Assuming periods are ordered chronologically (latest first)
  return periods[0];
}

/**
 * Calculates basic statistics for a period array
 */
export function calculatePeriodStats(periods: any[]) {
  if (!periods || periods.length === 0) {
    return { count: 0, latestPeriod: null, hasData: false };
  }
  
  const validPeriods = periods.filter(p => 
    p.Median_Unit !== null || p.Median_House !== null
  );
  
  return {
    count: validPeriods.length,
    latestPeriod: periods[0]?.Period_Name || null,
    hasData: validPeriods.length > 0,
    totalPeriods: periods.length
  };
}

/**
 * Gets summary statistics for both rentals and sales
 */
export function getDataSummary(data: TotalMedianPrice | null | undefined) {
  if (!data) {
    return {
      hasData: false,
      rentals: { count: 0, hasData: false },
      sales: { count: 0, hasData: false }
    };
  }
  
  return {
    hasData: hasValidData(data),
    rentals: calculatePeriodStats(data.Rentals?.Periods || []),
    sales: calculatePeriodStats(data.Sales?.Periods || [])
  };
}