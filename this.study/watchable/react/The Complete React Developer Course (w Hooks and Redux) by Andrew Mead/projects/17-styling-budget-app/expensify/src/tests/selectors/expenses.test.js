import { expect, test } from "@jest/globals";
import { DateTime } from "luxon";
import { filtersDefaults } from "../../reducers/filters";
import { getVisibleExpenses } from "../../selectors/expenses";
import { expenses } from "../fixtures/expenses";

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

test("should filter by startDate", () => {
  const filters = {
    ...filtersDefaults,
    startDate: DateTime.fromMillis(0),
    endDate: null
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test("should filter by endDate", () => {
  const filters = {
    ...filtersDefaults,
    startDate: null,
    endDate: DateTime.fromMillis(0).plus({ days: 2 })
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("should sort by date", () => {
  const filters = {
    ...filtersDefaults,
    startDate: null,
    endDate: null
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("should sort by amount", () => {
  const filters = {
    ...filtersDefaults,
    sortBy: "amount",
    startDate: null,
    endDate: null
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
