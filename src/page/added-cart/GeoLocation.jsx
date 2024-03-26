import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GeoLocation() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
  
          fetchAddress(position.coords.latitude, position.coords.longitude);
        });
      } else {
        console.error('Geolocation is not available in this browser.');
      }
    }, []);
       console.log("lat", latitude, "long", longitude);

       const fetchAddress = async (lat, lon) => {
        const apiKey = 'AIzaSyCYgRsRDd5E0JnBHCQ9N6NZuIULVld2O1w';
        const reverseGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
       
        
        try {
          const response = await axios.get(reverseGeocodingAPI);
          console.log("add",response.data);
          if (response.data && response.data.results && response.data.results.length > 0) {
            setAddress(response.data.results[0].formatted_address);
          } else {
            console.error('No address found.');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
        } finally {
          setLoading(false);
        }
      };
      console.log("address", address)
  return (
    <>
              <p>address:dffdskjcnlckjas{address}</p>
    </>
  )
}

export default GeoLocation