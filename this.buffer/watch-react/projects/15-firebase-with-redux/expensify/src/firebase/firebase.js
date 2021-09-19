import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyDuB5H3UwXRnFefabbsaQGSYfDjnNbqRbk",
  authDomain: "expensify-deaf1.firebaseapp.com",
  databaseURL: "https://expensify-deaf1-default-rtdb.firebaseio.com",
  projectId: "expensify-deaf1",
  storageBucket: "expensify-deaf1.appspot.com",
  messagingSenderId: "710634713996",
  appId: "1:710634713996:web:6980daf90814fa3f141ca9"
};

const app = initializeApp(config);

export const db = getDatabase();
