import React, { useEffect } from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
} from "@coreui/react";
import { Container, Button } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide,faBars } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import Dashboard from "./DashBoard";
import { useAuth } from "../../routes/AuthContext";
import Rides from "./Rides";
import toast from "react-hot-toast";
const UserDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const user = localStorage.getItem("name");
  const { logout } = useAuth(); // Destructure logout method properly
  const handleClick = (e) => {
    setIndex(e);
    console.log(e);
  };
  useEffect(() => {
    toast.success("Welcome to your dashboard");
    }, []);
  const handleLogOut = () => {
    logout(); // Call the logout method
  };
  const components = [<Profile />, <Dashboard />, <Rides />];
  const toggleSidebar = () => {
    setIsSidebarOpen(isSidebarOpen ? false : true);
};
  return (

    <Container fluid className="p-4">
            <Row>
                {/* Toggle Button for Sidebar on Small Screens */}
                <Col xs={12} className="d-md-none d-flex justify-content-between align-items-center mb-3">
                    <Button variant="primary" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                    <span>Welcome {user ? user : "User"}</span>
                </Col>

                {/* Sidebar */}
                <Col xs={12} md={2} className={`px-0 ${isSidebarOpen ? 'd-block' : 'd-none d-md-block'}`}>
                    <CSidebar className="border-end" style={{ height: "100vh" }}>
                        <CSidebarHeader className="border-bottom">
                            <CSidebarBrand className="text-decoration-none">
                                Welcome {user ? user : "User"}
                            </CSidebarBrand>
                        </CSidebarHeader>
                        <CSidebarNav variant="pills" layout="fill">
                            <CNavItem
                                to ="#"
                                active={index === 0}
                                onClick={() => handleClick(0)}
                            >
                                <CIcon customClassName="nav-icon" icon={icon.cilUser} />
                                Profile
                            </CNavItem>
                            <CNavItem
                                to="#"
                                active={index === 1}
                                onClick={() => handleClick(1)}
                            >
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={icon.cilScreenDesktop}
                                />
                                Dashboard
                            </CNavItem>
                            <CNavItem
                                to ="#/rides"
                                active={index === 2}
                                onClick={() => handleClick(2)}
                            >
                                <FontAwesomeIcon
                                    icon={faCarSide}
                                    className={"nav-icon fa-thin fa-car-side"}
                                />
                                Previous Rides
                            </CNavItem>
                            <CNavItem
                                to="#"
                                active={index === 3}
                                onClick={() => handleClick(3)}
                            >
                                <FontAwesomeIcon
                                    icon={faMessage}
                                    className={"nav-icon fa-light fa-message"}
                                />
                                Feedback
                            </CNavItem>
                            <CNavItem
                                to="#/contactus"
                                active={index === 4}
                                onClick={() => handleClick(4)}
                            >
                                <CIcon customClassName="nav-icon" icon={icon.cilContact} />
                                Contact Us
                            </CNavItem>
                            <CNavItem href="/Login" onClick={handleLogOut}>
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={icon.cilAccountLogout}
                                />
                                Log out
                            </CNavItem>
                        </CSidebarNav>
                    </CSidebar>
                </Col>


                <Col xs={12} md={10} lg = {30} className="px-5 py-3">
                    {components[index]}
                </Col>
            </Row>
        </Container>
  );
};

export default UserDashBoard;
