import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { SearchBar } from "./SearchBar";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { color } = useTheme();

  return (
    <div className={styles.navbar} style={{ backgroundColor: color }}>
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
