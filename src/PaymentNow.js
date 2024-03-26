import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { useNavigate } from 'react-router-dom'
import Toast from './Tost'
import Axios from './Axios'
import { CartContext } from './context/CartProvider'
import { PaymentContext } from './context/PaymentProvider'




const Payment = () => {
    const [paymentId, setPaymentId] = useState("")
    const {userToken} = useContext(AuthContext)
    const { setCart, setTotalPrice} = useContext(CartContext)
    const {order, setOrder} = useContext(PaymentContext)
    const [loading, setIsLoading] = useState(false)
    const navigate = useNavigate()
 
     
      const handlepPlaceOrder  = async (defaultAddressid, choosenCouponid, choseDateTime, orderType) =>{
        setIsLoading(true)
       // console.log("order..",data);
       
          if(userToken){
            if(defaultAddressid){
    
            try {
                const response = await Axios.post('/create-order',{
                    address_id:defaultAddressid,
                    coupon_id:choosenCouponid,
                    start_time:choseDateTime
                } ,{
                 headers: {
                     Authorization: `Bearer ${userToken}`
                   }
                }); 
                if(response.status===200){
                 const data = response?.data;
                // Toast(data?.message,response.status) 
                 setOrder([...order, data?.order])
                 setCart("")
               
                 localStorage.setItem("cart", JSON.stringify(""))
                 navigate("/order-placed-successfully")
                 
                
                // handleGetAllCart()                  
                }               
               } catch (err) {
                 const error = err?.response?.data
                 Toast(error?.message)
               }finally{
                 setIsLoading(false)
               }
          }
        }else{
            const message = "Please Complete Your Address"
            Toast(message)
        }
    
        
    }


   


    // const HandleUpdateOrder = async() => {   
    //     if(paymentId){
    //         try{    
    //             const response= await Axios.post(`/update-order?payment_status=1&payment_id=${paymentId}`,)
                 
    //              if(response.status===200){
    //               const data = response.data;
    //               Toast(data.message,response.status)
    //               handleRefreshClick()
    //               //  console.log("paymentid",data);
    //              }
    //            }
    //            catch(err){
    //             const error = err?.response?.data
    //             Toast(error.message); 
    //            }  
    //     }              
    //     }
 
        const handleGetAllCart = async()=>{
            
        try {
            const response = await Axios.get('/cart-list', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                  }
               }); 
               if(response.status===200){
                const data = response?.data;
                setCart(data?.cart_items)
                setTotalPrice(data?.total) 
                localStorage.setItem("cart", JSON.stringify(data?.cart_items))
                navigate("/services/detailing")           
               }
              if(response.status===400){
                  
              }
           
        } catch (err) {
            const error = err?.response?.data
            //console.log(error);
          
            //  setCart(0)
            // Toast(error.message)
        }
    }     

        // useEffect(()=>{
        //    HandleUpdateOrder()
        // },[paymentId])




    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
                //     window.alert('You are offline, failed to load the resources.')
            }
            document.body.appendChild(script)
        })
    }
    
    
     const payWithRazorpay = async ( amount, addressid, couponid, choseDateTime, orderType) => {
           if(orderType==="Online"){
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            if (!res) {
                alert('You are offline, failed to load the resources.')
                return
            }
        
           const options = {
            description: 'Order fees',
            // image: 'https://i.imgur.com/3g7nmJC.png',
            image:'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
           // key: 'rzp_test_7JFMstTaZGMnre', // Your api key  rzp_live_cckzy2AStiy992
           key: 'rzp_live_cckzy2AStiy992',
          
            amount: amount* 100,//amount in paise
            name: 'caross',
            description:'Thanks for purchasing',
            // prefill: {
            //     email: userData?.email,
            //     contact: userData?.mobile,
            //     name: userData?.name
            // }, 
            theme: { color: '#e2bc3f' },
            handler: (response) => {
                // alert(response.razorpay_payment_id)
                
               // alert(response.razorpay_payment_id)
                setPaymentId(response.razorpay_payment_id)
                // handleGetAllCartt()
                 Toast("payment successful",200)
                 handlepPlaceOrder(addressid, couponid, choseDateTime)         
                //  update_order(order?.id,response.razorpay_payment_id,1,type)
            },
            prefill:{
                 name:'caross'
            }
        };
        
            const paymentObject = new window.Razorpay(options)
            // paymentObject.on('payment.failed', (response) => {
            //     update_order(order?.id,response.error.metadata.payment_id,2,type)
            // })
            paymentObject.open()
           }else if(orderType==="Offline"){
            handlepPlaceOrder(addressid, couponid, choseDateTime, orderType)        
           }
        
    }
     
  return payWithRazorpay
    
  
}

export default Payment








