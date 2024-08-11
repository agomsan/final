import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs"; 

const AppointmentList = ({
  appointments,
  services,
  doctors,
  handleEditAppointmentClick,
  handleDeleteAppointmentClick,
  newAppointment,
  handleEditAppointmentChange,
  handleEditAppointmentSubmit,
  handleCreateAppointment,
}) => (
  <div>
    <h3>APPOINTMENTS</h3>
    {appointments.map((appointment) => (
      <Card key={appointment.id} className="mb-4">
        <Card.Body>
          <Card.Title>
            {new Date(appointment.appointment_date).toLocaleString()}
            <Button className="ms-2" onClick={() => handleEditAppointmentClick(appointment.id)}>
              <BsFillPencilFill />
            </Button>
            <Button className="ms-2" onClick={() => handleDeleteAppointmentClick(appointment.id)}>
              <BsFillTrash3Fill />
            </Button>
          </Card.Title>
          <Card.Text>User ID: {appointment.user.id}</Card.Text>
          <Card.Text>Name: {appointment.user.first_name} {appointment.user.last_name}</Card.Text>
          <Card.Text>Service: {appointment.service ? appointment.service.service_name : "Not assigned"}</Card.Text>
          <Card.Text>Doctor: {appointment.doctor ? appointment.doctor.name : "Not assigned"}</Card.Text>
        </Card.Body>
      </Card>
    ))}
    <h3>Create or update your appointment</h3>
    <Form onSubmit={handleCreateAppointment}>
      <Form.Group controlId="formAppointmentDate">
        <Form.Label>Date and Time</Form.Label>
        <Form.Control
          type="date"
          name="appointment_date"
          value={newAppointment.appointment_date}
          onChange={handleEditAppointmentChange}
        />
      </Form.Group>
      <Form.Group controlId="formServiceId">
        <Form.Label>Service</Form.Label>
        <Form.Control
          as="select"
          name="service_id"
          value={newAppointment.service_id}
          onChange={handleEditAppointmentChange}
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.service_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formDoctorId">
        <Form.Label>Doctor</Form.Label>
        <Form.Control
          as="select"
          name="doctor_id"
          value={newAppointment.doctor_id}
          onChange={handleEditAppointmentChange}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="success" type="submit">
        {newAppointment.id ? "Update Appointment" : "Create Appointment"}
      </Button>
    </Form>
  </div>
);

export default AppointmentList;