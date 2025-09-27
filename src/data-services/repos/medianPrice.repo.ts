import { db } from "../db-sources/firebase";
import { doc, getDoc } from "firebase/firestore";
import { makeZodConverter } from "../schemas/zodFirestore";
import { TotalMedianPriceZ, type TotalMedianPrice } from "../schemas/medianPriceSchema";
import { COLLECTIONS, ERROR_MESSAGES } from "../config/constants";

const totalMedianPriceConverter = makeZodConverter(TotalMedianPriceZ);

export async function getTotalMedianPriceById(
  lgacode: string,
  opts: { throwIfMissing?: boolean } = {}
) {
  try {
    const documentId = lgacode.startsWith("LGA") ? lgacode : `LGA${lgacode}`;

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
    // (Optional) If you want TypeScript to assert compatibility with your hand-written type:
    const typed: TotalMedianPrice = data; // should compile if shapes match
    return typed;
  } catch (error) {
    console.error(`❌ Error fetching median price data for LGA ${lgacode}:`, error);
    throw error;
  }
}
