export function getExpensesTotal(expenses) {
  return expenses
    .map((expense) => expense.amount)
    .reduce((sum, curr) => sum + curr, 0);
}
