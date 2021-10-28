import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export class NewBoxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      width: "",
      backgroundColor: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newBox = { ...this.state, id: uuidv4() };
    this.props.addBox(newBox);
    this.setState({
      height: "",
      width: "",
      backgroundColor: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="height">Height: </label>
          <input
            type="text"
            id="height"
            name="height"
            value={this.state.height}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="width">Width: </label>
          <input
            type="text"
            id="width"
            name="width"
            value={this.state.width}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="background-color">Background color: </label>
          <input
            type="text"
            id="background-color"
            name="backgroundColor"
            value={this.state.backgroundColor}
            onChange={this.handleChange}
          />
        </div>
        <button>Add a new box!</button>
      </form>
    );
  }
}
