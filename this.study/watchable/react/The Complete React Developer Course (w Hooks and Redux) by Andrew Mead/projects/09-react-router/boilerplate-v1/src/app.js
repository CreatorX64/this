import React from "react";
import ReactDOM from "react-dom";
import { APP_ELEM_SELECTOR } from "./static";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDOM.render(
  <p>This is my boilerplate</p>,
  document.querySelector(APP_ELEM_SELECTOR)
);
