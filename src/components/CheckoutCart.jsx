import React, { useEffect, useState } from 'react'
import carsImg from '../asets/image 37.png'
function CheckoutCart({allOrders, handleCancleOrder}) {
     const [orderStatus, setOrderStatus] = useState("")
     useEffect(()=>{
         if(allOrders.order_stage===0){
               setOrderStatus("Ordered")
         }else if(allOrders.order_stage===1){
              setOrderStatus("Confirmed")
         }else if(allOrders.order_stage===2){
            setOrderStatus("Ready to Pickup")
         }else if(allOrders.order_stage===3){
            setOrderStatus("Picked")
         }else if(allOrders.order_stage===4){
            setOrderStatus("Ready to Service")
         }else if(allOrders.order_stage===5){
            setOrderStatus("Service Done")
         }else if(allOrders.order_stage===6){
            setOrderStatus("Ready to Deliver")
         }else if(allOrders.order_stage===7){
            setOrderStatus("Delivered")
         }else if(allOrders.order_stage===8){
            setOrderStatus("Canceled")
         }
     },[allOrders])
  return (
    <>
        <div className="row card-shadow position-relative bg-lightblue py-3 mb-3 rounded">
                           {orderStatus && <span className='position-absolute px-2 text-center rounded border' style={{top:'2px', right:'10px', position:'absolute', width:'100px', color:'#b8242a', fontWeight:'700'}}>{orderStatus}</span>}
                            <div className="col-12 col-md-8">
                                <div className="row">
                                 
                                    <div className="col-12 col-md-4">
                                    {allOrders?.car?.model?(
                                       <img src={allOrders?.car?.model?.image?(allOrders?.car?.model?.image):carsImg} className='img-fluid' alt="" />
                                    ):(
                                       <img src={carsImg} className='img-fluid' alt="" />
                                    )}    
                                    </div>
                                    <div className="col-12 col-md-3">
                                         <div>
                                        
                                         <p className='fw-bold'>Booking Date</p>
                                         <p>{allOrders?.order_date}</p>
                                         </div>
                                        {!(allOrders.order_stage===8 || allOrders.order_stage===7) && <div className='p-0 m-0'>
                                            {/* <p className='fw-bold p-0'>pickup date</p>
                                            <p>{allOrders?.order_pickup_date}</p> */}

                                         </div> } 
                                    </div> 
                                    
                                  {allOrders?.products?.length?<div className="col-12 col-md-5 d-flex flex-column justify-content-start align-items-start">
                                  
                                       <ul>
                                       <p className='fw-bold'>Services Name</p>
                                          {allOrders.products.map((val, idx)=>(
                                             
                                            <li style={{listStyleType:''}} key={idx}>{val?.name}</li>
                                          ))}
                                         
                                       </ul>
                                    </div>:<div className='col-12 col-md-5'></div> } 
                                </div>
                            </div>
                          
                            <div className="col-12 col-md-4">
                           {(allOrders.order_stage===8 || allOrders.order_stage===7)?(<>
                           {(allOrders.order_stage===7)?<button disabled className='red-btn'>Order Delivered</button>:<button disabled className='red-btn'>Order Cancelled</button>}
                            
                           </>): (
                            <>
                            <div>                                   
                                    <p className='fw-bold'>Estimated Completion</p>
                                    <p>{allOrders?.order_delivery_date}</p>                                  
                            <div className=" text-center text-md-start">
                               {(allOrders.order_stage===0 || allOrders.order_stage===1)?(
                                <button onClick={()=>handleCancleOrder(allOrders?.id)} className='red-btn position-absolute'>Cancel</button>):""} 
                            </div>
                                   
                                </div>
                            </>
                           )} 
                           
                            </div>
                            
                       
                    </div>
    </>
  )
}

export default CheckoutCart