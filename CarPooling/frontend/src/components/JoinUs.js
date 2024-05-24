import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Container, Row, Col, Button, FormGroup, Form} from "react-bootstrap";
import axios from "axios";
const JoinUs = () => {
    const [form, setForm] = React.useState({
        fullName : "",
        userName : "",
        emailId : "",
        isEmployee : true,
        password : "",
        phoneNumber : "",
        vehicleType : "",
        vehicleNumber : ""
    });
  const navigate = useNavigate();
  const handleSignUp = async  (e) => {
      e.preventDefault()
      form.phoneNumber = parseInt(form.phoneNumber)
      console.log(form)
      // await axios.post("http://localhost:1000/get-started/signup",form).then((res)=>{
      //     if(res.status === 200 && res.data.status === "success")
      //         navigate("/Login");
      //     else
      //         alert("unsuccess")
      // })

  };
const handleChange = (e) => {
        setForm((prevState) => {return { ...prevState, [e.target.name]: e.target.value }});
}
const handleClick = ()=>{
    navigate("/Login");
}
  return (
    <Container>
      <Row className="text-center my-5">
        <Col className="m-5 p-5">
          <h1>Join us</h1>
            <h2>Create Account</h2>
            <Form onSubmit={handleSignUp}>
                <Form.Group>
                    <Form.Control
                            type="text"
                            name = "fullName"
                            placeholder="Enter full name"
                            value={form.fullName}
                            onChange={handleChange}
                        ></Form.Control><br/>
                        <Form.Control
                            type="text"
                            name = "userName"
                            placeholder="Enter Username"
                            value={form.userName}
                            onChange={handleChange}
                        ></Form.Control><br/>
                    <FormGroup className="d-inline-flex mb-2">
                    <Form.Control
                        type="email"
                        name = "emailId"
                        placeholder="Email Address"
                        value={form.emailId}
                        onChange={handleChange}
                        ></Form.Control>
                        <Form.Control
                        type="tel"
                        name = "phoneNumber"
                        placeholder="Mobile Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        ></Form.Control>
                    </FormGroup>
                    <Form.Control
                        type="password"
                        name = "password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    ></Form.Control><br/>

    <Form.Select aria-label="Default select example">
      <option>Select Your Vehicle Model</option>
      <option value="1">Sedan</option>
      <option value="2">HatchBack</option>
      <option value="3">SUV</option>
    </Form.Select>
                    <Form.Control
                        type="text"
                        name="vehicleNumber"
                        placeholder="Your Vehicle's Registration Number"
                        value={form.vehicleNumber}
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
            </Form>
            <div className={"text-start"}>Already an existing user <Link to = "#" onClick={handleClick}>Login Here</Link></div><br/>
            <Button variant="primary" className="align-items-end" type="submit">Register</Button>
        </Col>
      <Col></Col>
      </Row>
    </Container>
  );
};

export default JoinUs;
