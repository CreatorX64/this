import { Component } from "react";

export class Box extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            width: `${this.props.width}em`,
            height: `${this.props.height}em`,
            backgroundColor: this.props.backgroundColor
          }}
        ></div>
        <button onClick={this.props.removeBox}>Remove The Box!</button>
      </div>
    );
  }
}
