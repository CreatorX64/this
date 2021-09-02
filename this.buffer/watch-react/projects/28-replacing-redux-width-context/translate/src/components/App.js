import React, { Component } from "react";
import { ColorStore } from "../context/ColorContext";
import { ColorSelector } from "./ColorSelector";
import { LanguageStore } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { UserCreate } from "./UserCreate";

export class App extends Component {
  render() {
    return (
      <div className="ui container">
        <ColorStore>
          <LanguageStore>
            <ColorSelector />
            <LanguageSelector />
            <UserCreate />
          </LanguageStore>
        </ColorStore>
      </div>
    );
  }
}
