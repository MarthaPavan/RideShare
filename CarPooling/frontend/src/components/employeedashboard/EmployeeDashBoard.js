import Sidebar from "./SideBar";

import {Row,Col} from "react-bootstrap"
const EmployeeDashBoard = () => {
    return(
        <>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10} className="p-0">
        </Col>
      </Row>

    </>
    )

}
 
export default EmployeeDashBoard;