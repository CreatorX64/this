import { Paper, List } from "@mui/material";
import Todo from "./Todo";

export default function TodoList(props) {
  if (props.todos.length > 0) {
    return (
      <Paper>
        <List>
          {props.todos.map((todo) => (
            <Todo
              {...todo}
              key={todo.id}
              removeTodo={props.removeTodo}
              toggleTodo={props.toggleTodo}
              editTodo={props.editTodo}
            />
          ))}
        </List>
      </Paper>
    );
  }

  return null;
}
