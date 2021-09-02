import React, { Component } from "react";
import { ColorContext } from "../context/ColorContext";
import { LanguageContext } from "../context/LanguageContext";
import { UserCreate } from "./UserCreate";

export class App extends Component {
  state = { color: "primary", language: "english" };

  onColorChange(color) {
    this.setState({ color });
  }

  onLanguageChange(language) {
    this.setState({ language });
  }

  render() {
    return (
      <div className="ui container">
        <div>
          Select a color:&nbsp;&nbsp;
          <button
            className="ui button primary"
            onClick={() => this.onColorChange("primary")}
          >
            Primary
          </button>
          <button
            className="ui button red"
            onClick={() => this.onColorChange("red")}
          >
            Red
          </button>
        </div>

        <div>
          Select a language:&nbsp;&nbsp;
          <i
            className="flag us"
            onClick={() => this.onLanguageChange("english")}
          />
          <i
            className="flag nl"
            onClick={() => this.onLanguageChange("dutch")}
          />
        </div>

        {/* Gets the value from App state */}
        <ColorContext.Provider value={this.state.color}>
          <LanguageContext.Provider value={this.state.language}>
            <UserCreate />
          </LanguageContext.Provider>
        </ColorContext.Provider>

        {/* Gets a constant value */}
        {/* <LanguageContext.Provider value="dutch">
          <UserCreate />
        </LanguageContext.Provider> */}

        {/* Gets the default value defined in LanguageContext.js file */}
        {/* <UserCreate /> */}
      </div>
    );
  }
}
