import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';

export default class CustomNavBar extends Component {

  constructor(props) {
    super(props);

    console.log(props)
  }

  render() {

    console.log(this.props);
    return (
      <Navbar color="light" light expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/#/">Hangar</NavLink>
          </NavItem>
        </Nav>
      </Navbar>    
    );
  }
}