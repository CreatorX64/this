import numeral from "numeral";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVisibleExpenses } from "../selectors/expenses";
import { getExpensesTotal } from "../selectors/expensesTotal";

export function ExpensesSummary({ expenseCount, expensesTotal }) {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formattedExpenseTotal = numeral(expensesTotal / 100).format("$0,0.00");

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling{" "}
          <span>{formattedExpenseTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  };
}

export const ConnectedExpensesSummary =
  connect(mapStateToProps)(ExpensesSummary);
