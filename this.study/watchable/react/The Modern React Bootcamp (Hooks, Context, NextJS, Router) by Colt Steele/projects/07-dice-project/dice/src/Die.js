import { Component } from "react";
import "./Die.css";

const numberTextMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six"
};

export class Die extends Component {
  render() {
    const { face, isRolling } = this.props;

    return (
      <i
        className={`die fa-solid fa-dice-${numberTextMap[face]} ${
          isRolling ? "die--rolling" : ""
        }`}
      ></i>
    );
  }
}
