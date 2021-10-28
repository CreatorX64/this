import { Component } from "react";
import "./WiseSquare.css";

export class WiseSquare extends Component {
  static defaultProps = {
    messages: [
      "A fool thinks himself to be wise, but a wise man knows himself to be a fool.",
      "Educating the mind without educating the heart is no education at all.",
      "Not everything that is faced can be changed, but nothing can be changed until it is faced."
    ]
  };

  constructor(props) {
    super(props);
    this.dispenseWisdom = this.dispenseWisdom.bind(this);
  }

  dispenseWisdom() {
    const { messages } = this.props;
    const rIndex = Math.floor(Math.random() * messages.length);
    console.log(messages[rIndex]);
  }

  render() {
    return (
      <div className="wise-square" onMouseEnter={this.dispenseWisdom}>
        🤔
      </div>
    );
  }
}
