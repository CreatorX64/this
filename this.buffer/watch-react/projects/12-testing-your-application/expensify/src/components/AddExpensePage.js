import React from "react";
import { connect } from "react-redux";
import { addExpense } from "../actions";
import { ExpenseForm } from "./ExpenseForm";

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h2>Add Expense</h2>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense))
});

export const ConnectedAddExpensePage = connect(
  null,
  mapDispatchToProps
)(AddExpensePage);
