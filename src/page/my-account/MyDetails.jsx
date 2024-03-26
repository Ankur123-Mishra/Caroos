import React, { useContext, useState } from 'react'
import './myaccount.css'
import { AuthContext } from '../../AuthProvider'
import { ProfileContext } from '../../context/ProfileProvider';
import { useNavigate } from 'react-router-dom';
function MyDetails() {
    const [userDetials, setUserDetails] = useState({
         name:"",
         email:"",
         alternate_mobile_number:""
    })
    const navigate = useNavigate()
    const {userToken} = useContext(AuthContext);
    const {handleAddProfile} = useContext(ProfileContext)

  return (
      <div className="container-fluid fullHeight d-flex justify-content-center align-items-center">
           <div className="mydtails card-shadow nav-margin rounded bg-lightblue p-4 mt-3">
           <div className='py-3'>
           <h4 className='text-center fw-bold'>Add Your Details</h4>
            <p className='text-center'>add details to boock a service</p>
           </div>
               <div>
                <form>
                         <div className="mb-3">
                            <input type="text" onChange={(e)=>setUserDetails({...userDetials, name:e.target.value })} className="form-control"  placeholder="Enter Your Name" />
                         </div>
                         <div className="mb-3">
                            <input type="email" onChange={(e)=>setUserDetails({...userDetials, email:e.target.value })} className="form-control"  placeholder="Enter Your Email" />
                         </div>
                         <div className="mb-3">
                            <input type="number" onChange={(e)=>setUserDetails({...userDetials, alternate_mobile_number:e.target.value })} className="form-control" placeholder="Enter Your Alternate Mobile" />
                         </div>
                        <button onClick={(e)=>handleAddProfile(userDetials, userToken, e, navigate)} className='red-btn'>Add Details</button>
                </form>
               </div>
           </div>

      </div>
  )
}

export default MyDetails