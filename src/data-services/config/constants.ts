// Firebase collection names
export const COLLECTIONS = {
  PRICES_INCOMES_MEDIANS: 'PricesIncomesMedians',
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  MEDIAN_PRICE: 'medianPrice',
  MEDIAN_PRICE_BY_LGA: (lgacode: string) => ['medianPrice', lgacode],
  LISTING_TYPES_BY_CODE: (code: string) => ['listingTypes', 'byCode', code],

} as const;

// Cache times (in milliseconds)
export const CACHE_TIMES = {
  MEDIAN_PRICE_STALE: 5 * 60 * 1000, // 5 minutes
  MEDIAN_PRICE_GC: 10 * 60 * 1000,   // 10 minutes
  LISTING_TYPES_STALE: 10 * 60 * 1000, // 10 minutes
  LISTING_TYPES_GC: 30 * 60 * 1000,    // 30 minutes
} as const;

// Error messages
export const ERROR_MESSAGES = {
  DOCUMENT_NOT_FOUND: (documentId: string) => `Document not found: ${documentId}`,
  INVALID_LGA_CODE: 'Invalid LGA code provided',
  FIREBASE_ERROR: 'Firebase operation failed',
  VALIDATION_ERROR: 'Data validation failed',
} as const;