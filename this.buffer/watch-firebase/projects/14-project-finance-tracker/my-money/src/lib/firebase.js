import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const fbConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const fbApp = initializeApp(fbConfig);

export const fbAuth = getAuth(fbApp);
export const fbFirestore = getFirestore(fbApp);
