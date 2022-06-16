import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = (email, password) => {
    setErrorMessage(null);

    createUserWithEmailAndPassword(fbAuth, email, password)
      .then((res) => dispatch({ type: "LOGIN", payload: res.user }))
      .catch((error) => setErrorMessage(error.message));
  };

  return { errorMessage, signUp };
};

export default useSignUp;
