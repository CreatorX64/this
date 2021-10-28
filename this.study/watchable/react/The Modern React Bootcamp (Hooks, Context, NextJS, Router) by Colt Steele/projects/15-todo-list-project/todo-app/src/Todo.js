import { Component } from "react";
import "./Todo.css";

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      task: this.props.task
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleRemove() {
    this.props.removeTodo(this.props.id);
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleToggle() {
    this.props.toggleCompletion(this.props.id);
  }

  render() {
    let result;

    if (this.state.isEditing) {
      result = (
        <div className="todo">
          <form className="todo__edit-form" onSubmit={this.handleUpdate}>
            <input
              className="todo__edit-input"
              type="text"
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button className="todo__edit-button">Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="todo">
          <li
            className={
              this.props.isCompleted
                ? "todo__task todo__task--completed"
                : "todo__task"
            }
            onClick={this.handleToggle}
          >
            {this.props.task}
          </li>
          <div className="todo__buttons">
            <button className="todo__button" onClick={this.toggleForm}>
              <i className="fas fa-pen"></i>
            </button>
            <button className="todo__button" onClick={this.handleRemove}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      );
    }

    return result;
  }
}
