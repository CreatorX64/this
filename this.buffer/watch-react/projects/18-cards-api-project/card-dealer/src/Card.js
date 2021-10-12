import { Component } from "react";
import "./Card.css";

export class Card extends Component {
  constructor(props) {
    super(props);
    const angle = Math.random() * 90 - 45;
    const xPos = Math.random() * 40 - 20;
    const yPos = Math.random() * 40 - 20;
    this.transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }

  render() {
    return (
      <img
        className="Card"
        src={this.props.imageUrl}
        alt={this.props.name}
        style={{ transform: this.transform }}
      />
    );
  }
}
