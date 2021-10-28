import { Component } from "react";
import { Dice } from "./Dice";
import { ScoreTable } from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

export class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dice: new Array(NUM_DICE).fill(),
      locked: new Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      isRolling: false,
      scores: {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfKind: null,
        fourOfKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        chance: null
      }
    };

    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }

  animateRoll() {
    this.setState({ isRolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }

  roll() {
    // roll dice whose indexes are in reroll
    this.setState((state) => ({
      dice: state.dice.map((dice, index) =>
        state.locked[index] ? dice : Math.ceil(Math.random() * 6)
      ),
      locked:
        state.rollsLeft > 1 ? state.locked : new Array(NUM_DICE).fill(true),
      rollsLeft: state.rollsLeft - 1,
      isRolling: false
    }));
  }

  doScore(ruleName, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState((state) => ({
      scores: { ...state.scores, [ruleName]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.animateRoll();
  }

  toggleLocked(index) {
    if (this.state.rollsLeft > 0 && !this.state.isRolling) {
      // toggle whether idx is in locked or not
      this.setState((state) => ({
        locked: [
          ...state.locked.slice(0, index),
          !state.locked[index],
          ...state.locked.slice(index + 1)
        ]
      }));
    }
  }

  displayRollInfo() {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round..."
    ];
    return messages[this.state.rollsLeft];
  }

  render() {
    const { dice, locked, rollsLeft, isRolling, scores } = this.state;

    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              dice={dice}
              locked={locked}
              disabled={rollsLeft === 0}
              isRolling={isRolling}
              handleClick={this.toggleLocked}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={
                  locked.every((x) => x) || rollsLeft === 0 || isRolling
                }
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable
          scores={scores}
          isRolling={isRolling}
          doScore={this.doScore}
        />
      </div>
    );
  }
}
