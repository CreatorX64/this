import { articles } from "../../../data";

export default function handler({ query: { id } }, res) {
  const article = articles.find((article) => article.id === id);

  if (article) {
    res.status(200).json(article);
  } else {
    res
      .status(404)
      .json({ message: `Article with the id of ${id} is not found.` });
  }
}
