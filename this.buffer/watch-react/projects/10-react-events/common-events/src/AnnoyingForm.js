import { Component } from "react";

export class AnnoyingForm extends Component {
  handleKeyUp(event) {
    if (event.key === "*") {
      alert("I LOVE THE * CHARACTER");
    } else {
      alert("BOO!");
    }
  }

  render() {
    return (
      <div>
        <h2>Try typing in here:</h2>
        <textarea onKeyUp={this.handleKeyUp} />
      </div>
    );
  }
}
