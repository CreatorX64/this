import { isEqual, isBefore, isAfter, fromUnixTime } from "date-fns";

export const getVisibleExpenses = (
  expenses,
  { text, sortBy, startDate, endDate }
) => {
  return expenses
    .filter((expense) => {
      const createdAt = fromUnixTime(expense.createdAt);

      console.log(createdAt, endDate);

      const startDateMatch = startDate
        ? isEqual(startDate, createdAt) || isBefore(startDate, createdAt)
        : true;
      const endDateMatch = endDate
        ? isEqual(endDate, createdAt) || isAfter(endDate, createdAt)
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
