import { get, ref, set } from "firebase/database";
import { beforeEach, expect, test } from "@jest/globals";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startAddExpense,
  startRemoveExpense,
  startEditExpense
} from "../../actions/expenses";
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  REMOVE_EXPENSE,
  SET_EXPENSES
} from "../../actions/types";
import { expenses } from "../fixtures/expenses";
import { db } from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  set(ref(db, "expenses"), expensesData).then(() => done());
});

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

test("should edit expense from firebase", (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: EDIT_EXPENSE,
        id,
        updates
      });
      return get(ref(db, `expenses/${id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val().amount).toEqual(updates.amount);
      done();
    });
});

test("should setup remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    id: "123abc"
  });
});

test("should remove expenses from firebase", (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: REMOVE_EXPENSE, id });
      return get(ref(db, `expenses/${id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup set expenses action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: SET_EXPENSES,
    expenses
  });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SET_EXPENSES,
      expenses
    });
    done();
  });
});
