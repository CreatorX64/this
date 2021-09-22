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
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove Expense
          </button>
        </div>
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
