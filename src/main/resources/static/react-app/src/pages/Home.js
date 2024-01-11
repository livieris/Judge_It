// src/Home.js
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/Home.css';
import MyNavbar from '../components/Navbar';

const Home = ({ onLogout }) => {
  // Check if logged in, otherwise navigate to login
  const isLoggedIn = true; // You would replace this with your actual authentication check
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  document.body.classList.add('home-body');
  return (
      <div>
        <MyNavbar />
        <div id="home-container">
        <div className="content">
          <h2>Welcome to the Home Page!</h2>
          <button onClick={onLogout}>Logout</button>
          <p>
            Content and fields will be shown here.
          </p>
          </div>
        </div>
      </div>
    
  );
};

export default Home;
