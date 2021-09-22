import { DateTime } from "luxon";
import numeral from "numeral";
import React from "react";
import { Link } from "react-router-dom";

export function ExpenseListItem({ id, description, amount, createdAt }) {
  return (
    <Link to={`/edit/${id}`} className="list-item">
      <div>
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__sub-title">
          {createdAt && DateTime.fromMillis(createdAt).toFormat("MMMM d, yyyy")}
        </span>
      </div>
      <h3 className="list-item__data">
        {numeral(amount / 100).format("$0,0.00")}
      </h3>
    </Link>
  );
}
