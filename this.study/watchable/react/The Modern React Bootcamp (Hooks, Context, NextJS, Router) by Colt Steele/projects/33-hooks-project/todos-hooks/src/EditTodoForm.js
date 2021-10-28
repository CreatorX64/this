import { TextField } from "@mui/material";
import useInputState from "./hooks/useInputState";

export default function EditTodoForm(props) {
  const [value, handleChange, reset] = useInputState(props.task);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.editTodo(props.id, value);
        reset();
        props.toggleIsEditing();
      }}
      style={{ marginLeft: "1rem", marginRight: "1rem", width: "100%" }}
    >
      <TextField
        variant="standard"
        margin="normal"
        value={value}
        onChange={handleChange}
        fullWidth
        autoFocus
      />
    </form>
  );
}
