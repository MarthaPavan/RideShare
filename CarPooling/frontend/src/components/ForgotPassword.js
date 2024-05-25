import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle sending the reset link here
    console.log("Reset link sent to:", inputValue);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Image
            src={"/images/driver_signup_page.jpg"}
            alt="Forgot Password"
            fluid
          />
        </Col>
        <Col>
          <Form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <h2 className="display-6 mb-2 pb-2">Forgot Password?</h2>
              <h4 className="lead">
                No Problem! Enter your username below and set new password
              </h4>
            </div>
            <Form.Group className="form-item hr-m-y-1 mb-3">
              <br />
              <Form.Control
                type="text"
                placeholder="Username"
                value={inputValue}
                name="user"
                onChange={handleInputChange}
                required
              />
              <br />
              <Form.Control
                type="text"
                placeholder="Enter new password"
                name="password"
                value={inputValue}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="form-item hr-m-t-1">
              <Button type="submit">Reset Password</Button>
            </div>
            <br />
            <div className="form-item hr-m-t-1 text-center">
              <div>
                Back to{" "}
                <Link
                  to="/Login"
                  className="text-decoration-none"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </Link>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
