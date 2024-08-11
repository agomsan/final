import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../../Calls/userCall";
import {
  createDoctor,
  getAllDoctors,
  updateDoctorById,
  deleteDoctorById,
} from "../../Calls/doctorCall";
import {
  getAllAppointments,
  getUserAppointments,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
} from "../../Calls/appointment";
import { getAllServices } from "../../Calls/serviceCall";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import UserList from "../../components/lists/UserList";
import DoctorList from "../../components/lists/DoctorList";
import AppointmentList from "../../components/lists/AppointmentList";
import "./userProfile.css";

import { useAuth } from "../../contexts/authContext/AuthContext"; 

export default function UserProfile({ isAdmin }) {
  const [profileData, setProfileData] = useState(null);
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [editDoctorForm, setEditDoctorForm] = useState({
    name: "",
    Bio: "",
    Specialty: "",
  });
  const [error, setError] = useState(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    appointment_date: "",
    service_id: "",
    doctor_id: "",
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();
  const { userToken, logan, logout } = useAuth(); 

  useEffect(() => {
    const token = userToken?.token;
    const userId = userToken?.decoded.userId;

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, usersRes, doctorsRes, servicesRes, appointmentsRes] =
          await Promise.all([
            getProfile(token),
            isAdmin ? getAllUsers(token) : Promise.resolve({ success: false }),
            getAllDoctors(token),
            getAllServices(token),
            isAdmin
              ? getAllAppointments(token)
              : getUserAppointments(userId, token),
          ]);

        if (profileRes.success) {
          setProfileData(profileRes.data);
          setEmail(profileRes.data.email);
        } else {
          console.error(
            "Error retrieving profile data:",
            profileRes.message
          );
        }

        if (usersRes.success && Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
          setFilteredUsers(usersRes.data);
        } else if (isAdmin) {
          console.error("Expected array of users, received:", usersRes);
          setError("Error retrieving users.");
        }

        if (doctorsRes.success && Array.isArray(doctorsRes.data)) {
          setDoctors(doctorsRes.data);
        } else {
          console.error("Expected array of doctors, received:", doctorsRes);
          setError("Error retrieving doctors.");
        }

        if (servicesRes.success && Array.isArray(servicesRes.data)) {
          setServices(servicesRes.data);
        } else {
          console.error("Expected array of services, received:", servicesRes);
          setError("Error retrieving services.");
        }

        if (appointmentsRes.success) {
          setUserAppointments(appointmentsRes.data);
        } else {
          setError(
            isAdmin
              ? "Error retrieving appointments."
              : "Error retrieving user appointments."
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error retrieving data.");
      }
    };

    fetchData();
  }, [editing, userToken, navigate, isAdmin]);

  const editInputHandler = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitChanges = async () => {
    try {
      const response = await updateProfile(profileData, userToken.token);
      if (response.success) setEditing(false);
      else console.log("Error saving data:", response.error);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditUserClick = (user) => {
    setEditingUser(editingUser === user.id ? null : user.id);
    setEditForm(
      editingUser === user.id
        ? { first_name: "", last_name: "", email: "" }
        : user
    );
  };

  const handleEditUserChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserById(
        { id: editingUser, ...editForm },
        userToken.token
      );
      if (response.success) {
        const updatedUsers = users.map((user) =>
          user.id === editingUser ? { ...user, ...editForm } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setEditingUser(null);
      } else {
        console.error("Error updating user:", response.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUserClick = async (userId) => {
    try {
      const response = await deleteUserById(userId, userToken.token);
      if (response.success) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error("Error deleting user:", response.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateDoctor = async () => {
    try {
      const response = await createDoctor(editDoctorForm, userToken.token);
      if (response.success) {
        setDoctors([...doctors, response.data]);
        setShowDoctorForm(false);
        setEditDoctorForm({ name: "", Bio: "", Specialty: "" });
      } else {
        console.error("Error creating doctor:", response.message);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const handleEditDoctorClick = (doctor) => {
    setEditingDoctor(editingDoctor === doctor.id ? null : doctor.id);
    setEditDoctorForm(
      editingDoctor === doctor.id
        ? { name: "", Bio: "", Specialty: "" }
        : doctor
    );
  };

  const handleEditDoctorChange = (e) =>
    setEditDoctorForm({ ...editDoctorForm, [e.target.name]: e.target.value });

  const handleEditDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateDoctorById(
        { id: editingDoctor, ...editDoctorForm },
        userToken.token
      );
      if (response.success) {
        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === editingDoctor
            ? { ...doctor, ...editDoctorForm }
            : doctor
        );
        setDoctors(updatedDoctors);
        setEditingDoctor(null);
      } else {
        console.error("Error updating doctor:", response.message);
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleDeleteDoctorClick = async (doctorId) => {
    try {
      const response = await deleteDoctorById(doctorId, userToken.token);
      if (response.success) {
        const updatedDoctors = doctors.filter(
          (doctor) => doctor.id !== doctorId
        );
        setDoctors(updatedDoctors);
      } else {
        console.error("Error deleting doctor:", response.message);
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await createAppointment(
        { ...newAppointment, user_id: profileData.id },
        userToken.token
      );
      if (response.success) {
        setUserAppointments([...userAppointments, response.appointment]);
        setNewAppointment({
          appointment_date: "",
          service_id: "",
          doctor_id: "",
        });
      } else {
        setError("Error creating appointment.");
      }
    } catch (error) {
      setError("Error creating appointment.");
    }
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setNewAppointment({
      appointment_date: appointment.appointment_date,
      service_id: appointment.service_id || "",
      doctor_id: appointment.doctor_id || "",
    });
  };

  const handleEditAppointmentChange = (e) =>
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value || "",
    });

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointmentById(
        { id: editingAppointment, ...newAppointment },
        userToken.token
      );
      if (response.success) {
        const updatedAppointments = userAppointments.map((appointment) =>
          appointment.id === editingAppointment
            ? { ...appointment, ...newAppointment }
            : appointment
        );
        setUserAppointments(updatedAppointments);
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
        setUserAppointments(
          userAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
      } else {
        setError("Error deleting appointment.");
      }
    } catch (error) {
      setError("Error deleting appointment.");
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => {
              setShowUsers(false);
              setEditing(false);
              setShowDoctors(false);
              setShowAppointments(false);
            }}
          >
            SURFING WORLD Insurance STUDIO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAdmin ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowUsers(true);
                      setShowDoctors(false);
                      setShowAppointments(false);
                      navigate("/admin");
                    }}
                  >
                    Users
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowDoctors(true);
                      setShowUsers(false);
                      setShowAppointments(false);
                      navigate("/admin");
                    }}
                  >
                    Doctors
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowAppointments(true);
                      setShowUsers(false);
                      setShowDoctors(false);
                      navigate("/admin");
                    }}
                  >
                    Appointments
                  </Nav.Link>{" "}
                  {}
                  <Nav.Link as={Link} to="/services">
                    Services
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/services">
                    Services
                  </Nav.Link>
                  <Nav.Link as={Link} to="/gallery">
                    Gallery
                  </Nav.Link>
                  <Nav.Link as={Link} to="/doctors">
                    Doctors
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowAppointments(true);
                      setShowUsers(false);
                      setShowDoctors(false);
                    }}
                  >
                    My appointments
                  </Nav.Link>{" "}
                  {}
                </>
              )}
            </Nav>
            <Nav>
              <NavDropdown
                title={profileData.first_name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    logout(); 
                    navigate("/login");
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {editing ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitChanges();
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={editInputHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={editInputHandler}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={editInputHandler}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save changes
            </Button>
          </Form>
        ) : showUsers ? (
          <UserList
            users={filteredUsers}
            filter={filter}
            setFilter={setFilter}
            handleEditUserClick={handleEditUserClick}
            handleDeleteUserClick={handleDeleteUserClick}
            editingUser={editingUser}
            handleEditUserSubmit={handleEditUserSubmit}
            handleEditUserChange={handleEditUserChange}
            editForm={editForm}
          />
        ) : showDoctors ? (
          isAdmin ? (
            <DoctorList
              doctors={doctors}
              handleEditDoctorClick={handleEditDoctorClick}
              handleDeleteDoctorClick={handleDeleteDoctorClick}
              editingDoctor={editingDoctor}
              handleEditDoctorSubmit={handleEditDoctorSubmit}
              handleEditDoctorChange={handleEditDoctorChange}
              editDoctorForm={editDoctorForm}
              showDoctorForm={showDoctorForm}
              setShowDoctorForm={setShowDoctorForm}
              handleCreateDoctor={handleCreateDoctor}
            />
          ) : (
            <DoctorList doctors={doctors} />
          )
        ) : showAppointments ? (
          isAdmin ? (
            <AppointmentList
              appointments={userAppointments}
              users={users}
              services={services}
              doctors={doctors}
              handleEditAppointmentClick={handleEditAppointmentClick}
              handleDeleteAppointmentClick={handleDeleteAppointmentClick}
              editingAppointment={editingAppointment}
              handleEditAppointmentChange={handleEditAppointmentChange}
              handleEditAppointmentSubmit={handleEditAppointmentSubmit}
              newAppointment={newAppointment}
              handleCreateAppointment={handleCreateAppointment}
            />
          ) : (
            <div>
              <h3>My appointments</h3>
              {userAppointments.map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <Card.Body>
                    <Card.Title>
                      {new Date(appointment.appointment_date).toLocaleString()}
                      <Button
                        className="ms-2"
                        onClick={() => handleEditAppointmentClick(appointment)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="ms-2"
                        onClick={() =>
                          handleDeleteAppointmentClick(appointment.id)
                        }
                      >
                        Delete
                      </Button>
                    </Card.Title>
                    <Card.Text>
                      Service:{" "}
                      {appointment.service
                        ? appointment.service.service_name
                        : "Not assigned"}
                    </Card.Text>
                    <Card.Text>
                      Doctor:{" "}
                      {appointment.doctor
                        ? appointment.doctor.name
                        : "Not assigned"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <h3>Create appointment</h3>
              <Form onSubmit={handleCreateAppointment}>
                <Form.Group controlId="formAppointmentDate">
                  <Form.Label>Date and time</Form.Label>
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
                    <option value="">Select service</option>
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
                  {editingAppointment ? "Update Appointment" : "Create appointment"}
                </Button>
              </Form>
            </div>
          )
        ) : (
          <Row className="justify-content-center">
            <h1>WELCOME BACK, {profileData.first_name}!</h1>
          </Row>
        )}

        {}
        {showDoctorForm && (
          <Form className="my-4">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editDoctorForm.name}
                onChange={handleEditDoctorChange}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                name="Bio"
                value={editDoctorForm.Bio}
                onChange={handleEditDoctorChange}
              />
            </Form.Group>
            <Form.Group controlId="formSpecialty">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                name="Specialty"
                value={editDoctorForm.Specialty}
                onChange={handleEditDoctorChange}
              />
            </Form.Group>
            <Button variant="success" onClick={handleCreateDoctor}>
              Create doctor
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
}