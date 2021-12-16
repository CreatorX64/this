import { connectToDb } from "../../../helpers/db";
import { hashPassword } from "../../../helpers/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message: "Invalid input — password should be at least 7 characters long."
    });
  }

  const client = await connectToDb();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    client.close();
    return res.status(422).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);
  await db.collection("users").insertOne({ email, password: hashedPassword });

  client.close();
  res.status(201).json({ message: "Created user!" });
}
