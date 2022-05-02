import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import styles from "@/components/Navbar.module.css";

const Navbar = () => (
  <div className={styles.navbar}>
    <nav>
      <Link to="/" className={styles.brand}>
        <h1>Cooking Ninja</h1>
      </Link>
      <SearchBar />
      <Link to="/create">Create Recipe</Link>
    </nav>
  </div>
);

export default Navbar;
