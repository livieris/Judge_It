// src/MyShows.js
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../css/Home.css';
import MyNavbar from '../components/Navbar';
import MyShowsList from '../components/myShowsList';
import axios from 'axios';
import '../css/MyShows.css'

const MyShows = ({ onLogout }) => {
  //   const [showMyAccount, setShowMyAccount] = useState(false);
  // Check if logged in, otherwise navigate to login
  const [showData, setShowData] = useState([]);

  // Get user data from Redux state
  const user = useSelector((state) => state.user);
  const isLoggedIn = true; // You would replace this with your actual authentication check

  useEffect(() => {
    // Fetch car show data from the backend when the component mounts
    fetchCarShowData(user.userId);
  }, []);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const fetchCarShowData = async (userId) => {
    try {
      console.log("USER ID; ", userId)
      const response = await axios.get(`http://localhost:8080/api/carshows/user/${userId}`);
      if (response.data) {
        console.log("IN CAR SHOW RESPONSE DATA");
        setShowData(response.data);
      }
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching car show data:', error);
    }
  };

  // document.body.classList.add('home-body');
  return (
    <div>
      <MyNavbar />
      <div id="myShow-container">
        <div className="content">
          {<MyShowsList
            showData={showData}
            updateShowTabsAndData={() => fetchCarShowData(user.userId)}
          />}
        </div>
      </div>
    </div>

  );
};

export default MyShows;
