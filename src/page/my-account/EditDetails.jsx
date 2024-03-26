import React, { useContext, useState, useEffect } from 'react'
import './myaccount.css'
import Axios from '../../Axios';
import { AuthContext } from '../../AuthProvider'
//import { ProfileContext } from '../../context/ProfileProvider';
import Toast from '../../Tost';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';

function Profile() {
    const [userDetails, setUserDetails] = useState({
         name:"",
         email:"",
         alternate_mobile_number:""
    })
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {userToken} = useContext(AuthContext);
   // const {handleAddProfile} = useContext(ProfileContext)
    

    const handleAddProfile = async (userToken, e) =>{
      e.preventDefault()
       
     try {
      setIsLoading(true)
         const response = await Axios.post('/edit-profile', userDetails,{
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
         if(response.status===200){
          const data = response?.data;
            //console.log("user", data);
          Toast(data?.message,response.status) 
          setUserDetails({...userDetails, name:"", emai:"", alternate_mobile_number:""})
          navigate("/services/14")
                   
         }               
        } catch (err) {
          const error = err?.response?.data
          Toast(error?.message)
        }finally{
          setIsLoading(false)
        }
 }




    const getUserDetails = async ()=>{  
      setIsLoading(true) 
      if(userToken){
      //  console.log(userToken);
        try { 
       
                    
          const response = await Axios.get('/get-user',{
            headers: {

              Authorization: `Bearer ${userToken}`
              
            }
              })
              if(response.status===200){
                const data = response?.data;
                 setUserData(data?.customer)
              
              }
          
            
        } catch (err) {
        // const error = err.response.data
        //         Toast(error.message)
        }finally{ 
            setIsLoading(false)
        } 
    }else{
        navigate("/login")
    }
 } 

    useEffect(() => {
      getUserDetails() 
     }, [userToken]);
    // console.log("userData", userData);
  
    useEffect(()=>{
        setUserDetails({...userDetails, name:userData?.name, email:userData?.email, alternate_mobile_number:userData?.alternate_mobile_number})
    },[userData])


  return (
    <>
    {isLoading && <Loader/>}
      <div className="container-fluid fullHeight d-flex justify-content-center align-items-center">
           <div className="mydtails card-shadow nav-margin rounded bg-lightblue p-4 mt-3">
           <div className='py-3'>
           <h4 className='text-center fw-bold'>{userDetails?"Enter Your Details":"Edit Your Details"}</h4>
           
           </div>
               <div>
                <form>
                         <div className="mb-3">
                            <input type="text" onChange={(e)=>setUserDetails({...userDetails, name:e.target.value })} className="form-control" value={userDetails?.name}  placeholder="Enter Your Name"  required/>
                         </div>
                         {/* <div className="mb-3">
                            <input type="number" className="form-control" value={userDetails?.mobile} disabled="true"  />
                         </div> */}
                         <div className="mb-3">
                            <input type="email" onChange={(e)=>setUserDetails({...userDetails, email:e.target.value })} className="form-control" value={userDetails?.email}  placeholder="Enter Your Email" required />
                         </div>

                         {/* <div className="mb-3">
                            <input type="number" onChange={(e)=>setUserDetails({...userDetails, alternate_mobile_number:e.target.value })} className="form-control" value={userDetails?.alternate_mobile_number} placeholder="Enter Your Alternate Mobile" />
                         </div> */}
                        <button style={{padding:'7px'}} onClick={(e)=>handleAddProfile(userToken, e, navigate)} className='red-btn-block red-btn'>Update Details</button>
                </form>
               </div>
           </div>

      </div>
      </>
  )
}

export default Profile