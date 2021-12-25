import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Article } from "./pages/Article";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <nav>
        <h1>My Articles</h1>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles/:articleId" element={<Article />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
