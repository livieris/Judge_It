// src/Home.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/Home.css';
import MyNavbar from '../components/Navbar';
import MyAccount from '../components/myAccount';

const Home = ({ onLogout }) => {
  const [showMyAccount, setShowMyAccount] = useState(false);
  // Check if logged in, otherwise navigate to login
  const isLoggedIn = true; // You would replace this with your actual authentication check
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  const handleMyAccountClick = () => {
    if(!showMyAccount) {
      setShowMyAccount(!showMyAccount);
    }
  };
  document.body.classList.add('home-body');
  return (
      <div>
        <MyNavbar onMyAccountClick={handleMyAccountClick}/>
        <div id="home-container">
        <div className="content">
          <h2>Welcome to The Judge!</h2>
          {/* <button onClick={onLogout}>Logout</button>
          <p>
            You can create a new show. Modify an existing show. <br></br>
            You can also see winners and set winners for each class for a show!
          </p> */}
          {/* { showMyAccount && <MyAccount /> } */}
          </div>
        </div>
      </div>
    
  );
};

export default Home;
