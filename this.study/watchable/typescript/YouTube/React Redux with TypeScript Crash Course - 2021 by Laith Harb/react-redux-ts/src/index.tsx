import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { App } from "./App";
import { store } from "./state/index";

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
