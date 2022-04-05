import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { LOGIN } from "../context/AuthContext";

export function useSignUp() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  async function signUp(email, password) {
    setError(null); // In case there was an error attempt before

    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      dispatch({ type: LOGIN, payload: credential.user });
    } catch (error) {
      setError(error.message);
    }
  }

  return { error, signUp };
}
