import { expect, test } from "@jest/globals";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense
} from "../../actions";
import { expenses } from "../fixtures/expenses";

const createMockStore = configureStore([thunk]);

test("should setup add expense action object with provided values", () => {
  const expense = expenses[2];
  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { note: "New note value" }
  });
});

test("should setup remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should add expense to database and store", () => {
  const store = createMockStore({});
  const expense = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expense));
});

test("should add expense to database and store with defaults", () => {});

// test("should setup add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: DateTime.fromMillis(0)
//     }
//   });
// });
