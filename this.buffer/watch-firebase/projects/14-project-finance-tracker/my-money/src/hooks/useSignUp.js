import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useSignUp = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // Sign up
      const res = await createUserWithEmailAndPassword(fbAuth, email, password);

      if (!res) {
        throw new Error("Could not complete sign up");
      }

      // Add display name to new user
      await updateProfile(res.user, { displayName });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { signUp, isPending, error };
};

export default useSignUp;
