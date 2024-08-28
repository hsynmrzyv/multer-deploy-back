// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

// Hooks
import { useEffect } from "react";

// Router
import { Routes, Route, useNavigate } from "react-router-dom";

// Cookie
import Cookies from "js-cookie";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("jwt"); // Check if the cookie exists

    if (!jwt) {
      navigate("/sign-in"); // Navigate to sign-in page if the cookie is not found
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default App;
