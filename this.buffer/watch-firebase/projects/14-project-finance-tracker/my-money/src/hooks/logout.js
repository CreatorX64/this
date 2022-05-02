import { useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";
import { LOGOUT } from "@/context/auth";
import { useAuthContext } from "@/hooks/auth-context";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(firebaseAuth);

      dispatch({ type: LOGOUT });

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);

      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, isPending, error };
};
