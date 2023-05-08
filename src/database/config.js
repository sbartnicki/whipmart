import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAmsP84AF6CopgMtKNMV4v6dFgNvjntUXI',
  authDomain: 'js4-finalproject-eef0c.firebaseapp.com',
  projectId: 'js4-finalproject-eef0c',
  storageBucket: 'js4-finalproject-eef0c.appspot.com',
  messagingSenderId: '828983189073',
  appId: '1:828983189073:web:97442e350c28ef1cbbe270',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
