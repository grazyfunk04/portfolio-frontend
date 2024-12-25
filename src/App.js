import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <div>
          <Routes>
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Navbar setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage/>}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
