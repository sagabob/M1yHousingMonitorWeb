import { db } from "@/data-services/db-sources/firebase";
import { doc, getDoc } from "firebase/firestore";
import { makeZodConverter } from "@/data-services/schemas/zodFirestore";
import { TotalMedianPriceZ, type TotalMedianPrice } from "@/data-services/schemas/medianPriceSchema";
import { COLLECTIONS, ERROR_MESSAGES } from "@/data-services/config/constants";

const totalMedianPriceConverter = makeZodConverter(TotalMedianPriceZ);

export async function getTotalMedianPriceById(
  lgacode: string,
  opts: { throwIfMissing?: boolean } = {}
) {
  try {
    const documentId = lgacode;

    const ref = doc(db, COLLECTIONS.PRICES_INCOMES_MEDIANS, documentId).withConverter(totalMedianPriceConverter);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.warn(`⚠️ Document not found: PricesIncomesMedians/${documentId}`);
      if (opts.throwIfMissing) {
        throw new Error(ERROR_MESSAGES.DOCUMENT_NOT_FOUND(documentId));
      }
      return null;
    }

    // `snap.data()` is executed via the converter which runs schema.safeParse or parse
    // We explicitly cast to TotalMedianPrice to ensure we return the strict Output type
    // (Zod v3 inference can sometimes conflate Input/Output in generics)
    const data = snap.data() as TotalMedianPrice;
    return data;
  } catch (error) {
    console.error(`❌ Error fetching median price data for LGA ${lgacode}:`, error);
    throw error;
  }
}

