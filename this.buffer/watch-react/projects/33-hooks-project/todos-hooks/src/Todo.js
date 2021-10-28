import { Fragment } from "react";
import {
  Checkbox,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import EditTodoForm from "./EditTodoForm";
import useToggleState from "./hooks/useToggleState";

export default function Todo(props) {
  const [isEditing, toggleIsEditing] = useToggleState(false);

  return (
    <ListItem style={{ height: "64px" }}>
      {isEditing ? (
        <EditTodoForm
          id={props.id}
          editTodo={props.editTodo}
          task={props.task}
          toggleIsEditing={toggleIsEditing}
        />
      ) : (
        <Fragment>
          <Checkbox
            tabIndex={-1}
            checked={props.completed}
            onClick={() => props.toggleTodo(props.id)}
          />
          <ListItemText
            style={{
              textDecoration: props.completed ? "line-through" : "none"
            }}
          >
            {props.task}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => props.removeTodo(props.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Edit" onClick={toggleIsEditing}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </Fragment>
      )}
    </ListItem>
  );
}
