import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RouteDetails = (props) => {
  const id = props.id;
  const [route, setRoute] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/routes/getRoute/${id}`); 
        setRoute(response.data);
      } catch (error) {
        console.error("Error fetching route details: ", error);
      }
    };

    fetchRouteDetails();
  }, [id]);

  if (!route) {
    return <div>Loading...</div>;
  }
  //#6d7d9c
  const selectedStyle = {
    backgroundColor: '#f8f9fa',
    borderLeft: '5px solid #007bff',
  };

  const handleDriverClick = (driverId) => {
    if (selectedDriver === driverId) {
      setSelectedDriver(null);
    } else {
      setSelectedDriver(driverId);
    }
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>Route Details</Card.Title>
        <Card.Text><strong>Route ID:</strong> {route.routeId}</Card.Text>
        <Card.Text><strong>Start Point:</strong> {route.startPoint}</Card.Text>
        <Card.Text><strong>End Point:</strong> {route.endPoint}</Card.Text>
        <Card.Text><strong>Distance:</strong> {route.distance} km</Card.Text>
        <Card.Text><strong>Number of Drivers:</strong> {route.drivers.length}</Card.Text>
        
        <ListGroup>
          
          {route.drivers.map(d => (
            <ListGroupItem 
              key={d._id} 
              onClick={() => handleDriverClick(d._id)}
              style={selectedDriver === d._id ? selectedStyle : {}}
            >
              <p><strong>Name:</strong> {d.fullName}</p>
              <p><strong>Phone:</strong> {d.phoneNumber}</p>
              <p><strong>Email:</strong> {d.emailId}</p>
              <p><strong>Registration Number:</strong> {d.registrationNumber}</p>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
      <div className="d-flex justify-content-end p-2">
          <ButtonGroup>
            <Button variant='secondary'><i class="fa-solid fa-pen"></i> Edit</Button>
            <Button variant='danger'><i class="fa-solid fa-trash"></i> Delete</Button>
          </ButtonGroup>
        </div>
    </Card>
  );
};

export default RouteDetails;
