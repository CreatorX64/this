import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, message } = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      message
    };
    const filePath = getFeedbacksFilePath();
    const feedbacks = getFeedbacks(filePath);

    feedbacks.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbacks));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = getFeedbacksFilePath();
    const feedbacks = getFeedbacks(filePath);
    res.status(200).json({ feedbacks });
  }
}

export function getFeedbacksFilePath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function getFeedbacks(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
