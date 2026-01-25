import { db } from "@/data-services/db-sources/firebase";
import { query, collection, where, documentId, getDocs } from "firebase/firestore";
import { chunk } from "lodash";
import { makeZodConverter } from "@/data-services/schemas/zodFirestore";
import { COLLECTIONS } from "@/data-services/config/constants";
import { ApprovalsPerQuarterZ, type ApprovalsPerQuarter } from "../schemas/approvalsPerQuarterSchema";

const approvalsPerQuarterConverter = makeZodConverter(ApprovalsPerQuarterZ);

/**
 * Fetches multiple median price documents by ID.
 * Handles the Firestore constraint of max 30 items per 'IN' query by chunking requests.
 */
export async function getApprovalsPerQuarterByIds(ids: string[]) {
    if (ids.length === 0) return [];

    try {
        // Firestore 'in' query limit is 30
        const idChunks = chunk(ids, 30);

        const promises = idChunks.map(async (chunk) => {
            const q = query(
                collection(db, COLLECTIONS.APPROVALS_PER_QUARTER),
                where(documentId(), 'in', chunk)
            ).withConverter(approvalsPerQuarterConverter);

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({
                sa1: doc.id,
                data: doc.data() as ApprovalsPerQuarter
            }));
        });

        const results = await Promise.all(promises);
        return results.flat();

    } catch (error) {
        console.error(`❌ Error fetching multiple approval documents:`, error);
        throw error;
    }
}
