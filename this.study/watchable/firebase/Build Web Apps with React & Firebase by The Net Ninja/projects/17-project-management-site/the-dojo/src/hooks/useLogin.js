import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setError(null);
    setIsPending(true);

    try {
      let credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await updateDoc(doc(firebaseFirestore, "users", credential.user.uid), {
        online: true
      });

      dispatch({ type: "LOGIN", payload: credential.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      console.log(err.message);

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

  return { isPending, error, login };
}
