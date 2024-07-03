import React, { useState, useEffect } from "react";
import { Col, Row, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import Routes from "./Routes";
import Employees from "./Employees";
import Dashboard from "./Dashboard";
import { useAuth } from "../../routes/AuthContext";

const AdminDashBoard = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const user = localStorage.getItem("name");
  const [index, setIndex] = useState(localStorage.getItem("index") || 0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const components = [
    <Dashboard />,
    <Employees />,
    <Routes onDelete={() => setIndex(2)} />
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToastMessage(`Welcome back, ${user ? user : "User"}`);
      setShowToast(true);
    }
  }, [user]);

  const handleLogout = () => {
    setToastMessage("Logged out successfully");
    setShowToast(true);
    logOut();
    navigate("/login");
  };

  const handleClick = (e) => {
    setIndex(e);
    localStorage.setItem("index", e);
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={20000} autohide>
          <Toast.Header>
            <strong className="me-auto">Dashboard</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="gx-4">
        <Col xs={2} className="px-0">
          <CSidebar className="border-end flex-grow-1-end" style={{ height: "100vh" }}>
            <CSidebarHeader className="border-bottom">
              <CSidebarBrand className="text-decoration-none">
                Welcome {user ? user : "Guest"}
              </CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav variant="pills" layout="fill">
              <CNavItem
                href="#/dashboard"
                active={index === 0}
                onClick={() => handleClick(0)}
              >
                <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} /> Dashboard
              </CNavItem>
              <CNavItem
                href="#/employees"
                active={index === 1}
                onClick={() => handleClick(1)}
              >
                <CIcon customClassName="nav-icon" icon={icon.cilPeople} /> Employees
              </CNavItem>
              <CNavItem
                href="#/routes"
                active={index === 2}
                onClick={() => handleClick(2)}
              >
                <CIcon customClassName="nav-icon" icon={icon.cilMap} /> Routes
              </CNavItem>
              <CNavItem onClick={handleLogout} href="/login">
                <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} /> Logout
              </CNavItem>
            </CSidebarNav>
          </CSidebar>
        </Col>
        <Col xs={10} className="p-5">
          {components[index]}
        </Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;
