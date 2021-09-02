import React, { Component } from "react";
import { ColorContext } from "../context/ColorContext";
import { LanguageContext } from "../context/LanguageContext";

export class Button extends Component {
  // Using "this.context" to access value in the context. Often used if we're
  // accessing only one context inside this component.
  // static contextType = LanguageContext;

  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {(lang) => this.renderSubmit(lang)}
        </LanguageContext.Consumer>
      </button>
    );
  }

  renderSubmit(lang) {
    return lang === "english" ? "Submit" : "Voorleggen";
  }

  render() {
    // Using "this.context" to access value in the context.  Often used if
    // we're accessing only one context inside this component.
    // const text = this.context === "english" ? "Submit" : "Voorleggen";
    // return <button className="ui button primary">{text}</button>;

    // Using "Consumer" to access value in the context. Used if we're
    // accessing multiple contexts inside this component. Consumers only
    // accept functions as their child that return component to render.
    return (
      <ColorContext.Consumer>
        {(color) => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}
