import { Component } from "react";
import "./Ball.css";

export class Ball extends Component {
  render() {
    return <div className="ball">{this.props.num}</div>;
  }
}
