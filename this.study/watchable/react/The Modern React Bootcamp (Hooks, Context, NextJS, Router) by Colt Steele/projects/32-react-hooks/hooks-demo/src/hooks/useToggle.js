import { useState } from "react";

export default function useToggle(initialValue = false) {
  // Reserve piece of state.
  const [state, setState] = useState(initialValue);

  function toggleState() {
    setState(!state);
  }

  return [state, toggleState];
}
