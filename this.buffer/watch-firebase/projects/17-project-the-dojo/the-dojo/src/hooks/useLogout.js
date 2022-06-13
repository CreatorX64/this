import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { fbAuth, fbFirestore } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setErrorMessage(null);
    setIsPending(true);

    try {
      // Since we'll allow only the logged in user to update his online status,
      // we must call updateDoc() before we call the signOut() function
      await updateDoc(doc(fbFirestore, "users", user.uid), { online: false });
      await signOut(fbAuth);

      dispatch({ type: "LOGOUT" });

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

  return { logout, isPending, errorMessage };
};

export default useLogout;
