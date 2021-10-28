import { Component } from "react";

export class About extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="About">
        <h1>About Page</h1>
        <p>Forget me. What about you?</p>
      </div>
    );
  }
}
