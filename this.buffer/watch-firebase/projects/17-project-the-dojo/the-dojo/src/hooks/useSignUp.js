import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setErrorMessage(null);
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

      if (!isCancelled) {
        setErrorMessage(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setErrorMessage(err.message);
      }
    } finally {
      if (!isCancelled) {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { signUp, isPending, errorMessage };
};

export default useSignUp;
