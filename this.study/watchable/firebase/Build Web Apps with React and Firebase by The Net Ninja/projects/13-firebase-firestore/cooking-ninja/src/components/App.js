import { Routes, Route } from "react-router-dom";

import useThemeContext from "hooks/useThemeContext";
import Home from "pages/Home";
import Create from "pages/Create";
import Search from "pages/Search";
import Recipe from "pages/Recipe";
import Navbar from "components/Navbar";
import ThemeSelector from "components/ThemeSelector";
import styles from "components/App.module.css";

const App = () => {
  const { mode } = useThemeContext();

  return (
    <div className={`${styles.app} ${styles[mode]}`}>
      <Navbar />

      <ThemeSelector />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes/:id" element={<Recipe />} />
      </Routes>
    </div>
  );
};

export default App;
