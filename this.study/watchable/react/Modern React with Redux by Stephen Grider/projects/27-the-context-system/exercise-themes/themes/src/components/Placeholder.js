import React from "react";
import { ThemeContext } from "../context/ThemeContext";

export class Placeholder extends React.Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <div
        className={`ui active placeholder ${
          theme === "light" ? "" : "inverted"
        }`}
      >
        <div className="image header">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="paragraph">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    );
  }
}
