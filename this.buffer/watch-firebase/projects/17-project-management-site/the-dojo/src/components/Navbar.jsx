import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import styles from "./Navbar.module.css";
import templeIcon from "../assets/temple-icon.svg";

export function Navbar() {
  const { isPending, logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.logo}>
          <img src={templeIcon} alt="The Dojo logo" />
          <span>The Dojo</span>
        </li>

        {user ? (
          <li>
            {isPending ? (
              <button className="btn" disabled>
                Logging out...
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
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
