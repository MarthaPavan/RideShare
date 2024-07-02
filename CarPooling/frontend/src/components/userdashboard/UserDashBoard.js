import React, { useState, useEffect } from "react";
import { Row, Col, Button, Offcanvas, Toast, ToastContainer } from "react-bootstrap";
import { CSidebarNav, CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faBars, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../routes/AuthContext";
import Profile from "./Profile";
import Dashboard from "./DashBoard";
import Rides from "./Rides";
import Feedback from './Feedback';
import ContactUs from "./Contactus";
import { useMediaQuery } from 'react-responsive';

const UserDashBoard = () => {
  const { logOut } = useAuth();
  const user = localStorage.getItem("name");
  const [index, setIndex] = useState(localStorage.getItem("index") || 0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const components = [<Profile />, <Dashboard />, <Rides />, <Feedback />, <ContactUs />];

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
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
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
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </Col>
        {isMobile ? (
          <Offcanvas show={isSidebarOpen} onHide={toggleSidebar} responsive="md">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title><img src="/images/logo_white.svg" alt="logo" style={{ height: '65px', width: '65px' }} /></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Offcanvas.Title>Welcome {user ? user : "User"}</Offcanvas.Title>
              <CSidebarNav variant="pills" layout="fill">
                <CNavItem href="#profile" active={index === 0} onClick={() => handleClick(0)}>
                  <CIcon customClassName="nav-icon me-3" icon={icon.cilUser} />
                  Profile
                </CNavItem>
                <CNavItem href="#dashboard" active={index === 1} onClick={() => handleClick(1)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} />
                  Dashboard
                </CNavItem>
                <CNavItem href="#rides" active={index === 2} onClick={() => handleClick(2)}>
                  <FontAwesomeIcon icon={faCarSide} className="nav-icon" />
                  Previous Rides
                </CNavItem>
                <CNavItem href="#feedback" active={index === 3} onClick={() => handleClick(3)}>
                  <FontAwesomeIcon icon={faMessage} className="nav-icon" />
                  Feedback
                </CNavItem>
                <CNavItem href="#contactus" active={index === 4} onClick={() => handleClick(4)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilContact} />
                  Contact Us
                </CNavItem>
                <CNavItem onClick={() => handleLogout()} href="/Login">
                  <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />
                  Logout
                </CNavItem>
              </CSidebarNav>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          <Col xs={12} md={2} className={`d-none d-md-flex flex-column`}>
            <div className="border-end flex-grow-1" style={{ height: "100vh" }}>
              <div className="border-bottom p-3">
                Welcome {user ? user : "User"}
              </div>
              <CSidebarNav variant="pills" layout="fill">
                <CNavItem href="#profile" active={index === 0} onClick={() => handleClick(0)}>
                  <CIcon customClassName="nav-icon me-3" icon={icon.cilUser} />
                  Profile
                </CNavItem>
                <CNavItem href="#dashboard" active={index === 1} onClick={() => handleClick(1)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} />
                  Dashboard
                </CNavItem>
                <CNavItem href="#rides" active={index === 2} onClick={() => handleClick(2)}>
                  <FontAwesomeIcon icon={faCarSide} className="nav-icon" />
                  Previous Rides
                </CNavItem>
                <CNavItem href="#feedback" active={index === 3} onClick={() => handleClick(3)}>
                  <FontAwesomeIcon icon={faMessage} className="nav-icon" />
                  Feedback
                </CNavItem>
                <CNavItem href="#contactus" active={index === 4} onClick={() => handleClick(4)}>
                  <CIcon customClassName="nav-icon" icon={icon.cilContact} />
                  Contact Us
                </CNavItem>
                <CNavItem onClick={() => handleLogout()} href="/Login">
                  <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />
                  Logout
                </CNavItem>
              </CSidebarNav>
            </div>
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

export default UserDashBoard;
