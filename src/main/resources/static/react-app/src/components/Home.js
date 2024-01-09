// src/Home.js
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Home.css';

const Home = ({ onLogout }) => {
  // Check if logged in, otherwise navigate to login
  const isLoggedIn = true; // You would replace this with your actual authentication check
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <h2>Welcome to the Home Page!</h2>
      <button onClick={onLogout}>Logout</button>
      <p>
        Go back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Home;
