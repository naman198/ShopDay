import React from 'react'
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, Container } from 'react-bootstrap';


const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to ="/">
          <Navbar.Brand>Shopday</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <LinkContainer to = "/cart">
              <Nav.Link> <i className="fa fa-shopping-cart" /> &nbsp; cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to = "/login">
             <Nav.Link> <i className="fa fa-user" /> &nbsp;sign-in</Nav.Link>
            </LinkContainer>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header