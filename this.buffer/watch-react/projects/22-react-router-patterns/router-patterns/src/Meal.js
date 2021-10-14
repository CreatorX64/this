import { Component } from "react";

export class Meal extends Component {
  render() {
    const { foodName, drinkName } = this.props.match.params;
    const foodUrl = `https://source.unsplash.com/1600x900/?${foodName}`;
    const drinkUrl = `https://source.unsplash.com/1600x900/?${drinkName}`;

    return (
      <div>
        <h1>
          THIS IS A MEAL OF {foodName} + {drinkName}
        </h1>
        <img src={foodUrl} alt="Food" />
        <img src={drinkUrl} alt="Drink" />
      </div>
    );
  }
}
