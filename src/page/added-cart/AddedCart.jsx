import React, { useContext, useEffect, useState } from 'react'
import './add-cart.css'
import RemoveCart from '../../components/RemoveCart';
import { CartContext } from '../../context/CartProvider';
import { AuthContext } from '../../AuthProvider';
import SelectAddOns from '../services/select-add-ons/SelectAddOns';
import { UserAddressContext } from '../../context/UserAddressProvider';
import Axios from '../../Axios';
import Toast from '../../Tost';
import Loader from '../../Loader';
import { Button as Buttons } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
//import DisplayRazorpay from '../../displayRazorpay';
import { PaymentContext } from '../../context/PaymentProvider';
import { Link, useNavigate } from 'react-router-dom';
import Payment from '../../PaymentNow';
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup } from '@mui/material';
//import GeoLocation from './GeoLocation';
// import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import {addDays, setHours, setMinutes, startDate, addHours} from 'date-fns/'  
function AddedCart() {
    const payWithRazorpay = Payment()
    const [allCoupon, setAllCoupon] = useState([])
    const [GST, setGST] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [choosenCoupon, setChoosenCoupon] = useState("")
    const {cart,  setCart, setTotalPrice, totlaPrice} = useContext(CartContext)
    const {userToken} = useContext(AuthContext)
    const [orderType, setOrderType] = useState("Online")
    const {userAddress,defaultAddress, handleDefaultGetAddress} = useContext(UserAddressContext)
    const [defaultCar, setDefaultCar] = useState("")
    const [totalGST, setTotalGST] = useState("")
    const [couponDiscount, setCouponDiscount] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [ amountPayable, setAmountPayable] = useState("")
 
    const [choseDateTime, setChoseDateTime] = useState("")
  const [currentHour, setCurrentHour] = useState(9)
    const navigate = useNavigate()
   
    const [show, setShow] = useState(false);
const [addOns, setAddOns] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
   useEffect(()=>{
  
        // handleGetAllCart(userToken)
        handleDefaultGetAddress(userToken)

   },[userToken])

   const handleGetAllCart = async()=>{
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
             setTotalAmount(data.total)  
             setTotalGST(data?.gst)
             setAmountPayable(data?.payable)


             
            //   const gst = 18/100;
            //   const newAmount = data?.total;
            //    const gstamount = gst * newAmount
            //    const total = newAmount + gstamount
            //     setGST(gstamount)
            //  setTotalDiscount(total)
              


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

useEffect(()=>{
    handleGetAllCart()
},[userToken])
      
   



  const getDefaultCar = async () =>{
    try { 
      setIsLoading(true);
         if(userToken){
 
       
        const response = await Axios.get('get_user_car',{
          headers: {
            Authorization: `Bearer ${userToken}`
          }
           })
           if(response.status===200){
            const data = response?.data;
           // console.log('defalutcar', data.car);
            setDefaultCar(data?.car)
         //  console.log("default..",data);
           // Toast(data?.message,response.status)          
           }
          }   
         } catch (err) {
             const error = err.response.data
                    // Toast(error.message)
         }finally{ 
                 setIsLoading(false)
         } 
  }

  useEffect(()=>{
   getDefaultCar()
  },[userToken])
 // console.log("coupon...",allCoupon);
 //console.log("coupon", allCoupon);
// const onApplyCoupon = ()=>{
  
//      if(choosenCoupon){

//          const isMatchCoupon = allCoupon.filter((val)=>val?.coupon_code===choosenCoupon) 
//              const result = totlaPrice- isMatchCoupon[0]?.discount;
//              // console.log("res", result)
//                if(result){
//                 setTotalPrice(result)
//                 setChoosenCoupon("")
//                }
                   
                    
//      }
// }
const onApplyCoupon = async () =>{
  try { 
    setIsLoading(true);
       if(userToken){
        const response = await Axios.post('/apply-coupon', {coupon_id:choosenCoupon},{
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
     
         console.log("coupon", response.total)
         if(response.status===200){
       
          const data = response?.data;
          setTotalAmount(data.total)  
          setTotalGST(data?.gst)
          setAmountPayable(data?.payable)
         setCouponDiscount(data.discount)
         Toast(data?.message,response.status)  
              
         }
        }   
       } catch (err) {
           const error = err.response.data
                  // Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
}


useEffect(()=>{
  if(!cart.length){
      navigate("/services/detailing")
  }
},[cart])

// get all coupons
const CouponList = async () =>{
  try { 
    setIsLoading(true);
       if(userToken){
        const response = await Axios.get('/get-service-coupons',{
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
     
    
         if(response.status===200){
          const data = response?.data;
          setAllCoupon(data?.coupons)
       //  console.log("allcoupons", data?.coupons);
          
         }
        }   
       } catch (err) {
           const error = err.response.data
                  // Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
}

// addons
const getAddOns = async () =>{
  try { 
    setIsLoading(true);
       if(userToken){
        const response = await Axios.get('/get_addons',{
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
     
    
         if(response.status===200){
          const data = response?.data;
          setAddOns(data?.addons)
   
          
         }
        }   
       } catch (err) {
           const error = err.response.data
                  // Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
}






useEffect(()=>{
  CouponList()
  getAddOns()
},[userToken])

const onAddressTimeOrder = ()=>{
     if(!defaultAddress){
        Toast("Please Add Your Default Address", 400)
          //  setAddressError("Please Add Your Default Address")
     }else if(!choseDateTime){
      Toast("Please Choose Date And Time", 400)
     // setDataTimeEror("Please Choose Data And Time")
     }

}
const PayNow = (totlaPrice, defaultAddressid, choosenCouponid, choseDateTime, orderType)=>{ 
     console.log("orderType", orderType)
  payWithRazorpay(totlaPrice, defaultAddressid, choosenCouponid, choseDateTime, orderType)
}

const onCoupon = async(couponcode)=>{
  try { 
    setIsLoading(true);
       if(userToken){
        const response = await Axios.post('/apply-coupon', {coupon_id:couponcode},{
          headers: {
              Authorization: `Bearer ${userToken}`
            }
         }); 
     
    
         if(response.status===200){
          const data = response?.data;
          setTotalAmount(data.total)  
          setTotalGST(data?.gst)
          setAmountPayable(data?.payable)
         setCouponDiscount(data.discount)
         Toast(data?.message,response.status)  
            
            handleClose()
         }
        }   
       } catch (err) {
           const error = err.response.data
                  // Toast(error.message)
       }finally{ 
               setIsLoading(false)
       } 
 
  
}



const currentDateTime = new Date();
  const minDateTime = new Date(currentDateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds

  const isToday = (date) => {
    const today = new Date();
    const inputDate = new Date(date); // Ensure that date is a valid Date object
  
    return inputDate.getDate() === today.getDate() &&
           inputDate.getMonth() === today.getMonth() &&
           inputDate.getFullYear() === today.getFullYear();
  };
 
  
  useEffect(()=>{
    const currentDate = new Date();
    const curren_hours = currentDate.getHours();
     console.log(" curren_hours",  curren_hours)
        if(curren_hours>=currentHour){
            setCurrentHour(curren_hours)
        }else{
           setCurrentHour(9)
        }
  },[choseDateTime])




  return (
    <>
     {isLoading && <Loader/>}
        <div className="container-fluid  nav-margin">
        <div className="container-fluid"  style={{zIndex:'1000', position:'relative'}}>
            <div className=" py-3">
               <h3 className='text-center red-t'>Checkout</h3>
               {/* <GeoLocation/> */}
                <div className="row">
                    <div className="col-12">
                        <p className='text-center'>{cart?.length} Item In Your Cart</p>
                    </div>
                      <div className="row p-0">
                        {/* left card */}
                        <div className="col-12  col-md-6 py-3">
                            <div className='me-md-1 me-0 p-2 shadow p-md-3 rounded'>

                           
                           <div className="row">
                             <div className="col-12">
                             {cart.length>0?<RemoveCart cartItems={cart} />:null}  
                             </div>
                             {/* select add ons */}
                           

                             <SelectAddOns defaultCar={defaultCar}  handleGetAllCart={handleGetAllCart} addOns={addOns}/>
                           </div>
                           </div>
                        </div>
                        {/* right card */}
                        <div className="col-12 py-3 col-md-6">
                        <div className=' shadow ms-1 ms-md-0 p-3 rounded'>
                         {/* address */}
                         <p onClick={()=>navigate("/address", {state:{isAddressExist:defaultAddress?0:1}})} >
            <div style={{width:'100%'}} className="default-address-card py-1 px-3 address-card card-shadow rounded d-flex flex-row justify-content-between align-items-center">
              <div>
                <p style={{textTransform:'uppercase'}} className='text-black text-main'>Your Address</p>
               {defaultAddress?<p className='address-text fw-bold'>Home: {defaultAddress?.house_no}, Sector: {defaultAddress?.locality}, {defaultAddress?.landmark}</p>:<p className='address-text'>Please Add Your Default Address For Checkout</p>} 
              </div>
              <div className="text-center">
             
              <IconButton aria-label="delete" size="large">
              <i class="fa-solid fa-pen" style={{color:'#DE3820', fontSize:'20px'}}></i>
               </IconButton>
             
              </div>
            </div>
              </p>
            {/* date-time and address  */}
              <div className="d-flex flex-md-row flex-column justify-content-between gap-2">

              
            <div style={{width:'100%'}} className="refer-container card-shadow address-card p-2 mt-3 rounded">
            <p style={{textTransform:'uppercase'}} className='text-black text-main'>Choose Date And Time</p>
                  <div className="text-center mt-2">
                      <form>
                        <div className="mb-3 d-flex">
                            {/* <input type="datetime-local"
                              id="datetimeInput"
                             className='form-control'
                              name="data time" value={choseDateTime} 
                               onChange={(e)=>{console.log(e.target.value);setChoseDateTime(e.target.value)}} 
                               required
                       min={currentDateTimeFormatted
                       minTime={(isToday(choseDateTime) || choseDateTime === null) ? setHours(addHours(new Date(), 2), 0) : setHours(choseDateTime, 9)}
                                  maxTime={(isToday(choseDateTime) || choseDateTime === null) ? setHours(new Date(), 20) : setHours(choseDateTime, 19)}
                      }
                              
                                /> */}
                                {/* <DatePicker 
                                  selected={choseDateTime} 
                                  onChange={(date)=> {console.log(date);setChoseDateTime(date)}} 
                                  minDate={(new Date())}
                                  maxDate={addDays(new Date(),6)}
                                  placeholderText='DD:MM:YYYY, HH:MM AM/PM'
                                  dateFormat={"dd:MM:yyyy, h:mm aa"}
                                 
                                  calendarStartDay={1}
                                  timeIntervals={60}
                                  clearButtonTitle='clear'
                                  closeOnScroll={true}
                                  className="added-card-date-input"
                                  minTime={(isToday(choseDateTime) || choseDateTime === null) ?setHours(addHours(new Date(), 2), currentHour):setHours(new Date(), 9)}
                                  maxTime={setHours(new Date(), 20)}
                                  // withPortal
                                  todayButton="Today"
                                  isClearable
                                  showTimeSelect
                                /> */}

                               <DatePicker 
                                  selected={choseDateTime} 
                                  onChange={(date)=> {console.log(date);setChoseDateTime(date)}} 
                                  minDate={(new Date())}
                                  maxDate={addDays(new Date(),6)}
                                  placeholderText='DD:MM:YYYY, HH:MM AM/PM'
                                  dateFormat={"dd:MM:yyyy, h:mm aa"}
                                 
                                  calendarStartDay={1}
                                  timeIntervals={60}
                                  clearButtonTitle='clear'
                                  closeOnScroll={true}
                                  className="added-card-date-input"
                                  minTime={(isToday(choseDateTime) || choseDateTime === null) ?setHours(new Date(), currentHour + 2):setHours(new Date(), 9)}
                                  maxTime={setHours(new Date(), 20)}
                                  // withPortal
                                  todayButton="Today"
                                  isClearable
                                  showTimeSelect
                                />

                            <div>
                        </div>
                        </div>
                      </form>
                  </div>  
               </div>
               {/* coupon */}
               <div style={{width:'100%'}} className="Apply-coupon card-shadow p-2 mt-3 address-card rounded position-relative"> 
               <Button onClick={onApplyCoupon} disabled={choosenCoupon?false:true} variant="contained" color='error' sx={{position:'absolute', top:'9px', right:'1px', padding:'1px', fontSize:'8px'}} size="small">apply now</Button>
               <Button onClick={handleShow} variant="outlined" color='error' sx={{position:'absolute', top:'9px', right:'83px', padding:'1px', fontSize:'8px'}} size="small">your coupons</Button>
               <p style={{textTransform:'uppercase'}} className='text-black text-main'>Apply Coupon</p>         
                     <form className='pb-2'>
                       <input className='form-control' value={choosenCoupon} placeholder='Enter Your Coupon' onChange={(e)=>setChoosenCoupon(e.target.value)}  />           
                     </form>                
                </div>
                  {/* coupon modal */}
                  <Modal show={show} onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                  >
        <Modal.Header closeButton>
          <Modal.Title>Your Coupons</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div style={{minHeight:'200px'}} className='d-flex flex-wrap'>
          {allCoupon.length?(<>
            {  allCoupon.map((coupon)=>(
             <div key={coupon.id}>
             <Button variant="contained" sx={{margin:'6px'}} onClick={()=>onCoupon(coupon?.coupon_code)} color='error' size="small">
          {coupon?.coupon_code} <br /> <small style={{color:'white'}}> &nbsp; {coupon?.discount} {coupon?.type===1?"Rs":"%"} &nbsp; Off</small>
             </Button>
             
             </div>
           
           ))}
          </>):(<>
               <div style={{minHeight:'200px'}} className='d-flex justify-content-center align-items-center'>
                    <h3 className='red-t'>Coupon Is Not Available</h3>

               </div>
          </>)}
          
           
          </div>
        </Modal.Body>
      </Modal>
               {/* coupon end */}
     </div>
                <div style={{width:'100%'}} className="payment-card card-shadow address-card mt-3 p-2 rounded">
                      <div className="d-flex justify-content-between">
                        <p className='text-black'>Service Total</p>
                        <p className='text-black'><i class="fa-solid fa-indian-rupee-sign text-black"></i>&nbsp;{totalAmount}</p>
                      </div>
                     {couponDiscount && <div className="d-flex justify-content-between">
                        <p className='text-black'>Discount</p>
                        <p className='text-black'><i class="fa-solid fa-indian-rupee-sign text-black"></i>&nbsp; {couponDiscount}</p>
                      </div>} 
                      <div className="d-flex justify-content-between">
                        <div className='text-black'><p className='p-0 m-0'>GST - 18%</p><small>( 9% CGST + 9% SGST )</small></div>
                        <p className='text-black'><i class="fa-solid fa-indian-rupee-sign text-black"></i>&nbsp;{totalGST}</p>
                      </div>
                      <div className="d-flex justify-content-between mt-2">                       
                          <p className='fw-bold'>Amount Payable</p>
                          <p className='fw-bold'><i style={{color:'#62718D'}} class="fa-solid fa-indian-rupee-sign"></i>&nbsp;{amountPayable} </p>
                      </div>

                     

                      <div className="col-12 ">
                       
                      {amountPayable?(<>
                        <div className="d-flex  justify-content-between mt-2">                       
                           <div className='d-flex justify-content-center'>
                           <FormLabel sx={{color:'black', fontSize:'17px', fontWeight:'700'}} id="demo-row-radio-buttons-group-label">Payment Method</FormLabel>
                         
                           </div>
                           <div>
                        {amountPayable?(<>
                          <FormControl>
                               
                                <RadioGroup
                                    value={orderType}
                                  row
                                  sx={{justifyContent:'right'}}
                               onChange={(e)=>setOrderType(e.target.value)}
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                >
                                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
                                  <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                                
                                  
                                </RadioGroup>
                              </FormControl>
                 <div className='text-center mt-2'>
                      
                  {(cart?.length && defaultAddress && choseDateTime)?<button onClick={()=>PayNow(parseFloat(amountPayable.replace(/,/g, '')), defaultAddress.id, choosenCoupon.id, choseDateTime, orderType)} className='red-btn red-btn-block'>Order Now</button>:(
                    <button onClick={onAddressTimeOrder} className='red-btn red-btn-block'>Order Now</button>
                   )} 
                 </div>
                   
                </>):null}
                           </div>
                      </div>
                 
                   
                </>):null}



                {/* {amountPayable?(<>
                 <div className='text-end mt-2'>

                  {(cart?.length && defaultAddress && choseDateTime)?<button onClick={()=>PayNow(parseFloat(amountPayable.replace(/,/g, '')), defaultAddress.id, choosenCoupon.id, choseDateTime)} className='red-btn red-btn-block'>Order Now</button>:(
                    <button onClick={onAddressTimeOrder} className='red-btn red-btn-block'>Order Now</button>
                   )} 
                 </div>
                   
                </>):null} */}
                
                </div>
                </div>
                        </div>
                        </div>
                        </div>
                      
                </div>
            </div>
        </div>
        </div>
      

       
    
   
    </>
  )
}

export default AddedCart