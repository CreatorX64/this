import React from "react";
import { connect } from "react-redux";
import { ExpenseListItem } from "./ExpenseListItem";
import { getVisibleExpenses } from "../selectors/expenses";

export function ExpenseList(props) {
  return (
    <div>
      {props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map((expense) => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  };
}

export const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);
