import Link from "next/link";
import { useUserContext } from "../context/user";

export function Nav() {
  const { user } = useUserContext();

  return (
    <nav className="flex border-b border-gray-200 py-2 px-6">
      <Link href="/">
        <a>Home</a>
      </Link>

      {user && (
        <Link href="/dashboard">
          <a className="ml-4">Dashboard</a>
        </Link>
      )}

      <Link href="/pricing">
        <a className="ml-4">Pricing</a>
      </Link>

      <div className="ml-auto">
        <Link href={user ? "/logout" : "/login"}>
          <a>{user ? "Logout" : "Login"}</a>
        </Link>
      </div>
    </nav>
  );
}
