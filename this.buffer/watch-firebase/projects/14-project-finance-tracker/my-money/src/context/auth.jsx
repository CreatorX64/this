import { createContext, useEffect, useReducer } from "react";
import { firebaseAuth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
const AUTH_READY = "AUTH_READY";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case AUTH_READY:
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      throw new Error("Unknown action type in authReducer()");
  }
};

const initialState = {
  user: null,
  isAuthReady: false
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check Firebase auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      dispatch({ type: AUTH_READY, payload: user });
    });
    // Perform this check only once, not on every aut update. We handle our
    // state changes on auth update ourselves, we only need to check auth
    // status when application first loads
    unsubscribe();
  }, []);

  console.log("AuthContext state:", state);

  const exposedState = {
    ...state,
    dispatch
  };

  return (
    <AuthContext.Provider value={exposedState}>{children}</AuthContext.Provider>
  );
};
