import { NavLink } from "react-router-dom";

import styles from "components/Sidebar.module.css";
import dashboardIcon from "assets/dashboard-icon.svg";
import addIcon from "assets/add-icon.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar-content"]}>
        <div className={styles.user}>
          {/* avatar and username here later */}
          <p>Hey, user</p>
        </div>

        <nav className={styles.links}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <img src={dashboardIcon} alt="Dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <img src={addIcon} alt="Add Project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
