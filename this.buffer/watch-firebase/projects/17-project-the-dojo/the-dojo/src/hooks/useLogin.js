import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setErrorMessage(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(fbAuth, email, password);
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

  return { login, isPending, errorMessage };
};

export default useLogin;
