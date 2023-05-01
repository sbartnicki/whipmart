import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './config';
import uuid from 'react-uuid';
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

/**
 * Uploads an image to Storage
 * @param {Object} image
 *   Expect an image object from the file input
 * @returns
 *   URL that allows to access uploaded image
 */
export async function uploadImage(image) {
  try {
    const storageRef = ref(storage, uuid() + '--' + image.name);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    throw error;
  }
}
