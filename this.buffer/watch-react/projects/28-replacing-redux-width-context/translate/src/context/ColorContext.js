import React, { Component } from "react";

export const ColorContext = React.createContext();

export class ColorStore extends Component {
  state = { color: "primary" };

  constructor(props) {
    super(props);
    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(color) {
    this.setState({ color });
  }

  render() {
    return (
      <ColorContext.Provider
        value={{ ...this.state, onColorChange: this.onColorChange }}
      >
        {this.props.children}
      </ColorContext.Provider>
    );
  }
}
