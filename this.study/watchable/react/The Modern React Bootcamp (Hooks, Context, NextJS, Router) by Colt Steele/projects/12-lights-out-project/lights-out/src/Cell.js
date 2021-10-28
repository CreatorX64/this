import { Component } from "react";
import "./Cell.css";

export class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.flipCellsAroundMe(this.props.cellKey);
  }

  render() {
    let classes = `cell${this.props.isLit ? " cell--lit" : ""}`;
    return <td className={classes} onClick={this.handleClick} />;
  }
}
