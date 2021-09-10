import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import { getVisibleExpenses } from "./selectors/expenses";
import { AppRouter } from "./routers/AppRouter";
import { configureStore } from "./store/configureStore";
import { APP_ELEM_SELECTOR } from "./static";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 4500 }));
store.dispatch(addExpense({ description: "Gas bill" }));
store.dispatch(setTextFilter("water"));

setTimeout(() => {
  store.dispatch(setTextFilter("bill"));
}, 3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector(APP_ELEM_SELECTOR)
);
