import { createContext, useReducer } from "react";

const CHANGE_COLOR = "CHANGE_COLOR";
const CHANGE_MODE = "CHANGE_MODE";

const themeReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, color: action.payload };
    case CHANGE_MODE:
      return { ...state, mode: action.payload };
    default:
      throw new Error("Unkown action type in themeReducer()");
  }
};

const initialState = {
  color: "#58249c",
  mode: "light"
};

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const changeColor = (color) => {
    dispatch({ type: CHANGE_COLOR, payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: CHANGE_MODE, payload: mode });
  };

  const exposedState = {
    ...state,
    changeColor,
    changeMode
  };

  return (
    <ThemeContext.Provider value={exposedState}>
      {children}
    </ThemeContext.Provider>
  );
};
