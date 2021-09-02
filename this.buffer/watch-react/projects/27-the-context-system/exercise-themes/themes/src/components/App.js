import React from "react";
import { Button } from "./Button";
import { Content } from "./Content";
import { ThemeContext } from "../context/ThemeContext";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.state = { theme: "light" };
  }

  toggleTheme() {
    if (this.state.theme === "light") {
      this.setState({ theme: "dark" });
    } else {
      this.setState({ theme: "light" });
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <div style={{ width: "400px", margin: "40px auto" }}>
          <Button onClick={this.toggleTheme}>Toggle Theme</Button>
          <Content />
        </div>
      </ThemeContext.Provider>
    );
  }
}
