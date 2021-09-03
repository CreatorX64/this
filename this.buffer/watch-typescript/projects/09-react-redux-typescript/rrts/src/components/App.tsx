import { Component } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick(): void {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  }

  onTodoClick(id: number): void {
    this.props.deleteTodo(id);
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo) => (
      <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
        <b>{todo.title}</b>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch Todos</button>
        {this.state.fetching ? "LOADING" : null}
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps({ todos }: StoreState): { todos: Todo[] } {
  return { todos };
}

export const ConnectedApp = connect(mapStateToProps, {
  fetchTodos,
  deleteTodo
})(App);
