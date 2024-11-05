import React, { useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapPin, Clock, User, Plus } from 'lucide-react';
import debounce from 'lodash/debounce';
import { toast } from "react-hot-toast";
import { SearchList } from '../../components/SearchList';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Add this line to import CSS
import './dashboard.css';
import MapContainer from './MapContainer';
const Dashboard = ({ setKey }) => {
    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [search, setSearch] = useState(false);
    const [rideDetails, setRideDetails] = useState({
        pickUpLocation: "",
        dropLocation: "",
        date: getTodayDate(), // Set initial date to today
        capacity: 1,
    });

    const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:1000";
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const [rides, setRides] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const todayDate = getTodayDate();

    // Debounced API call
    const fetchRoutes = useCallback(debounce(async (query) => {
        if (!query) return;
        try {
            setLoading(true);
            setError(null);
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
            setError('Pickup and drop location are the same');
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
            if (response.status === 201) {
                toast.success("Ride booked successfully");
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
        <Container fluid className="p-0 h-100">
            <Row className="h-100 m-0">
                {/* Left Panel */}
                <Col md={4} className="p-4 bg-white" style={{ height: '100vh', overflowY: 'auto' }}>
                    <h1 className="h3 mb-4">Get a ride</h1>

                    {/* Pickup Location */}
                    <div className="mb-3 position-relative">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <MapPin className="me-3" size={24} />
                            <input 
                                type="text"
                                placeholder="Pickup location"
                                className="form-control border-0 bg-transparent"
                                value={rideDetails.pickUpLocation}
                                onChange={handlePickUpChange}
                            />
                        </div>
                        {locations.length > 0 && index === 1 && (
                            <div className="position-absolute w-100 z-3 mt-1">
                                <SearchList 
                                    results={locations} 
                                    onSelect={(result) => handleSelect(result, 'pickUpLocation')} 
                                    inputName="pickUpLocation"
                                />
                            </div>
                        )}
                    </div>

                    {/* Dropoff Location */}
                    <div className="mb-3 position-relative">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <div className="me-3 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                <div className="bg-dark" style={{ width: '12px', height: '12px' }}></div>
                            </div>
                            <input 
                                type="text"
                                placeholder="Dropoff location"
                                className="form-control border-0 bg-transparent"
                                value={rideDetails.dropLocation}
                                onChange={handleDestinationChange}
                            />
                            <Plus size={24} />
                        </div>
                        {locations.length > 0 && index === 2 && (
                            <div className="position-absolute w-100 z-3 mt-1">
                                <SearchList 
                                    results={locations} 
                                    onSelect={(result) => handleSelect(result, 'dropLocation')} 
                                    inputName="dropLocation"
                                />
                            </div>
                        )}
                    </div>

                    {/* Date and Time Selection */}
                    <div className="mb-3">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <Clock className="me-3" size={24} />
                            <DatePicker
                                selected={new Date(rideDetails.date)} // Ensure it's a Date object
                                onChange={(date) => setRideDetails(prev => ({ ...prev, date }))}
                                showTimeSelect
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="Pp"
                                className="form-control border-0 bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Passenger Selection */}
                    <div className="mb-3">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <User className="me-3" size={24} />
                            <select 
                                className="form-select border-0 bg-transparent"
                                value={rideDetails.capacity}
                                onChange={(e) => setRideDetails(prev => ({
                                    ...prev, 
                                    capacity: parseInt(e.target.value)
                                }))}
                            >
                                <option value={1}>For me</option>
                                <option value={2}>2 passengers</option>
                                <option value={3}>3 passengers</option>
                                <option value={4}>4 passengers</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button 
                        className="btn btn-light w-100 p-3 mb-3"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}


                </Col>

                {/* Right Panel (Map) */}
                <Col md={8} className="p-0">
                    <MapContainer 
                        pickup={rideDetails.pickUpLocation}
                        dropoff={rideDetails.dropLocation}
                        showRoute={search} 
                    />                
                </Col>
            </Row>
            <Row>
                {/* Available Rides */}
                {search && rides.length > 0 && (
                <div className="mt-4">
                <h2 className="h4 mb-3">Available Rides</h2>
                {rides.map((ride) => (
                <div key={ride.routeId} className="ride-card p-3 mb-3 bg-light rounded">
                <h5>{ride.driverName}</h5>
                <p>{ride.pickUpLocation} to {ride.dropLocation}</p>
                <p>{ride.date}</p>
                <p>Capacity: {ride.capacity}</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => handleBooking(ride)}
                >
                    Book
                </button>
                </div>
                ))}
                </div>
                )}
            </Row>
        </Container>
    );
};

export default Dashboard;
