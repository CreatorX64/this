import React from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div>
      <p>
        404 - <Link to="/">Go home</Link>
      </p>
    </div>
  );
}
