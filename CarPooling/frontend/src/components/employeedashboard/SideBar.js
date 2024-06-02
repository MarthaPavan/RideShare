import React from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavItem
  } from "@coreui/react";
  import CIcon from "@coreui/icons-react";
  import * as icon from "@coreui/icons";
  import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../routes/AuthContext";

const Sidebar = () => {
  const { logOut,user } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  return (
    <CSidebar className="border-end" style  = {{height : "100vh"}}>
  <CSidebarHeader className="border-bottom">
    <CSidebarBrand className="text-decoration-none">Welcome {user ? user.fullName : "Guest"}</CSidebarBrand>
  </CSidebarHeader>
  <CSidebarNav>
    {/*<CNavTitle>Nav Title</CNavTitle>*/}
    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={icon.cilGroup} />Profile</CNavItem>
     <CNavItem href="#">
          <FontAwesomeIcon icon={faCarSide} className={"nav-icon fa-thin fa-car-side"} />
         Rides
        </CNavItem>
    <CNavItem onClick={()=>handleLogout()} href="/"><CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />Logout</CNavItem>
  </CSidebarNav>

</CSidebar>
  );
};

export default Sidebar;
