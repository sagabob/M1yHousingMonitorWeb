import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { makeZodConverter } from "../utils/zodFirestore";
import { TotalMedianPriceZ, type TotalMedianPrice } from "../utils/medianPriceSchema";
import { COLLECTIONS, ERROR_MESSAGES } from "../utils/constants";

const totalMedianPriceConverter = makeZodConverter(TotalMedianPriceZ);

export async function getTotalMedianPriceById(
  lgacode: string,
  opts: { throwIfMissing?: boolean } = {}
) {
  try {
    const documentId = lgacode.startsWith("LGA") ? lgacode : `LGA${lgacode}`;
    console.log(`🔍 Fetching median price data for LGA: ${lgacode} (Document ID: ${documentId})`);
    
    const ref = doc(db, COLLECTIONS.PRICES_INCOMES_MEDIANS, documentId).withConverter(totalMedianPriceConverter);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.warn(`⚠️ Document not found: PricesIncomesMedians/${documentId}`);
      if (opts.throwIfMissing) {
        throw new Error(ERROR_MESSAGES.DOCUMENT_NOT_FOUND(documentId));
      }
      return null;
    }

    // `snap.data()` is now parsed, stripped, and defaults applied
    const data = snap.data();
    console.log(`✅ Successfully fetched data for LGA ${lgacode}:`, {
      hasRentals: !!data.Rentals,
      hasSales: !!data.Sales,
      rentalPeriods: data.Rentals?.Periods?.length || 0,
      salesPeriods: data.Sales?.Periods?.length || 0
    });

    // (Optional) If you want TypeScript to assert compatibility with your hand-written type:
    const typed: TotalMedianPrice = data; // should compile if shapes match
    return typed;
  } catch (error) {
    console.error(`❌ Error fetching median price data for LGA ${lgacode}:`, error);
    throw error;
  }
}
