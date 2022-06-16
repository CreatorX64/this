import { signOut } from "firebase/auth";

import { fbAuth } from "lib/firebase";
import useAuthContext from "hooks/useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    signOut(fbAuth)
      .then(() => dispatch({ type: "LOGOUT" }))
      .catch((error) => console.log(error.message));
  };

  return { logout };
};

export default useLogout;
