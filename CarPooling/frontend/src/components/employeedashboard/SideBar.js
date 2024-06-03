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
import { useAuth } from "../../routes/AuthContext";
const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [index, setIndex] = React.useState(0);
  const handleLogout = () => {
    logOut();
  };

  const handleClick = (e) => {
    setIndex(e);
    console.log(e);
  };

  return (
    <CSidebar className="border-end" style={{ height: "100vh" }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="text-decoration-none">
          Welcome {user ? user.fullName : "Guest"}
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav variant="pills" layout="fill">
        {/*<CNavTitle>Nav Title</CNavTitle>*/}
        <CNavItem href="#" active={index === 0} onClick={() => handleClick(0)}>
          <CIcon
            customClassName="nav-icon"
            className="me-3"
            icon={icon.cilUser}
          />
          Profile
        </CNavItem>
        <CNavItem href="#" active={index === 1} onClick={() => handleClick(1)}>
          <FontAwesomeIcon
            icon={faCarSide}
            className={"nav-icon fa-thin fa-car-side"}
          />
          Rides
        </CNavItem>
        <CNavItem onClick={() => handleLogout()} href="/">
          <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />
          Logout
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
