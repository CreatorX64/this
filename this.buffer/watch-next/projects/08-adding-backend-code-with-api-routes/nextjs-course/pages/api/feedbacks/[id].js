import { getFeedbacksFilePath, getFeedbacks } from ".";

export default function handler(req, res) {
  // if (req.method === "POST") {
  //   // Do something...
  // } else if (req.method === "DELETE") {
  //   // Do something else...
  // }

  const { id } = req.query;

  const filePath = getFeedbacksFilePath();
  const feedbacks = getFeedbacks(filePath);

  const selectedFeedback = feedbacks.find((feedback) => feedback.id === id);

  res.status(200).json({ feedback: selectedFeedback });
}
