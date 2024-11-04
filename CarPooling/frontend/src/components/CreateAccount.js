import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import axios from "axios";

function CreateAccount() {
  const [form, setForm] = useState({
    image: null, // Default image path
    fullName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected image file
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'phoneNumber')
    {
      if(form.name.length > 10)
      {
        setError("Invalid phone number")
        return;
      }
    }
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Read the file and set as data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prevState) => ({ ...prevState, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields to formData
    formData.append("fullName", form.fullName);
    formData.append("emailId", form.emailId);
    formData.append("password", form.password);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("role", form.role);

    // Append selected file to formData
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await axios.post(`${base_url}/get-started/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200 && res.data.msg === "success") {
        navigate("/SignUpSuccess");
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      console.error(err);
     }
    }
  return (
    <Container fluid className="min-vh-100">
      <Row className="flex-fill align-items-center justify-content-center">
        <Col className="m-3 p-3 border border-1 border-dark-subtle shadow">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Sign Up</h2>
            {form.image && (
              <Image src={form.image} className="rounded-circle" style={{ width: "100px", height: "100px" }} />
            )}
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <p>It's quick and easy.</p>
            <div className="mb-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-control"
                value={form.fullName}
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
            <div className="mb-3">
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            
            <Button variant="success" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </form>
          <p className="mt-3">
            Already an existing user? <Link to="/Login">Login Here</Link>
          </p>
        </Col>
        <Col className="m-5 p-5 d-none d-md-block">
          <Image src="/images/user_signup.jpg" fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAccount;
