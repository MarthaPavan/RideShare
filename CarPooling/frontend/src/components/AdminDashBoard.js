import React from "react";
import { Col, ListGroup, Row, Stack } from "react-bootstrap";
import "../App.css";

const AdminDashBoard = () => {
  return (
    <>
      <Row className="no-gutters">
        <Col xs={2} className="sidebar-column">
          <Stack gap={2}>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-bg-dark">
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item className="text-bg-dark">
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item className="text-bg-dark">
                Morbi leo risus
              </ListGroup.Item>
              <ListGroup.Item className="text-bg-dark">
                Porta ac consectetur ac
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
