import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { login, logout } from "./actions/auth";
import { startSetExpenses } from "./actions/expenses";
import { LoadingPage } from "./components/LoadingPage";
import { AppRouter, history } from "./routers/AppRouter";
import { APP_ELEM_SELECTOR } from "./static";
import { configureStore } from "./store/configureStore";
import "./firebase/firebase";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

let hasRendered = false;
const store = configureStore();
const jsx = (
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <AppRouter />
    </LocalizationProvider>
  </Provider>
);

function renderApp() {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.querySelector(APP_ELEM_SELECTOR));
    hasRendered = true;
  }
}

ReactDOM.render(<LoadingPage />, document.querySelector(APP_ELEM_SELECTOR));

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
