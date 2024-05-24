import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const JoinUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/GetStarted");
  };

  return (
    <Container>
      <Row className="text-center my-5">
        <Col>
          <h1>Join us</h1>
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <p>Help us in creating an impact</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleClick}>
              Join us
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default JoinUs;
