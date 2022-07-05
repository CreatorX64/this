import type { NextApiRequest, NextApiResponse } from "next";

const handler = (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ text: "Hello" });
};

export default handler;
