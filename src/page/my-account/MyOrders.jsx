import React, { useContext, useEffect, useState } from 'react'
import CheckoutCart from '../../components/CheckoutCart'
import { AuthContext } from '../../AuthProvider'
import { PaymentContext } from '../../context/PaymentProvider'
import Toast from '../../Tost'
import Axios from '../../Axios'
import Loader from '../../Loader'
import OrderCarMobile from '../../components/OrderCarMobile'
import { FamilyRestroomRounded } from '@mui/icons-material'

function MyOrders() {
  const [isLoading, setIsLoading] = useState()
  const {userToken} = useContext(AuthContext)
  const {order, setOrder} = useContext(PaymentContext)
//   const [order, setOrder] = useState([])
  const [orderData, setOrderData] = useState([])
const   [isActive, setIsActive] = useState(true)



   const handleGetAllOrders = async()=>{
    setIsLoading(true)
    try {
        const response = await Axios.get('/get-orders', {
            headers: {
                Authorization: `Bearer ${userToken}`
              }
           }); 
           if(response.status===200){
            const data = response?.data;
            //  setOrder(data?.orders)
              setOrder(data?.orders?.reverse())
              console.log("order",data);
          //  Toast(data?.message,response.status)            
           }
       
    } catch (err) {
        const error = err?.response?.data
       //  Toast(error.message)
    }finally{
        setIsLoading(false)
    }
   }

   useEffect(()=>{
     handleGetAllOrders()
   },[userToken])


// cancel order
const handleCancleOrder = async (id) =>{
      setIsLoading(true)
    try {
        const response = await Axios.get(`/cancel-order?id=${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
              }
           }); 
           if(response.status===200){
            const data = response?.data;
            //  setOrder(data?.orders)
          //   console.log("cart...",data.cart_items);
           Toast(data?.message,response?.status) 
              handleGetAllOrders()           
           }
       
    } catch (err) {
        const error = err?.response?.data
         Toast(error?.message)
    }finally{
        setIsLoading(false)
    }
}
    const onPreviousOrder = () =>{
          const PreviousOrder = order?.filter((val)=>val.order_stage===8 || val.order_stage===7);
          // console.log("preo",PreviousOrder)
          setIsActive(false)
             setOrderData(PreviousOrder)
    }
    const onActiveOrder = () =>{
        const ActiveOrder = order?.filter((val) => val.order_stage ===0  || val.order_stage === 1 || val.order_stage === 2 || val.order_stage === 3 || val.order_stage === 4 || val.order_stage === 5 || val.order_stage === 6);
          setIsActive(true)
        // console.log("actO", ActiveOrder)
        setOrderData(ActiveOrder)
  }

 useEffect(()=>{
    onActiveOrder()
 },[order])
      
  //console.log("orders.....", order);
 console.log("data", orderData);
  return (
    <>
    {isLoading && <Loader/>}
     <div className="container-fluid">
        <div className="container nav-margin">
        <h3 className='text-center red-t py-3 mt-3 '>My Orders</h3>
            <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
                <ul className='py-3 d-flex justify-content-center'>
                    <li><button onClick={onActiveOrder} className={isActive?'red-btn':'white-btn border'}>Active</button></li>
                    <li><button onClick={onPreviousOrder} className={isActive?'white-btn border ms-3':'red-btn border ms-3'}>Previous</button></li>
                </ul>
            </div>

                { orderData?.length>0?(<>
                  {
                    orderData?.map((val, idx)=>(
                        <>
                        <div key={idx+1} className="col-12 d-none d-md-block">
                           <CheckoutCart allOrders={val} handleCancleOrder={handleCancleOrder}/>
                       </div>
                       <div key={idx+1} className="col-12 d-block d-md-none mb-4">
                           <OrderCarMobile allOrders={val} handleCancleOrder={handleCancleOrder}/>
                       </div>
                       </>
                    ))
                }
                </>):(<>
                  <h3 className='text-center my-4'>No Order Found</h3>
                </>)} <div>

                 </div>
               
               
            </div>
        </div>
     </div>
     </>
  )
}

export default MyOrders