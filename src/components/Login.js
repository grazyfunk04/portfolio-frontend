import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import image from '../image.png'

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await login(userData);
      console.log("Login response:", response);

      if (response && response.status === "success") {
        // const { id, username, email } = response.data;
        const token = response.token;
        // localStorage.setItem("userId", id);
        // localStorage.setItem("username", username);
        // localStorage.setItem("email", email);
        console.log(token);
        localStorage.setItem("token", token);

        alert("Login Successful");

        localStorage.setItem("isLoggedIn", true);

        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        console.error("Response status is not success:", response);
        alert("Error: Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="flex items-center p-2 justify-center">
        <img src={image} width={140} height={140} />
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Poppins' }}>Stocks Byte</h1>
      </div>
      <div className="min-h-screen flex justify-center items-center -mt-40 ml-8">
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
    </>
  );
};

export default Login;

// adding comment here