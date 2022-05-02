import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Create from "@/pages/create";
import Search from "@/pages/search";
import Recipe from "@/pages/recipe";
import Navbar from "@/components/navbar";
import ThemeSelector from "@/components/theme-selector";
import styles from "@/components/app.module.css";
import { useThemeContext } from "@/hooks/theme-context";

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
