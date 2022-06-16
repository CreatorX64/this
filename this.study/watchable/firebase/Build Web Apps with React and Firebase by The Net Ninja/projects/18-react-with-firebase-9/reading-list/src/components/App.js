import { Routes, Route, Navigate } from "react-router-dom";

import useAuthContext from "hooks/useAuthContext";
import Navbar from "components/Navbar";
import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";

const App = () => {
  const { isAuthReady, user } = useAuthContext();

  return (
    isAuthReady && (
      <div className="App">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
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
    )
  );
};

export default App;
