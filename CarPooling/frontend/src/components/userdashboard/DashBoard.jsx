import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SearchList } from '../../components/SearchList'; // Ensure SearchList is properly implemented
import axios from 'axios';

import debounce from 'lodash.debounce';
import './dashboard.css';
import { toast } from "react-hot-toast"
const Dashboard = ({ setKey }) => {
    const [search, setSearch] = useState(false);
    const [rideDetails, setRideDetails] = useState({
        pickUpLocation: "",
        dropLocation: "",
        date: "",
        capacity: 1,
    });
    const base_url = process.env.REACT_APP_BASE_URL | "http://localhost:3000";
    const [bookDetails, setBookDetails] = useState({});
    const [index, setIndex] = useState(0);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rides, setRides] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

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
            const response = await axios.get(`${base_url}/mapapi/autocomplete?input=${query}`, {
                headers: { accept: 'application/json' }
            });
            setLocations(response.data);
        } catch (error) {
            setError("An error occurred at backend. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, 500), []);

    // Handle pickup location change
    const handlePickUpChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            pickUpLocation: value
        }));
        setIndex(1);
        fetchRoutes(value);
    };

    // Handle destination change
    const handleDestinationChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            dropLocation: value
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

    const handleSearch = async (e) => {
        e.preventDefault();

        if (rideDetails.pickUpLocation === "" || rideDetails.dropLocation === "" || rideDetails.capacity === "" || rideDetails.date === "") {
            setError("Please enter all the details");
            return;
        }
        if (rideDetails.pickUpLocation === rideDetails.dropLocation) {
            setError('Pickup and drop location are same');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:1000/routes/search_routes`, {
                params: {
                    pickUpLocation: rideDetails.pickUpLocation,
                    dropLocation: rideDetails.dropLocation,
                    date: rideDetails.date,
                    capacity: rideDetails.capacity
                }
            });
            setRides(response.data);
            setSearch(true);
            setError(null); // Clear any existing errors
        } catch (err) {
            setError("Failed to fetch rides");
            console.error(err);
        }
    };

    const handleBooking = async (selectedRide) => {
        try {
            const response = await axios.post("http://localhost:1000/book/requestride", {
                userDetails: {
                    fullName: user.fullName,
                    emailId: user.emailId,
                    phoneNumber: user.phoneNumber
                },
                routeId: selectedRide.routeId,
                date: selectedRide.date,
                capacity: rideDetails.capacity
            });
            console.log(response.data);
            if (response.status == 201) {
                toast.success("Ride booked successfully")
                setKey(2);
            }
        } catch (error) {
            console.error("Error booking ride:", error);
            // Handle error scenario (e.g., display error message to user)
        }
    };

    // Handle double click to close search list
    const handleDoubleClick = () => {
        setLocations([]);
    };

    return (
        <Container fluid className='px-5 min-vh-100' onDoubleClick={handleDoubleClick}>
            <Row>
                <Col xs={12} className='d-flex justify-content-center align-items-center mb-4'>
                    <h1 className='text-center'>Book a Ride</h1>
                </Col>
            </Row>
            <Row className='border border-light-subtle rounded bg-light-subtle shadow p-lg-5 ps-lg-0 pe-lg-0'>
                <Form className='w-100' onSubmit={handleSearch}>
                    <Row lg={"auto"} className="align-items-center justify-content-between m-0">
                        <Col xs={12} md={4} lg={3} className="mb-0 mb-md-0 position-relative">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#00b500" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="text"
                                    name="pickUpLocation"
                                    placeholder="Enter your location"
                                    aria-label="Start point"
                                    value={rideDetails.pickUpLocation}
                                    onChange={handlePickUpChange}
                                />
                                {locations.length > 0 && index === 1 && (
                                    <div className="position-absolute w-100" style={{ zIndex: 10, top: '100%', left: '10px' }}>
                                        <SearchList results={locations} onSelect={(result) => handleSelect(result, 'pickUpLocation')} inputName="pickUpLocation" />
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
                                    name="dropLocation"
                                    placeholder="Enter your destination"
                                    aria-label="End point"
                                    value={rideDetails.dropLocation}
                                    onChange={handleDestinationChange}
                                />
                                {locations.length > 0 && index === 2 && (
                                    <div className="position-absolute w-100" style={{ zIndex: 10, top: '100%', left: '10px' }}>
                                        <SearchList results={locations} onSelect={(result) => handleSelect(result, 'dropLocation')} inputName="dropLocation" />
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
                                    name="capacity"
                                    placeholder="Capacity"
                                    min={1}
                                    max={4}
                                    aria-label="Capacity"
                                    value={rideDetails.capacity}
                                    onChange={(e) => setRideDetails(prevState => ({
                                        ...prevState,
                                        capacity: e.target.value
                                    }))}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='w-100 mt-3 d-flex align-items-lg-center justify-content-center'>
                        <Col xs={12} md={4} lg={2} className="mb-1 mb-md-0 d-flex justify-content-center">
                            <Button type="submit" variant='warning' className="w-100 fw-bold">Search</Button>
                        </Col>
                    </Row>
                </Form>
                {error && <div className="text-danger">*{error}</div>}
            </Row>
            {search && (
                <Row className="mt-4">
                    <Col xs={12}>
                        <Card>
                            <Card.Header>Available rides</Card.Header>
                            <Card.Body>
                                {rides.length > 0 ? (
                                    rides.map((ride) => (
                                        <Card key={ride._id} className="mb-3">
                                            <Card.Body>
                                                <Card.Text>
                                                    <strong>Driver:</strong> {ride.driver.fullName} <br />
                                                    <strong>Email:</strong> {ride.driver.emailId} <br />
                                                    <strong>Phone:</strong> {ride.driver.phoneNumber} <br />
                                                    <strong>Vehicle:</strong> {ride.driver.vehicleModel} (Reg: {ride.driver.registrationNumber})<br />
                                                    <strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}<br />
                                                    <strong>Capacity:</strong> {ride.capacity}<br />
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => handleBooking(ride)}>Book Ride</Button>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <div>No available rides</div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Dashboard;
