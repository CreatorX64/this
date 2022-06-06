import { Routes, Route } from "react-router-dom";

import Navbar from "components/Navbar";
import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
