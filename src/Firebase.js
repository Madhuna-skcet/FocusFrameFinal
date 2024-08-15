// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr85NUUs1a3Yhd-Cz_5Y5wbNSXA6LFoUY",
  authDomain: "ecommerce-ca5cf.firebaseapp.com",
  projectId: "ecommerce-ca5cf",
  storageBucket: "ecommerce-ca5cf.appspot.com",
  messagingSenderId: "188228955330",
  appId: "1:188228955330:web:48b347ab362b7dc971df5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
