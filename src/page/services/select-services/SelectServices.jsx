import React, { useContext, useEffect, useState } from 'react'
//import logoArr from '../../homepage/banner/bannerlogo'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import Slider from "react-slick";

//import ServiceCard from '../../../components/ServiceCard'
import Toast from '../../../Tost'
import Axios from '../../../Axios'
import Loader from '../../../Loader'
import ServiceCard from '../../../components/ServiceCard'
//import CategoryCard from '../../../components/CategoryCard'
import { AuthContext } from '../../../AuthProvider'
import CategoryCardService from '../../../components/CategoryCardService'
import { addCarContext } from '../../../context/AddCarProvider';
import FrequentalyAskQuestions from '../../homepage/frequentaly-ask-questions/FrequentalyAskQuestions';

function SelectServices({allServicess, defaultcar}) {
    const [allServisesData, setAllServicesData] = useState([])
    const [allCategoriesData, setAllCategoriesData] = useState([])
    const {userToken} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
  const [changes, SetChanges] = useState(true)
  
   const [carDetails, setCarDetails] = useState([])

    const getAllServices = async (userToken)=>{
         if(userToken){

        setIsLoading(true)
         try {
          const response = await Axios.get('/get_services', {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          })
          if(response.status===200){
            const data = response?.data;
            console.log("servicesd..",data);
            setAllServicesData(data)
            //console.log("allservices", data)
           // Toast(data.message,response.status)
          }
         } catch (err) {
          const error = err?.response?.data
             // Toast(error?.message)
         }finally{
            setIsLoading(false)
         }
        }else{
          setIsLoading(true)
          try {
           const response = await Axios.get('/get_all_products')
           if(response.status===200){
             const data = response?.data;
             console.log("servicesccdscd..",data);
             setAllServicesData(data?.products)
          //   console.log("allproduct", data)
            // Toast(data.message,response.status)
           }
          } catch (err) {
           const error = err?.response?.data
             //  Toast(error?.message)
          }finally{
             setIsLoading(false)
          }
        }
    }

//console.log("allser", allServisesData)

  const getAllCategories = async ()=>{
    setIsLoading(true)
     try {
      const response = await Axios.get('/get_all_categories')
      if(response.status===200){
        const data = response?.data;
         console.log("categories...", data);
        setAllCategoriesData(data?.categories.reverse())
        Toast(data?.message,response?.status)
      }
     } catch (err) {
      const error = err?.response?.data
          Toast(error?.message)
     }finally{
        setIsLoading(false)
     }
}
  
  useEffect(()=>{
    getAllServices(userToken)
     getAllCategories()
  },[userToken])
  
// on scroll show content
// const handleScroll = () => {
  
//   const scrollY = window.scrollY;
  
//   const threshold = 370; 

 
//   if (scrollY > threshold) {
//     setIsVisible(true);
//   } else {
//     setIsVisible(false);
//   }
// };

//  useEffect(() => {
//   window.addEventListener('scroll', handleScroll);
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);


console.log("cars",carDetails);
// react slick slider
var settings = {

  infinite: false,
  speed: 500,
  
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

  return (
    <>
    {/* <div className="col-12 py-3">
                <h5 className='text-center'>Select Services</h5>
            </div> */}
    {isLoading && <Loader/>}
    <div className="container-fluid mb-md-3 servicecategory-sticky" >
        <div className="container">
        <div>
        </div>
         <div className='col-12 d-flex justify-content-center  border-bottom px-3 rounded' style={{backgroundColor:'white'}} >    
        <div className="category-slider ">
        {allCategoriesData.length>4?(<>
        <Slider {...settings}>
          
          {
                allCategoriesData?.map((logo, idx)=>(   
                  <div className='d-flex justify-content-center align-items-center' key={idx+1} >
                  <CategoryCardService logo={logo}  SetChanges={SetChanges}/>               
                  </div>                    
                ))
               }  
          
         </Slider> 
       </>):(<>
        <div className="row justify-content-center d-md-flex pb-2 pb-md-1 " style={{background:'white'}} > 
             
            {
                allCategoriesData?.map((logo)=>(   
                    
                  <CategoryCardService logo={logo}  SetChanges={SetChanges}/>               
                                       
                ))
               }  
        </div>
       </>)}
        </div>
       
        </div>
        
        </div>
       </div>
{/* {isVisible ?(<>
  
</>):(<>
<div className="container-fluid mb-3 ">
        <div className="container">
        <div>
        </div>
        <div className="row justify-content-center d-md-flex pb-2 pb-md-4 "> 
           
            {
                allCategoriesData?.map((logo)=>(   
                           
                  <CategoryCard logo={logo}  SetChanges={SetChanges}/>                      
                ))
               }  
        </div>
        </div>
       </div>
</>)} */}

       {/* <div className="container-fluid mb-3 position-sticky top-0 bg-white">
        <div className="container">
        <div>
        </div>
        <div className="row justify-content-center d-md-flex pb-2 pb-md-4 "> 
           
            {
                allCategoriesData?.map((logo)=>(   
                    <CategoryCard logo={logo}  SetChanges={SetChanges}/>              
                                       
                ))
               }  
        </div>
        </div>
       </div> */}
       {/*services card */}
       <div>
    </div>
    <div className="container-fluid my-3">
      <div className="container">
            
      {changes?<ServiceCard servicesData={allServisesData} userCarDetails={carDetails} defaultcar={defaultcar}/>:<Outlet/>}
        
       
      </div>
    </div>
       </>
  )
}

export default SelectServices