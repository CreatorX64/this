import { useState } from "react";

export default function useToggleState(initialValue = false) {
  // Reserve piece of state.
  const [value, setValue] = useState(initialValue);

  function toggleValue() {
    setValue(!value);
  }

  return [value, toggleValue];
}
