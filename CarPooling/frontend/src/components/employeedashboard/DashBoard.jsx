import { Col, Container } from "react-bootstrap";

export default function DashBoard() {
    return (
        <Container>
            <Col xs={2}>
                Any charts here
            </Col>
            <Col xs={12}>
                Recent activity
            </Col>
        </Container>
    );
}