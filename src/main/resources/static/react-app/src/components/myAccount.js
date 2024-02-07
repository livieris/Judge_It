// MyAccount.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
import { FloatingLabel } from 'react-bootstrap';
import '../css/MyAccount.css'

const MyAccount = ({ onToggleView }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  // Get user data from Redux state
  const user = useSelector((state) => state.user);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // State for form fields, initialized with user data
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [userName, setUserName] = useState(user.userName || '');
  const [validationError, setValidationError] = useState('');

  // Update form fields when user data changes
  useEffect(() => {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setEmail(user.email || '');
    setUserName(user.userName || '');
  }, [user]);

  const handleCloseSuccessModal = () => {
    // Close success modal
    setShowSuccessModal(false);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update Redux state
    dispatch(updateUser({ firstName, lastName, email, userName }));

    // Show success modal
    setShowSuccessModal(true);

    // Perform actions with form data, e.g., update user information
    console.log('Submitted:', { firstName, lastName, email, userName });
  };

  const handlePasswordClick = () => {
    // Trigger the function passed from the parent component
    navigate('/profile/changePassword');
    onToggleView('changePassword');
  };

  //Dynamically handle text field changes
  const handleFieldChange = (fieldName, value) => {
    const setterFunction = `set${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
    // Dynamically access the setter function based on the fieldName
    const setField = setters[setterFunction];
    
    if (setField) {
      setField(value);
      if (value === '') {
        setValidationError(`${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} cannot be empty.`);
      } else {
        setValidationError('');
      }
    }
  }

  //Function setters for fields/state
  const setters = {
    setFirstName: setFirstName,
    setLastName: setLastName,
    setEmail: setEmail,
    setUserName: setUserName,
  };

  const getStatus = () => {
    if(validationError) {
      return false;
    } else {
      return true;
    }
  }

  const getContent = () => {
    if(validationError) {
      return validationError;
    } else {
      return "Your account has been successfully updated!";
    }
  }

  return (
    <div>
  <h2>My Account</h2>
  <Form onSubmit={handleSubmit} className="my-account-container">
    <div className="d-flex flex-column">
      <Form.Group className="account-fields" controlId="formFirstName">
        <FloatingLabel controlId="floatingFirstName" label="First Name">
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="account-fields" controlId="formLastName">
        <FloatingLabel controlId="floatingLastName" label="Last Name">
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="account-fields" controlId="formEmail">
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="account-fields" controlId="formUserName">
        <FloatingLabel controlId="floatingUserName" label="User Name">
          <Form.Control
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => handleFieldChange('userName', e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      {validationError && <div className="text-danger">{validationError}</div>}
      <div className="d-flex justify-content-between align-items-center">
        <Button className="password-button" variant="primary" onClick={handlePasswordClick}>
          Change Password
        </Button>
        <Button variant="primary" type="submit" disabled={!!validationError}>
          Save
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

export default MyAccount;
