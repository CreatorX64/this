import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTH_READY = "AUTH_READY";

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthReady: false
};

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_READY:
      return { ...state, user: action.payload, isAuthReady: true };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      throw new Error("Unkown action type in authReducer()");
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Dispatch an action once when auth is ready (to prevent page/component flickering)
  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      dispatch({ type: AUTH_READY, payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
