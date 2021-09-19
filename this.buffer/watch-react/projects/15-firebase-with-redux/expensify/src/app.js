import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { AppRouter } from "./routers/AppRouter";
import { configureStore } from "./store/configureStore";
import { APP_ELEM_SELECTOR } from "./static";
import "./firebase/firebase";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <AppRouter />
    </LocalizationProvider>
  </Provider>,
  document.querySelector(APP_ELEM_SELECTOR)
);
