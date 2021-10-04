import { Component } from "react";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 99,
      gameOver: false
    };
  }

  render() {
    return (
      <div>
        <h1>Your score is: {this.state.score}</h1>
      </div>
    );
  }
}
