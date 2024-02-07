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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyAccount from './components/myAccount';
import ChangePassword from './components/changePassword';
import MyShows from './pages/MyShows';

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
          {/* <Route
            path="/profile/*"
            element={loggedIn ? <Profile onLogout={handleLogout} /> : <Navigate to="/profile" />}
          /> */}
          <Route
            path="/profile/*"
            element={loggedIn ? (
              <Profile onLogout={handleLogout}>
                <Route index element={<Navigate to="myAccount" />} />
                <Route path="myAccount" element={<MyAccount />} />
                <Route path="changePassword" element={<ChangePassword />} />
              </Profile>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/myShows"
            element={loggedIn ? (
              <MyShows onLogout={handleLogout} />
              ) : 
                <Navigate to="/login" />
              }
          />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
