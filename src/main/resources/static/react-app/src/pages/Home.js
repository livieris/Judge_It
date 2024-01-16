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
          <h2>Welcome to The Judge!</h2>
          <button onClick={onLogout}>Logout</button>
          <p>
            You can create a new show. Modify an existing show. <br></br>
            You can also see winners and set winners for each class for a show!
          </p>
          </div>
        </div>
      </div>
    
  );
};

export default Home;
