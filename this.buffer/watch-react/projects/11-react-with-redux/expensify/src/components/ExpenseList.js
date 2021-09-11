import React from "react";
import { connect } from "react-redux";
import { ConnectedExpenseListItem as ExpenseListItem } from "./ExpenseListItem";
import { getVisibleExpenses } from "../selectors/expenses";

const ExpenseList = (props) => (
  <div>
    <h2>Expense List</h2>
    {props.expenses.map((expense) => (
      <ExpenseListItem key={expense.id} {...expense} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  expenses: getVisibleExpenses(state.expenses, state.filters)
});

export const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);
