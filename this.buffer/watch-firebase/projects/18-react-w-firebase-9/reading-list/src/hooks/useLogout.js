import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { LOGOUT } from "../context/AuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  async function logout() {
    try {
      await signOut(firebaseAuth);
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.log(error.message);
    }
  }

  return { logout };
}
