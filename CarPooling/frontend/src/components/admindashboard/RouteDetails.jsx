import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RouteDetails = (props) => {
  const id = props.id;
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
    return <div>Loading...</div>;
  }

  const handleDriverClick = (driverId) => {
    if (selectedDriver === driverId) {
      setSelectedDriver(null);
    } else {
      setSelectedDriver(driverId);
    }
  };

  const handleEditDriver = () => {
    console.log(selectedDriver);
    if (selectedDriver) {
      console.log("Edit driver:", selectedDriver);
      // Implement edit logic here
    } else {
      console.log("No driver selected for editing.");
    }
  };

  const handleDeleteRoute = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (route) {
      console.log("Deleting route:", route.routeId);
      // Implement delete logic here
      setShowConfirmation(false); // Close modal after deletion
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
        <Card.Text><strong>Start Point:</strong> {route.startPoint}</Card.Text>
        <Card.Text><strong>End Point:</strong> {route.endPoint}</Card.Text>
        <Card.Text><strong>Distance:</strong> {route.distance} km</Card.Text>
        <Card.Text><strong>Number of Drivers:</strong> {route.drivers.length}</Card.Text>

        <ListGroup>
          {route.drivers.map(d => (
            <ListGroupItem
              key={d._id}
              onClick={() => handleDriverClick(d._id)}
              style={selectedDriver === d._id ? { backgroundColor: '#f8f9fa', borderLeft: '5px solid #007bff' } : {}}
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
          <Button variant='secondary' onClick={handleEditDriver} >
            <i className="fa-solid fa-pen"></i> Edit
          </Button>
          <Button variant='danger' onClick={handleDeleteRoute}>
            <i className="fa-solid fa-trash"></i> Delete
          </Button>
        </ButtonGroup>
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this route?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default RouteDetails;
