import React, { Component } from "react";
import { ColorContext } from "../context/ColorContext";
import { LanguageContext } from "../context/LanguageContext";

export class Button extends Component {
  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {({ language }) => this.renderSubmit(language)}
        </LanguageContext.Consumer>
      </button>
    );
  }

  renderSubmit(language) {
    return language === "english" ? "Submit" : "Voorleggen";
  }

  render() {
    return (
      <ColorContext.Consumer>
        {({ color }) => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}
