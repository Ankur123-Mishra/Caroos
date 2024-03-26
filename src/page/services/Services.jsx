import { useContext, useEffect, useState } from 'react'
import ChangeCar from './change-car/ChangeCar'

import SelectServices from './select-services/SelectServices'
import { AuthContext } from '../../AuthProvider'
import { addCarContext } from '../../context/AddCarProvider'
import Loader from '../../Loader'
import Toast from '../../Tost'
import Axios from '../../Axios'
import FrequentalyAskQuestions from '../homepage/frequentaly-ask-questions/FrequentalyAskQuestions'
import { useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'



function Services() {
  const {userToken} = useContext(AuthContext)
  const [allServisesData, setAllServicesData] = useState([])
 const {handleGetCars, loading, userCarDetails} = useContext(addCarContext)
  const [defaultCar, setDefaultCar] = useState("")
  const [IsLoading, setIsLoading] = useState(false)
  const [faqsData, setFaqsData] = useState([])
  const [categoriesFQS, setCategoriesFQS] = useState([])
  const {id}= useParams()
  const location = useLocation()
  const [metaTitle, setMetaTitle] = useState("")
//   const getAllServices = async (userToken)=>{
//     if(userToken){

//    setIsLoading(true)
//     try {
//      const response = await Axios.get('/get_products', {
//        headers: {
//          Authorization: `Bearer ${userToken}`
//        }
//      })
//      if(response.status===200){
//        const data = response?.data;
//       // console.log("servicesd..",data);
//        setAllServicesData(data)
//       // Toast(data.message,response.status)
//      }
//     } catch (err) {
//      const error = err?.response?.data
//         // Toast(error?.message)
//     }finally{
//        setIsLoading(false)
//     }
//    }else{
//      setIsLoading(true)
//      try {
//       const response = await Axios.get('/get_all_products')
//       if(response.status===200){
//         const data = response?.data;
//       //  console.log("servicesd..",data);
//         setAllServicesData(data?.products)
//        // Toast(data.message,response.status)
//       }
//      } catch (err) {
//       const error = err?.response?.data
//         //  Toast(error?.message)
//      }finally{
//         setIsLoading(false)
//      }
//    }
// }


// const handleFAQS = async () =>{
//   try { 
//     setIsLoading(true);     
//       const response = await Axios.get('/service_faqs')
//          if(response.status===200){
//           const data = response?.data;             
//           setFaqsData(data?.faqs)
//       //   console.log("faqs..",data);
           
//          }
        
//        } catch (err) {
//           // const error = err.response.data
//                  //  Toast(error.message)
//        }finally{ 
//                setIsLoading(false)
//        } 
// }

// useEffect(()=>{
//   handleFAQS()
// },[])




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
},[id])






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
  handleGetCars(userToken)
  getDefaultCar()
 },[userToken])
 //console.log("cars", defaultCar.brand);
    // console.log("defaultadd..", defaultCar);

useEffect(()=>{
    if(location.pathname==="/services/detailing"){
         setMetaTitle("Detailing Services - Caross")
    }else if(location.pathname==="/services/paint-protection"){
        setMetaTitle("Paint Protection  - Caross")
      }else if(location.pathname==="/services/services"){
        setMetaTitle("Services - Caross")
      }else if(location.pathname==="/services/accessories"){
        setMetaTitle("Accessories - Caross")
      }else{
        setMetaTitle("Welcome to caross detailing")
      }
},[location.pathname])



  return (
    <>
              <Helmet>  
                <title>{metaTitle}</title>  
              <meta name="description" content="Explore our comprehensive auto detailing services at Caross.in. From exterior paint protection to interior detailing, our skilled professionals ensure your vehicle receives the care it deserves. Elevate your driving experience with our meticulous services."></meta>
            </Helmet>



     {loading && <Loader/>}  
    <div className="container-fluid position-relative mt-2 "> 
    <div className="row">
    <div className="col-12 d-md-none d-block col-md-3 position-relative pb-4">
      <div className="col-12" style={{visibility:'hidden', height:'72px'}}>
        
      </div>
      {defaultCar?.brand?<ChangeCar userCarDetails={defaultCar}/>:null  }    
      </div>
      <div className={defaultCar?.brand?"col-12 col-md-9":"col-12"}>
      
      <SelectServices allServicess={allServisesData} defaultcar={defaultCar}/>
      </div>
      <div className={defaultCar?.brand?"col-12 d-md-block d-none col-md-3 position-relative pb-4":"col-12 d-md-block d-none position-relative pb-4"}>
      {/* <div className="col-12" style={{visibility:'hidden', height:'72px'}}>
        
      </div> */}
      {defaultCar?.brand && <ChangeCar userCarDetails={defaultCar}/>  }    
      </div>
   {categoriesFQS?.length>0 &&  <div className="col-12">
        <FrequentalyAskQuestions faqs={categoriesFQS}/>
      </div>}  
    </div>        
    
    </div>
    {/* select services */}
     

    
    </>
  )
}

export default Services