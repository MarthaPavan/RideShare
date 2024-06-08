import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SearchList } from './SearchList';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
    const [rideDetails, setRideDetails] = useState({
        startPoint: "",
        endPoint: "",
        date: "",
        seats: 1,
        roundTrip: false,
        returnPoint: ""
    });

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to get today's date in "YYYY-MM-DD" format
    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Pad day with zero if needed
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Pad month with zero and add 1 (month is zero-based)
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    // Today's date
    const todayDate = getTodayDate();

    // Fetch routes from Geoapify
    const fetchRoutes = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
                params: {
                    text: query,
                    lang: "en",
                    limit: 20,
                    type: "amenity",
                    apiKey: "YOUR_API_KEY" // Replace with your actual API key
                }
            });
            setLocations(response.data.features.map(feature => feature.properties.name));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Failed to fetch locations. Please try again later.");
        }
    };

    // Handle pickup location change
    const handlePickUpChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            startPoint: value
        }));
        fetchRoutes(value);
    };

    // Handle destination change
    const handleDestinationChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            endPoint: value
        }));
        fetchRoutes(value);
    };

    // Handle selection from search results
    const handleSelect = (key, result) => {
        setRideDetails(prevState => ({
            ...prevState,
            [key]: result
        }));
        setLocations([]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic here
        console.log("Ride details submitted:", rideDetails);
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className='d-flex justify-content-center align-items-center mb-4'>
                    <h1 className='text-center'>Book a Ride</h1>
                </Col>
            </Row>
            <Row className='border border-light-subtle rounded bg-light-subtle shadow p-lg-5 ps-lg-0 pe-lg-0'>
                <Form className='w-100' onSubmit={handleSubmit}>
                    <Row lg={"auto"} className="align-items-center justify-content-between m-0">
                        <Col xs={12} md={4} lg={3} className="mb-0 mb-md-0">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#00b500" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="text"
                                    name="startPoint"
                                    placeholder="Enter your location"
                                    value={rideDetails.startPoint}
                                    onChange={handlePickUpChange}
                                />
                                {locations.length > 0 && (
                                    <SearchList results={locations} onSelect={(result) => handleSelect('startPoint', result)} />
                                )}
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4} lg={3} className="mb-0 mb-md-0">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#ff0000" }} />
                                </InputGroup.Text>
                                {rideDetails.roundTrip ? (
                                    <Form.Control
                                        className='py-lg-2'
                                        type="text"
                                        name="returnPoint"
                                        placeholder="Enter your office location"
                                        value={rideDetails.returnPoint}
                                        onChange={(e) => setRideDetails(prevState => ({
                                            ...prevState,
                                            returnPoint: e.target.value
                                        }))}
                                    />
                                ) : (
                                    <Form.Control
                                        className='py-lg-2'
                                        type="text"
                                        name="endPoint"
                                        placeholder="Enter your destination"
                                        value={rideDetails.endPoint}
                                        onChange={handleDestinationChange}
                                    />
                                )}
                                {locations.length > 0 && !rideDetails.roundTrip && (
                                    <SearchList results={locations} onSelect={(result) => handleSelect('endPoint', result)} />
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
                                    min={todayDate} // Set min date to today
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
                            onChange={(e) => setRideDetails(prevState => ({
                                ...prevState,
                                roundTrip: e.target.checked
                            }))}
                        />
                    </Row>
                    <Row className='w-100 mt-3 d-flex align-items-lg-center justify-content-center'>
                        <Col xs={12} md={4} lg={2} className="mb-1 mb-md-0 d-flex justify-content-center">
                            <Button type="submit" className="gold-gradient-btn w-100">Search</Button>
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
