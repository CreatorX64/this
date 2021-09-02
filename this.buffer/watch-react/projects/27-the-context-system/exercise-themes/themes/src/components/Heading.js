import React from "react";
import { ThemeContext } from "../context/ThemeContext";

export class Heading extends React.Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <h4 className={`ui header ${theme === "light" ? "" : "inverted"}`}>
        {this.props.children}
      </h4>
    );
  }
}
