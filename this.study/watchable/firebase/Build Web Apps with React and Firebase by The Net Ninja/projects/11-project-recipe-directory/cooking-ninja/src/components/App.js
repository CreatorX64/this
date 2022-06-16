import { Routes, Route } from "react-router-dom";

import styles from "components/App.module.css";
import Navbar from "components/Navbar";
import Home from "pages/home/Home";
import Create from "pages/create/Create";
import Search from "pages/search/Search";
import Recipe from "pages/recipe/Recipe";

const App = () => (
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

export default App;
