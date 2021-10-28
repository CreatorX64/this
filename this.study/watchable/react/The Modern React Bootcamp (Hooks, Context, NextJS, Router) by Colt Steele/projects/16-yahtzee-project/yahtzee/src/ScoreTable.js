import { Component } from "react";
import { RuleRow } from "./RuleRow";
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
} from "./Rules";
import "./ScoreTable.css";

export class ScoreTable extends Component {
  getTotalScore() {
    const { scores } = this.props;
    let totalScore = 0;
    for (let key in scores) {
      if (scores[key] !== null) {
        totalScore += scores[key];
      }
    }
    return totalScore;
  }

  render() {
    const { scores, isRolling, doScore } = this.props;

    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <h2>Upper</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow
                name="Ones"
                score={scores.ones}
                description={ones.description}
                isRolling={isRolling}
                doScore={() => doScore("ones", ones.evalRoll)}
              />
              <RuleRow
                name="Twos"
                score={scores.twos}
                description={twos.description}
                isRolling={isRolling}
                doScore={() => doScore("twos", twos.evalRoll)}
              />
              <RuleRow
                name="Threes"
                score={scores.threes}
                description={threes.description}
                isRolling={isRolling}
                doScore={() => doScore("threes", threes.evalRoll)}
              />
              <RuleRow
                name="Fours"
                score={scores.fours}
                description={fours.description}
                isRolling={isRolling}
                doScore={() => doScore("fours", fours.evalRoll)}
              />
              <RuleRow
                name="Fives"
                score={scores.fives}
                description={fives.description}
                isRolling={isRolling}
                doScore={() => doScore("fives", fives.evalRoll)}
              />
              <RuleRow
                name="Sixes"
                score={scores.sixes}
                description={sixes.description}
                isRolling={isRolling}
                doScore={() => doScore("sixes", sixes.evalRoll)}
              />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <h2>Lower</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow
                name="Three of Kind"
                score={scores.threeOfKind}
                description={threeOfKind.description}
                isRolling={isRolling}
                doScore={() => doScore("threeOfKind", threeOfKind.evalRoll)}
              />
              <RuleRow
                name="Four of Kind"
                score={scores.fourOfKind}
                description={fourOfKind.description}
                isRolling={isRolling}
                doScore={() => doScore("fourOfKind", fourOfKind.evalRoll)}
              />
              <RuleRow
                name="Full House"
                score={scores.fullHouse}
                description={fullHouse.description}
                isRolling={isRolling}
                doScore={() => doScore("fullHouse", fullHouse.evalRoll)}
              />
              <RuleRow
                name="Small Straight"
                score={scores.smallStraight}
                description={smallStraight.description}
                isRolling={isRolling}
                doScore={() => doScore("smallStraight", smallStraight.evalRoll)}
              />
              <RuleRow
                name="Large Straight"
                score={scores.largeStraight}
                description={largeStraight.description}
                isRolling={isRolling}
                doScore={() => doScore("largeStraight", largeStraight.evalRoll)}
              />
              <RuleRow
                name="Yahtzee"
                score={scores.yahtzee}
                description={yahtzee.description}
                isRolling={isRolling}
                doScore={() => doScore("yahtzee", yahtzee.evalRoll)}
              />
              <RuleRow
                name="Chance"
                score={scores.chance}
                description={chance.description}
                isRolling={isRolling}
                doScore={() => doScore("chance", chance.evalRoll)}
              />
            </tbody>
          </table>
        </section>
        <h2>TOTAL SCORE: {this.getTotalScore()}</h2>
      </div>
    );
  }
}
