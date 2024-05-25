import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import { Image } from "react-bootstrap";

const Login = ({ status, setStatus }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("http://localhost:1000/get-started/login", {
        userName: user,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200 && res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          setStatus(true);
          navigate("/");
        } else {
          setError(res.data.msg || "Login failed");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error in login");
      });
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <Row>
        <Col className="m-5 p-5">
          <Image
            src={"/images/login_page_image.jpg"}
            alt="People around a car"
            fluid
          />
        </Col>

        <Col className="mt-4 pt-3">
          <h1 className="display-6 h1-border">Login</h1>
          <br />
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="user" className="mb-3">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <p>
                <Link
                  to="/forgot"
                  className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none"
                >
                  Forgot Password?
                </Link>
              </p>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <Form.Group>
              <p className="text-dark m-2">Don't have an account?</p>
              <Link
                to="/GetStarted"
                className="d-flex align-items-center m-2 mb-lg-0 text-decoration-none"
              >
                Sign Up
              </Link>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
