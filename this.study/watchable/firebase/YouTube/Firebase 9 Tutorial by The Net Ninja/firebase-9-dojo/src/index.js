import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import "../styles/global.css";

//-- Setup Firebase app & Firebase services

const firebaseConfig = {
  apiKey: "AIzaSyAoFi67O8AkGUUBWQCBumNsOGlBkbFudJw",
  authDomain: "fir-9-dojo-ddef2.firebaseapp.com",
  projectId: "fir-9-dojo-ddef2",
  storageBucket: "fir-9-dojo-ddef2.appspot.com",
  messagingSenderId: "982579633909",
  appId: "1:982579633909:web:9c1f01897f9f700d002fbc"
};

// Init Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Init services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Collection ref
const collRef = collection(db, "books");

// Queries

// const q = query(collRef, where("author", "==", "patrick rothfuss"));

const q = query(
  collRef,
  // where("author", "==", "patrick rothfuss"),
  // orderBy("title", "desc")
  orderBy("createdAt") // by default "asc"
);

/*
//-- Get collection data (i.e. documents)

getDocs(collRef)
  .then((snapshot) => {
    let books = [];

    snapshot.docs.forEach((doc) => {
      books.push({
        ...doc.data(),
        id: doc.id
      });
    });

    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
*/

//-- Get real-time collection data (subscribe to changes)

// Get all data in the collection
// onSnapshot(collRef, (snapshot) => {
// Get data by query
const unsubColl = onSnapshot(q, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((doc) => {
    books.push({
      ...doc.data(),
      id: doc.id
    });
  });

  console.log(books);
});

//-- Adding documents

const addBookForm = document.querySelector(".add");

addBookForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  addDoc(collRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addBookForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//-- Deleting documents

const deleteBookForm = document.querySelector(".delete");

deleteBookForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//-- Get a single document

const docRef = doc(db, "books", "FSHIt4hGXR4qXd2rc7LJ");

// Get document once
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

// Get document and subscribe to changes
const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

//-- Updating a document

const updateForm = document.querySelector(".update");

updateForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title"
  })
    .then(() => {
      updateForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//-- Sign users up

const signupForm = document.querySelector(".signup");

signupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User created:", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//-- Login and logout

const logoutButton = document.querySelector(".logout");

logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // console.log("User signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const loginForm = document.querySelector(".login");

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("User logged in:", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//-- Subscribe to auth changes

const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("User status changed:", user);
});

//-- Unsubscribe from db/auth changes

const unsubButton = document.querySelector(".unsub");

unsubButton.addEventListener("click", () => {
  console.log("Unsubscribing...");
  unsubColl();
  unsubDoc();
  unsubAuth();
  console.log("Done!");
});
