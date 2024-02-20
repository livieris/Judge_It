import Nav from 'react-bootstrap/Nav';
import React, { useEffect, useState } from 'react';

const ShowNavPane = ({ handleNavClick, selectedNavTab }) => {
    const handleNavItemClick = (key) => {
        handleNavClick(key);
        console.log("NAV PANE KEY: " + key);
    }

    // useEffect(() => {
    //     console.log("SELECTED NAV TAB IN PANE: " + selectedNavTab);
    // }, [selectedNavTab]);
    
  return (
    <Nav variant="tabs" activeKey={selectedNavTab} onSelect={(selectedKey) => handleNavItemClick(selectedKey)}>
      <Nav.Item>
        <Nav.Link eventKey="showInformation">
          Show Information
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="showCategories">
          Show Categories
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="showWinners">
          Show Winners
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default ShowNavPane;
