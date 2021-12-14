import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const jwtPayload = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: jwtPayload._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
}
