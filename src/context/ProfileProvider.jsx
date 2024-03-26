import { useState, createContext } from "react";
import Axios from "../Axios";
import Toast from "../Tost";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false)
 

//    add to cart
const handleAddProfile = async (userInfo, userToken, e, navigate) =>{
     e.preventDefault()
      setLoading(true)
    try {
        const response = await Axios.post('/edit-profile', {userInfo},{
         headers: {
             Authorization: `Bearer ${userToken}`
           }
        }); 
        if(response.status===200){
         const data = response?.data;
           //console.log("user", data);
         Toast(data?.message,response.status) 
         navigate("/services/16")
                
        }               
       } catch (err) {
         const error = err?.response?.data
         Toast(error.message)
       }finally{
         setLoading(false)
       }
}

  return (
    <ProfileContext.Provider value={{userData, handleAddProfile, loading}}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
