import { useState } from "react";
import { signOut } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(fbAuth);
      dispatch({ type: "LOGOUT" });
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending, error };
};

export default useLogout;
