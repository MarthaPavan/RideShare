import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import "../App.css";

const AdminDashBoard = () => {
  return (
    <>
      <Row className="full-height">
        <Col xs={2} className="full-height">
          <CSidebar className="border-end" colorScheme="dark" unfoldable>
            <CSidebarHeader className="border-bottom">
              <CSidebarBrand>CUI</CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav>
              <CNavTitle>Nav Title</CNavTitle>
              <CNavItem href="#">
                <CIcon customClassName="nav-icon" icon={icon.cilSpeedometer} />{" "}
                Nav item
              </CNavItem>
              <CNavItem href="#">
                <CIcon customClassName="nav-icon" icon={icon.cilSpeedometer} />{" "}
                new
              </CNavItem>
              <CNavGroup
                toggler={
                  <>
                    <CIcon
                      customClassName="nav-icon"
                      icon={icon.cilPuzzle}
                    />{" "}
                    Nav dropdown
                  </>
                }
              >
                <CNavItem href="#">
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Nav dropdown item
                </CNavItem>
                <CNavItem href="#">
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Nav dropdown item
                </CNavItem>
              </CNavGroup>
              <CNavItem href="https://coreui.io">
                <CIcon
                  customClassName="nav-icon"
                  icon={icon.cilCloudDownload}
                />{" "}
                Download CoreUI
              </CNavItem>
              <CNavItem href="https://coreui.io/pro/">
                <CIcon customClassName="nav-icon" icon={icon.cilLayers} /> Try
                CoreUI PRO
              </CNavItem>
            </CSidebarNav>
          </CSidebar>
        </Col>
        <Col xs={10}>
          <div className="main-content">
            <h1>Admin dashboard</h1>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;
