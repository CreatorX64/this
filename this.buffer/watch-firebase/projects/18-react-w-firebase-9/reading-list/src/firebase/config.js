import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRNoTYlrrYDl9wX-_Kxu38CDYx_Iz-Kck",
  authDomain: "reading-list-app-1dfb9.firebaseapp.com",
  projectId: "reading-list-app-1dfb9",
  storageBucket: "reading-list-app-1dfb9.appspot.com",
  messagingSenderId: "880812536775",
  appId: "1:880812536775:web:a6c31a133c2c1409ed1fe2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
