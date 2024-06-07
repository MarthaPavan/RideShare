import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RouteDetails = (props) => {
  const id = props.id;
  const [route, setRoute] = useState(null);
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
  return (
    <div>
      <p><strong>Route ID:</strong> {route.routeId}</p>
      <p><strong>Start Point:</strong> {route.startPoint}</p>
      <p><strong>End Point:</strong> {route.endPoint}</p>
      <p><strong>Distance:</strong> {route.distance} km</p>
      <p><strong>Number of Drivers:</strong> {route.drivers.length}</p>
      <ul>
        {route.drivers.map(d => (
          <li key={d._id}>
            <p><strong>Name:</strong> {d.fullName}</p>
            <p><strong>Phone:</strong> {d.phoneNumber}</p>
            <p><strong>Email:</strong> {d.emailId}</p>
            <p><strong>Registration Number:</strong> {d.registrationNumber}</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default RouteDetails;
