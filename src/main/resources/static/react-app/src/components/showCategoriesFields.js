// showCategoriesFields.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
import DeleteSaveUpdateModal from './deleteSaveUpdateModal';
import SuccessToast from './successToast';
import ShowNavPane from './showNavPane';
import { Dropdown, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import '../css/showFields.css';

const ShowCategoriesFields = ({ categoryData, updateCategoryTabsAndData, isCreatingNewCategory, handleNavClick, selectedNavTab, dropDownData, selectedShowId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user data from Redux state
    const user = useSelector((state) => state.user);

    // State for form fields, initialized with user data
    const [showId, setShowId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [classification, setClassification] = useState('');
    const [classLetter, setClassLetter] = useState('');
    const [classDescription, setClassDescription] = useState('');
    const [component, setComponent] = useState('');
    const [detail, setDetail] = useState([]);
    const [points, setPoints] = useState([]);
    const [detailPoints, setDetailPoints] = useState([{id: null, detail: '', points: '' }]);
    const [hasDetailPoints, setHasDetailPoints] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCreateOrUpdate, setShowCreateOrUpdate] = useState('');
    const [modalSucessContent, setModalSucessContent] = useState('');
    const [modalSucessStatus, setModalSucessStatus] = useState(false);
    const [isCreatingNewDetailClicked, setIsCreatingNewDetailClicked] = useState(false);
    const [initialFieldValues, setInitialFieldValues] = useState([]);
    const [initialFieldDataChange, setinitialFieldDataChange] = useState(false);
    const [initialDetailPointDataChange, setinitialDetailPointDataChange] = useState([false]);
    const [saveNewClicked, setSavedNewClicked] = useState(true);
    const [selectedItem, setSelectedItem] = useState('');
    const [existingClassification, setExistingClassification] = useState([]);
    const [existingClassDescription, setExistingClassDescription] = useState([]);
    const [existingComponent, setExistingComponent] = useState([]);
    const [showDropdownDescription, setShowDropdownDescription] = useState(false);
    const [showDropdownComponent, setShowDropdownComponent] = useState(false);
    const [detailDeleteModal, setDetailDeleteModal] = useState(false);
    const [detailIdToDelete, setDetailIdToDelete] = useState('');

    const [focusState, setFocusState] = useState({
        classification: false,
        classLetter: false,
        classDescription: false,
        component: false,
        detail: false,
        points: false,
    });

    //Function setters for fields/state
    const setters = {
        setClassification: setClassification,
        // setDetail: setDetail,
        setClassLetter: setClassLetter,
        setComponent: setComponent,
        setClassDescription: setClassDescription,
        setDetailPoints: setDetailPoints
        // setPoints: setPoints,
    };

    useEffect(() => {
        console.log("IN EFFECT SHOW CAT FIELDS");
        if (categoryData) {
            console.log("******CAT DATA IN SHOW fields: ", categoryData);
            console.log("CAT ID: ", categoryData[0]?.id);
            setCategoryId(categoryData[0]?.id || '');
            setClassification(categoryData[0]?.classification || '');
            setClassLetter(categoryData[0]?.classLetter || '');
            setComponent(categoryData[0]?.component || '');
            setClassDescription(categoryData[0]?.classDescription || []);

            // setDetailPoints(categoryData.map(item => ({
            //     detail: item.detail,
            //     points: item.points
            // })));

            const filteredDetailPoints = categoryData
                .filter(item => item.detail !== null || item.points !== 0)
                .map(item => ({
                    id: item.id,
                    detail: item.detail,
                    points: item.points
                }));

            setDetailPoints(filteredDetailPoints);
            if(detailPoints.length > 0) {
                setHasDetailPoints(true);
            } else {
                setHasDetailPoints(false);
            }
            
            //Set initial values for comparison to handle disabling of buttons
            const initialValues = {
                classification: categoryData[0]?.classification || '',
                classLetter: categoryData[0]?.classLetter || '',
                classDescription: categoryData[0]?.classDescription || '',
                component: categoryData[0]?.component || '',
                // detailPoints: categoryData.map(item => ({
                //     detail: item.detail,
                //     points: item.points
                // })),
                detailPoints: filteredDetailPoints,
                // Add more fields as needed
            };
            setInitialFieldValues(initialValues);
            // setinitialDetailPointDataChange(Array(categoryData.length).fill(false));
            setinitialDetailPointDataChange(Array(filteredDetailPoints.length).fill(false));

            // console.log("POINTS/DETAILS:  ", detailPoints);
            // console.log("INITIAL VALUES: ", initialValues);
        }
        if (isCreatingNewCategory) {
            console.log("Resetting form fields for creating new category...");
            setCategoryId('');
            setClassification('');
            setDetail('');
            setClassLetter('');
            setComponent('');
            setClassDescription('');
            setPoints('');
        }
        if (showSuccessModal) {
            console.log("GET CONTENT, GET STATUS");
            const modalSucessContent = showCreateOrUpdate === "create" ? `'${classification}' has been successfully created!` : `'${classification}' has been successfully updated!`;
            // Update state with the content
            setModalSucessContent(modalSucessContent);

            const modalSucessStatus = validationError ? false : true;
            setModalSucessStatus(modalSucessStatus);
        }
        if (dropDownData) {
            // console.log("DROP DOWN: ", dropDownData);
            let classifications = [];
            let classDescriptions = [];
            let components = [];
            dropDownData.forEach(item => {
                if (!classifications.includes(item.classification)) {
                    classifications.push(item.classification);
                }

                if (!classDescriptions.includes(item.classDescription)) {
                    classDescriptions.push(item.classDescription);
                }

                if (!components.includes(item.component)) {
                    components.push(item.component);
                }
            });

            setExistingClassification(classifications);
            setExistingClassDescription(classDescriptions);
            setExistingComponent(components);

        }
    }, [categoryData, isCreatingNewCategory, showSuccessModal, dropDownData]);

    const handleFocus = (fieldName, index) => {
        setFocusState((prevState) => ({
            ...prevState,
            [fieldName]: true,
        }));

        // const fieldNameData = eval(fieldName);
        const fieldNameData = index === undefined ? eval(fieldName) : eval(`detailPoints[${index}].${fieldName}`);
        const labelName = getLabelName(fieldName);
        if (!fieldNameData) {
            setValidationError(`'${labelName}' cannot be empty`)
        }
    };

    const handleBlur = (fieldName, index) => {
        setFocusState((prevState) => ({
            ...prevState,
            [fieldName]: false,
        }));
        console.log("BLUR FIELDNAME: ", fieldName);
        const labelName = getLabelName(fieldName);
        setValidationError('');
    };

    const getLabelName = (fieldName, index) => {
        // Split the fieldName string into words based on camelCase or PascalCase
        const words = fieldName.split(/(?=[A-Z])/);

        // Capitalize the first letter of each word and join them with a space
        const labelName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return labelName;
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        console.log("OLD CAT DATA: ", categoryData);
        e.preventDefault();

        const newcategoryData = {
            showId: selectedShowId,
            classification: classification,
            classLetter: classLetter,
            classDescription: classDescription,
            component: component,
            detail: null,
            points: 0,
        };
        console.log('NEW CAT DATA IN SUBMIT: ', newcategoryData);

        // Create or update if exists.
        if (!categoryData) {
            axios.post('http://localhost:8080/api/carshowcategories/create', newcategoryData)
                .then(response => {
                    console.log("Category Created successfully: ", response.data);
                    setShowCreateOrUpdate('create');
                    setShowSuccessModal(true);
                    // Callback function passed through to parent myshows.js to update the show tabs
                    updateCategoryTabsAndData();
                    console.log("RIGHT BEFORE CLEAR IN SUBMIT");
                })
                .catch(error => {
                    //TODO: call modal for error
                    console.error('Error create a new show: ', error);
                });
            // Update Redux state
            // dispatch(updateUser({ firstName, lastName, email, userName }));
        } else {
            axios.put(`http://localhost:8080/api/carshowcategories/${categoryId}`, newcategoryData)
                .then(response => {
                    console.log("Show updated successfully: ", response.data);
                    setShowCreateOrUpdate('update');
                    setShowSuccessModal(true);
                    updateCategoryTabsAndData();
                    // Optionally, you can perform any necessary actions after the show is updated
                })
                .catch(error => {
                    //TODO: call modal for error
                    console.error('Error updating the show: ', error);
                });
        }
        // // Show success modal
        // setShowSuccessModal(false);
    };

    const handleShowWinnersClick = () => {
        navigate('/showWinners');
    };

    // Function to compare field values if changed from original values
    const isFieldChanged = (fieldName, currentValue, index) => {
        if (!isCreatingNewCategory) {
            if (index > initialFieldValues.detailPoints.length - 1) {
                return true;
            }
            if (index !== undefined) {
                return initialFieldValues.detailPoints[index][fieldName] != currentValue;
            } else {
                return initialFieldValues[fieldName] !== currentValue;
            }
        }
    };

    // Check if any detail/point values have been changed
    const anyDetailChangeDetected = (inSaveNewUpdate = false) => {
        for (var i = 0; i < initialDetailPointDataChange.length; i++) {
            if (isCreatingNewDetailClicked) {
                break;
            }
            if (initialDetailPointDataChange[i]) {
                return true;
            }
        }

        return false;
    }

    //Dynamically handle text field changes
    const handleFieldChange = (fieldName, value, index) => {
        const labelName = getLabelName(fieldName);
        if (!value) {
            setValidationError(`'${labelName.charAt(0).toUpperCase()}${labelName.slice(1)}' cannot be empty.`);
        } else {
            setValidationError('');
        }
        if (index !== undefined) {
            // Handle change for dynamically generated fields
            const updatedDetailPoints = [...detailPoints];
            updatedDetailPoints[index][fieldName] = value;
            setDetailPoints(updatedDetailPoints);
            const labelName = getLabelName(fieldName);
            // if (isFieldChanged(fieldName, value, index)) {
            //     setinitialDetailPointDataChange(true);
            // } else {
            //     setinitialDetailPointDataChange(false);
            // }
            const fieldChanged = isFieldChanged(fieldName, value, index);
            const updatedChanges = [...initialDetailPointDataChange];
            updatedChanges[index] = fieldChanged;
            setinitialDetailPointDataChange(updatedChanges);
        } else {
            if (isFieldChanged(fieldName, value)) {
                setinitialFieldDataChange(true);
            } else {
                setinitialFieldDataChange(false);
            }
            const setterFunction = `set${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
            // Dynamically access the setter function based on the fieldName
            const setField = setters[setterFunction];
            const labelName = getLabelName(fieldName);

            if (setField) {
                setField(value);
            }
            console.log("validation error: ", validationError);
        }
    }

    const handleDropdownClick = (fieldName, value) => {
        const setterFucntion = `set${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
        const setField = setters[setterFucntion];

        if (setField) {
            setField(value);
            handleFieldChange(fieldName, value);
        }
    }

    // Add DetailPoint button click
    const handleAddDetailPointsClick = () => {
        setDetailPoints(prevData => [
            ...prevData,
            { detail: '', points: '' }
        ]);
        //update boolean states
        setIsCreatingNewDetailClicked(true);
        setSavedNewClicked(false);
    };

    // Disable save new/update button logic
    const handleDisableSaveNewUpdateButton = (index) => {
        // console.log(`save new button !DETAIL ${index}: `, !detailPoints[index].detail);
        // console.log("save new button !POINTS: ", !detailPoints[index].points);
        // console.log("save new button INITIALFIELDCHANGE: ", initialFieldDataChange);
        // console.log("save new button INITIALDETAILCHANGE: ", !initialDetailPointDataChange[index]);
        // console.log("save new button LENGTHISINDEX: ", index === detailPoints.length - 1);
        // console.log("save new button CREATINGNEWDETAIL: ", isCreatingNewDetailClicked);
        // console.log("save new button ANYDETAIL DETECTED: ", anyDetailChangeDetected());
        if (!!validationError || !detailPoints[index].detail || !detailPoints[index].points ||
            (initialFieldDataChange || !initialDetailPointDataChange[index] ||
                (index !== detailPoints.length - 1 && !initialDetailPointDataChange[index]) ||
                (!index === detailPoints.length - 1 && isCreatingNewDetailClicked)) ||
            (anyDetailChangeDetected(true) && isCreatingNewDetailClicked && index === detailPoints.length - 1)) {
            return true;
        } else {
            return false;
        }
    };

    // disable submit button
    const handleDisableSubmitButton = () => {
        if (validationError || !classification || !classDescription || !classLetter || !component || (!isCreatingNewCategory && !initialFieldDataChange)) {
            return true;
        } else {
            return false;
        }
    };

    // Disable add button logic
    const handleDisableAddButton = () => {
        // console.log("DISABLE ADD-> SAVENEW: ", saveNewClicked);
        // console.log("DISABLE ADD-> ANYDETAIL: ", anyDetailChangeDetected());
        // console.log("DISABLE ADD-> POINT: ", detailPoints[detailPoints.length - 1].points);
        // console.log("DISABLE ADD-> DETAIL: ", detailPoints[detailPoints.length - 1].detail);
        if(detailPoints.length === 0) {
            return false;
        }
        if (anyDetailChangeDetected() || initialFieldDataChange || !(detailPoints[detailPoints.length - 1].points && detailPoints[detailPoints.length - 1].detail && saveNewClicked)) {
            return true;
        } else {
            return false;
        }
    };

    const handleDisableDeleteDetailPoint = (index) => {        
        if(isCreatingNewCategory || (isCreatingNewDetailClicked && index === detailPoints.length - 1)) {
           return true; 
        }
        else {
            return false;
        }
    }

    // save new/udpate button clicked
    const handleSaveNewUpdateClick = (index) => {
        console.log('DETAIL POINTS CLICK: ', detailPoints[index]);
        setSavedNewClicked(true);
        setIsCreatingNewDetailClicked(false);
        // Clone the existing array to avoid mutating the state directly
        const updatedChanges = [...initialDetailPointDataChange];

        // If it's a new detail point entry, set its change status to false
        updatedChanges[index] = false;

        // Update the state with the new change status
        setinitialDetailPointDataChange(updatedChanges);
        if(isCreatingNewCategory) {
            console.log("SAVE NEW CLICKED");
        }
    };

    // Delete Detail Point by grabbing id.
    const handleDeleteDetailPoint = async (index) => {
        console.log("DELETE DETAIL: " + index);
        console.log(detailPoints[index]);
        console.log("DELETE DETAIL ID: ",detailPoints[index].id);
        // console.log(categoryData[index].id);
        // setDetailIdToDelete(Number(categoryData[index].id));
        setDetailIdToDelete(Number(detailPoints[index].id));
        setDetailDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        console.log("DELETE CONFIRMED");
        try {
            const response = await axios.delete(`http://localhost:8080/api/carshowcategories/${detailIdToDelete}`);
            console.log("Category detail deleted successfully:", response.data);
            setShowSuccessModal(true);
            // Update UI to show new car show list
              updateCategoryTabsAndData();
        } catch (error) {
            console.error('Error deleting detail:', error);
        }
    } 

    const handleCloseDeleteModal = () => {
        setDetailDeleteModal(false);
    };

    //Provides data to Deletion modal
    const getModalContent = (contentNeeded) => {
        if (contentNeeded === "title") {
            return "Delete Detail";
        }

        if (contentNeeded === "body") {
            return "Are you sure you want to delete this detail?";
        }

        if (contentNeeded === "bttnText") {
            return "Yes, Delete";
        }
    }

    const getSuccessContent = (contentNeeded) => {
        if(isCreatingNewCategory) {        
            if(contentNeeded === "body") {
                return "New Category Created!";
            }
        } else {
            if(contentNeeded === "body") {
                return "Detail and points deleted Successfully.";
            }
        }
    }

    //TODO dropdown data clicked doesn't update text change.. so button logic does not work.
    return (
        <div>
            <h2>Category</h2>
            <Form onSubmit={handleSubmit} className="my-show-field-container" autoComplete="off">
                <div className="d-flex flex-column">
                    <Form.Group className="show-fields" controlId="formClassification">
                        <FloatingLabel controlId="floatingClassification" label="Classification">
                            <Form.Control
                                type="text"
                                placeholder="Enter Classification"
                                value={classification}
                                onChange={(e) => handleFieldChange('classification', e.target.value)}
                                onFocus={() => handleFocus('classification')}
                                onBlur={() => handleBlur('classification')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formClassLetter">
                        <FloatingLabel controlId="floatingClassLetter" label="Class Letter">
                            <Form.Control
                                type="text"
                                placeholder="Enter Class Letter"
                                value={classLetter}
                                onChange={(e) => handleFieldChange('classLetter', e.target.value)}
                                onFocus={() => handleFocus('classLetter')}
                                onBlur={() => handleBlur('classLetter')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formClassDescription">
                        <FloatingLabel controlId="floatingClassDescription" label="Class Description">
                            <Form.Control
                                type="text"
                                placeholder="Enter Class Description"
                                value={classDescription}
                                onChange={(e) => handleFieldChange('classDescription', e.target.value)}
                                onFocus={() => handleFocus('classDescription')}
                                onBlur={() => handleBlur('classDescription')}
                                onClick={() => setShowDropdownDescription(!showDropdownDescription)}
                            />
                            <Dropdown show={showDropdownDescription} onToggle={setShowDropdownDescription}>
                                <Dropdown.Menu>
                                    {existingClassDescription.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleDropdownClick('classDescription', item)}>{item}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formComponent">
                        <FloatingLabel controlId="floatingComponent" label="Component">
                            <Form.Control
                                type="text"
                                placeholder="Enter Component"
                                value={component}
                                onChange={(e) => handleFieldChange('component', e.target.value)}
                                onFocus={() => handleFocus('component')}
                                onBlur={() => handleBlur('component')}
                                onClick={() => setShowDropdownComponent(!showDropdownComponent)}
                            />
                            <Dropdown show={showDropdownComponent} onToggle={setShowDropdownComponent}>
                                <Dropdown.Menu>
                                    {existingComponent.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleDropdownClick('component', item)}>{item}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </FloatingLabel>
                    </Form.Group>
                    {<div className="d-flex justify-content-between align-items-center show-buttons">
                        <Button variant="primary" type="submit" disabled={handleDisableSubmitButton()}>
                            {isCreatingNewCategory ? "Submit" : "Update"}
                        </Button>
                        {!hasDetailPoints && <Button 
                            variant="primary" 
                            type="submit" 
                            onClick={handleAddDetailPointsClick} 
                            disabled={handleDisableAddButton()}>
                            <FaPlus />
                        </Button>}
                    </div>}
                    {!isCreatingNewCategory && detailPoints.map((item, index) => (
                        <div className="detailPoints" key={index}>
                            <Form.Group className="show-fields" controlId={`floatingDetail-${index}`}>
                                <FloatingLabel controlId={`floatingDetail-${index}`} label="Detail">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Detail"
                                        value={item.detail}
                                        onChange={(e) => handleFieldChange('detail', e.target.value, index)}
                                        onFocus={() => handleFocus('detail', index)}
                                        onBlur={() => handleBlur('detail', index)}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="show-fields" controlId={`floatingPoints-${index}`}>
                                <FloatingLabel controlId={`floatingPoints-${index}`} label="Points">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Points"
                                        value={item.points}
                                        onChange={(e) => handleFieldChange('points', e.target.value, index)}
                                        onFocus={() => handleFocus('points', index)}
                                        onBlur={() => handleBlur('points', index)}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <div className="d-flex justify-content-between align-items-center show-buttons">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={handleDisableSaveNewUpdateButton(index)}
                                    onClick={() => handleSaveNewUpdateClick(index)}>
                                    {isCreatingNewCategory || (isCreatingNewDetailClicked && index === detailPoints.length - 1) ? "Save New" : "Update"}
                                </Button>
                                {!isCreatingNewCategory &&
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={() => handleDeleteDetailPoint(index)}
                                    disabled={handleDisableDeleteDetailPoint(index)}>
                                    Delete
                                </Button>}
                                
                                {!isCreatingNewCategory && index === detailPoints.length - 1 && 
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    onClick={handleAddDetailPointsClick} 
                                    disabled={handleDisableAddButton()}>
                                    <FaPlus />
                                </Button>}
                            </div>
                        </div>
                    ))}
                    {validationError && <div className="text-danger">{validationError}</div>}
                    {/* <div className="d-flex justify-content-between align-items-center show-buttons">
                        <Button className="show-winners-button" variant="primary" onClick={handleShowWinnersClick} style={{ display: isCreatingNewCategory ? 'none' : 'block' }}>
                            Show Winners
                        </Button>
                        <Button variant="primary" type="submit" disabled={handleDisableSubmitButton()}>
                            {isCreatingNewCategory ? "Submit" : "Update"}
                        </Button>
                    </div> */}
                </div>
            </Form>
            <DeleteSaveUpdateModal
                show={detailDeleteModal}
                onHide={handleCloseDeleteModal}
                title={getModalContent("title")}
                body={getModalContent("body")}
                bttnText={getModalContent('bttnText')}
                onConfirm={handleConfirmDelete}
            />
            <SuccessToast
                show={showSuccessModal}
                title="Success"
                body={getSuccessContent("body")}
                onClose={() => setShowSuccessModal(false)}
            />

        </div>

    );
};

export default ShowCategoriesFields;
