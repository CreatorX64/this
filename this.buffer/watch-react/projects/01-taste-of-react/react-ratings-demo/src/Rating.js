import { Component } from "react";
import { Star } from "./Star";

export class Rating extends Component {
  static defaultProps = { max: 5 };

  constructor(props) {
    super(props);

    this.state = {
      dynamicValue: props.stars,
      value: 0
    };

    this._colors = {
      1: "#f44336",
      2: "#FF5722",
      3: "#FF9800",
      4: "#FFC107",
      5: "#FFEB3B"
    };
    this._meanings = {
      0: "No Rating 🚫",
      1: "Terrible 🤮",
      2: "Mediocre 😒",
      3: "Average 😐",
      4: "Solid 🙂",
      5: "Fantastic 🔥"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(newValue) {
    this.setState({
      value: newValue,
      dynamicValue: newValue
    });
  }

  handleMouseEnter(newValue) {
    this.setState({ dynamicValue: newValue });
  }

  handleMouseLeave() {
    this.setState({ dynamicValue: this.state.value });
  }

  render() {
    const { dynamicValue, value } = this.state;
    const { max } = this.props;
    const stars = [];

    for (let i = 1; i <= max; i++) {
      stars.push(
        <Star
          key={i}
          color={this._colors[dynamicValue]}
          isFilled={i <= dynamicValue}
          value={i}
          handleHover={this.handleMouseEnter}
          handleHoverLeave={this.handleMouseLeave}
          handleClick={this.handleClick}
        />
      );
    }

    return (
      <div>
        <p>{this._meanings[value]}</p>
        {stars}
      </div>
    );
  }
}
