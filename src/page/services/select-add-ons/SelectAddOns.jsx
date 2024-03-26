import React, { useContext, useEffect } from 'react'
import { ServicesContext } from '../../../context/ServicesProvider'
import Loader from '../../../Loader'
import '../services.css'
import { CartContext } from '../../../context/CartProvider'
import { AuthContext } from '../../../AuthProvider'
import { Link } from 'react-router-dom'
import Axios from '../../../Axios'
import Toast from '../../../Tost'
import { Button, IconButton } from '@mui/material'
import Slider from 'react-slick'


function SelectAddOns({defaultCar, handleGetAllCart, addOns}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    className: "center",
    centerMode: true,
    vertical: false,
    
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };


const {loading, setLoading, handleGetAllServices, servicesData, setServicesData} = useContext(ServicesContext)
const {handleAddToCart} = useContext(CartContext)
const {userToken} = useContext(AuthContext)

const getAllServices = async ()=>{
  if(userToken){
  setLoading(true)
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
      setLoading(false)
   }
  }else{
      
     handleGetAllServices()
  }
}



const addtoCart = (id, userToken, type)=>{
  handleAddToCart(id, userToken, type)
  handleGetAllCart(userToken)
   handleGetAllServices(userToken)
}

useEffect(()=>{
  getAllServices()
},[userToken])
  return (
    <>
   {loading && <Loader/>}

        <div className="container mb-3">
           {addOns?.length>0 && <h3 style={{fontSize:'21px'}} className='my-md-3 my-2 text-center text-md-start text-balck'>Select Add Ons</h3>} 
           
              <div className='addons-slider px-md-3 py-3'>
            { addOns?.length<3?(<>
            {addOns.map((services, idx)=>(
              <>
              <div key={idx+1} className='py-2 d-flex justify-content-start flex-wrap '>
                <div key={idx+1} className="rounded select-ons-card card-shadow position-relative ">
                         <div className='addones-img'>
                        <img src={services?.images} className='select-ons-img rounded' alt="" />
                        </div>
                        <div className='d-flex justify-content-between px-2 py-1 align-items-center'>
                        <div className=''>
                        <p className='addones-text '>{services?.name.slice(0, 17)}...</p>
                       {services?.price &&  <p  className='red-t addones-text text-start'><i class="fa-solid fa-indian-rupee-sign fa-md" style={{color:'#DE3820'}}></i> {services?.price}</p>}      
                          {/* <p style={{fontSize:'16px'}} className='text-black2'>Add On Details description</p>  */}
                        </div>                      
                           {defaultCar?(
                            <>
                            {services?.in_cart?(  
                             <>                          
                         {services?.price &&<IconButton className='' sx={{position:'absolute', bottom:'0', right:'0'}}  color="primary" aria-label="add to shopping cart" disabled>
                            <i class="fa-solid fa-cart-plus" style={{color:'#62718D'}}></i>
                              </IconButton> } 
                              </>
                              ):(
                             <>
                             {services?.price &&
                            <IconButton className=' position-absolute' sx={{position:'absolute' ,bottom:'0', right:'0'}}  onClick={()=>addtoCart(services?.product_id, userToken, 1)} color="primary" aria-label="add to shopping cart">
                            <i class="fa-solid fa-cart-plus" style={{color:'#DE3820'}}></i>
                              </IconButton>}
                              </>
                            )}
                            {/* <button style={{padding:'3px', width:'80px'}} onClick={()=>addtoCart(services?.product_id, userToken)} className="red-btn">Add</button> */}
                            </>
                            ):(<>
                              <Link to="/my-cars" className=' position-absolute' style={{bottom:'3px', right:'0px'}}>
                              <Button variant="contained" color='error' size="small" sx={{fontSize:'8px', padding:'1px'}}>
                                       Add Car
                               </Button>
                               </Link>
                           
                             </>)} 
                            
                            </div>
                    </div>
                  </div>
              </>
            ))}
            </>):(<>
              <Slider {...settings} className='slider-ons '>
             {addOns.map((services, idx)=>(
             
                <div key={idx+1} className='py-2 d-flex justify-content-center '>
                <div key={idx+1} className="rounded select-ons-card card-shadow position-relative ">
                         <div className='addones-img'>
                        <img src={services?.images} className='select-ons-img rounded' alt="" />
                        </div>
                        <div className='d-flex justify-content-between px-2 py-1 align-items-center'>
                        <div className=''>
                        <p className='addones-text '>{services?.name.slice(0, 17)}...</p>
                       {services?.price &&  <p  className='red-t addones-text text-start'><i class="fa-solid fa-indian-rupee-sign fa-md" style={{color:'#DE3820'}}></i> {services?.price}</p>}      
                          {/* <p style={{fontSize:'16px'}} className='text-black2'>Add On Details description</p>  */}
                        </div>                      
                           {defaultCar?(
                            <>
                            {services?.in_cart?(  
                             <>                          
                         {services?.price &&<IconButton className='' sx={{position:'absolute', bottom:'0', right:'0'}}  color="primary" aria-label="add to shopping cart" disabled>
                            <i class="fa-solid fa-cart-plus" style={{color:'#62718D'}}></i>
                              </IconButton> } 
                              </>
                              ):(
                             <>
                             {services?.price &&
                            <IconButton className=' position-absolute' sx={{position:'absolute' ,bottom:'0', right:'0'}}  onClick={()=>addtoCart(services?.product_id, userToken)} color="primary" aria-label="add to shopping cart">
                            <i class="fa-solid fa-cart-plus" style={{color:'#DE3820'}}></i>
                              </IconButton>}
                              </>
                            )}
                            {/* <button style={{padding:'3px', width:'80px'}} onClick={()=>addtoCart(services?.product_id, userToken)} className="red-btn">Add</button> */}
                            </>
                            ):(<>
                              <Link to="/my-cars" className=' position-absolute' style={{bottom:'3px', right:'0px'}}>
                              <Button variant="contained" color='error' size="small" sx={{fontSize:'8px', padding:'1px'}}>
                                       Add Car
                               </Button>
                               </Link>
                           
                             </>)} 
                            
                            </div>
                    </div>
                  </div>
             
             
             ))}

           
        </Slider>
            </>)} 
              </div>
           
            <div className="row px-3">

            {/* <Slider {...settings} className='border'>
            {servicesData.map((val)=>(
              val?.products?.map((services, idx)=>(
                <div key={idx} className="rounded select-ons-card card-shadow ">
                         <div className='addones-img'>
                        <img src={services?.images} className='select-ons-img' alt="" />
                        </div>
                        <div className='d-flex justify-content-between px-2 py-1 align-items-center'>
                        <div className=''>
                        <p className='addones-text'>{services?.name}</p>
                        <p  className='red-t addones-text'>Rs {services?.price}</p>      
                          <p style={{fontSize:'16px'}} className='text-black2'>Add On Details description</p> 
                        </div>                      
                           {defaultCar?(
                            <>
                            {services?.in_cart?(                            
                              <IconButton className='' color="primary" aria-label="add to shopping cart" disabled>
                            <i class="fa-solid fa-cart-plus" style={{color:'#DE3820'}}></i>
                              </IconButton>
                              ):(
                             
                            <IconButton className='' onClick={()=>addtoCart(services?.product_id, userToken)} color="primary" aria-label="add to shopping cart">
                            <i class="fa-solid fa-cart-plus" style={{color:'#DE3820'}}></i>
                              </IconButton>
                            )}
                            <button style={{padding:'3px', width:'80px'}} onClick={()=>addtoCart(services?.product_id, userToken)} className="red-btn">Add</button>
                            </>
                            ):<Link to="/my-cars" style={{fontSize:'7px'}} className="red-btn">Add Car</Link>} 
                            </div>
                    </div>
              ))
            ))}
              
    
         
        </Slider> */}



            {/* {servicesData?.map((val)=>(
                val?.products?.map((services)=>(
                    <div key={services?.cat_id} className="col-12 col-md-4">
                    <div className="rounded select-ons-card  card-shadow ">
                         <div className='addones-img'>
                        <img src={services?.images} className='select-ons-img' alt="" />
                        </div>
                        <div className='d-flex justify-content-between px-2 py-1 align-items-center'>
                        <div className=''>
                        <p className='addones-text'>{services?.name}</p>
                        <p  className='red-t addones-text'>Rs {services?.price}</p>      
                          <p style={{fontSize:'16px'}} className='text-black2'>Add On Details description</p> 
                        </div>                      
                           {defaultCar?(
                            <>
                            {services?.in_cart?(                            
                              <IconButton className='' color="primary" aria-label="add to shopping cart" disabled>
                            <i class="fa-solid fa-cart-plus" style={{color:'#DE3820'}}></i>
                              </IconButton>
                              ):(
                             
                            <IconButton className='' onClick={()=>addtoCart(services?.product_id, userToken)} color="primary" aria-label="add to shopping cart">
                            <i class="fa-solid fa-cart-plus" style={{color:'#DE3820'}}></i>
                              </IconButton>
                            )}
                            <button style={{padding:'3px', width:'80px'}} onClick={()=>addtoCart(services?.product_id, userToken)} className="red-btn">Add</button>
                            </>
                            ):<Link to="/my-cars" style={{fontSize:'7px'}} className="red-btn">Add Car</Link>} 
                            </div>
                    </div>
                </div>
                ))

            ))} */}
                
            </div>
        </div>
    
    </>
  )
}

export default SelectAddOns