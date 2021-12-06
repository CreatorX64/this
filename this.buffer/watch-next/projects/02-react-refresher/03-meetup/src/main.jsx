import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/favoritesContext";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <FavoritesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
