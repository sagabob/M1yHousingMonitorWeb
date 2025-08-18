import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { makeZodConverter } from "../utils/zodFirestore";
import { TotalMedianPriceZ } from "../utils/medianPriceSchema";
import type { TotalMedianPrice } from "../utils/medianPriceTypes"; // keep your existing type

const totalMedianPriceConverter = makeZodConverter(TotalMedianPriceZ);

export async function getTotalMedianPriceById(
  lgacode: string,
  opts: { throwIfMissing?: boolean } = {}
) {
  const documentId = lgacode.startsWith("LGA") ? lgacode : `LGA${lgacode}`;
  const ref = doc(db, "PricesIncomesMedians", documentId).withConverter(totalMedianPriceConverter);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    if (opts.throwIfMissing) {
      throw new Error(`PricesIncomesMedians/${documentId} not found`);
    }
    return null;
  }

  // `snap.data()` is now parsed, stripped, and defaults applied
  const data = snap.data();

  // (Optional) If you want TypeScript to assert compatibility with your hand-written type:
  const typed: TotalMedianPrice = data; // should compile if shapes match
  return typed;
}
