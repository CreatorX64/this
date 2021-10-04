import React from "react";
import ReactDOM from "react-dom";
import { Star } from "./Star";
import { Rating } from "./Rating";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h2>Star Components:</h2>
      <Star color="pink" isFilled />
      <Star color="magenta" />
      <Star color="indigo" isFilled />
      <h2>Rating Component (uses Stars):</h2>
      <Rating stars={4} />
      <Rating stars={0} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
