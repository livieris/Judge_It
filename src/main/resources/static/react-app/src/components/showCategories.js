// showCategories.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
import ShowNavPane from './showNavPane';
import MyNavbar from './Navbar';
import ShowCategoriesFields from './showCategoriesFields';
import DeleteSaveUpdateModal from './deleteSaveUpdateModal';
import SuccessToast from './successToast';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import '../css/MyShowsList.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FaTrash } from 'react-icons/fa';

const ShowCategories = ({ categoryData, selectedShowId, showData, updateCategoryTabsAndData, updateShowTabsAndData, handleNavClick, selectedNavTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCategoryWithoutName, setSelectedCategoryWithoutName] = useState([]);
  const [filteredSelectedCategoryData, setfilteredSelectedCategoryData] = useState([]);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryDeleteModal, setCategoryDeleteModal] = useState(false);
  const [showIdToDelete, setShowIdToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [isCreatingNewShow, setIsCreatingNewShow] = useState(true);
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(true);
  const [distinctClassNames, setDistinctClassNames] = useState([]);

  // Get user data from Redux state
  const user = useSelector((state) => state.user);
  const isLoggedIn = true; // You would replace this with your actual authentication check
  useEffect(() => {
    // if (selectedShowId) {
    //   Fetch Category Data when component mounts
    //   console.log("SELECTED SHOW ID: " + selectedShowId);
    //   fetchCategoryData(selectedShowId);
    // }
    if (categoryData) {
      generateDistinctClassNames(categoryData);
      console.log("CAT DATA IN SHOW CAT: ", categoryData);
    }
  }, [categoryData]);

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log("Selected Category Without Name:", selectedCategoryWithoutName);
  }, [selectedCategoryWithoutName]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  //Show Tab is clicked
  const handleTabClick = (category) => {
    const noNameCategory = { ...category };
    delete noNameCategory.name;
    setSelectedCategory(category === 'createNewCategory' ? null : category);
    setSelectedCategoryWithoutName(category === 'createNewCategory' ? null : noNameCategory);
    setIsCreatingNewCategory(category === 'createNewCategory' ? true : false);
    // setSelectedNavTab("showInformation");
  };

  //Create new show table clicked
  const handleCreateNewCategoryTabClick = () => {
    // Reset selectedShow state when "Create New Show" tab is clicked
    console.log("IN CREATE CAT CLICK");
    setSelectedCategory(null);
    setIsCreatingNewCategory(true);
  };

  // Trash Can icon clicked
  const handleDeleteCategory = async () => {
    console.log("DELETING CATEGORY: ", selectedCategory.classLetter, " ", selectedCategory.component);
    // setCategoryIdToDelete(index);
    setCategoryDeleteModal(true);
  };

  // Set delete modal to false to close
  const handleCloseDeleteModal = () => {
    // Close success modal
    setCategoryDeleteModal(false);
  };

  // Handle actual deletion
  const handleConfirmDelete = async () => {
    console.log("IN CATEGORY DELETE CONFIRMED");
    try {
      const response = await axios.delete(`http://localhost:8080/api/carshowcategories/classcomponent`, {
          params: {
            classLetter: selectedCategory.classLetter,
            component: selectedCategory.component
          }
      });
      
      console.log("Category deleted successfully:", response.data);
      // Update UI to show new car show list
      setShowSuccessModal(true);
      updateCategoryTabsAndData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

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
  };

  // const generateDistinctClassNames = (category) => {
  //   const classNamesSet = new Set();
  //   console.log("CAT DATA ", category)
  //   const classNames = category.map((cat) => {
  //     const className = cat.classLetter + ": "
  //       + cat.classification + " "
  //       + cat.classDescription + " '"
  //       + cat.component + "'";
  //     classNamesSet.add(className);
  //   });

  //   setDistinctClassNames([...classNamesSet]);
  // };

  const generateDistinctClassNames = (categoryData) => {
    const distinctNames = categoryData.map(category => {
      return {
        name: `${category.classLetter}: ${category.classification} ${category.classDescription} '${category.component}'`,
        classLetter: category.classLetter,
        classification: category.classification,
        classDescription: category.classDescription,
        component: category.component,
      };
    });

    // Filter out duplicate distinct names
    const distinctNamesSet = new Set(distinctNames.map(item => JSON.stringify(item)));
    const uniqueDistinctNames = Array.from(distinctNamesSet).map(item => JSON.parse(item));

    setDistinctClassNames(uniqueDistinctNames);
  };


  return (
    <div>
      <MyNavbar />
      <div id="myShowList-container">
        <ShowNavPane
          handleNavClick={handleNavClick}
          selectedNavTab={selectedNavTab}
        />
        <Tab.Container id="left-tabs-example" defaultActiveKey={distinctClassNames.length > 0 ? "0" : "createNewCategory"}>
          <Row>
            <Col sm={3}>
              <h2>Show Categories</h2>
              <Nav variant="pills" className="flex-column">
                {/* Permanent "Create New Show" Tab */}
                <Nav.Item>
                  <Nav.Link className="showName" eventKey="createNewCategory" onClick={handleCreateNewCategoryTabClick}>
                    Create New Category
                  </Nav.Link>
                </Nav.Item>
                {distinctClassNames.map((category, index) => (
                  <Nav.Item key={index} style={{ position: 'relative' }}>
                    <Nav.Link className="showName" eventKey={index} onClick={() => handleTabClick(category)}>
                      {category.name}
                      {selectedCategory === category && (
                        // Render the trash icon only if the tab is selected
                        <FaTrash onClick={() => handleDeleteCategory()} className="trash-icon" />
                      )}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              {/** SHOW CATEGORIES */}
              {selectedNavTab === 'showCategories' && (
                <div>
                  <Tab.Content className="showFieldTab">
                    {/* {categoryData && categoryData.map((category, index) => (
                      <Tab.Pane key={index} eventKey={index}>
                        <ShowCategoriesFields categoryData={category} updateCategoryTabsAndData={updateCategoryTabsAndData} handleNavClick={handleNavClick} selectedNavTab={selectedNavTab} />
                      </Tab.Pane>
                    ))} */}
                    {/* {categoryData && ( */}
                    {distinctClassNames.map((category, index) => (
                      <Tab.Pane eventKey={index}>
                        <ShowCategoriesFields
                          categoryData={categoryData.filter(category => (
                            category.classDescription === selectedCategoryWithoutName.classDescription &&
                            category.classification === selectedCategoryWithoutName.classification &&
                            category.component === selectedCategoryWithoutName.component &&
                            category.classLetter === selectedCategoryWithoutName.classLetter
                          ))}
                          updateCategoryTabsAndData={updateCategoryTabsAndData}
                          handleNavClick={handleNavClick}
                          selectedNavTab={selectedNavTab}
                          dropDownData={categoryData}
                          selectedShowId={selectedShowId}
                        />
                      </Tab.Pane>
                    ))}
                    {/* )}*/}

                    {/* Show Fields for "Create New Show" Tab */}
                    <Tab.Pane eventKey="createNewCategory">
                      <ShowCategoriesFields data={null} updateCategoryTabsAndData={updateCategoryTabsAndData} isCreatingNewCategory={isCreatingNewCategory} handleNavClick={handleNavClick} selectedNavTab={selectedNavTab} dropDownData={categoryData} selectedShowId={selectedShowId}/>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              )}
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <DeleteSaveUpdateModal
        show={categoryDeleteModal}
        onHide={handleCloseDeleteModal}
        title={getModalContent("title")}
        body={getModalContent("body")}
        bttnText={getModalContent('bttnText')}
        onConfirm={handleConfirmDelete}
      />
      <SuccessToast
        show={showSuccessModal}
        title="Success"
        body="Show category deleted Successfully."
        onClose={() => setShowSuccessModal(false)}
      />
    </div>

  );
};

export default ShowCategories;
