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
      dice: new Array(NUM_DICE).fill(null),
      locked: new Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };

    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState((state) => ({
      dice: state.dice.map((dice, idx) =>
        state.locked[idx] ? dice : Math.ceil(Math.random() * 6)
      ),
      locked: state.rollsLeft > 1 ? state.locked : Array(NUM_DICE).fill(true),
      rollsLeft: state.rollsLeft - 1
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.setState((state) => ({
      locked: [
        ...state.locked.slice(0, idx),
        !state.locked[idx],
        ...state.locked.slice(idx + 1)
      ]
    }));
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState((state) => ({
      scores: { ...state.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={this.state.locked.every((x) => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}
