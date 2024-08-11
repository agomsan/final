import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  return (
    <div>
      <Navbar bg="light" expand="lg" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="/">SURFING WORLD TATTOO STUDIO</Navbar.Brand>
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
      {/* Contact Form Starts Here */}
      <div className="contact-form blackcontainer mt-5">
        <h1>CONTACT US!</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Your message" />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
