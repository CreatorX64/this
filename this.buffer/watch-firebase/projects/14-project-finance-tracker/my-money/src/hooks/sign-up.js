import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";
import { useAuthContext } from "@/hooks/auth-context";
import { LOGIN } from "@/context/auth";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // Sign up user
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      // Handle errors like network failure
      if (!credential) {
        throw new Error("Couldn't complete sign up");
      }

      // Add display name to user
      await updateProfile(credential.user, { displayName });

      // Dispatch login action
      dispatch({ type: LOGIN, payload: credential.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);

      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signUp };
};
