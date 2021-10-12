import { Component } from "react";
import "./Die.css";

export class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    value: 1
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.index);
  }

  render() {
    const { value, locked, numberWords, disabled, isRolling } = this.props;
    let classes = `Die fas fa-4x fa-dice-${numberWords[value - 1]}`;
    if (locked) {
      classes += " Die-locked";
    }
    if (isRolling) {
      classes += " Die-rolling";
    }

    return (
      <i className={classes} onClick={this.handleClick} disabled={disabled} />
    );
  }
}
