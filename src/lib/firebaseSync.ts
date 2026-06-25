import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Client, Booking, Coupon, Review } from '../types';

// Generic fetcher for Firestore collections
export async function fetchCollection<T extends { id: string }>(collectionName: string): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    const items: T[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as T);
    });
    return items;
  } catch (error) {
    console.error(`Error fetching collection "${collectionName}" from Firestore:`, error);
    throw error;
  }
}

// Save or update a document in a collection
export async function saveDocument<T extends { id: string }>(collectionName: string, item: T): Promise<void> {
  try {
    const docRef = doc(db, collectionName, item.id);
    // Remove the id from the saved data to avoid duplication, or keep it. Keeping is safe.
    await setDoc(docRef, item, { merge: true });
    console.log(`Document ${item.id} saved to ${collectionName} successfully.`);
  } catch (error) {
    console.error(`Error saving document ${item.id} to collection "${collectionName}":`, error);
  }
}

// Delete a document from a collection
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log(`Document ${id} deleted from ${collectionName} successfully.`);
  } catch (error) {
    console.error(`Error deleting document ${id} from collection "${collectionName}":`, error);
  }
}

// Bulk seed initial data to Firestore if collection is empty
export async function seedCollectionIfEmpty<T extends { id: string }>(
  collectionName: string, 
  initialData: T[]
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty) {
      console.log(`Seeding initial data for ${collectionName}...`);
      const batch = writeBatch(db);
      initialData.forEach((item) => {
        const docRef = doc(db, collectionName, item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
      console.log(`Seeding for ${collectionName} completed successfully.`);
      return initialData;
    } else {
      const items: T[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as T);
      });
      return items;
    }
  } catch (error) {
    console.warn(`Could not seed or fetch ${collectionName} from Firestore. Defaulting to initial data.`, error);
    return initialData;
  }
}
