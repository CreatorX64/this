import { Component } from "react";
import "./Food.css";

export class Food extends Component {
  render() {
    // const url = `https://source.unsplash.com/1600x900/?${this.props.name}`;

    const { name } = this.props.match.params;
    const url = `https://source.unsplash.com/1600x900/?${name}`;

    return (
      <div className="Food">
        {/* <h1>I love to eat {this.props.name}</h1>
        <img src={url} alt={this.props.name} /> */}

        <h1>I love to eat {name}</h1>
        <img src={url} alt={name} />
      </div>
    );
  }
}
