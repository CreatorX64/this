import { DateTime } from "luxon";
import { get, push, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from "./types";

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
});

export const startAddExpense = (expense = {}) => {
  return (dispatch) => {
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
};

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id
});

export const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
});

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return get(ref(db, "expenses")).then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      dispatch(setExpenses(expenses));
    });
  };
};
