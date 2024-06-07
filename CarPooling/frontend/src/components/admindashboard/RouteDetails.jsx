import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RouteDetails = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/routes/getRoute/${id}`); // Adjust URL as needed
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
      <h2>Route Details</h2>
      <p><strong>Route ID:</strong> {route.routeId}</p>
      <p><strong>Start Point:</strong> {route.startPoint}</p>
      <p><strong>End Point:</strong> {route.endPoint}</p>
      <p><strong>Distance:</strong> {route.distance} km</p>
      <p><strong>Number of Drivers:</strong> {route.drivers.length}</p>
    </div>
  );
};

export default RouteDetails;
