import { Component } from "react";
import { Die } from "./Die";
import "./RollDice.css";

export class RollDice extends Component {
  static defaultProps = {
    // The user might want to limit which die faces are allowed.
    sides: [1, 2, 3, 4, 5, 6]
  };

  constructor(props) {
    super(props);
    this.state = {
      dieOneFace: 1,
      dieTwoFace: 1,
      isRolling: false
    };
    this.roll = this.roll.bind(this);
  }

  roll() {
    const { sides } = this.props;
    const newDieOneFace = sides[Math.floor(Math.random() * sides.length)];
    const newDieTwoFace = sides[Math.floor(Math.random() * sides.length)];

    this.setState({
      dieOneFace: newDieOneFace,
      dieTwoFace: newDieTwoFace,
      isRolling: true
    });

    setTimeout(() => {
      this.setState({ isRolling: false });
    }, 1000);
  }

  render() {
    const { dieOneFace, dieTwoFace, isRolling } = this.state;

    return (
      <div className="roll-dice">
        <div className="roll-dice__container">
          <Die face={dieOneFace} isRolling={isRolling} />
          <Die face={dieTwoFace} isRolling={isRolling} />
        </div>
        <button
          className="roll-dice__button"
          onClick={this.roll}
          disabled={isRolling}
        >
          {isRolling ? "Rolling..." : "Roll Dice!"}
        </button>
      </div>
    );
  }
}
