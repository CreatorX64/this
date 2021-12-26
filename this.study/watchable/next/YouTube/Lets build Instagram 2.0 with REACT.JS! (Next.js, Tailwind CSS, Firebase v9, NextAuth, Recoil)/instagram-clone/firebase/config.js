import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDHpkWgyTcV0vWS3isRh4ej91VWOlk8Xw",
  authDomain: "instagram-clone-6212d.firebaseapp.com",
  projectId: "instagram-clone-6212d",
  storageBucket: "instagram-clone-6212d.appspot.com",
  messagingSenderId: "940104304897",
  appId: "1:940104304897:web:8619282d1da877a2ddb300"
};

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
