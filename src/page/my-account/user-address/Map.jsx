// import React, { useEffect, useState } from 'react'
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import axios from 'axios';

// const containerStyle = {
//   width: '100%',
//   height: '300px',
//   marginBottom:'20px'
// };

// // const center = {
// //   lat: -3.745,
// //   lng: -38.523
// // };

// const Map = () => {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: "AIzaSyCYgRsRDd5E0JnBHCQ9N6NZuIULVld2O1w"
//       })
//       const [center, setCenter] = useState({ lat: 0, lng: 0 });
//       const [map, setMap] = React.useState(null)
//       const [address, setAddress] = useState(null)
//       const [loading, setLoading] =useState(false)
   
//     useEffect(() => {
//         if ('geolocation' in navigator) {
//           navigator.geolocation.getCurrentPosition(function (position) {
//             setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
//             //setLongitude(position.coords.longitude);
    
//              fetchAddress(position.coords.latitude, position.coords.longitude);
//           });
//         } else {
//           console.error('Geolocation is not available in this browser.');
//         }
//       }, []);

//     // end



//       const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds); 
//         setMap(map)
//       }, [])
    
//       const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//       }, [])
 

//       const handleMapClick = (e) => {
//         const lat = e.latLng.lat();
//     const lng = e.latLng.lng();
       
//        setCenter({lat, lng})
//         fetchAddress(lat, lng);
//         console.log("work");
//       };
    
//       const handleMarkerDragEnd = (e) => {
//         alert('hi');
//         const lat = e.latLng.lat();
//         const lng = e.latLng.lng();
           
//            setCenter({lat, lng})
//         fetchAddress(lat, lng);
//         console.log("working");
//       };
    
//       const fetchAddress = async (lat, lng) => {
//         const apiKey = 'AIzaSyCYgRsRDd5E0JnBHCQ9N6NZuIULVld2O1w';
//         const reverseGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
       
        
//         try {
//           const response = await axios.get(reverseGeocodingAPI);
//           console.log("add",response.data);
//           if (response.data && response.data.results && response.data.results.length > 0) {
//             setAddress(response.data.results[0].formatted_address);
//           } else {
//             console.error('No address found .');
//           }
//         } catch (error) {
//           console.error('Error fetching address:', error);
//         } finally {
//           setLoading(false);
//         }
//       };


//   return isLoaded ? (
//     <>
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
      
//     >
//      <Marker
//           position={center}
//           draggable={true}
//           onMarkerDragEnd={handleMarkerDragEnd}
//         />
//       <></>
//     </GoogleMap>
//     <div>
//         <strong>Address:</strong> {address}
//       </div>
//     </>
// ) : <></>
    
 
// };

// export default React.memo(Map)
