import React from "react";
import { connect } from "react-redux";
import { removeExpense } from "../actions";

const ExpenseListItem = ({
  removeExpense,
  id,
  description,
  amount,
  createdAt
}) => (
  <div>
    <h3>{description}</h3>
    <p>
      {amount} - {createdAt}
    </p>
    <button onClick={() => removeExpense({ id })}>Remove</button>
  </div>
);

export const ConnectedExpenseListItem = connect(null, { removeExpense })(
  ExpenseListItem
);
