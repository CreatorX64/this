import { Component } from "react";
import { Die } from "./Die";
import "./Dice.css";

export class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((die, index) => (
          <Die
            key={index}
            index={index}
            value={die}
            locked={this.props.locked[index]}
            disabled={this.props.disabled}
            isRolling={this.props.isRolling && !this.props.locked[index]}
            handleClick={this.props.handleClick}
          />
        ))}
      </div>
    );
  }
}
