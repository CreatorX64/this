import { Component } from "react";
import { BetterNumberItem } from "./BetterNumberItem";

export class BetterNumberList extends Component {
  constructor(props) {
    super(props);
    this.state = { nums: [1, 2, 3, 4, 5] };
    this.remove = this.remove.bind(this);
  }

  remove(numToDelete) {
    this.setState((st) => ({
      nums: st.nums.filter((num) => num !== numToDelete)
    }));
  }

  render() {
    const numItems = this.state.nums.map((num, idx) => (
      <BetterNumberItem key={idx} value={num} remove={this.remove} />
    ));
    return (
      <div>
        <h1>Better Number List</h1>
        <ul>{numItems}</ul>
      </div>
    );
  }
}
