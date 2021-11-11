import express, { Request, Response, NextFunction } from "express";
import { router as todoRouter } from "./routes/todos";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/todos", todoRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
