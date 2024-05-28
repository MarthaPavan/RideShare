import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../App.css";
import Sidebar from "./Sidebar";


const UserDashBoard = () => {
  return (
    <>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10} className="p-0">
        </Col>
      </Row>

    </>
  );
};

export default UserDashBoard;
