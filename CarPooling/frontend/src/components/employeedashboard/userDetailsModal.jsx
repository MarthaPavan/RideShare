import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserDetailsModal = ({ routeId }) => {
    const [show, setShow] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL | "http://localhost:3000";
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        try {
            console.log(routeId);
            const response = await axios.get(`${base_url}/book/getUserDetails?routeId=${routeId}`);
            console.log(response.data);
            setUserDetails(response.data);
            setShow(true);
        } catch (error) {
            toast.error("Failed to fetch user details");
            console.error("Failed to fetch user details", error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Users
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userDetails.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.userDetails.fullName}</td>
                                        <td>{user.userDetails.emailId}</td>
                                        <td>{user.userDetails.phoneNumber}</td>
                                        <td>{user.capacity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No users have booked this ride.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserDetailsModal;
