import React from "react";
import { connect } from "react-redux";
import { editExpense, removeExpense } from "../actions";
import { ExpenseForm } from "./ExpenseForm";

const EditExpensePage = ({
  history,
  editExpense,
  removeExpense,
  match,
  expense
}) => (
  <div>
    <ExpenseForm
      expense={expense}
      onSubmit={(expense) => {
        editExpense(match.params.id, expense);
        history.push("/");
      }}
    />
    <button
      onClick={() => {
        removeExpense({ id: expense.id });
        history.push("/");
      }}
    >
      Remove
    </button>
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(
    (expense) => expense.id === props.match.params.id
  )
});

export const ConnectedEditExpensePage = connect(mapStateToProps, {
  editExpense,
  removeExpense
})(EditExpensePage);
