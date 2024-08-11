import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Register.css";
import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/customInput";
import { register } from "../../Calls/apiCall";
import { useAuth } from "../../contexts/authContext/AuthContext";

export default function Register() {
  const [first_name, setFirst_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState("");

  const navigate = useNavigate();
  const { logan } = useAuth();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "first_name") {
      setFirst_name(value);
    }
  };

  const inputChecker = () => {
    let message = "";

    if (email.trim() === "") {
      message += "Email is required. ";
    }
    if (password.trim() === "") {
      message += "Password is required. ";
    }
    if (first_name.trim() === "") {
      message += "First name is required. ";
    }

    if (message === "") {
      setMsg("Registration successful");
    } else {
      setRegistrationErrorMsg(message);
    }
  };

  const registerHandler = async () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      first_name.trim() === ""
    ) {
      setRegistrationErrorMsg("All fields are required");
      return;
    }

    const newUser = {
      first_name: first_name,
      email: email,
      password: password,
    };

    try {
      const res = await register(newUser);
      if (res && res.token) {
        const userToken = {
          token: res.token,
          decoded: decode(res.token),
        };

        logan(userToken);

        setMsg("Registration successful");
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        setRegistrationErrorMsg("Error registering");
      }
    } catch (error) {
      setRegistrationErrorMsg("Error registering");
    }
  };

  return (
    <div className="body-register">
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">SURFING WORLD TATTOO STUDIO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                GO HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
              <Nav.Link as={Link} to="/Contact">
                CONTACT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={registerHandler}>
          <CustomInput
            type="text"
            name="first_name"
            placeholder="first name"
            value={first_name}
            handler={inputHandler}
          />
          <CustomInput
            type="email"
            name="email"
            placeholder="email"
            value={email}
            handler={inputHandler}
          />
          <CustomInput
            type="password"
            name="password"
            placeholder="password"
            value={password}
            handler={inputHandler}
          />
          <button className="register-btn" type="submit">
            Send
          </button>
        </form>
        <p className="error-message">{registrationErrorMsg}</p>
        <p>{msg}</p>
      </div>
    </div>
  );
}
