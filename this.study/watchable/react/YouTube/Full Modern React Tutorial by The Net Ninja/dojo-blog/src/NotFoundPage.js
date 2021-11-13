import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
}
