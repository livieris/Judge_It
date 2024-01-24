// // // src/components/Login.js

// // import React, { useState } from 'react';

// // const Login = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');

// //     const handleLogin = async () => {
// //         try {
// //             const response = await fetch('http://localhost:8080/api/login', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ username, password }),
// //             });

// //             if (response.ok) {
// //                 // Handle successful login
// //                 console.log('Login successful');
// //             } else {
// //                 // Handle login failure
// //                 console.error('Login failed');
// //             }
// //         } catch (error) {
// //             console.error('Error during login:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Login</h2>
// //             <label htmlFor="username">Username:</label>
// //             <input
// //                 type="text"
// //                 id="username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //             />
// //             <br />
// //             <label htmlFor="password">Password:</label>
// //             <input
// //                 type="password"
// //                 id="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //             />
// //             <br />
// //             <button onClick={handleLogin}>Login</button>
// //         </div>
// //     );
// // };

// // export default Login;
// // src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/login', {
//         username,
//         password,
//       });

//       console.log(response.data); // Handle the response accordingly
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
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
//       <button onClick={handleLogin}>Login</button>
//       <p onClick={onToggleView} className="toggle-link">
//         Don't have an account? Register
//       </p>
//     </div>
//   );
// };

// export default Login;

// src/Login.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions';
import '../css/Login.css';
import { updateUser } from '../redux/userSlice';

const Login = ({ onLogin, onToggleView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  // Replace with actual user data 
  const userData = { 
    firstName: 'Shane',
    lastName: 'Livieri',
    email: 'myemail@gmail.com',
    username: 'admin',
    userId: 1
  };

  const handleLogin = () => {
    // Pass the login data to the parent component
    onLogin(username, password);
    // Dispatch sets the userData to retrieve later on.
    dispatch(updateUser(userData));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;

