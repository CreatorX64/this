import { createContext, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      throw new Error("Unknown action type in authReducer()");
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });
  console.log("AuthContext state:", state);

  const exposedState = { ...state, dispatch };

  return (
    <AuthContext.Provider value={exposedState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
