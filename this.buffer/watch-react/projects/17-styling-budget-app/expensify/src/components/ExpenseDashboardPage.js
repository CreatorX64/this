import React from "react";
import { ConnectedExpenseList as ExpenseList } from "./ExpenseList";
import { ConnectedExpenseListFilters as ExpenseListFilters } from "./ExpenseListFilters";
import { ConnectedExpensesSummary as ExpensesSummary } from "./ExpensesSummary";

export function ExpenseDashboardPage() {
  return (
    <div>
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
}
