import React from "react";
import ReactDOM from "react-dom";
import { APP_ELEM_SELECTOR } from "./static";
import { IndecisionApp } from "./components/IndecisionApp";
import "./styles/styles.scss";

ReactDOM.render(<IndecisionApp />, document.querySelector(APP_ELEM_SELECTOR));
