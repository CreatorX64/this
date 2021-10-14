import React, { Component } from "react";
import "./Message.css";

export class Message extends Component {
  render() {
    return <div className="Message">{this.props.children}</div>;
  }
}
