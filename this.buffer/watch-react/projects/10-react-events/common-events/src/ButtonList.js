import { Component } from "react";
import "./ButtonList.css";

export class ButtonList extends Component {
  static defaultProps = {
    colors: ["#e056fd", "#eb4d4b", "#badc58", "#f0932b"]
  };

  constructor(props) {
    super(props);
    this.state = { color: "#fff" };
  }

  changeColor(color) {
    this.setState({ color });
  }

  render() {
    return (
      <div
        className="button-list"
        style={{ backgroundColor: this.state.color }}
      >
        {this.props.colors.map((color, idx) => {
          return (
            <button
              key={idx}
              className="button-list__button"
              style={{ backgroundColor: color }}
              // onClick={this.changeColor.bind(this, color)}
              onClick={() => this.changeColor(color)}
            >
              Click on me!
            </button>
          );
        })}
      </div>
    );
  }
}
