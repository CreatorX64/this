import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/components/SearchBar.module.css";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = encodeURIComponent(term.trim());

    if (!query) {
      return;
    }

    navigate(`/search?q=${query}`);
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          required
          type="text"
          id="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
