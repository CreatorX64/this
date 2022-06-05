import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: article,
    isPending,
    error
  } = useFetch(`http://localhost:8080/articles/${id}`);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [error, navigate]);

  return (
    <div>
      {isPending && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {article && (
        <div>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
};

export default Article;
