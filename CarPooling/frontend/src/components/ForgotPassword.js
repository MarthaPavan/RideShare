import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap"
import axios from "axios";

import { toast } from "react-hot-toast"
const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    emailId: "",
    password: ""
  });
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  const handleChange = (e) => {
    setInputValue((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (inputValue.emailId === "" || inputValue.password === "") {
        setError("Enter all the details")
        return;
      }
      const res = await axios.post(`${base_url}/get-started/forgot`, inputValue)
      if (res.status === 200) {
        toast.success("Password updated✅")
        navigate("/Login")
      }
    }
    catch (error) {
      setError("Couldn't update the password")
    }


  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="d-none d-md-block">
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
                No Problem! Enter your email address below and set new password
              </h4>
            </div>
            <Form.Group className="form-item hr-m-y-1 mb-3">
              <br />
              <Form.Control
                type="email"
                placeholder="Enter your Email Id"
                name="emailId"
                value={inputValue.emailId}

                onChange={handleChange}
                required
              />
              <br />
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
                required
              />{
                error &&
                <div className="text-danger">error</div>
              }
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
