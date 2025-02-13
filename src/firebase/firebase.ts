// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaGUdulU_Y0q0V6NmGn0Tq6aIYl1nIgHA",
  authDomain: "date-in-latam.firebaseapp.com",
  projectId: "date-in-latam",
  storageBucket: "date-in-latam.firebasestorage.app",
  messagingSenderId: "231574351646",
  appId: "1:231574351646:web:c9c51fbb4bb7e0bf24e30f",
  measurementId: "G-ZCLBSCB749"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)
export default app;