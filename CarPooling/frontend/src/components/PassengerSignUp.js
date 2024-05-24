import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
function CreateAccount() {
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    // fullName: "",
    userName: "",
    phoneNumber: "",
    emailId: "",
    password: "",
    isEmployee: false,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm((previousState) => {
      return { ...previousState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");

    // Handle API call to create account
    await axios
      .post("http://localhost:1000/get-started/signup", form)
      .then((res) => {
        // console.log("Response:", res);
        if (res.status === 200 && res.data.status === "success") {
          navigate("/SignUpSuccess");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelect = () => {};
  return (
    <Container>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <p>It's quick and easy.</p>
            <div className="mb-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-control"
                // value={form.fullName}
                // onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="userName"
                placeholder="Choose a username"
                className="form-control"
                value={form.userName}
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
          <p>
            Already an existing user?
            <Link onClick={handleSelect()}>Login Here</Link>
          </p>
        </Col>

        <Col>Hello</Col>
      </Row>
    </Container>
  );
}

export default CreateAccount;
