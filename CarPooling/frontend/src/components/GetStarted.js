import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button, Image } from "react-bootstrap";

const selected = {
  backgroundColor: "#e9ecef",
  borderColor: "#000",
};

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
    <Container fluid>
      <Row className="align-items-start">
        <Col className="m-5 p-5 min-vh-100">
          <h1>How do you want to use RideShare?</h1>
          <p>We will personalize your account setup according to that</p>
          <ListGroup as="ul" className="mb-5">
            <ListGroup.Item
              as="li"
              style={select === 0 ? selected : {}}
              className="d-flex justify-content-between align-items-start"
              onClick={() => setSelect(0)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold p-1">I am here to give a ride</div>
                <Link to="#" className="text-decoration-none text-dark">
                  Help us in creating an impact
                </Link>
              </div>
            </ListGroup.Item>
            <br />
            <ListGroup.Item
              as="li"
              style={select === 1 ? selected : {}}
              className="d-flex justify-content-between align-items-start"
              onClick={() => setSelect(1)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold p-1">I want a ride</div>
                <Link to="#" className="text-decoration-none text-dark">
                  Sign Up to ride
                </Link>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex align-items-end">
            <Button variant="dark" onClick={handleClick}>
              Create Account
            </Button>
          </div>
        </Col>
        <Col className="d-none d-md-block min-vh-100"> {/* Hide on mobile */}
          <Image src={"/images/get_started.jpg"} alt="getstarted" fluid />
        </Col>
      </Row>
    </Container>
  );
}
