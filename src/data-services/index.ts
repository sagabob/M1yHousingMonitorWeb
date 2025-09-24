// Firebase configuration
export { app, db } from './firebase';

// Hooks
export { useTotalMedianPrice } from './hooks/useMedianPrice';

// Repositories
export { getTotalMedianPriceById } from './repos/medianPrice.repo';

// Types (derived from Zod schemas)
export type { 
  SingleMedianPrice, 
  MedianPricePeriod, 
  TotalMedianPrice 
} from './utils/medianPriceSchema';

// Utilities
export { 
  hasValidData, 
  getLatestPeriod, 
  calculatePeriodStats, 
  getDataSummary 
} from './utils/dataValidation';

// Constants
export { 
  COLLECTIONS, 
  QUERY_KEYS, 
  CACHE_TIMES, 
  ERROR_MESSAGES 
} from './utils/constants';