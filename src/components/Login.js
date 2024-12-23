import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => { // Pass setIsLoggedIn as prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await login(userData);
      alert("Login Successful");

      // Set login state immediately
      localStorage.setItem("isLoggedIn", true);

      // Update isLoggedIn state here directly
      setIsLoggedIn(true);  // Set this state in the parent component (App.js)
      
      // Navigate immediately after login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
