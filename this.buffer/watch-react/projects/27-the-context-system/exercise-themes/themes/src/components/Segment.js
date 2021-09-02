import React from "react";
import { ThemeContext } from "../context/ThemeContext";

export class Segment extends React.Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <div className={`ui segment ${theme === "light" ? "" : "inverted"}`}>
        {this.props.children}
      </div>
    );
  }
}
