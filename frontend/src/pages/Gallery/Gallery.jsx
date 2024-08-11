import React from "react";
import "./Gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";

const Gallery = () => {
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">SURFING WORLD TATTOO STUDIO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">GO HOME</Nav.Link>
              <Nav.Link href="/register">REGISTER</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-flex w-100"
            src="../../../img/image1.jpg"
            alt="SURFING WORLD TATTOO STUDIO"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100"
            src="../../../img/image2.jpg"
            alt="SURFING WORLD TATTOO STUDIO"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100"
            src="../../../img/image3.jpg"
            alt="SURFING WORLD TATTOO STUDIO"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100"
            src="../../../img/image4.jpg"
            alt="SURFING WORLD TATTOO STUDIO"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-flex w-100"
            src="../../../img/image5.jpg"
            alt="SURFING WORLD TATTOO STUDIO"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Gallery;
