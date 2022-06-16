import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { fbAuth, fbFirestore } from "lib/firebase";
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
      // Sign the user in
      const res = await signInWithEmailAndPassword(fbAuth, email, password);

      // Update online status
      await updateDoc(doc(fbFirestore, "users", res.user.uid), {
        online: true
      });

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
