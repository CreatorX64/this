import { MongoClient } from "mongodb";

export async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cg0dk.mongodb.net/events?retryWrites=true&w=majority`
  );
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  return await db.collection(collection).find(filter).sort(sort).toArray();
}
