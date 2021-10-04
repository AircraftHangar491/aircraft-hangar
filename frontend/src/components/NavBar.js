import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';

const CustomNavBar = () => {
  return (
    <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">Add Entities</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/layout">Layout</NavLink>
        </NavItem>
      </Nav>
    </Navbar>    
  );
}

export default CustomNavBar;