import { expect, test } from "@jest/globals";
import { DateTime } from "luxon";
import { filtersDefaults } from "../../reducers/filters";
import { getVisibleExpenses } from "../../selectors/expenses";

const expenses = [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: DateTime.fromMillis(0)
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: DateTime.fromMillis(0).minus({ days: 4 })
  },
  {
    id: "3",
    description: "Credit card",
    note: "",
    amount: 4500,
    createdAt: DateTime.fromMillis(0).plus({ days: 4 })
  }
];

test("should filter by text", () => {
  const filters = {
    ...filtersDefaults,
    text: "e",
    startDate: null,
    endDate: null
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

// test("should filter by startDate", () => {
//   const filters = {
//     ...filtersDefaults,
//     startDate: utsTsFromMs(0)
//   };
// });
