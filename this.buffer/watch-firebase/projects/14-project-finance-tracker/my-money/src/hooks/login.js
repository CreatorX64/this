import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";
import { LOGIN } from "@/context/auth";
import { useAuthContext } from "@/hooks/auth-context";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      dispatch({ type: LOGIN, payload: credential.user });

      setError(null);
      setIsPending(false);
      console.log("here");
    } catch (err) {
      console.log(err.message);

      setError(err.message);
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
