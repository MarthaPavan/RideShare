import React from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavItem,
    CNavTitle,
    CNavGroup
  } from "@coreui/react";
  import CIcon from "@coreui/icons-react";
  import * as icon from "@coreui/icons";
  import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <CSidebar className="border-end" style  = {{height : "100vh"}}>
  <CSidebarHeader className="border-bottom">
    <CSidebarBrand className="text-decoration-none">Welcome [Your name]</CSidebarBrand>
  </CSidebarHeader>
  <CSidebarNav>
    {/*<CNavTitle>Nav Title</CNavTitle>*/}
    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={icon.cilGroup} />Profile</CNavItem>
     <CNavItem href="#">
          <FontAwesomeIcon icon={faCarSide} className={"nav-icon fa-thin fa-car-side"} />
         Rides
        </CNavItem>
    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />Logout</CNavItem>
  </CSidebarNav>

</CSidebar>
  );
};

export default Sidebar;
