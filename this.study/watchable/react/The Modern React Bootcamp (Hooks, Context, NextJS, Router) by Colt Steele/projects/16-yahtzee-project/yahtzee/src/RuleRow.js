import { Component } from "react";
import "./RuleRow.css";

export class RuleRow extends Component {
  render() {
    const { score, name, description, isRolling, doScore } = this.props;
    const isActive = score === null;

    return (
      <tr
        className={`RuleRow RuleRow-${isActive ? "active" : "disabled"}`}
        onClick={isActive && !isRolling ? doScore : null}
      >
        <td className="RuleRow-name">{name}</td>
        <td className="RuleRow-score">{isActive ? description : score}</td>
      </tr>
    );
  }
}
