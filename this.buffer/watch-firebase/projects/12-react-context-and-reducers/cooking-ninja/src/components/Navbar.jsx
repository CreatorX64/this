import { Link } from "react-router-dom";
import { useThemeContext } from "@/hooks/theme-context";
import SearchBar from "@/components/search-bar";
import styles from "@/components/navbar.module.css";

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
