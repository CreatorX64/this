import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from "./types";

export const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = DateTime.now()
} = {}) => ({
  type: ADD_EXPENSE,
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt
  }
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id
});

export const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
});
