import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import image from '../image.png';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, email, password };
      const response = await signup(userData);

      console.log(response);
      toast.success("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.error("Error during signup", error);

      toast.error("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="flex items-center p-2 justify-center">
        <img src={image} width={140} height={140} alt="Logo" />
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Poppins' }}>Stocks Byte</h1>
      </div>
      <div className="min-h-screen flex justify-center items-center -mt-36 ml-8">
        <div className="p-8 bg-white shadow-lg rounded-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
