import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./routers/AppRouter";
import { APP_ELEM_SELECTOR } from "./static";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDOM.render(<AppRouter />, document.querySelector(APP_ELEM_SELECTOR));
