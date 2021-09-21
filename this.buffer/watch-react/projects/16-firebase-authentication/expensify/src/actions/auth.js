import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { LOGIN, LOGOUT } from "./types";
import { googleAuthProvider } from "../firebase/firebase";

const auth = getAuth();

export function login(uid) {
  return {
    type: LOGIN,
    uid
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function startLogin() {
  return function () {
    return signInWithPopup(auth, googleAuthProvider);
  };
}

export function startLogout() {
  return function () {
    return signOut(auth);
  };
}
