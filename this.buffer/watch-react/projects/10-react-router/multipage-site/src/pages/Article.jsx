import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:3000/articles/${articleId}`;
  const { data: article, isPending, error } = useFetch(url);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [error]);

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
