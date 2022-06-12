import { Routes, Route } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import Create from "pages/Create";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Project from "pages/Project";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import styles from "components/App.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.container}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
