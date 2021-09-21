import { DateTime } from "luxon";
import { get, push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from "./types";

export function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    expense
  };
}

export function startAddExpense(expense = {}) {
  return function (dispatch) {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = DateTime.now().toMillis()
    } = expense;

    const expenseDto = {
      description,
      note,
      amount,
      createdAt
    };

    return push(ref(db, "expenses"), expenseDto).then((ref) => {
      const newExpense = { ...expenseDto, id: ref.key };
      dispatch(addExpense(newExpense));
    });
  };
}

export function removeExpense(id) {
  return {
    type: REMOVE_EXPENSE,
    id
  };
}

export function startRemoveExpense(id) {
  return function (dispatch) {
    return remove(ref(db, `expenses/${id}`)).then(() => {
      dispatch(removeExpense(id));
    });
  };
}

export function editExpense(id, updates) {
  return {
    type: EDIT_EXPENSE,
    id,
    updates
  };
}

export function startEditExpense(id, updates) {
  return function (dispatch) {
    return update(ref(db, `expenses/${id}`), updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
}

export function setExpenses(expenses) {
  return {
    type: SET_EXPENSES,
    expenses
  };
}

export function startSetExpenses() {
  return function (dispatch) {
    return get(ref(db, "expenses")).then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      dispatch(setExpenses(expenses));
    });
  };
}
