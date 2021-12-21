import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import styles from "./Home.module.css";

export const Home = () => {
  const {
    data: articles,
    isPending,
    error
  } = useFetch("http://localhost:3000/articles");

  return (
    <div>
      <h2>Articles</h2>

      {isPending && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {articles &&
        articles.map((article) => (
          <div key={article.id} className={styles.card}>
            <h3>{article.title}</h3>
            <p>{article.author}</p>
            <Link to={`/articles/${article.id}`}>Read more &rarr;</Link>
          </div>
        ))}
    </div>
  );
};
