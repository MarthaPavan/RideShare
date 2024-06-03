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

const Sidebar = () => {
  return (
    <CSidebar className="border-end" style={{ height: "100vh" }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="text-decoration-none">ADMIN</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav variant="pills" layout="fill">
        {/* <CNavTitle>Nav Title</CNavTitle> */}
        <CNavItem href="#">
          <CIcon customClassName={"nav-icon"} icon={icon.cilUser} />
          Profile
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop} />{" "}
          Dashboard
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={icon.cilPeople} />
          Employees
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={icon.cilMap} /> Routes
        </CNavItem>
        <CNavItem href="/">
          <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />
          Log out
        </CNavItem>
        {/*<CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={icon.cilLayers} /> Try CoreUI PRO</CNavItem>*/}
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
