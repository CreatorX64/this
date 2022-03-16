import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router";
import "./App.css";
import { Posts } from "./pages/Posts/Posts";
import { Profile } from "./pages/Profile/Profile";
import { SignUp } from "./pages/SignUp/SignUp";
import { SignIn } from "./pages/SignIn/SignIn";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};
