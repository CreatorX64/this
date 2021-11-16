import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./app/App";

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
