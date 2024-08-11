import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Home() {
  return (
    <div className="body">
      <Navbar bg="light" expand="lg" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="/">BeHealth INSURANCE PARTNERS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Register">
                REGISTER
              </Nav.Link>
              <Nav.Link href="/Login">LOGIN</Nav.Link>
              <NavDropdown title="MORE" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Contact">
                  CONTACT
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/About">
                ABOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}