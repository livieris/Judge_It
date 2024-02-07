// showFields.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import '../css/showFields.css'

const ShowFields = ({ showData, onCreateShow }) => {
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
    const [validationError, setValidationError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (showData) {
            console.log("SHOW DATA IN SHOW FIELDS", showData);
            setShowId(showData.id || '');
            setShowName(showData.showName || '');
            setDateOfShow(showData.date || '');
            setCity(showData.city || '');
            setState(showData.state || '');
            setCostPerPerson(showData.cost || '');

        }
    }, [showData]);

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
            cost: costPerPerson
        };
        console.log('SHOW DATA: ', newShowData);

        // Create or update if exists.
        if(!showData) {
        axios.post('http://localhost:8080/api/carshows/create', newShowData)
            .then(response => {
                console.log("Show Created successfully: ", response.data);
                setShowSuccessModal(true);
                // Callback function passed through to parent myshows.js to update the show tabs
                onCreateShow();
                
                //clear fields
                setShowName('');
                setDateOfShow('');
                setCity('');
                setState('');
                setCostPerPerson('');
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
                setShowSuccessModal(true);
                // Optionally, you can perform any necessary actions after the show is updated
            })
            .catch(error => {
                //TODO: call modal for error
                console.error('Error updating the show: ', error);
            });
        }
        // Show success modal
        setShowSuccessModal(false);

        // Perform actions with form data, e.g., update user information
        // console.log('Submitted:', { firstName, lastName, email, userName });
    };

    const handleShowWinnersClick = () => {
        // Trigger the function passed from the parent component
        navigate('/profile/showWinners');
        // onToggleView('changePassword');
    };

    //Dynamically handle text field changes
    const handleFieldChange = (fieldName, value) => {
        //TODO: Add in form field validation similar to myaccount.

        // const setterFunction = `set${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
        // // Dynamically access the setter function based on the fieldName
        // const setField = setters[setterFunction];

        // if (setField) {
        //     setField(value);
        //     if (value === '') {
        //         setValidationError(`${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} cannot be empty.`);
        //     } else {
        //         setValidationError('');
        //     }
        // } 
        switch (fieldName) {
            case 'showName':
                setShowName(value);
                break;
            case 'dateOfShow':
                console.log("DATE: " + value);
                setDateOfShow(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'state':
                setState(value);
                break;
            case 'costPerPerson':
                setCostPerPerson(value);
                break;
            default:
                break;
        }       
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value; // Selected date in YYYY-MM-DD format
        setDateOfShow(selectedDate); // Update the state with the selected date
    };

    //Function setters for fields/state
    const setters = {
        // setFirstName: setFirstName,
        // setLastName: setLastName,
        // setEmail: setEmail,
        // setUserName: setUserName,
        setDateOfShow: setDateOfShow
    };

    const getStatus = () => {
        if (validationError) {
            return false;
        } else {
            return true;
        }
    }

    const getContent = () => {
        if (validationError) {
            return validationError;
        } else {
            return `'${showName}' has been successfully updated!`;
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} className="my-show-field-container">
                <div className="d-flex flex-column">
                    <Form.Group className="show-fields" controlId="formShowName">
                        <FloatingLabel controlId="floatingShowName" label="Show Name">
                            <Form.Control
                                type="text"
                                placeholder="Enter show name"
                                value={showName}
                                onChange={(e) => handleFieldChange('showName', e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formDateOfShow">
                        <FloatingLabel controlId="floatingDateOfShow" label="Date of Show">
                            <Form.Control
                                type="date"
                                value={dateOfShow}
                                onChange={(e) => handleFieldChange('dateOfShow', e.target.value)}
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
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="show-fields" controlId="formCostPerPerson">
                        <FloatingLabel controlId="floatingCostPerPerson" label="Cost Per Person">
                            <Form.Control
                                type="text"
                                placeholder="Enter cost per person"
                                value={costPerPerson}
                                onChange={(e) => handleFieldChange('costPerPerson', e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center show-buttons">
                        <Button className="show-winners-button" variant="primary" onClick={handleShowWinnersClick}>
                            Show Winners
                        </Button>
                        <Button variant="primary" type="submit" disabled={!!validationError}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
            <SuccessModal
                show={showSuccessModal}
                onHide={handleCloseSuccessModal}
                success={getStatus()}
                content={getContent()}
            />

        </div>

    );
};

export default ShowFields;
