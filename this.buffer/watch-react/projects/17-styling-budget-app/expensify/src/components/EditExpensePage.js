import React from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { ExpenseForm } from "./ExpenseForm";

export class EditExpensePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSubmit(expense) {
    this.props.startEditExpense(this.props.match.params.id, expense);
    this.props.history.push("/");
  }

  onRemove() {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    expense: state.expenses.find(
      (expense) => expense.id === props.match.params.id
    )
  };
}

const mapDispatchToProps = {
  startEditExpense,
  startRemoveExpense
};

export const ConnectedEditExpensePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
