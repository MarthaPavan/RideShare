import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Image } from "react-bootstrap";
import axios from "axios";

function CreateAccount() {
  const [form, setForm] = useState({
    fullName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1000/get-started/signup", form);
      console.log(res);
      if (res.status === 200 && res.data.msg === "success") {
        navigate("/SignUpSuccess");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <Container fluid className="min-vh-100">
      <Row className="flex-fill align-items-center justify-content-center">
        <Col className="m-3 p-3 border  border-1 border-dark-subtle shadow">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <p>It's quick and easy.</p>
            <div className="mb-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-control"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="emailId"
                placeholder="Email"
                className="form-control"
                value={form.emailId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone"
                className="form-control"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Set a password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </form>
          <br />
          <p>
            Already an existing user? <Link to="/Login">Login Here</Link>
          </p>
        </Col>
        <Col className="m-5 p-5">
          <Image src="/images/user_signup.jpg" fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAccount;
