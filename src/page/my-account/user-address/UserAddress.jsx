import React, { useContext, useEffect, useState } from 'react'
import UserAddressForm from '../../../components/UserAddressForm'
import { UserAddressContext } from '../../../context/UserAddressProvider'
import Loader from '../../../Loader'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Address from '../../../asets/address.jpg'
import Autocomplete from "react-google-autocomplete";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AuthContext } from '../../../AuthProvider'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GeoLocation from '../../added-cart/GeoLocation';
import Axios from '../../../Axios';
import Toast from '../../../Tost';
//import LiveLocationMap from './GeoAddressWithMap';


//import Map from './Map';
function UserAddress() {
  // const {  onSelectAddress} = useContext(UserAddressContext)
   const {userToken} = useContext(AuthContext)
        console.log("userytoken", userToken)
    const navigate=useNavigate()
     const [latitude, setLatitude] = useState("")
      const [longitude, setLongitude] = useState("")
      const [address, setAddress] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [show, setShow] = useState(false);
      const [userAddress, setUserAddress] = useState([]);
      const [formattedAddress, setFormattedAddress] = useState({})
     
      const [loading, setLoading] = useState(false)
     const location = useLocation()

       const [isAddress, setIsAddress] = useState(false)


       const handleClose = () => setShow(false);
       const handleShow = () => setShow(true);



     //google lat long
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
      const fetchAddress = async (lat, lon) => {
         const apiKey = 'AIzaSyCYgRsRDd5E0JnBHCQ9N6NZuIULVld2O1w';
         const reverseGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
        
         
         try {
           const response = await axios.get(reverseGeocodingAPI);
         //  console.log("add",response.data);
           if (response.data && response.data.results && response.data.results.length > 0) {
            //  setAddress(response.data.results[0].formatted_address);
             setAddress(response.data.results[0]);


             let formattedAddress = {};
             response.data.results[0]?.address_components?.forEach(component => {
               component?.types?.forEach(type => {
                 switch (type) {
                  case 'premise':
                    formattedAddress.houseNo = component.long_name;
                    break;
                   case 'street_number':
                     formattedAddress.streetNumber = component.long_name;
                     break;
                     case 'sublocality':
                     formattedAddress.landmark = component.long_name;
                     break;
                   case 'route':
                     formattedAddress.street = component.long_name;
                     break;
                   case 'locality':
                     formattedAddress.city = component.long_name;
                     break;
                   case 'administrative_area_level_1':
                     formattedAddress.state = component.long_name;
                     break;
                   case 'country':
                     formattedAddress.country = component.long_name;
                     break;
                   case 'postal_code':
                     formattedAddress.postalCode = component.long_name;
                     break;
                   // Add more cases as needed for additional address components
                 }
               });
             });


                    if(formattedAddress){
                      setFormattedAddress(formattedAddress)
                   //   console.log("formatted address", formattedAddress)

                    }


             console.log("live address", response.data)
           } else {
             console.error('No address found.');
           }
         } catch (error) {
           console.error('Error fetching address:', error);
         } finally {
            setIsLoading(false);
         }
       };
     
  //  useEffect(()=>{
  //    if(userToken){
  //       handleGetAllAddress(userToken)
  //    }

  //  },[])


//    add address
const handleAddAddress = async (addressData,  navigate) =>{
 
    setLoading(true)
  try {
      const response = await Axios.post('/add-address', addressData,{
       headers: {
           Authorization: `Bearer ${userToken}`
         }
      }); 
      if(response.status===200){
       const data = response?.data;
       setUserAddress([...userAddress, data?.address]) 
       handleGetAllAddress()  
       Toast(data?.message,response.status) 
             
     
     navigate("/cart")         
      }               
     } catch (err) {
       const error = err?.response?.data
       Toast(error?.message)
     }finally{
       setLoading(false)
     }
}

const handleGetAllAddress = async () =>{
  setLoading(true)
  try {
      const response = await Axios.get('/get-all-addresses',{
       headers: {
           Authorization: `Bearer ${userToken}`
         }
      }); 
      if(response.status===200){
       const data = response?.data;
     //  Toast(data?.message,response.status) 
          if(!data?.addresses?.length){
            setIsAddress(true)
          }else{
            setUserAddress(data?.addresses)  
            setIsAddress(false)
          }
                
      }               
     } catch (err) {
       const error = err?.response?.data
       Toast(error.message)
     }finally{
       setLoading(false)
     }
        
}

useEffect(()=>{
  
      handleGetAllAddress()
  
},[])

// update address
const handleUpdateAddress = async(updatedAddress, address_id, handleClose, navigate)=>{
  
  setLoading(true)
  try {
      const response = await Axios.post('/update-address',{...updatedAddress,address_id}, {
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
         if(response.status===200){
          const data = response?.data;
          const updatedIndex = userAddress.findIndex((data)=>data.id===address_id)
          const toUpdateAddress = [...userAddress];
        // console.log("updata...", data);
          toUpdateAddress[updatedIndex] = data?.address;
          setUserAddress(toUpdateAddress)
          Toast(data?.message,response.status)  
        
          navigate("/cart")      
         }
     
  } catch (err) {
      const error = err?.response?.data
       Toast(error.message)
  }finally{
      setLoading(false)
  }
}


//  delete address
const handleDeleteAddress = async (id, userToken) =>{
  setLoading(true)
try {
    const response = await Axios.get(`/delete-address?address_id=${id}`,{
     headers: {
         Authorization: `Bearer ${userToken}`
       }
    }); 
    if(response.status===200){
     const data = response?.data;
      const updatedAddress = userAddress.filter(val=>val?.id!==id)
       setUserAddress(updatedAddress)
     Toast(data?.message,response.status)            
    }               
   } catch (err) {
     const error = err?.response?.data
   //  Toast(error.message)
   }finally{
     setLoading(false)
   }
}

  
   const onChooseAddress = (id)=>{
    onSelectAddress(id, userToken)
    
   }
   const backServices = ()=>{
         navigate("/services/detailing")
   }
   const backCart = ()=>{
    navigate("/cart")
}
  
// on choose address
const onSelectAddress = async (id, userToken)=>{
  try {
    setLoading(true)
    const response = await Axios.post(`/edit-profile`,{default_address:id}, {
      headers: {
          Authorization: `Bearer ${userToken}`
        },               
    })
    if(response.status===200){
      const data = response?.data;
      handleGetAllAddress()
     // Toast(data?.message,response.status)               
     }
 } catch (err) {
  const error = err.response.data
 // Toast(error.message)
 }finally{
  setLoading(false)
 }
 }

 


   return (
    <>
    {(isLoading || loading) && <Loader/>}
     <div className="container-fluid nav-margin fullHeight">
        <div className="container">
        {/* <GeoLocation/> */}
            <div className="row">
             <div className="col-12 py-3 d-flex justify-content-between align-items-center">
                <IconButton onClick={backCart} aria-label="arrow" color='error' style={{fontSize:'9px'}}>
             <ArrowBackIcon /> <span className="" style={{fontSize:'12px', color:'#d32f2f'}}>Checkout</span>
              </IconButton>
              <h4 className='text-center red-t py-2'>Your Address</h4>           
              <IconButton onClick={backServices} aria-label="arrow" color='error' style={{fontSize:'9px', visibility:'hidden'}}>
              <span className="" style={{fontSize:'12px', color:'#d32f2f'}}>Services</span><ArrowForwardIcon />
                </IconButton>
             </div>

          {
            userAddress?.length?(<>
              {
                userAddress.map((val, idx)=>(
                    
                    <div key={idx} className="col-12">
                    <div style={{position:'relative'}} className={`address-container mb-3 py-0 p-md-3 card-shadow bg-lightblue rounded d-flex flex-column flex-md-row align-items-center justify-content-between ${val.is_default ? 'selected' : ''}`}>
                    {val.is_default ? (<>
        <IconButton aria-label="select" className='checked-box' sx={{position:'absolute',fontSize:'22px', color:'#DE3820'}}>
  <CheckCircleIcon />
</IconButton>
        {/* <i class="fa-regular fa-circle-check fa-sm checked-box" style={{position:'absolute',fontSize:'22px', color:'#DE3820'}}></i> */}
       </>):(
        <>
        <IconButton aria-label="select" onClick={()=>{onChooseAddress(val?.id)}} className='checked-box' sx={{position:'absolute',fontSize:'22px', color:'#DE3820'}}>
  <RadioButtonUncheckedIcon />
</IconButton>
        </>
       )} 
                       
                       
                        <div className='pt-1 pt-md-0'>
                           
                            <p className='fw-bold mb-0'>House No. / Flat NO.: {val?.house_no}, {val?.locality}, {val?.landmark}</p>
                            <p className='fw-bold mb-0'>Pin Code: {val?.pin_code}</p>
                        </div>
                        <div className=' w-50 d-flex flex-md-column flex-row justify-content-between align-items-end'>
                        <Button variant="outlined" className='d-none d-md-flex' color="error" sx={{marginBottom:'4px',width:'110px'}} onClick={()=>handleDeleteAddress(val?.id, userToken)} startIcon={<DeleteIcon />}>
                            Delete
                            </Button>
                            <IconButton aria-label="delete" onClick={()=>handleDeleteAddress(val?.id, userToken)} className='d-md-none d-block'>
                            <DeleteIcon />
                            </IconButton>                          
                           {val?.id && <UserAddressForm oldAddress={val} handleUpdateAddress={handleUpdateAddress} isLoading={loading} Show="Show" lat={latitude} long={longitude} handleClose={handleClose} handleShow={handleShow} show={show}/>} 
                        </div>
                        <div>
 
                        </div>
                    </div>
                </div>
                ))
             }
            </>):(<>
              <div className='row'>
        <div className="col-12 col-md-3"></div>
        <div className="col-12 col-md-6">
          <div className='d-flex justify-content-center align-items-center' style={{maxHeight:'200px', width:'100%', height:'200px'}}>           
          <img src={Address} className='' style={{width:'200px', height:'auto', }} alt="" />
          </div>
        <div>
        <div className="col-12 col-md-3"></div>
         
         </div>
        </div>
     
      </div>
            </>)
          }

           
              
                <div className="col-12 py-3 text-center">
                
                
                  <UserAddressForm isLoading={loading} lat={latitude} long={longitude} liveaddress={address} formattedliveaddress={formattedAddress} handleAddAddress={handleAddAddress} userallAddress={userAddress} isAddress={isAddress} />
                    
              

                </div>
                <div className="col-12">
      
             
                
                  
                </div>
            </div>
        </div>
     </div>
     </>
  )
}

export default UserAddress