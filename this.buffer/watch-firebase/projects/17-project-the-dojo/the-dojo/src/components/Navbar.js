import { Link } from "react-router-dom";

import styles from "components/Navbar.module.css";
import templeIcon from "assets/temple.svg";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.logo}>
          <Link to="/">
            <img src={templeIcon} alt="The Dojo Logo" />
            <span>The Dojo</span>
          </Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>

        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
