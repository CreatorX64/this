import { combineReducers, createStore } from "redux";
import { expensesReducer } from "../reducers/expenses";
import { filtersReducer } from "../reducers/filters";

export const configureStore = () => {
  return createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    })
  );
};
