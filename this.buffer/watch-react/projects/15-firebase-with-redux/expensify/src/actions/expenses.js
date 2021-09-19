import { DateTime } from "luxon";
import { push, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from "./types";

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
      createdAt = DateTime.now()
    } = expense;

    const expenseDto = {
      description,
      note,
      amount,
      // Serialize DateTime instance into Unix timestamp to store in DB
      createdAt: createdAt.toMillis()
    };

    push(ref(db, "expenses"), expenseDto).then((ref) => {
      const newExpense = {
        ...expenseDto,
        id: ref.key,
        // Deserialize DateTime instance from Unix timestamp to use in app
        createdAt: DateTime.fromMillis(expenseDto.createdAt)
      };
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
