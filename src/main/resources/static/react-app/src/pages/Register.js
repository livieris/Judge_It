// // src/components/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('YOUR_REGISTER_API_ENDPOINT', {
//         username,
//         password,
//       });

//       console.log(response.data); // Handle the response accordingly
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default Register;

// src/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Register.css';

const Register = ({ onRegister, onToggleView }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  const handlePasswordChange = (value) => {
    setPassword(value);

    // Check if passwords match
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    // Check if passwords match
    setPasswordMatch(password === value);
  };
  const handleRegister = () => {
    // Check passwords match before registering
    if (password === confirmPassword) {
      onRegister(firstName, lastName, email, password, confirmPassword);
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />
      </label>
      {!passwordMatch && <p className="password-mismatch">Passwords do not match</p>}
      <br />
      <button onClick={handleRegister} disabled={!passwordMatch}>
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
