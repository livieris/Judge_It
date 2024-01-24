// src/components/CustomNavbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch, useSelector } from 'react-redux';
import '../css/Navbar.css';

const MyNavbar = ({ onMyAccountClick }) => {

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);  //Grabs the firstname from the user state object set on login.
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object
  const currentRoute = location.pathname; // Get the current route pathname
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
  const handleMyAccountClick = () => {
    console.log("Navbar-ROUTE before " + currentRoute);
    if(currentRoute !== '/profile/myAccount') {
      navigate('/profile/myAccount');
    }
    else {
      
    }
  }
  return (
    <Navbar bg="default-color" expand="lg" variant="dark" className="mb-1">
      <Navbar.Brand href="#">The Judge</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent-333" />
      <Navbar.Collapse id="navbarSupportedContent-333">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to={"/home"} >Home</Nav.Link>
          <Nav.Link href="#">Features</Nav.Link>
          <Nav.Link href="#">Pricing</Nav.Link>
          <NavDropdown title="My Shows" id="navbarDropdownMenuLink-333">
            <NavDropdown.Item href="#">Create A Show</NavDropdown.Item>
            <NavDropdown.Item href="#">My Shows</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="nav-flex-icons user-icon-dropdown">
          <NavDropdown
            title={
                <>
                <span className="user-name">{firstName + " " + lastName || 'Guest'}</span>
                    {<FontAwesomeIcon icon={faUser} />}
                </>
                }
            id="navbarDropdownMenuLink-333"
            drop="down"
            onSelect={handleMyAccountClick}
          >
            <NavDropdown.Item href="#">My Shows</NavDropdown.Item>
            <NavDropdown.Item onClick={onMyAccountClick}>My Account</NavDropdown.Item>
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyNavbar);
