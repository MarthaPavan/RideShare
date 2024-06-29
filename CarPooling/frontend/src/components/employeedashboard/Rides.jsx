import React, { useState } from 'react';

import { Col, Card, Container, Nav, Row } from 'react-bootstrap';
import "./dashboard.css";
const Rides = () => {

    const [key, setKey] = useState(0);
    const changeKey = (e) => {
        setKey(e);

        console.log(key)
    }
    return (
        <Container fluid >
            <Row className='px-4 py-2'>
                <Nav justify variant="tabs" fill >
                    <Nav.Item>
                        <Nav.Link to="#/active" active={key === 0} className={key === 0 ? "bg-dark  text-light" : "text-dark"} onClick={() => changeKey(0)}>Active/Upcoming</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="#" active={key === 1} className={key === 1 ? "bg-dark  text-light" : "text-dark"} onClick={() => changeKey(1)}>Past Rides</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="#/transactions" active={key === 2} className={key === 2 ? "bg-dark  text-light" : "text-dark"} onClick={() => changeKey(2)}>Transactions</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row className='flex-row justify-content-center m-3'>
                <Col className="border border-0 rounded-1 shadow-lg w-75 h-75">


                    <Card className="border-0 bg-slate">
                        <Card.Header>Card 1</Card.Header>
                        <Card.Body>
                            Cards every where
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container >
    );
}

export default Rides;