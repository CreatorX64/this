import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTodoForm.css";

export class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };
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
    this.props.createTodo({ ...this.state, id: uuidv4(), isCompleted: false });
    this.setState({ task: "" });
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.handleSubmit}>
        <label className="new-todo-form__label" htmlFor="task">
          New todo:{" "}
        </label>
        <input
          className="new-todo-form__input"
          type="text"
          id="task"
          name="task"
          placeholder="New todo"
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button className="new-todo-form__button">Add todo</button>
      </form>
    );
  }
}
