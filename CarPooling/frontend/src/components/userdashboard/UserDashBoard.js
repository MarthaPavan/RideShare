import React from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import Dashboard from "./DashBoard";
import { useAuth } from "../../routes/AuthContext";
import Rides from "./Rides";

const UserDashBoard = () => {
  const [index, setIndex] = React.useState(0);
  const user = localStorage.getItem("name");
  const { logout } = useAuth(); // Destructure logout method properly
  const handleClick = (e) => {
    setIndex(e);
    console.log(e);
  };
  const handleLogOut = () => {
    logout(); // Call the logout method
  };
  const components = [<Profile />, <Dashboard />, <Rides />];
  return (
    <>
      <Row className="gx-4">
        <Col xs={2} className="px-0">
          <CSidebar className="border-end" style={{ height: "100vh" }}>
            <CSidebarHeader className="border-bottom">
              <CSidebarBrand className="text-decoration-none">
                Welcome {user ? user : "User"}
              </CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav variant="pills" layout="fill">
              <CNavItem
                href="#"
                active={index === 0}
                onClick={() => handleClick(0)}
              >
                <CIcon customClassName="nav-icon" icon={icon.cilUser} />
                Profile
              </CNavItem>
              <CNavItem
                href="#"
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
                href="#"
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
                href="#"
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
                href="#"
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
        <Col xs={10} className="px-5 py-3">
          {components[index]}
        </Col>
      </Row>
    </>
  );
};

export default UserDashBoard;
