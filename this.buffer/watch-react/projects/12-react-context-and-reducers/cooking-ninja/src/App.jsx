import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { Home } from "./pages/home/Home";
import { Create } from "./pages/create/Create";
import { Search } from "./pages/search/Search";
import { Recipe } from "./pages/recipe/Recipe";
import { Navbar } from "./components/Navbar";
import { ThemeSelector } from "./components/ThemeSelector";
import styles from "./App.module.css";

export const App = () => {
  const { mode } = useTheme();

  return (
    <div className={`${styles.app} ${styles[mode] ?? ""}`}>
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
