import { Component } from "react";
import { Palette } from "./Palette";
import { seedPalettes } from "./seedPalettes";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette {...seedPalettes[2]} />
      </div>
    );
  }
}
