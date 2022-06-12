import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

const fbConfig = {
  apiKey: "AIzaSyBmy16eDZqkBV1Dbg5XMMHK0KMxhtoGO70",
  authDomain: "mymoney-26703.firebaseapp.com",
  projectId: "mymoney-26703",
  storageBucket: "mymoney-26703.appspot.com",
  messagingSenderId: "693441411470",
  appId: "1:693441411470:web:1e2fb1e7f2228c54190cdf"
};

const fbApp = initializeApp(fbConfig);

export const fbAuth = getAuth(fbApp);
export const fbFirestore = getFirestore(fbApp);

export const fbTimestamp = Timestamp;
