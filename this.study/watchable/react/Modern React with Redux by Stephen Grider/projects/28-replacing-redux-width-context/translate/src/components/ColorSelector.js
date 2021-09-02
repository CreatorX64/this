import React, { Component } from "react";
import { ColorContext } from "../context/ColorContext";

export class ColorSelector extends Component {
  static contextType = ColorContext;

  render() {
    return (
      <div>
        Select a color:&nbsp;&nbsp;
        <button
          className="ui button primary"
          onClick={() => this.context.onColorChange("primary")}
        >
          Primary
        </button>
        <button
          className="ui button red"
          onClick={() => this.context.onColorChange("red")}
        >
          Red
        </button>
      </div>
    );
  }
}
