import { initializeApp, getApps, getApp,type FirebaseOptions  } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Validate environment variables
const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Check if all required environment variables are present
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: VITE_FIREBASE_${key.toUpperCase()}`);
  }
});

const config: FirebaseOptions = {
  apiKey: requiredEnvVars.apiKey as string,
  authDomain: requiredEnvVars.authDomain as string,
  projectId: requiredEnvVars.projectId as string,
};

export const app = getApps().length ? getApp() : initializeApp(config);
export const db = getFirestore(app);