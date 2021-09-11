import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addExpense } from "./actions";
import { AppRouter } from "./routers/AppRouter";
import { configureStore } from "./store/configureStore";
import { APP_ELEM_SELECTOR } from "./static";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 4500 }));
store.dispatch(addExpense({ description: "Gas bill", createdAt: 1000 }));
store.dispatch(addExpense({ description: "Rent", amount: 109500 }));

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector(APP_ELEM_SELECTOR)
);
