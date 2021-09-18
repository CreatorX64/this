import { initializeApp } from "firebase/app";
import {
  get,
  getDatabase,
  off,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  ref,
  remove,
  push,
  set,
  update
} from "firebase/database";

const config = {
  apiKey: "AIzaSyDuB5H3UwXRnFefabbsaQGSYfDjnNbqRbk",
  authDomain: "expensify-deaf1.firebaseapp.com",
  databaseURL: "https://expensify-deaf1-default-rtdb.firebaseio.com",
  projectId: "expensify-deaf1",
  storageBucket: "expensify-deaf1.appspot.com",
  messagingSenderId: "710634713996",
  appId: "1:710634713996:web:6980daf90814fa3f141ca9"
};

initializeApp(config);

const database = getDatabase();

onChildRemoved(ref(database, "expenses"), (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

onChildChanged(ref(database, "expenses"), (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

onChildAdded(ref(database, "expenses"), (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// get(ref(database, "expenses")).then((snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       ...childSnapshot.val(),
//       id: childSnapshot.key
//     });
//   });
//   console.log(expenses);
// });

// onValue(ref(database, "expenses"), (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       ...childSnapshot.val(),
//       id: childSnapshot.key
//     });
//   });
//   console.log(expenses);
// });

// push(ref(database, "expenses"), {
//   description: "Rent",
//   note: "",
//   amount: 109500,
//   createdAt: 976123498763
// });

// remove(ref(database, "notes/-MjuL_q7T7X5RpKsWuuH"));
// update(ref(database, "notes/-MjuL_q7T7X5RpKsWuuH"), {
//   body: "Buy food"
// });

// push(ref(database, "notes"), {
//   title: "Course Topics",
//   body: "React Native, Angular, Python"
// });

// const notes = [
//   {
//     id: "12",
//     title: "First note!",
//     body: "This is my note"
//   },
//   {
//     id: "761ase",
//     title: "Another note",
//     body: "This is my note"
//   }
// ];

// set(ref(database, "notes"), notes);

// onValue(ref(database), (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

// get(ref(database, "location/city"))
//   .then((snapshot) => {
//     console.log(snapshot.val());
//   })
//   .catch((error) => {
//     console.log("Error fetching data", error);
//   });

// set(ref(database), {
//   name: "Hakan Güçlü",
//   age: 26,
//   stressLevel: 6,
//   job: {
//     title: "Software Developer",
//     company: "Google"
//   },
//   isSingle: false,
//   location: {
//     city: "Istanbul",
//     country: "Turkey"
//   }
// })
//   .then(() => {
//     console.log("Data is saved");
//   })
//   .catch((e) => {
//     console.log("This failed.", e);
//   });

// remove(ref(database, "isSingle"))
//   .then(() => {
//     console.log("Data was removed.");
//   })
//   .catch((e) => {
//     console.log("Did not remove data", e);
//   });

// update(ref(database), {
//   stressLevel: 9,
//   "job/company": "Amazon",
//   "location/city": "Seattle"
// });
