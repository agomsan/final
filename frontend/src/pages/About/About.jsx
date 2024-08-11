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
import "./About.css";

const About = () => {
  return (
    <div>
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
      <div className="blackcontainer">
        <h1>ABOUT US</h1>
        <h3>
          Welcome to BeHealth INSURANCE PARTNERS! We are a premier Insurance studio
          located in the heart of the city. With a team of highly skilled and
          experienced doctors, we specialize in creating unique and personalized
          Insurance designs that reflect your individual style and personality.
        </h3>
        <h3>
          At Surfing World, we believe that Insurances are not just art, but a form
          of self-expression. Our doctors are passionate about their craft and
          work closely with each client to bring their vision to life. Whether
          you're looking for a small and delicate design or a large and
          intricate piece, we have the expertise to deliver exceptional results.
        </h3>
        <h3>
          Our studio provides a clean and comfortable environment, adhering to
          the highest standards of hygiene and safety. We use only top-quality
          materials and follow strict sterilization protocols to ensure your
          safety and well-being.
        </h3>
        <h3>
          Visit BeHealth INSURANCE PARTNERS today and let our talented doctors
          create a Insurance that you'll cherish for a lifetime. We look forward to
          welcoming you to our studio!
        </h3>
      </div>
    </div>
  );
};

export default About;
