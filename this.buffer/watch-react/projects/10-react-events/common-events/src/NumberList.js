import { Component } from "react";
import { NumberItem } from "./NumberItem";

export class NumberList extends Component {
  constructor(props) {
    super(props);
    this.state = { nums: [1, 2, 3, 4, 5] };
  }

  remove(numToDelete) {
    this.setState((st) => ({
      nums: st.nums.filter((num) => num !== numToDelete)
    }));
  }

  render() {
    const numItems = this.state.nums.map((num, idx) => (
      // Here, we create a new function and pass it as a prop (remove) each
      // time React re-renders, for each child component NumberItem. This works,
      // but it's not the best way to handle this. See "BetterNumberList".
      <NumberItem key={idx} value={num} remove={() => this.remove(num)} />
    ));
    return (
      <div>
        <h1>First Number List</h1>
        <ul>{numItems}</ul>
      </div>
    );
  }
}
