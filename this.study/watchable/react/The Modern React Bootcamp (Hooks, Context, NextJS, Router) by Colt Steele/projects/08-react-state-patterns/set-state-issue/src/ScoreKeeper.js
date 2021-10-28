import { Component } from "react";

export class ScoreKeeper extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0 };
    this.singleKill = this.singleKill.bind(this);
    this.tripleKill = this.tripleKill.bind(this);
  }

  singleKill() {
    this.setState({ score: this.state.score + 1 });
  }

  // Object based setState() calls are batched, don't call them sequentially.
  // tripleKill() {
  //   this.setState({ score: this.state.score + 1 });
  //   this.setState({ score: this.state.score + 1 });
  //   this.setState({ score: this.state.score + 1 });
  // }

  // Funcational setState calls are not batched, you can call them sequentially.
  // tripleKill() {
  //   this.setState((st) => ({ score: st.score + 1 }));
  //   this.setState((st) => ({ score: st.score + 1 }));
  //   this.setState((st) => ({ score: st.score + 1 }));
  // }

  tripleKill() {
    this.setState(this.incrementScore);
    this.setState(this.incrementScore);
    this.setState(this.incrementScore);
  }

  incrementScore(currentState) {
    return { score: currentState.score + 1 };
  }

  render() {
    return (
      <div>
        <h1>Score is: {this.state.score}</h1>
        <button onClick={this.singleKill}>Single Kill!</button>
        <button onClick={this.tripleKill}>Triple Kill!</button>
      </div>
    );
  }
}
