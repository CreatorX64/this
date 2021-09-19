import { DateTime } from "luxon";

export const getVisibleExpenses = (
  expenses,
  { text, sortBy, startDate, endDate }
) => {
  return expenses
    .filter((expense) => {
      const createdAt = DateTime.fromMillis(expense.createdAt);

      const startDateMatch = startDate
        ? startDate.hasSame(createdAt, "day") || startDate < createdAt
        : true;

      const endDateMatch = endDate
        ? endDate.hasSame(createdAt, "day") || endDate > createdAt
        : true;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
