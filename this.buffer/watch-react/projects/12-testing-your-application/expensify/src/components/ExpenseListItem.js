import React from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <h3>
      <Link to={`/edit/${id}`}>{description}</Link>
    </h3>
    <p>
      {amount} - {createdAt && createdAt.toLocaleString(DateTime.DATE_MED)}
    </p>
  </div>
);
