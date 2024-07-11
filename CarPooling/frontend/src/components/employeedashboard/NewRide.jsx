import React, { useState, useCallback } from "react";
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays, faClock, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { debounce } from "lodash";
import { SearchList } from '../../components/SearchList';
import toast from "react-hot-toast";
import './dashboard.css';

const NewRide = ({ setIndex }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { fullName, phoneNumber, emailId, registrationNumber, vehicleModel } = user;

    const [rideDetails, setRideDetails] = useState({
        pickUpLocation: "",
        dropLocation: "",
        date: "",
        time: "",
        capacity: 1,
        driver: { fullName, phoneNumber, emailId, registrationNumber, vehicleModel }
    });

    const [loading, setLoading] = useState(false);
    const [ride, setRide] = useState(false);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(0);
    const [locations, setLocations] = useState([]);

    const todayDate = new Date().toISOString().split('T')[0];

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

    const handleDoubleClick = () => {
        setLocations([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rideDetails.pickUpLocation || !rideDetails.dropLocation || !rideDetails.date || !rideDetails.time) {
            setError("Please fill all the fields");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:1000/rides/createride", rideDetails);
            if (response.status === 201) {
                setRide(true);
                toast.success("Ride created successfully");
                setIndex(3); // Switch to Rides view
            }
        } catch (error) {
            setError("Failed to create ride. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
        setKey(name === "pickUpLocation" ? 1 : 2);
        if (name === "pickUpLocation" || name === "dropLocation") {
            fetchRoutes(value);
        }
    };

    const handleSelect = (result, name) => {
        setRideDetails(prevState => ({
            ...prevState,
            [name]: result
        }));
        setLocations([]);
    };

    return (
        <Container fluid className='px-5 min-vh-100' onDoubleClick={handleDoubleClick}>
            <Row>
                <Col xs={12} className='d-flex justify-content-center align-items-center mb-4'>
                    <h1 className='create-ride-heading'>Create a Ride</h1>
                </Col>
            </Row>
            <Row className='border border-light-subtle rounded bg-light-subtle shadow p-lg-5 ps-lg-0 pe-lg-0'>
                <Form className='w-100' onSubmit={handleSubmit}>
                    <Row lg={"auto"} className="align-items-center justify-content-between m-0">
                        <Col xs={12} md={4} lg={3} className="mb-0 mb-md-0 position-relative mt-sm-2">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: "#00b500" }} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="text"
                                    name="pickUpLocation"
                                    placeholder="Enter your location"
                                    aria-label="Pick up location"
                                    value={rideDetails.pickUpLocation}
                                    onChange={handleInputChange}
                                />
                                {locations.length > 0 && key === 1 && (
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
                                    aria-label="Drop location"
                                    value={rideDetails.dropLocation}
                                    onChange={handleInputChange}
                                />
                                {locations.length > 0 && key === 2 && (
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
                                    min={todayDate} // Set min date to today
                                    aria-label="Date"
                                    value={rideDetails.date}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4} lg={3} className="mb-1 mb-md-0">
                            <InputGroup className='h6'>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faClock} />
                                </InputGroup.Text>
                                <Form.Control
                                    className='py-lg-2'
                                    type="time"
                                    name="time"
                                    min = {1}
                                    aria-label="Time"
                                    value={rideDetails.time}
                                    onChange={handleInputChange}
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
                                    placeholder="Seats"
                                    min={1}
                                    max={4}
                                    aria-label="Seats"
                                    value={rideDetails.capacity}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    {error && <p className="text-danger mt-3">*{error}</p>}
                    <Row className='w-100 mt-3 d-flex align-items-lg-center justify-content-center mb-sm-2'>
                        <Col xs={12} md={4} lg={2} className="mb-1 mb-md-0 d-flex justify-content-center">
                            <Button type="submit" variant='warning' className="w-100 fw-bold" disabled={ride}>
                                {loading ? <div className="flex align-content-center">
                                        <Spinner animation="border" variant="light" size="sm" />
                                </div> : "Create"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
};

export default NewRide;
