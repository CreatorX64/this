import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "./useFetch";

export function BlogDetails() {
  const history = useHistory();
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  function handleClick() {
    fetch(`http://localhost:8000/blogs/${id}`, { method: "DELETE" }).then(() =>
      history.push("/")
    );
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>
            <p>{blog.body}</p>
          </div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
