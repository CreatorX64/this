import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Create } from "./pages/create/Create";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Project } from "./pages/project/Project";
import { Navbar } from "./components/Navbar";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import { OnlineUsers } from "./components/OnlineUsers";

export function App() {
  const { isAuthReady, user } = useAuthContext();

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
}
