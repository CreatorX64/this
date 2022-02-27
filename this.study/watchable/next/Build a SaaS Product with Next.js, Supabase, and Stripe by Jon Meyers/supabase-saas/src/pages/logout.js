import { useEffect } from "react";
import { useUserContext } from "../context/user";

export default function LogoutPage() {
  const { logout } = useUserContext();

  useEffect(logout, []);

  return <p>Logging out</p>;
}
