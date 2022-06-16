import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(fbAuth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
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

  return { login, isPending, error };
};

export default useLogin;
