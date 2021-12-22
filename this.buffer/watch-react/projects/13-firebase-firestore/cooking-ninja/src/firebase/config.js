import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyC34osXl7E5Po6EK93U6sBmK65F6aY5N-0",
  authDomain: "cooking-ninja-site-95f4c.firebaseapp.com",
  projectId: "cooking-ninja-site-95f4c",
  storageBucket: "cooking-ninja-site-95f4c.appspot.com",
  messagingSenderId: "371124626226",
  appId: "1:371124626226:web:a90b249346d486bd1b6d2b"
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase services
export const db = getFirestore(app);
