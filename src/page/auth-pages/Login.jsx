import React, { useContext, useEffect, useState } from 'react'
import LoginCard from '../../components/LoginCard'
 import { Button, Modal } from 'react-bootstrap'

import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import Toast from '../../Tost';
import Axios from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import EnterOTP from './enter-otp/EnterOTP';
import { Button as ButtonM} from '@mui/material';

function Login({isLogin, login, mobileLogin}) {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false)
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
            setCheck(true)
          //  navigate('/enter-otp')

        }
      } catch (error) {
         
          const err = error.response.data
    Toast(err.message)
      }finally{
         setIsLoading(false)
      }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
      if(isLogin){
        handleShow()
      }
  },[isLogin])
  return (
    <>
    
{login?(
  <>
  <button className="red-btn" onClick={handleShow}>{login}</button>
</>
):(
  <>
  {mobileLogin?(
    <ButtonM onClick={handleShow} size="small" variant="outlined" startIcon={<ElectricCarIcon />} sx={{color:'#DE3820'}}>
                  {mobileLogin}
                  </ButtonM>
  ):(
    <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" className="px-0 nav-text px-md-3 py-1 " style={{color:'white', width:'120px'}} onClick={handleShow}>
    {login?login:'Login'}
      </a>
  )}
  
      </>
      )}


      <Modal show={show} onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title> {check?"Enter OTP":"Enter Your Number"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {check?(
     <EnterOTP/>
        ):(      
        <form className=''>
          <div className="mt-4 px-3">
          <input type="number" name="number" onChange={(e)=>setMobile(e.target.value)} placeholder='Enter Mobile Number' className='form-control input-box p-3'  />
            
          </div>
          <div className="mt-3 text-center">
          <button onClick={onSendOTP} className='red-btn'> 
          {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):"Send OTP"}
          </button>
          </div>                          
         </form>
         )}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
           {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span></>):"Send OTP"}
          </Button>
        </Modal.Footer> */}
      </Modal>

    
    </>
  )
}

export default Login