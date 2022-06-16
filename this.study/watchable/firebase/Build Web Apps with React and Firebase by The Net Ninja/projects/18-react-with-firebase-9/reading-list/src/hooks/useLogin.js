import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setErrorMessage(null);

    signInWithEmailAndPassword(fbAuth, email, password)
      .then((res) => dispatch({ type: "LOGIN", payload: res.user }))
      .catch((error) => setErrorMessage(error.message));
  };

  return { errorMessage, login };
};

export default useLogin;
