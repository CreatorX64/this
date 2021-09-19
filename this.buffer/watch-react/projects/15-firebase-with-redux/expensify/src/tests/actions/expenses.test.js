import { get, ref } from "firebase/database";
import { expect, test } from "@jest/globals";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  REMOVE_EXPENSE
} from "../../actions";
import { expenses } from "../fixtures/expenses";
import { db } from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("should setup add expense action object with provided values", () => {
  const expense = expenses[2];
  const action = addExpense(expense);
  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expense = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };
  store
    .dispatch(startAddExpense(expense))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ADD_EXPENSE,
        expense: { ...expense, id: expect.any(String) }
      });
      return get(ref(db, `expenses/${actions[0].expense.id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({ ...expense });
      done();
    });
});

test("should add expense to database and store with defaults", (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: expect.any(Number)
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ADD_EXPENSE,
        expense: { ...expenseDefaults, id: expect.any(String) }
      });
      return get(ref(db, `expenses/${actions[0].expense.id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({ ...expenseDefaults });
      done();
    });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: EDIT_EXPENSE,
    id: "123abc",
    updates: { note: "New note value" }
  });
});

test("should setup remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    id: "123abc"
  });
});

// test("should setup add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: ADD_EXPENSE,
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
