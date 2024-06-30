import React, { useState, useEffect } from 'react';
import { Col, Card, Container, Nav, Row } from 'react-bootstrap';
import { format } from 'date-fns'; // Assuming you're using date-fns for date formatting
import axios from 'axios';
import "./dashboard.css";

const Rides = () => {
    const [key, setKey] = useState(0);
    const [activeRides, setActiveRides] = useState([]);
    const [pastRides, setPastRides] = useState([]);
    const [transactions, setTransactions] = useState([]);

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
                //console.log(activeRides);
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
        return rides.map(ride => {
            // Convert ride.date to a Date object if it's not already
            const rideDate = ride.date instanceof Date ? ride.date : new Date(ride.date);
    
            // Format date as day-month-year
            const formattedDate = format(rideDate, 'dd-MM-yyyy');
            
            // Format time
            const formattedTime = rideDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
            return (
                <Card key={ride._id} className="mb-3">
                    <Card.Body>
                        <Card.Title className="mb-3">
                            <Row>
                                <Col sm={4}>
                                    <span className="fw-bold text-success">Pickup Location:</span> {ride.pickUpLocation}
                                </Col>
                                <Col sm={4} className="text-center">
                                    <i className="bi bi-arrow-right"></i>
                                </Col>
                                <Col sm={4}>
                                    <span className="fw-bold text-danger">Drop Location:</span> {ride.dropLocation}
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text className="mb-0"><span className="fw-bold">Date:</span> {formattedDate}</Card.Text>
                        <Card.Text><span className="fw-bold">Time:</span> {formattedTime}</Card.Text>
                        <Card.Text><span className="fw-bold">Seats:</span> {ride.capacity}</Card.Text>
                    </Card.Body>
                </Card>
            );
        });
    }
    
    return (
        <Container fluid>
            <Row className='py-2 px-3'>
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
