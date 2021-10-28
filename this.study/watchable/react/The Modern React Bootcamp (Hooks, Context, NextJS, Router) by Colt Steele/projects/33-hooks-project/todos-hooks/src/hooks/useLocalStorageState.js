import { useState, useEffect } from "react";

export default function useLocalStorageState(key, defaultValue) {
  // Make piece of state based off of value in localStorage (or default).
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch (error) {
      value = defaultValue;
    }
    return value;
  });

  // Use useEffect to update localStorage when state changes.
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
