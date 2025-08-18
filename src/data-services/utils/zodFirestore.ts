import type { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";
import type { z } from "zod";

export function makeZodConverter<T>(schema: z.ZodType<T>): FirestoreDataConverter<T> {
  return {
    toFirestore: (v: T) => v as any,
    fromFirestore: (snap: QueryDocumentSnapshot): T => {
      const parsed = schema.safeParse(snap.data());
      if (!parsed.success) {
        // Choose: throw (strict) or return a minimal fallback
        throw new Error("Invalid Firestore document: " + parsed.error.message);
      }
      return parsed.data;
    },
  };
}
