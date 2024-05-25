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
 

const Sidebar = () => {
  return (
    <CSidebar className="border-end">
  <CSidebarHeader className="border-bottom">
    <CSidebarBrand className="text-decoration-none">ADMIN</CSidebarBrand>
  </CSidebarHeader>
  <CSidebarNav>
    <CNavTitle>Nav Title</CNavTitle>
    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={icon.cilGroup} />Employees</CNavItem>
    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={icon.cilPuzzle} /> With badge </CNavItem>
    <CNavGroup
      toggler={
        <>
          <CIcon customClassName="nav-icon" icon={icon.cilPuzzle} /> Nav dropdown
        </>
      }
    >
      <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
      <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
    </CNavGroup>
    <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={icon.cilCloudDownload} /> Download CoreUI</CNavItem>
    <CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={icon.cilLayers} /> Try CoreUI PRO</CNavItem>
  </CSidebarNav>
  
</CSidebar>
  );
};

export default Sidebar;
