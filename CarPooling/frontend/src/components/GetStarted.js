import React, { useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import '../GetStarted.css';

export default function GetStarted() {
    const [select, setSelect] = useState(-1);
    const navigate = useNavigate();

    

    const handleClick = () => {
        if (select === -1) {
            navigate("/");
        } else {
            const link = "/" + (select === 0 ? "join" : "create-account");
            navigate(link);
        }
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
                            className={`d-flex justify-content-between align-items-start ${select === 0 ? "selected" : ""}`}
                            onClick={() => setSelect(0)}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold p-1">I am here to give a ride</div>
                                <Link to="#" className="text-decoration-none text-dark">Help us in creating an impact</Link>
                            </div>
                        </ListGroup.Item>
                        <br />
                        <ListGroup.Item
                            as="li"
                            className={`d-flex justify-content-between align-items-start ${select === 1 ? "selected" : ""}`}
                            onClick={() => setSelect(1)}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold p-1">I want a ride</div>
                                <Link to="#" className="text-decoration-none text-dark">Sign Up to ride</Link>
                            </div>
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