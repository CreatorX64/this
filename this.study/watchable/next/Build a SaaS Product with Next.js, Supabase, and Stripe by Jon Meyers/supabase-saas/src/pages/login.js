import { useEffect } from "react";
import { useUserContext } from "../context/user";

export default function LoginPage() {
  const { login } = useUserContext();

  useEffect(login, []);

  return <p>Logging in</p>;
}
