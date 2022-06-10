import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { fbAuth } from "lib/firebase";

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
    case "AUTH_READY":
      return {
        ...state,
        isAuthReady: true,
        user: action.payload
      };
    default:
      throw new Error("Unknown action type in authReducer()");
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false
  });

  const exposedState = { ...state, dispatch };

  useEffect(() => {
    const unsub = onAuthStateChanged(fbAuth, (user) => {
      dispatch({ type: "AUTH_READY", payload: user });
      unsub();
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={exposedState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
