import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import "./index.css";
import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
  );
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    navigate("/");
  };

  const handleRegisterSuccess = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    navigate("/");
  };

  useEffect(() => {
    if (!authToken) {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute authToken={authToken}>
            <Home authToken={authToken}/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute authToken={authToken}>
            <Bookings authToken={authToken}/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute authToken={authToken}>
            <Events authToken={authToken} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={<RegisterPage onRegisterSuccess={handleRegisterSuccess} />}
      />
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
      />
    </Routes>
  );
}

export default App;
