import { expect, test } from "@jest/globals";
import { expenses } from "../fixtures/expenses";
import { getExpensesTotal } from "../../selectors/expensesTotal";

test("should return 0 if no expenses", () => {
  const total = getExpensesTotal([]);
  expect(total).toBe(0);
});

test("should add up a single expense", () => {
  const total = getExpensesTotal([expenses[0]]);
  expect(total).toBe(expenses[0].amount);
});

test("should add up multiple expenses", () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(114195);
});
