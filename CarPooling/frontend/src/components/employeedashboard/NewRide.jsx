import { Container, Row, Col } from "react-bootstrap";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { SearchList } from '../../components/SearchList';
import { useNavigate } from "react-router-dom";
import Rides from "./Rides";
export default function NewRide() {
    const { fullName, phoneNumber, emailId, registrationNumber, vehicleModel, isVerified } = JSON.parse(localStorage.getItem('user'));
    const [rideDetails, setRideDetails] = useState({
        pickUpLocation: "",
        dropLocation: "",
        date: "",
        capacity: 1,
        driver: { fullName, phoneNumber, emailId, registrationNumber, vehicleModel }
    });
    const [loading, setLoading] = useState(false);
    const [ride, setRide] = useState(false);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const [locations, setLocations] = useState([]);
    const todayDate = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();

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
        if (rideDetails.pickUpLocation === "" || rideDetails.dropLocation === "" || rideDetails.date === "") {
            setError("Please fill all the fields");
            return;
        } else {
            setError(null);
        }

        try {
            const response = await axios.post("http://localhost:1000/rides/createride", rideDetails);
            if (response.status === 201) {
                setRide(true);
                navigate(<Rides/>);
            }
        } catch (error) {
            setError("Failed to create ride. Please try again later.");
        }
    }

    const handlePickUpChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            pickUpLocation: value
        }));
        setIndex(1);
        fetchRoutes(value);
    };

    const handleDestinationChange = (e) => {
        const { value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            dropLocation: value
        }));
        setIndex(2);
        fetchRoutes(value);
    };

    const handleSelect = (result, name) => {
        setRideDetails(prevState => ({
            ...prevState,
            [name]: result
        }));
        setLocations([]);
    };

    return (
        <Container fluid className='px-5' onDoubleClick={handleDoubleClick}>
            <Row>
                <Col xs={12} className='d-flex justify-content-center align-items-center mb-4'>
                    <h1 className='text-center'>Create a Ride</h1>
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
                                    name="pickUpLocation"
                                    placeholder="Enter your location"
                                    aria-label="Pick up location"
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
                                    aria-label="Drop location"
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
                                    placeholder="Seats"
                                    min={1}
                                    max={4}
                                    aria-label="Seats"
                                    value={rideDetails.capacity}
                                    onChange={(e) => setRideDetails(prevState => ({
                                        ...prevState,
                                        capacity: e.target.value
                                    }))}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    {error && <p className="text-danger mt-3">*{error}</p>}
                    <Row className='w-100 mt-3 d-flex align-items-lg-center justify-content-center'>
                        <Col xs={12} md={4} lg={2} className="mb-1 mb-md-0 d-flex justify-content-center">
                            <Button type="submit" variant='warning' className="w-100 fw-bold" disabled={ride}>Create</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}
