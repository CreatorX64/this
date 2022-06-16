import { Routes, Route, Navigate } from "react-router-dom";

import useAuthContext from "hooks/useAuthContext";
import Dashboard from "pages/Dashboard";
import Create from "pages/Create";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Project from "pages/Project";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import OnlineUsers from "components/OnlineUsers";
import styles from "styles/App.module.css";

const App = () => {
  const { user, isAuthReady } = useAuthContext();

  return (
    <div className={styles.app}>
      {isAuthReady && (
        <>
          {user && <Sidebar />}

          <div className={styles.container}>
            <Navbar />

            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <SignUp /> : <Navigate to="/" />}
              />
            </Routes>
          </div>

          {user && <OnlineUsers />}
        </>
      )}
    </div>
  );
};

export default App;
