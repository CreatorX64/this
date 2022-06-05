import { Link } from "react-router-dom";

import styles from "styles/Home.module.css";
import useFetch from "hooks/useFetch";

const Home = () => {
  const {
    data: articles,
    isPending,
    error
  } = useFetch("http://localhost:8080/articles");

  return (
    <div className={styles.home}>
      <h2>Articles</h2>

      {isPending && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {articles &&
        articles.map((article) => (
          <div key={article.id} className={styles.card}>
            <h3>{article.title}</h3>
            <p>{article.author}</p>
            <Link to={`/articles/${article.id}`}>Read more →</Link>
          </div>
        ))}
    </div>
  );
};

export default Home;
