// src/myShowsList.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/Home.css';
import MyNavbar from '../components/Navbar';
import ShowFields from '../components/showFields';
import DeleteSaveUpdateModal from './deleteSaveUpdateModal';
import '../css/MyShowsList.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';

const ShowClassList = ({ showData, updateShowTabsAndData }) => {
  // Check if logged in, otherwise navigate to login
  const isLoggedIn = true; // You would replace this with your actual authentication check
  const [selectedShow, setSelectedShow] = useState(null);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  //Show Tab is clicked
  const handleTabClick = (show) => {
    setSelectedShow(show);
  };

  const showNames = showData.map((show) => show.showName);
  console.log("Show name: ", showNames);

  document.body.classList.add('home-body');
  return (
    <div>
      <MyNavbar />
      <div id="myShowList-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey={showNames.length > 0 ? "0" : "createNewShow"}>
          <Row>
            <Col sm={3}>
              <h2>Class List</h2>
              <Nav variant="pills" className="flex-column">
                {showData.map((show, index) => (
                  <Nav.Item key={index} style={{ position: 'relative' }}>
                    <Nav.Link className="showName" eventKey={index} onClick={() => handleTabClick(show)}>
                      {show.showName}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <h2>Winners</h2>
              <Tab.Content className="showFieldTab">
                {showData.map((show, index) => (
                  <Tab.Pane key={index} eventKey={index}>
                    <ShowFields showData={show} updateShowTabsAndData={updateShowTabsAndData} />
                  </Tab.Pane>
                ))}
                {/* Show Fields for "Create New Show" Tab */}
                <Tab.Pane eventKey="createNewShow">
                  <ShowFields data={null} updateShowTabsAndData={updateShowTabsAndData} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>

  );
};

export default ShowClassList;
