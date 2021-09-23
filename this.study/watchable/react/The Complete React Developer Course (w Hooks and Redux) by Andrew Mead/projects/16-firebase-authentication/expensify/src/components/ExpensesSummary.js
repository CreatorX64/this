import numeral from "numeral";
import React from "react";
import { connect } from "react-redux";
import { getVisibleExpenses } from "../selectors/expenses";
import { getExpensesTotal } from "../selectors/expensesTotal";

export function ExpensesSummary({ expenseCount, expensesTotal }) {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formattedExpenseTotal = numeral(expensesTotal / 100).format("$0,0.00");

  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}
      </h1>
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
