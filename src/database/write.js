import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Saves the listing into DB
 * @param {Object} listing
 *   Expects object containing car make, model, year, postal code, img src
 * @returns
 *   ID of the saved listing
 */
export async function saveListingToDB(listing) {
  try {
    const docRef = await addDoc(collection(db, 'car_listings'), listing);
    return docRef.id;
  } catch (error) {
    throw error;
  }
}
