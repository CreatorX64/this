import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export function Navbar() {
  const { logout } = useLogout();

  return (
    <nav>
      <h1>My Reading List</h1>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
}
