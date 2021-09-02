import React, { Component } from "react";

export const LanguageContext = React.createContext("english");

export class LanguageStore extends Component {
  state = { language: "English" };

  constructor(props) {
    super(props);
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  onLanguageChange(language) {
    this.setState({ language });
  }

  render() {
    return (
      <LanguageContext.Provider
        value={{ ...this.state, onLanguageChange: this.onLanguageChange }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
