import React, { useContext, useEffect, useState } from 'react'
import '../auth.css'
import Cookies from 'js-cookie';
import { AuthContext, useAuth } from '../../../AuthProvider'
import Toast from '../../../Tost'
import Axios from '../../../Axios'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { CartContext } from '../../../context/CartProvider'
function EnterOTP({check}) {
    const {userToken, setUserToken, userMobile, setUserMobile} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState()
    const [isLoading2,setIs2Loading] = useState()
    const [show, setShow] = useState(false);
    const[input1,setInput1]  = useState("")
    const[input2,setInput2]  = useState("")
    const[input3,setInput3]  = useState("")
    const[input4,setInput4]  = useState("")
    const {setCart} = useContext(CartContext)

    // method for otp btn appear after 30 s 
    const [count, setCount] = useState(30);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          // Display the hide button when countdown reaches 0
          setShowButton(true);
          clearInterval(countdownInterval);
        }
        return prevCount === 0 ? 0 : prevCount - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  const hideCount = (e) => {
    e.preventDefault()
    setShowButton(false);
    setCount(30); // Reset the count for the next time
    // Start the countdown again
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          // Display the hide button when countdown reaches 0
          setShowButton(true);
          clearInterval(countdownInterval);
        }
        return prevCount === 0 ? 0 : prevCount - 1;
      });
    }, 1000);
  };
  
  // end 
  
    const checkotp=async(e)=>{
        
            e.preventDefault()
            
            if(!input1 || !input2 || !input3 || !input4) return Toast('plz filled otp');
      
            const otp = input1+input2+input3+input4
            try {
               setIsLoading(true)
               const response = await Axios.post('/verify-otp',{mobile:userMobile, otp, device_id:'123456'});
               if(response.status===200){
                const data = response.data;
               // console.log("otp..", data?.accessToken);
                    const Token = data?.accessToken
                    if(Token.length>0){
                      Cookies.set('userToken', Token, { expires: 7 });
                     // localStorage.setItem('userToken', Token)
                      setUserToken(Token)
                      handleGetAllCart(Token)
                    }
                
                Toast(data.message,response.status);
                
                // if(!(data?.Customer?.is_active==0)){
                //   navigate("/services/16")
                // }
               }
            } catch (error) {
                const err = error.response.data
                  Toast(err.message)
    
            }finally{
               setIsLoading(false)
            }
    }

    const handleGetAllCart = async(userToken)=>{
      setIsLoading(true)
  try {
      const response = await Axios.get('/cart-list', {
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
         if(response.status===200){
          const data = response?.data;
            setCart(data?.cart_items)
          
             
            localStorage.setItem("cart", JSON.stringify(data?.cart_items))     
         }
     
  } catch (err) {
      const error = err?.response?.data
       setCart("")
      // Toast(error.message)
  }finally{
      setIsLoading(false)
  }
}


    function otphandler(e){
      


       // var element = document.getElementsByClassName('form-control')
        // console.log(element)
        
  
        // keycode 8 for backspace 
        if(e.keyCode == 8 && e.target.value.length ==0 &&  e.target.previousElementSibling !==null){
        e.target.previousElementSibling.focus()
       
  
        }if( e.target.value.length >=e.target.maxLength && e.target.nextElementSibling !==null){
          e.target.nextElementSibling.focus()
        }
        
      }

    //   Resend otp
    const HandleResendOTP=async(e)=>{
        e.preventDefault()
        try{
          setIs2Loading(true)
            const response= await Axios.post('/resend-otp',{mobile:userMobile})
             if(response.status===200){
              const data = response.data
            //  console.log('resend', data)
              Toast(data.message,response.status)
             }
           }
           catch(err){
            const error = err.response.data
            Toast(error.message)  
           }
           finally{
            setIs2Loading(false)
           }
    }
    const handleClose = () => setShow(false);
    let handleShow1 = (a) => setShow(a);
    useEffect(()=>{
       if(check===1){
        handleShow1(true)
       }
      
    },[check])
  return (
    <>



<form>
                <div className="mb-3 d-flex  justify-content-center" style={{gridGap:'20px'}}>
         <input type="text" className="form-control form-input" id="otp1" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}} value={input1} onChange={(e)=>{setInput1(e.target.value)}}/>
    
    <input type="text" className="form-control form-input" id="otp2" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}} value={input2} onChange={(e)=>{setInput2(e.target.value)}}/>
    
    <input type="text" className="form-control form-input" id="otp3" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}}  value={input3} onChange={(e)=>{setInput3(e.target.value)}}/>
    
    <input type="text" className="form-control form-input" id="otp4" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}}  value={input4} onChange={(e)=>{setInput4(e.target.value)}}/>
    </div> 
    <div className='my-3 text-center'>
    <button onClick={checkotp} className='red-btn'>
    {isLoading?(<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span></>):" Verify"}
   
    </button>
    </div>

     {/*  */} 

     <div  className="mt-3 text-center">
     {
      count?(<>
    <p>Resend OTP in {count} seconds</p>
      </>):(<>
      {showButton && <p className="text-center red-t" onClick={(e)=>{HandleResendOTP(e); hideCount(e)}} style={{cursor:"pointer",display:'inline-block'}}  >Resend OTP</p>}
      </>)
     }
     </div>
     {/* <div>
      <div className="mt-3 text-center">
      <p>Resend OTP in {count} seconds</p>
      </div>
      {showButton &&<p className="text-center red-t border" onClick={HandleResendOTP} style={{cursor:"pointer",display:'inline-block'}}  >Resend OTP</p>}
    </div> */}

     {/* <div className="mt-3 text-center">
     <p className="text-center red-t" onClick={HandleResendOTP} style={{cursor:"pointer",display:'inline-block'}}  >Resend OTP</p>
     </div>  */}
    </form>

    {/* <div className="container-fluid fullHeight d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="row">          
                <div className="col-sm-12 ">
                <div className="otp-container card-shadow p-3 bg-lightblue rounded">
                <h3 className='red-t text-center py-3'>Enter OTP</h3>
                <form>
                <div className="mb-3 d-flex  justify-content-center" style={{gridGap:'20px'}}>
         <input type="text" className="form-control form-input" id="otp1" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}} value={input1} onChange={(e)=>{setInput1(e.target.value)}}/>
    
    <input type="text" className="form-control form-input" id="otp2" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}} value={input2} onChange={(e)=>{setInput2(e.target.value)}}/>
    
    <input type="text" className="form-control form-input" id="otp3" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}}  value={input3} onChange={(e)=>{setInput3(e.target.value)}}/>
    
    <input type="text" className="form-control form-input" id="otp4" onKeyUp={otphandler} aria-describedby="name" maxLength={1} style={{maxWidth:'70px'}}  value={input4} onChange={(e)=>{setInput4(e.target.value)}}/>
    </div> 
    <div className='my-3 text-center'>
    <button onClick={checkotp} className='red-btn'>Verify</button>
    </div>

    
     <div className="mt-3 text-center">
     <p className="text-center red-t" onClick={HandleResendOTP} style={{cursor:"pointer",display:'inline-block'}}  >Resend OTP</p>
     </div> 
    </form>

    </div>
                </div>
            </div>
        </div>
        </div> */}
    </>
  )
}

export default EnterOTP