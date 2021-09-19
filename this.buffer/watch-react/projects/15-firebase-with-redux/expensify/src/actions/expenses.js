import { DateTime } from "luxon";
import { push, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from "./types";

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
});

export const startAddExpense =
  (expenseData = {}) =>
  (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = DateTime.now()
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    push(ref(db, "expenses"), expense).then((ref) => {
      dispatch(addExpense({ ...expense, id: ref.key }));
    });
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
