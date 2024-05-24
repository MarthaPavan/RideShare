import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

export default function GetStarted() {
    const [select, setSelect] = useState(-1);
    const navigate = useNavigate();

    const handleSelect = (index) => {
        setSelect(index);
        console.log(select)
    };

    const handleClick = () => {
        if (select === -1)
            navigate("/")
        const link = "/" + (select === 0 ? "join" : "create-account");
        navigate(link);
    };

    return (
        <Container>
            <Row className="align-items-start">
                <Col className="m-5 p-5">
                    <h1>How do you want to use RideShare?</h1>
                    <p>We will personalize your account setup according to that</p>
                    <ListGroup as="ul" className="mb-5">
                        <ListGroup.Item
                            as="li"
                            className={`d-flex justify-content-between align-items-start ${select === 0 ? "selected" : ""
                                }`}
                            onClick={() => handleSelect(0)}
                        >
                            <Link to="#" className="text-decoration-none text-dark">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold p-1">I am here to give a ride</div>
                                    Help us in creating an impact
                                </div>
                            </Link>
                        </ListGroup.Item>
                        <br />
                        <ListGroup.Item
                            as="li"
                            className={`d-flex justify-content-between align-items-start `}
                            style={{ border: "1px solid black" }}
                            onClick={() => handleSelect(1)}
                        >
                            <Link to="#" className="text-decoration-none text-dark">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold p-1">I want a ride</div>
                                    Sign Up to ride
                                </div>
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="d-flex align-items-end">
                        <Button variant="dark" onClick={handleClick}>
                            Create Account
                        </Button>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
