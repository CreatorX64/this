import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Create } from "./pages/create/Create";
import { Search } from "./pages/search/Search";
import { Recipe } from "./pages/recipe/Recipe";
import { Navbar } from "./components/Navbar";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes/:id" element={<Recipe />} />
      </Routes>
    </div>
  );
};
