import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import successIcon from './asets/Order Successful.png'
function OrderPlacedSuccessfully() {
      const navigate = useNavigate()

      const onGoToServices = ()=>{
         
        navigate("/services/detailing")
        window.location.reload()
      }

  return (
    <>
       <div className="container">
                     <div className="row " >

                             <div className="col-12 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                                  <div className='order-successfull shadow p-2 rounded'>
                                          <div style={{width:'100%'}} className='d-flex justify-content-center align-items-center'>
                                          <img src={successIcon} alt="" style={{width:'70%', height:'auto'}} />
                                          </div>
                                        <div className="content-text my-4">
                                               <h5 style={{fontWeight:'700', fontSize:'1.6rem', textTransform:'capitalize', textAlign:'justify'}} className='text-center px-1 px-md-2'>
                                                Your order has been successfully placed
                                               </h5>
                                        </div>
                                        <div className='my-5'>
                                            <Button onClick={onGoToServices}  variant='contained' sx={{backgroundColor:'#b8242a', width:'100%'}}>Go to Services</Button>
                                        </div>
                                  </div>
                             </div>
                     </div>
                 </div>
     
     </>
  )
}

export default OrderPlacedSuccessfully