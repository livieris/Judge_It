import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from './successModal';
import '../css/ChangePassword.css'

const ChangePassword = ({ onToggleView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux state
  const user = useSelector((state) => state.user);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // State for form fields, initialized with user data
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  // Update form fields when user data changes
//   useEffect(() => {
//     setFirstName(user.firstName || '');
//     setLastName(user.lastName || '');
//     setEmail(user.email || '');
//     setUserName(user.userName || '');
//   }, [user]);

  const handleCloseSuccessModal = () => {
    // Close success modal
    setShowSuccessModal(false);
    navigate('/profile/myAccount');
    onToggleView('myAccount');
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    const actualPassword = "pass";
    e.preventDefault(oldPassword);

    // Update Redux state
    // dispatch(updateUser({ firstName, lastName, email, userName }));

    // Handle real password check.
    if(oldPassword !== actualPassword) {
        setValidationError('Old Password Does Not Match.');
    }

    // Check for empty fields
    if(newPassword === '' || confirmPassword === '') {
        setValidationError("You Left a field or two empty!");
    }

    //Check if there is a validation error.
    if(!validationError) {
        //Here is where logic is added for updating user's password. Right now it is set to dummy and nothing gets changed.
        console.log("SUCCESS CHANGE");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowSuccessModal(true);
    } else {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowSuccessModal(true);
    }
  };

  const handleOldPasswordChange = (e) => {
    const oldPass = e.target.value;
    setOldPassword(oldPass);
  };

  const handleNewPasswordChange = (e) => {
    // Designed like this so text comes through in real time, otherwise it would be a character behind.
    const newPass = e.target.value;
    setNewPassword(newPass);

    // New Password Parameters.
    if (newPass.length < 8) {
        setValidationError('Password must be at least 8 characters long.');
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(newPass)) {
        setValidationError('Password must contain an uppercase letter, a digit, and a special character.');
    } else {
        setValidationError('');
    }
    console.log(newPass);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);

    // Simple password field comparison. Doesn't display error until specified length.
    if (newPassword !== confirmPass && confirmPass.length > newPassword.length-2) {
        setValidationError('Passwords do not match.');
    } else {
        setValidationError('');
    }
  };

  // Back button clicked, switches to myAccount component.
  const handleBackClick = (e) => {
    navigate('/profile/myAccount');
    onToggleView('myAccount');
  }

  // For SuccessModal
  const getContent = () => {
    if(validationError) {
        return "Password change failed: " + validationError;
    } else {
        return "Password Change Successful!";
    }
  }

  //Get validation status.
  const getStatus = () => {
    if(validationError) {
        return false;
    } else {
        return true;
    }
  }

  return (
    <div>
      <h2>Change Your Password</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="password-fields" controlId="oldPassword">
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
      </Form.Group>

      <Form.Group className="password-fields" controlId="newPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
      </Form.Group>

      <Form.Group className="password-fields" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </Form.Group>

      {validationError && <div className="text-danger">{validationError}</div>}

      <Button variant="primary" type="submit">
        Change Password
      </Button>
      <Button className="back-button" variant="primary" onClick={handleBackClick}>
        Back
      </Button>
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

export default ChangePassword;
