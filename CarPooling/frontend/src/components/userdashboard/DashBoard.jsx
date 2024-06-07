


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faRoute } from '@fortawesome/free-solid-svg-icons';
import { SearchList } from './SearchList';
import axios from 'axios';

const Dashboard = () => {
    const [rideDetails, setRideDetails] = useState({
        startPoint: "",
        endPoint: "",
    });

    const [routes, setRoutes] = useState([]);
    const [startPoints, setStartPoints] = useState([]);
    const [endPoints, setEndPoints] = useState([]);

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = () => {
        axios.get("http://localhost:1000/routes/getRoute")
            .then((response) => {
                setRoutes(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePickUpChange = (e) => {
        const { value } = e.target;
        setRideDetails((prevState) => ({
            ...prevState,
            startPoint: value
        }));

        const filteredStartPoints = routes.filter((route) => {
            return (
              value &&
              route &&
              route.startPoint &&
              route.startPoint.toLowerCase().includes(value)
            );
          });
        setStartPoints(filteredStartPoints);
        console.log(filteredStartPoints);
    };

    const handleDestinationChange = (e) => {
        const { value } = e.target;
        setRideDetails((prevState) => ({
            ...prevState,
            endPoint: value
        }));

        const filteredEndPoints = routes.filter((route) =>{
            return (
                value &&
                route &&
                route.endPoint &&
                route.endPoint.toLowerCase().includes(value)
            );
        }
        );
        setEndPoints(filteredEndPoints);
        console.log(filteredEndPoints);
    };

    return (
        <Container style={{ height: "100%" }}>
            <Row style={{ height: "100%" }}>
                <Col xs={5} className='d-flex py-0  my-0  '>
                    <div className="card">
                        <div className="card-header">
                            <div className='card-body'>
                                <div className="card-title align-items-center d-flex justify-content-center text-body-emphasis fw-bolder fs-2">
                                    <FontAwesomeIcon icon={faRoute} />
                                    Ready for a Ride
                                </div>
                                <Form className='flex-column justify-content-center align-items-center'>
                                        <Form.Text className="d-flex">
                                            <FontAwesomeIcon icon={faLocationDot} className='pt-2' style={{ color: "#00b500", width: "20px", height: "20px" }} />
                                            <Form.Control type="text" placeholder="Enter your location" value={rideDetails.startPoint} onChange={handlePickUpChange} />
                                        </Form.Text>
                                        {startPoints && startPoints.length > 0 && <SearchList className = "w-100" results = {startPoints} index = {Object.getOwnPropertyNames(startPoints[0])[2]}/>}
                                    
                                    <br />
                                    
                                        <Form.Text className="d-flex">
                                            <FontAwesomeIcon icon={faLocationDot} className='pt-2' style={{ color: "#ff0000", width: "20px", height: "20px" }} />
                                            <Form.Control type="text" name="endPoint" placeholder="Enter your destination" value={rideDetails.endPoint} onChange={handleDestinationChange} />
                                        </Form.Text>
                                        {endPoints && endPoints.length > 0 && <SearchList className = "w-100" results = {endPoints} index = {Object.getOwnPropertyNames(endPoints[0])[3]}/>}
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <Button variant="dark" type="submit" className='mt-1'>Find a Ride</Button>
                                    </div>
                                </Form>
                            </div>
                            <div className="card-footer">Finding a ride is subject to availability of riders</div>
                        </div>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
