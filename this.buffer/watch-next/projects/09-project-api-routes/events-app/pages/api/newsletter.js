import { connectDatabase, insertDocument } from "../../helpers/dbUtils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email" });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    try {
      await insertDocument(client, "emails", { email: userEmail });
      client.close();
    } catch (error) {
      return res.status(500).json({ message: "Data insertion failed" });
    }

    res.status(201).json({ message: "Signed up" });
  }
}
