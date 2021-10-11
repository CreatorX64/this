import { Component } from "react";
import { Die } from "./Die";
import "./Dice.css";

export class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((die, idx) => (
          <Die
            handleClick={this.props.handleClick}
            val={die}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
    );
  }
}
