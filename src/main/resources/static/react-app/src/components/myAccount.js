// MyAccount.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
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

  return (
    <div>
      <h2>My Account</h2>
      <Form onSubmit={handleSubmit} className="my-account-container">
        <Form.Group className="account-fields" controlId="formFirstName">
          <Form.Label className="text-left">First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="account-fields" controlId="formLastName">
          <Form.Label className="text-left">Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="account-fields" controlId="formEmail">
          <Form.Label className="text-left">Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="account-fields" controlId="formUserName">
          <Form.Label className="text-left">User Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button className="password-button" variant="primary" onClick={handlePasswordClick}>
          Change Password
        </Button>
      </Form>
      <SuccessModal show={showSuccessModal} onHide={handleCloseSuccessModal} />
    </div>
  );
};

export default MyAccount;
