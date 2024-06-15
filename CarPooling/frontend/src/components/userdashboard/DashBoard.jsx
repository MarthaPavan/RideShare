import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SearchList } from './SearchList'; // Ensure SearchList is properly implemented
import axios from 'axios';
import debounce from 'lodash.debounce';
import './dashboard.css';

const Dashboard = () => {
    const [rideDetails, setRideDetails] = useState({
        startPoint: "",
        endPoint: "",
        date: "",
        seats: 1,
        officeRide: false,
        returnPoint: ""
    });
    const [index, setIndex] = useState(0);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper function to get today's date in "YYYY-MM-DD" format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const todayDate = getTodayDate();

    // Debounced API call
    const fetchRoutes = useCallback(debounce(async (query) => {
        if (!query) return;
        try {
            setLoading(true);
            setError(null); // Clear any existing errors
            const response = await axios.get(`http://localhost:1000/mapapi/autocomplete?input=${query}`, {
                headers: { accept: 'application/json' }
            });
            setLocations(response.data);
        } catch (error) {
            setError("Failed to fetch locations. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, 500), []);

    // Handle pickup location change
    const handlePickUpChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            startPoint: value
        }));
        setIndex(1);
        fetchRoutes(value);
    };

    // Handle destination change
    const handleDestinationChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            endPoint: value
        }));
        setIndex(2);
        fetchRoutes(value);
    };

    // Handle selection from search results
    const handleSelect = (result, name) => {
        setRideDetails(prevState => ({
            ...prevState,
            [name]: result
        }));
        setLocations([]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs before submission
        if (!rideDetails.startPoint || !rideDetails.endPoint) {
            setError("Please provide both a start and end point.");
            return;
        }
        console.log("Ride details submitted:", rideDetails);
    };

    // Handle double click to close search list
    const handleDoubleClick = () => {
        setLocations([]);
    };

    return (
        <Container fluid className='px-5' onDoubleClick={handleDoubleClick}>
            <Row>
                <Col xs={12} className='d-flex justify-content-center align-items-center mb-4'>
                    <h1 className='text-center'>Book a Ride</h1>
                </Col>
            </Row>
            <Row className='border border-light-subtle rounded bg-light-subtle shadow p-lg-5 ps-lg-0 pe-lg-0'>
                <Form className='w-100' onSubmit={handleSubmit}>
                    <Row lg={"auto"} className="align-items-center justify-content-between m-0">
                        <Col xs={12} md={4} lg={3} className="mb-0 mb-md-0 position-relative">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#00b500" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="text"
                                    name="startPoint"
                                    placeholder="Enter your location"
                                    aria-label="Start point"
                                    value={rideDetails.startPoint}
                                    onChange={handlePickUpChange}
                                />
                                {locations.length > 0 && index === 1 && (
                                    <div className="position-absolute w-100" style={{ zIndex: 10, top: '100%', left: '10px'  }}>
                                        <SearchList results={locations} onSelect={(result) => handleSelect(result, 'startPoint')} inputName="startPoint" />
                                    </div>
                                )}
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4} lg={3} className="mb-0 mb-md-0 position-relative">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#ff0000" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="text"
                                    name="endPoint"
                                    placeholder="Enter your destination"
                                    aria-label="End point"
                                    value={rideDetails.endPoint}
                                    onChange={handleDestinationChange}
                                />
                                {locations.length > 0 && index === 2 && !rideDetails.officeRide && (
                                    <div className="position-absolute w-100" style={{ zIndex: 10 , top: '100%', left: '10px' }}>
                                        <SearchList results={locations} onSelect={(result) => handleSelect(result, 'endPoint')} inputName="endPoint" />
                                    </div>
                                )}
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4} lg={3} className="m-0 mb-md-0">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="date"
                                    name="date"
                                    placeholder={todayDate}
                                    min={todayDate} // Set min date to today
                                    aria-label="Date"
                                    value={rideDetails.date}
                                    onChange={(e) => setRideDetails(prevState => ({
                                        ...prevState,
                                        date: e.target.value
                                    }))}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4} lg={3} className="mb-1 mb-md-0">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUsers} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="number"
                                    name="seats"
                                    placeholder="Seats"
                                    min={1}
                                    max={4}
                                    aria-label="Seats"
                                    value={rideDetails.seats}
                                    onChange={(e) => setRideDetails(prevState => ({
                                        ...prevState,
                                        seats: e.target.value
                                    }))}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row lg={"auto"} className="align-items-center justify-content-between ms-2">
                        <Form.Check
                            className="mt-3 mt-lg-0"
                            type="switch"
                            id="flexSwitchCheckDefault"
                            label="Office Ride"
                            checked={rideDetails.officeRide}
                            onChange={(e) => setRideDetails(prevState => ({
                                ...prevState,
                                officeRide: e.target.checked
                            }))}
                        />
                    </Row>
                    <Row className='w-100 mt-3 d-flex align-items-lg-center justify-content-center'>
                        <Col xs={12} md={4} lg={2} className="mb-1 mb-md-0 d-flex justify-content-center">
                            <Button type="submit" variant='warning' className=" w-100  fw-bold">Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
            {loading && <div className="text-center mt-3">Loading...</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Container>
    );
}

export default Dashboard;
