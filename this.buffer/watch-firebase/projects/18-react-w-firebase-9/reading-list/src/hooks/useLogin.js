import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { LOGIN } from "../context/AuthContext";

export function useLogin() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setError(null);

    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      dispatch({ type: LOGIN, payload: credential.user });
    } catch (error) {
      setError(error.message);
    }
  }

  return { error, login };
}
