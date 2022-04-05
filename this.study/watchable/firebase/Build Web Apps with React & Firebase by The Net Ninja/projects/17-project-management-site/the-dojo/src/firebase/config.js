import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYFdAn4Ob1r1Ht9G0WANKwTWVGrZ1oacM",
  authDomain: "the-dojo-25563.firebaseapp.com",
  projectId: "the-dojo-25563",
  storageBucket: "the-dojo-25563.appspot.com",
  messagingSenderId: "63525327390",
  appId: "1:63525327390:web:58aa78fb49537d01a9540f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
