// src/components/MapContainer.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const MapContainer = ({ pickup, dropoff, showRoute }) => {
    const [directions, setDirections] = useState(null);
    const [center, setCenter] = useState({ lat: 17.385044, lng: 78.486671 }); // Default center (Hyderabad)

    useEffect(() => {
        const fetchDirections = async () => {
            if (showRoute && pickup && dropoff) {
                const directionsService = new window.google.maps.DirectionsService();
                try {
                    const result = await directionsService.route({
                        origin: pickup,
                        destination: dropoff,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    });
                    setDirections(result);
                    const midpoint = {
                        lat: (result.routes[0].legs[0].start_location.lat() + result.routes[0].legs[0].end_location.lat()) / 2,
                        lng: (result.routes[0].legs[0].start_location.lng() + result.routes[0].legs[0].end_location.lng()) / 2,
                    };
                    setCenter(midpoint);
                } catch (error) {
                    console.error('Error fetching directions:', error);
                }
            } else {
                // Reset directions if not showing route
                setDirections(null);
                setCenter({ lat: 17.385044, lng: 78.486671 });
            }
        };

        fetchDirections();
    }, [pickup, dropoff, showRoute]);

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                center={center}
                zoom={10}
            >
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;
