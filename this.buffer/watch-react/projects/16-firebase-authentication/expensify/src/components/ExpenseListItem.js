import { DateTime } from "luxon";
import numeral from "numeral";
import React from "react";
import { Link } from "react-router-dom";

export function ExpenseListItem({ id, description, amount, createdAt }) {
  return (
    <div>
      <h3>
        <Link to={`/edit/${id}`}>{description}</Link>
      </h3>
      <p>
        {numeral(amount / 100).format("$0,0.00")} -{" "}
        {createdAt && DateTime.fromMillis(createdAt).toFormat("MMMM d, yyyy")}
      </p>
    </div>
  );
}
