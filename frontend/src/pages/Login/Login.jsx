import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Login.css";
import { CustomInput } from "../../components/CustomInput/customInput";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { login } from "../../Calls/apiCall";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { logan } = useAuth(); 

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async () => {
    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      setErrorMsg("All fields are required");
      return;
    }

    try {
      const token = await login(credentials);
      const decoded = jwtDecode(token);

      if (token) {
        const userToken = {
          token: token,
          decoded: decoded,
        };

        logan(userToken);

        if (decoded.userRoleName === "super_admin") {
          navigate("/Admin");
        } else if (decoded.userRoleName === "user") {
          navigate("/Profile");
        } else {
          setErrorMsg("Unknown user role");
        }
      } else {
        console.log("cannot login");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMsg("Error during login");
    }
  };

  return (
    <div className="login-body">
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
      <div className="login-container">
        <h1>Login</h1>
        <CustomInput
          type="email"
          name="email"
          placeholder="email"
          value={credentials.email}
          handler={inputHandler}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          handler={inputHandler}
        />
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <button className="login-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
}