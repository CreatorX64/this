import React from "react";
import { ConnectedExpenseList as ExpenseList } from "./ExpenseList";
import { ConnectedExpenseListFilters as ExpenseListFilters } from "./ExpenseListFilters";

export const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);
