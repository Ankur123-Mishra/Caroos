import { useState, createContext } from "react";
import Axios from "../Axios";
import Toast from "../Tost";
//import { AuthContext } from "../AuthProvider";

export const UserAddressContext = createContext();

const UserAddressProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(false)
   const [defaultAddress, setDefaultAddress] = useState({})
//    add address
const handleAddAddress = async (addressData, userToken, e, navigate) =>{
    e.preventDefault()
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
         Toast(data?.message,response.status) 
        //  handleGetAllAddress(userToken)         
        //  handleClose() 
        navigate("/cart")         
        }               
       } catch (err) {
         const error = err?.response?.data
         Toast(error?.message)
       }finally{
         setLoading(false)
       }
}

const handleGetAllAddress = async (userToken) =>{
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
         setUserAddress(data?.addresses)           
        }               
       } catch (err) {
         const error = err?.response?.data
         Toast(error.message)
       }finally{
         setLoading(false)
       }
          
}

// update address
const handleUpdateAddress = async(updatedAddress, address_id, userToken, e, handleClose, navigate)=>{
      e.preventDefault()
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
            handleClose()    
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
       Toast(error.message)
     }finally{
       setLoading(false)
     }
}

// get default address

const handleDefaultGetAddress = async (userToken) =>{
    setLoading(true)
    try {
        const response = await Axios.get('/get-address',{
         headers: {
             Authorization: `Bearer ${userToken}`
           }
        }); 
        if(response.status===200){
         const data = response?.data;
       //  Toast(data?.message,response.status) 
         setDefaultAddress(data?.address)           
        }               
       } catch (err) {
         const error = err?.response?.data
         Toast(error?.message)
       }finally{
         setLoading(false)
       }
         
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
    <UserAddressContext.Provider value={{loading,userAddress, defaultAddress, handleAddAddress, handleGetAllAddress, handleUpdateAddress, handleDeleteAddress, handleDefaultGetAddress, onSelectAddress}}>
      {children}
    </UserAddressContext.Provider>
  );
};

export default UserAddressProvider;
