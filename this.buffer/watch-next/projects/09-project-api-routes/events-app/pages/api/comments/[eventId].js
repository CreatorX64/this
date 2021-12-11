import {
  getAllDocuments,
  connectDatabase,
  insertDocument
} from "../../../helpers/dbUtils";

export default async function handler(req, res) {
  const { eventId } = req.query;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({ message: "Database connection failed" });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    };
    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Comment insertion failed" });
    }
  } else if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      console.log(documents);
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Comment fetch failed" });
    }
  }

  client.close();
}
