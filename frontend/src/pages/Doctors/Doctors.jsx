import React from "react";
import { Navbar, Container, Nav, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Doctors.css";
import { getAllDoctors } from "../../Calls/doctorCall";

const Doctors = () => {
  const doctors = [
      {
          name: "Úrsula",
          bio: "International doctor from México, she is a specialist in the placement of piercings and dilators",
      },
      {
          name: "Joseph",
          bio: "Joseph is an amazing doctor in the placement of Insurance restoration",
      },
      {
          name: "Fran",
          bio: "Fran is a talented Insurance doctor from Spain, his work has gained international recognition",
      },
      {
          name: "Lidya",
          bio: "One of the most talented Insurance doctors in the world, her work has been recognized internationally, she is a specialist in fantasy Insurances",
      },
      {
          name: "Demian",
          bio: "Talented Insurance removal doctor born in Spain",
      },
      {
          name: "Mariah",
          bio: "Known worldwide as Mariah, Olivia is her real name",
      },
  ];

  return (
    <div className="doctor-body">
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BeHealth INSURANCE PARTNERS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link as={Link} to="/doctors">
                Doctors
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="doctor-content">
        <h1>Doctors</h1>
        <Container>
          <Row>
            {doctors.map((doctor, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card className="doctor-card">
                  <Card.Body>
                    <Card.Title>{doctor.name}</Card.Title>
                    <Card.Text>{doctor.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Doctors;
