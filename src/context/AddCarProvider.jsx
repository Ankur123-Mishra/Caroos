import { useState, createContext, useEffect, useContext } from "react";
import Axios from "../Axios";
import Toast from "../Tost";

//import { useNavigate } from "react-router-dom";

export const addCarContext = createContext();
const AddCarProvider = ({children}) =>{
  const [loading, setLoading] = useState(false);
  const [userCarDetails, setUserCarDetails] = useState([])
  
// get cars
const handleGetCars = async (userToken)=>{  
    try { 
     setLoading(true);
        if(userToken){

       
       const response = await Axios.get('get_cars',{
         headers: {
           Authorization: `Bearer ${userToken}`
         }
          })
          if(response.status===200){
           const data = response?.data;
           setUserCarDetails(data?.cars)
        //   console.log("sgad..",data);
          // Toast(data?.message,response.status)          
          }
         }   
        } catch (err) {
            const error = err.response.data
                  //  Toast(error.message)
        }finally{ 
                setLoading(false)
        } 
        } 
       
// update user cars details
const handleUpdateCars = async (cars,updateCars, userToken, e) =>{
              e.preventDefault();
    setLoading(true)
          try {
           const response = await Axios.post('/update_car', {...updateCars,car_id:cars.id },{
            headers: {
                Authorization: `Bearer ${userToken}`
              }
           }); 
           if(response.status===200){
            const data = response?.data;
            const updatedIndex = userCarDetails.findIndex((data)=>data.id===cars.id)
            const toUpdateData = [...userCarDetails];
          // console.log("updata...", data);
            toUpdateData[updatedIndex] = data.car;
            setUserCarDetails(toUpdateData)
            // setUserCarDetails([...userCarDetails,data])      
            Toast(data?.message,response.status)            
           }               
          } catch (err) {
            const error = err?.response?.data
            Toast(error.message)
          }finally{
            setLoading(false)
          }
}

// delete cars
const handleDeleteCars = async (id, userToken) =>{
    try {
       setLoading(true)
       const response = await Axios.post(`/delete_car`,{car_id:id}, {
         headers: {
             Authorization: `Bearer ${userToken}`
           },               
       })
       if(response.status===200){
        const updatedData = userCarDetails.filter((item) => item.id !== id);
            setUserCarDetails(updatedData)
         const data = response?.data;
         Toast(data?.message,response.status)               
        }
    } catch (err) {
     const error = err.response.data
     Toast(error.message)
    }finally{
     setLoading(false)
    }
}


    return(
        <addCarContext.Provider value={{loading, setLoading, userCarDetails, setUserCarDetails, handleGetCars, handleDeleteCars, handleUpdateCars}}>
            {children}
        </addCarContext.Provider>
    )
}

export default AddCarProvider
