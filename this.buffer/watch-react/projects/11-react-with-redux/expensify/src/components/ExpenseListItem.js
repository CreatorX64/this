import React from "react";

export const ExpenseListItem = ({ description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>
      {amount} - {createdAt}
    </p>
  </div>
);
