import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';

const listingsRef = collection(db, 'car_listings');
/**
 * Loads all the listings from the DB
 */
export async function loadAllListings() {
  try {
    const data = [];
    const querySnapshot = await getDocs(listingsRef);
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Loads car listings from DB based on provided search query
 * @param {Object} search
 *   Expects an object with query parameters
 * @returns
 *   Array with query results
 */
export async function loadQueriedListings(search) {
  //if no search param provided query lists all the cars, since there is no cars older than 1800
  let q = query(listingsRef, where('year', '>', 1800));
  if (search) {
    // Two queries, one with model selected, other without
    if (search.model) {
      q = query(
        listingsRef,
        where('make', '==', search.make),
        where('model', '==', search.model),
        where('year', '>=', search.from),
        where('year', '<=', search.to)
      );
    } else {
      q = query(
        listingsRef,
        where('make', '==', search.make),
        where('year', '>=', search.from),
        where('year', '<=', search.to)
      );
    }
  }

  try {
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  } catch (error) {
    throw error;
  }
}
