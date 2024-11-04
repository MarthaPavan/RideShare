import React, { useState, useEffect } from "react";
import { Row, Col, Button, Offcanvas, Toast, ToastContainer } from "react-bootstrap";
import { CSidebarNav, CNavItem, CSidebar, CSidebarHeader, CSidebarBrand } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { useAuth } from "../../routes/AuthContext";
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import Routes from "./Routes";
import { useMediaQuery } from 'react-responsive';

const AdminDashBoard = () => {
  const { logOut } = useAuth();
  const user = localStorage.getItem("name");
  const [index, setIndex] = useState(localStorage.getItem("index") || 0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const components = [<Dashboard />, <Employees />, <Routes onDelete={() => setIndex(2)} />];
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      sessionStorage.setItem("welcomeToastShown", "true");
      setToastMessage(`Welcome back, ${user ? user : "User"}`);
      setShowToast(true);
    }
  }, [user]);

  const handleLogout = () => {
    setToastMessage("Logged out successfully");
    setShowToast(true);
    sessionStorage.setItem("welcomeToastShown", "false");
    logOut();
  };

  const handleClick = (e) => {
    setIndex(e);
    localStorage.setItem("index", e);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
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
      <Row className="g-0">
        <Col xs={12} className="d-md-none d-flex justify-content-between align-items-center mb-3">
          <Button
            variant="link"
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              padding: 10,
              color: '#000',
              textDecoration: 'none'
            }}
          >
            <CIcon icon={icon.cilMenu} />
          </Button>
        </Col>
        {isMobile ? (
          <Offcanvas show={isSidebarOpen} onHide={() => setIsSidebarOpen(false)} placement="start" backdrop={true}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <CSidebarBrand className="text-decoration-none">
                  <img src="/images/logo_white.svg" alt="logo" style={{ height: '65px', width: '65px' }} />
                </CSidebarBrand>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <CSidebarNav variant="pills" layout="fill">
                <CNavItem href="#dashboard" active={index === 0} onClick={() => handleClick(0)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} /> Dashboard
                </CNavItem>
                <CNavItem href="#employees" active={index === 1} onClick={() => handleClick(1)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilPeople} /> Employees
                </CNavItem>
                <CNavItem href="#routes" active={index === 2} onClick={() => handleClick(2)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilMap} /> Routes
                </CNavItem>
                <CNavItem onClick={handleLogout} href="/login">
                  <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} /> Logout
                </CNavItem>
              </CSidebarNav>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          <Col xs={12} md={2} className="d-flex flex-column">
            <CSidebar className="border-end flex-grow-1" style={{ height: "100vh" }}>
              <CSidebarHeader className="border-bottom">
                <CSidebarBrand className="text-decoration-none">
                  Welcome {user ? user : "Guest"}
                </CSidebarBrand>
              </CSidebarHeader>
              <CSidebarNav variant="pills" layout="fill">
                <CNavItem href="#dashboard" active={index === 0} onClick={() => handleClick(0)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} /> Dashboard
                </CNavItem>
                <CNavItem href="#employees" active={index === 1} onClick={() => handleClick(1)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilPeople} /> Employees
                </CNavItem>
                <CNavItem href="#routes" active={index === 2} onClick={() => handleClick(2)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilMap} /> Routes
                </CNavItem>
                <CNavItem onClick={handleLogout} href="/login">
                  <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} /> Logout
                </CNavItem>
              </CSidebarNav>
            </CSidebar>
          </Col>
        )}
        <Col xs={12} md={10} className="p-0 mt-2">
          <div style={{ marginLeft: isMobile ? "0" : "50px" }}>
            {components[index]}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;
