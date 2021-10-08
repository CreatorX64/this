import { Component } from "react";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { uname: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ uname: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`You typed: ${this.state.uname}`);
    this.setState({ uname: "" });
  }

  render() {
    return (
      <div>
        <h1>Form Demo</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={this.state.uname}
            onChange={this.handleChange}
          />
          <button>Submit!</button>
        </form>
      </div>
    );
  }
}
