import { Component } from "react";

export class Clicker extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
    this.generateRandom = this.generateRandom.bind(this);
  }

  generateRandom(e) {
    const number = Math.floor(Math.random() * 10) + 1;
    this.setState({ number });
  }

  render() {
    return (
      <div>
        <h1>Number is {this.state.number}</h1>
        {this.state.number === 7 ? (
          <h2>YOU WIN!</h2>
        ) : (
          <button onClick={this.generateRandom}>Random Number</button>
        )}
      </div>
    );
  }
}
