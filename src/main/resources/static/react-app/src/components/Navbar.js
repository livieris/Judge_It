// // src/components/Navbar.js
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../css/Navbar.css';

// const Navbar = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const [loggedIn, setLoggedIn] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const closeDropdown = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownVisible(false);
//     }
//   };

//   const handleLogout = () => {
//     // Perform logout actions here
//     // For example, clear user authentication tokens or state
//     // ...

//     // Redirect to the login page after logout
//     console.log("HERE");
//     setLoggedIn(false);
//     navigate('/login');
//   };

//   useEffect(() => {
//     document.addEventListener('click', closeDropdown);

//     return () => {
//       document.removeEventListener('click', closeDropdown);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-title">Judge It</div>

//       <div className="navbar-dropdown" ref={dropdownRef}>
//         <button className="dropdown-button" onClick={toggleDropdown}>
//           ☰
//         </button>

//         {dropdownVisible && (
//           <div className="dropdown-content">
//             <Link to="/myaccount">My Account</Link>
//             <button onClick={handleLogout}>Logout</button>

//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/CustomNavbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Navbar.css';

const MyNavbar = () => {
      const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

      const handleLogout = () => {
    // Perform logout actions here
    // For example, clear user authentication tokens or state
    // ...

    // Redirect to the login page after logout
    console.log("HERE");
    setLoggedIn(false);
    navigate('/login');
  };
  return (
    <Navbar bg="default-color" expand="lg" variant="dark" className="mb-1">
      <Navbar.Brand href="#">The Judge</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent-333" />
      <Navbar.Collapse id="navbarSupportedContent-333">
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Features</Nav.Link>
          <Nav.Link href="#">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="navbarDropdownMenuLink-333">
            <NavDropdown.Item href="#">Action</NavDropdown.Item>
            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="nav-flex-icons user-icon-dropdown">
          <NavDropdown
            title={<FontAwesomeIcon icon={faUser} />}
            id="navbarDropdownMenuLink-333"
            drop="down"
          >
            <NavDropdown.Item href="#">Action</NavDropdown.Item>
            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
