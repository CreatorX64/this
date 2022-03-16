import jwt from "jsonwebtoken";

export const getUserFromToken = (token: string | undefined) => {
  try {
    if (!token) {
      throw new Error();
    }
    return jwt.verify(token, process.env.JWT_SIGNATURE!) as { userId: number };
  } catch (error) {
    return null;
  }
};
