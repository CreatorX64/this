import React from "react";
import { connect } from "react-redux";
import { addExpense } from "../actions";
import { ExpenseForm } from "./ExpenseForm";

const AddExpensePage = ({ history, addExpense }) => (
  <div>
    <h2>Add Expense</h2>
    <ExpenseForm
      onSubmit={(expense) => {
        addExpense(expense);
        history.push("/");
      }}
    />
  </div>
);

export const ConnectedAddExpensePage = connect(null, { addExpense })(
  AddExpensePage
);
