import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
  Image,
} from "react-bootstrap";
import axios from "axios";

const JoinUs = () => {

  const [form, setForm] = useState({
    image : null,
    fullName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    role: "driver",
    vehicleModel: "",
    registrationNumber: "",
  });

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error,setError]  = useState("")
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation check
    if (
      !form.fullName ||
      !form.emailId ||
      !form.password ||
      !form.phoneNumber
    ) {
      alert("Please fill all required fields.");
      return;
    }
    form.phoneNumber = parseInt(form.phoneNumber);
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("emailId", form.emailId);
    formData.append("password", form.password);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("role", form.role);
    formData.append("vehicleModel", form.vehicleModel);
    formData.append("registrationNumber", form.registrationNumber);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    
    try {
      console.log(form);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/get-started/signup`,
        formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      console.log("Response:", response);
      if (response.status === 200 && response.data.msg === "success"){
        navigate("/SignUpSuccess");
      }
      else
      {
        setError(response.data.msg)
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during signup. Please try again./User already exists");
    }
  };

  const handleChange = (e) => {
    if(e.target.name === 'phoneNumber')
    {
      if(e.target.value.length > 10){
        setError("Invalid phonenumber")
        return;
      }
    }
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  //Profile picture selection
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
  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <Container fluid className="min-vh-100">
      <Row className="text-center my-5 h-100">
        <Col className="m-4 p-3 h-100 border md-w-100 border-1 border-dark-subtle shadow bg-bg-warning-subtle">
          <h1 className="mb-2 display-6 fw-bold text-text-dark-emphasis" >Join <span className="text-warning fw-bold">Us</span></h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Create Account</h2>
            {form.image && (
              <Image src={form.image} className="rounded-circle" style={{ width: "100px", height: "100px" }} />
            )}
          </div>
          
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
                    pattern="\d{10}"
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>
            <div className="text-start">
              Already an existing user{" "}
              <Link to="/Login" onClick={handleClick}>
                Login Here
              </Link>
            </div>
            <br />
            {error && 
              <div className="text-danger">{error}</div>
            }
            <Button variant="primary" className="align-items-end" type="submit">
              Register
            </Button>
          </Form>
        </Col>
        <Col className="m-4 p-3 d-none d-md-block">
          
          <Image
            className="mt-5"
            src="/images/driver_signup_page.jpg"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export default JoinUs;
