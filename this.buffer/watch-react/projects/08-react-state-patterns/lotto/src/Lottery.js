import { Component } from "react";
import { Ball } from "./Ball";
import "./Lottery.css";

export class Lottery extends Component {
  static defaultProps = {
    title: "Lotto",
    numBalls: 6,
    maxNum: 40
  };

  constructor(props) {
    super(props);
    this.state = { nums: new Array(this.props.numBalls).fill(null) };
    this.handleClick = this.handleClick.bind(this);
  }

  generateBalls() {
    this.setState((curState) => ({
      nums: curState.nums.map(
        () => Math.floor(Math.random() * this.props.maxNum) + 1
      )
    }));
  }

  handleClick() {
    this.generateBalls();
  }

  render() {
    return (
      <section className="lottery">
        <h1>{this.props.title}</h1>
        <div className="lottery__balls">
          {this.state.nums.map((num, idx) => (
            <Ball key={idx} num={num} />
          ))}
        </div>
        <button className="lottery__button" onClick={this.handleClick}>
          Generate
        </button>
      </section>
    );
  }
}
