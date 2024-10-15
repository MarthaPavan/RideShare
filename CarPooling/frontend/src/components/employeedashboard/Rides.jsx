import React, { useState, useEffect } from 'react';
import { Col, Card, Container, Nav, Row, Button, Pagination, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import axios from 'axios';
import "./dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import UserDetailsModal from './userDetailsModal'; // Import the UserDetailsModal component

const Rides = () => {
    const [key, setKey] = useState(0);
    const [activeRides, setActiveRides] = useState([]);
    const [pastRides, setPastRides] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [visibleFooters, setVisibleFooters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const ridesPerPage = 5;
    const email = JSON.parse(localStorage.getItem('user')).emailId;

    const fetchRides = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/routes/driver-route/${email}`);
            const rides = response.data;
            const now = new Date();

            const active = rides.filter(ride => new Date(ride.date) >= now);
            const past = rides.filter(ride => new Date(ride.date) < now);

            setActiveRides(active);
            setPastRides(past);
        } catch (error) {
            console.error("Failed to fetch rides", error);
        }
    };

    useEffect(() => {
        fetchRides();
    }, []);

    const changeKey = (index) => {
        setKey(index);
        setCurrentPage(1);
    };

    const handleDelete = async (routeId) => {
        try {
            await axios.delete(`http://localhost:1000/rides/deleteride/${routeId}`);
            fetchRides();
        } catch (error) {
            console.error("Failed to delete ride", error);
        }
    };

    const toggleFooter = (rideId) => {
        setVisibleFooters((prevVisibleFooters) => ({
            ...prevVisibleFooters,
            [rideId]: !prevVisibleFooters[rideId],
        }));
    };

    useEffect(() => {
        const indexOfLastRide = currentPage * ridesPerPage;
        const indexOfFirstRide = indexOfLastRide - ridesPerPage;
        const currentRides = (key === 0 ? activeRides : pastRides).slice(indexOfFirstRide, indexOfLastRide);
    }, [currentPage, key, activeRides, pastRides]);

    const renderRides = (rides) => {
        if (rides.length === 0) {
            return (
                <Card className="my-3">
                    <Card.Body>
                        <Card.Text>No rides available.</Card.Text>
                    </Card.Body>
                </Card>
            );
        }

        const indexOfLastRide = currentPage * ridesPerPage;
        const indexOfFirstRide = indexOfLastRide - ridesPerPage;
        const currentRides = rides.slice(indexOfFirstRide, indexOfLastRide);

        return (
            <>
                {currentRides.map(ride => {
                    const rideDate = new Date(ride.date);
                    const formattedDate = format(rideDate, 'dd-MM-yyyy');
                    const formattedTime = ride.time;

                    return (
                        <Card key={ride._id} className="my-3 position-relative" style={{ cursor: "pointer" }}>
                            <Card.Body onClick={() => toggleFooter(ride._id)}>
                                <div>
                                    <Card.Title className="mb-3">
                                        <Row>
                                            <Col sm={4}>
                                                <span className="fw-bold text-success">Pickup Location:</span> {ride.pickUpLocation}
                                            </Col>
                                            <Col sm={4} className="text-center">
                                                {key === 0 ? <FontAwesomeIcon icon={faLongArrowAltRight} beat /> : <FontAwesomeIcon icon={faLongArrowAltRight} />}
                                            </Col>
                                            <Col sm={4}>
                                                <span className="fw-bold text-danger">Drop Location:</span> {ride.dropLocation}
                                            </Col>
                                            {ride.notify&& key===0 && (
                                                <Badge bg="danger" className="position-absolute rounded-circle" style={{ width: '20px', height: '20px',top:"-10px",right:"-5px" }}> </Badge>
                                            )}
                                        </Row>
                                    </Card.Title>
                                    <Card.Text className="mb-0"><span className="fw-bold">Date:</span> {formattedDate}</Card.Text>
                                    <Card.Text><span className="fw-bold">Time:</span> {formattedTime}</Card.Text>
                                    <Card.Text><span className="fw-bold">Seats:</span> {ride.capacity}</Card.Text>
                                </div>
                            </Card.Body>
                            {visibleFooters[ride._id] && (
                                <Card.Footer className="d-flex justify-content-end">
                                    {key===0 &&
                                    <Button
                                        variant='danger'
                                        className="m-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toast.promise(
                                                handleDelete(ride.routeId),
                                                {
                                                    loading: 'Deleting...',
                                                    success: <b>Deleted successfully</b>,
                                                    error: <b>Could not delete</b>,
                                                },
                                                {
                                                    style: {
                                                        position: "top-left"
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                }
                                    <UserDetailsModal routeId={ride._id} /> 
                                </Card.Footer>
                            )}
                        </Card>
                    );
                })}
                <Pagination className="justify-content-center mb-2">
                    {Array.from({ length: Math.ceil(rides.length / ridesPerPage) }, (_, idx) => (
                        <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </>
        );
    };

    const renderTransactions = (transactions) => {
        if (transactions.length === 0) {
            return (
                <Card className="my-3">
                    <Card.Body>
                        <Card.Text>No transactions available.</Card.Text>
                    </Card.Body>
                </Card>
            );
        }

        // Render transactions if available
        // This is just a placeholder, replace it with actual transaction rendering logic
        return (
            <Card className="my-3">
                <Card.Body>
                    <Card.Text>Transactions go here.</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Container fluid className='min-vh-100'>
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
                <Col className="border rounded shadow-lg w-75 h-75" style={{ backgroundColor: "#E8E8E8" }}>
                    {key === 0 && renderRides(activeRides)}
                    {key === 1 && renderRides(pastRides)}
                    {key === 2 && renderTransactions(transactions)}
                </Col>
            </Row>
        </Container>
    );
};

export default Rides;
