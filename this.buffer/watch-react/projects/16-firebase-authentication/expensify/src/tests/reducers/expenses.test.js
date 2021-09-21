import { expect, test } from "@jest/globals";
import { DateTime } from "luxon";
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  INIT,
  REMOVE_EXPENSE,
  SET_EXPENSES
} from "../../actions/types";
import { expenses } from "../fixtures/expenses";
import { expensesReducer, expensesDefaults } from "../../reducers/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: INIT });
  expect(state).toEqual(expensesDefaults);
});

test("should remove expense by id", () => {
  const action = { type: REMOVE_EXPENSE, id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
  const action = { type: REMOVE_EXPENSE, id: "-1" };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "109",
    description: "Laptop",
    note: "Charger is included",
    amount: 20000,
    createdAt: DateTime.now()
  };
  const action = { type: ADD_EXPENSE, expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const amount = 122000;
  const action = {
    type: EDIT_EXPENSE,
    id: expenses[1].id,
    updates: { amount }
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test("should not edit an expense if expense not found", () => {
  const amount = 122000;
  const action = {
    type: EDIT_EXPENSE,
    id: "-1",
    updates: { amount }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const action = {
    type: SET_EXPENSES,
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
