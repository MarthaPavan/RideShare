import React, { useState, useEffect } from 'react';
import { Col, Card, Container, Nav, Row } from 'react-bootstrap';
import axios from 'axios';
import "./dashboard.css";
import Loader from '../Loader';

const Rides = () => {
    const [key, setKey] = useState(0);
    const [activeRides, setActiveRides] = useState([]);
    const [pastRides, setPastRides] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://localhost:1000/rides/fetchrides');
                const rides = response.data;
                const now = new Date();

                // Filter rides based on current time
                const active = rides.filter(ride => new Date(ride.date) >= now);
                const past = rides.filter(ride => new Date(ride.date) < now);

                setActiveRides(active);
                setPastRides(past);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch rides", error);
            }
        };

        fetchRides();
    }, []); // Run once when component mounts, no dependencies

    const changeKey = (e) => {
        setKey(e);
    };

    const renderRides = (rides) => {
        return rides.map(ride => (
            <Card key={ride._id} className="mb-3">
                <Card.Header>{ride.startPoint} to {ride.endPoint}</Card.Header>
                <Card.Body>
                    <Card.Text>Date: {ride.date}</Card.Text>
                    <Card.Text>Seats: {ride.seats}</Card.Text>
                </Card.Body>
            </Card>
        ));
    };

    return (
        <Container fluid>
            <Row>
                <Nav justify variant="tabs" fill>
                    <Nav.Item>
                        <Nav.Link active={key === 0} className={key === 0 ? "bg-dark text-light" : "text-dark"} onClick={() => changeKey(0)}>Active/Upcoming</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={key === 1} className={key === 1 ? "bg-dark text-light" : "text-dark"} onClick={() => changeKey(1)}>Past Rides</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={key === 2} className={key === 2 ? "bg-dark text-light" : "text-dark"} onClick={() => changeKey(2)}>Transactions</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            {loading && <Loader />}
            <Row className='flex-row justify-content-center m-3'>
                <Col className="border border-0 rounded-1 shadow-lg w-75 h-75">
                    {key === 0 && renderRides(activeRides)}
                    {key === 1 && renderRides(pastRides)}
                    {key === 2 && (
                        <Card className="border-0 bg-slate">
                            <Card.Header>Transactions</Card.Header>
                            <Card.Body>
                                {/* Assuming transactions would have a similar structure */}
                                Transactions go here.
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>

        </Container>
    );
}

export default Rides;
