import { Component } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { Dog } from "./Dog";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "about" };
  }

  changePage(newPage) {
    this.setState({ page: newPage });
  }

  renderPage() {
    if (this.state.page === "about") {
      return <About />;
    } else if (this.state.page === "dog") {
      return <Dog />;
    } else if (this.state.page === "contact") {
      return <Contact />;
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="App-nav">
          <a href="#!" onClick={() => this.changePage("about")}>
            About
          </a>
          <a href="#!" onClick={() => this.changePage("dog")}>
            Dog
          </a>
          <a href="#!" onClick={() => this.changePage("contact")}>
            Contact
          </a>
        </nav>
        {this.renderPage()}
      </div>
    );
  }
}
