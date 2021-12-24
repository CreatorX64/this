import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFMnxRvjxdxtr_W8IR4hhbXtPH7cFBsjI",
  authDomain: "mymoney-5860e.firebaseapp.com",
  projectId: "mymoney-5860e",
  storageBucket: "mymoney-5860e.appspot.com",
  messagingSenderId: "946180685059",
  appId: "1:946180685059:web:0bae240b5defce29627d36"
};

// Init Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Init Firebase services
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
