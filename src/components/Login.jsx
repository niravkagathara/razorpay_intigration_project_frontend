import React, { useState } from "react";

const ADMIN_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "admin123",
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Store login state in localStorage
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "/admin";
      onLogin && onLogin();
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Admin Login
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;