import React, { useState, useEffect } from 'react';
import { Col, Card, Container, Nav, Row, Button, Pagination } from 'react-bootstrap';
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./dashboard.css";

const Rides = () => {
    const [key, setKey] = useState(0);
    const [activeRides, setActiveRides] = useState([]);
    const [pastRides, setPastRides] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [visibleFooters, setVisibleFooters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRides, setCurrentRides] = useState([]); // New state for current rides
    const ridesPerPage = 5;
    const emailId = JSON.parse(localStorage.getItem("user"))?.emailId;

    const fetchRides = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/book/getride/${emailId}`);
            const rides = response.data;
            const now = new Date();

            const active = rides.filter(ride => new Date(ride.date) >= now);
            const past = rides.filter(ride => new Date(ride.date) < now);

            setActiveRides(active);
            setPastRides(past);
        } catch (error) {
            console.error("Failed to fetch rides:", error);
        }
    };

    useEffect(() => {
        if (emailId) {
            fetchRides();
        } else {
            console.error("No email ID found in local storage.");
        }
    }, [emailId]);

    useEffect(() => {
        const ridesToDisplay = key === 0 ? activeRides : key === 1 ? pastRides : transactions;
        const indexOfLastRide = currentPage * ridesPerPage;
        const indexOfFirstRide = indexOfLastRide - ridesPerPage;
        setCurrentRides(ridesToDisplay.slice(indexOfFirstRide, indexOfLastRide));
    }, [activeRides, pastRides, transactions, currentPage, key]);

    const changeKey = (index) => {
        setKey(index);
        setCurrentPage(1);
    };

    const handleDelete = async (rideId) => {
        try {
            await axios.delete(`http://localhost:1000/book/deleteride/${rideId}`);
            fetchRides();
        } catch (error) {
            console.error("Failed to delete ride:", error);
        }
    };

    const toggleFooter = (rideId) => {
        setVisibleFooters((prevVisibleFooters) => ({
            ...prevVisibleFooters,
            [rideId]: !prevVisibleFooters[rideId],
        }));
    };

    const renderRides = () => {
        if (currentRides.length === 0) {
            return (
                <Card className="my-3">
                    <Card.Body>
                        <Card.Text>No rides available.</Card.Text>
                    </Card.Body>
                </Card>
            );
        }

        return (
            <>
                {currentRides.map(ride => {
                    const rideDate = ride.date instanceof Date ? ride.date : new Date(ride.date);
                    const formattedDate = format(rideDate, 'dd-MM-yyyy');
                    const formattedTime = ride.time;

                    const pickUpLocation = ride.routeDetails?.pickUpLocation || "N/A";
                    const dropLocation = ride.routeDetails?.dropLocation || "N/A";
                    console.log(ride);
                    return (
                        <Card key={ride._id} className="my-3 position-relative" style={{ cursor: "pointer" }}>
                            <Card.Body onClick={() => toggleFooter(ride._id)}>
                                <div>
                                    <Card.Title className="mb-3">
                                        <Row>
                                            <Col sm={4}>
                                                <span className="fw-bold text-success">Pickup:</span> {pickUpLocation}
                                            </Col>
                                            <Col sm={4} className="text-center">
                                                {key === 0 ? <FontAwesomeIcon icon={faLongArrowAltRight} beat /> : <FontAwesomeIcon icon={faLongArrowAltRight} />}
                                            </Col>
                                            <Col sm={4}>
                                                <span className="fw-bold text-danger">Drop:</span> {dropLocation}
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text className="mb-0"><span className="fw-bold">Date:</span> {formattedDate}</Card.Text>
                                    <Card.Text><span className="fw-bold">Time:</span> {formattedTime}</Card.Text>
                                    <Card.Text><span className="fw-bold">Seats:</span> {ride.capacity}</Card.Text>
                                </div>
                            </Card.Body>
                            {visibleFooters[ride._id] && (
                                <Card.Footer className="d-flex justify-content-end">
                                    <Button
                                        variant='danger'
                                        className="m-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toast.promise(
                                                handleDelete(ride._id),
                                                {
                                                    loading: 'Deleting...',
                                                    success: <b>Deleted successfully</b>,
                                                    error: <b>Could not delete</b>,
                                                },
                                                {
                                                    style: {
                                                        position: "top-right"
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Card.Footer>
                            )}
                        </Card>
                    );
                })}
                <Pagination className="justify-content-center mb-2">
                    {Array.from({ length: Math.ceil((key === 0 ? activeRides : pastRides).length / ridesPerPage) }, (_, idx) => (
                        <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </>
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
                    {key === 0 && renderRides()}
                    {key === 1 && renderRides()}
                    {key === 2 && (
                        <Card className="border-1 my-3">
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
};

export default Rides;
