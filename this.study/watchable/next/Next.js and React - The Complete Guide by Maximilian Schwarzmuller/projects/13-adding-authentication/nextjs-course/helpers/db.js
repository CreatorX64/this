import { MongoClient } from "mongodb";

export async function connectToDb() {
  return await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cg0dk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
}
