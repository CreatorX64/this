import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectToDb } from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDb();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found" });
  }

  const currentPassword = user.password;
  const isValidPassword = await verifyPassword(oldPassword, currentPassword);

  if (!isValidPassword) {
    client.close();
    return res.status(403).json({ message: "Invalid password!" });
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}
