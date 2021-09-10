import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./routers/AppRouter";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import { getVisibleExpenses } from "./selectors/expenses";
import { configureStore } from "./store/configureStore";
import { APP_ELEM_SELECTOR } from "./static";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill" }));
store.dispatch(addExpense({ description: "Gas bill" }));
store.dispatch(setTextFilter("water"));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

ReactDOM.render(<AppRouter />, document.querySelector(APP_ELEM_SELECTOR));
