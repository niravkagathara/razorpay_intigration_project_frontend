import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";
import StatusCheck from "./components/StatusCheck";
import Payment from "./components/Payment";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter> 
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/status" element={<StatusCheck />} />
      <Route path="/payment" element={<Payment />} />

      {/* Login Route */}
      <Route
        path="/admin"
        element={
          !isLoggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminDashboard />
            </ProtectedRoute>
          )
        }
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;