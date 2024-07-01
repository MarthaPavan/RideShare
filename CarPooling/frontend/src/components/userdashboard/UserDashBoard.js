import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav, CNavItem } from "@coreui/react";
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
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from 'react-responsive';

const UserDashBoard = () => {
  const { logOut } = useAuth();
  const user = localStorage.getItem("name");
  const [index, setIndex] = useState(localStorage.getItem("index") || 0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const components = [<Profile />, <Dashboard />, <Rides />, <Feedback />, <ContactUs />];

  useEffect(() => {
    toast.success("Welcome to your dashboard", {
      position: 'top-right',
      style: {
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#4CAF50',
        secondary: '#FFFAEE',
      },
    });
  }, []);

  const handleLogout = () => {
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
      <Toaster />
      <Row className="g-0">
        <Col xs={12} className="d-md-none d-flex justify-content-between align-items-center mb-3">
          <Button variant="primary" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <span>Welcome {user ? user : "User"}</span>
        </Col>
        <Col xs={12} md={2} className={`d-flex flex-column ${isMobile ? (isSidebarOpen ? "d-block" : "d-none") : "d-block"}`}>
          <CSidebar className="border-end flex-grow-1" style={{ height: "100vh" }}>
            <CSidebarHeader className="border-bottom">
              <CSidebarBrand className="text-decoration-none">
                Welcome {user ? user : "User"}
              </CSidebarBrand>
            </CSidebarHeader>
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
          </CSidebar>
        </Col>
        <Col xs={12} md={10} className="p-0 mt-2">
          <div style={{ marginLeft: "50px" }}>
            {components[index]}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserDashBoard;
