import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const fbConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };
const fbConfig = {
  apiKey: "AIzaSyDKDhW2bn_8ne3Ol1imdjt_Q6j4O-i063Y",
  authDomain: "the-dojo-390ef.firebaseapp.com",
  projectId: "the-dojo-390ef",
  storageBucket: "the-dojo-390ef.appspot.com",
  messagingSenderId: "33774602019",
  appId: "1:33774602019:web:d6a7c0843c6ea12db26e96"
};

const fbApp = initializeApp(fbConfig);

export const fbAuth = getAuth(fbApp);
export const fbFirestore = getFirestore(fbApp);
export const fbStorage = getStorage(fbApp);
