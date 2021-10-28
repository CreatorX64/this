import { Timer } from "./Timer";
// import { ZenQuote } from "./ZenQuote";
// import { GithubUserInfo } from "./GithubUserInfo";
import "./App.css";
import { Component } from "react";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isTimerVisible: true };
  }

  render() {
    const { isTimerVisible } = this.state;

    return (
      <div className="App">
        <div>
          {isTimerVisible ? <Timer /> : <p>Timer not visible!</p>}
          <button
            onClick={() =>
              this.setState({ isTimerVisible: !this.state.isTimerVisible })
            }
          >
            {isTimerVisible ? "Remove" : "Show"} Timmer
          </button>
        </div>

        {/* <ZenQuote /> */}

        {/* <GithubUserInfo username="facebook" />
        <GithubUserInfo username="colt" />
        <GithubUserInfo username="gaearon" />
        <GithubUserInfo username="sophiebits" /> */}
      </div>
    );
  }
}
