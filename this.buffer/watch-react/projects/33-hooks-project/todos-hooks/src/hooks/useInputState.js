import { useState } from "react";

export default function useInputState(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function reset() {
    setValue("");
  }

  return [value, handleChange, reset];
}
