import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { getAllAppointments, createAppointment, updateAppointmentById, deleteAppointmentById } from "../../Calls/appointment";
import { getAllServices } from "../../Calls/serviceCall";
import { getAllDoctors } from "../../Calls/doctorCall";
import { useAuth } from "../../contexts/authContext/AuthContext"; 
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

export default function Appointments({ isAdmin }) {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState({ appointment_date: "", service_id: "", doctor_id: "" });
  const [error, setError] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();
  const { userToken } = useAuth(); 

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
      return;
    }

    const token = userToken.token;

    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments(token);
        if (response.success) {
          setAppointments(response.data);
        } else {
          setError("Error retrieving appointments.");
        }
      } catch (err) {
        setError("Error retrieving appointments.");
      }
    };

    const fetchServices = async () => {
      try {
        const response = await getAllServices(token);
        if (response.success) {
          setServices(response.data);
        } else {
          setError("Error obtaining services.");
        }
      } catch (err) {
        setError("Error obtaining services.");
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors(token);
        if (response.success) {
          setDoctors(response.data);
        } else {
          setError("Error catching doctor.");
        }
      } catch (err) {
        setError("Error catching doctor.");
      }
    };

    fetchAppointments();
    fetchServices();
    fetchDoctors();
  }, [userToken, navigate]);

  const handleCreateAppointment = async () => {
    try {
      const response = await createAppointment(appointmentForm, userToken.token);
      if (response.success) {
        setAppointments([...appointments, response.data]);
        setAppointmentForm({ appointment_date: "", service_id: "", doctor_id: "" });
      } else {
        setError("Error creating appointment.");
      }
    } catch (error) {
      setError("Error creating appointment.");
    }
  };

  const handleEditAppointmentChange = (e) => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value || "" });
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setAppointmentForm({
      appointment_date: appointment.appointment_date || "",
      service_id: appointment.service_id || "",
      doctor_id: appointment.doctor_id || ""
    });
  };

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointmentById({ id: editingAppointment, ...appointmentForm }, userToken.token);
      if (response.success) {
        const updatedAppointments = appointments.map(appointment =>
          appointment.id === editingAppointment ? { ...appointment, ...appointmentForm } : appointment
        );
        setAppointments(updatedAppointments);
        setEditingAppointment(null);
      } else {
        setError("Error updating appointment.");
      }
    } catch (error) {
      setError("Error updating appointment.");
    }
  };

  const handleDeleteAppointmentClick = async (appointmentId) => {
    try {
      const response = await deleteAppointmentById(appointmentId, userToken.token);
      if (response.success) {
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      } else {
        setError("Error deleting appointment.");
      }
    } catch (error) {
      setError("Error deleting appointment.");
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="success" className="my-4" onClick={() => setEditingAppointment(null)}>
        Create Appointment
      </Button>
      <Row>
        {appointments.map((appointment) => (
          <Col key={appointment.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {new Date(appointment.appointment_date).toLocaleString()}
                  <Button className="ms-2" onClick={() => handleEditAppointmentClick(appointment)}>Edit</Button>
                  <Button className="ms-2" onClick={() => handleDeleteAppointmentClick(appointment.id)}>Delete</Button>
                </Card.Title>
                <Card.Text>User ID: {appointment.user.id}</Card.Text>
                <Card.Text>User: {appointment.user.first_name} {appointment.user.last_name}</Card.Text>
                <Card.Text>
                  Service: {services.find(service => service.id === appointment.service_id)?.service_name || "Not assigned"}
                </Card.Text>
                <Card.Text>
                  Doctor: {doctors.find(doctor => doctor.id === appointment.doctor_id)?.name || "Not assigned"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Form className="my-4" onSubmit={handleEditAppointmentSubmit}>
        <Form.Group controlId="formAppointmentDate">
          <Form.Label>Date and Time</Form.Label>
          <Form.Control 
            type="date" 
            name="appointment_date"
            value={appointmentForm.appointment_date}
            onChange={handleEditAppointmentChange} 
          />
        </Form.Group>
        <Form.Group controlId="formServiceId">
          <Form.Label>Service</Form.Label>
          <Form.Control 
            as="select" 
            name="service_id"
            value={appointmentForm.service_id}
            onChange={handleEditAppointmentChange}
          >
            <option value="">Select service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.service_name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDoctorId">
          <Form.Label>Doctor</Form.Label>
          <Form.Control 
            as="select" 
            name="doctor_id"
            value={appointmentForm.doctor_id}
            onChange={handleEditAppointmentChange}
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          {editingAppointment ? "Update Appointment" : "Create Appointment"}
        </Button>
      </Form>
    </Container>
  );
}