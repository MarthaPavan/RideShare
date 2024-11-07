import React, { useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapPin, Clock, User, Plus } from 'lucide-react';
import debounce from 'lodash/debounce';
import { toast } from "react-hot-toast";
import { SearchList } from '../../components/SearchList';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MapContainer from './MapContainer';

const NewRide = ({ setKey }) => {
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

    const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:1000";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pickupLocations, setPickupLocations] = useState([]);
    const [dropLocations, setDropLocations] = useState([]);

    const fetchRoutes = useCallback(debounce(async (query, type) => {
        if (!query) return;
        try {
            setLoading(true);
            const response = await axios.get(`${base_url}/mapapi/autocomplete?input=${query}`, {
                headers: { accept: 'application/json' }
            });
            if (type === "pickup") {
                setPickupLocations(response.data);
            } else {
                setDropLocations(response.data);
            }
        } catch (error) {
            setError("Failed to fetch locations. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, 500), []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRideDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === "pickUpLocation") {
            fetchRoutes(value, "pickup");
        } else if (name === "dropLocation") {
            fetchRoutes(value, "drop");
        }
    };

    const handleSelect = (result, name) => {
        setRideDetails(prevState => ({
            ...prevState,
            [name]: result
        }));
        if (name === "pickUpLocation") {
            setPickupLocations([]);
        } else {
            setDropLocations([]);
        }
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
            const response = await axios.post(`${base_url}/rides/createride`, rideDetails);
            if (response.status === 201) {
                toast.success("Ride created successfully");
                setKey(3); 
            }
        } catch (error) {
            setError("Failed to create ride. Please try again later.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="p-0 h-100">
            <Row className="h-100 m-0">
                <Col md={4} className="p-4 bg-white" style={{ height: '100vh', overflowY: 'auto' }}>
                    <h1 className="h3 mb-4">Offer a New Ride</h1>

                    {/* Pickup Location */}
                    <div className="mb-3 position-relative">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <MapPin className="me-3" size={24} />
                            <input
                                type="text"
                                name="pickUpLocation"
                                placeholder="Pickup location"
                                className="form-control border-0 bg-transparent"
                                value={rideDetails.pickUpLocation}
                                onChange={handleInputChange}
                            />
                        </div>
                        {pickupLocations.length > 0 && (
                            <div className="dropdown-menu show w-100 mt-1">
                                <SearchList 
                                    results={pickupLocations} 
                                    onSelect={(result) => handleSelect(result, 'pickUpLocation')} 
                                />
                            </div>
                        )}
                    </div>

                    {/* Drop Location */}
                    <div className="mb-3 position-relative">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <div className="me-3 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                <div className="bg-dark" style={{ width: '12px', height: '12px' }}></div>
                            </div>
                            <input
                                type="text"
                                name="dropLocation"
                                placeholder="Dropoff location"
                                className="form-control border-0 bg-transparent"
                                value={rideDetails.dropLocation}
                                onChange={handleInputChange}
                            />
                            <Plus size={24} />
                        </div>
                        {dropLocations.length > 0 && (
                            <div className="dropdown-menu show w-100 mt-1">
                                <SearchList 
                                    results={dropLocations} 
                                    onSelect={(result) => handleSelect(result, 'dropLocation')} 
                                />
                            </div>
                        )}
                    </div>

                    {/* Date Picker */}
                    <div className="mb-3">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <Clock className="me-3" size={24} />
                            <input
                                type="date"
                                name="date"
                                className="form-control border-0 bg-transparent"
                                value={rideDetails.date}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    {/* Time Picker */}
                    <div className="mb-3">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <Clock className="me-3" size={24} />
                            <input
                                type="time"
                                name="time"
                                className="form-control border-0 bg-transparent"
                                value={rideDetails.time}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Capacity Selector */}
                    <div className="mb-3">
                        <div className="d-flex align-items-center bg-light rounded p-3">
                            <User className="me-3" size={24} />
                            <select 
                                className="form-select border-0 bg-transparent"
                                value={rideDetails.capacity}
                                onChange={(e) => setRideDetails(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}>
                                <option value={1}>1 passenger</option>
                                <option value={2}>2 passengers</option>
                                <option value={3}>3 passengers</option>
                                <option value={4}>4 passengers</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        className="btn btn-light w-100 p-3 mb-3"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                </Col>

                {/* Map Section */}
                <Col md={8} className="p-0">
                    <MapContainer 
                        pickup={rideDetails.pickUpLocation}
                        dropoff={rideDetails.dropLocation}
                        showRoute={!!(rideDetails.pickUpLocation && rideDetails.dropLocation)}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default NewRide;
