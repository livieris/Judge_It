// showFields.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
import ShowNavPane from './showNavPane';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import '../css/showFields.css'

const ShowCategories = ({ showData, updateShowTabsAndData, isCreatingNewShow, handleNavClick, selectedNavTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user data from Redux state
    const user = useSelector((state) => state.user);

    // State for form fields, initialized with user data
    const [showId, setShowId] = useState('');
    const [showName, setShowName] = useState('');
    const [dateOfShow, setDateOfShow] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [costPerPerson, setCostPerPerson] = useState('');
    const [totalClasses, setTotalClasses] = useState('');
    const [validationError, setValidationError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCreateOrUpdate, setShowCreateOrUpdate] = useState('');
    const [modalSucessContent, setModalSucessContent] = useState('');
    const [modalSucessStatus, setModalSucessStatus] = useState(false);
    
    const [focusState, setFocusState] = useState({
        showName: false,
        dateOfShow: false,
        city: false,
        state: false,
        costPerPerson: false,
        totalClasses: false,
    });

    //Function setters for fields/state
    const setters = {
        setShowName: setShowName,
        setDateOfShow: setDateOfShow,
        setCity: setCity,
        setState: setState,
        setCostPerPerson: setCostPerPerson,
        setTotalClasses: setTotalClasses,
    };

    useEffect(() => {
        console.log("IN EFFECT");
        if (showData) {
            setShowId(showData.id || '');
            setShowName(showData.showName || '');
            setDateOfShow(showData.date || '');
            setCity(showData.city || '');
            setState(showData.state || '');
            setCostPerPerson(showData.cost || '');
            setTotalClasses(showData.totalClasses || '');
        }
        if (isCreatingNewShow) {
            console.log("Resetting form fields for creating new show...");
            setShowId('');
            setShowName('');
            setDateOfShow('');
            setCity('');
            setState('');
            setCostPerPerson('');
            setTotalClasses('');
        }
        if (showSuccessModal) {
            console.log("GET CONTENT, GET STATUS");
            const modalSucessContent = showCreateOrUpdate === "create" ? `'${showName}' has been successfully created!` : `'${showName}' has been successfully updated!`;
            // Update state with the content
            setModalSucessContent(modalSucessContent);

            const modalSucessStatus = validationError ? false : true;
            setModalSucessStatus(modalSucessStatus);
        }
    }, [showData, isCreatingNewShow, showSuccessModal]);

    const handleFocus = (fieldName) => {
        setFocusState((prevState) => ({
            ...prevState,
            [fieldName]: true,
        }));
        const fieldNameData = eval(fieldName);
        const labelName = getLabelName(fieldName);
        if (!fieldNameData) {
            setValidationError(`'${labelName}' cannot be empty`)
        }
    };

    const handleBlur = (fieldName) => {
        setFocusState((prevState) => ({
            ...prevState,
            [fieldName]: false,
        }));
        console.log(fieldName);
        const labelName = getLabelName(fieldName);
        setValidationError('')

    };

    const getLabelName = (fieldName) => {
        // Split the fieldName string into words based on camelCase or PascalCase
        const words = fieldName.split(/(?=[A-Z])/);

        // Capitalize the first letter of each word and join them with a space
        const labelName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return labelName;
    }

    const handleCloseSuccessModal = () => {
        // Close success modal
        setShowSuccessModal(false);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        console.log(showData);
        e.preventDefault();

        const newShowData = {
            userId: user.userId,
            showName: showName,
            date: dateOfShow,
            city: city,
            state: state,
            cost: costPerPerson,
            totalClasses: totalClasses,
        };
        console.log('SHOW DATA: ', newShowData);

        // Create or update if exists.
        if (!showData) {
            axios.post('http://localhost:8080/api/carshows/create', newShowData)
                .then(response => {
                    console.log("Show Created successfully: ", response.data);
                    setShowCreateOrUpdate('create');
                    setShowSuccessModal(true);
                    // Callback function passed through to parent myshows.js to update the show tabs
                    updateShowTabsAndData();
                    console.log("RIGHT BEFORE CLEAR IN SUBMIT");
                })
                .catch(error => {
                    //TODO: call modal for error
                    console.error('Error create a new show: ', error);
                });
            // Update Redux state
            // dispatch(updateUser({ firstName, lastName, email, userName }));
        } else {
            axios.put(`http://localhost:8080/api/carshows/${showId}`, newShowData)
                .then(response => {
                    console.log("Show updated successfully: ", response.data);
                    setShowCreateOrUpdate('update');
                    setShowSuccessModal(true);
                    updateShowTabsAndData();
                    // Optionally, you can perform any necessary actions after the show is updated
                })
                .catch(error => {
                    //TODO: call modal for error
                    console.error('Error updating the show: ', error);
                });
        }
        // Show success modal
        setShowSuccessModal(false);
    };

    const handleShowWinnersClick = () => {
        navigate('/showWinners');
    };

    //Dynamically handle text field changes
    const handleFieldChange = (fieldName, value) => {
        const setterFunction = `set${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
        // Dynamically access the setter function based on the fieldName
        const setField = setters[setterFunction];
        const labelName = getLabelName(fieldName);

        if (setField) {
            setField(value);
            if (value === '') {
                setValidationError(`'${labelName.charAt(0).toUpperCase()}${labelName.slice(1)}' cannot be empty.`);
            } else {
                setValidationError('');
            }
        }
        console.log("validation error: ", validationError);
    }

    const handleDisableSubmitButton = () => {
        if (!!validationError || !showName || !city || !dateOfShow || !state || !costPerPerson) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div>
            <ShowNavPane
             handleNavClick={handleNavClick}
             selectedNavTab={selectedNavTab}
            />
            <h2>Show Categories</h2>
            <Form onSubmit={handleSubmit} className="my-show-field-container">
                <div className="d-flex flex-column">
                    <Form.Group className="show-fields" controlId="formShowName">
                        <FloatingLabel controlId="floatingShowName" label="Show Name">
                            <Form.Control
                                type="text"
                                placeholder="Enter show name"
                                value={showName}
                                onChange={(e) => handleFieldChange('showName', e.target.value)}
                                onFocus={() => handleFocus('showName')}
                                onBlur={() => handleBlur('showName')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formDateOfShow">
                        <FloatingLabel controlId="floatingDateOfShow" label="Date of Show">
                            <Form.Control
                                type="date"
                                value={dateOfShow}
                                onChange={(e) => handleFieldChange('dateOfShow', e.target.value)}
                                onFocus={() => handleFocus('dateOfShow')}
                                onBlur={() => handleBlur('dateOfShow')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formCity">
                        <FloatingLabel controlId="floatingCity" label="City">
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => handleFieldChange('city', e.target.value)}
                                onFocus={() => handleFocus('city')}
                                onBlur={() => handleBlur('city')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formState">
                        <FloatingLabel controlId="floatingState" label="State">
                            <Form.Control
                                type="text"
                                placeholder="Enter state"
                                value={state}
                                onChange={(e) => handleFieldChange('state', e.target.value)}
                                onFocus={() => handleFocus('state')}
                                onBlur={() => handleBlur('state')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formCostPerPerson">
                        <FloatingLabel controlId="floatingCostPerPerson" label="Cost Per Person">
                            <Form.Control
                                type="number"
                                placeholder="Enter cost per person"
                                value={costPerPerson}
                                onChange={(e) => handleFieldChange('costPerPerson', e.target.value)}
                                onFocus={() => handleFocus('costPerPerson')}
                                onBlur={() => handleBlur('costPerPerson')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="totalClasses">
                        <FloatingLabel controlId="floatingTotalClasses" label="Total Classes">
                            <Form.Control
                                type="number"
                                placeholder="Enter total amount of classes"
                                value={totalClasses}
                                onChange={(e) => handleFieldChange('totalClasses', e.target.value)}
                                onFocus={() => handleFocus('totalClasses')}
                                onBlur={() => handleBlur('totalClasses')}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    {validationError && <div className="text-danger">{validationError}</div>}
                    <div className="d-flex justify-content-between align-items-center show-buttons">
                        <Button className="show-winners-button" variant="primary" onClick={handleShowWinnersClick}  style={{ display: isCreatingNewShow ? 'none' : 'block' }}>
                            Show Winners
                        </Button>
                        <Button variant="primary" type="submit" disabled={handleDisableSubmitButton()}>
                            {isCreatingNewShow ? "Submit" : "Update"}
                        </Button>
                    </div>
                </div>
            </Form>
            <SuccessModal
                show={showSuccessModal}
                onHide={handleCloseSuccessModal}
                success={modalSucessStatus}
                content={modalSucessContent}
            />

        </div>

    );
};

export default ShowCategories;
