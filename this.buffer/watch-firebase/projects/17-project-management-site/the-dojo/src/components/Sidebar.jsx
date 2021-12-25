import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Avatar } from "./Avatar";
import styles from "./Sidebar.module.css";
import dashboardIcon from "../assets/dashboard-icon.svg";
import addIcon from "../assets/add-icon.svg";

export function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.user}>
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                <img src={dashboardIcon} alt="Dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                <img src={addIcon} alt="Add project icon" />
                <span>New project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
