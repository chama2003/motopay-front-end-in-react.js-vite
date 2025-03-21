
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 7.873054,
  lng: 80.771797,
};

const center1 = [
  { lat: 7.1266, lng: 80.0224 }, // Gampaha
  { lat: 6.9271, lng: 79.8612 }, // Colombo
  { lat: 9.6675, lng: 80.0081 }, // Jaffna
];

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAEsx3ZIKHkhzr3Q6GjLD3ntvcK4IjRRaU', // Replace with your API key
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(center); // Default origin is the center of the map

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const calculateRoute = (destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {center1.map((point, index) => (
        <Marker
          key={index}
          position={point}
          onClick={() => calculateRoute(point)} // Set the destination as the clicked marker
        />
      ))}
      
      {/* Render directions if they are available */}
      {directions && (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
