import { doc, getDoc } from 'firebase/firestore';
import { getFirestoreDb } from './database';

export interface FirebaseDocument {
  id: string;
  data: any;
  exists: boolean;
}

export const getFirebaseDocument = async (
  collection: string, 
  documentId: string
): Promise<FirebaseDocument> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, collection, documentId);
    const docSnap = await getDoc(docRef);

    return {
      id: documentId,
      data: docSnap.exists() ? docSnap.data() : null,
      exists: docSnap.exists()
    };
  } catch (error) {
    console.error(`❌ Error fetching Firebase document ${collection}/${documentId}:`, error);
    throw error;
  }
};

export const getLgaData = async (lgacode: string, collection: string = 'PricesIncomesMedians') => {
  const documentId = lgacode.startsWith('LGA') ? lgacode : `LGA${lgacode}`;
  
  console.log(`🔍 Fetching LGA data: ${lgacode} (Document ID: ${documentId})`);
  
  const result = await getFirebaseDocument(collection, documentId);
  
  if (!result.exists) {
    console.warn(`⚠️ LGA document not found: ${documentId}`);
  } else {
    console.log(`✅ Successfully fetched LGA data for ${lgacode}`);
  }
  
  return {
    ...result,
    lgacode,
    collection
  };
};