// src/MyShows.js
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../css/Home.css';
import MyNavbar from '../components/Navbar';
import MyShowsList from '../components/myShowsList';
import ShowFields from '../components/showFields';
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

    //database call to get all car show data for the user. This will be used as a prop to go to child components(myShowsList and showFields)
    // const getShowData = () => {
    //   return [
    //     { id: 0, name: "The Big Show It All", date: "2024-06-05", city: "Fond du Lac", state: "WI", cost: 5.00 },
    //     { id: 1, name: "Show Me the Good Stuff", date: "2024-07-10", city: "Appleton", state: "WI", cost: 15.00 },
    //     { id: 2, name: "The Big Show It All AGAIN", date: "2024-08-30", city: "Oshkosh", state: "WI", cost: 10.00 },
    //   ];
    // }
  
    const fetchCarShowData = async (userId) => {
      try {
        console.log("USER ID; ", userId)
        const response = await axios.get(`http://localhost:8080/api/carshows/user/${userId}`);
        if(response.data) {
          console.log("IN CAR SHOW RESPONSE DATA");
          setShowData(response.data);
        }
        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching car show data:', error);
      }
    };

    // const handleCreateShow = async (newShowData) => {
    //   try {
    //     await axios.post('http://localhost:8080/api/carshows/create', newShowData);
    //     fetchCarShowData();
    //   } catch (error) {
    //     console.error('Error creating a new show:', error);
    //   }
    // };

  // document.body.classList.add('home-body');
  return (
      <div>
        <MyNavbar />
        <div id="myShow-container">
        <div className="content">
          { <MyShowsList 
            showData={showData} 
            onCreateShow={() => fetchCarShowData(user.userId)}
          /> }
          </div>
        </div>
      </div>
    
  );
};

export default MyShows;
