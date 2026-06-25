import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyD51tGPZCaHPOAA_dnj_DIQHPAzsZniTlI",
  authDomain: "beauty-ae724.firebaseapp.com",
  databaseURL: "https://beauty-ae724-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beauty-ae724",
  storageBucket: "beauty-ae724.firebasestorage.app",
  messagingSenderId: "432217513680",
  appId: "1:432217513680:web:40396a5dd01b0aa35d88d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);

// Connection test as per the guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connected successfully");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: Client is offline.");
    } else {
      console.warn("Firebase connected with warnings/offline:", error);
    }
  }
}

testConnection();
