import { useState, createContext } from "react";
import Axios from "../Axios";
import Toast from "../Tost";
//import { AuthContext } from "../AuthProvider";

export const ServicesContext = createContext();

const ServicesProvider = ({ children }) => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false)

//    get all services
const handleGetAllServices = async () =>{
      setLoading(true)
    try {
        const response = await Axios.get('/get_all_products'); 
        if(response.status===200){
         const data = response?.data;
           setServicesData(data?.products)
           console.log("services...",data);
         Toast(data?.message,response.status)            
        }               
       } catch (err) {
         const error = err?.response?.data
        //  Toast(error.message)
       }finally{
         setLoading(false)
       }
}

  return (
    <ServicesContext.Provider value={{loading,setLoading, servicesData, handleGetAllServices, setServicesData}}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
