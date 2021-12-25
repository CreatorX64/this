import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  async function logout() {
    setError(null);
    setIsPending(true);

    try {
      // Update online status
      await updateDoc(doc(firebaseFirestore, "users", user.uid), {
        online: false
      });

      // Sign the user out
      await signOut(firebaseAuth);

      // Dispatch logout action
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      console.log(err);

      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { isPending, error, logout };
}
