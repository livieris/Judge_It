// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={ <Home/> } ></Route>
//           <Route path="/login" element={ <Login/> } ></Route>
//           <Route path="/register" element={ <Register/> } ></Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // In a real application, you would perform authentication here
    // For simplicity, we'll just check if both username and password are 'admin'
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (firstName, lastName, email, password, confirmPassword) => {
    // In a real application, you would handle user registration here
    alert(`Registered: ${firstName} ${lastName}, ${email}`);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={loggedIn ? <Navigate to="/home" /> : <Register onRegister={handleRegister} />}
          />
          <Route
            path="/home"
            element={loggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
