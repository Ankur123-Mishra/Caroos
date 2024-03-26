import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartProvider'
import { AuthContext } from '../AuthProvider';
import Loader from '../Loader';
import Axios from '../Axios';
import Toast from '../Tost';
import { ServicesContext } from '../context/ServicesProvider';

import RemoveCardMobile from './RemoveCardMobile';
import { IconButton } from '@mui/material';
//import { useCart } from '../context/cart';

function RemoveCart({cartItems}) {
    const {cart,handleGetAllCart, handleRemoveFromCart, loading} = useContext(CartContext)
   const {setServicesData} = useContext(ServicesContext)
    const {userToken} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const getAllServices = async (userToken)=>{
       
        setIsLoading(true)
         try {
            
          const response = await Axios("/get_products", {
            headers: {
                Authorization: `Bearer ${userToken}`
              }
          })
          if(response.status===200){
            const data = response?.data;
            setServicesData(data?.products)
            // Toast(data.message,response.status)
          }
         } catch (err) {
          const error = err?.response?.data
              // Toast(error?.message)
         }finally{
            setIsLoading(false)
         }
           
      }
   const removeCart = (id, userToken)=>{
    handleRemoveFromCart(id, userToken)
    handleGetAllCart(userToken)
   }

   useEffect(()=>{
      getAllServices(userToken)
   },[cart])

  return (
    <>
    {loading && <Loader/>}
    {isLoading && <Loader/>}
       {cart.length>0?(<>
        {/* <div  className="card-box rounded py-4 px-3 "> */}
         {  cartItems?.map((val)=>(
            <>
              {val?.product? (<>
                <div style={{ minHeight:'87px', width:'100%'}} className="remove-card position-relative border p-1 mb-3 rounded d-flex justify-content-between align-items-center ">
                {/* <span style={{cursor:'pointer'}} className="position-absolute cross-btn" onClick={()=>removeCart(val?.product?.product_id, userToken)} ><i class="fa-solid fa-xmark" style={{color:'red'}}></i></span> */}
                 <div style={{maxWidth:'100px', maxHeight:'90px', overflow:'hidden'}}>
                 <img  src={val?.product?.images} width='100%' className='img-fluid' alt="" />
                 </div>
                 <div>
                 <h5 className='card-font text-md-start'>{val?.product?.name.slice(0, 15)}...</h5>
                 <h5 className='text-black card-font' style={{fontSize:'21px'}}><i style={{color:'#62718D'}} class="fa-solid fa-indian-rupee-sign"></i> {val?.product?.price}</h5>
                 </div>               
                 
                 <IconButton onClick={()=>removeCart(val?.product?.product_id, userToken)} aria-label="delete" size="large">
                 <i className="fa-solid fa-trash" style={{color:'#DE3820', fontSize:'20px'}}></i>
                   </IconButton>
                </div>
                </>):""}





            {/* <div style={{maxWidth:'490px', minHeight:'100px'}} className="shadow d-flex rounded justify-content-center align-items-center"> 
                    <div key={val?.cart_id} style={{maxWidth:'400px'}} className="position-relative card-shadow d-md-row mb-3 bg-lightblue rounded p-3">         
                    <span className="position-absolute cross-btn" onClick={()=>removeCart(val?.product?.product_id, userToken)} ><i class="fa-solid fa-xmark" style={{color:'red'}}></i></span>
                    <div className="row">
                <div className="col-sm-8 col col-md-8">
                   <div className="row">
                    <div style={{maxWidth:'100px'}} className=" col-md-5">
                        <img style={{maxHeight:'200px'}} src={val?.product?.images} width="100%" className='img-fluid' alt="" />
                    </div>
                    <div className="col-sm-12 col-md-7">
                    <h4 className=' px-2 mt-2 text-md-start'>{val?.product?.name}</h4>
                    
                    </div>
                   </div>
                </div>
                <div className="col-sm-4 col col-md-4 text-center d-md-flex flex-column justify-content-center align-items-end">
                    <h5 className='text-black' style={{fontSize:'21px'}}><i style={{color:'#62718D'}} class="fa-solid fa-indian-rupee-sign"></i> {val?.product?.price}</h5>
                    <button className="red-btn"
                     onClick={()=>removeCart(val?.product?.product_id, userToken)} >Remove</button>
                </div>
            </div>
                
            </div>
            </div> */}

            {/* <div key={val?.cart_id} className=" d-block d-md-none my-3">
                 <RemoveCardMobile val={val} userToken={userToken} removeCart={removeCart}/>
            </div> */}
            
            </>
        ))
       }
       
     {/* </div> */}
       </>):<h3 className='text-center'> Your Cart is empty</h3>}

    </>
  )
}

export default RemoveCart