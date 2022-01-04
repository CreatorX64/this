// CRUD: Create, Read, Update, Delete.

import { MongoClient, ObjectId } from "mongodb";

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// MongoDB stores ObjectId as binary data instead of a string. This cuts the
// size of the ObjectId in half.
// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id); // Stored as buffer (binary data)
// console.log(id.id.length); // Size of the binary data: 12 (bytes)
// console.log(id.toHexString().length); // Size of the text represantation: 24 (bytes)

MongoClient.connect(connectionUrl, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database!");
  }

  const db = client.db(databaseName);

  //-- Create

  // db.collection("users").insertOne(
  //   {
  //     // _id: id,
  //     name: "Vikram",
  //     age: 26
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Unable to insert user");
  //     }
  //     console.log(result.insertedId);
  //   }
  // );

  // db.collection("users").insertMany(
  //   [
  //     {
  //       name: "Jen",
  //       age: 28
  //     },
  //     {
  //       name: "Gunther",
  //       age: 27
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Unable to insert documents");
  //     }
  //     console.log(result.insertedIds);
  //   }
  // );

  // db.collection("tasks").insertMany(
  //   [
  //     {
  //       description: "Clean the house",
  //       completed: true
  //     },
  //     {
  //       description: "Renew inspection",
  //       completed: false
  //     },
  //     {
  //       description: "Pot plants",
  //       completed: false
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Unable to insert documents");
  //     }
  //     console.log(result.insertedIds);
  //   }
  // );

  //-- Read

  // db.collection("users").findOne({ name: "Jen", age: 1 }, (error, user) => {
  //   if (error) {
  //     return console.log("Unable to fetch user");
  //   }
  //   console.log(user); // null, if user not found
  // });

  // db.collection("users").findOne(
  //   { _id: new ObjectId("61b1e7e980738293adb99959") },
  //   (error, user) => {
  //     if (error) {
  //       return console.log("Unable to fetch user");
  //     }
  //     console.log(user);
  //   }
  // );

  // db.collection("users")
  //   .find({ age: 27 }) // Returns a cursor, no results yet!
  //   .toArray((error, users) => {
  //     if (error) {
  //       return console.log("Unable to fetch users");
  //     }
  //     console.log(users);
  //   });

  // db.collection("users")
  //   .find({ age: 27 }) // Returns a cursor, no results yet!
  //   .count((error, count) => {
  //     if (error) {
  //       return console.log("Unable to fetch count");
  //     }
  //     console.log(count);
  //   });

  // db.collection("tasks").findOne(
  //   { _id: new ObjectId("61b1dea8f38dbd0203d98f0f") },
  //   (error, task) => {
  //     if (error) {
  //       return console.log("Unable to fetch task");
  //     }
  //     console.log(task);
  //   }
  // );

  // db.collection("tasks")
  //   .find({ completed: false })
  //   .toArray((error, tasks) => {
  //     if (error) {
  //       return console.log("Unable to fetch tasks");
  //     }
  //     console.log(tasks);
  //   });

  //-- Using Promise-based APIs for Create & Read operations

  // db.collection("users")
  //   .insertOne({ name: "Sam", age: 12 })
  //   .then((result) => console.log(result.insertedId))
  //   .catch((error) => console.log("Unable to insert!", error));

  // db.collection("users")
  //   .find({ age: 27 })
  //   .toArray()
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("Unable to fetch!", error));

  //-- Update

  // db.collection("users")
  //   .updateOne(
  //     { _id: new ObjectId("61b1dd65139704dd66585705") },
  //     { $set: { name: "Mike" } }
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // db.collection("users")
  //   .updateOne(
  //     { _id: new ObjectId("61b1dd65139704dd66585705") },
  //     { $inc: { age: 1 } }
  //     // { $inc: { age: -1 } }
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // db.collection("tasks")
  //   .updateMany({ completed: false }, { $set: { completed: true } })
  //   .then((result) => {
  //     console.log(result.modifiedCount);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  //-- Delete

  // db.collection("tasks")
  //   .deleteOne({ description: "Clean the house" })
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  // db.collection("users")
  //   .deleteMany({
  //     age: 27
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
