import React, { useEffect } from "react";
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
import { faCarSide, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../routes/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();
  const [index, setIndex] = React.useState(0);

  const handleClick = (e) => {
    setIndex(e);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logOut();
    navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem("status")) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <CSidebar className="border-end" style={{ height: "100vh" }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="text-decoration-none">
          Welcome {user ? user : "Guest"}
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav variant="pills" layout="fill">
        <CNavItem href="#" active={index === 0} onClick={() => handleClick(0)}>
          <CIcon customClassName="nav-icon" icon={icon.cilUser} />Profile
        </CNavItem>
        <CNavItem href="#" active={index === 1} onClick={() => handleClick(1)}>
          <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} /> Dashboard
        </CNavItem>
        <CNavItem href="#" active={index === 2} onClick={() => handleClick(2)}>
          <FontAwesomeIcon icon={faCarSide} className="nav-icon" /> Previous Rides
        </CNavItem>
        <CNavItem href="#" active={index === 3} onClick={() => handleClick(3)}>
          <FontAwesomeIcon icon={faMessage} className="nav-icon" /> Feedback
        </CNavItem>
        <CNavItem href="#" active={index === 4} onClick={() => handleClick(4)}>
          <CIcon customClassName="nav-icon" icon={icon.cilContact} />Contact Us
        </CNavItem>
        <CNavItem href="/" onClick={handleLogout}>
          <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />Log out
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
