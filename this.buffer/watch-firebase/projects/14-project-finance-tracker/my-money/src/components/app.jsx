import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "@/hooks/auth-context";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/sign-up";
import Navbar from "@/components/navbar";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div>
      {isAuthReady && (
        <>
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
              path="/sign-up"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
