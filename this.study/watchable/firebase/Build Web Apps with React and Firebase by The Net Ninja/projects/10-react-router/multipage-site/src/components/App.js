import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import styles from "styles/App.module.css";
import Home from "pages/Home";
import Contact from "pages/Contact";
import About from "pages/About";
import Article from "pages/Article";

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
