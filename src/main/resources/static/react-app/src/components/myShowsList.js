// src/myShowsList.js
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/Home.css';
import MyNavbar from '../components/Navbar';
import ShowFields from '../components/showFields';
import ShowCategories from './showCategories';
import DeleteSaveUpdateModal from './deleteSaveUpdateModal';
import SuccessToast from './successToast';
import '../css/MyShowsList.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const MyShowsList = ({ showData, updateShowTabsAndData }) => {
  // Check if logged in, otherwise navigate to login
  const isLoggedIn = true; // You would replace this with your actual authentication check
  const [selectedShow, setSelectedShow] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showIdToDelete, setShowIdToDelete] = useState(null);
  const [isCreatingNewShow, setIsCreatingNewShow] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedNavTab, setSelectedNavTab] = useState('showInformation');

  useEffect(() => {
    // fetchCategoryData(selectedShow.id);
    // console.log("showslist: ", selectedShow);    

    if (selectedShow) {
      fetchCategoryData(selectedShow.id);
    }
  }, [selectedShow], []);

  // useEffect(() => {
  //   if(categoryData) {
  //     console.log("CAT DATA IN SHOW LIST: ",categoryData);
  //   }
  // },[]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }



  //Show Tab is clicked
  const handleTabClick = (show) => {
    setSelectedShow(show === 'createNewShow' ? null : show);
    setIsCreatingNewShow(show === 'createNewShow' ? true : false);
    setSelectedNavTab("showInformation");

    // if(selectedShow) {
    //   fetchCategoryData(selectedShow.id);
    // }
  };

  const handleNavClick = (component) => {
    // console.log("COMPONENT SELECTED: ", component);
    // console.log("SELECTED SHOW IN NAV: ", selectedShow);
    setSelectedNavTab(component);
  };

  //Create new show table clicked
  const handleCreateNewShowTabClick = () => {
    // Reset selectedShow state when "Create New Show" tab is clicked
    // console.log("IN CREATE SHOW CLICK");
    setSelectedShow(null);
    setIsCreatingNewShow(true);
  }

  // Trash Can icon clicked
  const handleDeleteShow = async (showId) => {
    // console.log("DELETING SHOW: ", showId);
    setShowIdToDelete(showId);
    setShowDeleteModal(true);
  }

  // Set delete modal to false to close
  const handleCloseDeleteModal = () => {
    // Close success modal
    setShowDeleteModal(false);
  };

  // Handle actual deletion
  // TODO: Delete associated categories as well
  const handleConfirmDelete = async () => {
    console.log("DELETE CONFIRMED");
    try {
      const response = await axios.delete(`http://localhost:8080/api/carshows/${showIdToDelete}`);
      console.log("Show deleted successfully:", response.data);
      try {
        const response = await axios.delete(`http://localhost:8080/api/carshowcategories/showid/${showIdToDelete}`);
        console.log("Show categories deleted successfully:", response.data);
        // Update UI to show new car show list
        updateShowTabsAndData();
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Error deleting show categories:', error);
      }
      // Update UI to show new car show list
      // updateShowTabsAndData();
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  }

  //Provides data to Deletion modal
  const getModalContent = (contentNeeded) => {
    if (contentNeeded === "title") {
      return "Delete Show";
    }

    if (contentNeeded === "body") {
      return "Are you sure you want to delete this show?";
    }

    if (contentNeeded === "bttnText") {
      return "Yes, Delete";
    }
  }

  const fetchCategoryData = async (showId) => {
    try {
      console.log("FETCH CAT DATA-SHOWID: ", showId)
      const response = await axios.get(`http://localhost:8080/api/carshowcategories/show/${showId}`);
      if (response.data) {
        console.log("IN CAR SHOW CATEGORY RESPONSE DATA");
        setCategoryData(response.data);
        console.log("CAT RESPONSE DATA: ", JSON.stringify(response.data));
      }
      
      // const categories = [
      //   {
      //     "id": 1,
      //     "showId": 5,
      //     "classification": "Stock",
      //     "classLetter": "A",
      //     "classDescription": "1970 - 1973 Muscle",
      //     "component": "paint",
      //     "detail": "body work",
      //     "points": 15
      //   },
      //   {
      //     "id": 1,
      //     "showId": 5,
      //     "classification": "Stock",
      //     "classLetter": "A",
      //     "classDescription": "1970 - 1973 Muscle",
      //     "component": "paint",
      //     "detail": "shine",
      //     "points": 10
      //   },
      //   {
      //     "id": 1,
      //     "showId": 5,
      //     "classification": "Stock",
      //     "classLetter": "A",
      //     "classDescription": "1970 - 1973 Muscle",
      //     "component": "engine",
      //     "detail": "clean",
      //     "points": 10
      //   },
      //   {
      //     "id": 1,
      //     "showId": 5,
      //     "classification": "Stock",
      //     "classLetter": "B",
      //     "classDescription": "1974 - 1979 Muscle",
      //     "component": "engine",
      //     "detail": "clean",
      //     "points": 10
      //   }
      // ];

      // setCategoryData(categories);
    } catch (error) {
      console.error('Error fetching category data for show');
    }
  }

  const showNames = showData.map((show) => show.showName);
  // console.log("Show name: ", showNames);

  document.body.classList.add('home-body');
  return (
    <div>
      <MyNavbar />
      <div id="myShowList-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey={showNames.length > 0 ? "0" : "createNewShow"}>
          <Row>
            <Col sm={3}>
              <h2>My Shows</h2>
              <Nav variant="pills" className="flex-column">
                {/* Permanent "Create New Show" Tab */}
                <Nav.Item>
                  <Nav.Link className="showName" eventKey="createNewShow" onClick={handleCreateNewShowTabClick}>
                    Create New Show
                  </Nav.Link>
                </Nav.Item>
                {showData.map((show, index) => (
                  <Nav.Item key={index} style={{ position: 'relative' }}>
                    <Nav.Link className="showName" eventKey={index} onClick={() => handleTabClick(show)}>
                      {show.showName}
                      {selectedShow === show && (
                        // Render the trash icon only if the tab is selected
                        <FaTrash onClick={() => handleDeleteShow(show.id)} className="trash-icon" />
                      )}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              {/** SHOW INFORMATION */}
              {selectedNavTab === 'showInformation' && (
                <div>
                  <Tab.Content className="showFieldTab">
                    {showData.map((show, index) => (
                      <Tab.Pane key={index} eventKey={index}>
                        <ShowFields showData={show} updateShowTabsAndData={updateShowTabsAndData} handleNavClick={handleNavClick} selectedNavTab={selectedNavTab} />
                      </Tab.Pane>
                    ))}
                    {/* Show Fields for "Create New Show" Tab */}
                    <Tab.Pane eventKey="createNewShow">
                      <ShowFields data={null} updateShowTabsAndData={updateShowTabsAndData} isCreatingNewShow={isCreatingNewShow} handleNavClick={handleNavClick} selectedNavTab={selectedNavTab} />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              )}

              {/** SHOW CATEGORIES */}
              {selectedNavTab === 'showCategories' && (
                <div>
                  <Tab.Content className="showFieldTab">
                    {showData.map((show, index) => (
                      <Tab.Pane key={index} eventKey={index}>
                        <ShowCategories showData={show} categoryData={categoryData} selectedShowId={selectedShow?.id} updateShowTabsAndData={(updateShowTabsAndData)} handleNavClick={handleNavClick} selectedNavTab={selectedNavTab} updateCategoryTabsAndData={() => fetchCategoryData(selectedShow.id)} />
                      </Tab.Pane>
                    ))}
                    {/* Show Cats for "Create New Show" Tab */}
                    <Tab.Pane eventKey="createNewShow">
                      <ShowCategories data={null} updateShowTabsAndData={updateShowTabsAndData} isCreatingNewShow={isCreatingNewShow} handleNavClick={handleNavClick} selectedNavTab={selectedNavTab} updateCategoryTabsAndData={() => fetchCategoryData(selectedShow.id)}/>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              )}
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <DeleteSaveUpdateModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        title={getModalContent("title")}
        body={getModalContent("body")}
        bttnText={getModalContent('bttnText')}
        onConfirm={handleConfirmDelete}
      />
      <SuccessToast
        show={showSuccessModal}
        title="Success"
        body="Show deleted Successfully."
        onClose={() => setShowSuccessModal(false)}
      />
    </div>

  );
};

export default MyShowsList;
