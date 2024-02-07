// src/Profile.js
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import MyNavbar from '../components/Navbar';
import MyAccount from '../components/myAccount';
import ChangePassword from '../components/changePassword'
import userSlice from '../redux/userSlice';

const Profile = ({ onLogout }) => {
  const [showMyAccount, setShowMyAccount] = useState(true);
//   const [showChangePassword, setShowChangePassword] = useState(false);
const [view, setView] = useState('myAccount');
const navigate = useNavigate();
  // Check if logged in, otherwise navigate to login
  const isLoggedIn = true; // You would replace this with your actual authentication check
  if (!isLoggedIn) {
    console.log("profile-log out");
    return <Navigate to="/login" />;
  }

  const handleMyAccountClick = () => {
    // If the current view is 'changePassword', default to 'myAccount'
    if (view === 'changePassword') {
      handleToggleView('myAccount');
    }
  };
  
const handleToggleView = (newView) => {
    console.log("VIEW:: " + newView);
    setView((prevView) => {
      // If the current view is 'changePassword', default to 'myAccount'
      return prevView === 'changePassword' ? 'myAccount' : newView;
    });
  
    // Use navigate to change the URL
    // For example, navigate to "/profile/myAccount" or "/profile/changePassword"
    navigate(`/profile/${newView}`);
  };

  document.body.classList.add('home-body');
  return (
      <div>
        <MyNavbar onMyAccountClick={handleMyAccountClick} onPasswordClick={() => handleToggleView(false)}/>
        <div id="profile-container">
        <div className="content">
           {view === 'myAccount' && <MyAccount onToggleView={handleToggleView} />}
          {view === 'changePassword' && <ChangePassword onToggleView={handleToggleView} />}
          </div>
        </div>
      </div>
    
  );
};

export default Profile;
