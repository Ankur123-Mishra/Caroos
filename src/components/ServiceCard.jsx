import React, { useContext, useEffect, useState } from 'react'
import Axios from '../Axios';
import Toast from '../Tost';
import './component.css'
import Loader from '../Loader';
import { Link, useParams } from 'react-router-dom';
import { addCarContext } from '../context/AddCarProvider';
import { CartContext } from '../context/CartProvider';
import { AuthContext } from '../AuthProvider';
import ServiceCardMobile from './ServiceCardMobile';
import Login from '../page/auth-pages/Login';

import Nodatafound from '../asets/nodatafound.png'
import FrequentalyAskQuestions from '../page/homepage/frequentaly-ask-questions/FrequentalyAskQuestions';
//import cardImg from '../asets/Rectangle 21.png'

function ServiceCard({servicesData, defaultcar}) {
    const [allServisesData, setAllServicesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
     const  {userCarDetails, handleGetCars } = useContext(addCarContext) 
     const [categoriesFQS, setCategoriesFQS] = useState([])
    const {handleAddToCart, cart} = useContext(CartContext)
    const {id}= useParams()
    const {userToken} = useContext(AuthContext) 

    // const handleGetCars = async ()=>{  
    //   try { 
    //    setIsLoading(true);
    //       if(userToken){
    
         
    //      const response = await Axios.get('get_cars',{
    //        headers: {
    //          Authorization: `Bearer ${userToken}`
    //        }
    //         })
    //         if(response.status===200){
    //          const data = response?.data;
    //          setCarDetails(data?.cars)
    //       //   console.log("sgad..",data);
    //         // Toast(data?.message,response.status)          
    //         }
    //        }   
    //       } catch (err) {
    //           const error = err.response.data
    //                 //  Toast(error.message)
    //       }finally{ 
    //               setIsLoading(false)
    //       } 
    //       } 
    
    
    useEffect(()=>{
      handleGetCars(userToken)
    },[userToken, id])
  
  //  console.log("cRDE", userCarDetails);
    const getAllServices = async ()=>{
        if(userToken){
            
        setIsLoading(true)
         try {
            
          const response = await Axios("/get_services", {
            headers: {
                Authorization: `Bearer ${userToken}`
              },
            params: {
                cat_id:`${id}`
            }
          })
          if(response.status===200){
            const data = response?.data;
            console.log("servicesd..",data);

            setAllServicesData(data?.products)
            setCategoriesFQS(data?.faqs)
            Toast(data.message,response.status)
          }
         } catch (err) {
          const error = err?.response?.data
            //  Toast(error?.message)
         }finally{
            setIsLoading(false)
         }
        }else{
            setIsLoading(true)
         try {
            
          const response = await Axios("/get_all_products", {
            headers: {
                Authorization: `Bearer ${userToken}`
              },
            params: {
                cat_id:`${id}`
            }
          })
          if(response.status===200){
            const data = response?.data;
           // console.log("servicesd..",data);
            setAllServicesData(data?.products)
            setCategoriesFQS(data?.faqs)
            Toast(data.message,response.status)
          }
         } catch (err) {
          const error = err?.response?.data
              Toast(error?.message)
         }finally{
            setIsLoading(false)
         }
        }
    }

    useEffect(()=>{
        getAllServices();
     },[id, servicesData])
     const productsToRender = allServisesData?allServisesData?.products : (servicesData?.products || []);
  // console.log("ss..",productsToRender);
  const addtoCart = (id, userToken, type)=>{
    handleAddToCart(id, userToken, type)
      setTimeout(()=>{
        getAllServices(userToken)
      },1000)
  
  }

     //console.log("new...",(allServisesData.length>0?allServisesData:servicesData)?.products);
  return (
       <>
       {isLoading && <Loader/> }
      
        
       {/* (allServisesData.length>0?allServisesData:servicesData)?.products?.map((val)=>( */}
         {/* {productsToRender?.length>0 && productsToRender?.map((val, idx)=>( */}
          <>
            {/* <div key={idx+1} className="row d-none d-md-block"> */}
            {/* {val?.products?.length>0 && <h3 className='text-center red-t'>{val?.name}</h3>} */}
            {allServisesData.length?(<>
              {

allServisesData?.map((product)=>(
      <div className="container">
      <div key={product?.cat_id} className="row card-shadow d-md-flex d-none mb-3 bg-lightblue rounded p-3"> 
  <div className="col-12 col-md-8">
     <div className="row ">
      <div className="col-12 col-md-5">
          <img src={product?.images}  className='img-category' alt="" />
      </div>
      <div className="col-12 col-md-7 d-flex d-md-block flex-column align-items-center justify-content-center">
      <h4 className=''>{product?.name}</h4>
        <p id='services-info' dangerouslySetInnerHTML={{ __html: product?.description }}/>

      </div>
     </div>
  </div>
  <div className="col-12 col-md-4 d-md-flex flex-column justify-content-center align-items-end ">
  
  {
    userCarDetails.length?(<>
     {product?.price && <h3 className='text-center text-black ' style={{fontSize:'21px', width:'200px'}}><i class="fa-solid fa-indian-rupee-sign fa-md" style={{color:'#62718d'}}></i> {product?.price}</h3> }
     {product?.price &&  <div className='text-center' style={{width:'200px'}}>
      {product?.in_cart?<button disabled className='red-btn-disable'>Added</button>:<button className="red-btn" onClick={() =>addtoCart(product.product_id, userToken, 1)}>Add</button>}
      
      </div>}

</>):(
<>
 {userToken?<Link to="/my-cars"><button className='red-btn'>Add Car</button></Link>:<Login login="Add Car"/>} 
</>

)
  }
  </div>
  </div>
</div>
  ))
}


<div className="row d-none d-md-flex">
 
{/* {categoriesFQS?.length>0 && <div className="col-12">
        <div className='mt-5 mb-0'>
        <FrequentalyAskQuestions faqs={categoriesFQS}/>
        </div>
       
      </div>}   */}
 
</div>


            </>):(<>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <div style={{maxWidth:'300px'}}>
                <img src={Nodatafound} alt="" className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
            </>)}
            
             
                
            {/* </div> */}
            <div className="d-block d-md-none my-2">
      {/* {val?.products?.length>0 && <h3 className='text-center red-t'>{val?.name}</h3>} */}
    {allServisesData?.length && <ServiceCardMobile  val={allServisesData} userCarDetails={userCarDetails} userToken={userToken} addtoCart={addtoCart} />}
     
     
    {/* {categoriesFQS?.length>0 && <div className="col-12">
        <div className='mt-5 mb-0'>
        <FrequentalyAskQuestions faqs={categoriesFQS}/>
        </div>
       
      </div>} */}
     
      </div>
     

            </>

        {/* ))
       } */}
       
            </>
       
  )
}

export default ServiceCard