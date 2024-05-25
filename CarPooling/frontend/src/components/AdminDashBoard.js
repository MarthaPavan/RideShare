import React from "react";
import { Col, ListGroup, Row, Stack } from "react-bootstrap";
import "../App.css";

const AdminDashBoard = () => {
  const handleClick = () => {
    alert("Activate the profile");
  };

  return (
    <>
      <Row className="full-height">
        <Col xs={2} className="full-height">
          <Stack gap={3} className="stack-full-height">
            <ListGroup variant="flush" className="text-bg-dark" defaultActiveKey="#link1">
              <ListGroup.Item action onClick={handleClick}>
                Profile
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClick}>
                Employees 
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClick}>
                Routes 
              </ListGroup.Item>
              <ListGroup.Item action>
                SignOut
              </ListGroup.Item>
            </ListGroup>
          </Stack>
        </Col>
        <Col xs={10}>
          <div className="main-content">
            <h1>Admin dashboard</h1>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;
