import React, { useContext, useState } from 'react'
import './component.css'
import carImg from '../asets/bugatti-transformed 1.png'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../Axios';
import Toast from '../Tost';
import { AuthContext, useAuth } from '../AuthProvider';
function LoginCard() {
    const {userMobile, setUserMobile} = useContext(AuthContext)
    const [mobile, setMobile] = useState("");
     const [isLoading, setIsLoading] = useState(false)
     const navigate = useNavigate()
    const onSendOTP = async(e)=>{
          e.preventDefault()
        try {
          setIsLoading(true)
          const response = await Axios.post('/login', {mobile:mobile});
          if(response.status===200){
            localStorage.setItem("userMobile",JSON.stringify(mobile))
             setUserMobile(mobile)
            const data = response.data;
           // console.log("login..", data)
            Toast(data.message,response.status)
             navigate('/enter-otp')

          }
        } catch (error) {
           
            const err = error.response.data
      Toast(err.message)
        }finally{
           setIsLoading(false)
        }
    }

  return (
      <div className="container-fluid fullHeight d-flex align-items-center">
          <div className="container"> 
            <div className="row">
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-12 col-md-8">
                    <div className="row my-3 mt-md-0">
                        <div className="col-4 d-none px-0 d-md-flex justify-content-end align-items-center py-4">
                            <img src={carImg} height="200px" className=' m-0 p-0' alt="" />
                        </div>
                        <div className="col-12 col-md-6 m-0 py-5 px-4 login-box bg-lightblue rounded text-center">
                          
                          <h4 className='text-center fw-bold'>Welcome !!</h4>
                           <p className='text-center'>Login to continue to caross</p>
                           <form className=''>
                           <div className="mt-4 px-3">
                           <input type="number" name="number" onChange={(e)=>setMobile(e.target.value)} placeholder='Enter Mobile Number' className='form-control input-box'  />
                            
                           </div>
                           <div className="mt-3">
                           <button onClick={onSendOTP} className='red-btn'> Send OTP</button>
                           </div>
                           
                           </form>

                           
                        </div>
                    </div>
                </div>
                <div className="col-3 d-none d-md-block"></div>
            </div>
          </div>
      </div>
  )
}

export default LoginCard