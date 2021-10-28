import { Paper, TextField } from "@mui/material";
import useInputState from "./hooks/useInputState";

export default function TodoForm(props) {
  const [value, handleChange, reset] = useInputState("");

  return (
    <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.addTodo(value);
          reset();
        }}
      >
        <TextField
          variant="standard"
          value={value}
          onChange={handleChange}
          margin="normal"
          label="Add New Todo"
          fullWidth
        />
      </form>
    </Paper>
  );
}
