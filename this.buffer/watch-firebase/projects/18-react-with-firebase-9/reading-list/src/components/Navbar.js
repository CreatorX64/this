import { Link } from "react-router-dom";

import useAuthContext from "hooks/useAuthContext";
import useLogout from "hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav>
      <h1>My Reading List</h1>

      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
