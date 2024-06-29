
import {Row,Col} from "react-bootstrap"
import { useState } from "react";
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
import NewRide from "./NewRide";
import Profile from "./Profile";
import Rides from "./Rides";
import DashBoard from "./DashBoard";
const EmployeeDashBoard = () => {
  const { logOut} = useAuth();
  const user = localStorage.getItem("name");
  const [index, setIndex] = useState(0);
  const components = [<Profile />,<DashBoard/>,<NewRide/>, <Rides />];
  const handleLogout = () => {
    logOut();
  };

  const handleClick = (e) => {
    setIndex(e);
  };
    return(
        <>
      <Row>
        <Col xs={2}>
        <CSidebar className="border-end" style={{ height: "100vh" }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="text-decoration-none">
          Welcome {user ? user : "Guest"}
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav variant="pills" layout="fill">
        {/*<CNavTitle>Nav Title</CNavTitle>*/}
        <CNavItem href="#profile" active={index === 0} onClick={() => handleClick(0)}>
          <CIcon
            customClassName="nav-icon"
            className="me-3"
            icon={icon.cilUser}
          />
          Profile
        </CNavItem>
        <CNavItem href = "#home" active  = {index === 1} onClick={()=>handleClick(1)}>
          <CIcon  />
          DashBoard
        </CNavItem>
        <CNavItem href="#new-ride" active={index === 2} onClick={() => handleClick(2)}>
        <CIcon customClassName="nav-icon" icon={icon.cilScreenDesktop}/>
          Offer ride
        </CNavItem>
        <CNavItem href="#rides" active={index === 3} onClick={() => handleClick(3)}>
          <FontAwesomeIcon
            icon={faCarSide}
            className={"nav-icon fa-thin fa-car-side"}
          />
          Rides
        </CNavItem>
        <CNavItem onClick={() => handleLogout()} href="/Login">
          <CIcon customClassName="nav-icon" icon={icon.cilAccountLogout} />
          Logout
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
        </Col>
        <Col xs={10} className="p-0">
          <div style={{ marginLeft: "50px" }}>
            {components[index]}
          </div>
        </Col>
      </Row>

    </>
    )

}
 
export default EmployeeDashBoard;