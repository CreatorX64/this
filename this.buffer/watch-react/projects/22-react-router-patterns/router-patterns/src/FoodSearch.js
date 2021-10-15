import { Component } from "react";
import { Link } from "react-router-dom";

export class FoodSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleClick() {
    alert("SAVE YOUR FOOD TO DB!");
    this.props.history.push(`/food/${this.state.query}`);
  }

  render() {
    return (
      <div>
        <h1>Search for a food!</h1>
        <input
          type="text"
          placeholder="Search for a food"
          value={this.state.query}
          onChange={this.handleChange}
        />

        {/* Option 1: Use a Link! */}
        <Link to={`/food/${this.state.query}`}>Go!</Link>

        {/* Option 2: Redirect using history! */}
        <button onClick={this.handleClick}>Save new food!</button>
      </div>
    );
  }
}
