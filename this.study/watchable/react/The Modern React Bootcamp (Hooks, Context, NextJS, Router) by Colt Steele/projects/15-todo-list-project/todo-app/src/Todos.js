import { Component } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { Todo } from "./Todo";
import "./Todos.css";

export class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [] };

    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  remove(id) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }));
  }

  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    this.setState({ todos: updatedTodos });
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <Todo
        key={todo.id}
        id={todo.id}
        task={todo.task}
        isCompleted={todo.isCompleted}
        removeTodo={this.remove}
        updateTodo={this.update}
        toggleCompletion={this.toggleCompletion}
      />
    ));

    return (
      <div className="todos">
        <h1 className="todos__title">
          Todo List!{" "}
          <span className="todos__info">A simple React todo list app.</span>
        </h1>
        <ul className="todos__list">{todos}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}
