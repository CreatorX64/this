import { Link } from "react-router-dom";

import useAuthContext from "hooks/useAuthContext";
import useLogout from "hooks/useLogout";
import styles from "components/Navbar.module.css";
import templeIcon from "assets/temple.svg";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.logo}>
          <Link to="/">
            <img src={templeIcon} alt="The Dojo Logo" />
            <span>The Dojo</span>
          </Link>
        </li>

        {user ? (
          <li>
            {isPending ? (
              <button className="btn" disabled>
                Logging Out...
              </button>
            ) : (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
