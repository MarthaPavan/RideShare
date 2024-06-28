import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
    const [image, setImage] = useState("/images/placeholder.jpg");

    const storedUser = localStorage.getItem('user');
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : {
        fullName: 'Guest',
        phoneNumber: '',
        emailId: '',
        registrationNumber: '',
        vehicleModel: '',
    });

    useEffect(() => {
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [storedUser]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put("http://localhost:1000/get-started/updateProfile", user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response && response.data && response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log("User profile updated:", response.data.user);
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (err) {
            console.error("Error updating profile:", err.response ? err.response.data.msg : err.message);
        }
    };

    const vehicleOptions = ['sedan', 'hatchback', 'SUV'];
    const editbtn = {
        position: 'absolute',
        bottom: 0,
        right: '50px',
        borderRadius: '50%',
        padding: '0.25rem',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    
    return (
        <div className="px-4 py-2">
            <Row>
                <Row className="gap-2">
                    <Col xs={2} className="position-relative">
                        <Image
                            src={image}
                            roundedCircle
                            height={"100px"}
                            className="profile-image"
                        />
                        <Button 
                            style={editbtn}
                            variant="primary" 
                            onClick={() => document.getElementById('imageInput').click()}
                        >
                            <i className="fa-solid fa-pen"></i>
                        </Button>
                       
                    </Col>
                    <Col>
                        <h1 className="display-6 pt-2">{user.fullName}</h1>
                        {user.phoneNumber && <p><i className="fa-solid fa fa-phone"></i> {user.phoneNumber}</p>}
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formFullName">
                                <Form.Label column sm="2">
                                    Full Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={user.fullName}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
                                <Form.Label column sm="2">
                                    Phone Number
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={user.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formEmailId">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="email"
                                        name="emailId"
                                        value={user.emailId}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formRegistrationNumber">
                                <Form.Label column sm="2">
                                    Registration Number
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        name="registrationNumber"
                                        value={user.registrationNumber}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                    
                            <Form.Group as={Row} className="mb-3" controlId="formVehicleModel">
                                <Form.Label column sm="2">
                                    Vehicle Model
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Select
                                        name="vehicleModel"
                                        value={user.vehicleModel}
                                        onChange={handleChange}
                                    >
                                        {vehicleOptions.includes(user.vehicleModel) ? null : (
                                            <option value={user.vehicleModel}>{user.vehicleModel}</option>
                                        )}
                                        {vehicleOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

export default Profile;
