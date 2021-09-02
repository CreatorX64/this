import React from "react";
import { ThemeContext } from "../context/ThemeContext";

export class Button extends React.Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <button
        className={`ui button ${theme === "light" ? "" : "inverted"}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
