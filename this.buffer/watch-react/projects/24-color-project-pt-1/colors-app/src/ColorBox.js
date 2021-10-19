import { Component } from "react";
import "./ColorBox.css";

export class ColorBox extends Component {
  render() {
    return (
      <div
        style={{ backgroundColor: this.props.backgroundColor }}
        className="ColorBox"
      >
        <span>{this.props.name}</span>
        <span>More</span>
      </div>
    );
  }
}
