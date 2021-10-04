import { Component } from "react";

export class Rando extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, color: "purple" };
    this.makeTimer();
  }

  makeTimer() {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * this.props.maxNum);
      this.setState({ number: randomNumber });
    }, 1000);
  }

  render() {
    return <h1>{this.state.number}</h1>;
  }
}
