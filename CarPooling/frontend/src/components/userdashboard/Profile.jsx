import React, { useState } from "react";
import { Row, Col, Image, Button, Placeholder } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
    const [image, setImage] = useState("/images/placeholder.jpg");

    // Retrieve and parse the user object from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : { fullName: 'Guest', phoneNumber: '' };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
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
                            className="edit-button" 
                            variant="primary" 
                            onClick={() => document.getElementById('imageInput').click()}
                        >
                            <i class="fa-solid fa-pen"></i>

                        </Button>

                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                    </Col>
                    <Col>
                        <h1 className="display-6">{user.fullName}</h1>
                        {user.phoneNumber && <p><i className="fa-solid fa fa-phone"></i> {user.phoneNumber}</p>}
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col xs={2}>
                        <Placeholder as="p" animation="wave">
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as='p' animation="wave"><Placeholder xs={12} /></Placeholder>
                        <Placeholder as='p' animation="wave"><Placeholder xs={12} /></Placeholder>
                        <Placeholder as='p' animation="wave"><Placeholder xs={12} /></Placeholder>
                    </Col>
                    <Col xs={10}>
                        <Placeholder as="p" animation="wave">
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as='p' animation="wave"><Placeholder xs={12} /></Placeholder>
                        <Placeholder as='p' animation="wave"><Placeholder xs={12} /></Placeholder>
                        <Placeholder as='p' animation="wave"><Placeholder xs={12} /></Placeholder>
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

export default Profile;





