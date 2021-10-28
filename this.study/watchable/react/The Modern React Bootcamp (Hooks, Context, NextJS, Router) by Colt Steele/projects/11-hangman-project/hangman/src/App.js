import { Component } from "react";
import { Hangman } from "./Hangman";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="app">
        <Hangman />
      </div>
    );
  }
}
