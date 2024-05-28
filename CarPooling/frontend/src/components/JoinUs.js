import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, FormControl, InputGroup, Form, Image } from "react-bootstrap";
import axios from "axios";

const JoinUs = () => {
  const [form, setForm] = useState({
    fullName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    role: "driver",
    vehicleModel: "",
    registrationNumber: "",
  });

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation check
    if (!form.fullName || !form.emailId || !form.password || !form.phoneNumber) {
      alert("Please fill all required fields.");
      return;
    }

    form.phoneNumber = parseInt(form.phoneNumber);

    try {
      console.log(form);
      const response = await axios.post("http://localhost:1000/get-started/signup", form);
      console.log(response);
      console.log("Response:", response);
      if (response.status === 200 && response.data.msg === "success") {
        navigate("/SignUpSuccess");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <Container>
      <Row className="text-center my-5">
        <Col className="m-4 p-3">
          <h1 className="mb-2 display-6">Join us</h1>
          <h2 className="mb-2 lead">Create Account</h2>
          <Form onSubmit={handleSignUp}>
            <Form.Group>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <br />
              <InputGroup>
                <FormControl
                  type="email"
                  name="emailId"
                  placeholder="Email Address"
                  value={form.emailId}
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Mobile Number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <br />
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <br />
              <Form.Select
                aria-label="Default select example"
                name="vehicleModel"
                value={form.vehicleModel}
                onChange={handleChange}
              >
                <option value="">Select Your Vehicle Model</option>
                <option value="Sedan">Sedan</option>
                <option value="HatchBack">HatchBack</option>
                <option value="SUV">SUV</option>
              </Form.Select>
              <br />
              <Form.Control
                type="text"
                name="registrationNumber"
                placeholder="Your Vehicle's Registration Number"
                value={form.registrationNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <div className="text-start">
              Already an existing user{" "}
              <Link to="/Login" onClick={handleClick}>
                Login Here
              </Link>
            </div>
            <br />
            <Button variant="primary" className="align-items-end" type="submit">
              Register
            </Button>
          </Form>
        </Col>
        <Col className="m-4 p-3">
          <br />
          <br />
          <Image className="m-5 =-5" src="/images/driver_signup_page.jpg" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default JoinUs;
