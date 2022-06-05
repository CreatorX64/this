import { Link } from "react-router-dom";

import styles from "components/Navbar.module.css";
import useThemeContext from "hooks/useThemeContext";
import SearchBar from "components/SearchBar";

const Navbar = () => {
  const { color } = useThemeContext();

  return (
    <div className={styles.navbar} style={{ background: color }}>
      <nav>
        <Link to="/" className={styles.brand}>
          <h1>Cooking Ninja</h1>
        </Link>

        <SearchBar />

        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
