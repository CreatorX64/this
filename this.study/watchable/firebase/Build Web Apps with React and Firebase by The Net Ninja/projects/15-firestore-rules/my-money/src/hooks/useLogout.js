import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(fbAuth);
      dispatch({ type: "LOGOUT" });

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

  return { logout, isPending, error };
};

export default useLogout;
