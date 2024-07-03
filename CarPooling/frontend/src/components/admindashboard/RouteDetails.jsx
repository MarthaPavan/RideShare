import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem, Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RouteDetails = ({ id, onDelete }) => {
  const [route, setRoute] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for delete confirmation modal

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
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const handleDriverClick = (driverId) => {
    setSelectedDriver(selectedDriver === driverId ? null : driverId);
  };

  const handleDeleteRoute = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:1000/routes/deleteRoute/${route.routeId}`);
      console.log("Route deleted successfully");
      setShowConfirmation(false);
      onDelete(); // Call the onDelete callback to navigate back
    } catch (error) {
      console.error("Error deleting route:", error);
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>Route Details</Card.Title>
        <Card.Text><strong>Route ID:</strong> {route.routeId}</Card.Text>
        <Card.Text><strong>Pick Up Location:</strong> {route.pickUpLocation}</Card.Text>
        <Card.Text><strong>Drop Location:</strong> {route.dropLocation}</Card.Text>
        <Card.Text><strong>Date:</strong> {new Date(route.date).toLocaleDateString()}</Card.Text>
        <Card.Text><strong>Capacity:</strong> {route.capacity}</Card.Text>
        <Card.Text><strong>Time:</strong> {route.time}</Card.Text>

        <ListGroup>
          <ListGroupItem
            key={route.driver._id}
            onClick={() => handleDriverClick(route.driver._id)}
            style={selectedDriver === route.driver._id ? { backgroundColor: '#f8f9fa', borderLeft: '5px solid #007bff' } : {}}
          >
            <p><strong>Name:</strong> {route.driver.fullName}</p>
            <p><strong>Phone:</strong> {route.driver.phoneNumber}</p>
            <p><strong>Email:</strong> {route.driver.emailId}</p>
            <p><strong>Registration Number:</strong> {route.driver.registrationNumber}</p>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
      <div className="d-flex justify-content-end p-2">
        <ButtonGroup>
          <Button variant='danger' onClick={handleDeleteRoute}>
            <i className="fa-solid fa-trash"></i> Delete
          </Button>
        </ButtonGroup>
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this route?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default RouteDetails;
