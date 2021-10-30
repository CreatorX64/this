// CRUD: Create, Read, Update, Delete.

import { MongoClient, ObjectId } from "mongodb";

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id);
// console.log(id.id.length); // 12 (bytes)
// console.log(id.toHexString().length); // 24 (bytes)

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
  //       description: "Cook dinner",
  //       completed: false
  //     },
  //     {
  //       description: "Create banner for Twitter account",
  //       completed: true
  //     },
  //     {
  //       description: "Finish pending courses",
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
  //   console.log(user);
  // });

  // db.collection("users").findOne(
  //   { _id: new ObjectId("617d58b5cf378ee69bce12b2") },
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
  //   { _id: new ObjectId("617d537412e6d2bfcb79027f") },
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

  //-- Update

  // db.collection("users")
  //   .updateOne(
  //     { _id: new ObjectId("617d513bce9fa411aaf87f12") },
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
  //     { _id: new ObjectId("617d513bce9fa411aaf87f12") },
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

  // db.collection("tasks")
  //   .deleteOne({ description: "Cook dinner" })
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));
});
