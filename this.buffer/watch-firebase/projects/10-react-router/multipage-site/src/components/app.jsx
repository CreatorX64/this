import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Contact from "../pages/contact";
import About from "../pages/about";
import Article from "../pages/article";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <h1>My Articles</h1>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/contact"
        >
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
