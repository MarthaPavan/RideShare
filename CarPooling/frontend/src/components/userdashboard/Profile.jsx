import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const [image, setImage] = useState("/images/placeholder.jpg");

  // Retrieve and parse the user object from localStorage
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(
    storedUser
      ? JSON.parse(storedUser)
      : {
          _id: "",
          fullName: "Guest",
          phoneNumber: "",
          emailId: "",
          password: "",
          role: "",
          isVerified: false,
        }
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User profile updated:", user);
  };

  const editbtn = {
    position: "absolute",
    bottom: 0,
    right: "50px",
    borderRadius: "50%",
    padding: "0.25rem",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="px-2">
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
              onClick={() => document.getElementById("imageInput").click()}
            >
              <i className="fa-solid fa-pen"></i>
            </Button>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Col>
          <Col>
            <h1 className="display-6 pt-2">{user.fullName}</h1>
            {user.phoneNumber && (
              <p>
                <i className="fa-solid fa fa-phone"></i> {user.phoneNumber}
              </p>
            )}
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
